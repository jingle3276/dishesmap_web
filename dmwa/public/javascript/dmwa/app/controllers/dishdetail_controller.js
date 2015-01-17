
goog.provide('wz.dmwa.app.controllers.DishdetailController');

goog.require('wz.dmwa.core.controllers.Controller');
goog.require('wz.dmwa.app.views.DishdetailView');
goog.require('wz.dmwa.app.services.DishdetailService');


(function () {

    var Controller = wz.dmwa.core.controllers.Controller;
    var DishdetailView = wz.dmwa.app.views.DishdetailView;
    var DishdetailService = wz.dmwa.app.services.DishdetailService;


    wz.dmwa.app.controllers.DishdetailController = Controller.extend({

        _logNamespace : "DishdetailController",

        initialize: function (options) {
            this._dishId = options;
            this._service = DishdetailService;
            Controller.prototype.initialize.call(this, options);
        },

        start: function () {
            Controller.prototype.start.call(this);
            var viewOptions = {};
            viewOptions.dishDetail = this._service.getDishDetail(this._dishId);
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
