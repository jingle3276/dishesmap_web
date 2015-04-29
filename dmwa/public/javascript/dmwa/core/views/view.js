//
// Base class for views
//
goog.provide('wz.dmwa.core.views.View');

goog.require('wz.dmwa.lib.log');


(function () {

    var EVENT_SPLITTER = /^(\w+)\s*(.*)$/;
    var containerId = "home";

    wz.dmwa.core.views.View = Backbone.View.extend({
        
        el : $('#' + containerId),

        EVENTS : {},

        toBeUndelegated: [],

        _domEvents : {},

        downstateDelegateExceptions: [],

        _logNamespace : 'View',

        /**
         * Create a new View.
         * @this {wz.dmwa.core.views.View}
         */
        initialize : function (options) {
            options = options || {};
            if (options.cssClass) {
                this.$el.attr('class', options.cssClass);
            }
        },

        /**
         * @this {wz.dmwa.core.views.View}
         */
        start : function () {
            this.delegateEvents(this._domEvents);
        },

        /**
         * @this {wz.dmwa.core.views.View}
         */
        stop : function () {
            //this._undelegateDownStateEvents();
            this.$el.empty();
            this.$el.unbind();
        },

        /**
         * @this {wz.dmwa.core.views.View}
         */
        delegateEvents : function (events) {
            this.toBeUndelegated = [];
            for (var key in events) {
                var match = key.match(EVENT_SPLITTER);
                var eventName = match[1], selector = match[2];
                var body = $("body");
                if (selector !== '' &&
                        (!_.contains(this.toBeUndelegated, selector)) &&
                        (!_.contains(this.downstateDelegateExceptions, selector))) {
                    body.delegate(selector, 'vmousedown', this._addDownstate);
                    body.delegate(selector, 'vmouseup', this._removeDownstate);
                    body.delegate(selector + ".down", "mouseout", this._removeDownstate);
                    this.toBeUndelegated.push(selector);
                }
            }
            this._delegateEvents(events);
        },

        _delegateEvents : function (events) {
            events = events || this.events;
            if (events) {
                var element = this.$el;
                element.unbind();
                for (var key in events) {
                    var method = events[key];
                    //method = _.wrap(method, this._triggerSessionUpdate);
                    method = _.bind(method, this);
                    var match = key.match(EVENT_SPLITTER);
                    var eventName = match[1], selector = match[2];
                    if (selector === '') {
                        element.bind(eventName, method);
                    } else {
                        element.delegate(selector, eventName, method);
                    }
                }
            }
        },

        _addDownstate : function (event) {
            $(event.currentTarget).addClass("down");
        },

        _removeDownstate : function (event) {
            $(event.currentTarget).removeClass("down");
        }

    });


}());
