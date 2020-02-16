<style lang=less>
	@import '../../assets/public.less';
	@import './isApply.less';
</style>
<template>
	<div class="change_opwd_main">
		<div class="change_opwd_main_title">
			<h2 class="title" @click="go_back">经济人申请</h2>

		</div>

		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item label="机构名" prop="account">
						<el-input type="text" v-model="userData.account" auto-complete="off" disabled></el-input>
					</el-form-item>
					<!--<el-form-item label="姓名" prop="name">
						<el-input type="text" v-model="userData.name" auto-complete="off" disabled></el-input>
					</el-form-item>-->

					<div class="code_warp">
						<el-form-item label="短信验证码" prop="code">
							<el-input v-model.number="userData.code" auto-complete="off"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>
					<el-form-item>
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">确定</el-button>
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
					return callback(new Error('验证码格式有误'));
				} else {
					callback();
				}
			};
			var validatetpwd = (rule, value, callback) => {
				if(!value) {
					callback(new Error('请输入有效的机构号'));
				} else {
					callback();
				}
			};
			var validatetpwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('姓名不能为空'));
				} else {
					callback();
				}
			};
			return {
				userData: {
					code: '', //验证码
					account: '', //资金密码
//					name: '', //确认资金密码
					mobile: '' //手机号

				},
				btnCode: {
					time: '获取验证码', //倒计时
					disabled: false
				},
				rules2: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					account: [{
						validator: validatetpwd,
						trigger: 'blur'
					}],
//					name: [{
//						validator: validatetpwd2,
//						trigger: 'blur'
//					}]

				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志				
			};
		},
		methods: {
			//注册执行函数
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.bk_applay, _this.userData).then(function(response) {
							_this.loading = false; //防止表单重复提交标志
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								_this.$router.go(-1); //返回上一层
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
						}).catch(function(error) {});

					} else {
						return false
					}
				});
			},
			getCode() {
				var _this = this;
				//				var mobile = sessionStorage.mobile;
				//				if(!_this.$public.pwd(_this.userData.name)) {
				//					_this.$public.msg('请输入有效的密码', 'warning', _this);
				//					return false;
				//				}
				if(!_this.userData.mobile) {
					_this.$public.msg('网络延迟，请稍后在试', 'warning', _this);
					return false;
				}
				_this.btnCode.disabled = true;
				_this.$http.post(_this.$http.send_sms, {
					mobile: _this.userData.mobile,
					type: 3
				}).then(function(response) {					
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.setTime(_this); //倒计时函数封装
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
						_this.btnCode.disabled = false;
					}
				}).catch(function(error) {});

				//请求接口 成功后执行此函数				

			},
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			},
			getUserData() {
				var _this = this;
				_this.userData.mobile = sessionStorage.mobile;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.userData.name = response.data.data.name;
						_this.userData.account = response.data.data.uid;
						
						//判断有没有实名认证
//						if(response.data.data.status != 3) {
//							//表示没有实名人在
//							switch(response.data.data.status) {
//								case '1':
//									_this.$confirm('你还没有实名认证，是否前往认证？', '提示', {
//										confirmButtonText: '确定',
//										cancelButtonText: '取消',
//										type: 'warning'
//									}).then(() => {
//										_this.$public.go('/identity', 100, _this);
//									}).catch(() => {
//										_this.$router.go(-1); //返回上一层
//									});
//									break;
//								case '2':
//								 _this.$alert('您的信息正在审核中', '提示', {
//						          confirmButtonText: '确定',
//						          callback: action => {
//						           _this.$router.go(-1); //返回上一层
//						          }
//						        });
//								break;
//								case '4':
//								_this.$confirm('您的实名认证信息被拒绝，是否重新认证？', '提示', {
//										confirmButtonText: '确定',
//										cancelButtonText: '取消',
//										type: 'warning'
//									}).then(() => {
//										_this.$public.go('/identity', 100, _this);
//									}).catch(() => {
//										_this.$router.go(-1); //返回上一层
//									});
//								break;
//								
//							}
//
//						}
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			}

		},
		created: function() {
			var _this = this;
			this.getUserData();
			_this.userData.mobile = sessionStorage.mobile;
			_this.$public.scrollTop(); //返回但最顶部函数

		}

	}
</script>

<style>

</style>