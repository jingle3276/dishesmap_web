#
# Tests Tasks
#
namespace :test do

    ALL_CONFIG = "etc/tests/karma/all.conf.js"
    DEBUG_CONFIG = "etc/tests/karma/debug.conf.js"
    SINGLE_CONFIG =  "etc/tests/karma/single.conf.js"

    # TECH-DEBT: implement this function to compile tests dependency into deps-test.js
    def generate_test_dependencies()
        cmds = ["python #{TASKS_JAVASCRIPT_DIR}/3p/depswriter.py"]
        cmds << "--output_file #{OUTPUT_FILE_JS_DEPS}"
        sh cmds.join(" ")
    end

    task :build => ['javascript:build']

    desc "Run all karma unit tests using PhantomJS"
    task :all => [:build] do
        sh "./node_modules/karma/bin/karma start #{ALL_CONFIG}"
    end

    desc "Run single unit test"
    task :single => [:build] do
        sh "./node_modules/karma/bin/karma start #{SINGLE_CONFIG}"
    end    

    desc "Debug unit tests using Chrome browser"
    task :debug => [:build] do
        sh "./node_modules/karma/bin/karma start #{DEBUG_CONFIG}"
    end

    desc "Start test server using node"
    task :start_node => [:stop_node] do 
        sh "./node_modules/forever/bin/forever start " \
           "-a -o /opt/wz/log/dmwa/test_server.log " \
           "--minUptime 1000 --spinSleepTime 2000 " \
           "etc/tests/node/test_server.js"
    end

    desc "Stop test server"
    task :stop_node do 
        sh "./node_modules/forever/bin/forever stopall"
    end

end