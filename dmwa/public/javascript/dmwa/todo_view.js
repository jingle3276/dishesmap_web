goog.provide('wz.dmwa.views.TodoView');

goog.require('wz.dmwa.models.Todo');

(function () {

  var myTodo = wz.dmwa.models.Todo;

  wz.dmwa.views.TodoView = Backbone.View.extend({

    tagName:  'input',

    events: {
      //"click input[type=button]": "doChange"
      'click #change_button': 'doChange'
    },

    // Called when the view is first created
    initialize: function() {
      this.$el = $('#todo');
      this.model = new myTodo();
      this.render();
    },

    //
    render: function() {
      var compiled = _.template($("#todo_template").html(), this.model.toJSON());
      this.$el.find("#display").html(compiled);
    },

    doChange: function(event) {
      // Button clicked, you can access the element that was clicked with event.currentTarget
      var content = this.$el.find("#input").val();
      this.model.setContent(content);
      this.render();
    }

  });
  // create a view for a todo
  //todoView = new wz.dmwa.views.TodoView({model: myTodo});

}());