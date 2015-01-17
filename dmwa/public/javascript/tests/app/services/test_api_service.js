goog.provide('wz.dmwa.tests.app.services.TestAPIService');

goog.require('wz.dmwa.app.services.APIService');
goog.require('wz.dmwa.app.services.LocationService');


module('wz.dmwa.tests.app.services.TestAPIService');
(function () {
    var api_service = wz.dmwa.app.services.APIService;
    var locationService = wz.dmwa.app.services.LocationService;


    QUnit.module( "wz.dmwa.tests.app.models.TestAPIService", {
        setup: function() {
            var rawDish = {
                "id": "f0002",
                "foodText": "spring rolls",
                "freq": 5,
                "reviews": [
                    {
                      "text": "Yes, the Spring rolls are awesome. If you like noodles \u0026 seafood, then you must try #17, the sauteed rice noodles with seafood.--it\u0027s excellent when you get it spicy!!!!! (@ via FourSquare)"
                    },
                    {
                      "text": "Get #25, you can ask for brisket only. And the spring rolls. A small bowl is way more than enough. (@ via FourSquare)"
                    },
                    {
                      "text": "Pho and spring rolls - the perfect combination (@ via FourSquare)"
                    }
                ],
                "bizID": "goodfood_biz_FourSquare__4accf7c9f964a5204dca20e3"
            };

            var rawBiz = {
                "name": "Pho Bang",
                "lat": "40.74147966254171",
                "lon": "-73.88067845752556",
                "address": "8290 Broadway, Elmhurst, NY",
                "phone": "7182051500",
                "bizID": "goodfood_biz_FourSquare__4accf7c9f964a5204dca20e3"
            };

            this._rawDish = rawDish;
            this._rawBiz = rawBiz;
        },
        teardown: function() {
            //
        }
    });

    QUnit.test("_mapRawToDishdetail", function(assert) {
        var result = api_service._mapRawToDishdetail(this._rawDish, this._rawBiz);
        assert.ok(result);
        assert.equal(result.getFoodId(), "f0002");
        assert.equal(result.getDishName(), "spring rolls");
        assert.equal(result.getRestaurantName(), "Pho Bang");
        assert.equal(result.getLikes(), 5);
    });

    QUnit.test("_mapRawToDishlistItem", function(assert) {
        var lat = 40.7463380;
        var lon = -73.8765430;
        var mock_distance = 0.6;
        var bizName = "mock biz name";
        // mock the locationService.getDistanceFromLatLonInMi method using sinon sub
        var stub = sinon.stub(locationService, "getDistanceFromLatLonInMi").returns(mock_distance);
        var result = api_service._mapRawToDishlistItem(this._rawDish, bizName, lat, lon);
        stub.restore(); //restore the stubbed module to its original state
        assert.ok(result);
        assert.equal(result.getDishId(), "f0002");
        assert.equal(result.getDishName(), "spring rolls");
        assert.equal(result.getRestaurantName(), bizName);
        assert.equal(result.getLikes(), 5);
        assert.equal(result.getDistance(), mock_distance);
    });

    //TODO: test save to and read from localStorage function

}());
