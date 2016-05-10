
goog.provide('wz.dmwa.app.controllers.DishlistController');

goog.require('goog.asserts');
goog.require('wz.dmwa.core.controllers.Controller');

goog.require('wz.dmwa.app.models.DishlistItem');
goog.require('wz.dmwa.app.views.DishlistView');
goog.require('wz.dmwa.app.services.DishlistService');


(function () {

    var Controller = wz.dmwa.core.controllers.Controller;
    var DishlistView = wz.dmwa.app.views.DishlistView;
    var DishlistService = wz.dmwa.app.services.DishlistService;
    var asserts = goog.asserts;

    wz.dmwa.app.controllers.DishlistController = Controller.extend({

        _logNamespace : "DishlistController",

        initialize : function (options) {
            Controller.prototype.initialize.call(this, options);
            this._service = DishlistService;
            this._asyncServices.push(this._service);
            this._view = this._getView();
            this._view.startLoadingSpinner();
        },

        start : function () {
            Controller.prototype.start.call(this);
            var viewOptions = {};
            viewOptions.dish_list = this._service.allDishes();
            //stop loading pop
            this._view.stopLoadingSpinner();
            this._view.start(viewOptions);

            if (this._service.hasScrollPosition()) {
                var pos = this._service.getScrollPosition();
                this._view.goToScrollPosition(pos);
            }

            if (_.size(viewOptions.dish_list) === 0) {
                this._view.showZeroState();
            }

        },

        //TODO
        //Controller init models, view and business events
        _initializeModels : function () {
            this._log("TodoController: _initializeModels");
        },

        _initializeBusinessEvents : function () {
            //init change content event
            this._log("DishlistController: _initializeBusinessEvents");
            var EVENTS = DishlistView.prototype.EVENTS;
            this._businessEvents[EVENTS.GO_TO_DETAIL] = this._onGoTODetail;
            Controller.prototype._initializeBusinessEvents.call(this);
        },

        _onGoTODetail : function (dishId) {
            this._service.saveScrollPosition(this._view.getCurrentScrollPosition());
            window.location.href = '#dishdetail/' + dishId;
        },

        _getView : function () {
            return new DishlistView();
        }
    });

}());
