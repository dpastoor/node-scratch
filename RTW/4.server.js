var http = require("http");

var = handleHTTP = function(req, res) {
	// req is a request STREAM and res is a response STREAM
	res.end("hello world");

}


var host = "localhost";
var port = 8006;
var http_serv = http.createServer(handleHTTP).listen(port, host)