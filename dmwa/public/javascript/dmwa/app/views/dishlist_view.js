goog.provide('wz.dmwa.app.views.DishlistView');

goog.require('wz.dmwa.lib.log');
goog.require('wz.dmwa.lib.templates.renderTemplate');
goog.require('wz.dmwa.core.views.View');

(function () {

  var View = wz.dmwa.core.views.View;
  var renderTemplate = wz.dmwa.lib.templates.renderTemplate;

  wz.dmwa.app.views.DishlistView = View.extend({

    //EVENTS : {SUBMIT_CHANGE: "submit_change"},

    _logNamespace : 'DishlistView',

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
      //var html = renderTemplate('todo_template', contentObj);
      this.$el.html(html);
    }

  });

}());