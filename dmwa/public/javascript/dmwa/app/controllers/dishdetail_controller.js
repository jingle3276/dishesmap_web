
goog.provide('wz.dmwa.app.controllers.DishdetailController');

goog.require('wz.dmwa.core.controllers.Controller');
goog.require('wz.dmwa.app.views.DishdetailView');

//FIXME: should not add this, since asserts is not dependency of this controller.
// but if not adding, it fails on assert in template.js. 
// try resolve this once router is implemented.
goog.require('goog.asserts');

(function () {

    var Controller = wz.dmwa.core.controllers.Controller;
    var DishdetailView = wz.dmwa.app.views.DishdetailView;

    wz.dmwa.app.controllers.DishdetailController = Controller.extend({

        _logNamespace : "DishdetailController",

        initialize: function (options) {
            Controller.prototype.initialize.call(this, options);
        },

        start: function () {
            Controller.prototype.start.call(this);
            var viewOptions = {};
            //var self = this;
            //viewOptions.dish_list = self._service.allDishes();
            this._view.start(viewOptions); 
        },

        _initializeModels : function () {
            
        },

        _initializeBusinessEvents : function () {
            //var EVENTS = DishlistView.prototype.EVENTS;
            Controller.prototype._initializeBusinessEvents.call(this);
        },

        _getView : function () {
            return new DishdetailView();
        }
    });

    var dc = new wz.dmwa.app.controllers.DishdetailController();
    dc.start();

}());
