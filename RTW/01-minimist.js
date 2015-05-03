var args = require("minimist")(process.argv.slice(2), { string: "name"});
// slice first 2 as it would be node <filename> and don't care about those, so 
// this way we'll caputure the remaining args
var name = args.name

console.log("Hello " + name);


// works with node 01-minimist.js --name=devin


