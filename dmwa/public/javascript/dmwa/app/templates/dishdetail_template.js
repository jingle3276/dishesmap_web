/**
 * The dishdetail page template.
 */

goog.provide('wz.dmwa.app.templates.DishdetailTemplate');

goog.require('wz.dmwa.core.templates.Template');
goog.require('wz.dmwa.lib.templates.renderTemplate');


(function () {

    var Template = wz.dmwa.core.templates.Template;
    var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

    /**
     * @constructor
     * @extends {wgen.assess.core.templates.ResultTemplate}
     */
    wz.dmwa.app.templates.DishdetailTemplate = Template.extend({

        templateId: 'dishdetail_template',

        /**
         * Initialize template
         * @param options {Object}
         */
        initialize : function (options) {
            Template.prototype.initialize.call(this, options);
        },

        header : function () {
            return renderTemplate("dishdetail_header_element", this);
        },

        body : function () {
            return renderTemplate("dishdetail_body_element", this);
        },

        footer : function () {
            return renderTemplate("dishdetail_footer_element", this);
        }

    });

}());
