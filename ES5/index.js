// var UUID=require('./UUID');
// (function(){
//     var d=new Date();
//     console.log(d.toJSON());

//     // for(var i=0;i<10;i++){
//     // 	var uuid=new UUID();
//     // 	console.log(uuid.toString());
//     // }

//     while(true){
//     	var micro_time = +new Date();
//     	var gpa_pvi = new String(micro_time);
//     	console.log(gpa_pvi.concat(new String(Math.floor(Math.random()*10))));
//     	//console.log(gpa_pvi.substr(-12));
//     }
// })();


//测试数组迭代函数


function Obj(){
    this.arr=[1,5,2,6,8];

    this.marked=[];

    this.fun=function(){
        this.arr.forEach(function(item,index,array){
            //console.log(item);
            this.marked[index]=item;
            console.log(this.marked[index]);
            console.log(this);
        },this);
    }
}

var o=new Obj();

o.fun();


