//make request to remote API, map raw json into models and persistent 
//them into localStorage via collections 
goog.provide('wz.dmwa.app.services.APIService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');
goog.require('wz.dmwa.app.collections.DishdetailCollection');
goog.require('wz.dmwa.app.models.DishlistItem');
goog.require('wz.dmwa.app.models.Dishdetail');
goog.require('wz.dmwa.app.services.LocationService');


(function () {

    var Service = wz.dmwa.core.services.Service;
    var locationService = wz.dmwa.app.services.LocationService;
    var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;
    var DishdetailCollection = wz.dmwa.app.collections.DishdetailCollection;
    var Dishdetail = wz.dmwa.app.models.Dishdetail;
    var DishlistItem = wz.dmwa.app.models.DishlistItem;

	var APIService = Service.extend({

		_logNamespace : 'APIService',

        initialize : function () {
            Service.prototype.initialize.call(this);
            this._is_first_load = true;
        },

        load : function () {
            var d = $.Deferred();

        	var self = this;
            if (this._is_first_load){
                //this service must wait locationService resolved and then 
                //send ajax request.
                var locationServicePromise = locationService.load();
                locationServicePromise.done(function(){
                    var lat = locationService.get_lat();
                    var lon = locationService.get_lon();
                    //producation
                    var request_url = "http://192.241.173.181:8080/food/where/";
                    //local service for test
                    //var request_url =  "http://localhost:3000/foodlist/where/";

                    var success = function (json){
                        self._clear_local_storage();
                        self._save_data(json);
                        self._is_first_load = false;
                        d.resolve();
                    };
                    var args = {'lat': lat, 'lon': lon, 'version': 2};
                    $.ajax({
                        dataType: "json",
                        url: request_url,
                        data: args,
                        success: success
                    });

                });

                locationServicePromise.fail(function(){
                    d.reject();
                });

                return d.promise();
            }
            else {
                d.resolve();
            }
        },

        _mapRawToDishlistItem: function (rawDish, bizName, lat, lon){
            var attrs = {};
            var FIELDS = DishlistItem.prototype.FIELDS;
            attrs[FIELDS.ID] = rawDish.id;
            attrs[FIELDS.FOOT_TEXT] = rawDish.foodText;
            attrs[FIELDS.FREQ] = rawDish.freq;

            var distance = locationService.getDistanceFromLatLonInMi(lat, lon);
            attrs[FIELDS.DISTANCE] = distance;
            attrs[FIELDS.BIZ_NAME] = bizName;
            var model = new DishlistItem(attrs);
            return model;
        },

        _clear_local_storage: function(){
            window.localStorage.clear();
        },
        /**
         * save raw json data into local storage 
         */
        _save_data: function (json){
            //TODO: refactor out the localStorageService which is the sole object to access the localStorage
            var rawDishes = json.dishes;
            var rawBusinesses = json.businesses;

            var self = this;
            var dishListItems = _.map(rawDishes, function(rawDish){
                var rawBiz = _.findWhere(rawBusinesses, {bizID: rawDish.bizID});
                return self._mapRawToDishlistItem(rawDish, rawBiz.name, rawBiz.lat, rawBiz.lon);
            });

            var dishList = new DishlistItemCollection();
            _.each(dishListItems, function(item){
                dishList.add(item);
                item.save();
            });

            var dishDetails = _.map(rawDishes, function(rawDish){
                var rawBiz = _.findWhere(rawBusinesses, {bizID: rawDish.bizID});
                return self._mapRawToDishdetail(rawDish, rawBiz);
            });
            var dishDetailsLocalStorage = new DishdetailCollection();
            _.each(dishDetails, function(item){
                dishDetailsLocalStorage.add(item);
                item.save();
            });
        },

        _mapRawToDishdetail: function(rawDish, rawBiz){
            var attrs = {};
            var FIELDS = Dishdetail.prototype.FIELDS;
            var foodId = rawDish.id;
            attrs[FIELDS.FOOD_ID] = foodId;
            attrs[FIELDS.FOOD_TEXT] = rawDish.foodText;
            attrs[FIELDS.FREQ] = rawDish.freq;
            attrs[FIELDS.REVIEWS] = rawDish.reviews;
            attrs[FIELDS.BIZ_NAME] = rawBiz.name;
            attrs[FIELDS.BIZ_ADDR] = rawBiz.address;
            attrs[FIELDS.BIZ_TEL] = rawBiz.phone;
            return new Dishdetail(attrs);
        },

        getDishes : function () {
            return new Backbone.Collection(this._json.dishes);
        },

        getBusinesses: function () {
            return new Backbone.Collection(this._json.businesses);
        }

	});
    //singleton
    wz.dmwa.app.services.APIService = new APIService();

}());