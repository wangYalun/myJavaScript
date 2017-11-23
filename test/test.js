
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
});

(function () {
	var endTime = +moment("2017-11-06", "YYYY-MM-DD 00:00:00").add(1, "days");

	// var currentTime = (moment(1509940712000).format("YYYY-MM-DD HH:mm:ss"));
	var currentTime = 1509940712000;

	console.log(endTime - currentTime);

	console.log(12 * 60 * 60 * 1000);

	//console.log(leftTime);
})();


(function () {
	var arr = [
		{ date: "2017-11-08", name: "allen" },
		{ date: "2017-11-09", name: "allen" },
		{ date: "2017-11-08", name: "bob" }
	];

	var target = arr.find(item => item.date === "2017-11-08");

	target.name = "cici";

	console.log(arr);
	console.log(target);
})();

(function () {
	var i = setInterval(() => {
		console.log(new Date());
	}, 10000);

	setTimeout(() => {
		clearInterval(i);
	}, 5000);
})();



