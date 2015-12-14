/*
*
*/
var http = require("http");

var handleHTTP = function(req, res) {
	// req is a request STREAM and res is a response STREAM

	//first thing that goes into the header is a status code
		// success --> 200
		// additional portions of header in an object
	if (req.method === "GET") {
		// likewise theoretically if we only wanted to handle the root route
		// and only handle if the url is the root
		if (req.url === "/") {
			res.writeHead(200, {"Content-type": "text/plain"});
			// to show there can be multiple streams lets also write another line before the end
			res.write("a first statement : ");
			res.end("hello world");
		} else {
			res.writeHead(403);
			res.end("No can do!")
		}
	} else {
		// if we wanted to return a 403 (forbidden) if not a request we want to handle
		res.writeHead(403);
		res.end("No can do!")
	}

};


var host = "localhost";
var port = 8006;
var http_serv = http.createServer(handleHTTP).listen(port, host);
