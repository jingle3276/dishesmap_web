
goog.provide('wz.dmwa.core.controllers.Controller');

goog.require('wz.dmwa.lib.Object');

(function () {

    var Object = wz.dmwa.lib.Object;
   
    wz.dmwa.core.controllers.Controller = Object.extend({
        
        _businessEvents : {},
        _logNamespace : 'Controller',

        initialize : function () {
            this._asyncServices = [];
            this._log("Controller Initizlized");
        },

        /**
         * Start the controller.
         *
         * @this {wz.dmwa.core.controllers.Controller}
         */
        start : function () {
            this._initializeModels();
            if (!this._view) {
                this._view = this._getView();
            }
            this._initializeBusinessEvents();
            this._bindViewEvents(this._view, this._businessEvents);
        },

        /**
         * Start this controller asynchronously and return a promise
         * that will be resolved when it's completed.
         */
        startAsync : function (options) {
            // ASYNC CONTROLLERS SHOULD NOT OVERRIDE THIS METHOD.
            var promise = this._loadAsyncServices();
            var start = _.bind(function () {
                this.start(options);
            }, this);
            promise.done(start);
            return promise;
        },

        /**
         * Return a promise that will be resolved when all of the controller's
         * async services have been loaded.
         *
         * @private
         */
        _loadAsyncServices : function () {

            var promises = _.map(this._asyncServices, function (service) {
                return service.load();
            });

            return $.when.apply(null, promises);
        },

        /**
         * @this {wz.dmwa.core.controllers.Controller}
         */
        stop : function () {
            if (this._view) {
                this._view.unbind();
                this._view.stop();
            }
            if (this._asyncServices) {
                this._asyncServices = [];
            }
        },

        _initializeModels : function () {
            this._log("Controller: _initializeModels");
            //FIXME: Make this method abstract ?
        },

        /**
         * @this {wz.dmwa.core.controllers.Controller}
         */
        _initializeBusinessEvents : function () {
            this._log("Controller: _initializeBusinessEvents");
        },

         /**
         * Binds a set of callbacks to a view's events. Ensures that 'this'
         * is bound correctly in callback.
         * @param {Backbone.View} view
         *           The view to bind callbacks to.
         * @param {Object.<String, function()>} eventHandlerMap
         *           A dictionary mapping event names to callbacks.
         *
         * @this {wz.dmwa.core.controllers.Controller}
         * @private
         */
        _bindViewEvents : function (view, eventHandlerMap) {

            var bindEvent = function (eventHandler, eventName) {
                view.bind(eventName, $.proxy(eventHandler, this));
            };
            _.each(eventHandlerMap, $.proxy(bindEvent, this));
            this._log("Controller: _bindViewEvents");
        },

        /**
         * Unbinds a set of callbacks from a view's events.
         * We need to do this to prevent multiple callbacks if a view
         * is swapped more than once.
         * @param {Backbone.View} view
         *           The view to bind callbacks to.
         * @param {Object.<String, function()>} eventHandlerMap
         *           A dictionary mapping event names to callbacks.
         * @this {wz.dmwa.core.controllers.Controller}
         * @private
         */
        _unbindViewEvents : function (view, eventHandlerMap) {

            var unbindEvent = function (eventHandler, eventName) {
                view.unbind(eventName);
            };
            _.each(eventHandlerMap, $.proxy(unbindEvent, this));
            this._log("Controller: _unbindViewEvents");
        }

    });

}());
