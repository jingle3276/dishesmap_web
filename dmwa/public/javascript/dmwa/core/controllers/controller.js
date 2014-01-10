
goog.provide('wz.dmwa.core.controllers.Controller');


(function () {

    var Object = wz.dmwa.lib.Object;
   
    wz.dmwa.core.controllers.Controller = Object.extend({
        
    	_businessEvents : {},
        _logNamespace : 'Controller',

        initialize : function () {
        	this._log("Controller Initizlized");
        }

    });

 }());
