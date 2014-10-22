#
# Tests Tasks
#
namespace :test do

    ALL_CONFIG = "etc/tests/karma/all.conf.js"
    DEBUG_CONFIG = "etc/tests/karma/debug.conf.js"
    SINGLE_CONFIG =  "etc/tests/karma/single.conf.js"

    def generate_dependencies()
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/depswriter.py"]
        cmds << "--root_with_prefix '#{JAVASCRIPT_DIR}/target/templates ../../target/templates'"
        cmds << "--output_file #{OUTPUT_FILE_JS_DEPS}"
        sh cmds.join(" ")
    end

    desc "Run all karma unit tests using PhantomJS"
    task :all do
        sh "./node_modules/karma/bin/karma start #{ALL_CONFIG}"
        notice("Karma tests have run.")
    end

    desc "Run single unit test"
    task :single do
        sh "./node_modules/karma/bin/karma start #{SINGLE_CONFIG}"
        notice("single test have run.")
    end    

    desc "Debug unit tests using Chrome browser"
    task :debug do
        sh "./node_modules/karma/bin/karma start #{DEBUG_CONFIG}"
    end

end