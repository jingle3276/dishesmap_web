namespace :apache do

    CONFIG = ENV['DMWA_APACHE_CONF'] || 'etc/apache/httpd.dev.conf'
    HTTPS_PORT = ENV['HTTPS_PORT'] || '8000'
    HTTP_PORT = ENV['HTTP_PORT'] || '8001'


    def apache2ctl(cmd, environment=nil)
      notice("apache2ctl: #{cmd}")

      if mac?
          platform='mac'
          exec='/usr/sbin/apachectl'
      else
          platform='ubuntu'
          exec='apache2ctl'
      end
        sh("PLATFORM='#{platform}' ENVIRONMENT='#{environment}' HTTP_PORT='#{HTTP_PORT}' HTTPS_PORT='#{HTTPS_PORT}' #{exec} -f #{CONFIG} -k #{cmd} -d .")
    end

	namespace :start do

        desc "Start Apache"
        task :local do
            apache2ctl('start', 'local')
        end
    end

    desc "Stop apache."
    task :stop do
        apache2ctl('stop', 'fqa')
    end

end 