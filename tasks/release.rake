#
# Release Tasks
#
namespace :release do
    PUBLIC_DIR = "#{DMWA_HOME}/dmwa/public"
    RELEASE_DIR = "#{DMWA_HOME}/release"

    #TODO
    desc "build android apk and deploy to the device"
    task :tar => ['javascript:build'] do
        mkdir_p RELEASE_DIR
        sh("tar czf #{RELEASE_DIR}/dmwa_web_$(date +%Y%m%d_%H%M%S).tar.gz #{PUBLIC_DIR}")
        notice("webapp release tar file built successfully in #{RELEASE_DIR}")
    end

end