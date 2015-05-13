var ejs = require('ejs');
var fs = require('fs');
var rootDir = fs.workingDirectory + sep + "dmwa";
var sep = fs.separator;
var index_html_path = rootDir + sep + "public" + sep + "test.html.ejs";
console.log(index_html_path);

var templateStr = fs.read(index_html_path);
var html = ejs.render(index_html_path, {
    title: 'wow'
});

console.log(html);

//page.content = html;
//page.render('test.html');
phantom.exit();
