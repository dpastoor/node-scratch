function sayAsync (filename, cb) {
	// async implementation with callback
	return fs.readFile(filename, cb) 
}


var fs = require("fs");


//to expose to public api
module.exports.say = sayAsync;


// this pattern is very easy and natural to work with these things
// can work 95% of the time with node code using the require system