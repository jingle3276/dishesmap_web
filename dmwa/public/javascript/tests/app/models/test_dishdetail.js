goog.provide('wz.dmwa.tests.app.models.TestDishdetail');
goog.require('wz.dmwa.app.models.Dishdetail');

module('wz.dmwa.tests.app.models.TestDishdetail');
QUnit.test("Dishdeail getRestaurantTel", function(assert) {
    var Dishdetail = wz.dmwa.app.models.Dishdetail;

	var FIELDS = Dishdetail.prototype.FIELDS;
    var attrs = {};
    attrs[FIELDS.FOOD_TEXT] = 'food title';
    attrs[FIELDS.BIZ_NAME] = 'biz name';
    attrs[FIELDS.BIZ_ADDR] = 'addr';
    attrs[FIELDS.BIZ_TEL] = '1234567890';

	var dd = new Dishdetail(attrs);

	assert.equal(dd.getRestaurantTel(), '(123) 456-7890', 'getRestaurantTel return correct format');
});
