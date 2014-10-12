goog.provide('wz.dmwa.app.views.DishdetailView');

goog.require('wz.dmwa.lib.log');
goog.require('wz.dmwa.lib.templates.renderTemplate');
goog.require('wz.dmwa.core.views.View');
goog.require('wz.dmwa.app.templates.DishdetailTemplate');


(function () {

    var View = wz.dmwa.core.views.View;
    var DishdetailTemplate = wz.dmwa.app.templates.DishdetailTemplate;
    var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

    wz.dmwa.app.views.DishdetailView = View.extend({

        EVENTS : {GO_BACK: "go_back"},

        _logNamespace : 'DishlistView',

        // Called when the view is first created
        initialize: function (options) {
            this._domEvents = _.extend({}, this._domEvents, {
                "click #dishdetail-back-button" : this._backButtonClickHandler
            });
            View.prototype.initialize.call(this, options);
            this._logNamespace = "DishlistView";
        },

        _backButtonClickHandler: function (options) {
            this.trigger(this.EVENTS.GO_BACK);
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