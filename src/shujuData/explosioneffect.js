var Explosioneffect = new Object();
var NUMBER_OF_LEAVES = 50;
var image,leafDiv,spinAnimationName,fadeAndDropDuration,spinDuration,leafDelay;
Explosioneffect.effect = function () {
	
    function init() {
        var container = document.getElementById('petalbox');
        container.innerHTML = " ";
        try {
            for (var i = 0;
                 i < NUMBER_OF_LEAVES;

                 i++) {
                container.appendChild(createALeaf());
            }
        }
        catch(e) {
        }
    }
    function randomInteger(low, high) {
        return low + Math.floor(Math.random() * (high - low));
    }
    function randomFloat(low, high) {
        return low + Math.random() * (high - low);
    }
    function pixelValue(value) {
        return value + 'vw';
    }
    function durationValue(value) {
        return value + 's';
    }
    function createALeaf() {
        leafDiv = document.createElement('div');
        image = document.createElement('img');
        image.src ='./static/img/petal'+ randomInteger(1, 10) + '.png';
        leafDiv.style.top = pixelValue(randomInteger(-100, -0));
        leafDiv.style.left = pixelValue(randomInteger(0, 100));
        spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin':'counterclockwiseSpinAndFlip';
        leafDiv.style.webkitAnimationName ='fade, drop';
        leafDiv.style.animationName ='fade, drop';
        image.style.width = '100px';
        image.style.height = '100px';
        image.style.webkitAnimationName = spinAnimationName;
        image.style.animationName = spinAnimationName;
        /* 随机下落时间 */
        fadeAndDropDuration = durationValue(randomFloat(1.2, 2));
        /* 随机旋转时间 */
        spinDuration = durationValue(randomFloat(3, 4));
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
        // 随机delay时间
        leafDelay = durationValue(randomFloat(0, 1));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
        image.style.webkitAnimationDuration = spinDuration;
        image.style.animationDuration = spinDuration;
        leafDiv.appendChild(image);
        return leafDiv;
    }
    init();
};


export default Explosioneffect;