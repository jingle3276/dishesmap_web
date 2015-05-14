namespace :javascript do

    OUTPUT_FILE_DIR = "#{JAVASCRIPT_DIR}/built"
    COMPILED_TEMPLATES_DIR = "#{JAVASCRIPT_DIR}/target/templates"
    OUTPUT_FILE_JS_DEPS = "#{OUTPUT_FILE_DIR}/dmwa_deps.js" # for development
    OUTPUT_FILE_JS_ALL = "#{OUTPUT_FILE_DIR}/dmwa_all.js" # for production
    REQUIRE_FILE = "#{JAVASCRIPT_DIR}/dmwa/app/require_file.js"
    TASKS_JAVASCRIPT_DIR = "tasks/javascript"
    JAVASCRIPT_3P_DIR = "#{JAVASCRIPT_DIR}/3p"

    desc "Compile all ejs templates into javascript"
    task :compile_ejs do
        sh "phantomjs tasks/compile_ejs_templates.js"
    end

    desc "Clean all compiled javascript"
    task :clean do
        rm_rf COMPILED_TEMPLATES_DIR
        rm_rf OUTPUT_FILE_DIR
    end

    def generate_deps()
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/depswriter.py"]
        #cmds << "--root_with_prefix '#{JAVASCRIPT_1P_DIR} ../../1p/'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_3P_DIR} ../'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_DIR}/dmwa ../../dmwa'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_DIR}/target/templates ../../target/templates'"
        cmds << "--output_file #{OUTPUT_FILE_JS_DEPS}"
        mkdir_p OUTPUT_FILE_DIR
        sh cmds.join(" ")
    end

    def generate_minified_js()
        # TODO: make this take in an argument and optionally minify(simple and advance) or combine only
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/closurebuilder.py"]
        cmds << "--root=#{JAVASCRIPT_DIR}/3p"
        cmds << "--root=#{JAVASCRIPT_DIR}/dmwa"
        cmds << "--root=#{JAVASCRIPT_DIR}/target"
        cmds << "--input=#{REQUIRE_FILE}"
        cmds << "--output_mode=compiled"
        cmds << "--compiler_jar=#{TASKS_JAVASCRIPT_DIR}/3p/compiler.jar"
        cmds << "--output_file=#{OUTPUT_FILE_JS_ALL}"
        sh cmds.join(" ")
    end
    
    desc "Scan all js sources and generate a depedency js file for development mode"
    task :generate_deps do
        generate_deps()
    end

    desc "Build all javascript sources in development mode."
    task :build => [:clean, :compile_ejs, :generate_deps]

    desc "Build production minified javascript file"
    task :minify => :build do
        generate_minified_js()
    end

end
