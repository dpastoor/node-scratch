var csv = require("fast-csv");
var _ = require('underscore');
var result = [];
csv.fromPath("public/data/concTimeSmall.csv", {headers: true})
.on("data", function 	 (data) {
		data.x = +data.TIME;
		delete(data.TIME);
		data.y = +data.CONC;
		delete(data.CONC);
		result.push(data);
}).on("end", function() { 
  		var idat = _.groupBy(result, 'ID');
  		var chartData = _.map(idat, function(d) {
  		var obj = _.object(['values'], [d]);
  		obj.key = d[1].ID;
  		obj.color = '#000000';
  		return obj;
  });
  		console.log(chartData);
});

