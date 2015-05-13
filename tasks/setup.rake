#
# Setup tasks
#
namespace "setup" do

    desc "Remove all the built files"
    task :clean => ['phonegap:clean', 'javascript:clean', 'index_html:clean']


    namespace "node" do 
        file "node_modules" => 'package.json' do
            sh('npm install')
        end

        task :remove do
            rm_rf "node_modules"
        end

        desc "setup node modules"
        task :init => "node_modules"
    end

    namespace "index_html" do
        file INDEX_HTML, [:arg1, :arg2] => ['node:init', 'etc/html/index.html.ejs'] do |t, args|
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
