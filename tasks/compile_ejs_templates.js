//This file is executed by phantomjs
var EJS_EXTENSION = 'ejs';

var fs = require('fs');
var args = require('system').args;
var sep = fs.separator;
var rootDir = fs.workingDirectory + sep + "dmwa";
var jsDir = rootDir + sep + "public" + sep + "javascript" + sep + "dmwa";
var templatesDir =  rootDir + sep + "public" + sep + "javascript" + sep + "target" + sep + "templates";


if (!fs.exists(templatesDir)) {
    fs.makeTree(templatesDir);
}

// helper function to find files of a certain type
function findFilesByExtension (root, ext, dict) {
    if(dict === undefined) {
        dict = {};
    }
    var children = fs.list(root);
    for(var i=0; i < children.length; i++) {
        var child = children[i];
        var path = root + sep + child;
        if(fs.isFile(path)){
            var fileName = child.split('.');
            if(fileName.length === 2 && fileName[1] === ext) {
                var templateId = fileName[0];
                var templateStr = fs.read(path);
                dict[templateId] = templateStr;
            }
        } else if (fs.isDirectory(path) && child[0] !== ".") {
            findFilesByExtension(path, ext, dict);
        }
    }
    return dict;
}

// The (slightly modified) underscore.js template function
function templatize (str) {
    var c  = {evaluate    : /<%([\s\S]+?)%>/g,
              interpolate : /<%=([\s\S]+?)%>/g
             };
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
               '__p.push(\'' +
               str.replace(/\\/g, '\\\\')
                  .replace(/'/g, "\\'")
                  .replace(c.interpolate, function(match, code) {
                      return "'," + code.replace(/\\'/g, "'") + ",'";
                  })
                  .replace(c.evaluate || null, function(match, code) {
                      return "');" + code.replace(/\\'/g, "'")
                                         .replace(/[\r\n\t]/g, ' ') + "__p.push('";
                  })
                  .replace(/\r/g, '\\r')
                  .replace(/\n/g, '\\n')
                  .replace(/\t/g, '\\t') +
              "');return __p.join('');";
    var func = 'function anonymous(obj) { ' + tmpl + '}';
    return func;
}

// use regex to match the begining and end of the block
function removeCodeBlock(begingMark, endMark, inputStr) {
    var pattern = "(.|\n)*";
    var re = new RegExp(begingMark + pattern + endMark, "g");
    var out = inputStr.replace(re, "");
    return out;
}

// preprocess the input template string; only keep the specific 
// environment element block
function preprocess(platform, inputStr) {
    function getBeginMark(tag) {
        return "<!--" + tag + "-->";
    }
    function getEndMark(tag) {
        return "<!--END_" + tag + "-->";
    }
    var index = PLATFORMS.indexOf(platform);
    if (index > -1) {
        //remove the specified item in PLATFORMS so that code block will be kept
        PLATFORMS.splice(index, 1);
    }
    var out = PLATFORMS.reduce(function(pre, cur){
        return removeCodeBlock(getBeginMark(cur), getEndMark(cur), pre);
    }, inputStr);
    return out;
}

// helper function to compile templates
function generateTemplateIndex (path, indexPath, prefixString, platform) {
    var ejsTemplateDictionary = findFilesByExtension(path, EJS_EXTENSION);
    var templateIndex = [];
    for (templateId in ejsTemplateDictionary) {
        var templateStr = ejsTemplateDictionary[templateId];
        var envSpecificStr = preprocess(platform, templateStr);
        var functionStr = templatize(envSpecificStr);
        templateIndex.push("wz.dmwa.lib.templates.index.compiledTemplates['" + templateId + "'] = " + functionStr + ";");
    }
    var indexOutput = prefixString + templateIndex.join("\n");
    fs.write(indexPath, indexOutput, 'w');
}

// get command line argument: WEB, ANDROID, IOS
var PLATFORMS = ["WEB", "ANDROID", "IOS"];

var platform = args[1]
if (platform === undefined || PLATFORMS.indexOf(platform) < 0) {
    throw "Must specify what platform to build. choices: " + PLATFORMS;
    phantom.exit(-1);
}
// get app directories
// right now, only build templates in app dir
var buildDirs = ['app']
var keys = [];
var children = fs.list(jsDir);
for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var path = jsDir + sep + child;
    if (fs.isDirectory(path) && (buildDirs.indexOf(child) > -1)) {
        keys.push(child)
    }
}

//compile app templates
for (index in keys) {
    key = keys[index]
    var appPath = jsDir + sep + key + sep + "templates" + sep + "ejs"
    prefixString = "// This file is generated by compile_ejs_templates.js.\n\n" +
                  "goog.provide('wz.dmwa." + key + ".templates.index');\n" +
                  "goog.require('wz.dmwa.lib.templates.index');\n";
    indexPath = templatesDir + sep + key + "_template_index.js";
    templateIndex = generateTemplateIndex(appPath, indexPath, prefixString, platform);
}

phantom.exit(0);
