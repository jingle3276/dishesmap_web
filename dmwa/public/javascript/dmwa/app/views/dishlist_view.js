goog.provide('wz.dmwa.app.views.DishlistView');

goog.require('wz.dmwa.lib.log');
goog.require('wz.dmwa.lib.templates.renderTemplate');
goog.require('wz.dmwa.core.views.View');

goog.require('wz.dmwa.app.templates.DishlistTemplate');


(function () {

    var View = wz.dmwa.core.views.View;
    var DishlistTemplate = wz.dmwa.app.templates.DishlistTemplate;
    var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

    wz.dmwa.app.views.DishlistView = View.extend({

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
            return new DishlistTemplate(options);
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