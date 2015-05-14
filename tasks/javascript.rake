namespace :javascript do

    JAVASCRIPT_DMWA_DIR = "#{JAVASCRIPT_DIR}/dmwa"
    JAVASCRIPT_BUILT_DIR = "#{JAVASCRIPT_DIR}/built"
    JAVASCRIPT_TARGET_TEMPLATES_DIR = "#{JAVASCRIPT_DIR}/target/templates"
    JAVASCRIPT_3P_DIR = "#{JAVASCRIPT_DIR}/3p"
    JS_DEPS_FLE = "#{JAVASCRIPT_BUILT_DIR}/dmwa_deps.js" # for development
    MINIFED_JS_FLIE = "#{JAVASCRIPT_BUILT_DIR}/dmwa.js" # for production
    REQUIRE_FILE = "#{JAVASCRIPT_DIR}/dmwa/app/require_file.js"
    TASKS_JAVASCRIPT_DIR = "tasks/javascript"    

    desc "Clean all compiled javascript"
    task :clean do
        rm_rf JAVASCRIPT_TARGET_TEMPLATES_DIR
        rm_rf JAVASCRIPT_BUILT_DIR
    end

    file JAVASCRIPT_TARGET_TEMPLATES_DIR => JAVASCRIPT_DMWA_DIR do
        sh "phantomjs tasks/compile_ejs_templates.js"
    end
    
    file JS_DEPS_FLE => [JAVASCRIPT_3P_DIR, JAVASCRIPT_DMWA_DIR, JAVASCRIPT_TARGET_TEMPLATES_DIR] do |t|
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/depswriter.py"]
        cmds << "--root_with_prefix '#{JAVASCRIPT_3P_DIR} ../'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_DMWA_DIR} ../../dmwa'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_TARGET_TEMPLATES_DIR} ../../target/templates'"
        cmds << "--output_file #{t.name}"
        mkdir_p JAVASCRIPT_BUILT_DIR
        sh cmds.join(" ")
    end

    file MINIFED_JS_FLIE => [:build, JAVASCRIPT_3P_DIR, JAVASCRIPT_DMWA_DIR,
                             JAVASCRIPT_TARGET_TEMPLATES_DIR, REQUIRE_FILE] do |t|
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/closurebuilder.py"]
        cmds << "--root=#{JAVASCRIPT_3P_DIR}"
        cmds << "--root=#{JAVASCRIPT_DMWA_DIR}"
        cmds << "--root=#{JAVASCRIPT_TARGET_TEMPLATES_DIR}"
        cmds << "--input=#{REQUIRE_FILE}"
        cmds << "--output_mode=compiled"
        cmds << "--compiler_jar=#{TASKS_JAVASCRIPT_DIR}/3p/compiler.jar"
        cmds << "--output_file=#{t.name}"
        sh cmds.join(" ")
    end

    desc "Build all javascript sources in development mode."
    task :build => [:clean, JAVASCRIPT_TARGET_TEMPLATES_DIR, JS_DEPS_FLE]

    desc "Build production minified javascript file"
    task :minify => MINIFED_JS_FLIE

end
