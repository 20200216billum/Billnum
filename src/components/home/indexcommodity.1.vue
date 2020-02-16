<style lang=less>
</style>
<template lang="html">
	<section>
		<div class="btclist">
			<ul>
				<li v-show="item.code != 'KEIEX_usdt'" v-for="(item,index) in list" :key="index" v-if="index<5"
					:data_code='item.code' class="btclist_box wow animate fadeInDown">
					<div>
						<span class="name">{{$public.InterceptingAdd(item.name)}}</span>
						<span v-if="item.change < 0" class="col col_one">{{item.changeRate}}</span>
						<span v-else class="col col_two">{{item.changeRate}}</span>
					</div>
					<div class="money">￥{{item.price}}</div>
				</li>
			</ul>
		</div>
		<h2 class="wow animate fadeInDown" >{{$t("home.main[18]")}}</h2>
		<p class="wow animate fadeInDown" >{{$t("home.main[1]")}}</p>
		<!-- <div class="hangqingWarp" v-if="list.length != 0 "> -->
		<div class="hangqingWarp" >
			<ul class="hangq_top wow animate fadeInDown" >
				<li>{{$t("home.main[27]")}}</li>
				<li>{{$t("home.main[28]")}}</li>
				<li>{{$t("home.main[29]")}}</li>
				<li>{{$t("home.main[30]")}}</li>
				<li>{{$t("home.main[31]")}}</li>
				<li>{{$t("home.main[32]")}}</li>
				<li>{{$t("home.main[33]")}}</li>
			</ul>
			<ul class="hangqwingul wow animate fadeInDown" >
				<!-- // <router-link v-for="(item,index) in list" :to="{path:'/exchange',query:{account:item.code}}" :key="index"> -->
				<a href="javascript:;" v-show="item.code != 'KEIEX_usdt'" v-for="(item,index) in list"
					:data_code='item.code' @click="gourl(item.code,index)" class="indexcommodity_box" :key="index">
					<li>
						<!--1-->
						<div class="hang_1">
							<!-- <img v-if="item.code == 'kt_usdt'" src="../../assets/image/index/kt_usdt.png" alt="" />
							<img v-if="item.code == 'btc_usdt'" src="../../assets/image/index/btc_usdt.png" alt="" />
							<img v-if="item.code == 'xrp_usdt'" src="../../assets/image/index/xrp.png" alt="" />
							<img v-if="item.code == 'eth_usdt'" src="../../assets/image/index/eth_usdt.png">
							<img v-if="item.code == 'etc_usdt'" src="../../assets/image/index/etc_usdt.png">
							<img v-if="item.code == 'ltc_usdt'" src="../../assets/image/index/ltc.png">
							<img v-if="item.code == 'eos_usdt'" src="../../assets/image/index/eos_usdt.png">
							<img v-if="item.code == 'zec_usdt'" src="../../assets/image/index/zec_usdt.png">
							<img v-if="item.code == 'dash_usdt'" src="../../assets/image/index/dash_usdt.png">
							<img v-if="item.code == 'bch_usdt'" src="../../assets/image/index/bch.png"> -->
							<p>{{$public.InterceptingAdd(item.name)}} <span>/ USDT</span></p>
						</div>
						<!--2-->
						<div class="hang_2">
							<p class="priceone">{{item.price}}</p>
						</div>
						<!--<aside>-->
						<!--<p class="title">-->
						<!--&lt;!&ndash;{{$public.InterceptingAdd(item.name)}} / USDT&ndash;&gt;-->
						<!--<span v-if="item.change > 0" class="changeRate">-->
						<!--<span class="fall">{{item.changeRate}}</span>-->
						<!--<i class="el-icon-caret-top fall"></i>-->
						<!--</span>-->
						<!--<span v-else class="changeRate">-->
						<!--<span class="rise">{{item.changeRate}}</span>-->
						<!--<i class="el-icon-caret-bottom rise"></i>-->
						<!--</span>-->
						<!--</p>-->
						<!--<p class="price">-->
						<!--<span class="priceNum">-->
						<!--<span class="priceone">{{item.price}}</span>-->
						<!--</span>-->
						<!--<span class="yuedeng">  ≈{{item.cnyPrice}}  CNY</span>-->
						<!--</p>-->
						<!--&lt;!&ndash;<p class="allNum">&ndash;&gt;-->
						<!--&lt;!&ndash;{{$t('indexcommodity.main[0]')}}  : <span class="numWarp">{{item.volume}}</span>&ndash;&gt;-->
						<!--&lt;!&ndash;</p>&ndash;&gt;-->
						<!--</aside>-->
						<!--3-->
						<aside>
							<p class="title">
								<!--{{$public.InterceptingAdd(item.name)}} / USDT-->
								<span v-if="item.change > 0" class="changeRate">
									<span class="fall" style="color: #00bc80 !important;">{{item.changeRate}}</span>
									<i class="el-icon-caret-top fall"></i>
								</span>
								<span v-else class="changeRate">
									<span class="rise" style="color: #fe5955 !important;">{{item.changeRate}}</span>
									<i class="el-icon-caret-bottom rise"></i>
								</span>
							</p>
						</aside>
						<!--4-->
						<div class="hang_4">
							<p class="high">{{item.high}}</p>
						</div>
						<!--5-->
						<div class="hang_5">
							<p class="low">{{item.low}}</p>
							<!--<span class="priceNum">-->
							<!--<span class="priceone">{{item.price}}</span>-->
							<!--</span>-->
							<!--<span class="yuedeng">  ≈{{item.cnyPrice}}  CNY</span>-->
						</div>
						<!--6-->
						<aside class="hang_6">
							<p class="allNum">
								<span class="numWarp">{{$public.toLowFixed(item.volume,4,0)}}</span>
							</p>
						</aside>
						<div class="hang_7">
							<!-- <img class="jy_1" src="../../assets/img/jy_1.png" alt="">
							<img class="jy_2" src="../../assets/img/jy_2.png" alt=""> -->
						</div>
					</li>
				</a>
				<!-- </router-link> -->
			</ul>
		</div>
		<!-- <div class="hangqingWarp" v-else>
			<div class="nolistWarp">
				<img src="../../assets/image/timg.gif" alt="" style="width: 90px;" />
			</div>
		</div> -->
	</section>
