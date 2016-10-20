function Queue() {
    this.dataStore = [];
}

Queue.prototype.enqueue = function (element) {
    this.dataStore.push(element);
}
//一般队列
Queue.prototype.dequeue = function () {
    return this.dataStore.shift();
}
//优先队列
Queue.prototype.dequeuePriority=function(){
    var code=this.dataStore[0].code;
    var priority=0;
    for(var i=1;i<this.dataStore.length;++i){
        if(this.dataStore[i].code<code){
            priority=i;
            code=this.dataStore[i].code;
        }
    }
    return this.dataStore.splice(priority,1);
}
function Patient(name,code){
    this.name=name;
    this.code=code;
}
Patient.prototype.toString=function(){
    return this.code+"："+this.name;
}

Queue.prototype.front = function () {
    return this.dataStore[0];
}
Queue.prototype.back = function () {
    return this.dataStore[this.dataStore.length - 1];
}
Queue.prototype.empty = function () {
    if (this.dataStore.length == 0) {
        return true;
    } else {
        return false;
    }
}

//TEST
var ed=new Queue();
ed.enqueue(new Patient('Allen',4));
ed.enqueue(new Patient('bob',3));
ed.enqueue(new Patient('Cha',2));
ed.enqueue(new Patient('Dada',2));
console.log(ed.dequeuePriority().toString());
console.log(ed.dequeuePriority().toString());
console.log(ed.dequeuePriority().toString());
console.log(ed.dequeuePriority().toString());


