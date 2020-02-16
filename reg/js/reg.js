// var host = "http://47.244.162.215"
var host = 'https://www.gicgold.in';
var url = {
	regcode:host+'/home/qbw/send_sms',   //验证嘛
	send_mail:host+'/api/user/sendEmail',  //邮箱验证码  1注册 
	regshuju:host+'/api/user/register'   //注册数据提交
};

//tjuser 
var Numbererweima = GetQueryString("recommend");
$('#tjuser').val(Numbererweima);

   if(!Numbererweima){
   	layer.open({
   	  style: 'border:none; background-color:#404040; color:#fff;',
   	  content:"邀请码错误",
   	  shadeClose: false,
   	})
   }
var loading = "<img class='loading' src='img/loading.png'></img>"
var mcode='86' ;
var registerType  = 'email'
var Verification = $('#code'),
	register = $('#submit'),
	PhoneNumber = $('input[name="phone"]'),
	PassWord = $('input[name="pwd"]'),
	ConfirmPW = $('input[name="paw2"]'),
	VerificaNum = $('input[name="code"]');
	Verification.click(function(){
		getCode();
	});
   function getCode(){
	   console.log(PhoneNumber.val());
	   
  
		if(PhoneCode(PhoneNumber.val())==true){
			$(".code span").unbind("click")
			$(".code span").html(loading)

			$.post(url.regcode,{
				mobile:PhoneNumber.val(),
				type:1,
				mcode:mcode
			},function(data){
				$(".code span").bind("click",getCode);
				$(".code span").html('发送验证码')
				LayerOpen(data.msg);
				if(data.status != "200"){
					if(data.data){
						LayerOpen(data.data.error);
					}		
					return false;
				}
				$(".code span").css({"background":"#ddd","color":"#444"}).html("60秒重新发送").unbind("click");
				var num=59;
				var time=setInterval(function(){
		              $(".code span").html(num-- + "后重新发送");
		              if(num<0){
		              	clearTimeout(time);
		              	$(".code span").css({"background":"#2A64F3","color":"#fff"}).html("重新发送");
		              	$(".code span").bind("click",getCode);
		              }
				},1000);
			}).error(function () {
				$(".code span").bind("click",getCode);
				$(".code span").html('发送验证码')
				LayerOpen('服务器连接失败，请稍后再试');
			});
			return false;
			// 邮箱发送
		} else if(email(PhoneNumber.val())==true){
			$(".code span").unbind("click")
			$(".code span").html(loading)
			$.post(url.send_mail,{
				email:PhoneNumber.val(),
				from:'register',
				recommend: Numbererweima,   //推荐码
			},function(data){
				$(".code span").bind("click",getCode);
				$(".code span").html('发送验证码')
				LayerOpen(data.msg);
				if(data.status != "200"){			
					return false;
				}
				$(".code span").css({"background":"#ddd","color":"#444"}).html("60秒重新发送").unbind("click");
				var num=59;
				var time=setInterval(function(){
		              $(".code span").html(num-- + "后重新发送");
		              if(num<0){
		              	clearTimeout(time);
		              	$(".code span").css({"background":"#2A64F3","color":"#fff"}).html("重新发送");
		              	$(".code span").bind("click",getCode);
		              }
				},1000);
			}).error(function () {
				$(".code span").bind("click",getCode);
				$(".code span").html('发送验证码')
				LayerOpen('服务器连接失败，请稍后再试');
			});
			return false;
		}else {
			if(registerType == 'email'){
				LayerOpen("邮箱格式不正确");
			}else{
				LayerOpen("手机号格式不正确");
			}
		};
	};


register.click(function(){
	if(!PhoneNumber.val()){
		if(registerType=="mobile"){
			LayerOpen("手机号不能为空");
		}else{
			LayerOpen("邮箱不能为空");

		}
		return ;
	};
	if (!VerificaNum.val()) {
		LayerOpen("验证码不能为空");
		return ;
	};
	if (!pwd(PassWord.val())) {
		LayerOpen("密码格式有误");
		return ;
	}
	if (ConfirmPW.val() != PassWord.val()){
		LayerOpen("两次输入的密码不一致，请重新输入");
		return ;
	}

	var _data={
		password:   PassWord.val().MD5(32),//密码
		password_confirmation: ConfirmPW.val().MD5(32),  //确认密码 
		email: PhoneNumber.val(),  //手机号
		code: VerificaNum.val(),  //验证码
		recommend: $('#tjuser').val(),   //推荐码
		// tjuser: 'ruEas65',   //推荐码
		// mcode:mcode 
	};
	if(registerType =='email'){
	 	delete	_data['mcode']
	}
	
	$.post(url.regshuju,_data,function(data){
		if(data.status == "200"){
			LayerOpen("注册成功");
				setTimeout(function(){
					window.location.href = 'https://admin.faceke.com/upload/?id=Cf32221233332';
				},500)
		}else{
			LayerOpen(data.msg);
		}
	})
})
function LayerOpen(conentta){
	layer.open({
	  style: 'border:none; background-color:#404040; color:#fff;',
	  content:conentta,
	  time:2
	})
};
function PhoneCode(num){
    var phone = num.trim()
	var reg = /^1\d{10}$/
	console.log(reg.test(phone));
	
    return reg.test(phone)
}

function email(em) {
	var ema = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if(!ema.test(em)) {
		return false;
	} else {
		return true;
	}
}

function pwd ( val ){
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
	return reg.test(val);
}

/*url地址参数获取*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&|)" + name + "=([^&?]*)(&|$|)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
}
// 下拉菜单
$(".mcode-box").on('click',function () {
		$(".dropDown").toggle()
})
$(".dropDown").on('click','li',function(event){
	mcode = $(this).attr('data-mcode')
	$(".dropDown").toggle()
	$(".mcode-text").text('+'+mcode)
})
// tab切换
$(".tab").on('click',function (event) {
	var type  = event.target.dataset.type
	// tab(type)
})


function tab(type) {
	var mobileBox = $("#mobile")
	var emailBox = $("#email")
	var mcodeBox = $(".mcode-box")
	var block = $(".block")
	PhoneNumber.val("")
	VerificaNum.val("")
	PassWord.val(""),
	ConfirmPW.val("")
	registerType = type
	if(type == 'mobile'){
		// tab样式
		// mobileBox.toggleClass('active')
		// emailBox.removeClass('active')
		block.removeClass('goRight')
		// 改变文字
		PhoneNumber.attr('placeholder','请输入手机号')
		mcodeBox.show()
		PhoneNumber.css('paddingLeft','75px')
	}else{
		// tab样式
		// emailBox.toggleClass('active')
		// mobileBox.removeClass('active')
		block.addClass('goRight')
		// 改变文字
		PhoneNumber.attr('placeholder','请输入邮箱')
		// 移除区号
		mcodeBox.hide()
		PhoneNumber.css('paddingLeft','15px')
	}
}
tab(registerType)
