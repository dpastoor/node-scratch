var csv = require("fast-csv");
var _ = require('underscore');
var fs  = require("fs");
var stream = fs.createReadStream("../concTimeSmall.csv");
var csvStream = csv
.parse({headers: true})
.on("data", function 	 (data) {
  console.log(data);
}).on("end", function() { 
  console.log("done");
  });

stream.pipe(csvStream);
