/**
 * The dishlist page service
 */

goog.provide('wz.dmwa.app.services.DishlistService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.services.APIService');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');
goog.require('wz.dmwa.app.models.DishlistItem');
goog.require('wz.dmwa.app.models.Dishdetail');
goog.require('wz.dmwa.app.services.LocationService');


(function () {

	var Service = wz.dmwa.core.services.Service;
	var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;
    var DishlistItem = wz.dmwa.app.models.DishlistItem;
    var Dishdetail = wz.dmwa.app.models.Dishdetail;
    var apiService = wz.dmwa.app.services.APIService;
    var locationService = wz.dmwa.app.services.LocationService;

	var DishlistService = Service.extend({

		_logNamespace : 'DishlistService',
        _apiService : apiService,

        initialize : function () {
            this._dishCollection = new DishlistItemCollection();
            this._asyncServices.push(this._apiService);
            this._asyncServices.push(locationService);
            Service.prototype.initialize.call(this);
        },

        _initializeModels : function () {


        },

        allDishes : function () {
            var rawDishes = this._apiService.getDishes();
            var rawBusinesses = this._apiService.getBusinesses();
            var FIELDS = DishlistItem.prototype.FIELDS;
            
            var dishViewModels = _.map(rawDishes.models, function(d){
                var business = _.first(rawBusinesses.where({bizID: d.get('bizID')}));
                var attrs = {};
                
                attrs[FIELDS.FOOT_TEXT] = d.get('foodText');
                attrs[FIELDS.FREQ] = d.get('freq');
                if (business){
                    attrs[FIELDS.BIZ_NAME] = business.get('name');
                    attrs[FIELDS.DISTANCE] = locationService.getDistanceFromLatLonInMi(
                        business.get('lat'), business.get('lon'));
                }
                return new DishlistItem(attrs);
            });

            this._dishCollection.reset(dishViewModels);
        	return this._dishCollection.models;
        },

        getDishDetail : function (dishName) {
            var attrs = {};
            var FIELDS =  Dishdetail.prototype.FIELDS;
            attrs[FIELDS.FOOD_TEXT] = dishName;
            var dish = _.first(this._apiService.getDishes().where({foodText: dishName}));
            attrs[FIELDS.REVIEWS] = _.map(dish.get('reviews'), function (r) {
                return r.text;
            });

            var rest = _.first(this._apiService.getBusinesses().where({bizID: dish.get('bizID')}));
            attrs[FIELDS.BIZ_NAME] = rest.get('name');
            attrs[FIELDS.BIZ_ADDR] = rest.get('address');
            attrs[FIELDS.BIZ_TEL] = rest.get('phone');

            return new Dishdetail(attrs);
        }


    });

    wz.dmwa.app.services.DishlistService = new DishlistService();

}());