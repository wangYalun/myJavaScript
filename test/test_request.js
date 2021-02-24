var request = require('request');

var moment = require('moment');

(function () {
    request('http://localhost:8081/api/notice?index=0&size=20', function (error, response, body) {
        console.log('error', error);
        //console.log('response', response);
        console.log('body', body);
    });
});


const computeMinuteList = (isToday, operationStartTime, operationEndTime) => {

    if (isToday) {
        const currentDate = moment(); // 如果是要计算的日期是今天的话，获取当前的客户端时间
        if (operationStartTime.format("HH:mm") < currentDate.format("HH:mm")) { //如果当前时间大于运营时间，那么从当前时间开始计算
            operationStartTime = currentDate;
        }
    } else {
        operationStartTime = operationStartTime.clone();
    }
    operationStartTime.minute(Math.ceil(operationStartTime.minute() / 10) * 10);
    // console.log(Math.ceil(currentDate.minute()/10)*10)
    const minuteList = [{
        value: operationStartTime.format("HH:mm")
    }];
    const operationStartTimeCopy = operationStartTime.clone();
    while (operationStartTime.format("HH:mm") < operationEndTime.format("HH:mm") && operationStartTimeCopy.isSame(operationStartTime, 'day')) {
        // console.log(operationStartTime.format("HH:mm"), operationEndTime.format("HH:mm"))
        operationStartTime.add(5, 'minutes');
        minuteList.push({
            value: operationStartTime.format("HH:mm")
        })
    }
    // console.log(minuteList);
    return minuteList;
}

const obj = {
    setData(data, fn) {
        this.data = data;
        console.log(data);
        if (fn) {
            fn();
        }
    }
};

(function () {
    const startTime = "23:40";
    const endTime = "23:59";

    // const currentTimeStamp = moment(1572321695406);

    // console.log(currentTimeStamp - moment("2019-10-29 12:01:00", "YYYY-MM-DD HH:mm:ss"));
    // console.log(currentTimeStamp.format("YYYY-MM-DD HH:mm:ss"))

    // return;
    const currentDate = moment();
    const operationStartTime = moment(startTime, 'HH:mm');
    const operationEndTime = moment(endTime, 'HH:mm');

    console.log(operationStartTime.hours());


    const dateList = [];
    if (operationEndTime.format("HH:mm") > currentDate.format("HH:mm")) {
        dateList.push({
            displayValue: "今天",
            value: currentDate.format("YYYY-MM-DD"),
            isToday: true
        })
    }

    // let dateItem = null;
    for (let i = 0; i < 14; i++) {
        currentDate.add(1, 'days');
        dateList.push({
            displayValue: i === 0 ? "明天" : currentDate.format("MM月DD日"),
            value: currentDate.format("YYYY-MM-DD"),
            isToday: false
        })
    }

    console.log(dateList);


    this.setData({
        dateList,
        operationStartTime,
        operationEndTime,
        minuteList: computeMinuteList(dateList[0] && dateList[0].isToday, operationStartTime, operationEndTime)
    }, () => {
        const selectedDate = dateList[0];
        const selectedMinute = this.data.minuteList[0];
        let addMinutes = operationEndTime.diff(moment(selectedMinute.value, "HH:mm"), 'minutes');
        if (addMinutes >= 30) {
            addMinutes = 30;
        }
        const endMinute = moment(selectedMinute.value, "HH:mm").add(addMinutes, 'minutes').format("HH:mm");
        this.setData({
            selectedDate,
            selectedMinute,
            selectedStartTimeDisplay: selectedDate.displayValue + " " + selectedMinute.value,
            selectedStartTime: selectedDate.value + " " + selectedMinute.value,
            selectedEndTimeDisplay: selectedDate.displayValue + " " + endMinute,
            selectedEndTimeDisplayShort: endMinute,
            selectedEndTime: selectedDate.value + " " + endMinute,
        })
    })
}).call(obj);



