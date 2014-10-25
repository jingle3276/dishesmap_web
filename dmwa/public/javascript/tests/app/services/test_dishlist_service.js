goog.provide('wz.dmwa.tests.app.services.TestDishlistService');

goog.require('wz.dmwa.app.services.DishlistService');

module('wz.dmwa.tests.app.services.TestDishlistService');
(function () {
    var service = wz.dmwa.app.services.DishlistService;


    test("have a logNamespace", function () {
        //var results = service.allDishes();
        equal(service._logNamespace, 'DishlistService', 'log namespace should be in the object');
    });

}());
