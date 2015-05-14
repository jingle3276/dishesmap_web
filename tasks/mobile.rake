namespace :mobile do

    PROJECT_NAME = 'mobile_build'
    BUILD_HOME = "#{DMWA_HOME}/#{PROJECT_NAME}"
    BUILD_HOME_WWW = "#{BUILD_HOME}/www/"
    PGB_CONFIG_FILES = "etc/phonegap_build/"
    CORDOVA_CONFIG_FILES = "etc/cordova/"
    BUILD_HOME_WWW_MINIFIED_JS = "#{BUILD_HOME_WWW}javascript/built/dmwa_all.js"


    def run(cmd, dir="#{BUILD_HOME}/")
        Dir.chdir(dir) do
            sh(cmd)
        end
    end

    file BUILD_HOME_WWW => ['javascript:build', INDEX_HTML, JAVASCRIPT_DIR, CSS_DIR] do
        sh("cp #{INDEX_HTML} #{BUILD_HOME_WWW}")
        sh("cp -r #{JAVASCRIPT_DIR} #{BUILD_HOME_WWW}")
        sh("cp -r #{CSS_DIR} #{BUILD_HOME_WWW}")
    end

    file BUILD_HOME_WWW_MINIFIED_JS => ["javascript:minify"] do
        rm_rf "#{BUILD_HOME_WWW}javascript/"
        mkdir_p "#{BUILD_HOME_WWW}javascript/built/"
        mkdir_p "#{BUILD_HOME_WWW}javascript/3p/"
        sh("cp -r 'dmwa/public/javascript/3p/' #{BUILD_HOME_WWW}javascript/3p/")
        sh("cp -r 'dmwa/public/javascript/built/dmwa_all.js' #{BUILD_HOME_WWW_MINIFIED_JS}")
    end

    file BUILD_HOME do
        sh("cordova create #{PROJECT_NAME} wz.dmwa wise_foody")
        Dir.chdir("#{PROJECT_NAME}/") do
            sh("cordova platform add android")
            sh("cordova platform add browser")
            sh("cordova plugin add org.apache.cordova.geolocation")
        end
        sh("rm -rf #{BUILD_HOME_WWW}/*")
        notice("Successfully installed cordova build project")
    end

    task :init => BUILD_HOME
    
    task :clean do
        sh("rm -rf #{BUILD_HOME_WWW}/*")
    end

    desc "Remove the mobile build project"
    task :remove do
        rm_rf BUILD_HOME
        notice("Successfully deleted mobile build project")
    end

    desc "Push to github for phonegap build"
    task :push_build => [:init, :clean, 'setup:index_html:prod', BUILD_HOME_WWW, BUILD_HOME_WWW_MINIFIED_JS] do
        sh("cp -r #{PGB_CONFIG_FILES} #{BUILD_HOME_WWW}")
        run('git init', "#{BUILD_HOME_WWW}")
        run('git add .', "#{BUILD_HOME_WWW}")
        run('git commit -m "phonegap build"', "#{BUILD_HOME_WWW}")
        run('git push -u --force git@github.com:jingle3276/wisefoody_build.git master', "#{BUILD_HOME_WWW}")
    end

    namespace :android do

        desc "Build android apk and deploy to the device"
        task :run_device => [:init, :clean, 'setup:index_html:prod', BUILD_HOME_WWW, BUILD_HOME_WWW_MINIFIED_JS] do
            sh("cp -r #{CORDOVA_CONFIG_FILES} #{BUILD_HOME}")
            run('cordova run android')
        end

        desc "Build android apk and run in browser in debug mode"
        task :run_browser => [:init, :clean, 'setup:index_html:phonegap', BUILD_HOME_WWW] do
            run('cordova run browser --debug')
        end

        desc "Build android apk for release"
        task :release => [:init, :clean, 'setup:index_html:phonegap', BUILD_HOME_WWW] do
            run('cordova build android --release')
        end
    end

end
