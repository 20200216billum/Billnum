<style lang=less>
	@import './coincoin.less';	
</style>
<template>
	<div class="coincoin">
		<div class="coincoin_nav">
			<section class="nav_list">
			  	<section class="Assets_type_box">
			  		<div class="img" v-if="islang == 'Chinese' "></div>
			  		<div class="img2" v-else></div>
			  	</section>
			  	<el-tabs v-model="activeName3" @tab-click="handleClick1">
				    <el-tab-pane label="USDT" name="first">
				    	<h3 class="currency_surface_header">
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[0]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[1]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[2]")}}</p>
				      	</h3>
				      	<Quotation :Marketmain='Marketdatamain1' @modifyfun="modifyshuju"></Quotation>
				    </el-tab-pane>
				    <el-tab-pane label="BTC" name="second">
				    	<h3 class="currency_surface_header">
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[0]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[1]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[2]")}}</p>
				      	</h3>
				      	<Quotation :Marketmain='Marketdatamain2' @modifyfun="modifyshuju"></Quotation>
				    </el-tab-pane>
				    <el-tab-pane label="ETH" name="third">
				    	<h3 class="currency_surface_header">
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[0]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[1]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[2]")}}</p>
				      	</h3>
				      	<Quotation :Marketmain='Marketdatamain3' @modifyfun="modifyshuju"></Quotation>
				    </el-tab-pane>
				</el-tabs>
		      	<section class="Innovate_box"></section>
		      	<section class="announcementWarp">
		        	<TradingNotice></TradingNotice>
		      	</section>
			</section>
		</div>
		<div class="coincoin_mian">
			<div class="Middle_main">
				<div class="Middle_box">
					<Quotationheader :Marketheader="Marketdataheader"></Quotationheader>
					<section class="kine">
						<!-- <iframe :src="'./pcguan/index.html?code='+Marketdataheader.code" width="100%" height="100%;"></iframe> -->
						<iframe :src="'./static/index.html?code='+Marketdataheader.code" width="100%" height="100%;"></iframe>
					</section>
				</div>
				<section class="transaction">
					<div class="transaction_main" v-if='Marketdataheader'>
						<!-- <h2 class="transaction_header">{{$t('coincoin.transaction[10]')}}<span>{{Marketdataheader.stockProductVO.price}}</span>{{Marketdataheader.stockProductVO.code.split('/')[1]}}</h2> -->
						<h3 class="transaction_nav">
					    	<p class="PurchaseData_name">{{$t('coincoin.transaction[11]')}}</p>
					   	 	<p class="PurchaseData_name">{{$t('coincoin.transaction[12]')}}</p>
					    	<p class="PurchaseData_name">{{$t('coincoin.transaction[13]')}}</p>
						</h3>
						<Buyfivetosellfive :DateList="Purchaseshuju" @refreshList1="Buyswitching" @refreshList2="Sellswitching"></Buyfivetosellfive>
					</div>
					<div class="transaction_box">
						<el-tabs v-model="activeName">
						    <el-tab-pane :label="$t('coincoin.Order[2]')" name="first">
						    	<Purchase :ModifyState='false' :Data='fixedPurchase' @modifyfun="Refresh"></Purchase>
						    </el-tab-pane>
						    <el-tab-pane :label="$t('coincoin.Order[3]')" name="second">
						    	<Sellout :ModifyState='true' :Data='marketSellout' @modifyfun="Refresh"></Sellout>
						    </el-tab-pane>
						</el-tabs>
					</div>
				</section>
			</div>
		</div>
		<section class="Commission">
			<h2 class="Commission_header"></h2>
			<section class="Commission_mian">
				<el-tabs v-model="activeName2"  @tab-click="handleClick">
				    <el-tab-pane :label=" $t('coincoin.Commission[0]') " name="first">
				    	<el-table :data="tableData1" style="width: 100%" height="410">
					      	<el-table-column prop="createTime" :label="$t('coincoin.Commission[1]')" width="180px;" align ="center">
					      		<template slot-scope="scope">
							        <span>{{ $public.timestampToTime(scope.row.createTime) }}</span>
							    </template>
					      	</el-table-column>
					      	<el-table-column prop="stockName" :label="$t('coincoin.Commission[2]')" width="100px;" align ="center"></el-table-column>
					      	<el-table-column prop="tradeType" :label="$t('coincoin.Commission[3]')" align ="center">
					      		<template slot-scope="scope">
							        <span v-if="scope.row.tradeType =='1'">{{$t('coincoin.Order[2]')}}</span>
							        <span v-else>{{$t('coincoin.Order[3]')}}</span>
							    </template>
					      	</el-table-column>
					      	<el-table-column prop="entrustPrice" :label="$t('coincoin.Commission[4]')" width="160px;" align ="center">
					      		<template slot-scope="scope">
						      		<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
								    <span v-else>{{scope.row.entrustPrice}}</span>
								</template>
					      	</el-table-column>
					      	<el-table-column prop="dealNum" :label="$t('coincoin.Commission[5]')" width="160px;" align ="center">
					      		<template slot-scope="scope">
					      			<span v-if="scope.row.billPriceType =='1'">
							        	<span v-if="scope.row.tradeType =='1'">{{scope.row.entrustNum}}</span>
								    </span>
								    <span v-else>{{scope.row.dealNum}}</span>
							    </template>
					      	</el-table-column>
					      	<el-table-column prop="state" :label="$t('coincoin.Commission[6]')" align ="center">
					      		<template slot-scope="scope">
							        <span v-if="scope.row.state =='0'">{{$t('coincoin.Order[4]')}}</span>
							        <span v-else-if="scope.row.state =='1'">{{$t('coincoin.Order[5]')}}</span>
							        <span v-else-if="scope.row.state =='2'">{{$t('coincoin.Order[7]')}}</span>
							        <span v-else>{{$t('coincoin.Order[6]')}}</span>
							    </template>
					      	</el-table-column>
					      	<el-table-column prop="totalPrice" :label="$t('coincoin.Commission[7]')" width="180px;" align ="center">
					      		<template slot-scope="scope">
					      			<span v-if="scope.row.totalPrice =='0'">
							        	<span>--</span>
								    </span>
								    <span v-else>{{scope.row.totalPrice}}</span>
							    </template>
					      	</el-table-column>
					      	<el-table-column prop="billPriceType" :label="$t('coincoin.Commission[8]')" align ="center">
					      		<template slot-scope="scope">
							        <span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
							        <span v-else>{{$t('coincoin.Order[1]')}}</span>
							    </template>
					      	</el-table-column>
					      	<el-table-column prop="state" :label="$t('coincoin.Commission[9]')" align ="center">
					      		<template slot-scope="scope">
							        <el-button type="primary" size="mini" @click="cancel(scope.row,scope.$index,tableData1)"  v-if="scope.row.state =='0'">{{$t('coincoin.Order[9]')}}</el-button>
							    </template>
					      	</el-table-column>
					    </el-table>
				    </el-tab-pane>
				   
				
				</el-tabs>
			</section>
		</section>
	</div>
