/**
 * The dishlist page template.
 */

goog.provide('wz.dmwa.app.collections.DishlistItemCollection');

goog.require('wz.dmwa.app.models.DishlistItem');

(function () {

    var DishlistItem = wz.dmwa.app.models.DishlistItem;
 	var FIELDS = DishlistItem.prototype.FIELDS;

	wz.dmwa.app.collections.DishlistItemCollection = Backbone.Collection.extend({

		_logNamespace : 'DishlistItemCollection',

		model : DishlistItem,

		comparator : function(item){
			return -item.get(FIELDS.FREQ);
		}

	});

}());