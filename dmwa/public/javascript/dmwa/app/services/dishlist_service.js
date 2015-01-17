/**
 * The dishlist page service
 */

goog.provide('wz.dmwa.app.services.DishlistService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.services.APIService');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');
goog.require('wz.dmwa.app.models.DishlistItem');
goog.require('wz.dmwa.app.models.Dishdetail');


(function () {

	var Service = wz.dmwa.core.services.Service;
	var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;
    var DishlistItem = wz.dmwa.app.models.DishlistItem;
    var Dishdetail = wz.dmwa.app.models.Dishdetail;
    var apiService = wz.dmwa.app.services.APIService;
    

	var DishlistService = Service.extend({

		_logNamespace : 'DishlistService',
        _apiService : apiService,

        initialize : function () {
            this._dishCollection = new DishlistItemCollection();
            this._asyncServices.push(this._apiService);
            //this._asyncServices.push(locationService);
            Service.prototype.initialize.call(this);
        },

        _initializeModels : function () {


        },

        allDishes : function () {
            //using fetch() here couldn't fetch all the models. Not sure why.
            var models = this._dishCollection.localStorage.findAll();
            this._dishCollection.reset(models);
            return this._dishCollection.models;
        }

    });

    wz.dmwa.app.services.DishlistService = new DishlistService();

}());