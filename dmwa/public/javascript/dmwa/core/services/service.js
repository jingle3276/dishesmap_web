
goog.provide('wz.dmwa.core.services.Service');

goog.require('wz.dmwa.lib.Object');

(function () {

    var Object = wz.dmwa.lib.Object;
   
    wz.dmwa.core.services.Service = Object.extend({

        _logNamespace : 'Service',
        _asyncServices : [],

       /**
         * Return a promise that will be resolved when this service's data
         * is loaded into memory.
         *
         * @return promise {Object}
         */
        load : function () {
            if (_.isEmpty(this._asyncServices)) {
                return $.Deferred().resolve().promise();
            }
            var promises = _.map(this._asyncServices, function (asyncService) {
                return asyncService.load();
            });
            // help: http://stackoverflow.com/questions/14777031/what-does-when-apply-somearray-do
            return $.when.apply(null, promises);
        }
    });

}());
