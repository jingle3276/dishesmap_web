
goog.provide('wz.dmwa.app.services.APIService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');
goog.require('wz.dmwa.app.models.DishlistItem');


(function () {

    var Service = wz.dmwa.core.services.Service;
    var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;
    var DishlistItem = wz.dmwa.app.models.DishlistItem;
    var FIELDS = DishlistItem.prototype.FIELDS;

	var APIService = Service.extend({

		_logNamespace : 'APIService',

        initialize : function () {
            this._json = {};
            Service.prototype.initialize.call(this);
        },

        load : function () {
            var d = $.Deferred();

        	var self = this;

            if (this._is_first_time_load()){
                $.getJSON("http://localhost:3000/foodlist/where/?lat=1&lon=2", function (json) {
                    self._save_data(json);
                    d.resolve();
                });
            }
            else {
                d.resolve();
            }
        },

        _is_first_time_load : function (){
            var dishList = new DishlistItemCollection();
            return _.isEmpty(dishList.localStorage.records);
        },


        _mapRawToDishlistItem: function (rawDish, bizName){
            var attrs = {};
            attrs[FIELDS.ID] = rawDish.id;
            attrs[FIELDS.FOOT_TEXT] = rawDish.foodText;
            attrs[FIELDS.FREQ] = rawDish.freq;
            //if (business){
            //    attrs[FIELDS.BIZ_NAME] = business.get('name');
            //    attrs[FIELDS.DISTANCE] = locationService.getDistanceFromLatLonInMi(
            //    business.get('lat'), business.get('lon'));
            //}
            attrs[FIELDS.BIZ_NAME] = bizName;
            var model = new DishlistItem(attrs);
            return model;
        },

        /**
         * save raw json data into local storage 
         */
        _save_data: function (json){
            var rawDishes = json.dishes;
            var rawBusinesses = json.businesses;
            
            /*
            var dishViewModels = _.map(rawDishes, function(d){
                //var business = _.first(rawBusinesses.where({bizID: d.get('bizID')}));
                var attrs = {};
                attrs[FIELDS.ID] = d.id;
                attrs[FIELDS.FOOT_TEXT] = d.foodText;
                attrs[FIELDS.FREQ] = d.freq;
                //if (business){
                //    attrs[FIELDS.BIZ_NAME] = business.get('name');
                //    attrs[FIELDS.DISTANCE] = locationService.getDistanceFromLatLonInMi(
                //        business.get('lat'), business.get('lon'));
                //}
                return new DishlistItem(attrs);
            });
            */ 
            var self = this;
            var dishListItems = _.map(rawDishes, function(rawDish){
                var rawBiz = _.findWhere(rawBusinesses, {bizID: rawDish.bizID});
                return self._mapRawToDishlistItem(rawDish, rawBiz.name);
            });

            var dishList = new DishlistItemCollection();
            _.each(dishListItems, function(item){
                dishList.add(item);
                item.save();
            });
        },

        getJSON : function () {
        	return this._json;
        },

        getDishes : function () {
            return new Backbone.Collection(this._json.dishes);
        },

        getBusinesses: function () {
            return new Backbone.Collection(this._json.businesses);
        }

	});

    wz.dmwa.app.services.APIService = new APIService();

}());