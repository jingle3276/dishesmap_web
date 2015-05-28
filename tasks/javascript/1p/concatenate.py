'''
this python module combine multiple files into one in the defined order
'''

base_dir = "dmwa/public/javascript/3p/min"
out_file = "dmwa/public/javascript/built/3p.min.js"

src_files = [
    "jquery.min.js",
    "underscore.min.js",
    "backbone.min.js",
    "backbone.localStorage.min.js",
    "bootstrap.min.js",
    "spin.min.js",
    "fastclick.min.js"
]
read_files = ["{}/{}".format(base_dir, src_f) for src_f in src_files]
with open(out_file, "wb") as outfile:
    for f in read_files:
        with open(f, "rb") as infile:
            outfile.write(infile.read())
print "Successfully generated file at {}".format(out_file)