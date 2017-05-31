
var moment = require('moment');

(function () {
	var start = new Date();
	console.log(+start);

	for (var i = 0, sum = 0; i < 100000000; i++) {
		sum += 1;
	}

	var end = new Date();
	console.log(+end);
	console.log(end - start);
});

(function () {
	var arr = [1, 2, 3, 4, 5, 6];

	var filterArr = arr.filter((item) => {
		return item > 7;
	});
	console.log(arr);
	console.log(filterArr);

	var time = moment("19:00", "HH:mm");
	console.log(moment().to(time, 'mm'));

});


(function () {


	var obj = {
		text: "allen",
		fun: function () {
			console.log(this.text);
		},
		fun2: () => {
			console.log(this.text);
		}
	}
	var bigObj = {
		text: "bob",
		obj: obj
	}

	obj.fun();
	obj.fun2();

	bigObj.obj.fun();
	bigObj.obj.fun2();
})();



