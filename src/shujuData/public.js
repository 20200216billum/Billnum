import Vue from 'vue'

let Public = new Object()

// 加法
Public.UserInfo ={}
Public.getLocalTime = function (nS) {
  var h, m, s
  var date = new Date(nS)
  h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  m =
	  (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
	  ':'
  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return  h + m + s
};
Public.Addition = function (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e
};
// 减法
Public.Subtraction = function (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e
};
// 乘法
Public.Multiplication = function (arg1, arg2) {
  
  var arg1 = arg1 == '' || isNaN(arg1) ? 0 : arg1
  var arg2 = arg2 == '' || isNaN(arg2) ? 0 : arg2
  var r1, r2, m, n, q
  if (parseInt(arg1) == arg1) {
    r1 = 0
  } else {
    r1 = arg1.toString().split('.')[1].length
  }
  if (parseInt(arg2) == arg2) {
    r2 = 0
  } else {
    r2 = arg2.toString().split('.')[1].length
  }
  m = Math.pow(10, r1)
  n = Math.pow(10, r2)
  q = m * n
  var sum = (((arg1 * m) * (arg2 * n)) / q)
  return sum
};
Public.toPercent = function (val) {
  return (Number(val) * 100) + '%';
};
// 除法
Public.Division = function (a, b) {
  var a = a == '' || isNaN(a)? 0 : a
  var b = b == '' || isNaN(b)? 0 : b
  var c, d, e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), mul(c / d, Math.pow(10, f - e))
};
// 将交易对转成小写
Public.codeToLowercase = function(code) {
  let front, back;
  front = code.split("/")[0].toLowerCase();
  back = code.split("/")[1].toLowerCase();
  return front + back;
}

Public.SavePoint = function (code) {
  switch (code){
    case code == 'BTC/USDT'
		||	 code == 'ETH/USDT'
      :
      return 2
    case code == 'OMG/USDT'
		||	 code == 'GNT/USDT'
		||	 code == 'PST/USDT'
		||	 code == 'ZRX/USDT'
		||	 code == 'MANA/USDT'
		||	 code == 'CQTF/USDT'
		||	 code == 'USDT/USDT'
      :
      return 4
    case code == 'OMG/BTC'
		||	 code == 'OMG/ETH'
		||	 code == 'PST/ETH'
      :
      return 6
    case code == 'ZRX/BTC'
		||	 code == 'BAT/BTC'
		||	 code == 'GNT/BTC'
		||	 code == 'PST/BTC'
		||	 code == 'MANA/BTC'
		||	 code == 'ZRX/ETH'
		||	 code == 'BAT/ETH'
		||	 code == 'GNT/ETH'
		||	 code == 'MANA/ETH'
      :
      return 8

      default:
       return 6
  }
  // if (code == 'btc_usdt' || code == 'eth_usdt' || code == 'ltc_usdt' || code == 'bch_usdt') {
  //   return 2
  // } else if (code == 'eos_usdt') {
  //   return 4
  // } else if (code == 'erc20_usdt') {
  //   return 6
  // } else {
  //   return 6
  // }
}
// 加密
Public.$md5 = function (val) { 
  return Vue.prototype.$md5(val)
  // return val
}
// 保留小数位 val内容，num保留位数， pl可选 val为空时显示文本 noParse 为true时不去除无效零 默认去除
// Public.toLowFixed = function (val,num, pl, noParse) {
//     if(isNaN(Number(val)) || val === "")  return pl ? pl : ""
//     if(noParse) return Number(val).toFixed(Number(num))
//     else  return parseFloat(Number(val).toFixed(Number(num)))
// }
// 保留小数位 不四舍五入 val内容，num保留位数， pl可选 val为空时显示文本 noParse 为true时不去除无效零 默认去除
Public.toLowFixed = function (val,num, pl, noParse){
  if(isNaN(Number(val)) || val==="") return  pl ? pl : ""
  var _val = Number(val).toFixed(Number(num)+1)
  var arr = String(_val).split('.')
  arr[1] = arr[1].substr(0, num)
  if(noParse)  return Number(arr.join("."))
  return parseFloat(Number(arr.join(".")))
};
// 去除无效零  pl可选 val为空时显示的文本 
Public.parseFloat = function (val, pl) {
  if(isNaN(Number(val)) || val === "") return pl ? pl : ""
  return parseFloat(Number(val))
}
// 百分数转小数 
Public.toPoint = function (percent) {
  if (percent == 0){
    return 0
  }
  var str=percent.replace('%','')
  str= str/100
  return str
};

