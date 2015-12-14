/* at this point doing node 4.server.js will start an infinite running process listening on 8006
* so if go to browser localhost:8006 will see hello world and can use a service like forever to make sure
* it will also restart
*/

var http = require("http");

var handleHTTP = function(req, res) {
	// req is a request STREAM and res is a response STREAM
	res.end("hello world");

}


var host = "localhost";
var port = 8006;
var http_serv = http.createServer(handleHTTP).listen(port, host)
