namespace :phonegap do

    # HTTPS_PORT = ENV['HTTPS_PORT'] || '9000'

    # def apache2ctl(cmd, environment=nil)
    #   notice("apache2: #{cmd}")

    #   end
    #     sh("PLATFORM='#{platform}' ENVIRONMENT='#{environment}' DMWA_HOME='#{DMWA_HOME}' HTTP_PORT='#{HTTP_PORT}' HTTPS_PORT='#{HTTPS_PORT}' #{exec} -f #{config} -k #{cmd} -d .")
    # end
    PROJECT_NAME = 'phonegap_build'
    PG_BUILD_HOME = "#{DMWA_HOME}/#{PROJECT_NAME}"
    PG_BUILD_HOME_WWW = "#{PG_BUILD_HOME}/www/"
    PGB_CONFIG_FILES = "etc/phonegap_build/"
    CORDOVA_CONFIG_FILES = "etc/cordova/"

    def run(cmd, dir="#{PG_BUILD_HOME}/")
        Dir.chdir(dir) do
            sh(cmd)
        end
    end

    # copy all resource files (html, js, css) to target dir
    def copy_files()
        sh("cp #{INDEX_HTML} #{PG_BUILD_HOME_WWW}")
        sh("cp -r #{JAVASCRIPT_DIR} #{PG_BUILD_HOME_WWW}")
        sh("cp -r #{CSS_DIR} #{PG_BUILD_HOME_WWW}")
    end

    desc "Create the phonegap build project"
    task :init => :remove do
        # package name must match AndroidManifest.xml
        sh("cordova create #{PROJECT_NAME} wz.dmwa wise_foody")
        Dir.chdir("#{PROJECT_NAME}/") do
            sh("cordova platform add android")
            sh("cordova platform add browser")
            sh("cordova plugin add org.apache.cordova.geolocation")
        end
        Rake::Task["phonegap:clean"].execute
        notice("Successfully install phonegap build project")
    end

    desc "Delete all build artifacts in www dir"
    task :clean do
        sh("rm -rf #{PG_BUILD_HOME_WWW}/*")
        notice("removed all files (build artifacts) in www")
    end

    desc "Remove the phonegap build project"
    task :remove do
        rm_rf PG_BUILD_HOME
        notice("Successfully deleted phonegap build project")
    end

    desc "Push phonegap_build branch to github for phonegap build"
    task :push_build => :clean do
        copy_files()
        sh("cp -r #{PGB_CONFIG_FILES} #{PG_BUILD_HOME_WWW}")
        run('git init', "#{PG_BUILD_HOME_WWW}")
        run('git add .', "#{PG_BUILD_HOME_WWW}")
        run('git commit -m "phonegap build"', "#{PG_BUILD_HOME_WWW}")
        run('git push -u --force git@github.com:jingle3276/wisefoody_build.git master', "#{PG_BUILD_HOME_WWW}")
    end

    namespace :android do

        desc "Build android apk and deploy to the device"
        task :run_device => [:clean, 'test:all'] do
            copy_files()
            sh("cp -r #{CORDOVA_CONFIG_FILES} #{PG_BUILD_HOME}")
            run('cordova run android')
        end

        desc "Build android apk and run in browser in debug mode"
        task :run_browser => [:clean, 'test:all'] do
            copy_files()
            run('cordova run browser --debug')
        end

        desc "Build android apk for release"
        task :release => [:clean, 'test:all'] do
            copy_files()
            run('cordova build android --release')
        end
    end

end
