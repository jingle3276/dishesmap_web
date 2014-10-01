/**
 * The dishlist page template.
 */

goog.provide('wz.dmwa.app.collections.DishlistItemCollection');

goog.require('wz.dmwa.app.models.DishlistItem');


(function () {

    var DishlistItem = wz.dmwa.app.models.DishlistItem;

	wz.dmwa.app.collections.DishlistItemCollection = Backbone.Collection.extend({

		_logNamespace : 'DishlistItemCollection',

		model : DishlistItem

	});

}());