goog.provide('wz.dmwa.app.models.Dishdetail');

goog.require('wz.dmwa.core.models.Model');


(function () {

	var Model = wz.dmwa.core.models.Model;

	wz.dmwa.app.models.Dishdetail = Model.extend({
        

        FIELDS: _.extend({}, Model.prototype.FIELDS, {
            FOOD_TEXT: 'foodText',
            FREQ: 'freq',
            REVIEWS: 'reviews',
            BIZ_NAME: 'bizName',
            BIZ_ADDR: 'bizAddr',
            BIZ_TEL: 'bizTel'
        }),

        initialize: function (options) {
            options = _.extend({}, options);
            Model.prototype.initialize.call(this, options);
            this.set(options);
            this._logNamespace = 'Dishdetail';
        },

        getReviews: function () {
            return this.get(this.FIELDS.REVIEWS);
        },

        getDishName: function () {
            return this.get(this.FIELDS.FOOD_TEXT);
        },

        getRestaurantName: function () {
            return this.get(this.FIELDS.BIZ_NAME);
        },

        getLikes: function () {
            return this.get(this.FIELDS.FREQ);
        },

        getRestaurantAddr: function (){
            return this.get(this.FIELDS.BIZ_ADDR);
        },

        getRestaurantTel: function (){
            var tel_str = this.get(this.FIELDS.BIZ_TEL);
            return '(' + tel_str.slice(0, 3) + ') ' + 
                tel_str.slice(3, 6) + '-' + tel_str.slice(6,10);
        }

	});

}());