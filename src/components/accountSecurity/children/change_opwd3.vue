<style lang=less>
	@import '../../../assets/public.less';
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" >修改资金密码</h2>
		</div>
		<div class="form_warp">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userPwd" label-width="120px" class="demo-ruleForm">
					<!-- 旧资金密码 -->
					<el-form-item :label="$t('changePwd2.info[3]')" prop="tpwd" >
						<el-input type="password" v-model="old_password" auto-complete="off" :placeholder="$t('changePwd2.info[4]')"  @blur="pwdyanzheng(old_password)"></el-input>
					</el-form-item>
					<!-- 资金密码 -->
					<el-form-item :label="$t('changePwd2.info[5]')" prop="tpwd" >
						<el-input type="password" v-model="password" auto-complete="off" :placeholder="$t('changePwd2.info[6]')" @blur="pwdyanzheng(password)"></el-input>
					</el-form-item>
					<el-form-item :label="$t('changePwd2.info[5]')" prop="tpwd">
						<el-input type="password" v-model="password" auto-complete="off" :placeholder="$t('changePwd2.info[10]')" @blur="pwdyanzheng(password)"></el-input>
					</el-form-item>
					<!-- 重复密码 -->
					<el-form-item :label="$t('changePwd2.info[7]')" prop="tpwd1">
						<el-input type="password" v-model="password_confirmation" auto-complete="off" :placeholder="$t('changePwd2.info[8]')" @blur="pwdyanzheng(password_confirmation)"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="dakai" :loading="loading">{{$t('changePwd2.info[9]')}}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!-- 点击提交显示弹框 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="dialogVisible">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t('changePassword[0]')}}</span>
						<!--添加支付方式-->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
						<i class="el-message-box__close el-icon-close" ></i>
					</button>
				</div>
				<div class="google"> 
					<div>
						<p>{{$t('changePwd2.dialog[1]')}}</p>
						<el-input v-model="googleCode" auto-complete="off" :placeholder="$t('changePwd2.dialog[2]')"></el-input>
						<p >{{$t('changePwd2.dialog[3]')}}</p>
						<div class="getcode" >
							<el-input v-model="userPwd.code" auto-complete="off" :placeholder="$t('changePwd2.dialog[4]')"></el-input>
							<div class="btn_code" @click="getCode()">
								<el-input type="button" :value="'| '+ $t(btnCode.time)" :disabled='btnCode.disabled'></el-input>
							</div>
						</div>
						<div class="btnList">	
							<a href="javascript:;" class="quxiao" @click="close_moble">{{$t('changePwd2.dialog[5]')}}</a>
							<a href="javascript:;" @click="submit('google')">{{$t('changePwd2.dialog[6]')}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--  -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="dialogVisible1">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t('changePassword[0]')}}</span>
						<!--添加支付方式-->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
						<i class="el-message-box__close el-icon-close" ></i>
					</button>
				</div>
				<div class="google">
					<div>
						<p>{{$t('changePwd2.dialog[7]')}}</p>
						<div class="getcode">
							<el-input v-model="userPwd.code" auto-complete="off" :placeholder="$t('changePwd2.dialog[8]')"></el-input>
							<div class="btn_code" @click="getCode()">
								<el-input type="button" :value="'| '+ $t(btnCode.time)" :disabled='btnCode.disabled'></el-input>
							</div>
						</div>
						<div class="btnList">	
							<a href="javascript:;" class="quxiao" @click="close_moble">{{$t('changePwd2.dialog[9]')}}</a>
							<a href="javascript:;" @click="submit">{{$t('changePwd2.dialog[10]')}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var _this = this;
			// var validatecode = (rule, value, callback) => {
			// 	if(!value) {
			// 		return callback(new Error(this.$t("changetpwd.tip[2]")));
			// 	} else {
			// 		callback();
			// 	}
			// };
			// var oldpwd = (rule, value, callback) => {
			// 	if(!_this.$public.pwd(value)) {
			// 		return callback(new Error(this.$t("changetpwd.validateopwd")));//请输入有效的密码
			// 	} else {
			// 		callback();
			// 	}
			// };
			// var validatetpwd = (rule, value, callback) => {
			// 	if(!_this.$public.pwd(value)) {
			// 		callback(new Error(this.$t(this.$t("changetpwd.validateopwd"))));//请输入有效的密码
			// 	} else {
			// 		callback();
			// 	}
			// };
			// var validatetpwd2 = (rule, value, callback) => {
			// 	if(value === '') {
			// 		callback(new Error(this.$t("changetpwd.validateopwd2[0]")));//请再次输入密码
			// 	} else if(value !== this.userData.tpwd) {
			// 		callback(new Error(this.$t("changetpwd.validateopwd2[1]")));//两次输入密码不一致!
			// 	} else {
			// 		callback();
			// 	}
			// };
			return { 
				userData:{},
				dialogVisible:'display:none',//开启谷歌验证弹框
				dialogVisible1:'display:none',//未开启谷歌验证弹框
				userPwd: {
					type:'',
					password: '', //新密码
					password_confirmation : '', //确认新密码
					code: '',//验证码
				},
				password:'',
				password_confirmation:'',
				googleCode:'',
				old_password:'',
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志		
				btnCode: {
					time: "regLA[17]", //倒计时 
					disabled: false
				},		
			};
		},
		methods: {
			//获取个人信息
			userInfo(){
				var _this = this;
				_this.$http.get(_this.$http.details,{params:{}}).then(function(res) {
					if(res.data.code == '200') {
						sessionStorage.userData = JSON.stringify(res.data.data);
						_this.userData = res.data.data;
					}
				})
			},
			// 打开验证弹框
			dakai(){
				var _this = this;
				if(!_this.password){
					_this.$public.msg(_this.$t('changePwd2.tip[1]'), 'warning', _this);
					return ;
				}
				if(!_this.password_confirmation){
					_this.$public.msg(_this.$t('changePwd2.tip[2]'), 'warning', _this);
					return ;
				}
				if(_this.password !== _this.password_confirmation){
					_this.$public.msg(_this.$t('changePwd2.tip[3]'), 'warning', _this);
					return ;
				}
				if(_this.userData.config.payment_password_set == 1){
					if(!_this.$public.pwd(_this.old_password)){
						_this.$public.msg(_this.$t('changePwd2.tip[4]'),'warning',_this)
						return ;
					}
				}
				if(!_this.$public.pwd(_this.password)){
					_this.$public.msg(_this.$t('changePwd2.tip[4]'),'warning',_this)
					return ;
				}
				if(!_this.$public.pwd(_this.password_confirmation)){
					_this.$public.msg(_this.$t('changePwd2.tip[4]'),'warning',_this)
					return ;
				}
				if(_this.userData.config.payment_password_set == 0){
					if(_this.userData.config.google_bind == 0){
						_this.dialogVisible1 = 'display:block';
					}else if(_this.userData.config.google_bind == 1){
						_this.dialogVisible = 'display:block';
					}
					return;
				}
				_this.$http.post(_this.$http.verifyPassword, {
					type:'payment',
					old_password:_this.$md5(_this.old_password)
				}).then(function(res) {
					if(res.data.code == '200') {
						if(_this.userData.config.google_bind == 0){
							_this.dialogVisible1 = 'display:block';
						}else if(_this.userData.config.google_bind == 1){
							_this.dialogVisible = 'display:block';
						}
					}else{
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
				})
				// if(_this.userData.config.google_bind == 0){
				// 	_this.dialogVisible1 = 'display:block';
				// }else if(_this.userData.config.google_bind == 1){
				// 	_this.dialogVisible = 'display:block';
				// }
			},
			//关闭弹框
			close_moble(){
				var _this = this;
				_this.dialogVisible = 'display:none';
				_this.dialogVisible1 = 'display:none';
				_this.userPwd.code = '';
				_this.googleCode = '';
			},
			//获取验证码
			getCode() {
				var _this = this;
				var phone = _this.userData.phone;
				var area_code = _this.userData.area_code;
                if (phone.indexOf('@') == -1) {
					if (!_this.$public.checkMobile(phone)) {
						return _this.$public.msg(_this.$t('changePwd2.tip[5]'), 'warning', _this);
					} else {
						_this.btnCode.disabled = true;
					//获取验证码
                        _this.$http.post(_this.$http.sendSms, {
                            'phone':phone,
                            'area_code': area_code
                        }).then(function(response) {
                            if(response.data.code == "200") {
                                _this.$public.setTime(_this); //倒计时函数封装
                                // _this.phone = _this.userData.mobile //手机号保存
                            } else {
                                _this.$public.msg(response.data.msg, 'success', _this);
                                _this.btnCode.disabled = false;
                            }
                        }).catch(function(error) {});
					}
				} 
			},
			//设置资金密码
			submit(val){
				var _this = this;
				if(val == 'google'){
					_this.userPwd.google_code = _this.googleCode;
				}
				if(_this.userData.config.sms_verify == 1){
						if(!_this.userPwd.code){
						_this.$public.msg(_this.$t('changePwd2.tip[6]'), 'warning', _this);
						return ;
					}
				}
				if(_this.userData.config.payment_password_set == 1){
					_this.userPwd.type = 'payment';
					_this.userPwd.old_password = _this.$md5(_this.old_password);
					_this.userPwd.password = _this.$md5(_this.password);
					_this.userPwd.password_confirmation = _this.$md5(_this.password_confirmation);
					_this.$http.post(_this.$http.resetPassword,_this.userPwd).then(function(res) {
						if(res.data.code == '200') {
							_this.userInfo();
							_this.$router.go(-1); //返回上一层
							_this.$public.msg(_this.$t('changePwd2.tip[7]'), 'success', _this);
						}else{
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
					})
				}else if(_this.userData.config.payment_password_set == 0){
					if(_this.userData.config.sms_verify==1){
						if(!_this.userPwd.code){
							_this.$public.msg(_this.$t('changePwd2.tip[8]'), 'warning', _this);
							return ;
						} 
					}
					_this.userPwd.password = _this.$md5(_this.password);
					_this.userPwd.password_confirmation = _this.$md5(_this.password_confirmation);
					_this.$http.post(_this.$http.createPaymentPassword,_this.userPwd).then(function(res) {
						if(res.data.code == '200') {
							_this.userInfo();
							_this.$router.go(-1); //返回上一层
							_this.$public.msg(_this.$t('changePwd2.tip[7]'), 'success', _this);
						}else{
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
					})
				}
			},
			pwdyanzheng(val){
				var _this= this;
				if(!_this.$public.pwd(val)){
					_this.$public.msg(_this.$t('changePwd2.tip[4]'),'warning',_this)
				}
			},
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			}

		},
		created: function() {
			var _this = this;
			// _this.userData = JSON.parse(sessionStorage.userData);
			// _this.userInfo();
		}
	}
</script>

<style>

</style>