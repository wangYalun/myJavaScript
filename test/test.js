

var start=new Date();
console.log(+start);

for(var i=0,sum=0;i<100000000;i++){
	sum+=1;
}

var end=new Date();
console.log(+end);
console.log(end-start);