/**
 * 微信红包类
 * @author Allen
 * @param {number} money 红包金额大小，最小不能小于 0.01*size;
 * @param {number} size 将红包分成多少分，最小为1
 */
function MoneyPackage(money, size) {
    if (typeof money !== 'number' || typeof size !== 'number') {
        return;
    }
    this.money = money;
    this.size = size;
    this.remainMoney = money;
    this.remainSize = size;
}

MoneyPackage.prototype.openLuckyMoney = function () {
    if (this.remainSize === 1) {
        this.remainSize--;
        return Math.round(this.remainMoney * 100) / 100;
    }
    var minMoney = 0.01;//最少金额为0.01元
    var maxMoney = this.remainMoney / this.remainSize * 2;

    var money = Math.random() * maxMoney;
    money = money <= minMoney ? minMoney : money;
    money = Math.floor(money * 100) / 100;
    this.remainSize--;
    this.remainMoney -= money;
    return money;
}



