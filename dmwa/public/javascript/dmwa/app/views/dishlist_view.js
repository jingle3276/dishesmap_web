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

            this._spinner = this._get_spinner();
        },
        
        _get_spinner: function () {
            //init spinner
            var opts = {
                lines: 13, // The number of lines to draw
                length: 20, // The length of each line
                width: 10, // The line thickness
                radius: 30, // The radius of the inner circle
                trail: 60, // Afterglow percentage
                className: 'spinner', // The CSS class to assign to the spinner
                top: '50%', // Top position relative to parent
                left: '50%' // Left position relative to parent
            };
            return new Spinner(opts);
        },

        /**
         * Initialize template
         * @param options {Object}
         */
        _createTemplate: function (options) {
            return new DishlistTemplate(options);
        },

        startLoadingSpinner: function () {
            var target = document.getElementById('home');
            $(target).append("<h3>Finding best dishes around you ...</h3>");
            this._spinner.spin(target);
        },

        stopLoadingSpinner: function () {
            this._spinner.stop();
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

        showZeroState: function(options) {
            alert("Sorry, no dishes found round you");
        },

        _clickDishTitleHandler: function (ev) {
            var divNode = ev.currentTarget;
            $(divNode).addClass("dl-highlight");
            var dishId = divNode.getElementsByClassName('dl-item-title')[0].getAttribute('dishid');
            this.trigger(this.EVENTS.GO_TO_DETAIL, dishId);
        },

        getCurrentScrollPosition: function() {
            return $(window).scrollTop();
        },

        goToScrollPosition: function(pos) {
            $(window).scrollTop(pos);
        }
    });

}());