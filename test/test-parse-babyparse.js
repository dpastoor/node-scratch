var Baby = require("babyparse");

parsed = Baby.parse("../concTimeSmall.csv", {header: true});
console.log("printing result");
console.log(parsed.data); // notice result is still [] 
