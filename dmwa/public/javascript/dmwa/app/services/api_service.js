
goog.provide('wz.dmwa.app.services.APIService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.collections.DishlistItemCollection');
goog.require('wz.dmwa.app.models.DishlistItem');


(function () {

    var Service = wz.dmwa.core.services.Service;
    var DishlistItemCollection = wz.dmwa.app.collections.DishlistItemCollection;
    var DishlistItem = wz.dmwa.app.models.DishlistItem;

	var APIService = Service.extend({

		_logNamespace : 'APIService',

        initialize : function () {
            this._json = {};
            Service.prototype.initialize.call(this);
        },

        load : function () {
        	//mock fetch by loading from a JSON file
            var d = $.Deferred();

        	var self = this;
        	//return $.getJSON("http://localhost:3000/foodlist/where/?lat=1&lon=2", function (json) {
        	//	self._json = json;
        	//});
            if (this._is_collection_loaded()){
                d.resolve();
            }
            else {
                $.getJSON("http://localhost:3000/foodlist/where/?lat=1&lon=2", function (json) {
                    //load collection into localStorage   
                    self._load_dishes(json);
                    d.resolve();
                });
            }

            // if DishlistItemCollection is non-0,  resolve immediately 
            // else(inital load), query the json and call a function to persistent into
            // localStorage via collection
            // this method will translate the raw json into business models  
        },

        _is_collection_loaded : function (){
            //FIXME: not able to fetch models from localStorage
            var dishList = new DishlistItemCollection();
            dishList.fetch();
            return dishList.length > 1;
        },

        _load_dishes: function (json){
            var rawDishes = json.dishes;
            var rawBusinesses = json.businesses;
            var FIELDS = DishlistItem.prototype.FIELDS;
            
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
            var dishList = new DishlistItemCollection();
            //dishList.fetch();
            //dishList.reset(dishViewModels);
            _.each(dishViewModels, function(item){
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