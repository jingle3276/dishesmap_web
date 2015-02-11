namespace :phonegap do

    # HTTPS_PORT = ENV['HTTPS_PORT'] || '9000'

    # def apache2ctl(cmd, environment=nil)
    #   notice("apache2: #{cmd}")

    #   end
    #     sh("PLATFORM='#{platform}' ENVIRONMENT='#{environment}' DMWA_HOME='#{DMWA_HOME}' HTTP_PORT='#{HTTP_PORT}' HTTPS_PORT='#{HTTPS_PORT}' #{exec} -f #{config} -k #{cmd} -d .")
    # end
    PROJECT_NAME = 'phonegap_build'
    PG_BUILD_HOME = "#{DMWA_HOME}/#{PROJECT_NAME}"
    PG_SRC_DIR = "#{CODE_DIR}/phonegap_src"

    def run(cmd)
        Dir.chdir("#{PROJECT_NAME}/") do
            sh(cmd)
        end
    end

    namespace :setup do
        desc "Create the phonegap android build project"
        task :android do
            sh("cordova create #{PROJECT_NAME} wz.dmwa DishesMap")
            Dir.chdir("#{PROJECT_NAME}/") do
                sh("cordova platform add android")
                sh("cordova platform add browser")
                #FIXME: 2015-2-9. Phonegap's gelocation has bug and cannot be used
                #sh("cordova plugin add org.apache.cordova.geolocation")
            end
            notice("Successfully install phonegap android build project")
        end

        desc "Remove the phonegap build project"
        task :remove do
            rm_rf PG_BUILD_HOME
            notice("Successfully removed phonegap build project")
        end
    end

    namespace :android do

        def copy_files()
            sh("cp -r #{PG_SRC_DIR}/* #{PG_BUILD_HOME}")
            sh("cp -r #{JAVASCRIPT_DIR} #{PG_BUILD_HOME}/www")
            sh("cp -r #{CSS_DIR} #{PG_BUILD_HOME}/www")
        end

        desc "build android apk and deploy to the device"
        task :run_device => [:clean, 'test:all'] do
            copy_files()
            run('cordova run android')
        end

        desc "build android apk and run in browser"
        task :run_browser => [:clean, 'test:all'] do
            copy_files()
            run('cordova run browser --debug')
        end

        desc "build android apk for release"
        task :release => [:clean, 'test:all'] do
            copy_files()
            run('cordova build android --release')
        end

        desc "clean android build artifacts"
        task :clean do
            sh("rm -rf #{PG_BUILD_HOME}/www/*")
            notice("removed android build artifacts")
        end
    end


end