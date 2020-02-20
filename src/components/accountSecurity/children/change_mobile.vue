<style lang="less" scoped>
	@import '../../../assets/public.less';
	@import '../security.less';
	@import './change_pwd.less';
	@import './change_email.less';
	.phone-area {
		position: relative;
		.el-select {
			position: absolute;
			top: 0;
			left: 0;
			width: 90px;
			z-index: 9;
			/deep/.el-input__inner {
				border-right: 0;
				border-radius: 4px 0 0 4px;
			}
		}
		/deep/.mobile .el-input__inner {
			padding-left: 100px;
		}
	}
	.change_opwd_main.comEmail .form_warp .binding_email_code .btn_code {
		margin-top: 33px;
		/deep/.el-input__inner {
			background: @main;
			color: #fff;
			border: 0;
			&[disabled="disabled"] {
				background: @common-color2;
			}
		}
	}
</style>
<template>
	<div class="change_opwd_main comEmail">
		<div class="change_opwd_main_title">
			<h2 class="title" style="font-size: 24px;">绑定手机<span style="font-size: 14px;color: #999999;margin-left: 20px;">{{$t('Gic.securityChangeopwd[1]')}}</span></h2>
		</div>
		<div class="form_warp tpwd">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item :label='$t("changemobile.list[2]")' prop="phone" class="phone-area">
						<el-select v-model="userData.area_code" :placeholder="$t('regLA[4]')" filterable>
                            <el-option v-for="item in options" :key="item.id" :label="'+' + item.phone_code" :value="item.phone_code"></el-option>
                        </el-select>
						<el-input type="text" v-model="userData.phone" auto-complete="off" placeholder="请输入手机号码" class="mobile"></el-input>
					</el-form-item>
					<div class="binding_email_code">
						<el-form-item label='验证码' prop="code">
							<el-input v-model.number="userData.code" auto-complete="off" placeholder="请输入验证码"></el-input>
						</el-form-item>
						<div class="btn_code" @click="getCode()">
							<el-input type="button" class="email_code_button" :value='btnCode.time' :disabled='btnCode.disabled'></el-input>
						</div>
					</div>

					<el-form-item>
						<el-button class="largeBtn" type="primary" @click="submitForm('userData')" :loading="loading">提交</el-button>
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
					return callback(new Error(this.$t("changemobile.codetips[0]")));//验证码格式有误
				} else {
					callback();
				}
			};
			var validatemobile = (rule, value, callback) => {
				if(!_this.$public.checkMobile(value)) {
					callback(new Error(this.$t("changemobile.codetips[1]")));//请输入有效的手机号
				} else {
					callback();
				}
			};

			return {
				userData: {
					code: '',
					phone: '',
					area_code: "86"
				},
				options: [],
				btnCode: {
					time: '获取验证码',
					disabled: false
				},
				rules2: {
					code: [{
						validator: code,
						trigger: 'blur'
					}],
					phone: [{
						validator: validatemobile,
						trigger: 'blur'
					}],
				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志
				isshow:true,				
			};
		},
		methods: {
			// 获取区号
            obtainAreaCode() {
                this.$http.get(this.$http.get_area, {params: {}}).then(res => {
                    if (res.data.code == "200") {
                        this.options = res.data.data;
                    }
                })
            },
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.loading = true; //防止表单重复提交标志
						_this.$http.post(_this.$http.binding_mobile,_this.userData).then(function(response) {
							if(response.data.code == "200") {
								_this.$public.msg(response.data.msg+_this.$t("changemobile.submitForm"), 'success', _this);
								setTimeout(function() {
									_this.$router.go(-1); //返回上一层
								}, 10)							
							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
								_this.userData.code = '';
							}
							_this.loading = false; //防止表单重复提交标志
							
						}).catch(function(error) {});
						
						
					} else {
						return false
					}
				});
			},
			//获取验证码
			getCode() {
				var _this = this;
				if(_this.userData.phone == sessionStorage.mobile){
					_this.$public.msg(_this.$t("changemobile.getCode[0]"), 'warning', _this);// 更换的手机号不能和原手机号一样
					return false;					
				}else if(!_this.$public.checkMobile(_this.userData.phone)) {
					_this.$public.msg(_this.$t("changemobile.getCode[1]"), 'warning', _this); // 请输入有效的手机号
					return false;
				}
				_this.btnCode.disabled = true;				
				//请求接口 成功后执行此函数				
				_this.$http.post(_this.$http.send_sms, {
					phone: _this.userData.phone,
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
			this.obtainAreaCode();
			this.isshow=this.$cookies.get('mobiles')?true:false
			this.$public.scrollTop(); //返回但最顶部函数
		}
	}
</script>