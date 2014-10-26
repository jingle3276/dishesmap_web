/**
 * The location service
 */
goog.provide('wz.dmwa.app.services.LocationService');

goog.require('wz.dmwa.core.services.Service');


(function () {

	var Service = wz.dmwa.core.services.Service;
	var LocationService = Service.extend({

		_logNamespace : 'LocationService',

        initialize : function () {
            Service.prototype.initialize.call(this);
        },

        load : function () {
            var self = this;
            var promise = this.queryCurrentLocation().done(function (pos) {
                self._lat = pos.coords.latitude;
                self._lon = pos.coords.longitude;
                self._log("current latitude: " + this._lat + ", longitude: " + self._lon);
            });
            return promise;
        },

        queryCurrentLocation : function () {
            var d = $.Deferred();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos){
                    d.resolve(pos);
                });
            }
            else{
                d.reject();
            }
            return d.promise();
        },

        getDistanceFromLatLonInMi : function (lat2,lon2) {
            function deg2rad(deg) {
                return deg * (Math.PI/180);
            }
            var R = 3959; // Radius of the earth in Mile
            var dLat = deg2rad(lat2-this._lat);  // deg2rad below
            var dLon = deg2rad(lon2-this._lon); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(this._lat)) * Math.cos(deg2rad(this._lon)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in Mi
            return d.toPrecision(1);
        }
    });

    wz.dmwa.app.services.LocationService = new LocationService();

}());