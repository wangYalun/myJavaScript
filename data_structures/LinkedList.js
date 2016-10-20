
function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node('head');
    this.head.next=this.head;
}
LList.prototype.find = function (item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}
//双向列表
LList.prototype.remove = function () {
    var currNode = this.find(item);
    if (currNode.next != null) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
}

//查找最后一个元素
LList.prototype.findLast = function () {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}

LList.prototype.insert = function (newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    if (current.next != null) {
        current.next.previous = newNode;
    }
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
}

LList.prototype.display = function () {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}
//反向展示
LList.prototype.dispReverse=function(){
    var currNode=this.head;
    currNode=this.findLast();
    while(!(currNode.previous==null)){
        console.log(currNode.element);
        currNode = currNode.previous;
    }
}

LList.prototype.findPrevious = function (item) {
    var currNode = this.head;
    while (!(currNode.next == null) && (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}
LList.prototype.remove = function (item) {
    var prevNode = this.findPrevious(item);
    prevNode.next = prevNode.next.next;
}
var citis = new LList();
citis.insert('shenzhen', 'head');
citis.insert('jian', 'shenzhen');
citis.insert('nanchang', 'shenzhen');

citis.display();
citis.dispReverse();
console.log(citis.find('jian').previous.element);