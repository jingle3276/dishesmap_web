
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
            this._service = new DishlistService();
            this._asyncServices.push(this._service);
            Controller.prototype.initialize.call(this, options);
        },

        start : function () {
            Controller.prototype.start.call(this);
            var viewOptions = {};
            var self = this;
            viewOptions.dish_list = self._service.allDishes();
            self._view.start(viewOptions); 
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
            this._businessEvents[EVENTS.SUBMIT_CHANGE] = this._onSubmitChange;
            Controller.prototype._initializeBusinessEvents.call(this);
        },
/*
        _onSubmitChange : function () {
            this._log("onSubmitChange called");
            var content = this._view.getInput();
            this._view.render(content);
        },
*/
        _getView : function () {
            return new DishlistView();
        }
    });

    var ac = new wz.dmwa.app.controllers.DishlistController();
    var promise = ac.startAsync();
    promise.done(function (){

    });

}());