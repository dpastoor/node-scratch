function printHelp() {
	//simple 'dumb way'
	console.log("01-minimist.js (c) Devin Pastoor");
	console.log("");
	console.log("usage:");
	console.log("--help          print this help");
	console.log("--name          say hello to {NAME}");
	console.log("");
}

var args = require("minimist")(process.argv.slice(2), { string: "name"});
// slice first 2 as it would be node <filename> and don't care about those, so 
// this way we'll caputure the remaining args


if (args.help || !args.name) {
	printHelp();
	process.exit(1);
	//since in global scope can't just return need to actually exit the process
	// can give a status code upon exiting (eg in this case 1)
}
var name = args.name

console.log("Hello " + name);


// works with node 01-minimist.js --name=devin
// will now also validate correctly if eg node 01-minimist.js --> will print help


