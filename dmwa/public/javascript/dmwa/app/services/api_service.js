
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
        	return $.getJSON("http://localhost:3000/foodlist/where/?lat=1&lon=2", function (json) {
        		self._json = json;
        	});

            //return $.ajax({
            //    type: "GET",
            //    url: "http://localhost:3000/foodlist/where/?lat=1&lon=2",
            //    dataType: "json",
            //    success: function (data){
            //        self._json = data;
            //    }
            //});
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