// Controller for assessments
//

goog.provide('wz.dmwa.app.controllers.DishlistController');

goog.require('goog.asserts')
goog.require('wz.dmwa.core.controllers.Controller');
//goog.require('wz.dmwa.todo.models.Todo');
//goog.require('wz.dmwa.todo.views.TodoView');


(function () {

    var Controller = wz.dmwa.core.controllers.Controller;
    //var TodoView = wz.dmwa.todo.views.TodoView;
    //var Todo = wz.dmwa.todo.models.Todo;

    var asserts = goog.asserts;

    wz.dmwa.app.controllers.DishlistController = Controller.extend({

        _logNamespace : "DishlistController",

        initialize : function (options) {
            var a = 12;
            this._log("DishlistController Initialized");
            asserts.assert(a, "Error msg");
            //Controller.prototype.initialize.call(this, options);
        },

        start : function () {
            Controller.prototype.start.call(this);
            this._view.start();
        },

        //TODO
        //Controller init models, view and business events
        _initializeModels : function () {
            //this.todo = new Todo();
            this._log("TodoController: _initializeModels");
        },

        _initializeBusinessEvents : function () {
            //init change content event
            this._log("TodoController: _initializeBusinessEvents");
            var EVENTS = TodoView.prototype.EVENTS;
            this._businessEvents[EVENTS.SUBMIT_CHANGE] = this._onSubmitChange;
            Controller.prototype._initializeBusinessEvents.call(this);
        }
/*
        _onSubmitChange : function () {
            this._log("onSubmitChange called");
            var content = this._view.getInput();
            this._view.render(content);
        },

        _getView : function () {
            return new TodoView();
        }
*/        

    });

    var ac = new wz.dmwa.app.controllers.DishlistController();
    ac.start();
}());