// 验证正整数
Public.integer = function (value) {
  var reg = /^\+?[1-9][0-9]*$/
  if (!reg.test(value)) {
    return false
  } else {
    return true
  }
}

// 验证小数最多8位
Public.integerDecimal = function (value) {
  var reg = /^\d{1}$|^\d{1}(\.?\d{1,8})$/
  if (!reg.test(value)) {
    return false
  } else {
    return true
  }
}

// 时间戳转化
Public.timestampToTime = function (timestamp) {
  var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y, M, D, h, m, s
  Y = date.getFullYear() + '-'
  M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  D = (date.getDate() <= 9 ? '0' + (date.getDate()) : date.getDate()) + ' '
  h = (date.getHours() <= 9 ? '0' + (date.getHours()) : date.getHours()) + ':'
  m = (date.getMinutes()<= 9 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
  s = (date.getSeconds()<= 9 ? '0' + (date.getSeconds()) : date.getSeconds())
  return Y + M + D + h + m + s
}
// 时间戳转化
Public.timestampToTimeshian = function (timestamp) {
  var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y, M, D, h, m, s
  Y = date.getFullYear() + '-'
  M = (date.getMonth() <9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  D = (date.getDate() <= 9 ? '0' + (date.getDate()) : date.getDate()) + ' '
  h = (date.getHours() <= 9 ? '0' + (date.getHours()) : date.getHours()) + ':'
  m = (date.getMinutes()<= 9 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
  s = (date.getSeconds()<= 9 ? '0' + (date.getSeconds()) : date.getSeconds())
  return Y + M + D 
}
Public.timestampToTimeshian1 = function (timestamp) {
  var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y, M, D, h, m, s
  Y = date.getFullYear() + '-'
  M = (date.getMonth() <9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  D = (date.getDate() <= 9 ? '0' + (date.getDate()) : date.getDate()) + ' '
  h = (date.getHours() <= 9 ? '0' + (date.getHours()) : date.getHours()) + ':'
  m = (date.getMinutes()<= 9 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
  s = (date.getSeconds()<= 9 ? '0' + (date.getSeconds()) : date.getSeconds())
  return h + m + s 
}
// 手机正则
Public.checkMobile = function (sMobile) {
  var phone = $.trim(sMobile)
  var reg = /^1\d{10}$/
  return reg.test(phone) 
};
Public.transOrderState = function (v, scope) { //订单状态
  var obj = {
    // '1':'未支付',
    // '2':'待发货',
    // '3':'待收货',
    // '4':'已完成',
    // '5':'买家退款',
    // '0':'订单取消'
    '1':scope.$t('shopOrder.state[1]'),
    '2':scope.$t('shopOrder.state[2]'),
    '3':scope.$t('shopOrder.state[3]'),
    '4':scope.$t('shopOrder.state[4]'),
    '5':scope.$t('shopOrder.state[5]'),
    '0':scope.$t('shopOrder.state[6]')
  }
  
  return obj[v]
}

// 函数节流 
// throttle(foo, 1000) 函数foo每次执行间隔最小为1000ms 
// 如果foo需要携带参数则为：throttle([foo, arg1, arg2...], 1000) 

Public.throttle = function (obj, t, mark) {
    var windowVar = (function () {
        if(mark == undefined) return '$$THROTTLE_CTRL'
        if(mark.constructor === String || mark.constructor === Number) return '$$THROTTLE_CTRL'+ '_' + mark
        else return '$$THROTTLE_CTRL'
    })()
    if(!window[windowVar]){
        window[windowVar] = true
        if(obj.constructor === Function) obj() // 不携带参数
        if(obj.constructor !== Function && obj.constructor !== Array)  throw new TypeError ("throttle(option , time) 'option' Musb be a Function or Array")
        if(obj.constructor === Array){// 携带参数
            if(fn[0].constructor !==Function) throw new TypeError("throttle(arr , time) 'arr[0]' Musb be a Function")
            var fn = obj[0]
            obj.splice(0,1)
            fn.apply(null, obj)
        }
        window.setTimeout(function () {window[windowVar] = null}, t)
    }
}

Public.toDecimal2 = function (x) { //强制保留2位小数
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}
// Public.toLowFixed
Public.toDecimal1 = function (x) { //强制保留1位小数
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
  }
  var arr =  s.split("")
  arr.splice(3,1,"")
	return arr.join("");
}


//密码格式
Public.pwd = function (val) {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
  return reg.test(val)
};
//邮箱验证
Public.email = function (em) {
  var ema = /^[A-Za-z0-9\u4e00-\u9fa5_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	
  if (!ema.test(em)) {
    return false
  } else {
    return true
  }
}
Public.transdecimal = function (val, code){
  switch (true){
    case code == 'BTC/USDT':
      return Number(val).toFixed(2)
  }
}
//身份证号验证
Public.isCardID = function (sId) {
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    return false
  } else {
    return true
  }
}

//银行卡号验证
Public.bank_car = function (val) {

  //	var reg = /^(  \d{16}|\d{19}  )$/;
  //	if(!reg.test(val)){
  //		return false;
  //	};
  //	return true;

  if (!isNaN(val) && val.length > 10 && val.length < 20) {
    return true
  } else {
    return false
  }

}
Public.Eliminate = function (str) {
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(/^\s+/, '')
  }
  return rs
}

//验证码格式验证
Public.code = function (val) {
  var reg = /^\d{6}$/
  return reg.test(val)
}

Public.name = function (val){
  var reg1= /^([\u4e00-\u9fa5]){2,7}$/ //只能是中文，长度为2-7位
  var reg2 = /^[a-zA-Z\/ ]{2,20}$/   //英文
  if (reg1.test(val) ||  reg2.test(val)){
    return true
  }else {
    return false
  }
//return reg2.test(val);
}
//验证是否为大于0的非空纯数字
Public.Ints = function (val) {
  if (!val) {
    return false
  } else if (val <= 0) { 
    return false
  } else {
    return true
  }
}
// 正数
// Public.validateNums = function (num) {
// 	var reg = /^\d+$|^\d+\.\d+$/g
//   if(reg.test(num)) return true;
//   return false ;  
// }
Public.isInteger = function (obj) {
  var obj = Number(obj)
  return Math.floor(obj) === obj
}
//倒计时执行函数封装
Public.setTime = function(_this) {
	_this.btnCode = {
		time: 59,
		disabled: true
	}
	_this.$message({
		message: _this.$t('header.tips[1]'),
		type: 'success'
	});
	var set = setInterval(function() {
		_this.btnCode.time--;
		if(_this.btnCode.time <= 0) {
			_this.btnCode = {
				time:  _this.$t('header.tips[2]'),
				disabled: false
			}
			clearInterval(set);
		}
	}, 1000)
};

// Public.setTime = function (_this) {
//   _this.btnCode = {
//     time: '59s',
//     disabled: true
//   }
//   _this.$message({
//     message: _this.$t('header.tips[1]'),
//     type: 'success'
//   })
//   var set = setInterval(function () {
//     _this.btnCode.time=parseFloat(_this.btnCode.time)-1
//     _this.btnCode.time=_this.btnCode.time+'s'
//     if (parseFloat(_this.btnCode.time) <= 0) {
//       _this.btnCode = {
//         time: _this.$t('header.tips[2]'),
//         disabled: false
//       }
//       clearInterval(set)
//     }
//   }, 1000)

// }
//提示信息封装
Public.msg = function (msg, type, _this) {
  _this.$message({
    showClose: true,
    message: msg,
    type: type,
    time:2100000
  })

};
//传一个手机号 返回手机号的前3位和后四位 其他的显示* (手机号加密)
Public.nameEncryption = function (str) {
  return str.substr(0,1)+new Array(str.length).join('*');
}
//传一个手机号 返回手机号的前3位和后四位 其他的显示* (手机号加密)
Public.phoneEncryption = function (num) {
  //获得手机号的前3位
  if (!num){
    return false
  }
  var a = num.slice(0, 3)
  var b = num.slice(7)
  var ok = a + '****' + b
  return ok
}
Public.Trim = function (str) { 
  return str.replace(/(^\s*)|(\s*$)/g, '') 
}
Public.codeImg = function (id) {
  // 生成验证码
  function yanzhenma (window, document) {
    var size = 4 //设置验证码长度
    function GVerify (options) { //创建一个图形验证码对象，接收options对象为参数
      this.options = { //默认options参数值
        id: '', //容器Id
        canvasId: 'verifyCanvas', //canvas的ID
        width: '200', //默认canvas宽度
        height: '44', //默认canvas高度
        type: 'blend', //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
        code: '',
      }
      if (Object.prototype.toString.call(options) == '[object Object]') { //判断传入参数类型
        for (var i in options) { //根据传入的参数，修改默认参数值
          this.options[i] = options[i]
        }
      } else {
        this.options.id = options
      }

      this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',')
      this.options.letterArr = getAllLetter()

      this._init()
      this.refresh()
    }

    GVerify.prototype = {
      /**版本号**/
      version: '1.0.0',

      /**初始化方法**/
      _init: function () {
        var con = document.getElementById(this.options.id)
        var canvas = document.createElement('canvas')
        this.options.width = con.offsetWidth > 0 ? con.offsetWidth : '200'
        this.options.height = con.offsetHeight > 0 ? con.offsetHeight : '44'
        canvas.id = this.options.canvasId
        canvas.width = this.options.width
        canvas.height = this.options.height
        canvas.style.cursor = 'pointer'
        canvas.innerHTML = '您的浏览器版本不支持canvas'
        con.appendChild(canvas)
        var parent = this
        canvas.onclick = function () {
          parent.refresh()
        }
      },

      /**生成验证码**/
      refresh: function () {
        this.options.code = ''
        var canvas = document.getElementById(this.options.canvasId)
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d')
        } else {
          return
        }
        ctx.textBaseline = 'middle'
        ctx.fillStyle = randomColor(180, 240)
        ctx.fillRect(0, 0, this.options.width, this.options.height)

        if (this.options.type == 'blend') { //判断验证码类型
          var txtArr = this.options.numArr.concat(this.options.letterArr)
        } else if (this.options.type == 'number') {
          var txtArr = this.options.numArr
        } else {
          var txtArr = this.options.letterArr
        }

        for (var i = 1; i <= size; i++) {
          var txt = txtArr[randomNum(0, txtArr.length)]
          this.options.code += txt
          ctx.font = randomNum(this.options.height, this.options.height) + 'px SimHei' //随机生成字体大小
          ctx.fillStyle = randomColor(50, 160) //随机生成字体颜色        
          ctx.shadowOffsetX = randomNum(-3, 3)
          ctx.shadowOffsetY = randomNum(-3, 3)
          ctx.shadowBlur = randomNum(-3, 3)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
          var x = this.options.width / (size + 1) * i
          var y = this.options.height / 2
          var deg = randomNum(-30, 30)
          /**设置旋转角度和坐标原点**/
          ctx.translate(x, y)
          ctx.rotate(deg * Math.PI / 180)
          ctx.fillText(txt, 0, 0)
          /**恢复旋转角度和坐标原点**/
          ctx.rotate(-deg * Math.PI / 180)
          ctx.translate(-x, -y)
        }
        /**绘制干扰线**/
        for (var i = 0; i < 4; i++) {
          ctx.strokeStyle = randomColor(40, 180)
          ctx.beginPath()
          ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height))
          ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height))
          ctx.stroke()
        }
        /**绘制干扰点**/
        for (var i = 0; i < this.options.width / 4; i++) {
          ctx.fillStyle = randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      },

      /**验证验证码**/
      validate: function (code) {
        var code = code.toLowerCase()
        var v_code = this.options.code.toLowerCase()
        if (code == v_code) {
          return true
        } else {
          this.refresh()
          return false
        }
      }
    }
    /**生成字母数组**/
    function getAllLetter () {
      var letterStr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
      return letterStr.split(',')
    }
    /**生成一个随机数**/
    function randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    /**生成一个随机色**/
    function randomColor (min, max) {
      var r = randomNum(min, max)
      var g = randomNum(min, max)
      var b = randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    window.GVerify = GVerify
  }
  yanzhenma(window, document)

  new GVerify(id)

}
//页面路由跳转封装
Public.go = function (url, time, _this) {
  _this.$router.push({
    path: url
  })
}
Public.scrollTop = function () {
  document.body.scrollTop = document.documentElement.scrollTop = 0
}
//判断是否登录执行函数
Public.isLogin = function (_this) {
  if (!sessionStorage.account || !sessionStorage.token) {
    _this.$public.msg(_this.$t('bibi.msg[0]'), 'warning', _this)
    _this.$public.go('login', 1000, _this)
  }
}
//提示信息封装
Public.confirm = function (msg, what, _this) {
  _this.$confirm(msg, _this.$t("Gic.header[14]"), {
    confirmButtonText: _this.$t("Gic.header[16]"),
    cancelButtonText: _this.$t("Gic.header[17]"),
    type: 'warning'
  }).then(() => {
    _this.$public.go(what, 800, _this)
  }).catch(() => {
    _this.$message({
      type: 'info',
      message: _this.$t('bibi.tisi[4]')
    })
  })
  return false

}

