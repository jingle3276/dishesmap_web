goog.provide('wz.dmwa.app.models.DishlistItem');

goog.require('wz.dmwa.core.models.Model');


(function () {

	var Model = wz.dmwa.core.models.Model;

	wz.dmwa.app.models.DishlistItem = Model.extend({

        FIELDS : _.extend({}, Model.prototype.FIELDS, {
            DISH_NAME: 'dish_name',
            REST_NAME: 'restaurant_name',
            LIKES: 'likes',
            DISTANCE: 'distance'
        }),


        initialize: function (options) {
            options = _.extend({}, this._defaults, options);
            Model.prototype.initialize.call(this, options);
            this._logNamespace = 'DishlistItem';
            this.set(options);
        },

        getDishName: function () {
            return this.get(this.FIELDS.DISH_NAME);
        },

        getRestaurantName: function () {
            return this.get(this.FIELDS.REST_NAME);
        },

        getLikes: function () {
            return this.get(this.FIELDS.LIKES);
        },
        
        getDistance: function () {
            return this.get(this.FIELDS.DISTANCE);
        }

	});

}());