goog.provide('wz.dmwa.app.models.DishlistItem');


(function () {
// Define a Todo Model
	wz.dmwa.app.models.DishlistItem = Backbone.Model.extend({

		initialize: function() {
	        console.log('This model has been initialized.');

	      this.on('change', function(){
	        console.log('Values for this model have changed.');
	      });

	  	}, 

		// Default todo attribute values
		defaults: {
			content: 'default content'
		}

	});

}());