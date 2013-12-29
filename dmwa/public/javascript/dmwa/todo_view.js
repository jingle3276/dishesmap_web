var TodoView = Backbone.View.extend({

  tagName:  'input',

  events: {
    //"click input[type=button]": "doChange"
    'click #change_button': 'doChange'
  },

  // Called when the view is first created
  initialize: function() {
    this.$el = $('#todo');
    this.render();
  },

  //
  render: function() {
    var compiled = _.template($("#todo_template").html(), this.model.toJSON());
    this.$el.find("#inner_todo").html(compiled);
  },

  doChange: function(event) {
    // Button clicked, you can access the element that was clicked with event.currentTarget
    this.model.setContent("EFG");
    this.render();
  }

});

// create a view for a todo
var todoView = new TodoView({model: myTodo});
