#
# Release Tasks
#
namespace :release do
    PUBLIC_DIR = "#{DMWA_HOME}/dmwa/public"
    RELEASE_DIR = "#{DMWA_HOME}/release"
    TMP_DIR = "#{RELEASE_DIR}/tmp"

    DEPLOY_DEST = "root@yzhao.mooo.com:/mnt/storage/public/dmwa"
    PROD_DEST = "root@wisefoody.com:/var/www"

    task :clean do
        sh("rm -rf #{TMP_DIR}")
    end

    def copy_files()
        mkdir_p TMP_DIR
        sh("rsync -a #{PUBLIC_DIR}/javascript/built #{TMP_DIR}/javascript")
        sh("rsync -a #{PUBLIC_DIR}/stylesheets #{TMP_DIR}")
        sh("rsync -a #{PUBLIC_DIR}/index.html #{TMP_DIR}")
    end

    desc "build web app and compress to a tar file"
    task :tar => [:clean, 'setup:index_html:web'] do
        mkdir_p RELEASE_DIR
        copy_files()
        sh("tar -zvcf #{RELEASE_DIR}/dmwa_web_$(date +%Y%m%d_%H%M%S).tar.gz -C #{TMP_DIR} .")
        notice("webapp release tar file built successfully in #{RELEASE_DIR}")
    end

    desc "deploy to local server"
    task :deploy => [:tar] do
        sh("rsync -av --progress --delete #{TMP_DIR}/* #{DEPLOY_DEST}")
    end

    desc "deploy to production server"
    task :deploy_prod => [:tar] do
        # will prompt for ps
        sh("rsync -av --progress --delete #{TMP_DIR}/* #{PROD_DEST}")
    end

end