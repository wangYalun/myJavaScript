var event = {
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); //订阅的消息添加进缓存列表
  },
  trigger: function () {
    var key = [].shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0, fn; (fn = fns[i++]); ) {
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
  },
};

class EventEmitter {
  constructor() {
    this.clientList = {};
  }
  on(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); //订阅的消息添加进缓存列表
  }
  off(key, fn) {
    const fns = this.clientList[key];

    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let len = fns.length - 1; len >= 0; len--) {
        let _fn = fns[len];
        if (_fn === fn) {
          fns.splice(len, 1);
        }
      }
    }
  }
  trigger(key, data) {
    const fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach((fn) => {
      fn(data);
    });
  }
}

var throttle = function (fn, interval) {
  var __self = fn,
    timer,
    firstTime = true;

  return function () {
    var args = arguments,
      __me = this;

    if (firstTime) {
      __self.apply(__me, args);
      return (firstTime = false);
    }

    if (timer) {
      return false;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);
  };
};

// const obj = {
//   allen: "allen",
//   allen: "bob",
// };
// console.log(obj["allen"]);
