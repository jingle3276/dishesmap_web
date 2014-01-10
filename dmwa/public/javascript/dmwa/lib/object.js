/**
 * This class provides simple Backbone.js style inheritance.
 */

goog.provide('wz.dmwa.lib.Object');

goog.require('wz.dmwa.lib.log');

(function () {
    
    /**
     * @constructor
     */
    wz.dmwa.lib.Object = function () {
        this.initialize.apply(this, arguments);
    };

    _.extend(wz.dmwa.lib.Object.prototype, {

        _logNamespace : 'Object',

        /**
         * Create an instance of the object.
         * @this {wgen.assess.lib.Object}
         */
        initialize : function () {},

        _log : function (message) {
            wz.dmwa.lib.log(this._logNamespace + ': ' + message);
        }

    });

    wz.dmwa.lib.Object.extend = Backbone.Model.extend;

}());
