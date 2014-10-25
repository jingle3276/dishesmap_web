goog.provide('wz.dmwa.tests.app.controllers.TestDishlistController');

goog.require('wz.dmwa.app.controllers.DishlistController');
goog.require('wz.dmwa.app.views.DishlistView');


(function () {
	var DishlistController = wz.dmwa.app.controllers.DishlistController;
	var DishlistView = wz.dmwa.app.views.DishlistView;

	QUnit.module( "wz.dmwa.tests.app.controllers.TestDishlistController", {
		setup: function() {
			this._controller = new DishlistController();
			
		},
		teardown: function() {
			this._controller = undefined;
	  	}
	});

	QUnit.test("DishlistController init view", function(assert) {
		this._controller.start();
		assert.ok(this._controller._view);
	});

	QUnit.test("_onGotoDetail", function(assert) {
		var spy = sinon.spy(this._controller, "_onGoTODetail");
		//must start the controller here. don't know why!
		this._controller.start();
		this._controller._view.trigger(DishlistView.prototype.EVENTS.GO_TO_DETAIL, 'dish1');
		assert.ok(spy.calledOnce, "the method should be called once");
		assert.ok(spy.calledWith('dish1'));
	});

}());
