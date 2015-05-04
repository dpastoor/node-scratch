function say (filename) {
	// for CLT are not running concurrent requests 
	// so if takes a little extra time to load something in blocking way
	// not like doing anything else and will often be waiting for result anyway
	// but in web world this would not work 
	return fs.readFileSync(filename);
}

var fs = require("fs"); 

//to expose to public api
module.exports.say = say;


// this pattern is very easy and natural to work with these things
// can work 95% of the time with node code using the require system