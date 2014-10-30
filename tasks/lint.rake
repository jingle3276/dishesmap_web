#
# Lint Tasks
#
namespace "lint" do

    LINT_DIR="tasks/lint"

task :all => [:executables, :jshint]


desc "Check that no files are executable"
    task :executables do
        executables = `find #{CODE_DIR} -type f -perm +111`
        if executables.length > 0
            puts "Error - The following files are executable: \n"
            puts executables
            raise highlight("Files are executable")
    end
end

desc "Run the jshint analysis tool"
    task :jshint do
        config="#{LINT_DIR}/jshint-config.json"

        dirs = ["#{CODE_DIR}/public/javascript/dmwa"]

        sh "#{NODE_MODULE_DIR}/jshint/bin/jshint --config #{config} #{dirs.join(' ')}"

        dirs.each do |dir|
            # Assert we're not using windows line endings
            sh("find #{dir} -name \"*.js*\" -type f -exec file \"{}\" \";\" | grep CRLF") do |ok, res|
                raise highlight("Files contain the forbidden windows line endings!") if ok
            end
        end
        
        notice("JSHint passed")
    end

end

desc "Run all code analysis tools."
task :lint => ["lint:all"]
