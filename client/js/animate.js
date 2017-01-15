(function () {
    var div = document.createElement("div");
    div.className = "red-dot";
    div.getBoundingClientRect
    div.style.position = "absolute";
    document.body.appendChild(div);
    /**
     * @author Allen
     * 策略模式 动画应用
     */

    /**
     * 动画算法
     * @param {number} t 动画已消耗的时间
     * @param {number} b 小球原始位置
     * @param {number} c 小球目标位置
     * @param {number} d 动画持续总时间
     */
    var tween = {
        linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        }
    }

    var Animate = function (dom) {
        this.dom = dom; //进行运动的dom节点
        this.startTime = 0; //动画开始时间
        this.startPos = 0; //动画开始时，dom 节点的位置
        this.endPos = 0; //动画结束时，dom节点的位置
        this.propertyName = null; //dom 节点需要被改变的css属性名
        this.easing = null; //dom节点运动的算法
        this.duration = null; //动画持续时间
    };

    Animate.prototype.start = function (propertyName, endPos, duration, easing) {
        this.startTime = +new Date();
        this.startPos = this.dom.getBoundingClientRect()[propertyName];
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];

        var self = this;
        var timeId = setInterval(function () {
            if(self.step()===false){
                clearInterval(timeId);
            }
        }, 10);
    };

    Animate.prototype.step=function(){
        var t=+new Date();
        if(t>=this.startTime+this.duration){
            this.update(this.endPos);
            return false;
        }

        var pos=this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration);
        //pos为小球当前位置
        this.update(pos);
    };

    Animate.prototype.update=function(pos){
        //绘制动画轨迹
        var tempDom=this.dom.cloneNode(true);
        tempDom.style[this.propertyName]=pos+"px";
        document.body.appendChild(tempDom);
        //this.dom.style[this.propertyName]=pos+"px";
    }

    //测试代码
    var animate=new Animate(div);
    animate.start('left',500,1000,'easeIn');
    div.cloneNode(true);
    
});