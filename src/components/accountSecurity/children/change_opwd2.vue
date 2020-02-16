<style lang=less>
		@import '../../../assets/public.less';
		@import './change_pwd.less';
	</style>
	<template>
		<div class="change_opwd_main">
			<div class="change_opwd_main_title">
				<h2 class="title"> {{$t('changePwd.info[1]')}}</h2>
			</div>
			<div class="form_warp">
				<div class="form_cont">
					<el-form :label-position="labelPosition" ref="userPwdForm" :model="userPwd" :rules="userPwdRules" label-width="120px" class="demo-ruleForm">
						<!-- 原密码 -->
						<el-form-item :label="$t('changePwd.info[2]')" prop="old_password">
							<el-input type="password" v-model="userPwd.old_password" auto-complete="off" placeholder="请输入8-20位数字+字母组合资金密码"></el-input>
						</el-form-item>
						<!-- 新密码 -->
						<el-form-item :label="$t('changePwd.info[4]')" prop="password">
							<el-input type="password" v-model="userPwd.password" auto-complete="off" placeholder="请输入8-20位数字+字母组合资金密码"></el-input>
						</el-form-item>
						<!-- 重复密码 -->
						<el-form-item :label="$t('changePwd.info[6]')" prop="password_confirmation">
								<el-input type="password" v-model="userPwd.password_confirmation" auto-complete="off" placeholder="确认新密码"></el-input>
							</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit" :loading="loading">{{$t('changePwd.info[8]')}}</el-button>
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
						callback(new Error('请输入8-20位数字+字母组合资金密码'))// 请输入8-20位数字+字母组合资金密码
					} else {
						callback()
					}
				}
				let password = (rule, value, callback) => {
					if (!this.$public.pwd(value)) {
						callback(new Error('请输入8-20位数字+字母组合资金密码'))// 请输入8-20位数字+字母组合资金密码
					} else {
						passwordValue = value
						callback()
					}
				}
				let password_confirmation = (rule, value, callback) => {
					if (!this.$public.pwd(value)) {
						callback(new Error('请输入8-20位数字+字母组合资金密码'))// 请输入8-20位数字+字母组合资金密码
					} else if(value != passwordValue){
						callback(new Error('两次密码输入不一致！'))	// 两次密码输入不一致！
					} else {
						callback()
					}
				}
				return {
					userData:{},
					userPwd:{
						old_password:'',
						password:'',
						password_confirmation:''
					},
					userPwdRules: {
						old_password: [{
							validator: old_password,
							trigger: 'blur'
						}],
						password: [{
							validator: password,
							trigger: 'blur'
						}],
						password_confirmation: [{
							validator: password_confirmation,
							trigger: 'blur'
						}],
					},
					labelPosition: 'top', //插件自带
					loading: false, //防止表单重复提交标志	
				};
			},
			methods: {
				//获取个人信息
				userInfo(){
					this.$http.get(this.$http.details,{params:{}}).then(function(res) {
						if(res.data.code == '200') {
							// sessionStorage.userData = JSON.stringify(res.data.data);
							this.userData = res.data.data;
						}
					})
				},
				//修改登录密码
				submit(){
					this.$refs.userPwdForm.validate(valid => {
						if (valid) {
							this.loading = true
							this.$http.post(this.$http.resetPassword, this.userPwd).then( (res) => {
								if (res.data.code == "200") {
									this.$public.msg('操作成功！', 'success', this)
									this.$router.back();
								} else {
									this.$public.msg(res.data.msg, 'warning', this);
								}
								this.loading = false
							}).catch( (error) => {
								this.loading = false
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
	
	<style>
	
	</style>