<style lang=less>
	@import '../../assets/public.less';
	@import './apply.less';
</style>
<template lang="html">
	<div class="apply_main">
		<div class="applyIng">
			<div class="apply_header">
				<h2>{{$t("apply.list[0]")}}</h2>
				<p>{{$t("apply.list[1]")}}</p>
			</div>
			<div class="apply_cont">
				<div class="sell" @click="rout('sell')">
					<img src="../../assets/image/fabu/sell.png" alt=""/>
					<!--出售-->
					<h2>{{$t("apply.content[0]")}}</h2>
					<!-- 商家自由出售USDT,交易更灵活
					更便捷 -->
					<p>
						{{$t("apply.alse[2]")}}
					</p>
				</div>
				<div class="buy" @click="rout('buy')">
					<img src="../../assets/image/fabu/buy.png" alt=""/>
					<h2>{{$t("apply.content[2]")}}</h2>
					<p>
							{{$t("apply.alse[3]")}}
					</p>
				</div>
			</div>
			
			<!-- 已是商家 -->
			<p class="addApply" v-if="userData.is_shop == '1'" @click="removeApply" >{{$t("apply.content[4]")}}</p>
			<!-- 商家待审核 -->
			<p class="addApply" v-if="userData.is_shop == '2'" >{{$t('frenchcurrency.tishi2[9]')}}</p>
			<!-- 撤销申请审核中 -->
			<p class="addApply" v-if="userData.is_shop == '3'"  >{{$t('frenchcurrency.tishi2[11]')}}</p>
			<!-- 撤销审核通过 -->
			<p class="addApply" v-if="userData.is_shop == '0'" @click="isDisplay = true" >{{$t("apply.content[7]")}}</p>
			<div class="prompt">
				<p>
					<span style="color:#6185E5">{{$t("apply.content[6]")}}</span style="color:#8E94A3">{{$t("apply.content[5]")}}
				</p>
			</div>
		</div> 
		<!-- 申请商家弹窗 -->
		<div tabindex="-1" v-show="isDisplay" role="dialog" aria-modal="true" aria-label="标题名称" class="el-message-box__wrapper" style="z-index: 2045;">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>{{$t("apply.shenqing[0]")}}</span>
					</div>
					<img @click="close_moble" src="../../assets/image/fabu/×.png"></img>

				</div>
				<div class="el-message-box__content">
					<div class="first">
						<h2>{{$t("apply.shenqing[1]")}}</h2>
						<p class="info">
							{{$t("apply.shenqing[2]")}}
						</p>
					</div>
					<div class="second">
						<h2>{{$t("apply.shenqing[3]")}}</h2>
						<p class="info">
							{{$t("apply.shenqing[4]")}}
						</p>
					</div>
				</div>
				<div class="el-message-box__btns">
					<div class="ck">
						<el-checkbox v-model="checked">{{$t("apply.shenqing[5]")}}{{usdt}}USDT{{$t("apply.shenqing[6]")}}</el-checkbox>
					</div>
				</div>
				<div class="btn-group">
					<el-button class="btn btn-submit" type="primary" :disabled="!checked" @click='isok()'>{{$t("apply.alse[0]")}}</el-button>
					<div @click="close_moble" class="btn btn-close">{{$t("apply.alse[1]")}}</div>
				</div>
			</div>
		</div>

		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				imgUrl:"",
				fromData:{
					img:{}
				},
				isDisplay: false, //是否显示隐藏
				checked: true, //是否同意冻结usdt
				isbuy: '', //判断是出售还是求购
				usdt: '', // 用户需要冻结的保证金
				shop_usdt:'', // 成为商家所需要的usdt
				userData: {
					// tpwd: '', //是否设置资金密码
					// email: '', //是否绑定邮箱
					// is_shop: '', //判断是不是商家
					// // smrz: '', //判断有没有身份认证
					// status: '', //判断有没有实名认证
					// wallone: '' //用户钱包
				},
				isEnglish:'',//判断是否是英文
			}
		},
		methods: {

			//请求个人中心接口，判断是不是商家 和实名认证
			getData() {
				var _this = this;
				_this.$http.get(_this.$http.user_info ,{params:{}}).then(function(response) {
					if(response.data.code == "200") {
						_this.userData = response.data.data
						sessionStorage.userData=JSON.stringify(response.data.data)
					} else if(response.data.code == "0") {
						_this.$public.confirm(_this.$t("apply.getData"), 'login', _this);
					}
				}).catch(function(error) {
					console.log(error);
				});
				this.$http.post(this.$http.commonData,{}).then((r)=>{
					if(r.data.code ==200){
						this.usdt = r.data.data.fb_shop
					}else{
						this.$public.msg(r.data.msg,'error',this)
					}
				})

			},
			//各种判断条件
			judge(val) {
				var _this = this;					
				if(!sessionStorage.token) {
					//请先登录
					_this.$public.msg(_this.$t("apply.judge[0]") , 'warning', _this);
					_this.$public.go('login', 10, _this);
				// } else if(_this.userData.tpwd == false) {
				// 	//您还没有设置资金密码，是否前往设置
				// 	_this.$public.confirm(_this.$t("apply.judge[1]"), 'changetpwd2', _this);
				} else if(_this.userData.authentication != 2) {
					//您还没有进行身份认证，是否前往身份认证
					_this.$public.confirm(_this.$t("apply.judge[2]"), 'changePerson1', _this);
					return false;
				// } else if(_this.userData.status == 1) {
				// 	//您还没有进行高级认证，是否前往身份认证
				// 	_this.$public.confirm(_this.$t("apply.judge[3]"), 'changePerson1', _this);
				// 	return false;
				// } else if(_this.userData.status == 2) {
				// 	//您的信息正在审核中，暂不能进行此操作
				// 	_this.$public.msg(_this.$t("apply.judge[4]"), 'warning', _this);
				// 	return false;
				// } else if(_this.userData.status == 4) {
				// 	//您高级认证失败，是否重新认证?
				// 	_this.$public.confirm(_this.$t("apply.judge[5]"), 'changePerson1', _this);
				// 	return false;
				} else {
					//判断是不是商家
					if(_this.userData.is_shop == '0') {
						_this.openMobile();
					} else if(_this.userData.is_shop == '2'){
						_this.$public.msg(_this.$t('frenchcurrency.tishi2[9]'), 'warning', _this);
					} else if(_this.userData.is_shop == '3'){
						// 重新进行商家认证
						_this.$public.msg(_this.$t('frenchcurrency.tishi2[10]'), 'warning', _this);
					}
					else {
						return true;
					}
				}
			},
			openMobile() {
				var _this = this;
				this.$confirm(_this.$t("apply.openMobile[0]"), _this.$t("apply.openMobile[1]"), {
					confirmButtonText: _this.$t("apply.alse[0]"),
					cancelButtonText: _this.$t("apply.alse[1]"),
					type: 'warning'
				}).then(() => {
					setTimeout(function() {
						_this.isDisplay = true;
					}, 500)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: _this.$t("apply.openMobile[2]")
					});
				});
			},
			//解除商家
			removeApply() {
				var _this = this;
				this.$confirm(_this.$t("apply.removeApply[0]"), _this.$t("apply.removeApply[1]"), {
					confirmButtonText: _this.$t("apply.alse[0]"),
					cancelButtonText: _this.$t("apply.alse[1]"),
					type: 'warning'
				}).then(() => {
					//请求接口  解除成功后再请求个人中心接口
					_this.$http.post(_this.$http.del_shop, {}).then(function(response) {
						if(response.data.code == "200") {							
							_this.$public.msg(_this.$t("apply.removeApply[2]"), 'success', _this);
							_this.getData();
							
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: _this.$t("apply.removeApply[3]")
					});
				});
			},
			close_moble() {
				var _this = this;
				_this.isDisplay = false;
			},
			closeShop() {
				var connet = this;
				connet.$confirm('确认撤销商家？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					connet.$http.post(connet.$http.del_shop, {account:sessionStorage.account}).then((r)=>{
						if(r.data.data ==0){
							connet.$public.msg(r.data.msg, "warning", connet)
						}
					})			
				}).catch(() => {
					connet.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//点击	出售、购买
			rout(val) {
				var _this = this;
				_this.isbuy = val;
				if(!_this.judge(val)) return false;
				_this.$router.push({
					path: val
				});
			},
			isok() {
				var _this = this;
				_this.close_moble();
				_this.$confirm(_this.$t("apply.isok[0]") + _this.usdt + _this.$t("apply.isok[1]"), _this.$t("apply.isok[2]"), {
					confirmButtonText: _this.$t("apply.alse[0]"),
					cancelButtonText: _this.$t("apply.alse[1]"),
					type: 'warning'
				}).then(() => {
					//请求接口
//					if(Number(_this.userData.wallone) < Number(_this.usdt)) {
//						_this.$public.msg('您的余额不足，请充值', 'warning', _this);
//						return false;
//					}
					_this.$http.post(_this.$http.add_shop, {}).then(function(response) {
						if(response.data.code == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							// _this.$public.go(_this.isbuy, 10, _this);
							_this.getData();

						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t("apply.isok[3]")
					});
				});
			}

		},
		created: function() {
			this.userData = JSON.parse(sessionStorage.userData); 
			this.getData();
			this.isEnglish=this.$cookies.get('language');
		},

	}
</script>