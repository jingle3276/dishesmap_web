goog.provide('wz.dmwa.app.routers.AppRouter');

goog.require('wz.dmwa.app.controllers.DishlistController');
goog.require('wz.dmwa.app.controllers.DishdetailController');
goog.require('goog.asserts');

(function () {

    var _currentController = null;

    var AppRouter = Backbone.Router.extend({

        _logNamespace : "AppRouter",

        routes: {
        	"dishlist": "runDishlistController",
        	"dishdetail/:dishId": "runDishdetailController"
        },

        runDishlistController: function (params){
        	this._runController(wz.dmwa.app.controllers.DishlistController, params);
        },

        runDishdetailController: function (params){
        	// must use the fully qualiried the name
        	this._runController(wz.dmwa.app.controllers.DishdetailController, params);
        },

        _runController: function (Controller, params) {
        	var self = this;
        	//wait for the dependency javascripts to load to start this controller
        	setTimeout(function (){
        		self._tearDownCurrentController();
	        	_currentController = new Controller(params);

	        	var promise = _currentController.startAsync();
        	}, 200);
        },

        _tearDownCurrentController: function () {
        	if (_currentController) {
        		_currentController.stop();
        	}
        }

    });

    //singlton
    wz.dmwa.app.routers.AppRouter = new AppRouter();
    Backbone.history.start();


}());
