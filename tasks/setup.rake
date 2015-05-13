#
# Setup tasks
#
namespace "setup" do
    desc "setup node modules"
	task :node_modules do
    	exec = 'npm install'
    	sh(exec)
	end
    
    namespace "index_html" do
        file INDEX_HTML, [:arg1, :arg2] => 'etc/html/index.html.ejs' do |t, args|
            cmds =  ["phantomjs tasks/compile_index_html.js"]
            cmds << "#{t.prerequisites[0]}"
            cmds << "#{args.arg1}"
            cmds << "#{args.arg2}"
            cmds << "> #{t.name}"
            sh cmds.join(" ")
        end

        task :clean do
            rm_rf INDEX_HTML
        end

        task :dev => :clean do
            Rake::Task[INDEX_HTML].invoke(0, 0)
        end

        task :phonegap => :clean do
            Rake::Task[INDEX_HTML].invoke(0, 1)
        end

        task :prod => :clean do
            Rake::Task[INDEX_HTML].invoke(1, 1)
        end
    end

end
