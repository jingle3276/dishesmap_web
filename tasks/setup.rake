#
# Setup tasks
#
namespace "setup" do

    desc "Remove all the built files"
    task :clean => ['mobile:clean', 'javascript:clean', 'index_html:clean']

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
        def set_platform(platform)
            ENV["PLATFORM_MODE"] = platform
            notice("set PLATFORM_MODE #{platform}")
        end

        file INDEX_HTML, [:arg1, :arg2] => ['node:init', 'etc/html/index.html.ejs'] do |t, args|
            cmds =  ["phantomjs tasks/compile_index_html.js"]
            cmds << "#{t.prerequisites[0]}"
            cmds << "#{args.arg1}"
            cmds << "#{args.arg2}"
            cmds << "> #{t.name}"
            sh cmds.join(" ")
        end

        task :clean => ['javascript:clean'] do
            rm_rf INDEX_HTML
        end
        
        desc "Build in WEB mode(unminified javascript)"
        task :dev => [:clean] do
            set_platform("WEB")
            Rake::Task["javascript:build"].invoke()
            Rake::Task[INDEX_HTML].invoke(0, 0)
        end
        
        desc "Build in WEB mode(minified javascript)"
        task :web => [:clean] do
            set_platform("WEB")
            Rake::Task["javascript:minify"].invoke()
            Rake::Task[INDEX_HTML].invoke(1, 0)
        end
        
        desc "Build in android mode(minified javascript)"
        task :android => [:clean] do
            set_platform("ANDROID")
            Rake::Task["javascript:minify"].invoke()
            Rake::Task[INDEX_HTML].invoke(1, 1)
        end
        
        desc "Build in ios mode(minified javascript)"
        task :ios => [:clean] do
            set_platform("IOS")
            Rake::Task["javascript:minify"].invoke()
            Rake::Task[INDEX_HTML].invoke(1, 1)
        end
    end

end
