var gulp = require('gulp'),
    bower = require('gulp-bower'),
    haml = require('gulp-ruby-haml'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    svgProp = require('remove-svg-properties'),
    svgSprite = require('gulp-svg-sprite'),
    autoprefixer = require('gulp-autoprefixer'),
    prettify = require('gulp-prettify'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    ftp = require('vinyl-ftp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    wiredep = require('wiredep').stream;

var $ = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var svgConfig = {
  dest: 'svg',
  shape: {
    dimension: {     // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32
    }
  },
  mode: {
    view: {     // Activate the «view» mode
      bust: false,
      render: {
        scss: true    // Activate Sass output (with default options)
      }
    },
    symbol: true    // Activate the «symbol» mode
  }
};

// gulp.task('svgprop', function() {
//   svgProp.remove({
//       src: 'svg/*.svg',
//       out: 'svg/cleaned',
//       stylesheets: false,
//       // properties: [svgProp.PROPS_FILL, svgProp.PROPS_STROKE],
//       properties: [svgProp.PROPS_FILL],
//       namespaces: ['i', 'sketch', 'inkscape']
//   });
// });

gulp.task('svg', function() {
  return gulp.src('svg/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest('svg/sprite'));
});

// sass
gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe(plumber())
    .pipe($.sass({
      includePaths: sassPaths,
      noCache: true,
      style: "expanded",
      lineNumbers: true
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

// haml
gulp.task('haml', function() {
  gulp.src('./views/index.haml')
    .pipe(plumber())
    .pipe(haml({require: ["./render.rb"]}))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));
});

// server
gulp.task('server', ['haml'], function () {
    browserSync.init({
        port: 8080,
        open: false,
        server: {
            baseDir: "./"
        }
    });
});

// watcher
gulp.task('watch', function () {
  // gulp.watch('bower.json', ['wiredep']);
  gulp.watch('scss/**/*.*', ['sass']);
  gulp.watch('components/**/*.*', ['sass']);
  gulp.watch('js/*.*', ['haml']);
  gulp.watch('views/*.haml', ['haml']);
  gulp.watch('svg/*.svg', ['svg', 'haml']);
  gulp.watch([
    '*.html',
    'css/*.css',
  ]).on('change', reload);
});

gulp.task('default', ['sass'], function() {

  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['scss/*.scss'], ['sass']);

  gulp.watch(['scss/*.sass'], ['sass']);
  gulp.watch(['components/*/*.sass'], ['sass']);

});

// default task
gulp.task('default', ['server', 'watch']);


// Build
var path = {
  build: {
    html: './dist/',
    css: './dist/css/',
    img: './dist/img/',
    svg: './dist/svg/',
    svgSprite: './dist/svg/sprite/',
    js: './dist/js/'
  },
  src: {
    html: ['./*.jade', './*.html'],
    css: './css/*.css',
    img: './img/*.*',
    svg: './svg/*.*',
    svgSprite: './svg/sprite/**/svg/*.*',
    js: './js/*.*'
  },
  clean: './dist'
};

// build cleaner
gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

gulp.task('html:build', function () {
  var assets = useref.assets();
  return gulp.src(path.src.html)
    .pipe(assets)
    .pipe(gulpif('*.css', minifyCSS({compatibility: 'ie8'})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function () {
  gulp.src(path.src.css)
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js));
});

gulp.task('img:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
});

gulp.task('svg:build', function () {
  gulp.src(path.src.svg)
    .pipe(gulp.dest(path.build.svg));
});

gulp.task('svgSprite:build', function () {
  gulp.src(path.src.svgSprite)
    .pipe(gulp.dest(path.build.svgSprite));
});

gulp.task('dist', ['html:build','js:build', 'css:build', 'img:build', 'svg:build', 'svgSprite:build']);

gulp.task('build', ['clean', 'haml'], function () {
  gulp.start('dist');
});







// ===========================================
// ================ DEPLOY ===================
// ===========================================

gulp.task( 'deploy', function() {

  var conn = ftp.create( {
      host: 'mediaflowers.ru',
      user: 'fr79069n',
      password: 'AjwrDPU5',
      parallel: 10,
      log: gutil.log
  } );

  var globs = [
      'dist/**/*'
  ];

  return gulp.src(globs, { base: 'dist/', buffer: false })
    .pipe(conn.dest( 'fr79069n.bget.ru/public_html/'));
});
