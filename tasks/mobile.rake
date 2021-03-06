namespace :mobile do

    PROJECT_NAME = 'mobile_build'
    BUILD_HOME = "#{DMWA_HOME}/#{PROJECT_NAME}"
    BUILD_HOME_WWW = "#{BUILD_HOME}/www/"
    PGB_CONFIG_FILES = "etc/phonegap_build/"
    CORDOVA_CONFIG_FILES = "etc/cordova/"

    Rake::FileList.new("#{JAVASCRIPT_DMWA_DIR}/**/ejs/*.ejs").each do |src|
        file TARGET_EJS_INDEX_FILE => src
    end

    def run(cmd, dir="#{BUILD_HOME}/")
        Dir.chdir(dir) do
            sh(cmd)
        end
    end

    file BUILD_HOME_WWW => [INDEX_HTML, JAVASCRIPT_DIR, CSS_DIR] do
        sh("cp #{INDEX_HTML} #{BUILD_HOME_WWW}")
        sh ("mkdir -p #{BUILD_HOME_WWW}/javascript/built")
        sh("cp -r #{JAVASCRIPT_DIR}/built #{BUILD_HOME_WWW}/javascript/")
        sh("cp -r #{CSS_DIR} #{BUILD_HOME_WWW}")
        sh("cp -r #{IMAGES_DIR} #{BUILD_HOME_WWW}")
    end

    # Create Cordova phonegap_build project folder
    file BUILD_HOME do
        sh("cordova create #{PROJECT_NAME} wz.dmwa wise_foody")
        Dir.chdir("#{PROJECT_NAME}/") do
            sh("cordova platform add android")
            sh("cordova platform add ios")
            sh("cordova platform add browser")
            sh("cordova plugin add org.apache.cordova.geolocation")
        end
        #Clean default www folder content
        sh("cp -r #{PGB_CONFIG_FILES}/*  #{BUILD_HOME}")
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

    namespace :android do

        desc "Build android apk and deploy to the device"
        task :run_device => [BUILD_HOME, :clean, 'setup:index_html:android', BUILD_HOME_WWW] do
            sh("cp -r #{CORDOVA_CONFIG_FILES} #{BUILD_HOME}")
            run('cordova run android')
        end

        desc "Build android apk and run in browser in debug mode"
        task :run_browser => [:init, :clean, 'setup:index_html:android', BUILD_HOME_WWW] do
            run('cordova run browser --debug')
        end

        desc "Build android apk for release"
        task :release => [:init, :clean, 'setup:index_html:prod', BUILD_HOME_WWW] do
            run('cordova build android --release')
        end

        desc "Push to github for android phonegap build"
        task :push_build => [:init, :clean, 'setup:index_html:android', BUILD_HOME_WWW] do
            sh("cp -r #{PGB_CONFIG_FILES} #{BUILD_HOME_WWW}")
            run('git init', "#{BUILD_HOME_WWW}")
            run('git add .', "#{BUILD_HOME_WWW}")
            run('git commit -m "phonegap android build"', "#{BUILD_HOME_WWW}")
            run('git push -u --force git@github.com:jingle3276/wisefoody_build.git master', "#{BUILD_HOME_WWW}")
        end
    end

    namespace :ios do
        desc "Build ios project to be open in xcode"
        task :xcode => [BUILD_HOME, :clean, 'setup:index_html:ios', BUILD_HOME_WWW] do
            run('cordova build ios')

            # mobile_build/platforms/ios/Wise Foody/Images.xcassets/LaunchImage.launchimage
            # FIXME: Copying png files to xcode launchimage dir to overide default images
            # This is a temp solution. Better way is to define icon and launch pngs in Cordova config 
            # Clean default Launch images

            #run('rm platforms/ios/Wise\ Foody/Images.xcassets/LaunchImage.launchimage/*.png')
            run('cp -r ../etc/ios_build/images/LaunchImage.launchimage/*.png platforms/ios/Wise\ Foody/Resources/splash/')
        end

        desc "Push to github for ios phonegap build"
        task :push_build => [:init, :clean, 'setup:index_html:ios', BUILD_HOME_WWW] do
            sh("cp -r #{PGB_CONFIG_FILES} #{BUILD_HOME_WWW}")
            run('git init', "#{BUILD_HOME_WWW}")
            run('git add .', "#{BUILD_HOME_WWW}")
            run('git commit -m "phonegap ios build"', "#{BUILD_HOME_WWW}")
            run('git push -u --force git@github.com:jingle3276/wisefoody_build.git master', "#{BUILD_HOME_WWW}")
        end

    end

end
