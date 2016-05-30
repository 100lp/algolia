def render(filename)
  contents = File.read(filename)
  Haml::Engine.new(contents).render
end

# даже чтобы запилить =link_to придется наверное половину руби хедперов впилить )

# def url_for(options = nil)
#   case options
#   when String
#     options
#   when nil
#     super(only_path: _generate_paths_by_default)
#   when Hash
#     options = options.symbolize_keys
#     unless options.key?(:only_path)
#       if options[:host].nil?
#         options[:only_path] = _generate_paths_by_default
#       else
#         options[:only_path] = false
#       end
#     end

#     super(options)
#   when :back
#     _back_url
#   when Array
#     if _generate_paths_by_default
#       polymorphic_path(options, options.extract_options!)
#     else
#       polymorphic_url(options, options.extract_options!)
#     end
#   else
#     method = _generate_paths_by_default ? :path : :url
#     builder = ActionDispatch::Routing::PolymorphicRoutes::HelperMethodBuilder.send(method)

#     case options
#     when Symbol
#       builder.handle_string_call(self, options)
#     when Class
#       builder.handle_class_call(self, options)
#     else
#       builder.handle_model_call(self, options)
#     end
#   end
# end

# def link_to_remote_options?(options)
#   if options.is_a?(Hash)
#     options.delete('remote') || options.delete(:remote)
#   end
# end

# def convert_options_to_data_attributes(options, html_options)
#   if html_options
#     html_options = html_options.stringify_keys
#     html_options['data-remote'] = 'true' if link_to_remote_options?(options) || link_to_remote_options?(html_options)

#     method  = html_options.delete('method')

#     add_method_to_attributes!(html_options, method) if method

#     html_options
#   else
#     link_to_remote_options?(options) ? {'data-remote' => 'true'} : {}
#   end
# end

# def link_to(name = nil, options = nil, html_options = nil, &block)
#   html_options, options, name = options, name, block if block_given?
#   options ||= {}

#   html_options = convert_options_to_data_attributes(options, html_options)

#   url = url_for(options)
#   html_options['href'] ||= url

#   content_tag(:a, name || url, html_options, &block)
# end
