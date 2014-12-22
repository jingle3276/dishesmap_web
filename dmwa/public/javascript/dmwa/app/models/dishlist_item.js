// a view model for Dishlist Item displayed in dishlist page

goog.provide('wz.dmwa.app.models.DishlistItem');

goog.require('wz.dmwa.core.models.Model');


(function () {

	var Model = wz.dmwa.core.models.Model;

	wz.dmwa.app.models.DishlistItem = Model.extend({
        

        FIELDS: _.extend({}, Model.prototype.FIELDS, {
            ID: 'id',
            FOOT_TEXT: 'foodText',
            BIZ_NAME: 'bizName',
            FREQ: 'freq',
            DISTANCE: 'distance'
        }),

        initialize: function (options) {
            Model.prototype.initialize.call(this, options);
            options = _.extend({}, options);
            this.set(options);
            this._logNamespace = 'DishlistItem';
        },

        getDishId: function () {
            return this.get(this.FIELDS.ID);
        },

        getDishName: function () {
            return this.get(this.FIELDS.FOOT_TEXT);
        },

        getRestaurantName: function () {
            return this.get(this.FIELDS.BIZ_NAME);
        },

        getLikes: function () {
            return this.get(this.FIELDS.FREQ);
        },
        
        getDistance: function () {
            return this.get(this.FIELDS.DISTANCE);
        }

	});

}());