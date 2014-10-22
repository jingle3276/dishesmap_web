
goog.provide('wz.dmwa.tests.app.services.TestDishlistService');

goog.require('wz.dmwa.app.services.DishlistService');

module('wz.dmwa.tests.app.services.TestDishlistService');


(function () {
    var service = wz.dmwa.app.services.DishlistService;
    
    test("Simple Test", function () {
        var a = 1;

        equal(a, 2, "a should be value 2");
    });

    test("allDishes", function () {
        //var results = service.allDishes();
        equal(service._logNamespace, 'DishlistService', 'log namespace should be DishlistService');
    });

}());
