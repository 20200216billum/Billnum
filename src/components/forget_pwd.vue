<style lang=less scoped>
	@import './forget_pwd.less';
</style>
<template>
	<div>
		<div id="main">
			<div class="forget_bg">
				<div class="forget_pwd_main">
					<!--账号验证-->
					<div class="validation_mobile" v-show="whitchShow == 1">
						<div class="header_forget">
							<h2 class="welcome_reg">忘记密码</h2>
						</div>
						<div class="form_warp">
							<div class="content_warp">
								<el-form :label-position="labelPosition" :model="userData" label-width="100px" class="demo-ruleForm">
									<el-form-item label="账号" prop="account"><!-- 账号 -->
										<el-input v-model="userData.account" auto-complete="off" placeholder="请输入登录账号"></el-input>
									</el-form-item>
									<div class="primary_btn">
										<el-button type="primary" @click="submitmobile()">{{$t("forgetpwd.titleThree[3]")}}</el-button><!-- 提交 -->
									</div>
								</el-form>
							</div>
						</div>
					</div>
					<!--安全验证-->
					<div class="valdation_code" v-show="whitchShow == 2">
						<div class="header_forget">
							<h2 class="welcome_reg">重置密码</h2>
						</div>
						<div class="form_warp form_warp2">
							<div class="content_warp">
								<el-form :label-position="labelPosition" :model="userData" :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
									<!-- <el-form-item :label='$t("forgetpwd.titleOne[1]")' prop="mobile">
										<el-input  v-model="userData.mobile" auto-complete="" :placeholder='$t("forgetpwd.titleOne[3]")'></el-input> 
									</el-form-item>
									<div class="valdation_code_warp">
										<el-form-item :label='$t("forgetpwd.titleTwo[2]")' prop="code">
											<el-input v-model.number="userData.code" auto-complete="off" :placeholder='$t("forgetpwd.titleTwo[4]")'></el-input>
										</el-form-item>
										<div class="btn_code" @click="get_code()">
											<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
										</div>
									</div> -->
									<el-form-item label='新密码' prop="password"><!-- 新密码 -->
										<el-input type="password" v-model="userData.password" auto-complete="off" placeholder='请输入8-20位数字与字母组合登录密码'></el-input>
									</el-form-item>
									<el-form-item :label='$t("forgetpwd.titleThree[2]")' prop="password_confirmation"><!-- 确认密码 -->
										<el-input type="password" v-model="userData.password_confirmation" auto-complete="off" placeholder='请输入确认密码'></el-input>
									</el-form-item>
									<el-form-item class="int-code">
										请输入{{ $public.phoneEncryption(userData.account) }}收到的验证码
									</el-form-item>
									<!-- 验证码 -->
									<el-form-item label='验证码' prop="code">
										<el-input v-model="userData.code" auto-complete="off" placeholder='请输入验证码'></el-input>
									</el-form-item>
									<div class="primary_btn">
										<el-button type="primary" @click="submitPwd()" :loading="loading">确认</el-button>
									</div>
									<div class="again_code">
										<span class="gray">没有收到？</span><el-button type="text" @click="getCode" :value='btnCode.time' :disabled='btnCode.disabled'>重新获取验证码</el-button>
									</div>
								</el-form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Verify from 'vue2-verify'
	
	export default {
		data() {
			var _this = this;
			var validatormobile = (rule, value, callback) => {
				if(_this.$public.checkMobile(value) || _this.$public.email(value)) {
					callback();
				} else {
					return callback(new Error(this.$t("Verification.phone[3]")));//请输入有效账号
				}

			};
			var validatorcode = (rule, value, callback) => {
				if(!value) {
					return callback(new Error("请输入验证码"));//请输入验证码
				} else {
					callback();
				}
				// if(!_this.$public.code(_this.userData.code)) {
				// 	return callback(new Error(this.$t("Verification.Code[1]")));//验证码格式有误
				// } else {
				// 	callback();
				// }
			};
			var validatoropwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error("请输入8-20位数字与字母组合登录密码"));//请输入8-20位数字与字母组合登录密码
				} else {
					callback();
				}
			};
			var validatoropwd1 = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error("请输入8-20位数字与字母组合登录密码"));//请输入8-20位数字与字母组合登录密码
				} else if(value !== this.userData.password) {
					callback(new Error(this.$t("Verification.Password[2]")));//两次输入密码不一致
				} else {
					callback();
				}
			};
			return {
				labelPosition: 'top', //插件自带
				verifyCode:'', //图片验证码
				verify:'',
				userData: {
					account: '', //手机号
					code: '', //短信验证码
					password: '', //密码1
					password_confirmation: '' //密码2
				},
				rules2: {
					account: [{
						validator: validatormobile,
						trigger: 'blur'
					}],
					code: [{
						validator: validatorcode,
						trigger: 'blur'
					}],
					password: [{
						validator: validatoropwd,
						trigger: 'blur'
					}],
					password_confirmation: [{
						validator: validatoropwd1,
						trigger: 'blur'
					}]
				},
				btnCode: {
					time: '获取验证码', //倒计时
					disabled: false
                },
				loading: false, //防止表单重复提交标志位
				whitchShow: 1, //哪一步显示
				langchange: 'cn',
				unlock: null, //是否完成滑动解锁操作
				isDisplay: 'display:none', //控制弹框出现和消失
				auto_code: '', //图片验证码
			}
		},
		methods: {
			//切换图片验证码
			change_code() {
				var _this = this;
				_this.auto_code = _this.$http.auth_code + '?' + _this.nums++;
			},
			//解锁完毕后执行函数
			valdationed() {
				var _this = this;
				_this.unlock = 1; //滑动解锁完毕
				_this.isDisplay = 'display:block';

			},
			successVer() {
				$('.verify-move-block').html('<i class="el-icon-check" style="color: #FFFFFF;"></i>')
				$('.verify-msg').html(this.$t("Verification.type[3]"));//验证成功
				$('.verify-msg').css('color', '#333');
				this.valdationed();
			},
			// 账号验证
			submitmobile() {
				if(!this.$public.checkMobile(this.userData.account) && !this.$public.email(this.userData.account)) {
					this.$public.msg("请输入有效的账号", 'warning', this); 
					return
				} else {
					this.whitchShow = 2;
					this.getCode();
				}
			},
			submitPwd() {
				var _this = this;
				_this.$refs['userData'].validate((valid) => {
					if(valid) {
						_this.loading = true;
						_this.userData.password=_this.$md5(_this.userData.password);
						_this.userData.password_confirmation=_this.$md5(_this.userData.password_confirmation);
						_this.$http.post(_this.$http.forgetPassword, _this.userData).then(function(response) {
							_this.loading = false;
							if(response.data.status == "200") {
								sessionStorage.clear();
								_this.$public.msg(response.data.msg, 'success', _this);
								_this.loading = false;
								_this.$router.push("/login");
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
								_this.userData = {
									account: '',
									code: '',
									password: '',
									password_confirmation: ''
								}
							}
						}).catch(function(error) {});
					} else {
						return
					}
				})
				
			},
			// 获取验证码执行函数
			getCode() {
				var _this = this;
				
                // if(!_this.regData.area_code){
                //     return _this.$public.msg("请先选择区号", 'warning', _this);
                // }
                if (_this.$public.checkMobile(_this.userData.account)) {
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.sendSms, {
						phone: _this.userData.account
					}).then(function(response) {
						if(response.data.code == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.account //手机号保存
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function(error) {});
				} else {
					_this.btnCode.disabled = true;
					_this.$http.post(_this.$http.send_email, {
						email: _this.userData.account,
					}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.setTime(_this); //倒计时函数封装
							_this.phone = _this.userData.account //手机号保存
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.btnCode.disabled = false;
						}
					}).catch(function(error) {});
				}
			},
		},
		components: {
		    "Verify": Verify,
		},
		mounted:function(){
			if(!this.$cookies.get('changeBg')||this.$cookies.get('changeBg')=='night') {
				$('#main').removeClass('mainb');
				$('#main').addClass('mainy');
			} else {
				$('#main').removeClass('mainy');
				$('#main').addClass('mainb');
			}
			// this.$public.codeImg('v_container');
			// this.verifyCode = new GVerify("v_container");
			if(this.$t('login.verify[0]') == 'ch') {
				this.langchange = 'ch';
//				$('.verify-msg').html('ch');
			} else {
//				$('.verify-msg').html('en');
				this.langchange = 'en';
			}
			this.btnCode.time = this.$t("changetpwd.list[4]"); //倒计时
		},
	}
</script>

<style scoped>
	.el-message-box {
		width: 800px !important;
	}
	
	.imgCode {
		overflow: hidden;
	}
	
	.inp_warp {
		float: left;
		width: 55%;
		margin-right: 2%;
	}
	
	.img_warp {
		float: left;
		width: 40%;
		margin-top: 22px;
	}
</style>