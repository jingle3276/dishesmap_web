/**
 * The dishdetail model collection.
 */
goog.provide('wz.dmwa.app.collections.DishdetailCollection');

goog.require('wz.dmwa.app.models.Dishdetail');


(function () {

    var Dishlistdetail = wz.dmwa.app.models.Dishdetail;

    wz.dmwa.app.collections.DishdetailCollection = Backbone.Collection.extend({

        _logNamespace : 'DishdetailCollection',

        model : Dishlistdetail,

        localStorage: new Backbone.LocalStorage('DishdetailCollection')
    });

}());
