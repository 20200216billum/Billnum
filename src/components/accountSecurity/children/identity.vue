<style lang="less" scoped>
	@import './identity.less';
</style>
<template>
	<div class="identitymain" style="overflow:hidden;height: 600px;">
		<!-- 请务必填写您本人的真实姓名与证件信息 -->
		<p class="top-title">{{$t('Gic.securityIdentity[0]')}}</p>
		<div class="contain">
			<ul class="container" style="overflow:hidden;">
				<!-- 初级认证 -->
				<li>
					<img class="img" src="../../../assets/image/GIC/img_1.png" alt="">
					<img class="img-b" src="../../../assets/image/GIC/img_1-b.png" alt="">
					<div class="info">
						<!-- 初级认证 -->
						<h2>{{$t('Gic.securityIdentity[1]')}}</h2>
						<p v-if="userData.name">{{userData.name}}  |  <span>{{$public.phoneEncryption(userData.card_id)}}</span></p>
					</div>
					<!-- 已认证 -->
					<span class="right" v-if="userData.authentication >= 1">{{$t('Gic.securityIdentity[2]')}}</span>
					<!-- 未认证 -->
					<span class="right" v-if="userData.authentication == 0" @click="routerGo('/security/identity/changePerson1')">{{$t('Gic.securityIdentity[3]')}}</span>
				</li>
				<!-- 高级认证 -->
				<li>
					<img class="img" src="../../../assets/image/GIC/img_2.png" alt="">
					<img class="img-b" src="../../../assets/image/GIC/img_2-b.png" alt="">
					<div class="info">
						<!-- 高级认证 -->
						<h2>{{$t('Gic.securityIdentity[4]')}}<span v-if="userData.refuse_reason">{{userData.refuse_reason?userData.refuse_reason:''}}</span></h2>
						<!-- 认证成功 -->
						<p v-if="userData.authentication == 3" class="green">{{$t('Gic.securityIdentity[5]')}}</p>
						<!-- 认证失败 -->
						<p v-if="userData.authentication == 4" class="red">{{$t('Gic.securityIdentity[6]')}}</p>
					</div>
					<!-- 已认证 -->
					<span class="right" v-if="userData.authentication == 3">{{$t('Gic.securityIdentity[7]')}}</span>
					<!-- 待审核 -->
					<span class="right" v-if="userData.authentication == 2">{{$t('Gic.securityIdentity[8]')}}</span>
					<!-- 去认证 -->
					<span class="right" v-if="userData.authentication == 1" @click="routerGo('/security/identity/changePerson2')">{{$t('Gic.securityIdentity[9]')}}</span>
					<!-- 重新认证 -->
					<span class="right" v-if="userData.authentication == 4" @click="routerGo('/security/identity/changePerson2')">{{$t('Gic.securityIdentity[10]')}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				userData:{}
			}
		},
		methods: {
			routerGo(path){
				this.$router.push({
					path: path,
				})
			},
			//获取个人信息
			getUserInfo(){
				this.$http.get(this.$http.user_info,{params:{}}).then((res) => {
					if(res.data.code == '200') {
						sessionStorage.userInfo = JSON.stringify(res.data.data);
						this.userData = res.data.data;
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