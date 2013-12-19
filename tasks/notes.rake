namespace "notes" do

    def find_in_source(pattern)
        exts = %w{sql js py mako ini cfg ini}
        types = exts.collect{|e| "-name \"*.#{e}\""}.join(" -o ")
        sh "find . \\( #{types} \\) -exec grep -Hni #{pattern} {} \\;"
    end

    desc "Show all tech debt notes."
    task :debt do
        find_in_source('TECH-DEBT')
    end

    desc "Show all fixme notes."
    task :fixme do  
        find_in_source('FIXME')
    end

end
