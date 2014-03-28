namespace :apache do

    CONFIG = ENV['DMWA_APACHE_CONF'] || 'etc/apache/httpd.dev.conf'
    HTTPS_PORT = ENV['HTTPS_PORT'] || '9000'
    HTTP_PORT = ENV['HTTP_PORT'] || '9001'


    def apache2ctl(cmd, environment=nil)
      notice("apache2: #{cmd}")

      if mac?
          platform='mac'
          exec='/usr/sbin/apachectl'
      #TECH-DEBT: Make it work for ubuntu(or Linux) by having rake to determine platform in the main rakefile    
      #else 
      #    platform='ubuntu'
      #    exec='apache2ctl'    
  
      else
          platform='cygwin'
          exec='/usr/sbin/apachectl2'

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
        apache2ctl('stop', 'local')
    end



end 