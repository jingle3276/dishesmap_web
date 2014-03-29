namespace :apache do

    HTTPS_PORT = ENV['HTTPS_PORT'] || '9000'
    HTTP_PORT = ENV['HTTP_PORT'] || '9001'


    def apache2ctl(cmd, environment=nil)
      notice("apache2: #{cmd}")

      if mac?
          config='etc/apache/httpd.dev.conf'
          platform='mac'
          exec='/usr/sbin/apachectl'
      #TECH-DEBT: Make it work for ubuntu(or Linux) by having rake to determine platform in the main rakefile    
      #else 
      #    platform='ubuntu'
      #    exec='apache2ctl'    
  
      else
          platform='cygwin'
          config='etc/apache/platforms/cygwin.conf' #TECH_DEBT: In Cygwin windows use a whole config file instead of including
          exec='/usr/sbin/apachectl2'

      end
        sh("PLATFORM='#{platform}' ENVIRONMENT='#{environment}' HTTP_PORT='#{HTTP_PORT}' HTTPS_PORT='#{HTTPS_PORT}' #{exec} -f #{config} -k #{cmd} -d .")
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