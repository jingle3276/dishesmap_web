namespace :javascript do

    OUTPUT_FILE_DIR = "#{JAVASCRIPT_DIR}/built"
    COMPILED_TEMPLATES_DIR = "#{JAVASCRIPT_DIR}/target/templates"
    OUTPUT_FILE_JS_DEPS = "#{OUTPUT_FILE_DIR}/dmwa_js_deps.js"
    TASKS_JAVASCRIPT_DIR = "tasks/javascript"
    JAVASCRIPT_3P_DIR = "#{JAVASCRIPT_DIR}/3p"

    desc "Compile all ejs into templates"
    task :compile_ejs do
        sh "phantomjs tasks/compile_ejs_templates.js"
    end

    desc "Clean all compiled javascript"
    task :clean do
        rm_rf COMPILED_TEMPLATES_DIR
        rm_rf OUTPUT_FILE_DIR
        mkdir_p OUTPUT_FILE_DIR
    end

    def generate_dependencies()
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/depswriter.py"]
        #cmds << "--root_with_prefix '#{JAVASCRIPT_1P_DIR} ../../1p/'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_3P_DIR} ../'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_DIR}/dmwa ../../dmwa'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_DIR}/target/templates ../../target/templates'"
        cmds << "--output_file #{OUTPUT_FILE_JS_DEPS}"
        sh cmds.join(" ")
    end
    
    desc "Compile app javascript in dependencies mode for development"
    task :generate_dependencies do
        generate_dependencies()
    end

    desc "Compile all js in dependencies mode for development."
    task :build => [:clean, :compile_ejs, :generate_dependencies]

end
