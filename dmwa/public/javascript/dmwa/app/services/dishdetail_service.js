/**
 * The dishdetailpage service
 */

goog.provide('wz.dmwa.app.services.DishdetailService');

goog.require('wz.dmwa.core.services.Service');
goog.require('wz.dmwa.app.collections.DishdetailCollection');
goog.require('wz.dmwa.app.models.DishlistItem');
goog.require('wz.dmwa.app.models.Dishdetail');


(function () {

    var Service = wz.dmwa.core.services.Service;
    var DishdetailCollection = wz.dmwa.app.collections.DishdetailCollection;
    var Dishdetail = wz.dmwa.app.models.Dishdetail;
    var FIELDS = Dishdetail.prototype.FIELDS;

    var DishdetailService = Service.extend({

        _logNamespace : 'DishdetailService',

        initialize : function () {
            Service.prototype.initialize.call(this);
            this._collection = new DishdetailCollection();
        },

        getDishDetail: function (foodId) {
            var models = this._collection.localStorage.findAll();
            this._collection.reset(models);
            var FOOD_ID = FIELDS.FOOD_ID;
            return this._collection.get(foodId);
        }

    });

    wz.dmwa.app.services.DishdetailService = new DishdetailService();

}());