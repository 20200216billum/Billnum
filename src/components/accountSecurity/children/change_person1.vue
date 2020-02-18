<style lang="less" scoped>
	@import '../security.less';
	@import './change_email.less';
	@import './change_person1.less';
</style>
<template>
	<div class="change_opwd_main comEmail change_person1">
		<div class="change_opwd_main_title">
			<!-- 初级认证 -->
			<!-- 请务必填写您本人的真实姓名与证件信息 -->
			<h2 class="title">{{$t('Gic.securityChangePerson1[0]')}}<span>{{$t('Gic.securityChangePerson1[1]')}}</span></h2>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" :rules="rules2" ref="userData" label-width="120px" class="demo-ruleForm">
					<!-- 用户姓名 -->
					<el-form-item :label="$t('Gic.securityChangePerson1[2]')" prop="name">
						<el-input type="text" v-model="userData.name" auto-complete="off" :placeholder='$t("Gic.securityChangePerson1[3]")'></el-input>
					</el-form-item>
					<!-- 身份证号 -->
					<el-form-item :label='$t("Gic.securityChangePerson1[4]")' prop="card_id">
						<el-input type="text" v-model="userData.card_id" auto-complete="off" :placeholder='$t("Gic.securityChangePerson1[5]")'></el-input>
					</el-form-item>

					<el-form-item>
						<el-button class="largeBtn" type="primary" @click="submitForm()" :loading="loading">{{$t('Gic.securityChangeopwd[7]')}}</el-button>
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
			var validaterealname = (rule, value, callback) => {
				// if(!/^[\u4E00-\u9FA5]{1,}$/.test(value)) {
				// 	// 真实姓名必须是中文字符
				// 	callback(new Error(this.$t("Gic.securityChangePerson1[6]")));
				// } else if (value.length < 2) {
				// 	// 真实姓名不能少于2个字符
				// 	callback(new Error(this.$t("Gic.securityChangePerson1[7]")));
				// } else {
				// 	callback();
				// }
				if(!value) {
					// 真实姓名不能为空
					callback(new Error(this.$t("Gic.securityChangePerson1[9]")));
				} else {
					callback();
				}
			};
			var validatecard = (rule, value, callback) => {
				if(!value) {
					callback(new Error(this.$t("Gic.securityChangePerson1[10]")));
				} else {
					callback();
				}
			};
			return {
				userData: {
					type: 1,
					name: '', 
					card_id: '' 
				},
				rules2: {
					name: [
						{ validator: validaterealname, trigger: 'blur' }
					],
					card_id: [
						{ validator: validatecard, trigger: 'blur' }
					],
				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志				
			};
		},
		methods: {
			//注册执行函数
			submitForm() {
				var _this = this;
				_this.$refs.userData.validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.primaryCertification, _this.userData).then(function(response) {
							_this.loading = false; //防止表单重复提交标志
							if(response.data.code == "200") {
								_this.$public.msg(_this.$t('Gic.securityChangeopwd[9]'), 'success', _this);
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
		},
		created: function() {
			var _this = this;
			// _this.userData.mobile = sessionStorage.mobile;
			_this.$public.scrollTop(); //返回但最顶部函数
		}
	}
</script>
