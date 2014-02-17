//
// Read and compile a template's ejs from the DOM, based on a jquery selector.
//
goog.provide('wz.dmwa.lib.templates.renderTemplate');

goog.require('wz.dmwa.lib.templates.index');

(function () {
    var templateCache = {};
    var compiledTemplates = wz.dmwa.lib.templates.index.compiledTemplates;
    var asserts = goog.asserts;

    wz.dmwa.lib.templates.renderTemplate = function (templateId, data) {
        data = data || {};
        var template = compiledTemplates[templateId];
        asserts.assert(template, templateId + " not compiled");
        return template(data);
    };
}());
