/**
 * Root of the application javascript.
 *
 * This is the first javascript file included from the HTML, hence it's the
 * first file to execute.
 */
goog.provide('wz.dmwa.lib.log');


(function () {

    wz.dmwa.lib.log = function () {

    	var getFormattedTime = function () {
    		var date = new Date();
    		var str = date.getHours() + ":" + date.getMinutes() 
    			+ ":" + date.getSeconds() + "." + date.getMilliseconds();;
    		return str;
		}

        /*jslint devel: true */
        var args = ['wz.dmwa | ' + getFormattedTime() +' |'];
        _.each(arguments, function (arg) {
            args.push(arg);
        });
        window.console.log.apply(console, args);
        /*jslint devel: false */
    };

}());
