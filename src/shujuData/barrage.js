let Barrage = new Object();
let barrageArray = [],barrageOffsetLeft,barrageOffsetTop,barrageColor;
let barrageColorArray = [
'#f3b80a','#c4def2', '#80e055','#e94256','#f3705a','#78b89f','#f3b90a','#CC9933','#cdced6'
];
let barrageTipWidth = 50; //提示语的长度

Barrage.Method = function(inputValue){
	
 
    let barrageBoxWrap = document.querySelector('.barrage-container-wrap');;
    let barrageBox = document.querySelector('.barrage-container');
    //容器的宽高度
    let barrageWidth = ~~window.getComputedStyle(barrageBoxWrap).width.replace('px','');
    let barrageHeight = ~~window.getComputedStyle(barrageBoxWrap).height.replace('px','');
 

    //生成弹幕
    createBarrage(inputValue,true);

   
 
    //创建弹幕
    function createBarrage(msg, isSendMsg){
        let divNode = document.createElement('div');
        let spanNode = document.createElement('span');
     
        divNode.innerHTML = msg;
        divNode.classList.add('barrage-item');
        barrageBox.appendChild(divNode);
     
        spanNode.innerHTML = "逃跑";
        spanNode.classList.add('barrage-tip');
        divNode.appendChild(spanNode);
     
        barrageOffsetLeft = getRandom(barrageWidth, barrageWidth*4);
        barrageOffsetLeft = isSendMsg ? barrageWidth : barrageOffsetLeft
        barrageOffsetTop = getRandom(10, barrageHeight-10);
        barrageColor = barrageColorArray[Math.floor(Math.random()*(barrageColorArray.length))];
            //执行初始化滚动
            initBarrage.call(divNode,{
                left : barrageOffsetLeft,
                top : barrageOffsetTop,
                color : barrageColor
            });
        }
 
    //初始化弹幕移动(速度，延迟)
    function initBarrage(obj) {
        //初始化
        obj.top = obj.top || 0;
        obj.class = obj.color || '#fff';
        this.style.left = obj.left + 'px';
        this.style.top = obj.top + 'px';
        this.style.color = obj.color;  
     
        //添加属性
        this.distance = 0;
        this.width = ~~window.getComputedStyle(this).width.replace('px','');
        // this.offsetLeft = obj.left;
        this.timer = null;
     
        //弹幕子节点
        var barrageChileNode = this.children[0];
        barrageChileNode.style.left = (this.width-barrageTipWidth)/4 + 'px';
     
        //运动
        barrageAnimate(this);
    }
  
    //弹幕动画
    function barrageAnimate(obj){
        move(obj);
        if(Math.abs(obj.distance) < obj.width+obj.offsetLeft){
            obj.timer = requestAnimationFrame(function(){
                barrageAnimate(obj);
            });
        }else{
            cancelAnimationFrame(obj.timer);
            //删除节点
            obj.parentNode.removeChild(obj);
        }
    }
 
    //移动
    function move(obj){
        obj.distance-=3;
        obj.style.transform = 'translateX('+obj.distance+'px)';
        obj.style.webkitTransform = 'translateX('+obj.distance+'px)';
    }
 
    //随机获取高度
    function getRandom(start, end){
        return start +(Math.random() * (end - start));
    }
 
 
    /*******初始化事件**********/
     //系统数据
    barrageArray.forEach(function(item,index){
        createBarrage(item.text, false);
    });
}

export default Barrage;


//兼容写法
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());