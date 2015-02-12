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

        EVENTS : {GO_TO_DETAIL: "go_to_detail"},

        _logNamespace : 'DishlistView',

        // Called when the view is first created
        initialize: function (options) {
            this._domEvents = _.extend({}, this._domEvents, {
                "click .dl-item-group" : this._clickDishTitleHandler
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

        startLoading: function () {
            var html = renderTemplate("dishlist_loading");
            this.$el.empty().append(html);
        },

        stopLoading: function () {
            this.$el.empty();
        },

        start: function (options) {
            this._render(options); //render view
            //Set up DOM event handlers
            View.prototype.start.call(this);
        },

        _render: function (options) {
            var template = this._createTemplate(options);
            var content = template.render();
            this.$el.empty().append(content); //el is #home
        },

        _clickDishTitleHandler: function (ev) {
            var divNode = ev.currentTarget;
            var dishId = divNode.getElementsByClassName('dl-item-title')[0].getAttribute('dishid');
            this.trigger(this.EVENTS.GO_TO_DETAIL, dishId);
        }

    });

}());