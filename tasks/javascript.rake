namespace :javascript do

    directory JAVASCRIPT_DMWA_DIR = "#{JAVASCRIPT_DIR}/dmwa"
    directory JAVASCRIPT_3P_DIR = "#{JAVASCRIPT_DIR}/3p"
    directory TASKS_JAVASCRIPT_DIR = "tasks/javascript"    
    directory JAVASCRIPT_BUILT_DIR = "#{JAVASCRIPT_DIR}/built"
    directory JAVASCRIPT_TARGET_DIR = "#{JAVASCRIPT_DIR}/target"
    directory JAVASCRIPT_TARGET_TEMPLATES_DIR = "#{JAVASCRIPT_TARGET_DIR}/templates"

    file TARGET_JS_DEPS_FILE = "#{JAVASCRIPT_TARGET_DIR}/dmwa_deps.js" # for development
    file TARGET_EJS_INDEX_FILE = "#{JAVASCRIPT_TARGET_TEMPLATES_DIR}/app_template_index.js" # for development
    file TARGET_MINIFIED_JS_FLIE = "#{JAVASCRIPT_BUILT_DIR}/dmwa.js" # for production
    file SRC_REQUIRE_FILE = "#{JAVASCRIPT_DIR}/dmwa/app/require_file.js"


    desc "Clean all compiled javascript"
    task :clean do
        rm_rf JAVASCRIPT_TARGET_DIR
        rm_rf JAVASCRIPT_BUILT_DIR
    end

    Rake::FileList.new("#{JAVASCRIPT_DMWA_DIR}/**/ejs/*.ejs").each do |src|
        file TARGET_EJS_INDEX_FILE => src
    end
    file TARGET_EJS_INDEX_FILE => JAVASCRIPT_TARGET_TEMPLATES_DIR do
        sh "phantomjs tasks/compile_ejs_templates.js"
    end
    
    file TARGET_JS_DEPS_FILE => [JAVASCRIPT_3P_DIR, TARGET_EJS_INDEX_FILE, JAVASCRIPT_TARGET_DIR] do |t|
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/depswriter.py"]
        cmds << "--root_with_prefix '#{JAVASCRIPT_3P_DIR} ../'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_DMWA_DIR} ../../dmwa'"
        cmds << "--root_with_prefix '#{JAVASCRIPT_TARGET_TEMPLATES_DIR} ../../target/templates'"
        cmds << "--output_file #{t.name}"
        sh cmds.join(" ")
    end
    
    Rake::FileList.new("#{JAVASCRIPT_DMWA_DIR}/**/*.js", ).each do |src|
        file TARGET_JS_DEPS_FILE => src
        file TARGET_MINIFIED_JS_FLIE => src
    end

    file TARGET_MINIFIED_JS_FLIE => [:build, TARGET_EJS_INDEX_FILE, SRC_REQUIRE_FILE, JAVASCRIPT_BUILT_DIR] do |t|
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/closurebuilder.py"]
        cmds << "--root=#{JAVASCRIPT_3P_DIR}"
        cmds << "--root=#{JAVASCRIPT_DMWA_DIR}"
        cmds << "--root=#{JAVASCRIPT_TARGET_DIR}"
        cmds << "--input=#{SRC_REQUIRE_FILE}"
        cmds << "--output_mode=compiled"
        cmds << "--compiler_jar=#{TASKS_JAVASCRIPT_DIR}/3p/compiler.jar"
        cmds << "--output_file=#{t.name}"
        sh cmds.join(" ")
    end

    desc "Build all javascript sources in development mode."
    task :build => [TARGET_EJS_INDEX_FILE, TARGET_JS_DEPS_FILE]

    desc "Build production minified javascript file"
    task :minify => TARGET_MINIFIED_JS_FLIE

end
