
function Stack() {
    this.dataStore = [];
    this.top = 0;
}

Stack.prototype.push = function () {
    this.dataStore[this.top++] = element;
}
Stack.prototype.pop = function () {
    return this.dataStore[--this.top];
}
Stack.prototype.peek = function () {
    return this.dataStore[this.pop - 1];
}
Stack.prototype.length = function () {
    return this.pop;
}
Stack.prototype.clear = function () {
    this.pop = 0;
}