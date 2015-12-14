/*
* now if we go to the browser and check we will see a network GET request
*/

var http = require("http");

var handleHTTP = function(req, res) {
	// req is a request STREAM and res is a response STREAM

	//first thing that goes into the header is a status code
		// success --> 200
		// additional portions of header in an object
	res.writeHead(200, {"Content-type": "text/plain"});
	// to show there can be multiple streams lets also write another line before the end
	res.write("a first statement : ");
	res.end("hello world");

};


var host = "localhost";
var port = 8006;
var http_serv = http.createServer(handleHTTP).listen(port, host);
