/**
 * 二叉查找树
 */

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
    show() {
        return this.data;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    //插入数据
    insert(data) {
        //创建一个Node 对象,将数据收入该对象保存
        var n = new Node(data, null, null);
        //检查BST是否有根节点，如果没用，该节点就是根节点，完成
        if (this.root == null) {
            this.root = n;
        } else {
            //否则，准备遍历BTS，找到合适的插入位置。
            var current = this.root;
            var parent = null;
            while (true) {
                parent = current;
                if(data==current.data){
                    return false;
                }
                if (data < current.data) {
                    current = current.left;
                    if (current == null) {
                        parent.left = n;
                        return true;
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = n;
                        return true;
                    }
                }
            }
        }
    }

    //查找最小值
    getMin() {
        var current = this.root;
        while (!(current.left == null)) {
            current = current.left;
        }
        return current.show();
    }

    //查找最大值
    getMax() {
        var current = this.root;
        while (!(current.right == null)) {
            current = current.right;
        }
        return current.show();
    }
    //查找指定值
    find(data){
        var current=this.root;
        while(current!=null){
            if(current.data==data){
                return current;
            }else if(data<current.data){
                current=current.left;
            }else{
                current=current.right;
            }
        }
        return null;
    }

    remove(data){
        this.root=this.removeNode(this.root,data);
    }

    //辅助方法
    removeNode(node,data){
     
        if(node==null){
            return null;
        }
        if(data==node.data){
            //没有子节点的节点
            if(node.left==null&&node.right==null){
                return null;
            }
            //没有左子节点的节点
            if(node.left==null){
                return node.right;
            }
            //没有右子节点的节点
            if(node.right==null){
                return node.left;
            }

            var tempNode=this.getSmallestNode(node.right);
            node.data=tempNode.data;
            node.right=this.removeNode(node.right,tempNode.data);
            return node;
        }else if(data<node.data){
            node.left=this.removeNode(node.left,data);
            return node;
        }else{
            node.right=this.removeNode(node.right,data);
            return node;
        }

    }

    getSmallestNode(node){
        var current=node;
        while (!(current.left == null)) {
            current = current.left;
        }
        return current.show();
    }

}
//中序遍历
function inOrder(node) {
    if (!(node == null)) {
        arguments.callee(node.left);
        console.log(node.show());
        arguments.callee(node.right);
    }
}
//先序遍历
function preOrder(node) {
    if (!(node == null)) {
        console.log(node.show());
        arguments.callee(node.left);
        arguments.callee(node.right);
    }
}
//后序遍历
function postOrder(node) {
    if (!(node == null)) {
        arguments.callee(node.left);
        arguments.callee(node.right);
        console.log(node.show());
    }
}


var b = new BST();

for (let i = 0; i < 10; i++) {
    console.log(Math.floor(Math.random() * 10));
    b.insert(Math.floor(Math.random() * 10));
}
console.log()
console.log("先序遍历");
inOrder(b.root);
// console.log("中序遍历");
// preOrder(b.root);
// console.log("后序遍历");
// postOrder(b.root);
// console.log("最大值:" + b.getMin());
 console.log("最小值:" + b.getMax());

//删除节点
b.remove(2);
inOrder(b.root);
