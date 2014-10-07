goog.provide('wz.dmwa.app.models.Dishdetail');

goog.require('wz.dmwa.core.models.Model');


(function () {

	var Model = wz.dmwa.core.models.Model;

	wz.dmwa.app.models.Dishdetail = Model.extend({
        

        FIELDS: _.extend({}, Model.prototype.FIELDS, {
            FOOT_TEXT: 'foodText',
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