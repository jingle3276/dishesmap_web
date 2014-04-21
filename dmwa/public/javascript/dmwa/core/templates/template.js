//
// Base template class to retrieve template elements
//

goog.provide('wz.dmwa.core.templates.Template');


goog.require('wz.dmwa.lib.templates.renderTemplate');
goog.require('wz.dmwa.lib.log');



(function () {

    /**
     * @constructor
     */
    wz.dmwa.core.templates.Template = function (options) {
        this.initialize(options);
    };

    _.extend(wz.dmwa.core.templates.Template.prototype, {
        /**
         * @this {wz.dmwa.core.templates.Template}
         */
        initialize : function (options) {
            this._logNamespace = "Template";
        },

        /**
         * @this {wz.dmwa.core.templates.Template}
         * @private
         */
        _getTemplate : function (data) {
            goog.asserts.assert(this.templateId, "templateId must be defined in Template subclass");
            data = data || {};
            return wz.dmwa.lib.templates.renderTemplate(this.templateId, data);
        },

        /**
         * @this {wz.dmwa.core.templates.Template}
         */
        render : function () {
            return this._getTemplate(this);
        },

        /**
         * @this {wz.dmwa.core.templates.Template}
         * @private
         */
        _log : function (msg) {
            wz.dmwa.lib.log(this._logNamespace + ": " + msg);
        }
    });

    wz.dmwa.core.templates.Template.extend = Backbone.Model.extend;
}());
