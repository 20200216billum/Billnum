<style lang="less" scoped>
	@import '../../../assets/public.less';
	@import './change_pwd.less';
	/deep/.code_warp {
		.el-form-item {
			display: inline-block;
			width: 325px;
		}
		.btn_code {
			display: inline-block;
			width: 130px;
			border: none;
			border-radius: 5px;
			margin-left: 12px;
			margin-top: 34px;
			.el-input__inner{
				color: #fff;
				background: @main!important;
				border: 0;
				width: 160px;
			}
			.el-input.is-disabled {
				.el-input__inner {
					background: transparent;
					// border: 1px solid @main;
				}
			}
		}
	}
</style>
	<template>
		<div class="change_opwd_main">
			<div class="change_opwd_main_title">
				<h2 class="title" style="font-size: 24px;">{{$t('Gic.securityChangeopwd[0]')}}<span style="font-size: 14px;color: #999999;margin-left: 20px;">{{$t('Gic.securityChangeopwd[1]')}}</span></h2>
			</div>
			<div class="form_warp">
				<div class="form_cont">
					<el-form :label-position="labelPosition" ref="userPwdForm" :model="userPwd" :rules="userPwdRules" label-width="120px" class="demo-ruleForm">
						<!-- 原登录密码 -->
						<!-- <el-form-item :label="$t('Gic.securityChangeopwd[2]')" prop="old_password">
							<el-input type="password" v-model="userPwd.old_password" auto-complete="off" placeholder="请输入原登录密码"></el-input>
						</el-form-item> -->
						<!-- 新登录密码 -->
						<el-form-item :label="$t('Gic.securityChangeopwd[4]')" prop="password">
							<!-- 请输入8-20位数字+字母组合资金密码 -->
							<el-input type="password" v-model="userPwd.password" auto-complete="off" :placeholder="$t('Gic.securityChangeopwd[3]')"></el-input>
						</el-form-item>
						<!-- 确认密码 -->
						<el-form-item :label="$t('Gic.securityChangeopwd[5]')" prop="password_confirmation">
								<!-- 确认新密码 -->
								<el-input type="password" v-model="userPwd.password_confirmation" auto-complete="off" placeholder="请再次输入新登录密码"></el-input>
							</el-form-item>
						<el-form-item>
						<!-- 获取验证码 -->
						<div class="code_warp">
							<el-form-item label="验证码" prop="code">
								<el-input v-model.number="userPwd.code" :placeholder="$t('Gic.securitySetTpwd[6]')" auto-complete="off"></el-input>
							</el-form-item>
							<div class="btn_code" @click="getCode()">
								<el-input type="button" :value='$public.integerDecimal(btnCode.time) ? btnCode.time +" s" : btnCode.time' :disabled='btnCode.disabled'></el-input>
							</div>
						</div>
							<!-- 提交 -->
							<el-button type="primary" @click="submit" :loading="loading">{{$t('Gic.securityChangeopwd[7]')}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</template>
	
	<script>
		export default {
			data() {
				let passwordValue = ''
				let old_password = (rule, value, callback) => {
					if (!this.$public.pwd(value)) {
						callback(new Error(this.$t('Gic.securityChangeopwd[3]')))// 请输入8-20位数字+字母组合资金密码
					} else {
						callback()
					}
				}
				let password = (rule, value, callback) => {
					if (!this.$public.pwd(value)) {
						callback(new Error(this.$t('Gic.securityChangeopwd[3]')))// 请输入8-20位数字+字母组合资金密码
					} else {
						passwordValue = value
						callback()
					}
				}
				let password_confirmation = (rule, value, callback) => {
					if (!this.$public.pwd(value)) {
						callback(new Error(this.$t('Gic.securityChangeopwd[3]')))// 请输入8-20位数字+字母组合资金密码
					} else if(value != passwordValue){
						callback(new Error(this.$t('Gic.securityChangeopwd[8]')))	// 两次密码输入不一致！
					} else {
						callback()
					}
				}
				let code = (rule, value, callback) => {
					if(!this.$public.code(value)) {
						return callback(new Error(this.$t("Gic.securitySetTpwd[7]")));//验证码格式有误
					} else {
						callback();
					}
				};
				return {
					userData:{},
					userPwd:{
						// old_password:'',
						password:'',
						password_confirmation:'',
						code: ""
					},
					userPwdRules: {
						// old_password: [{
						// 	validator: old_password,
						// 	trigger: 'blur'
						// }],
						password: [{
							validator: password,
							trigger: 'blur'
						}],
						password_confirmation: [{
							validator: password_confirmation,
							trigger: 'blur'
						}],
						code: [{
							validator: code,
							trigger: 'blur'
						}],
					},
					btnCode: {
						time: this.$t("changetpwd.list[4]"), //倒计时
						disabled: false
					},
					labelPosition: 'top',
					loading: false, 
				};
			},
			methods: {
				//获取个人信息
				userInfo(){
					this.$http.get(this.$http.details,{params:{}}).then((res) => {
						if(res.data.code == '200') {
							// sessionStorage.userData = JSON.stringify(res.data.data);
							this.userData = res.data.data;
						}
					})
				},
				// 获取验证码
				getCode() {
					var _this = this;
					var email = sessionStorage.userData;
					if(!_this.$public.pwd(_this.userPwd.password_confirmation)) {
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
				//修改登录密码
				submit(){
					this.$refs.userPwdForm.validate(valid => {
						if (valid) {
							this.loading = true
							// this.userPwd.old_password = this.$public.$md5(this.userPwd.old_password)
							this.userPwd.password = this.$public.$md5(this.userPwd.password)
							this.userPwd.password_confirmation = this.$public.$md5(this.userPwd.password_confirmation)
							this.$http.post(this.$http.resetPassword, this.userPwd).then( (res) => {
								if (res.data.code == "200") {
									// 操作成功！
									this.$public.msg(this.$t('Gic.securityChangeopwd[9]'), 'success', this)
									// this.$router.back();
									this.$router.push("/login");
								} else {
									this.$public.msg(res.data.msg, 'warning', this);
									this.userPwd.old_password = ''
									this.userPwd.password = ''
									this.userPwd.password_confirmation = ''
								}
								this.loading = false
							}).catch( (error) => {
								this.loading = false
								this.userPwd.old_password = ''
								this.userPwd.password = ''
								this.userPwd.password_confirmation = ''
							});
						}
					})
				},
	
			},
			mounted:function(){
			},
			created: function() {
				this.userInfo()
			}
		}
	</script>