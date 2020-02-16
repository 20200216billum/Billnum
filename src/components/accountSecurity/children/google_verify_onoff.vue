<style lang=less>
		@import '../../../assets/public.less';
		@import './change_pwd.less';
	</style>
	<template>
		<div class="change_opwd_main">
			<div class="change_opwd_main_title">
				<!-- 开启 -->
				<!-- 谷歌验证 -->
				<!-- 关闭 -->
				<h2 class="title" style="font-size: 24px;">{{googleverifyonoff.key=='start'? $t('Gic.securitygoogleVerifyOnoff[0]'):$t('Gic.securitygoogleVerifyOnoff[1]')}}{{$t('Gic.securitygoogleVerifyOnoff[2]')}}</h2>
			</div>
			<div class="form_warp">
				<div class="form_cont">
					<el-form :label-position="labelPosition" ref="googleverifyonoffForm" :model="googleverifyonoff" :rules="googleverifyonRules" label-width="120px" class="demo-ruleForm">
						<!-- 谷歌验证码 -->
						<el-form-item :label="$t('Gic.securitygoogleVerifyOnoff[3]')" prop="google_code">
							<!-- 请输入6位数谷歌验证码 -->
							<el-input type="text" v-model="googleverifyonoff.google_code" auto-complete="off" :placeholder="$t('Gic.securitygoogleVerifyOnoff[4]')"></el-input>
						</el-form-item>
						<!-- 资金密码 -->
						<el-form-item :label="$t('Gic.securitygoogleVerifyOnoff[5]')" prop="payment_password">
							<!-- 请输入资金密码 -->
							<el-input type="password" v-model="googleverifyonoff.payment_password" auto-complete="off" :placeholder="$t('Gic.securitygoogleVerifyOnoff[6]')"></el-input>
						</el-form-item>
						<el-form-item class="twobtn">
							<!-- 确定 -->
							<el-button type="primary" @click="submit" :loading="loading">{{$t('Gic.securitygoogleVerifyOnoff[7]')}}</el-button>
							<!-- 取消 -->
							<el-button class="cancle" @click="$router.back()">{{$t('Gic.securitygoogleVerifyOnoff[8]')}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</template>
	
	<script>
		export default {
			data() {
				let google_code = (rule, value, callback) => {
					if (!this.$public.code(value)) {
						callback(new Error(this.$t('Gic.securitygoogleVerifyOnoff[9]')))// 请输入6位纯数字
					} else {
						callback()
					}
				}
				let payment_password = (rule, value, callback) => {
					if (!this.$public.pwd(value)) {
						callback(new Error(this.$t('Gic.securityChangeopwd[3]')))// 请输入8-20位数字+字母组合资金密码
					} else {
						callback()
					}
				}
				return {
					googleverifyonoff:{
						google_code:'',
						payment_password:'',
						key: 'start' //开启：start 关闭：stop
					},
					googleverifyonRules: {
						google_code: [{
							validator: google_code,
							trigger: 'blur'
						}],
						payment_password: [{
							validator: payment_password,
							trigger: 'blur'
						}]
					},
					labelPosition: 'top', //插件自带
					loading: false, //防止表单重复提交标志	
				};
			},
			methods: {
				submit(){
					this.$refs.googleverifyonoffForm.validate(valid => {
						if (valid) {
							this.loading = true
							this.googleverifyonoff.payment_password = this.$public.$md5(this.googleverifyonoff.payment_password)
							this.$http.post(this.$http.googleVerifyStart, this.googleverifyonoff).then( (res) => {
								if (res.data.code == "200") {
									// 操作成功！
									this.$public.msg(this.$t('Gic.securityChangeopwd[9]'), 'success', this)
									this.$router.back();
								} else {
									this.$public.msg(res.data.msg, 'warning', this);
									this.googleverifyonoff.google_code = ''
									this.googleverifyonoff.payment_password = ''
								}
								this.loading = false
							}).catch( (error) => {
								this.loading = false
								this.googleverifyonoff.google_code = ''
								this.googleverifyonoff.payment_password = ''
							});
						}
					})
				},
	
			},
			mounted:function(){
			},
			created: function() {
				this.googleverifyonoff.key = this.$route.query.type
			}
		}
	</script>
	
	<style>
	
	</style>