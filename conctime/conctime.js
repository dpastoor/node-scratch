var _ = require('lodash');
var timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
						console.log(start);
						console.log(end);
            console.log('Timer:', name, 'finished in', time, 'ms');
        }
    };
};
var concTime = function(cl, v, time) {
	return(100*Math.exp(-cl/v*time));
};

var concTimeArray = function(cl, v, dose, times, idnum) {
	var c0 = dose/v;
	var res = _.map(times, function(t) {
		return(
			{'x': t,
			'y': c0*Math.exp(-cl/v*t)}
		);
		});
	return {values: res, name: "ID"+idnum};
};

var seq = [];
for (var i = 0; i <= 7000; i++) {
	seq.push(i*0.16);
}
console.log(seq);
var t = timer("baseline");
for(var j = 0; j < 100; j++) {
	var baseline = concTimeArray(1, 10, 10000, seq, 1);
}
t.stop(); // on windows desktop finished in 23 ms for 100 inds with 0.16 unit increments
