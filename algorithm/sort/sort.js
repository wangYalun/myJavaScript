
class Sort {
    constructor(num, maxNum, isOrder) {
        this.dataStore = new Array(num);
        //随机生成
        if (isOrder) {
            for (let i = 0; i < num; i++) {
                this.dataStore[i] = i + maxNum;
            }
            return;
        }
        for (let i = 0; i < num; i++) {
            this.dataStore[i] = Math.floor(Math.random() * maxNum + 1);
        }
    }

    //冒泡排序
    bubbleSort() {
        var i = this.dataStore.length - 1, j, temp;
        //不断找出最大的元素排在最后面，冒泡一样
        while (i > 0) {
            for (j = 0; j < i; j++) {
                if (this.dataStore[j] > this.dataStore[j + 1]) {
                    temp = this.dataStore[j];
                    this.dataStore[j] = this.dataStore[j + 1];
                    this.dataStore[j + 1] = temp;
                }
            }
            i--;
        }
    }
    //直接插入排序
    insertSort() {
        //不断有新元素插入到已经排好序的列表中
        var len = this.dataStore.length, temp;
        for (var i = 1; i < len; i++) {
            var r = this.dataStore[i];//待插入值
            for (var j = i; j >= 0; j--) {
                if (r < this.dataStore[j - 1]) {
                    temp = this.dataStore[j - 1];
                    this.dataStore[j - 1] = this.dataStore[j];
                    this.dataStore[j] = temp;
                } else {
                    break;
                }
            }
        }
    }
    //选择排序
    selectSort() {
        //不断从剩余元素中找出最小的值插入排在最后面。
        var len = this.dataStore.length, min, minIndex, temp;
        for (var i = 0; i < len; i++) {
            var j = i + 1;
            min = this.dataStore[j];
            minIndex = j;
            for (j = j + 1; j < len; j++) {
                if (this.dataStore[j] < min) {
                    min = this.dataStore[j];
                    minIndex = j;
                }
            }
            if (min < this.dataStore[i]) {
                temp = this.dataStore[i];
                this.dataStore[i] = this.dataStore[minIndex];
                this.dataStore[minIndex] = temp;
            }
        }
    }
    //希尔排序/缩小增量排序-是直接插入排序的一种更高效的改进版本
    shellSort() {
        var len = this.dataStore.length, temp;
        console.log('初始', this.dataStore);
        var n = 0;
        for (var fraction = Math.floor(len / 2); fraction > 0; fraction = Math.floor(fraction / 2)) {
            for (var i = fraction; i < len; i++) {
                for (var j = i - fraction; j >= 0 && this.dataStore[j + fraction] < this.dataStore[j]; j = j - fraction) {
                    temp = this.dataStore[j + fraction];
                    this.dataStore[j + fraction] = this.dataStore[j];
                    this.dataStore[j] = temp;
                }
            }
            n++;
            console.log('第' + n + '趟', this.dataStore);
        }
    }

