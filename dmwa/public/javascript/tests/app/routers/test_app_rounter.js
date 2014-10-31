goog.provide('wz.dmwa.tests.app.routers.TestAppRouter');


(function () {
	var AppRouter = wz.dmwa.app.routers.AppRouter;

	QUnit.module( "wz.dmwa.tests.app.routers.TestAppRouter", {
		setup: function() {
			this._router = new AppRouter();
			var spy = sinon.spy();
		},
		teardown: function() {
			this._router = undefined;
	  	}
	});

	QUnit.test("router init", function(assert) {
		QUnit.ok(this._router);
	});
}());