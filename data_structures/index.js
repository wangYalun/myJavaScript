var extend=require("../tools/index").extend;
//列表类
function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = []; // 初始化一个空数组来保存列表元素
}

//append:给列表添加元素
List.prototype.append = function (element) {
    this.dataStore[this.listSize++] = element;
}
//find:在列表中查找某一元素
List.prototype.find = function (element) {
    for (var i = 0; i < this.listSize; ++i) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return -1;
}
//remove:从列表中删除元素
List.prototype.remove = function (element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    }
    return false;
}
//length:列表中有多少个元素
List.prototype.length = function () {
    return this.listSize;
}
//toString:显示列表中的元素
List.prototype.toString = function () {
    return this.dataStore;
}

//insert:向列表中插入一个元素
List.prototype.insert = function (element, after) {
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos, 0, elment);
        ++this.listSize;
        return true;
    }
    return false;
}
//Clear:清空列表中所有的元素
List.prototype.clear = function () {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}
//contains:判断给定值是否在列表中
List.prototype.contains=function(element){
    for(var i=0;i<this.listSize;++i){
        if(this.dataStore[i]==element){
            return true;
        }
    }
    return false;
}
//遍历列表
extend.call(List.prototype,{
    front:function(){
        this.pos=0;
    },
    end:function(){
        this.pos=this.listSize-1;
    },
    prev:function(){
        if(this.pos>0){
            --this.pos;
        }
    },
    next:function(){
        if(this.pos<this.listSize-1){
            ++this.pos;
        }
    },
    currPos:function(){
        return this.pos;
    },
    moveTo:function(postion){
        this.pos=postion;
    },
    getElement:function(){
        return this.dataStore[this.pos];
    }
});




var names = new List();

names.append('allen');
names.append('bob');

console.log(names.toString());

console.log(names.getElement());
names.next();
console.log(names.getElement());