    //堆排序-完全二叉树/大根堆/小根堆
    heapSort() {
        var len = this.dataStore.length;
        var it = this;
        buidMaxHeap();
        for (var i = len - 1; i > 0; i--) {
            swap(0, i);
            heapAdjust(0, i);
        }
        //建立大根堆
        function buidMaxHeap() {
            for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
                heapAdjust(i, len);
            }
        }
        //调整大根堆
        function heapAdjust(i, len) {
            var largest = i;
            var left = 2 * i + 1;
            var right = 2 * i + 2;

            if (left < len && it.dataStore[largest] < it.dataStore[left]) {
                largest = left;
            }
            if (right < len && it.dataStore[largest] < it.dataStore[right]) {
                largest = right;
            }
            if (largest != i) {
                swap(i, largest);
                heapAdjust(largest, len);
            }
        }
        //交换
        function swap(n, m) {
            var temp = it.dataStore[m];
            it.dataStore[m] = it.dataStore[n];
            it.dataStore[n] = temp;
        }
    }

    //归并排序
    mergeSort() {

        var A = this.dataStore;
        sort(0, A.length - 1);
        //排序
        function sort(p, r) {
            if (p < r) {
                var q = Math.floor((p + r) / 2);
                sort(p, q);
                sort(q + 1, r);
                merge(p, q, r);
            } else {

            }
        }
        //合并
        function merge(p, q, r) {

            // console.log("第"+he+"次合并");
            // console.log(p+" "+q+" "+r);
            // console.log("合并前:");
            // console.log(A);
            var L = [], R = [];
            for (var i = p; i <= q; i++) {
                L.push(A[i]);
            }
            for (var j = q + 1; j <= r; j++) {
                R.push(A[j]);
            }
            L.push(Number.MAX_VALUE);
            R.push(Number.MAX_VALUE);
            i = 0;
            j = 0;
            for (var k = p; k <= r; k++) {
                if (L[i] < R[j]) {
                    A[k] = L[i];
                    i++;
                } else {
                    A[k] = R[j];
                    j++;
                }
            }
            // console.log("合并后:");
            // console.log(A);
            // he++;
        }

    }

    //快速排序
    quickSort() {
        var array = this.dataStore;
        function sort(prev, numsize) {
            var nonius = prev;
            var j = numsize - 1;
            var flag = array[prev];
            if ((numsize - prev) > 1) {
                while (nonius < j) {
                    for (; nonius < j; j--) {
                        if (array[j] < flag) {
                            array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
                            break;
                        };
                    }
                    for (; nonius < j; nonius++) {
                        if (array[nonius] > flag) {
                            array[j--] = array[nonius];
                            break;
                        }
                    }
                }
                array[nonius] = flag;
                sort(0, nonius);
                sort(nonius + 1, numsize);
            }
        }
        sort(0, array.length);
    }



    //打乱顺序
    unOrder() {
        //克隆数组
        var temp = this.dataStore.slice(0), len = this.dataStore.length;
        for (let i = 0; i < len; i++) {
            let index = Math.floor(Math.random() * (len - i));
            this.dataStore[i] = temp[index];
            //删除已经获取的值
            temp.splice(index, 1);
        }
    }

    unOrder2() {
        var len = this.dataStore.length;
        // 重复多少次
        for (let i = 0; i < len; i++) {
            // 随机取两个数字交换顺序
            let first = Math.floor(Math.random() * (len));
            let second = Math.floor(Math.random() * (len));
            var temp = this.dataStore[first];
            this.dataStore[first] = this.dataStore[second];
            this.dataStore[second] = temp;
        }
    }

    swap(i, j) {
        var temp = this.dataStore[i];
        this.dataStore[i] = this.dataStore[j];
        this.dataStore[j] = temp;
    }

    // Knuth-Shuffle ，Knuth 洗牌算法
    unOrderknuthShuffle() {
        var len = this.dataStore.length;
        for (var i = len - 1; i >= 0; i--) {
            this.swap(i, Math.floor(Math.random() * (i + 1)));
        }
    }

    toString() {
        var restr = "";
        for (let i = 0; i < this.dataStore.length; ++i) {
            restr += this.dataStore[i] + " ";
            if (i > 0 && i % 10 == 0) {
                restr += "\n";
            }
        }
        return restr + "\n";
    }
}

//测试
var s = new Sort(20, 1, true);
console.log(s.toString());
// s.bubbleSort();
// console.log(s.toString());
s.unOrder2();
console.log(s.toString());
s.insertSort();
console.log(s.toString());

s.unOrderknuthShuffle();
console.log(s.toString());

s.insertSort();
console.log(s.toString());

s.unOrder();
console.log(s.toString());
// s.selectSort();
// console.log(s.toString());
// console.log("Shell Sort");
// s.unOrder();
// console.log(s.toString());
// s.shellSort();
// console.log(s.toString());
// console.log('堆排序');
// s.heapSort();
// console.log(s.toString());
// s.unOrder();
// console.log('快速排序');
// s.quickSort();
// console.log(s.toString());
// console.log('归并排序');
// s.mergeSort();
// console.log(s.toString());


