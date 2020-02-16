<style lang=less>
	@import '../../assets/public.less';
	@import './identity.less';
</style>
<template>
	<div class="identity_main">
		<div class="identity_header">
			<h2>
				{{$t("identity.list[0]")}}<!-- 身份认证 --> 
				<span class="tishi"> <i class="el-icon-info"></i>{{$t("identity.list[1]")}}</span><!-- 请如实填写你的身份信息，一经验证不可修改 --> 
			</h2>

		</div>
		<div class="identity_cont">
			<ul class="lis_warp">
				<li class="lis">
					<span>{{$t("identity.list[2]")}}</span><!-- 实名认证 --> 
					<span class="name" v-show="userData.smrz">{{userData.name}}</span>
					<span class="name" v-show="!userData.smrz">{{$t("identity.list[3]")}}</span><!-- 未认证 --> 
					
					<span class="car">{{userData.idcard}}</span>
					<span class="exit" @click="route('realname')" v-show="!userData.smrz">{{$t("identity.list[4]")}}</span><!-- 认证 --> 
					<span class="exit" v-show="userData.smrz" style="color: #909399; cursor: default;">{{$t("identity.list[5]")}}</span><!-- 已认证 --> 
				</li>
				<li class="lis">
					<span>{{$t("identity.status[0]")}}</span><!-- 高级认证 --> 
					<span class="status" v-if="userData.status == 1">{{$t("identity.status[1]")}}</span><!-- 未认证 --> 
					<span class="status" v-else-if="userData.status == 2">{{$t("identity.status[2]")}}</span><!-- 审核中 --> 
					<span class="status" v-else-if="userData.status == 3">{{$t("identity.status[3]")}}</span><!-- 审核通过 --> 
					<span class="status" v-else-if="userData.status == 4">{{$t("identity.status[4]")}}</span><!-- 审核失败 --> 
					<span class="exit" @click="route('senior')" v-if="userData.status == 1">{{$t("identity.status[5]")}}</span><!-- 认证 --> 
					<span class="exit"  v-if="userData.status == 2">{{$t("identity.status[6]")}}</span><!-- 审核中 --> 
					<span class="exit"  v-if="userData.status == 3" style="color: #909399; cursor: default;">{{$t("identity.status[7]")}}</span><!-- 审核通过 --> 
					<span class="exit" @click="route('senior')" v-if="userData.status == 4">{{$t("identity.status[8]")}}</span><!-- 重新认证 --> 
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userData:{
					name:'',
					smrz:'',
					status:'',
					idcard:''
				}   //用户信息

			};
		},
		methods: {
			route(whitch) {
				var _this = this;
				// if(whitch == 'senior' && _this.userData.smrz == false){
				// 		_this.$public.msg(_this.$t("identity.route"), 'warning', _this);//请先进行实名认证
				// 		return false
				// }
				_this.$router.push({
					path: whitch
				})
			},
			//请求个人中心数据
			getData() {
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						var idcard = response.data.data.idcard == false ? '' : response.data.data.idcard
						_this.userData= {
							name:response.data.data.name,  //姓名
							smrz:response.data.data.smrz,   //身份认证状态
							status:response.data.data.status,  // 高级认证状态
							idcard:idcard    //身份证号码
						}
						
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			}
		},
		created:function(){
			var _this = this;		
			_this.getData();
			_this.$public.scrollTop();  //返回但最顶部函数
		}
	}
</script>

<style>

</style>