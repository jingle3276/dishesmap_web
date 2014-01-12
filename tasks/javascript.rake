namespace :javascript do

    COMPILED_TEMPLATES_DIR = "#{JAVASCRIPT_DIR}/target/templates"

    desc "Compile all ejs into templates"
    task :compile_ejs do
        sh "phantomjs tasks/compile_ejs_templates.js"
    end

    desc "Clean all compiled javascript"
    task :clean do
        rm_rf COMPILED_TEMPLATES_DIR
    end

end
