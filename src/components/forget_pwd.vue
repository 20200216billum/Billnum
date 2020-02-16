<style lang=less >
	@import '../assets/public.less';
	@import './forget_pwd.less';
	@import './mian.less';
</style>
<template>
	<div>
		<!-- <HeaDer></HeaDer> -->
		<div id="main">
			<div class="forget_bg">
				<div class="forget_pwd_main">
					<!--手机号验证-->
					<div class="validation_mobile" v-show="whitchShow == 1">
						<div class="header_forget">
							<h2 class="welcome_reg">{{$t("forgetpwd.titleOne[0]")}}</h2><!-- 重置登录密码 -->
						</div>
						<div class="form_warp">
							<div class="content_warp">
								<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
									<el-form-item :label='$t("forgetpwd.titleOne[1]")' prop="mobile"><!-- 账号 -->
										<el-input v-model="userData.mobile" auto-complete="off"></el-input>
									</el-form-item>
									<div class="primary_btn">
										<el-button type="primary" @click="submitmobile()" :loading="loading">{{$t("forgetpwd.titleThree[3]")}}</el-button><!-- 提交 -->
									</div>
								</el-form>
							</div>
							<div class="prompt">
								<div class="warp_prompt">
									<!-- <p>重设登录密码后24小时禁止交易</p> -->
								</div>
							</div>
						</div>
					</div>
					<!--安全验证-->
					<div class="valdation_code" v-show="whitchShow == 2">
						<div class="header_forget">
							<h2 class="welcome_reg">{{$t("forgetpwd.titleOne[0]")}}</h2>
						</div>
						<div class="form_warp form_warp2">
							<div class="content_warp">
								<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
									<el-form-item :label='$t("forgetpwd.titleOne[1]")' prop="mobile"><!-- 账号 -->
										<el-input  v-model="userData.mobile" auto-complete="" :placeholder='$t("forgetpwd.titleOne[3]")'></el-input> <!-- 请输入手机号/邮箱 -->
									</el-form-item>

									
									<div class="valdation_code_warp">
										<el-form-item :label='$t("forgetpwd.titleTwo[2]")' prop="code"><!-- 短信/邮箱验证码 -->
											<el-input v-model.number="userData.code" auto-complete="off" :placeholder='$t("forgetpwd.titleTwo[4]")'></el-input> <!-- 请输入验证码 -->
										</el-form-item>
										<div class="btn_code" @click="get_code()">
											<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
										</div>
									</div>
									<el-form-item :label='$t("forgetpwd.titleThree[1]")' prop="opwd"><!-- 登录密码 -->
										<el-input type="password" v-model="userData.opwd" auto-complete="off" :placeholder='$t("forgetpwd.titleTwo[5]")'></el-input> <!-- 请输入登录密码 -->
									</el-form-item>
									<el-form-item :label='$t("forgetpwd.titleThree[2]")' prop="opwd1"><!-- 确认密码 -->
										<el-input type="password" v-model="userData.opwd1" auto-complete="off" :placeholder='$t("forgetpwd.titleTwo[6]")'></el-input> <!-- 请再次输入登录密码 -->
									</el-form-item>
									<div class="primary_btn">
										<el-button type="primary" @click="submitPwd()" :loading="loading">{{$t("forgetpwd.titleOne[2]")}}</el-button><!-- 提交 -->
									</div>
								</el-form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <FooTer></FooTer> -->
	</div>
</template>

