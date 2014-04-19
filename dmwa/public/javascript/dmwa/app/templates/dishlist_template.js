/**
 * The dishlist page template.
 */

goog.provide('wz.dmwa.app.templates.DishlistTemplate');

goog.require('wz.dmwa.lib.templates.renderTemplate');


(function () {

    var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

    /**
     * @constructor
     * @extends {wgen.assess.core.templates.ResultTemplate}
     */
    wz.dmwa.app.templates.DishlistTemplate = ResultTemplate.extend({

        /**
         * Create a motivation template.
         * @this {wgen.assess.core.templates.MotivationTemplate}
         */
        initialize : function (options) {
            options.activeTabId = 'motiv_tab';
            ResultTemplate.prototype.initialize.call(this, options);
            this._logNamespace = "MotivationTemplate";
        },

        /**
         * @this {wgen.assess.core.templates.MotivationTemplate}
         */
        content : function () {
            return renderTemplate('motivation_slider_template');
        }
    });

}());
