//
// Read and compile a template's ejs from the DOM, based on a jquery selector.
//
goog.provide('wz.dmwa.core.templates.renderTemplate');

goog.require('wz.dmwa.core.templates.index');

(function () {
    var templateCache = {};
    var compiledTemplates = wz.dmwa.core.templates.index.compiledTemplates;

    wz.dmwa.core.templates.renderTemplate = function (templateId, data) {
        data = data || {};
        var template = compiledTemplates[templateId];
        //asserts.assert(template, templateId + " not compiled");
        return template(data);
    };
}());
