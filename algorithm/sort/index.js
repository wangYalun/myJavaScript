
class CArray {
    constructor(numElements) {
        this.pos = 0;
        this.numElements = numElements;
        this.dataStore = [];
    }

    setData(maxNum) {
        for (let i = 0; i < this.numElements; i++) {
            this.dataStore[i] = Math.floor(Math.random() * maxNum + 1);
        }
    }

    createArr(maxNum) {

    }

    toString() {
        var restr = "";
        for (let i = 0; i < this.dataStore.length; ++i) {
            restr += this.dataStore[i] + " ";
            if (i > 0 && i % 10 == 0) {
                restr += "\n";
            }
        }
        return restr;
    }

    insert(element) {

    }

    clear() {

    }

}

var a = new CArray(50);

a.setData(100);

console.log(a.toString());