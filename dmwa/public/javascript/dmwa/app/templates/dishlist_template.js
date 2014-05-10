/**
 * The dishlist page template.
 */

goog.provide('wz.dmwa.app.templates.DishlistTemplate');

goog.require('wz.dmwa.core.templates.Template');
goog.require('wz.dmwa.lib.templates.renderTemplate');


(function () {

    var Template = wz.dmwa.core.templates.Template;
    var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

    /**
     * @constructor
     * @extends {wgen.assess.core.templates.ResultTemplate}
     */
    wz.dmwa.app.templates.DishlistTemplate = Template.extend({

        // template_id: 'dishlist_template',

        /**
         * Initialize template
         * @param options {Object}
         */
        initialize : function (options) {
            Template.prototype.initialize.call(this, options);
            this._logNamespace = "dishlist_template";
            //temproary fix
            this.templateId = "scrollable_template";
        },

        /**
         * Render header
         */
        header : function () {
            return renderTemplate("dishlist_header_template", this);
        },

        /**
         * Body header
         */
        body : function () {
            return renderTemplate("dishlist_body_template", this);
        },

        /**
         * Footer header
         */
        footer : function () {
            //return renderTemplate("dishlist_footer_template", this);
        }
        
    });

}());
