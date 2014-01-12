goog.provide('wz.dmwa.views.TodoView');

goog.require('wz.dmwa.models.Todo');
goog.require('wz.dmwa.lib.log');
goog.require('wz.dmwa.core.templates.renderTemplate');

(function () {

  var myTodo = wz.dmwa.models.Todo;
  var EVENT_SPLITTER = /^(\w+)\s*(.*)$/;

  var renderTemplate = wz.dmwa.core.templates.renderTemplate;

  wz.dmwa.views.TodoView = Backbone.View.extend({

    EVENTS : {SUBMIT_CHANGE: "submit_change"},

    el : $('#todo'),

    toBeUndelegated: [],

    _domEvents : {},

    downstateDelegateExceptions: [],

    _logNamespace : 'View',

    //events: {
      //"click input[type=button]": "doChange"
    //  'click #change_button': 'doChange'
    //},

    // Called when the view is first created
    initialize: function() {
      this.submitEvent = _.extend({}, {
        "click #change_button" : this._changeButtonClickHandler
      });
    },

    start: function() {
      //render view 
      this.render("default");

      //Set up DOM event handlers
      this.delegateEvents(this.submitEvent);
    },

    //
    render: function(item) {
      var contentObj = {content: item};
      //var compiled = _.template($("#todo_template").html(), contentObj);
      //this.$el.find("#display").html(compiled);
      var html = renderTemplate('todo_template', contentObj);
      this.$el.html(html);
    },

    getInput: function() {
      return this.$el.find("#input").val();
    },

    /**
     * @this {wgen.assess.common.views.View}
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
                if (_.isString(method)) {
                    /*
                     * TODO: Remove me
                     * The option to delegate events by function name is incompatible with
                     * aggressive minification. Remove this once all views have
                     * transitioned to delegating by function.
                     */
                    method = this[method];
                }
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
    },

    /**
    * param: event: jQuery.Event object
    */
    _changeButtonClickHandler : function (event) {
        wz.dmwa.lib.log(this._logNamespace + " change_buttonClickHandler ");
        //this.disableEventHandlers();
        //event.preventDefault();
        //backbone's trigger method
        this.trigger(this.EVENTS.SUBMIT_CHANGE);
    }

  });

}());