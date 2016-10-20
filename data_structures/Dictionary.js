function Dictionary() {
    this.dataStore = new Array();
}

Dictionary.prototype.add = function (key, value) {
    this.dataStore[key] = value;
}
Dictionary.prototype.find = function (key) {
    return this.dataStore[key];
}
Dictionary.prototype.remove=function(key){
    delete this.dataStore[key];
}
Dictionary.prototype.push=function(value){
    this.dataStore.push(value);
}
Dictionary.prototype.showAll=function(){
    // for(var key in this.dataStore){
    //     console.log(key+"->"+this.dataStore[key]);
    // }
    console.log(this.dataStore);
}

var dic=new Dictionary();

dic.add('name','allen');
dic.add('age',20);
dic.add('sex','man');
dic.push('ahh');
console.log(dic.dataStore);
dic.remove('sex');
console.log(dic.dataStore);
console.log(dic.find('name'));
console.log(Object.keys(dic.dataStore));

dic.showAll();