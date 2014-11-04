var http = require('http');

var mock_json = require('./fixtures/mock_api_response.json');

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(mock_json));
});

app.listen(3000, function(){
	console.log('test server running at http://localhost:' + app.address().port);
});