// 修改币种显示
Public.InterceptingAdd = function (str){
  if (str.split('_')[1]) {
    return str.split('_')[0]+'/'+str.split('_')[1]
  } else {
    return str.split('_')[0]
  }
}

Public.changeInterceptingAdd = function (str){
  if (str.split('_')[1]) {
    return str.split('_')[0]
  } else {
    return str
  }
}
Public.parnt = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1}$)|(^[0-9]*\.[0-9]{2}$)|(^[0-9]*\.[0-9]{3}$)|(^[0-9]*\.[0-9]{8}$)/

function mul (a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

//银行卡号
Public.bank = function(val) {

	//	var reg = /^(  \d{16}|\d{19}  )$/;
	//	if(!reg.test(val)){
	//		return false;
	//	};
	//	return true;

	if(!isNaN(val) && val.length > 10 && val.length < 20) {
		return true;
	} else {
		return false;
	}

}


Public.sectotime = function (s) {
  var t
  if (s > -1){
    var hour = Math.floor(s/3600)%24
    var min = Math.floor(s/60) % 60
    var sec = s % 60
    if (hour < 10) {
      t = '0'+ hour + ':' 
    } else {
      t = hour + ':'
    }
 
    if (min < 10){t += '0'}
    t += min + ':'
    if (sec < 10){t += '0'}
    t += sec
  }
  return t
} 

/*
 //交易数据判断
 传入参数 o 要判断的数据 （对象）
 wellone 用户余额
 * */
Public.dataDetection = function (o,wellone,_this){
//mobile: null, //手机号
//shopname: '', //code
//newprice: 0, //最新价格 
//buynum: 0, //买入数量
//type: 1, //市价 1 限价 2  （默认市价）
//otype: 1, //涨（买入） 1 跌 2（卖出）
  if (!o.mobile){
    //请先登录
    _this.$public.msg(_this.$t('bibi.msg[0]'), 'warning', _this)
    return false
  // } else if ( !o.code || (o.type != 1 &&o.type != 2 )|| (o.otype != 1 &&o.otype != 2 )){

  //   _this.$public.msg(_this.$t('bibi.msg[1]'), 'warning', _this)
  //   return false
  }
  if (typeof o.buyprice != 'undefined'){
    //判断价格是否合法
    if (!_this.$public.Ints(o.buyprice)){
      //交易价格要大于零
      _this.$public.msg(_this.$t('bibi.msg[2]'), 'warning', _this)
      return false
    } else if (o.buyprice.toString().indexOf('.') != -1 && o.buyprice.toString().split('.')[1].length > 8){
      _this.$public.msg(_this.$t('bibi.msg[4]'), 'warning', _this)
      return false
    }
  }

  if (typeof o.buynum != 'undefined' ){
    //交易数量
    if (!_this.$public.Ints(o.buynum)){
      _this.$public.msg(_this.$t('bibi.msg[3]'), 'warning', _this)
      return false
    } else if (o.buynum.toString().indexOf('.') != -1 && o.buynum.toString().split('.')[1].length > 8){
      _this.$public.msg(_this.$t('bibi.msg[4]'), 'warning', _this)
      return false
    }
  }

  if (typeof o.toalnum != 'undefined' ){
    //交易数量
    if (!_this.$public.Ints(o.toalnum)){
      _this.$public.msg(_this.$t('bibi.msg[3]'), 'warning', _this)
      return false
    } else if (o.toalnum.toString().indexOf('.') != -1 && o.toalnum.toString().split('.')[1].length > 8){
      _this.$public.msg(_this.$t('bibi.msg[4]'), 'warning', _this)
      return false
    }
  }

  if (typeof o.toalprice != 'undefined'){
    //交易数量
    if (!_this.$public.Ints(o.toalprice)){
      //委托总金额要大于零
      _this.$public.msg(_this.$t('bibi.msg[5]'), 'warning', _this)
      return false
    } else if (o.toalprice.toString().indexOf('.') != -1 && o.toalprice.toString().split('.')[1].length > 8){
      _this.$public.msg(_this.$t('bibi.msg[4]'), 'warning', _this)
      return false
    }
  }





  //判断输入价格 
  return true
//用户余额先不做判断	
}
export default Public