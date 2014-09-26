/**
 * The dishlist page service
 */

goog.provide('wz.dmwa.app.services.DishlistService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.services.APIService');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');


(function () {

	var Service = wz.dmwa.core.services.Service;
	var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;
    var apiService = new wz.dmwa.app.services.APIService();

	wz.dmwa.app.services.DishlistService = Service.extend({

		_logNamespace : 'DishlistService',
        _apiService : apiService,

        initialize : function () {
            this._collection = new DishlistItemCollection();
            this._asyncServices.push(this._apiService);
            Service.prototype.initialize.call(this);
        },

        doneLoad : function () {
            //TODO: make this function be called after load promise resolved 
            var dishes = this._apiService.getDishes();
            this._collection.reset(dishes);
        },

        allDishes : function () {
        	return this._collection.models;
        }

	});

}());