<template lang="html">
	<div class="header" :class="{home_hader: isFixed}">
		<div class="header_box">
			<section class="header_transaction">
				<ul class="transaction_main">
					<li class="transaction_list" @click="changeUrl('home')">
						<img src="../../assets/Gicimg/heder/logo.png" class="logoImg">
					</li>
					<li 
						class="transaction_list" 
						:class="{'transactionActive':v.url == $route.path, hot:v.hot}"
						v-for="(v,index) in headerNav" 
						v-show="v.status" 
						@click="changeUrl(v.url, index)"
					>
						{{v.name}}
					</li>
				</ul>
			</section>
			<!-- 公告轮播 -->
			<!-- <div class="gonggao" :class="!ggShow || !LoginState?'fly':''">
				<div class="div">
					<router-link class="a" to="zixunList?type=gg">{{$t('zixunList[5]')}}</router-link>
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div v-for="(i,index) in ggList" :key="index" class="swiper-slide"><a class="title">{{i.title}}</a></div>
						</div>
					</div>
				</div>
			</div> -->
			<section class="header_personal">
				<!-- 已登录 -->
				<ul class="personal_main" v-show="LoginState" id="pos">
					<!-- 资产管理 -->
					<!-- <li  class="personal_list assets"> 
						<el-dropdown @command="changeUrl" trigger="click">
							<span class="el-dropdown-link">
								{{$t('laaccount.title[0]')}}
								<i class="el-icon--right">
										<img style="vertical-align: middle" src="../../assets/img/down.png" alt="">
								</i>
							</span>
							<el-dropdown-menu class="el-menu" slot="dropdown">
								<el-dropdown-item divided :command="v.path" :key="i" v-for="(v,i) in assetsList">{{v.name}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li> -->
					<!-- 资产 -->
					<li class="personal_list" @click="$router.push({path:'/addCoin'})">
						<span>资产</span>
					</li>
					<li class="personal_list" v-if="orderUrl" @click="$router.push({path:'/bbOrder'})">
						<!-- <img style="vertical-align: middle" src="../../assets/img/order.png"> -->
						<span>{{$t("Gic.header[20]")}}</span>
					</li>
					<li class="personal_list personCenter">
						<!--  个人中心	 -->
						<el-dropdown @command="changeUrl" trigger="click">
							<span class="el-dropdown-link">
								<i class="el-icon--left">
									<img style="vertical-align: bottom" src="../../assets/img/wode-img.png">
								</i>
								{{transPhone}}
								<i class="el-icon--right" style="margin-left:2px; margin-top:5px;">
									<img style="vertical-align: middle" src="../../assets/img/xuanze-icon.png">
								</i>
							</span>
							<el-dropdown-menu class="el-menu el-menu-mine" slot="dropdown">
								<el-dropdown-item>
									<div class="head-info">
										<img src="../../assets/img/ure-img.png" />
										<p class="tel">
											Hi, {{ transPhone }}
										</p>
										<p class="uid">
											UID: {{ userInfo.account }}
										</p>
									</div>
								</el-dropdown-item>
								<el-dropdown-item :command="v.path" :key="i" v-for="(v,i) in personList">
									<img tyle="vertical-align: middle;" :src="v.img"> {{v.name}}
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li class="personal_list other" @click="goGongGao">
						<img src="../../assets/Gicimg/heder/xiaoxi-icon.png">
					</li>
					<li class="personal_list other">
						<img src="../../assets/Gicimg/heder/xiazai-icon.png">
					</li>
					<!-- 黑白夜间 -->
					<!-- <li class="personal_list day">
						<el-dropdown @command="changeDay">
							<span class="el-dropdown-link changeTime">
								<img src="../../assets/image/index/day.png" v-if="changeBgData == 'day'" style="vertical-align: middle;" />
								<img src="../../assets/image/index/night.png" v-if="changeBgData == 'night'" style="vertical-align: middle;" />
							</span>
							<el-dropdown-menu class="el-menu" slot="dropdown">
								<el-dropdown-item divided command="day">{{$t("Gic.header[12]")}}</el-dropdown-item>
								<el-dropdown-item divided command="night">{{$t("Gic.header[13]")}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li> -->

					<!-- 中英 -->
					<li class="personal_list">
						<el-dropdown @command="handleCommand" trigger="click">
							<p class="changeLange">
								<!-- 简体中文 -->
								<span class="el-dropdown-link linkBorder" v-if="islange == 'Chinese'">
									<!-- <img style="vertical-align: middle" src="../../assets/img/chinese.png" alt=""> -->
									中文简体
									<i class="el-icon-arrow-down el-icon--right"></i>
									<!-- <i class=" el-icon--right">
										<img style="vertical-align: middle;transform: translate(-6px,10px) rotate(310deg)"
											src="../../assets/img/down.png" alt="">
									</i> -->
								</span>
								<!-- 中文简体 -->
								<span class="el-dropdown-link linkBorder" v-else-if="islange == 'TwChinese'">
									<!-- <img style="vertical-align: middle" src="../../assets/img/chinese.png" alt=""> -->
									中文繁體
									<i class="el-icon-arrow-down el-icon--right"></i>
									<!-- <i class=" el-icon--right">
										<img style="vertical-align: middle;transform: translate(-6px,10px) rotate(310deg)"
											src="../../assets/img/down.png" alt="">
									</i> -->
								</span>
								<!-- English -->
								<span class="el-dropdown-link linkBorder" v-else>
									<!-- <img style="vertical-align: middle" src="../../assets/img/english.png" alt=""> -->
									English
									<i class="el-icon-arrow-down el-icon--right"></i>
									<!-- <i class=" el-icon--right">
										<img style="vertical-align: middle;transform: translate(-6px,10px) rotate(310deg)"
											src="../../assets/img/down.png" alt="">
									</i> -->
								</span>
							</p>
							<el-dropdown-menu class="el-menu" slot="dropdown">
								<!-- 简体中文 -->
								<el-dropdown-item command="Chinese">中文简体</el-dropdown-item>
								<!-- 中文繁体 -->
								<el-dropdown-item command="TwChinese">中文繁體</el-dropdown-item>
								<!-- English -->
								<el-dropdown-item command="English">English</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
				</ul>
				<!-- 未登录 -->
				<ul class="personal_main" v-show="!LoginState" id="pos">
					<li class="personal_list log">
						<router-link to="/Login">
							<!-- 登录 -->
							<i class="iconfont icon-zhuanhuan1"></i>{{$t("Gic.header[4]")}}
						</router-link>
					</li>
					<li class="personal_list reg">
						<router-link to="/Register">
							<!-- 注册 -->
							<i class="iconfont icon-zhuanhuan1"></i>{{$t("Gic.header[5]")}}
						</router-link>
					</li>
					<!-- 黑白夜间 -->
					<!-- <li class="personal_list day">
						<el-dropdown @command="changeDay">
							<span class="el-dropdown-link changeTime">
								<img src="../../assets/image/index/day.png" v-if="changeBgData == 'day'" />
								<img src="../../assets/image/index/night.png" v-if="changeBgData == 'night'" />

							</span>
							<el-dropdown-menu class="el-menu" slot="dropdown">
								<el-dropdown-item divided command="day">{{$t("Gic.header[12]")}}</el-dropdown-item>

								<el-dropdown-item divided command="night">{{$t("Gic.header[13]")}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li> -->
					<li class="personal_list other" @click="goGongGao">
						<img src="../../assets/Gicimg/heder/xiaoxi-icon.png">
					</li>
					<li class="personal_list other">
						<img src="../../assets/Gicimg/heder/xiazai-icon.png">
					</li>
					<li class="personal_list">
						<el-dropdown @command="handleCommand">
							<p class="changeLange">
								<!-- 简体中文 -->
								<span class="el-dropdown-link linkBorder" v-if="islange == 'Chinese'">
									<!-- <img src="../../assets/img/login/zh.png" class="lang-img"> -->
									中文简体
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<!-- 中文简体 -->
								<span class="el-dropdown-link linkBorder" v-else-if="islange == 'TwChinese'">
									<!-- <img src="../../assets/img/login/zh.png" class="lang-img"> -->
									中文繁體
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<!-- English -->
								<span class="el-dropdown-link linkBorder" v-else>
									<!-- <img src="../../assets/img/login/en.png" class="lang-img"> -->
									English
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
							</p>
							<el-dropdown-menu class="el-menu" slot="dropdown">
								<!-- 简体中文 -->
								<el-dropdown-item command="Chinese">
									中文简体
								</el-dropdown-item>
								<!-- 简体中文 -->
								<el-dropdown-item command="TwChinese">
									中文繁體
								</el-dropdown-item>
								<!-- English -->
								<el-dropdown-item command="English">
									English
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
				</ul>

			</section>
		</div>
	</div>
</template>
<script>
	// import { fail } from 'assert';
	import Swiper from 'swiper';

	export default {
		props: ['isFixed'],
		data() {
			return {
				ggList: [],
				ggShow: true,
				mySwiper: "",
				userData: {},
				userInfo: {},
				islange: 'Chinese', //语言标志
				DackGround: false,
				DackGround1: true,
				list: '',
				orderUrl: "",
				// 订单url
				Routing: "",
				// 订单显示
				Routingtype: false,
				LoginState: false,
				account: null,
				active: true,
				activeClass: 'blue',
				ziCanStatus: true, //控制资产的显示和隐藏
				is_apply: '', //经纪人状态判断
				apply_reason: '', //拒绝原因
				status: '', //判断没有没实名认证
				auth_status: '',//高级认证
				changeBgData: this.$cookies.get('changeBg') ? this.$cookies.get('changeBg') : 'night',
				home: this.$router.path,
				headerNav: null,
				view: {
					// 发布交易显示url
					apply_show: ['/frenchcurrency', '/apply', '/buy', 'sell'],
					// 公告轮播隐藏url
					gg_hide: ['/coincoin', '/frenchcurrency', '/apply', '/buy', '/sell', '/zixunList'],
					// 登录拦截
					refuse: ['/myAccount'],
					// 订单控制
					orderShow: {
						// val中包含的地址会显示订单，订单跳转地址为key
						'bbOrder': ['/coincoin'],
						'fbOrder': ['/frenchcurrency'],
						'shopOrder': ['/shopIndex', '/payment', '/shopIndex', '/Details', '/payment', '/addSite']
					}
				}
			};
		},
		watch: {
			$route(to, from) {
				var _this = this;
				this.checkLogin()
				// this.getGGList()
				this.viewCtrl(to.path)
				// if(to.path == '/home'){
				// 	$('.mainy .home_hader_background1').css('background','#0A125EFF')
				// }else{
				// 	$('.mainy .home_hader_background1').css('background','#2b2b2b')
				// }
			}
		},
		computed: {
			transPhone() {
				if (this.LoginState) {
					var arr = this.userData.split("")
					arr[3] = "*"
					arr[4] = "*"
					arr[5] = "*"
					arr[6] = "*"
					return arr.join("")
				} else {
					return ""
				}
			},
			// 个人中心下拉
			personList() {
				var arr = [
					//我的资产
					{ name: this.$t('Gic.header[7]'), path: '/addCoin', class: '', img: require("../../assets/img/wdzc-icon.png") },
					// 账号安全
					{ name: this.$t('Gic.header[8]'), path: '/security', class: '', img: require("../../assets/img/zhaq-icon.png") },
					// 身份认证
					{ name: this.$t('Gic.header[9]'), path: '/security/identity', class: '', img: require("../../assets/img/sfrz-icon.png") },
					// 提币地址
					{ name: this.$t('Gic.header[10]'), path: '/Mentionmoneyaddress', class: '', img: require("../../assets/img/tbdz-icon.png") },
					// 我的奖励
					{name:"我的奖励",path:'/my-reward',class:'',img:require("../../assets/img/wdjl-icon.png")},
					// 我的推广
					{name:"我的推广",path:'/promotion',class:'',img:require("../../assets/image/bibi/wdtg.png")},
					// 退出登录
					{ name: this.$t('Gic.header[11]'), path: '/logout', class: '', img: require("../../assets/img/tc-icon.png") },
				]
				return arr
			},
			// 资产管理下拉
			assetsList() {
				var arr = [
					// 个人资料
					{ name: this.$t('header.navlist2[7]'), path: '/myAccount?type=1' },
					// 账号安全
					{ name: this.$t('header.navlist2[8]'), path: '/myAccount?type=2' },
					// 关于我们
					{ name: this.$t('header.navlist2[9]'), path: '/myAccount?type=3' },
				]
				return arr
			}

		},
		mounted() {
			// this.getGGList()
		},
		methods: {
			// 跳转到公告列表
			goGongGao() {
				this.$router.push("/gonggaoList");
			},
			//获取个人信息
			getUser(){
				var _this = this;
				this.$http.get(this.$http.user_info,{params:{}}).then((res) => {
					if(res.data.code == '200') {
						sessionStorage.payment_password_set = res.data.data.config.payment_password_set;
						sessionStorage.authentication = res.data.data.authentication;
						this.userInfo = res.data.data;
						// this.userData = res.data.data;
					}
				})
			},


			// 头部控制
			viewCtrl(path) {
				// 以下逻辑不用动 只修改this.view
				// if(this.view.apply_show.includes(path)){
				// 	this.headerNav[3].status = true
				// }else{
				// 	this.headerNav[3].status = false
				// }

				if (this.view.gg_hide.includes(path)) {
					this.ggShow = false
				} else {
					this.ggShow = true
				}
				if (this.view.refuse.includes(path)) {
					if (!this.LoginState) {
						this.$public.msg(this.$t("header.Tipstext3[5]"), 'warning', this);
						this.$public.go("/Login", 100, this);
					}
				}
				for (var i in this.view.orderShow) {
					if (this.view.orderShow[i].includes(path)) {
						this.orderUrl = "/" + i
						return
					} else {
						this.orderUrl = ""
					}

				}

				if (path == "/coincoin") {
					$("#main").addClass('big')
				}

			},

			renderSwiper() {
				this.mySwiper = new Swiper('.swiper-container', {
					direction: 'vertical', // 垂直切换选项
					loop: true, // 循环模式选项
					disableOnInteraction: false,
					autoplay: {
						delay: 1500,
					},
					observer: true,
				})
			},
			// 获取公告轮播列表
			getGGList() {
				// 在不该显示公告的url不请求 实例已存在不请求
				if (this.view.gg_hide.includes(this.$route.path) || this.mySwiper != "") {
					return false
				}
				this.$http.get(this.$http.ggList, { params: { size: 3 } }).then(r => {
					if (r.data.code == "200") {
						this.ggList = r.data.data.data

						this.$nextTick(() => {
							this.renderSwiper()
						})
					}
				}).catch(r => {
				})
			},
			changeDay(val) {
				var _this = this;
				_this.$cookies.set("changeBg", val, 60 * 60 * 24 * 30);
				if (_this.$cookies.get('changeBg') == 'night') {
					$('#main').removeClass('mainb');
					$('#main').addClass('mainy');
					this.changeBgData = 'night';
				} else {
					$('#main').removeClass('mainy');
					$('#main').addClass('mainb');
					this.changeBgData = 'day';
				}
				history.go(0);
			},
			signOut() { // 登出
				var _this = this;
				_this.$confirm("您确定退出Billum吗?", _this.$t("Gic.header[14]"), { //您确定退出HUB网吗
					confirmButtonText: _this.$t("Gic.header[16]"), //确定
					cancelButtonText: _this.$t("Gic.header[17]"),
					type: 'warning'
				}).then(() => {
					_this.$message({
						type: 'success',
						message: _this.$t("Gic.header[19]"),
					});
					sessionStorage.clear();
					_this.$public.go('/login', 100, _this);

				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t("Gic.header[18]")
					});
				});
			},
			goUrl() {
				var _this = this;
				if (_this.status != '3') {
					_this.$public.go("changePerson1", 100, _this);
				} else {
					if (_this.auth_status == '3') {
						_this.$public.msg(_this.$t("header.Tipstext3[3]"), 'success', _this);
						return false;
					} else if (_this.auth_status == '1') {
						_this.$public.go("changePerson2", 100, _this);
					} else if (_this.auth_status == '2') {
						_this.$public.msg(_this.$t("header.Tipstext3[0]"), 'warning', _this);
						return false;
					} else if (_this.auth_status == '4') {
						this.$public.msg(_this.$t('header.tips[7]'), "warning", _this);
						_this.$public.go("changePerson2", 1000, _this);
					}
				}


			},
			changeUrl(path, index) {
				// 未登录状态法币跳转登录页
				// if (path == '/frenchcurrency') {
				// 	if (!sessionStorage.token) {
				// 		this.$public.msg(this.$t('header.Tipstext3[5]'),'warning',this)
				// 		this.$router.push({path: '/login'})
				// 		return
				// 	}
				// }
				if (path == '/addCoin') {
					if (!this.LoginState) {
						this.$public.msg(this.$t("Gic.header[6]"), 'warning', this);
						this.$public.go("/Login", 100, this);
						return false
					}

				}
				if (path == '/logout') {
					// this.$http.post(this.$http.logout, {}).then((r)=>{
					// 	if(r.data.code == 200){ 
					// 		this.$public.msg(this.$t('header.Tipstext1[4]'),'success',this)
					// 		sessionStorage.clear();
					// 		this.$router.push({path:'/home'})
					// 		this.LoginState =false
					// 	}else{ 
					// 		this.$public.msg(r.data.msg,'error',this)
					// 	}
					// })
					this.signOut();
					return false
				}
				if (path == "/fuli") {
					if (this.userData.config.payment_password_set == 0) {
						// 您还位设置资金密码
						this.$public.msg(this.$t("mortgage.tip[4]"), 'error', this)
						return false
					}
				}
				// 暂未开放
				if (path == "") {
					this.$public.msg(this.$t('header.tips2[0]'), "warning", this);
				}

				this.$router.push({ path })

			},
			handleCommand(command) {
				var _this = this;
				_this.$cookies.set("language", command, 60 * 60 * 24 * 30);
				_this.$i18n.locale = command;
				history.go(0);
			},
			ckLange() {
				if (this.$cookies.get('language')) {
					this.$i18n.locale = this.$cookies.get('language');
					this.islange = this.$cookies.get('language');
				} else {
					this.$cookies.set("language", 'Chinese', 60 * 60 * 24 * 30);
				}

			},
			checkLogin() {
				if (sessionStorage.token) {
					this.LoginState = true;
					this.getUser();
					this.userData = sessionStorage.userData;
				} else {
					this.LoginState = false
				};

			}
		},
		created: function () {
			var _this = this;
			this.checkLogin()
			_this.ckLange(); //语言选择
			_this.headerNav = [
				{
					name: _this.$t("Gic.header[0]"), //首页
					url: '/home',
					status: true
				},
				// {
				// 	name: _this.$t("header.navlist[0]"), //法币交易
				// 	url: '/frenchcurrency',
				// 	status: true
				// }, 
				{
					name: _this.$t("Gic.header[1]"), //币币交易
					url: '/coincoin',
					status: true
				},
				// {
				// 	name: _this.$t("header.navlist[2]"), //发布交易
				// 	url: '/apply',
				// 	status: false
				// }, 
				// {
				// 	name: _this.$t("header.navlist[3]"), 
				// 	url: '/guessing',
				// 	status: true
				// },
				// {
				// 	name: _this.$t("header.navlist[11]"), 
				// 	url: '/shopIndex',
				// 	status: true,
				// 	hot:true
				// },
				// {
				// 	name: _this.$t("Gic.header[2]"), //资讯
				// 	url: '/zixunList',
				// 	status: true
				// },
				// {
				// 	name: _this.$t("Gic.header[3]"), //资产
				// 	url: '/addCoin',
				// 	status: true
				// },
			];
			this.viewCtrl(this.$route.path)
		},
	}
</script>

<style scoped="scoped" lang="less">
	.gonggao.fly {
		position: absolute;
		top: -500px;
	}

	.gonggao {
		color: #fff;
		float: left;
		width: 250px;
		line-height: 70px;
		box-sizing: border-box;

		.div {
			width: 170px;
			display: inline-block;
			height: 30px;
			line-height: 30px;
			padding-left: 65px;
			border-radius: 15px;
			background: #3E3E3E;
			vertical-align: middle;
			overflow: hidden;
			font-size: 12px;
			color: #788abf;
			position: relative;

			.title {
				display: inline-block;
				width: 95%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.a {
				display: inline-block;
				width: 58px;
				height: 31px;
				position: absolute;
				left: 0;
				color: #fff;
				background: #6185e5;
				border-radius: 15px;
				text-align: center;
			}
		}
	}

	.iconfont {
		font-size: 14px;
		position: relative;
		left: -4px;
	}

	.hot::before {
		content: "";
		position: absolute;
		display: block;
		width: 26px;
		right: -30px;
		top: 15px;
		height: 14px;
		background: url("../../assets/image/index/hot.png") no-repeat;
	}

	.fixeds {
		position: fixed;
		height: 96px;
		line-height: 96px;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0);
	}
</style>