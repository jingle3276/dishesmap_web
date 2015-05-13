var ejs = require('ejs');
var fs = require('fs');
var args = require('system').args;
var sep = fs.separator;

var indexHtmlPath = fs.workingDirectory + sep + "etc" + sep + "html" + sep + "index.html.ejs";
var templateStr = fs.read(indexHtmlPath);

isMinifyMode = !!Number(args[2]);
isPhonegapMode = !!Number(args[3]);
var html = ejs.render(templateStr, {
    minifyMode: isMinifyMode,  //development mode: load seperate js files. producton mode, load combined/minified file
    phonegapMode: isPhonegapMode
});

console.log(html);
phantom.exit();
