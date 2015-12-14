var csv = require("fast-csv");
var _ = require('underscore');
var fs  = require("fs");
var stream = fs.createReadStream("../concTimeSmallBadHeader.csv");
var csvStream = csv
.parse({headers: true, comment:"T"})
//comment:"T" also comments out the TIME name
.on("data", function 	 (data) {
  console.log("first method");
  console.log(data);
}).on("end", function() { 
  console.log("done");
  });

stream.pipe(csvStream);
