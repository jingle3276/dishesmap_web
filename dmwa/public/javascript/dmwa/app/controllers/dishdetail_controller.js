
goog.provide('wz.dmwa.app.controllers.DishdetailController');

goog.require('wz.dmwa.core.controllers.Controller');
goog.require('wz.dmwa.app.views.DishdetailView');

//FIXME: should not add this, since asserts is not dependency of this controller.
// but if not adding, it fails on assert in template.js. 
// try resolve this once router is implemented.
goog.require('goog.asserts');
goog.require('wz.dmwa.app.services.DishlistService');


(function () {

    var Controller = wz.dmwa.core.controllers.Controller;
    var DishdetailView = wz.dmwa.app.views.DishdetailView;
    var DishlistService = wz.dmwa.app.services.DishlistService;


    wz.dmwa.app.controllers.DishdetailController = Controller.extend({

        _logNamespace : "DishdetailController",

        initialize: function (options) {
            //this._service = options.service;
            //this._asyncServices.push(this._service);
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
            Controller.prototype._initializeBusinessEvents.call(this);
        },

        _getView : function () {
            return new DishdetailView();
        }
    });

}());
