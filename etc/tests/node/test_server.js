var express = require('express');
var bunyan = require('bunyan');
var _ = require('underscore');

var dishlist_json = require('./fixtures/mock_api_response.json');


var app = express();
var log = bunyan.createLogger({name: "test-api"});

app.get('/', function(req, res){
	res.send("test server root");
});

app.get('/foodlist/where', function(req, res){
	var lat = req.query.lat;
	var lon = req.query.lon;
	log.info("requesting foodlist, lat: %s, lon: %s", lat, lon);
	res.json(dishlist_json);
});

// '/where' can be removed? talk to WD
app.get('/restaurant/where', function(req, res){
	var restaurantId = req.query.id;
	log.info("requesting restaurant, id: ", restaurantId);
	var out = _.findWhere(dishlist_json['businesses'], {bizID: restaurantId});
	res.json(out);
});

app.get('/food/where', function(req, res){
	var id = req.query.id;
	var out = _.findWhere(dishlist_json['dishes'], {foodId: id});
	if(out){
		log.info("requesting food, id: %s", id);
	}
	else{
		log.info("requesting food not found, id: %s", id);
	}
	res.json(out);
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	log.info("Test API server running at http://%s:%s", host, port);
});
