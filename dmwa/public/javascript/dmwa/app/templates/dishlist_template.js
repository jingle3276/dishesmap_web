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
            return renderTemplate("dishlist_footer_template", this);
        },




        renderReminderGroup: function (reminderGroup) {
            var result = _.map(reminderGroup, function (reminderSection) {
                return this.renderReminderSection(reminderSection);
            }, this);
            return result.join(' ');
        },

        /**
         * Rendering reminder (one row on reminder page)
         * @param reminder {Array}
         */
        renderReminderSection : function (reminderSection) {
            return renderTemplate("reminder_item_template", {sections: reminderSection});
        },

        nextButton : function () {
            return renderTemplate("next_button_template", {
                buttonText: this.nextButtonName,
                additionalClass : "reminder_proceed"
            });
        }

        
    });

}());
