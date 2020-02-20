<style lang="less" scoped>
	@import '../../../assets/public.less';
	@import '../security.less';
	@import './change_pwd.less';
	@import './change_email.less';

	.change_opwd_main.comEmail .form_warp .btn_code {
		margin-top: 33px;
		.email_code_button {
			/deep/.el-input__inner {
				background: @main;
				color: #fff;
				border: 0;
				&[disabled="disabled"] {
					background: @common-color2;
				}
			}
		}
	}
	
</style>
<template>
	<div class="change_opwd_main comEmail">
		<div class="change_opwd_main_title">
			<!-- <h2 class="nameLeft">{{$t("changeemail.list[0]")}}</h2> -->
			<h2 class="title" style="font-size: 24px;">绑定邮箱<span style="font-size: 14px;color: #999999;margin-left: 20px;">{{$t('Gic.securityChangeopwd[1]')}}</span></h2>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" :rules="rules2" ref="userData" label-width="120px" class="demo-ruleForm">
					<el-form-item label='邮箱地址' prop="email">
						<el-input type="email" v-model="userData.email" auto-complete="off" placeholder="请输入邮箱地址"></el-input>
					</el-form-item>
					<div class="binding_email_code">
						<el-form-item :label='$t("changeemail.tip[1]")' prop="code">
							<el-input v-model.number="userData.code" auto-complete="off" :placeholder='$t("changeemail.tip[2]")'></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input class="email_code_button" type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>

					<el-form-item>
						<el-button class="largeBtn" type="primary" @click="submitForm('userData')" :loading="loading">{{$t("changeemail.list[2]")}}</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var _this = this;
			var code = (rule, value, callback) => {
				if(!_this.$public.code(value)) {
					return callback(new Error(this.$t("changeemail.tips[0]")));
				} else {
					callback();
				}
			};
			var validateemail = (rule, value, callback) => {
				if(!_this.$public.email(value)) {
					callback(new Error(this.$t("changeemail.validateemail")));//请输入有效的邮箱
				} else {
					callback();
				}
			};

			return {
				userData: {
					code: '', 
					email: '',
				},
				btnCode: {
					time: this.$t("changetpwd.list[4]"), //倒计时
					disabled: false
				},
				rules2: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					email: [{
						validator: validateemail,
						trigger: 'blur'
					}]
				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志				
			};
		},
		methods: {
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.binding_email, _this.userData).then(function(response) {
							_this.loading = false; //防止表单重复提交标志
							if(response.data.code == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								setTimeout(function() {
									_this.$router.go(-1); //返回上一层
								}, 10)
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
						}).catch(function(error) {});

					} else {
						return false
					}
				});
			},
//			//获取验证码
			getCode() {
				var _this = this;
				if(!_this.$public.email(_this.userData.email)) {
					_this.$public.msg(this.$t("changeemail.tips[2]"), 'warning', _this);
					return false;
				}
				_this.btnCode.disabled = true;
				_this.$http.post(_this.$http.send_email, {
					email: _this.userData.email,
				}).then(function(response) {
					if(response.data.code == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.setTime(_this); //倒计时函数封装
					} else {
						_this.btnCode.disabled = false;
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});		
			}
		},
		mounted() {
			this.$public.scrollTop(); //返回但最顶部函数
		}
	}
</script>
