goog.provide('wz.dmwa.app.views.DishdetailView');

goog.require('wz.dmwa.lib.log');
goog.require('wz.dmwa.lib.templates.renderTemplate');
goog.require('wz.dmwa.core.views.View');
goog.require('wz.dmwa.app.templates.DishdetailTemplate');

//FIXME: should not add this, since asserts is not dependency of this controller.
// but if not adding, it fails on assert in template.js. 
// try resolve this once router is implemented.
goog.require('goog.asserts');

(function () {

    var View = wz.dmwa.core.views.View;
    var DishdetailTemplate = wz.dmwa.app.templates.DishdetailTemplate;
    var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

    wz.dmwa.app.views.DishdetailView = View.extend({

        //EVENTS : {SUBMIT_CHANGE: "submit_change"},

        _logNamespace : 'DishlistView',

        // Called when the view is first created
        initialize: function (options) {
            this._domEvents = _.extend({}, this._domEvents, {
                //"click #change_button" : this._changeButtonClickHandler
            });
            View.prototype.initialize.call(this, options);
            this._logNamespace = "DishlistView";
        },
        
        /**
         * Initialize template
         * @param options {Object}
         */
        _createTemplate: function (options) {
            return new DishdetailTemplate(options);
        },

        start: function (options) {
            this._render(options); //render view
            //Set up DOM event handlers
            View.prototype.start.call(this);
        },

        _render: function (options) {
            var content = this._createTemplate(options).render();
            this.$el.empty().append(content); //el is #home
        }
    });

}());