function readFile (filename) {
// fs.readFile handles the whole file at once, which may not be optimal for larger files
// where we might want to dump stuff into the browser as it goes or just don't want to wait
// until the entire file is loaded

//streams are an abstraction on passing data around in a highly efficent manner
// they use buffers to send data back and forth

	return ASQ(function(done) {

		var stream = fs.createReadStream(filename); // at this moment has not loaded anything
		var contents = ""; //initialize the contents

		//somewhat derived example, in reality would likely be piping a read-in csv file
		// to a csv parser or a gziped file into something to unzip, etc
		stream.pipe(fs.createWriteStream(filename+".backup"));


		// need to listen to events
		stream.on("data", function(chunk) {
			//for temporary visual purposes we can add a console.log to see the data event
			//console.log("data");
			contents += chunk;// every time data event fires want to append to contents
			//console.log("a chunk!")
			//console.log(chunk.toString());
			//by default pulls in chunk up to buffer size, fires the data event, empties the stream
			// and keep going until it exhausts the contents of the file
		});
		stream.on("end", function() {
			done(contents);
		});
	});
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