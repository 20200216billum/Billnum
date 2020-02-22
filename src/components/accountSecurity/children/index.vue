<style lang="less" scoped>
	@import './index.less';
	.guge_code {
		.btn_code {
			position: absolute;
			right: 0;
			top: 0;
			/deep/.el-input {
				.el-input__inner {
					color: @main;
				}
			}
		}
	}
</style>
<template>
	<div class="security_main" style="overflow:hidden;">
		<div class="contain">
			<p class="tip">请不要透露短信给任何人，包括平台客服</p>
			<ul class="container" style="overflow:hidden;">
				<li>
					<!-- 登录密码 -->
					<span class="left">{{ $LangFn("登录密码") }}</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.config.security_level > 1">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 安全级别 -->
					<span class="describe">
						{{ $LangFn("安全级别") }}
						<span class="securityLevel">
							<span :class="{active: userData.config && userData.config.security_level == 1}">低</span>
							<span :class="{active: userData.config && userData.config.security_level == 2}">中</span>
							<span :class="{active: userData.config && userData.config.security_level == 3}">高</span>
						</span>
					</span>
					<!-- <span class="result">{{userData_security_level_text}}</span> -->
					
					<!-- 修改 -->
					<span class="operation" @click="routerGo('/security/index/changeopwd')">{{ $LangFn("修改") }}</span>
				</li>
				<!-- 手机验证 -->
				<li>
					<span class="left">手机验证</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.phone">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 提现，修改密码，及安全设置时使用以收取验证短信 -->
					<span class="describe">提现，修改密码，及安全设置时使用以收取验证短信</span>
					<span class="result">{{ userData.phone ? $public.phoneEncryption(userData.phone) : "--" }}</span>
					<span class="operation" v-if="userData.config && !userData.phone" @click="routerGo('/security/index/change_mobile')">设置</span>
				</li>
				<!-- 资金密码 -->
				<li>
					<span class="left">{{ $LangFn("资金密码") }}</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.config.payment_password_set!=0">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 交易，提现时使用设置资金密码前请先绑定手机或邮箱 -->
					<span class="describe">{{$t('Gic.securityIndex[5]')}}</span>
					<!-- 设置 -->
					<span class="operation" v-if="userData.config && userData.config.payment_password_set==0" @click="routerGo('/security/index/set_tpwd', 'set')">{{$t('Gic.securityIndex[6]')}}</span>
					<!-- 修改 -->
					<span class="operation" v-else @click="routerGo('/security/index/set_tpwd', 'noset')">{{$t('Gic.securityIndex[7]')}}</span>
				</li>
				<!-- 邮箱验证 -->
				<li>
					<span class="left">邮箱验证</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.email">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 邮箱用于登录、提币及安全设置时使用，激活后不可修改 -->
					<span class="describe">{{$t('Gic.securityIndex[9]')}}</span>
					<span class="result">{{ userData.email ? $public.phoneEncryption(userData.email) : "--"}}</span>
					<span class="operation" v-if="userData.config && !userData.email" @click="routerGo('/security/index/change_email')">设置</span>
				</li>
				<!-- 谷歌验证 -->
				<li>
					<span class="left">{{ $LangFn("谷歌验证") }}</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.google_verify==1">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 登录，提现，修改密码及安全设置时用以输入谷歌验证码。 详细信息阅读交易指南； 下载：Andriod/ios -->
					<span class="describe">登录，提现，修改密码及安全设置时用以输入谷歌验证码。 详细信息阅读交易指南； 下载：Andriod/ios</span>
					<!-- 未绑定 -->
					<span class="operation" v-if="userData.config && userData.config.google_bind==0" @click="routerGo('/security/index/googleverify')">{{$t('Gic.securityIndex[12]')}}</span>
					<!-- 开启 -->
					<span class="operation" v-else-if="userData.config && userData.config.google_bind==1 && userData.config.google_verify==0" @click="showGuge('start')">{{$t('Gic.securityIndex[13]')}}</span>
					<!-- 关闭 -->
					<span class="operation" v-else-if="userData.config && userData.config.google_bind==1 && userData.config.google_verify==1" @click="showGuge('stop')">{{$t('Gic.securityIndex[14]')}}</span>
				</li>
			</ul>
		</div>
		<!-- 个人设置 -->
		<div class="personal_settings">
			<p class="title">个人设置</p>
			<div class="set_item">
				<span class="name">折算货币</span>
				<span class="info">设置后，在资产、最新价、买入价、卖出价等字段，会同时折合为当前折算货币展示</span>
				<span class="coin">{{ userData.zcode }}</span>
				<span class="button" @click="converted">设置</span>
			</div>
		</div>
		<!-- 登录记录 -->
		<div class="personal_settings login_record">
			<p class="title">登录记录</p>
			<el-table :data="tableData" empty-text="暂无数据" class="login_table">
				<el-table-column prop="created_at" label="登录时间" min-width="150"></el-table-column>
				<el-table-column prop="log_ip" label="登录IP" min-width="150"></el-table-column>
				<el-table-column prop="area" label="登录地区" min-width="150"></el-table-column>
				<el-table-column prop="agent_info" label="登录设备" min-width="150"></el-table-column>
			</el-table>
		</div>
		<!-- 设置折算货币 -->
		<el-dialog
			title="设置折算货币"
			:visible.sync="modal1"
			width="490px"
			custom-class="custom-dialog"
		> 
			<el-form ref="conversionForm" :model="conversionForm" label-width="150px" :rules="rules" label-position="top">
				<el-form-item label="选择折算货币" prop="code" class="zhesuan_form">
					<el-input v-model="conversionForm.code" readonly></el-input>
					<el-select v-model="conversionForm.code" :placeholder="$LangFn('请选择')">
						<el-option v-for="(item, index) in conversionArr" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="modal1 = false">取消</el-button>
				<el-button type="primary" @click="settingConver">确定</el-button>
			</span>
		</el-dialog>
		<!-- 开启/关闭谷歌验证 -->
		<el-dialog
			:title="changeGugeTile"
			:visible.sync="modal2"
			width="490px"
			custom-class="custom-dialog"
		> 
			<el-form ref="gugeForm" :model="gugeForm" label-width="150px" :rules="rules2" label-position="top">
				<el-form-item label="谷歌验证码" prop="google_code">
					<el-input v-model="gugeForm.google_code" placeholder="请输入6位数谷歌验证码"></el-input>
				</el-form-item>
				<el-form-item label="验证码" class="guge_code" prop="code">
					<el-input auto-complete="off" placeholder="请输入验证码" v-model="gugeForm.code"></el-input>
					<div class="btn_code" @click="getCode()">
						<el-input type="button" :value='$public.integerDecimal(btnCode.time) ? btnCode.time +" s" : btnCode.time' :disabled='btnCode.disabled' ></el-input>
					</div>
				</el-form-item>
				<!-- <el-form-item label="验证码" prop="code">
					<el-input v-model="gugeForm.code" placeholder="请输入验证码"></el-input>
				</el-form-item> -->
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="modal2 = false">取消</el-button>
				<el-button type="primary" @click="settingGuge">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			var validateZhesuan = (rule, value, callback) => {
				if (!value) {
					callback(new Error('设置折算货币'));
				} else {
					callback();
				}
			};
			var validateGugeCode = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入6位数谷歌验证码'));
				} else {
					callback();
				}
			};
			var validateCode = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入验证码'));
				} else {
					callback();
				}
			};
			let validatePwd = (rule, value, callback) => {
				if(!this.$public.pwd(value)) {
					callback(new Error(this.$t("Gic.securityChangeopwd[3]")));//请输入8-20位数字+字母组合资金密码
				} else {
					callback();
				}
			};
	  
			return {
				userData:{},
				modal1: false,
				conversionForm: {
					code: ""
				},
				rules: {
					code: [
						{ validator: validateZhesuan, trigger: "blur" }
					]
				},
				conversionArr: [],
				tableData: [],
				modal2: false,
				changeGugeTile: "",
				gugeForm: {
					key: "",
					google_code: "",
					code: ""
				},
				rules2: {
					google_code: [
						{ validator: validateGugeCode, trigger: "blur" }
					],
					code: [
						{ validator: validateCode, trigger: "blur" }
					]
				},
				btnCode: {
					time: this.$t("changetpwd.list[4]"), //倒计时
					disabled: false
				},
			}
		},
		methods: {
			routerGo(path,params){
				if(params){
					this.$router.push({
						path: path,
						query: {
							type: params
						}
					})
				} else{
					this.$router.push({
						path: path
					})
				}
			},
			//获取个人信息
			getUserInfo(){
				this.$http.get(this.$http.user_info,{params:{}}).then((res) => {
					if(res.data.code == '200') {
						sessionStorage.userInfo = JSON.stringify(res.data.data);
						this.userData = res.data.data;
					}
				})
			},
			// 获取折算货币列表
			getMcodeList() {
				this.$http.get(this.$http.mcode_list, {params:{}}).then(res => {
					if (res.data.code == 200) {
						this.conversionArr = res.data.data;
					}
				})
			},
			// 折算货币
			converted() {
				this.conversionForm.code = "";
				this.modal1 = true;
			},
			// 设置折算货币
			settingConver() {
				this.$refs.conversionForm.validate(valid => {
					if (valid) {
						this.$http.get(this.$http.mcode_list, {params:this.conversionForm}).then(res => {
							if (res.data.code == 200) {
								this.modal1 = false;
								this.$public.msg(this.$LangFn("设置成功"), "warning", this);
								this.getUserInfo();
							} else {
								this.$public.msg(res.data.msg, "warning", this);
							}
						}).catch(err => {})
					}
				})
			},
			//获取验证码
			getCode() {
				var _this = this;
				var email = sessionStorage.userData;
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
					}).catch(function(error) {
						_this.btnCode.disabled = false;
					});
				} else {
					_this.$http.post(_this.$http.sendSms, {
						phone: email
					}).then(function(response) {
						if(response.data.code == "200") {
							// _this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {
						_this.btnCode.disabled = false;
					});
				}
			},
			// 开启/关闭谷歌验证
			showGuge(key) {
				this.gugeForm.key = key;
				this.gugeForm.google_code = "";
				this.gugeForm.code = "";
				if (key == "start") {
					this.changeGugeTile = "开启谷歌验证";
				} else {
					this.changeGugeTile = "关闭谷歌验证";
				}
				this.modal2 = true;
			},
			settingGuge() {
				this.$refs.gugeForm.validate(valid => {
					if (valid) {
						this.$http.post(this.$http.googleVerifyStart, this.gugeForm).then(res => {
							if (res.data.code == 200) {
								this.$public.msg("设置成功", "success", this);
								this.getUserInfo();
							} else {
								this.$public.msg(res.data.msg, "warning", this);
							}
							this.modal2 = false;
						}).catch(err => {
							this.modal2 = false;
						})
					}
				})
			},
			// 获取登录日志
			loginRecord() {
				this.$http.get(this.$http.login_record, {params: {}}).then(res => {
					if (res.data.code == 200) {
						this.tableData = res.data.data.data;
					} else {
						this.tableData = [];
					}
				}).catch(err => {})
			}
		},
		mounted() {
			this.getUserInfo();
			this.getMcodeList();
			this.loginRecord();
		},
	};
</script>