namespace :apache do

    HTTPS_PORT = ENV['HTTPS_PORT'] || '9000'
    HTTP_PORT = ENV['HTTP_PORT'] || '9001'

    def apache2ctl(cmd, environment=nil)
      notice("apache2: #{cmd}")

      if mac?
          config='etc/apache/httpd.dev.conf'
          platform='mac'
          exec='/usr/sbin/apachectl'
      elsif cygwin?
          platform='cygwin'
          config='etc/apache/platforms/cygwin.conf'
      elsif linux?
          platform='linux'
          config='etc/apache/apache2.conf'
          exec='/usr/sbin/apache2ctl'
      else
          notice('unkown os')
      end
        sh("PLATFORM='#{platform}' ENVIRONMENT='#{environment}' DMWA_HOME='#{DMWA_HOME}' HTTP_PORT='#{HTTP_PORT}' HTTPS_PORT='#{HTTPS_PORT}' #{exec} -f #{config} -k #{cmd} -d .")
    end

    namespace :start do

        desc "Start Apache Local"
        task :local do
            apache2ctl('start', 'local')
        end
    end
    
    desc "Stop apache."
    task :stop do
        apache2ctl('stop', 'local')
    end

end