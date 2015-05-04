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

var hello = require("./02-helloworld.js")

var contents = hello.say(args.file);

// console.log(contents); this will actually print out a BUFFER 
// because will pull in an array buffer (efficient binary representation of data)
// that looks something like <Buffer 48 65 6c 6c 6f 20 77 6f 72 6c 64 21>
// so need to add toString 
console.log(contents.toString());

// node 02-hwModule.js --file=test.txt

var helloAsync = require("./03-helloworld-async.js")

helloAsync.say(args.file, function(err, contents) { // dont' forget err!
	if (err) {
		console.error("Error: " + err);
	} else {
	console.log(contents.toString());
	}
});


// now if try something that doesn't work node 02-hwModule.js --file=test2.txt
// will get a proper error message passed along