<script>
	import Header1 from "./main/header.vue";
	import Footer1 from "./main/footer.vue";
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
				if(!_this.$public.code(_this.userData.code)) {
					return callback(new Error(this.$t("Verification.Code[1]")));//验证码格式有误
				} else {
					callback();
				}
			};
			var validatoropwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(this.$t("Verification.Password[0]")));//请输入有效的密码
				} else {
					callback();
				}
			};
			var validatoropwd1 = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(this.$t("Verification.Password[0]")));//请输入有效的密码
				} else if(value !== this.userData.opwd) {
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
					mobile: '', //手机号
					code: '', //短信验证码
					opwd: '', //密码1
					opwd1: '' //密码2
				},
				rules2: {
					mobile: [{
						validator: validatormobile,
						trigger: 'blur'
					}],
					code: [{
						validator: validatorcode,
						trigger: 'blur'
					}],
					opwd: [{
						validator: validatoropwd,
						trigger: 'blur'
					}],
					opwd1: [{
						validator: validatoropwd1,
						trigger: 'blur'
					}]
				},
				btnCode: {
					time: '获取验证码', //倒计时
					disabled: false
                },
				loading: false, //防止表单重复提交标志位
				whitchShow: 2, //哪一步显示
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
			//手机号验证提交函数
			submitmobile() {
				var _this = this;
				if(!_this.$public.checkMobile(_this.userData.mobile)) {
					_this.$public.msg(_this.$t("Verification.phone[0]"), 'warning', _this);//请输入有效的手机号
				} else {
					setTimeout(function() {
						_this.whitchShow = 2;
					}, 300)
				}
			},
			//验证码验证
			submitCode() {
				var _this = this;
				//验证验证码的正确性
				// if(!this.verifyCode.validate(this.verify)){
				// 	_this.$public.msg(_this.$t("login.submitForm[1]"), 'warning', _this);//图片验证码有误
				// 	return false;
				// }else 
				if(!_this.$public.code(_this.userData.code)) {
					_this.$public.msg(_this.$t("Verification.Code[1]"), 'warning', _this);//验证码格式有误
				} else {
					// _this.whitchShow = 3;
					_this.submitPwd();
				}
			},
			submitPwd() {
				var _this = this;
				// if(!_this.$public.pwd(_this.userData.opwd)) {
				// 	_this.$public.msg(_this.$t("Verification.Password[0]"), 'warning', _this);//密码格式有误
				// 	return false;

				// } else if(_this.userData.opwd !== _this.userData.opwd) {
				// 	_this.$public.msg(_this.$t("Verification.Password[2]"), 'warning', _this);//两次密码不一致
				// 	return false;
				// }
				_this.$refs['userData'].validate((valid) => {
					if(valid) {
						_this.loading = true;
						_this.userData.opwd=_this.$md5(_this.userData.opwd);
						_this.userData.opwd1=_this.$md5(_this.userData.opwd1);
						_this.$http.post(_this.$http.find_opwd, _this.userData).then(function(response) {
							_this.loading = false;
							if(response.data.status == "200") {
								sessionStorage.clear();
								_this.$public.msg(response.data.msg, 'success', _this);
								_this.$public.go('login', 10, _this);
								_this.loading = false;
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
								_this.userData = {
									mobile: '',
									code: '',
									opwd: '',
									opwd1: ''
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
                if(!_this.regData.area_code){
                    return _this.$public.msg("请先选择区号", 'warning', _this);
                }
                if (_this.regData.phone.indexOf('@') == -1) {
					if (!_this.$public.checkMobile(_this.regData.phone)) {
						return _this.$public.msg("手机号输入错误", 'warning', _this);
					} else {
						_this.btnCode.disabled = true;
					//获取验证码
                        _this.$http.post(_this.$http.sendSms, {
                            phone: _this.regData.phone,
                            area_code: _this.regData.area_code
                        }).then(function(response) {
                            if(response.data.code == "200") {
                                _this.$public.setTime(_this); //倒计时函数封装
                                _this.phone = _this.userData.phone //手机号保存
                            } else {
                                _this.$public.msg(response.data.msg, 'warning', _this);
                                _this.btnCode.disabled = false;
                            }
                        }).catch(function(error) {});
					}
				} else {
					if (!_this.$public.email(_this.regData.phone)) {
						return _this.$public.msg("邮箱账号输入错误", 'warning', _this);
					} else {
						_this.btnCode.disabled = true;
					    //获取验证码
                        _this.$http.post(_this.$http.send_mail, {
                            email: _this.userData.mobile,
                        }).then(function(response) {
                            if(response.data.status == "200") {
                                _this.$public.setTime(_this); //倒计时函数封装
                                _this.phone = _this.userData.mobile //手机号保存
                            } else {
                                _this.$public.msg(response.data.msg, 'warning', _this);
                                _this.btnCode.disabled = false;
                            }
                        }).catch(function(error) {});
					}
				}
            },
		components: {
			"HeaDer":Header1,
		    "FooTer":Footer1,
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
		created: function() {
			
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