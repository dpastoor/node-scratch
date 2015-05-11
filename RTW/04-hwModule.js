function printHelp() {
	//simple 'dumb way'
	console.log("02-hwModule.js (c) Devin Pastoor");
	console.log("");
	console.log("usage:");
	console.log("--help          print this help");
	console.log("--file={NAME}          read in file {NAME}");
	console.log("");
}

var args = require("minimist")(process.argv.slice(2), { string: "file"});
// slice first 2 as it would be node <filename> and don't care about those, so 
// this way we'll caputure the remaining args


if (args.help || !args.file) {
	printHelp();
	process.exit(1);
	//since in global scope can't just return need to actually exit the process
	// can give a status code upon exiting (eg in this case 1)
}


var hello = require("./04-helloworld-async.js")

// now due to the way we have designed the new say function it will return
// a sequence back (like a promise we can chain off of)
hello.say(args.file)
.val(function (contents) {
	console.log(contents.toString());
})
.or(function(err) {
	// if error reading file, delay, etc
	console.error("Error: " + err);
});

// all promise libraries have a way of handling the error 
// asynquence allows to register an error handler by calling .or which will
// be where the error messages will bubble up to


// above code can be read as:
//call hello.say and when it finishes I will either get the conents or an error

//other way via
// hello.say(args.file)
// .then(function(done,contents) {
// ...
//})
// but rather than typing out done and the getting back param i don't need anymore
// the shortcut is just to give back .val which assumes the it will be a synchronous last step

// still called via node 03-hwModule.js --file=test.txt
// if try something that doesn't work node 03-hwModule.js --file=test2.txt
// will get a proper error message passed along
