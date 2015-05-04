function sayAsync (filename, cb) {

	// async implementation with callback
	// async read, when get contents back, which could take milliseconds
	// then check to make sure successful
	// if not successful immediately error out
	// else we can simulate doing some other async activity like a database call
	// so now when we switch back to our command line and run our code
	// with a real file it will wait before printing (similar to having to wait)
	// to actually get a file back from the server
	return fs.readFile(filename, function(err, contents) {
		// if the error occurs should immediately throw the error up
		if (err) {
			cb(err);
		} else {
			// setTimout is to simulate something that takes time that we'd handle
			// in an async fashions
			setTimeout(function() {
				cb(null, contents);
			}, 1000);
		}
	}) ;
}


var fs = require("fs");


//to expose to public api
module.exports.say = sayAsync;


// this pattern is very easy and natural to work with these things
// can work 95% of the time with node code using the require system