#
# Tests Tasks
#
namespace :test do
    
    namespace :karma do
		
		KARMA_CONFIG = "etc/tests/karma/conf.js"
        
        desc "Run all karma unit tests"
        task :all do
            sh "./node_modules/karma/bin/karma start #{KARMA_CONFIG}"
            notice("Karma tests have run.")
        end

    end

end