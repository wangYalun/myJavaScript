/**
 * 订阅发布模型重构
 */
var dateSelecter = {};
var event = {
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); //订阅的消息添加进缓存列表
    },
    trigger: function () {
        var key = [].shift.call(arguments), fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    //移除订阅事件
    remove: function (key, fn) {
        var fns = this.clientList[key];

        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var len = fns.length - 1; len >= 0; len--) {
                var _fn = fns[len];
                if (_fn === fn) {
                    fns.splice(len, 1);
                }
            }
        }
    }
};



var installEvent = function (obj) {
    obj.clientList = {};
    for (var i in event) {
        obj[i] = event[i];
    }
};

installEvent(dateSelecter);

dateSelecter.init = function (defaultDays) {
    var self = this;
    // $(".startTime").each(function () {
    //     //console.log("hah");
    //     $(this).datepicker({
    //         showOtherMonths: true,
    //         selectOtherMonths: true,
    //         showButtonPanel: true,
    //         /*显示今天的日期的显示，以及关闭时间选择器*/
    //         changeMonth: true,
    //         /*显示选择其他月份*/
    //         changeYear: true,
    //         /*显示选择其他年份*/
    //         dateFormat: "yy-mm-dd" /*设置日期的显示格式*/,
    //         showWeek: true, /*显示一年中的第几周*/
    //         firstDay: 1
    //     });
    // });
    // $(".endTime").each(function () {
    //     $(this).datepicker({
    //         showOtherMonths: true,
    //         selectOtherMonths: true,
    //         showButtonPanel: true,
    //         /*显示今天的日期的显示，以及关闭时间选择器*/
    //         changeMonth: true,
    //         /*显示选择其他月份*/
    //         changeYear: true,
    //         /*显示选择其他年份*/
    //         dateFormat: "yy-mm-dd" /*设置日期的显示格式*/,
    //         showWeek: true, /*显示一年中的第几周*/
    //         firstDay: 1
    //     });
    // });
    $(".date-select").each(function () {
        //self.clientList[$(this).attr('id')] = [];
        $(this).click(function () {
            $(this).siblings("ul").toggle("fast");
        });
    });

    var day2 = new Date();
    var day1 = new Date(day2.valueOf() - (defaultDays || 7) * 24 * 60 * 60 * 1000);
    var startTime = this.dateFormat(day1);
    var endTime = this.dateFormat(day2);
    $(".date-select").find(".start").text(startTime);
    $(".date-select").find(".end").text(endTime);

    this.selecteDate();
};

dateSelecter.initTrigger = function (defaultDays) {
    var day2 = new Date();
    var day1 = new Date(day2.valueOf() - (defaultDays || 7) * 24 * 60 * 60 * 1000);
    var startTime = this.dateFormat(day1);
    var endTime = this.dateFormat(day2);
    for(var key in this.clientList){
        this.trigger(key,startTime,endTime);
    }
};

dateSelecter.selecteDate = function () {
    var self = this;
    $(".select-list li").each(function () {
        $(this).click(function () {
            var text = $(this).text();
            var days = parseInt(text);
            if (!isNaN(days)) {
                var day2 = new Date();
                var day1 = new Date(day2.valueOf() - days * 24 * 60 * 60 * 1000);
                var startTime = self.dateFormat(day1);
                var endTime = self.dateFormat(day2);
                var $ul = $(this).parent();
                $ul.toggle("fast");
                $ul.prev().find(".start").text(startTime);
                $ul.prev().find(".end").text(endTime);
                self.trigger('date-select', startTime, endTime);
                //it[callback](startTime, endTime);
            }
        });
        $(this).find(".btn-confirm").click(function () {
            var $div = $(this).parent().prev();
            var startTime = $div.find(".startTime").val();
            var endTime = $div.find(".endTime").val();
            if (startTime > endTime || startTime == "" || endTime == "") {
                alert("输入错误！");
            } else {
                var $ul = $(this).parents("ul.select-list");
                $ul.toggle("fast");
                $ul.prev().find(".start").text(startTime);
                $ul.prev().find(".end").text(endTime);
                //it[callback](startTime, endTime);
                self.trigger('date-select', startTime, endTime);
            }
        });
        $(this).find(".btn-cancel").click(function () {
            var $ul = $(this).parents("ul.select-list");
            $ul.toggle("fast");
        });
    });
}

dateSelecter.dateFormat = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + (month >= 10 ? month : "0" + month) + "-" + (day >= 10 ? day : "0" + day);
};

dateSelecter.init();

dateSelecter.listen('date-select',function(){
    console.log(arguments);
});