</template>
<script>
	import Purchase from "./transaction/purchase.vue";
	import Sellout from "./transaction/sellout.vue";
	import Quotation from "./Quotation.vue";
	import Quotationheader from "./Quotationheader.vue";
	import Buyfivetosellfive from "./Buyfivetosellfive.vue";
	import TradingNotice from "./tradingNotice.vue";
	
	export default {
		data() {
			return {
				activeName:'first',
				activeName2:"first",
				activeName3:"first",
				marketPurchase:{
					PriceData:"",//价格
					CodeData:"",//code
					DalanceData:"",//账号余额
					Typedata:"",//币种名字
					dealFee1:"",//每手交易手续费
				},  //市价买入
				marketSellout:{
					PriceData:"",//价格
					CodeData:"",//code
					DalanceData:"",//账号余额
					Typedata:"",//币种名字
					dealFee1:"",//每手交易手续费
				},  //市价卖出
				fixedPurchase:{
					PriceData:"",//价格
					CodeData:"",//code
					DalanceData:"",//账号余额
					Typedata:"",//币种名字
					dealFee1:"",//每手交易手续费
				},  //限价买入
				fixedSellout:{
					PriceData:"",//价格
					CodeData:"",//code
					DalanceData:"",//账号余额
					Typedata:"",//币种名字
					dealFee1:"",//每手交易手续费
				},  //市价卖出
				Marketdatamainbox:[],  //行情主数据盒子
				Marketdatamain1:{},  //行情主数据
				Marketdatamain2:{},  //行情主数据
				Marketdatamain3:{},  //行情主数据
				PurchaseData:[], //买卖价数据推送
				Purchaseshuju:[], //买卖价数据
				Marketdataheader:{},///K线图顶部的数据
				tableData1: [],//买入
				tableData2: [],//卖出
				tableData3: [],//全部
				MainData:null, //主数据推送
				SalePriceData:null, //买卖价推送
				Countdown:null,//倒计时
				SwitchingData1:0,//第一个
				SwitchingData2:0,//第二个
				SwitchingData3:0,//第三个
				islang :'Chinese',  //中英文标识
				allCode:{
					usdtCode:'',
					btcCode:'',
					eth:'',
					stockCode:'BTC/USDT' //code标识
				}
				
			}
		},
		watch: {},
		methods: {
			handleClick1:function(){//nav切换
				var _this = this;
				switch (_this.activeName3) {
					case 'first':
						for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
							if(_this.Marketdatamainbox[i].code == _this.Marketdatamain1[_this.SwitchingData1].code){
								_this.Marketdataheader = _this.Marketdatamainbox[i];
								_this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.marketSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
							};
						};
						_this.Orderlist('1',_this.allCode.usdtCode);
						_this.Obtain(_this.Marketdatamain1[_this.SwitchingData1].code);
						_this.Buyfivetosellfive(_this.Marketdatamain1[_this.SwitchingData1].code);
						break;
					case 'second':
						for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
							if(_this.Marketdatamainbox[i].code == _this.Marketdatamain2[_this.SwitchingData2].code){
								_this.Marketdataheader = _this.Marketdatamainbox[i];
								_this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.marketSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
							};
						};
						_this.Orderlist('1',_this.allCode.btcCode);
						_this.Obtain(_this.Marketdatamain2[_this.SwitchingData2].code);
						_this.Buyfivetosellfive(_this.Marketdatamain2[_this.SwitchingData2].code);
						break;
					case 'third':
						for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
							if(_this.Marketdatamainbox[i].code == _this.Marketdatamain3[_this.SwitchingData3].code){
								_this.Marketdataheader = _this.Marketdatamainbox[i];
								_this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.marketSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
							};
						};
						_this.Orderlist('1',_this.allCode.ethCode);
						_this.Obtain(_this.Marketdatamain3[_this.SwitchingData3].code);
						_this.Buyfivetosellfive(_this.Marketdatamain3[_this.SwitchingData3].code);
						break;
					default:
						// statements_def
						break;
						
				};
				
				console.log(_this.Marketdatamainbox[i]);
			},
			modifyshuju:function(envent,typedata){ //nav点击时修改
				var _this = this;
				
				switch (_this.activeName3) {
					case 'first':
						_this.SwitchingData1 = typedata;
						_this.allCode.usdtCode = envent;
						break;
					case 'second':
						_this.SwitchingData2 = typedata;
						_this.allCode.btcCode = envent;
						break;
					case 'third':
						_this.SwitchingData3 = typedata;
						_this.allCode.ethCode = envent;
						break;
					default:
						break;
				};
				for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
					if(_this.Marketdatamainbox[i].code == envent){
						_this.Marketdataheader = _this.Marketdatamainbox[i];
						_this.marketPurchase.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
						_this.marketSellout.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
						_this.fixedPurchase.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
						_this.fixedSellout.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
					};
				};
				_this.Orderlist('1',envent);
				_this.Obtain(envent);
				_this.amount(envent);
				_this.Buyfivetosellfive(envent);
				
			},
			Obtain(codetype){  //获取止盈和止损
				var _this=this;
				var jiashuju = {'stoploss':123,'stopwin':654};

				_this.marketPurchase.CodeData = codetype;
				_this.marketSellout.CodeData = codetype;
				_this.fixedPurchase.CodeData = codetype;
				_this.fixedSellout.CodeData = codetype;


				_this.marketPurchase.Typedata = codetype.split('/')[1];
				_this.marketSellout.Typedata = codetype.split('/')[0];
				_this.fixedPurchase.Typedata = codetype.split('/')[0];
				_this.fixedSellout.Typedata = codetype.split('/')[0];
			},
			Buyfivetosellfive(codetype){	//获取买五卖五数据
				var _this=this;
				var getBuy5Sell5 = {
					code:codetype
				};
				_this.$http.post(_this.$http.getBuy5Sell5,getBuy5Sell5).then((res) => {
					if(res.data.code == '0') {
						_this.Purchaseshuju = res.data.data;
					};
				});
			},
			ServiceCharge(){//获取手续费
				var _this=this;
				_this.$http.post(_this.$http.sysConfig,{type:4,name:'coin_coin_deal_fee'}).then(function(res) {
					if(res.data.code == '0') {
						_this.marketPurchase.dealFee1 = res.data.data[0].value;
						_this.marketSellout.dealFee1 = res.data.data[0].value;
						_this.fixedPurchase.dealFee1 = res.data.data[0].value;
						_this.fixedSellout.dealFee1 = res.data.data[0].value;
					};
				}).catch(function(error) {});
			},
			amount(codetype){  //获取用户余额
				var _this=this;
				var getOneCoinInfo1 = {
					stockCode:codetype.split('/')[0]
				};
				var getOneCoinInfo2 = {
					stockCode:codetype.split('/')[1]
				};
				_this.$http.post(_this.$http.getOneCoinInfo,getOneCoinInfo1).then((res) => {
					if(res.data.code == 0) {
						_this.marketSellout.DalanceData = res.data.data.usableFund;
						_this.fixedSellout.DalanceData = res.data.data.usableFund;
					}else {
						_this.marketSellout.DalanceData = '0';
						_this.fixedSellout.DalanceData = '0';
					}
				});
				_this.$http.post(_this.$http.getOneCoinInfo,getOneCoinInfo2).then((res) => {
					if(res.data.code == 0) {
						_this.marketPurchase.DalanceData = res.data.data.usableFund;
						_this.fixedPurchase.DalanceData = res.data.data.usableFund;
						_this.ServiceCharge();
					}else {
						_this.marketPurchase.DalanceData = '0';
						_this.fixedPurchase.DalanceData = '0';
					}
				});
			},
			Buyswitching(price){//买价切换
				var _this=this;
				_this.marketSellout.PriceData = price;
			},
			Sellswitching(price){//卖价切换
				var _this=this;
				_this.fixedPurchase.PriceData = price;
			},
			getdatamain(){  //获取数据
				var _this=this;
				$.post(_this.$http.conlist, {type:"4",code:'USDT'}, function(result) {
					if(result.code == "0") {
						_this.Marketdatamain1 = result.data;
						_this.Marketdataheader = result.data[0];
						for (var i = 0; i < result.data.length; i++) {
							_this.Marketdatamainbox.push(result.data[i]);
						};
						_this.marketPurchase.PriceData = _this.Marketdataheader.stockProductVO.price;
						_this.marketSellout.PriceData = _this.Marketdataheader.stockProductVO.price;
						_this.fixedPurchase.PriceData = _this.Marketdataheader.stockProductVO.price;
						_this.fixedSellout.PriceData = _this.Marketdataheader.stockProductVO.price;
						_this.Obtain(_this.Marketdataheader.stockProductVO.code);
						_this.amount(_this.Marketdataheader.stockProductVO.code);
						_this.Buyfivetosellfive(_this.Marketdataheader.stockProductVO.code);
						_this.SalePriceDatapush();
						_this.getdatamain1();
					};
				});
				window.setTimeout(function(){
					this.MainDatapush();
				},1500);
			},
			getdatamain1(){
				var _this=this;
				$.post(_this.$http.conlist, {type:"4",code:'BTC'}, function(result) {
					if(result.code == "0") {
						_this.Marketdatamain2 = result.data;
						for (var i = 0; i < result.data.length; i++) {
							_this.Marketdatamainbox.push(result.data[i]);
						};
						_this.getdatamain2();
					}
				});
			},
			getdatamain2(){
				var _this=this;
				$.post(_this.$http.conlist, {type:"4",code:'ETH'}, function(result) {
					if(result.code == "0") {
						_this.Marketdatamain3 = result.data;
						for (var i = 0; i < result.data.length; i++) {
							_this.Marketdatamainbox.push(result.data[i]);
						};
						console.log(_this.Marketdatamain1)
					}
				});
			},
			MainDatapush() {  // 主区数据推送
				var connet = this;
				var dommain = document.getElementsByClassName('MainArea_list'),codedata = [],pricedata = [],changePercentagedata = [];
				for (var i = 0; i < dommain.length; i++) {
						codedata[i] = dommain[i].getAttribute('data_code');
						pricedata[i] = dommain[i].children[1];
						changePercentagedata[i] = dommain[i].children[2];
				};
				// 首先判断是否 支持 WebSocket
				if('WebSocket' in window) {
					connet.MainData = new WebSocket(connet.$http.MainwsUrl);
				} else if('MozWebSocket' in window) {
					connet.MainData = new MozWebSocket(connet.$http.MainwsUrl);
				} else {
					connet.MainData = new SockJS(connet.$http.MainskUrl);
				};
				// 打开时
				connet.MainData.onopen = function(evnt) {
					var msg = {
						type: "vb_ticke_chanKey"
					};
					connet.MainData.send(JSON.stringify(msg));  // 发送消息
				};
				// 处理消息时
				connet.MainData.onmessage = function(evnt) {
					var datanum = JSON.parse(evnt.data);
					for (var i = 0; i < codedata.length; i++) {
						if(codedata[i] == datanum.code){
							if(Number(datanum.change) < 0){
								pricedata[i].innerHTML = " <span class=fall>"+datanum.price+"</span>";
								changePercentagedata[i].innerHTML = " <span class=fall>"+datanum.changeRate+"</span><i class='el-icon-caret-bottom fall'></i>";
							}else{
								pricedata[i].innerHTML = " <span class=rise>"+datanum.price+"</span>";
								changePercentagedata[i].innerHTML = " <span class=rise>"+datanum.changeRate+"</span><i class='el-icon-caret-top rise'></i>";
							};
						};
						if(connet.Marketdatamainbox[i].stockProductVO.code ==  datanum.code){
							connet.Marketdatamainbox[i].stockProductVO = datanum;
						};
						if(connet.Marketdataheader.stockProductVO.code ==  datanum.code){
							connet.Marketdataheader.stockProductVO = datanum;
						};
					};

				};
				connet.MainData.onerror = function(evnt) {
				};
				connet.MainData.onclose = function(evnt) {
				};
			},
			SalePriceDatapush(type) {// 买卖价推送
				var connet = this,
					sellbuytype = true;
				// 首先判断是否 支持 WebSocket
				if('WebSocket' in window) {
					connet.SalePriceData = new WebSocket(connet.$http.MainwsUrl);
				} else if('MozWebSocket' in window) {
					connet.SalePriceData = new MozWebSocket(connet.$http.MainwsUrl);
				} else {
					connet.SalePriceData = new SockJS(connet.$http.MainwsUrl);
				}
				// 打开时
				connet.SalePriceData.onopen = function(evnt) {
					var msg = {
						type: "vb_depth_chanKey"
					};
					// 发送消息
					connet.SalePriceData.send(JSON.stringify(msg));
				};
				// 处理消息时
				connet.SalePriceData.onmessage = function(evnt) {
					var datanum = JSON.parse(evnt.data);
					if(connet.Purchaseshuju.code == datanum.code){
						connet.Purchaseshuju = datanum;
					}
				};
				connet.SalePriceData.onerror = function(evnt) {
					console.log("  websocket.onerror");
				};
				connet.SalePriceData.onclose = function(evnt) {
					console.log("  websocket.onclose");
				};
			},
			Refresh(){//刷新信息
				var _this = this;
				_this.amount(_this.marketPurchase.CodeData);
				switch (_this.activeName2) {
					case "first":
						_this.Orderlist('1');
						break;
					case "second":
						_this.Orderlist('2');
						break;
					case "third":
						_this.Orderlist('3');
						break;
					default:
						_this.Orderlist('1');
						break;
				};
			},
			handleClick(){
				var _this = this;
				switch (_this.activeName2) {
					case "first":
						_this.Orderlist('1');
						break;
					case "second":
						_this.Orderlist('2');
						break;
					case "third":
						_this.Orderlist('3');
						break;
					default:
						_this.Orderlist('1');
						break;
				};
			},
			cancel(row,index,tableData1){//取消委托
				var _this = this;
//				var tradeType = '';
//				if(row.tradeType){
//					tradeType = '1';
//				}else {
//					tradeType = '2';
//				}
				var cancelBill = {
					tradeType:row.tradeType,//1:买入，2:卖出
					orderId:row.id, //交易订单id
				};
				_this.$http.post(_this.$http.cancelBill,cancelBill).then((res) => {  
					_this.$message({
				          	message: res.data.msg,
				          	type: 'success'
				        });
					if(res.data.code == 0){
						 tableData1.splice(index, 1);
					}
				});
			},
			Orderlist(numtype,stockCode){//订单列表
				if(!stockCode){
					stockCode = 'BTC/USDT'
				}
				var _this = this;
				var selCoinCoin = {
					stockCode:  stockCode,
				};
				_this.$http.post(_this.$http.coinCoinEntrustIng,selCoinCoin).then((res) => {
					if(res.data.code == '0') {
						switch (numtype) {
							case '1':
								_this.tableData1 = res.data.data.list;
								break;
							case '2':
								_this.tableData2 = res.data.data.list;
								break;
							case '3':
								_this.tableData3 = res.data.data.list;
								break;
							default:
								_this.tableData1 = res.data.data.list;
								break;
						};						
					};
				});
			},
			Countdowntime(){//定时刷新
				var _this = this;
				_this.Countdown = window.setInterval(function(){
					// _this.Orderlist();
				},3000); 
			},
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {
			var _this = this;
			if(_this.MainData){
				_this.MainData.close();
			};
			if (_this.SalePriceData) {
				_this.SalePriceData.close();
			};
			window.clearInterval(_this.Countdown);
			next();
		},
		created: function(){
			var _this=this;
			_this.getdatamain();
			_this.Orderlist('1');
			_this.Countdowntime();
			if(_this.$cookies.get('language')){
				_this.islang = _this.$cookies.get('language');
			}
		},
		components: {
			"Purchase":Purchase,
			"Sellout":Sellout,
			"Quotation":Quotation,
			"Quotationheader":Quotationheader,
			'Buyfivetosellfive':Buyfivetosellfive,
			'TradingNotice': TradingNotice,
		}
	}
</script>