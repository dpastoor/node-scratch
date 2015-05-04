function readFile (filename) {
	var sq = ASQ(); // create an empty sequence ready for you to start chaining off of 

//whenever need to pass an error first callback (err, success)
// for environments that are not natively promise-aware
// we need to construct a callback via errfcb = error-first-callback 
// will auto wire-in success/error pattern
	fs.readFile(filename, sq.errfcb() );
	return sq;
}

function delayMsg (done, contents) { // recieves done trigger and message (in this case file contents)
	//simulate waiting for data back fom server
	setTimeout(function() {
		done(contents);// passes along contents after 1000 ms
	}, 1000);
}

function say(filename) {
	return readFile(filename)
			.then(delayMsg);
}

var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib"); // doesn't return everything so don't need to actually store it

//to expose to public api
module.exports.say = say;
 

// this pattern is very easy and natural to work with these things
// can work 95% of the time with node code using the require system