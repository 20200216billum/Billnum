<style lang="less" scoped>
	@import './index.less';
</style>
<template>
	<div class="security_main" style="overflow:hidden;">
		<div class="contain">
			<p class="tip">请不要透露短信给任何人，包括平台客服</p>.
			<ul class="container" style="overflow:hidden;">
				<li>
					<!-- 登录密码 -->
					<span class="left">{{$t('Gic.securityIndex[1]')}}</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.config.security_level > 1">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 安全级别 -->
					<span class="describe">
						{{$t('Gic.securityIndex[2]')}}
						<span class="securityLevel">
							<span :class="{active: userData.config && userData.config.security_level == 1}">低</span>
							<span :class="{active: userData.config && userData.config.security_level == 2}">中</span>
							<span :class="{active: userData.config && userData.config.security_level == 3}">高</span>
						</span>
					</span>
					<!-- <span class="result">{{userData_security_level_text}}</span> -->
					
					<!-- 修改 -->
					<span class="operation" @click="routerGo('/security/index/changeopwd')">{{$t('Gic.securityIndex[3]')}}</span>
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
					<span class="left">{{$t('Gic.securityIndex[4]')}}</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.config.payment_password_set!=0">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 交易，提现时使用设置资金密码前请先绑定手机或邮箱 -->
					<span class="describe">{{$t('Gic.securityIndex[5]')}}</span>
					<!-- 设置 -->
					<span class="operation" v-if="userData.config && userData.config.payment_password_set==0" @click="routerGo('/security/index/set_tpwd')">{{$t('Gic.securityIndex[6]')}}</span>
					<!-- 修改 -->
					<span class="operation" v-else @click="routerGo('/security/index/change_tpwd')">{{$t('Gic.securityIndex[7]')}}</span>
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
					<span class="left">{{$t('Gic.securityIndex[10]')}}</span>
					<img class="icon-img" src="../../../assets/img/wancheng-icon.png" v-if="userData.config && userData.google_verify==1">
					<img class="icon-img" src="../../../assets/img/wei-wancheng.png" v-else>
					<!-- 登录，提现，修改密码及安全设置时用以输入谷歌验证码。 详细信息阅读交易指南； 下载：Andriod/ios -->
					<span class="describe">登录，提现，修改密码及安全设置时用以输入谷歌验证码。 详细信息阅读交易指南； 下载：Andriod/ios</span>
					<!-- 未绑定 -->
					<span class="operation" v-if="userData.config && userData.config.google_bind==0" @click="routerGo('/security/index/googleverify')">{{$t('Gic.securityIndex[12]')}}</span>
					<!-- 开启 -->
					<span class="operation" v-else-if="userData.config && userData.config.google_bind==1 && userData.config.google_verify==0" @click="routerGo('/security/index/googleverifyonoff','start')">{{$t('Gic.securityIndex[13]')}}</span>
					<!-- 关闭 -->
					<span class="operation" v-else-if="userData.config && userData.config.google_bind==1 && userData.config.google_verify==1" @click="routerGo('/security/index/googleverifyonoff','stop')">{{$t('Gic.securityIndex[14]')}}</span>
				</li>
			</ul>
		</div>
		<!-- 个人设置 -->
		<div class="personal_settings">
			<p class="title">个人设置</p>
			<div class="set_item">
				<span class="name">折算货币</span>
				<span class="info">设置后，在资产、最新价、买入价、卖出价等字段，会同时折合为当前折算货币展示</span>
				<span class="coin">USD</span>
				<span class="button" @click="converted">设置</span>
			</div>
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
					<el-select v-model="conversionForm.code">
						<el-option v-for="(item, index) in conversionArr" :key="index" :label="item.name" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="modal1 = false">取消</el-button>
				<el-button type="primary" @click="settingConver">确定</el-button>
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
				conversionArr: [
					{ name: "美元", code: "USD" }
				]
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
			// 折算货币
			converted() {
				this.conversionForm.code = "";
				this.modal1 = true;
			},
			// 设置折算货币
			settingConver() {
				this.$refs.conversionForm.validate(valid => {
					if (valid) {

					}
				})
			},
		},
		mounted() {
			this.getUserInfo()
		},
	};
</script>