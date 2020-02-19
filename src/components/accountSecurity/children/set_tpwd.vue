<style lang="less" scoped>
	@import './change_pwd.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" style="font-size: 24px;">{{ $route.query.type == "set" ? "设置资金密码" : "修改资金密码" }}<span style="font-size: 14px;color: #999999;margin-left: 20px;">提币使用，请先设置资金密码</span></h2>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" :rules="setTpwdFormRules" ref="setTpwdForm" label-width="100px" class="demo-ruleForm">
					<!-- 资金密码 -->
					<el-form-item :label="$t('Gic.securitySetTpwd[2]')" prop="password">
						<el-input type="password" v-model="userData.password" :placeholder="$t('Gic.securityChangeopwd[3]')" auto-complete="off"></el-input>
					</el-form-item>
					<!-- 确认密码 -->
					<el-form-item label="确认密码" prop="password_confirmation">
						<el-input type="password" v-model="userData.password_confirmation" placeholder="请再次输入资金密码"  auto-complete="off"></el-input>
					</el-form-item>
					<!-- 邮箱地址 -->
					<!-- <el-form-item :label="$t('Gic.securitySetTpwd[4]')">
						<el-input disabled type="text" v-model="userData.email" auto-complete="off"></el-input>
					</el-form-item> -->
					<div class="tips">
						<p class="name">我们将向如下账号发送一组验证码</p>
						<p>{{ userData.email }}</p>
					</div>
					<!-- 获取验证码 -->
					<div class="code_warp">
						<el-form-item label="验证码" prop="code">
							<el-input v-model.number="userData.code" :placeholder="$t('Gic.securitySetTpwd[6]')" auto-complete="off"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" :value='$public.integerDecimal(btnCode.time) ? btnCode.time +" s" : btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>
					<el-form-item>
						<!-- 提交 -->
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">{{$t('Gic.securityChangeopwd[7]')}}</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let code = (rule, value, callback) => {
				if(!this.$public.code(value)) {
					return callback(new Error(this.$t("Gic.securitySetTpwd[7]")));//验证码格式有误
				} else {
					callback();
				}
			};
			let password = (rule, value, callback) => {
				if(!this.$public.pwd(value)) {
					callback(new Error(this.$t("Gic.securityChangeopwd[3]")));//请输入8-20位数字+字母组合资金密码
				} else {
					callback();
				}
			};
			let password_confirmation = (rule, value, callback) => {
				if(value === '') {
					callback(new Error(this.$t("Gic.securitySetTpwd[8]")));//请再次输入密码
				} else if(value !== this.userData.password) {
					callback(new Error(this.$t("Gic.securitySetTpwd[9]")));//两次输入密码不一致!
				} else {
					callback();
				}
			};
			return {
				userData: {
					code: '', //验证码
					password: '', //资金密码
					password_confirmation: '', //确认资金密码
					// email: '', //手机号
				},
				setTpwdFormRules: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					password: [{
						validator: password,
						trigger: 'blur'
					}],
					password_confirmation: [{
						validator: password_confirmation,
						trigger: 'blur'
					}]

				},
				btnCode: {
					time: this.$t("changetpwd.list[4]"), //倒计时
					disabled: false
				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志			
			};
		},
		methods: {
			submitForm() {
				var _this = this;
				_this.$refs.setTpwdForm.validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.userData.password = _this.$public.$md5(_this.userData.password);
						_this.userData.password_confirmation = _this.$public.$md5(_this.userData.password_confirmation);
						if(_this.userData.password!=_this.userData.password_confirmation){
							_this.$public.msg(_this.$t('header.tips[0]'), 'warning', _this);
							return false;
						}

						let url = "";
						if (this.$route.query.type == "set") { // 设置资金密码
							url = _this.$http.createPaymentPassword
						} else { // 修改资金密码
							url = _this.$http.resetPaymentPassword;
						}

						_this.$http.post(url, _this.userData).then(function(response) {
							_this.loading = false; //防止表单重复提交标志
							if(response.data.code == "200") {
								// 操作成功！
								_this.$public.msg(_this.$t('Gic.securityChangeopwd[9]'), 'success', _this)
								// sessionStorage.setItem('tpwd', _this.userData.password);
								setTimeout(function() {
									_this.$router.back(); //返回上一层
								}, 800)
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
								_this.userData.code=''; //验证码
								_this.userData.password=''; //资金密码
								_this.userData.password_confirmation=''; //确认资金密码
							}
						}).catch(function(error) {
							_this.loading = false; //防止表单重复提交标志
							_this.userData.code=''; //验证码
							_this.userData.password=''; //资金密码
							_this.userData.password_confirmation=''; //确认资金密码
						});
					} else {
						return false
					}
				});
			},
			getCode() {
				var _this = this;
				var email = sessionStorage.userData;
				if(!_this.$public.pwd(_this.userData.password_confirmation)) {
					_this.$public.msg(_this.$t('Gic.securitySetTpwd[10]'), 'warning', _this);//请输入有效的密码
					return false;
				}
				_this.btnCode.disabled = true;
				if(_this.$public.email(email)){//邮箱登录
					_this.$http.post(_this.$http.send_email, {
						email: email
					}).then(function(response) {
						if(response.data.code == "200") {
							// _this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				} else {
					this.$http.post(this.$http.send_sms, {
						phone: email
					}).then(res => {
						if (res.data.code == 200) {
							this.$public.setTime(this)
						} else {
							this.btnCode.disabled = false;
							this.$public.msg(res.data.msg, 'warning', this);
						}
					}).catch(err => {})
				}
			},
			go_back() {
				this.$router.back() //返回上一层
			}

		},
		created() {
			this.userData.email = this.$public.phoneEncryption(sessionStorage.userData);
			this.$public.scrollTop(); //返回但最顶部函数
		}

	}
</script>