/**
 * 集合
 */
class Set {
    constructor() {
        this.dataStore = [];
    }
    add(data) {
        //是否存在判断
        if (this.dataStore.indexOf(data) < 0) {
            this.dataStore.push(data);
            return true;
        } else {
            return false;
        }
    }

    remove(data) {
        var pos = this.dataStore.indexOf(data);
        if (pos > -1) {
            this.dataStore.splice(pos, 1);
            return true;
        } else {
            return false;
        }
    }

    show() {
        return this.dataStore;
    }

    contains(data) {
        if (this.dataStore.indexOf(data) > -1) {
            return true;
        } else {
            return false;
        }
    }

    union(set) {
        var tempSet = new Set();
        for (let i = 0; i < this.dataStore.length; ++i) {
            tempSet.add(this.dataStore[i]);
        }
        for (let i = 0; i < set.dataStore.length; ++i) {
            if (!tempSet.contains(set.dataStore[i])) {
                tempSet.dataStore.push(set.dataStore[i]);
            }
        }

        return tempSet;
    }
    //交集
    intersect(set){
        var tempSet=new Set();
        for(var i=0;i<this.dataStore.length;++i){
            if(set.contains(this.dataStore[i])){
                tempSet.add(this.dataStore[i]);
            }
        }
    }
    //补集
    difference(set){
        var tempSet=new Set();
        for(var i=0;i<this.dataStore.length;++i){
            if(!set.contains(this.dataStore[i])){
                tempSet.add(this.dataStore[i]);
            }
        }
        return tempSet;
    }

    size(){
        return this.dataStore.length;
    }


}

let set = new Set();

set.add('allen');
set.add('bob');
set.add('chris');
set.add('dove');

let set2=new Set();

set2.add('allen');
set2.add('hahah');

console.log(set.union(set2).show());
