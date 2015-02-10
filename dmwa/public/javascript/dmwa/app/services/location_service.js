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
            var promise = this._queryCurrentLocation().done(function (pos) {
                self._pos = pos;
            });
            return promise;
        },

        get_lat : function(){
            return this._pos.coords.latitude;
        },

        get_lon : function(){
            return this._pos.coords.longitude;
        },

        _queryCurrentLocation : function () {
            var d = $.Deferred();

            //don't query position twice
            if (this._pos) {
                d.resolve(this._pos);
            }
            else{
                navigator.geolocation.getCurrentPosition(
                    function (pos){
                        d.resolve(pos);
                    },
                    function (error){
                        /* jshint devel:true */
                        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                    },
                    //phonegap needs this
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 30000}
                );
            }
            return d.promise();
        },

        getDistanceFromLatLonInMi : function (lat2, lon2) {
            function deg2rad(deg) {
                return deg * (Math.PI/180);
            }
            var R = 3959; // Radius of the earth in Mile
            var dLat = deg2rad(lat2-this.get_lat());  // deg2rad below
            var dLon = deg2rad(lon2-this.get_lon()); 
            var a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(this.get_lat())) * Math.cos(deg2rad(this.get_lon())) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in Mi
            return d.toPrecision(1);
        }
    });

    wz.dmwa.app.services.LocationService = new LocationService();

}());