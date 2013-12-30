// Define a Todo Model
var Todo = Backbone.Model.extend({

	initialize: function() {
      console.log('This model has been initialized.');

      this.on('change', function(){
        console.log('Values for this model have changed.');
      });

  	}, 

	// Default todo attribute values
	defaults: {
		content: 'default content'
	},

	setContent: function(newContent){
		this.set({content: newContent});
	},

	getContent: function(){
		return this.get('content');
	}

});

var myTodo = new Todo();
