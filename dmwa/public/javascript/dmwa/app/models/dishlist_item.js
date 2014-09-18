goog.provide('wz.dmwa.app.models.DishlistItem');

goog.require('wz.dmwa.core.models.Model');


(function () {

	var Model = wz.dmwa.core.models.Model;

	wz.dmwa.app.models.DishlistItem = Model.extend({

        FIELDS : _.extend({}, Model.prototype.FIELDS, {
            DISH_NAME: 'dish_name',
            LIKE_FREQ: 'like_freq'
        }),

        _defaults: {
            name: '',
            rest: ''
        },

        initialize: function (options) {
            options = _.extend({}, this._defaults, options);
            Model.prototype.initialize.call(this, options);
            this._logNamespace = 'DishlistItem';
            this.set(options);
        },

        getDishName: function () {
            return this.get(this.FIELDS.DISH_NAME);
        },

        getLikeFreq: function () {
            return this.get(this.FIELDS.LIKE_FREQ);
        },

        //temp for testing

        getName: function () {
            return this.get('name');
        },

        getRest: function () {
            return this.get('rest');
        }

	});

}());