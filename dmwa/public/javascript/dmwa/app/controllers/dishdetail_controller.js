
goog.provide('wz.dmwa.app.controllers.DishdetailController');

goog.require('wz.dmwa.core.controllers.Controller');
goog.require('wz.dmwa.app.views.DishdetailView');
goog.require('wz.dmwa.app.services.DishlistService');


(function () {

    var Controller = wz.dmwa.core.controllers.Controller;
    var DishdetailView = wz.dmwa.app.views.DishdetailView;
    var DishlistService = wz.dmwa.app.services.DishlistService;


    wz.dmwa.app.controllers.DishdetailController = Controller.extend({

        _logNamespace : "DishdetailController",

        initialize: function (options) {
            this._dishName = options;
            this._dishlistService = DishlistService;
            Controller.prototype.initialize.call(this, options);
        },

        start: function () {
            Controller.prototype.start.call(this);
            var viewOptions = {};
            viewOptions.dishDetail = this._dishlistService.getDishDetail(this._dishName);
            this._view.start(viewOptions); 
        },

        _initializeModels : function () {

        },

        _initializeBusinessEvents : function () {
            var EVENTS = DishdetailView.prototype.EVENTS;
            this._businessEvents[EVENTS.GO_BACK] = this._onGoBack;
            Controller.prototype._initializeBusinessEvents.call(this);
        },

        _getView : function () {
            return new DishdetailView();
        },

        _onGoBack : function () {
            window.location.href = '#dishlist';
        }


    });

}());
