goog.provide('wz.dmwa.todo.views.TodoView');

goog.require('wz.dmwa.lib.log');
goog.require('wz.dmwa.core.templates.renderTemplate');

(function () {

  var View = wz.dmwa.core.views.View;
  var renderTemplate = wz.dmwa.core.templates.renderTemplate;

  wz.dmwa.todo.views.TodoView = View.extend({

    EVENTS : {SUBMIT_CHANGE: "submit_change"},

    _logNamespace : 'TodoView',

    // Called when the view is first created
    initialize: function() {
      this._domEvents = _.extend({}, this._domEvents, {
        "click #change_button" : this._changeButtonClickHandler
      });
    },

    start: function() {
      //render view 
      this.render("default");
      //Set up DOM event handlers
      View.prototype.start.call(this);
    },

    //
    render: function(item) {
      var contentObj = {content: item};
      var html = renderTemplate('todo_template', contentObj);
      this.$el.html(html);
    },

    getInput: function() {
      return this.$el.find("#input").val();
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