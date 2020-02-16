<style lang=less>
	@import '../../../assets/public.less';
	@import './index.less';
</style>
<template>
	<div class="security_main" style="overflow:hidden;height: 600px;">
		<div class="contain">
			<ul class="container" style="overflow:hidden;">
				<!-- 请不要透露短信给任何人，包括平台客服 -->
				<li>{{$t('Gic.securityIndex[0]')}}</li>
				<!-- 登录密码 -->
				<li>
					<!-- 登录密码 -->
					<span class="left">{{$t('Gic.securityIndex[1]')}}</span>
					<span class="icon" :class="userData.config && userData.config.security_level<2?'error':''">
						<i class="el-icon-circle-check right"></i>
						<i class="el-icon-circle-close error"></i>
					</span>
					<!-- 安全级别 -->
					<span class="describe">{{$t('Gic.securityIndex[2]')}}</span>
					<span class="result">{{userData_security_level_text}}</span>
					<!-- 修改 -->
					<span class="operation" @click="routerGo('/security/index/changeopwd')">{{$t('Gic.securityIndex[3]')}}</span>
					<span class="detail">{{$public.phoneEncryption(userData.email)}}</span>
				</li>
				<!-- 资金密码 -->
				<li>
					<!-- 资金密码 -->
					<span class="left">{{$t('Gic.securityIndex[4]')}}</span>
					<span class="icon" :class="userData.config && userData.config.payment_password_set==0?'error':''">
						<i class="el-icon-circle-check right"></i>
						<i class="el-icon-circle-close error"></i>
					</span>
					<!-- 交易，提现时使用设置资金密码前请先绑定手机或邮箱 -->
					<span class="describe">{{$t('Gic.securityIndex[5]')}}</span>
					<!-- 设置 -->
					<span class="operation" v-if="userData.config && userData.config.payment_password_set==0" @click="routerGo('/security/index/set_tpwd')">{{$t('Gic.securityIndex[6]')}}</span>
					<!-- 修改 -->
					<span class="operation" v-else @click="routerGo('/security/index/change_tpwd')">{{$t('Gic.securityIndex[7]')}}</span>
				</li>
				<!-- 绑定邮箱 -->
				<li>
					<!-- 绑定邮箱 -->
					<span class="left">{{$t('Gic.securityIndex[8]')}}</span>
					<span class="icon" :class="userData.email?'':'error'">
						<i class="el-icon-circle-check right"></i>
						<i class="el-icon-circle-close error"></i>
					</span>
					<!-- 邮箱用于登录、提币及安全设置时使用，激活后不可修改 -->
					<span class="describe">{{$t('Gic.securityIndex[9]')}}</span>
					<!-- <span class="result">{{userData.email}}</span> -->
					<!-- <span class="operation" v-if="userData.config && userData.config.payment_password_set==0" @click="routerGo('/security/index/set_tpwd')">设置</span>
					<span class="operation" v-else @click="routerGo('/security/index/change_tpwd')">修改</span> -->
				</li>
				<!-- 谷歌验证 -->
				<li>
					<!-- 谷歌验证 -->
					<span class="left">{{$t('Gic.securityIndex[10]')}}</span>
					<span class="icon" :class="userData.config && userData.config.google_bind==0?'error':''">
						<i class="el-icon-circle-check right"></i>
						<i class="el-icon-circle-close error"></i>
					</span>
					<!-- 邮箱用于登录、提币及安全设置时使用，激活后不可修改 -->
					<span class="describe">{{$t('Gic.securityIndex[11]')}}</span>
					<!-- 未绑定 -->
					<span class="operation" v-if="userData.config && userData.config.google_bind==0" @click="routerGo('/security/index/googleverify')">{{$t('Gic.securityIndex[12]')}}</span>
					<!-- 开启 -->
					<span class="operation" v-else-if="userData.config && userData.config.google_bind==1 && userData.config.google_verify==0" @click="routerGo('/security/index/googleverifyonoff','start')">{{$t('Gic.securityIndex[13]')}}</span>
					<!-- 关闭 -->
					<span class="operation" v-else-if="userData.config && userData.config.google_bind==1 && userData.config.google_verify==1" @click="routerGo('/security/index/googleverifyonoff','stop')">{{$t('Gic.securityIndex[14]')}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				userData:{},
				userData_security_level_text:''
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
						switch (this.userData.config.security_level) {
							case 0:
							// 低
							this.userData_security_level_text = this.$t('Gic.securityIndex[15]')
							break;
							case 1:
							// 低
							this.userData_security_level_text = this.$t('Gic.securityIndex[15]')
							break;
							case 2:
							// 中
							this.userData_security_level_text = this.$t('Gic.securityIndex[16]')
							break;
							case 3:
							// 高
							this.userData_security_level_text = this.$t('Gic.securityIndex[17]')
							break;
							default:
							// 无等级
							this.userData_security_level_text = this.$t('Gic.securityIndex[18]')
							break;
						}
						// console.log(this.userData)
					}
				})
			},
		},
		created: function() {
			this.getUserInfo()
		},
		mounted:function () {
		},
		watch: {
		}

	};
</script>