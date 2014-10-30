#
# Setup tasks
#
namespace "setup" do
desc "setup node modules"
	task :node_modules do
    	exec = 'npm install'
    	sh(exec)
	end
end
