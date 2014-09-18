/**
 * The dishlist page template.
 */

goog.provide('wz.dmwa.app.services.DishlistService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');


(function () {

	var Service = wz.dmwa.core.services.Service;
	var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;

	wz.dmwa.app.services.DishlistService = Service.extend({

		_logNamespace : 'DishlistService',

        initialize : function () {
            this._collection = new DishlistItemCollection();

            Service.prototype.initialize.call(this);
        },

        fetch : function () {
        	//mock fetch by loading from a JSON file
        	var self = this;
        	return $.getJSON("javascript/dmwa/app/services/dishes.json", function (json) {
        		self._collection.reset(json.dishes);
        	});
        },

        load : function () {
        	//var dishes = this.fetch();
        	//this._collection.set(dishes);	
        	return this.fetch();
        },

        all : function () {
        	return this._collection.models;
        },

        get : function (irOrIds) {

        }

	});

}());