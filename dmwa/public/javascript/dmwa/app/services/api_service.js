
goog.provide('wz.dmwa.app.services.APIService');

goog.require('wz.dmwa.core.services.Service');


(function () {

    var Service = wz.dmwa.core.services.Service;

	var APIService = Service.extend({

		_logNamespace : 'APIService',

        initialize : function () {
            this._json = {};
            Service.prototype.initialize.call(this);
        },

        load : function () {
        	//mock fetch by loading from a JSON file
        	var self = this;
        	return $.getJSON("javascript/dmwa/app/services/mock_api_response.json", function (json) {
        		self._json = json;
        	});
        },

        getJSON : function () {
        	return this._json;
        },

        getDishes : function () {
            return new Backbone.Collection(this._json.dishes);
        },

        getBusinesses: function () {
            return new Backbone.Collection(this._json.businesses);
        }

	});

    wz.dmwa.app.services.APIService = new APIService();

}());