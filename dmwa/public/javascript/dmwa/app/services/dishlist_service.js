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
            Service.prototype.initialize.call(this);
        },

        _initializeDishModels : function () {


        },

        allDishes : function () {
            var rawDishes = this._apiService.getDishes();
            var rawBusinesses = this._apiService.getBusinesses();
            var FIELDS = DishlistItem.prototype.FIELDS;
            
            var dishViewModels = _.map(rawDishes.models, function(d){
                var business = _.first(rawBusinesses.where({bizID: d.get('bizID')}));
                var attrs = {};
                attrs[FIELDS.BIZ_NAME] = business.get('name');
                attrs[FIELDS.FOOT_TEXT] = d.get('foodText');
                attrs[FIELDS.FREQ] = d.get('freq');
                //FIXME: hardcoded value
                attrs[FIELDS.DISTANCE] = 0.6;
                return new DishlistItem(attrs);
            });

            this._dishCollection.reset(dishViewModels);
        	return this._dishCollection.models;
        },

        getDishDetail : function (dishName) {
            var attrs = {};
            var FIELDS =  Dishdetail.prototype.FIELDS;
            attrs[FIELDS.FOOD_TEXT] = dishName;
            var reviews = _.first(this._apiService.getDishes().where({foodText: dishName}));
            attrs[FIELDS.REVIEWS] = _.map(reviews.get('reviews'), function (r) {
                return r.text;
            });
            return new Dishdetail(attrs);
        }


    });

    wz.dmwa.app.services.DishlistService = new DishlistService();

}());