</template>
<script>
	import Btclist from "./btclist.vue"

	export default {
		data() {
			return {
				list: [],
				second: [],
				MainData: "",
				SecondData: "",
				codedata: [],
				pricedata: [],
				changeRate: [],
				highdata: [],
				lowdata: [],
				volumedata: [],
				changedata: [],
				yuedengdata: [],
				onedata: [],
				twodata: []
			}
		},
		watch: {
			"list": function () {
				this.$nextTick(() => { // 在dom渲染完后,再执行动画
				
				})
			}
		},
		methods: {
			gourl(code, index) {
				var _this = this;
				if (!sessionStorage.account && !sessionStorage.token) {
					_this.$public.msg(_this.$t('tiBit.tips[14]'), 'warning', _this);
					_this.$public.go("/Login", 0, _this);
					return false;
				};

				_this.$public.go('/exchange', 10, _this, {
					code: code,
					index: index
				})


				// if(code != 'kt_usdt'){
				// 	_this.$public.go('/exchange',10,_this,{
				// 		code:code,
				// 		index:index
				// 	})
				// }else {
				// 	_this.$public.go('/exchange',10,_this,{
				// 		code:'btc_usdt',
				// 		index:index
				// 	})
				// }
			},

			// 获取主区数据
			GetDatamain() {
				var connet = this;
				$.get(connet.$http.getNewInfo, {}, function (result) {
					if (result.status == "200") {
						connet.list = result.data;
						window.setTimeout(function () {
							connet.MainDatapush();
						}, 800)
					}
				});
			},
			// 主区数据推送
			MainDatapush() {
				var connet = this;
				//准备dom元素，存入数组
				window.setTimeout(function () {
					var domdata = $('.indexcommodity_box');
					var btclistdata = $('.btclist_box');
					for (var i = 0; i < domdata.length; i++) {
						connet.codedata.push(domdata[i].getAttribute('data_code'));
						connet.pricedata.push(domdata.eq(i).find('.priceone')[0]);
						connet.changeRate.push(domdata.eq(i).find('.changeRate')[0]);
						connet.volumedata.push(domdata.eq(i).find('.numWarp')[0]).toFixed(4);
						connet.yuedengdata.push(domdata.eq(i).find('.yuedeng')[0]);
						connet.highdata.push(domdata.eq(i).find('.high')[0]);
						connet.lowdata.push(domdata.eq(i).find('.low')[0]);
					};
					for (var i = 0; i < btclistdata.length; i++) {
						connet.codedata.push(btclistdata[i].getAttribute('data_code'));
						connet.onedata.push(btclistdata.eq(i).find('.money')[0]);
						connet.twodata.push(btclistdata.eq(i).find('.col')[0]);
					}
				}, 1500);

				// 首先判断是否 支持 WebSocket
				if ('WebSocket' in window) {
					connet.MainData = new WebSocket(connet.$http.MainwsUrl);
				} else if ('MozWebSocket' in window) {
					connet.MainData = new MozWebSocket(connet.$http.MainwsUrl);
				} else {
					connet.MainData = new SockJS(connet.$http.MainskUrl);
				}
				// 打开时
				connet.MainData.onopen = function (evnt) {
					var msg = {
						code: "all"
					};
					// 发送消息
					connet.MainData.send(JSON.stringify(msg));
				};
				// 处理消息时
				connet.MainData.onmessage = function (evnt) {
					if (evnt.data.split('{').length != "2") {
						return false;
					};
					var datanum = JSON.parse(evnt.data);
					//					return;
					for (var i = 0; i < connet.codedata.length; i++) {
						if (datanum.code == connet.codedata[i]) {
							$(connet.pricedata[i]).html(datanum.price);
							$(connet.changeRate[i]).html(datanum.changeRate);
							$(connet.volumedata[i]).html(datanum.volume.toFixed(4));
							$(connet.highdata[i]).html(datanum.highdata);
							$(connet.lowdata[i]).html(datanum.lowdata);




							// $(connet.onedata[i]).html();
							$(connet.twodata[i]).html(datanum.changeRate);


							$(connet.onedata[i]).html("￥" + datanum.price);

							// connet.pricedata[i].innerHTML = datanum.price;
							// connet.changeRate[i].innerHTML =  datanum.changeRate;
							// connet.volumedata[i].innerHTML = datanum.volume.toFixed(4);
							// connet.highdata[i].innerHTML = datanum.high;
							// connet.lowdata[i].innerHTML = datanum.low;

							// connet.onedata[i].innerHTML = datanum.price;
							// connet.twodata[i].innerHTML = datanum.changeRate;

							//							connet.yuedengdata[i].innerHTML = '≈'+datanum.cnyPrice+'  CNY';
							if (Number(datanum.change) < 0) {
								// connet.changeRate[i].innerHTML = "<span class=rise>"+datanum.changeRate+"</span><i class='el-icon-caret-bottom rise'></i>"
								$(connet.changeRate[i]).html("<span class=rise>" + datanum.changeRate + "</span><i class='el-icon-caret-bottom rise'></i>");
							} else {
								// connet.changeRate[i].innerHTML = "  <span class=fall>"+datanum.changeRate+"</span> <i class='el-icon-caret-top fall'></i>"
								$(connet.changeRate[i]).html("<span class=fall>" + datanum.changeRate + "</span> <i class='el-icon-caret-top fall'></i>");
							}
						};
					};

				};
				connet.MainData.onerror = function (evnt) {
				};
				connet.MainData.onclose = function (evnt) {
				};
			},
			// 创新区数据推送

			// 点击跳转
			RoutingJump(typenum) {
				var connet = this;
				connet.$router.push({
					path: '/exchange',
					query: {
						code: typenum
					}
				});
			},
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {
			var conent = this;
			conent.MainData.close();
			conent.SecondData.close();
			next()
		},
		created: function () {
			var connet = this;
			connet.GetDatamain();
		},
		mounted() {
		},
		components: {
			"Btclist": Btclist
		}
	}
</script>