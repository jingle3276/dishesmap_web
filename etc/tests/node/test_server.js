//var http = require('http');
var express = require('express');
var app = express();


var dishlist_json = require('./fixtures/mock_api_response.json');
var rest_json = require('./fixtures/mock_api_rest.json');

app.get('/', function(req, res){
	res.send("test server root");
});

app.get('/food', function(req, res){
	res.json(dishlist_json);
});

app.get('/restaurant', function(req, res){
	res.json(rest_json);
});

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Test server running at http://%s:%s", host, port);
});
