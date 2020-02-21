<style lang=less>
	@import './coincoin.less';
</style>
<template>
	<div class="coincoin">
		<div class="coincoin_nav">
			<section class="nav_list">
				<section class="Assets_type_box">
					<div class="img" v-if="islange == 'zh' "></div>
			  		<div class="img2" v-else></div>
				</section>
				<el-tabs class='coin_list_table' v-model="activeName3" @tab-click="handleClick1">
					<el-tab-pane label="USDT" name="first">
						<h3 class="currency_surface_header">
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[0]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[1]")}}</p> 
				      		<p class="currency_surface_list">{{$t("coincoin.coincoin_nav[2]")}}</p>
				      	</h3>
						<Quotation :Marketmain='Marketdatamain1' @modifyfun="modifyshuju"></Quotation>
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
						<!-- <iframe :src="'./pcguan/index.html?timers=15&code='+Marketdataheader.code" width="100%" height="100%;"></iframe>  -->
						<iframe :src="'./static/index.html?code='+Marketdataheader.code" width="100%" height="100%;"></iframe>
					</section>
				</div>
				<!-- 盘口信息 -->
				<section class="transaction">
					<div class="transaction_box">
						<el-tabs v-model="activeName">
							<!-- 市价交易 -->
							<el-tab-pane :label="$t('coincoin.transaction[0]') + Marketdataheader.code.slice(0,3)" name="first">
								<!-- 买入 -->
								<Purchase :ModifyState='true' :Data='marketPurchase' @modifyfun="Refresh"></Purchase>
								<!-- 卖出 -->
								<Sellout :ModifyState='true' :Data='marketSellout' @modifyfun="Refresh"></Sellout>
							</el-tab-pane>
							<!-- 限价交易 -->
							<el-tab-pane :label="$t('coincoin.transaction[7]') + Marketdataheader.code.slice(0,3)" name="second">
								<!-- 买入 -->
								<Purchase :ModifyState='false' :Data='fixedPurchase' @modifyfun="Refresh"></Purchase>
								<!-- 卖出 -->
								<Sellout :ModifyState='false' :Data='fixedSellout' @modifyfun="Refresh"></Sellout>
							</el-tab-pane>
						</el-tabs>
					</div>
					<div class="transaction_main" v-if='Marketdataheader'>
						<h2 class="transaction_header">{{$t('coincoin.transaction[10]')}}<span>{{Marketdataheader.stockProductVO.price}}</span>{{Marketdataheader.stockProductVO.code.split('/')[1]}}</h2>
						<h3 class="transaction_nav">
					    	<p class="PurchaseData_name">{{$t('coincoin.transaction[11]')}}</p>
					   	 	<p class="PurchaseData_name">{{$t('coincoin.transaction[12]')}}</p>
					    	<p class="PurchaseData_name">{{$t('coincoin.transaction[13]')}}</p>
						</h3>
						<Buyfivetosellfive :DateList="Purchaseshuju" @refreshList1="Buyswitching" @refreshList2="Sellswitching"></Buyfivetosellfive>
					</div>
				</section>
			</div> 
			<section class="Commission">
				<section class="Commission_mian">
					<h2 class="Commission_header">{{$t('coincoin.tableTitle[0]')}}</h2>
					<el-tabs v-model="activeName2" @tab-click="handleClick">
						<!--买入-->
						<el-tab-pane :label="$t('coincoin.Order2[0]')" name="first">
							<el-table :data="tableData1" style="width: 100%" height="300">
								<el-table-column prop="stockName" :label="$t('coincoin.Commission[2]')" width="140px;" align="center"></el-table-column>
								<el-table-column prop="createTime" :label="$t('coincoin.Commission[1]')" width="200px;" align="center">
									<template slot-scope="scope">
										<span>{{ $public.timestampToTime(scope.row.createTime) }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="tradeType" :label="$t('coincoin.Commission[3]')" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.tradeType =='1'" class="green">{{$t('coincoin.Order[2]')}}</span>
										<span v-else class="red">{{$t('coincoin.Order[3]')}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="entrustPrice" :label="$t('coincoin.Commission[4]')" width="100px;" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
										<span v-else>{{scope.row.entrustPrice}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="dealNum" :label="$t('coincoin.Commission[5]')" width="160px;" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.dealNum">
									    	{{scope.row.dealNum}}
									    </span>
										<span v-else>--</span>
									</template>
								</el-table-column>
								<el-table-column prop="entrustNum" :label="$t('coincoin.Commission2[0]')" width="160px;" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.entrustNum }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="totalPrice" :label="$t('coincoin.Commission2[1]')" width="160px;" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.totalPrice }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="rrr" :label="$t('coincoin.Commission2[2]')" width="180px;" align="center">
									<template slot-scope="scope">
										<span>{{ $public.toLowFixed((scope.row.dealPrice  * scope.row.entrustNum),4,0) }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="dealPrice" :label="$t('coincoin.Commission2[3]')" width="180px;" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.dealPrice}}</span>
									</template>
								</el-table-column>

								<el-table-column prop="billPriceType" :label="$t('coincoin.Commission[8]')" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
										<span v-else>{{$t('coincoin.Order[1]')}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="state" :label="$t('coincoin.Commission[9]')" align="center">
									<template slot-scope="scope">
										<el-button type="primary" size="mini" @click="cancel(scope.row)">{{$t('coincoin.Order[9]')}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<!--卖出-->
						<el-tab-pane :label="$t('coincoin.Order2[1]')" name="second">
							<el-table :data="tableData2" style="width: 100%" height="300">
								<el-table-column prop="stockName" :label="$t('coincoin.Commission[2]')" width="140px;" align="center"></el-table-column>
								<el-table-column prop="createTime" :label="$t('coincoin.Commission[1]')" width="200px;" align="center">
									<template slot-scope="scope">
										<span>{{ $public.timestampToTime(scope.row.createTime) }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="tradeType" :label="$t('coincoin.Commission[3]')" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.tradeType =='1'" class="green">{{$t('coincoin.Order[2]')}}</span>
										<span v-else class="red">{{$t('coincoin.Order[3]')}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="entrustPrice" :label="$t('coincoin.Commission[4]')" width="100px;" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
										<span v-else>{{scope.row.entrustPrice}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="dealNum" :label="$t('coincoin.Commission[5]')" width="160px;" align="center">
									<template slot-scope="scope">
										<span>{{scope.row.dealNum}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="entrustNum" :label="$t('coincoin.Commission2[0]')" width="160px;" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.entrustNum }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="dealPrice" :label="$t('coincoin.Commission2[3]')" width="180px;" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.dealPrice}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="rrr" :label="$t('coincoin.Commission2[2]')" width="180px;" align="center">
									<template slot-scope="scope">
										<span>{{ $public.toLowFixed((scope.row.dealPrice  * scope.row.entrustNum),4,0) }}</span>
									</template>
								</el-table-column>

								<el-table-column prop="billPriceType" :label="$t('coincoin.Commission[8]')" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
										<span v-else>{{$t('coincoin.Order[1]')}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="state" :label="$t('coincoin.Commission[9]')" align="center">
									<template slot-scope="scope">
										<el-button type="primary" size="mini" @click="cancel(scope.row)" >{{$t('coincoin.Order[9]')}}</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</section>
			</section>
			<section class="Commission">
				<section class="Commission_mian">
					<h2 class="Commission_header">{{$t('coincoin.tableTitle[1]')}}</h2>
					<el-tabs v-model="activeName4" @tab-click="handleClick2">
						<!--买入-->
						<el-tab-pane :label="$t('coincoin.Order[2]')" name="first" class="first">
							<el-table :data="requestData3" style="width: 100%" height="300">
								<!-- 交易对象 -->
								<el-table-column prop="stockName" :label="$t('bbOrder.conent[9]')" min-width="100" align="center">
								</el-table-column>
								<!-- 委托时间 -->
								<el-table-column prop="createTime" :label="$t('bbOrder.conent[8]')" min-width="160" align="center">
									<template slot-scope="scope">
										<div>{{ $public.timestampToTime(scope.row.createTime) }}</div>
									</template>
								</el-table-column>
								<!-- 方向 -->
								<el-table-column prop="tradeType" :label="$t('bbOrder.conent[10]')" min-width="100" align="center">
									<template slot-scope="scope">
										<div v-if="scope.row.tradeType == 1 " class="green">{{$t('bbOrder.conent[11]')}}</div>
										<div v-else class="red">{{$t('bbOrder.conent[12]')}}</div>
									</template>
								</el-table-column>
								<!-- 委托价格 -->
								<el-table-column prop="entrustPrice" :label="$t('bbOrder.conent[13]')" min-width="160" align="center">
									<template slot-scope="scope">
							      		<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
									    <span v-else>{{scope.row.entrustPrice}}</span>
									</template>
								</el-table-column>
								<!-- 委托数量/金额 -->
								<el-table-column prop="entrustNum" :label="$t('bbOrder.conent[14]')" min-width="120" align="center">
									<template slot-scope="scope">
						      			<!--市价 买入 显示总金额-->
						      			<span v-if=' scope.row.tradeType == 1 && scope.row.billPriceType == 1' >
						      				<span v-if="!scope.row.totalPrice">--</span>
											<span v-else>{{ scope.row.totalPrice }}</span>
						      			</span>
						      			<span v-else>
					      					<span v-if="!scope.row.dealNum">--</span>
											<span v-else>{{ scope.row.dealNum }}</span>
						      			</span>
								   </template>	
								</el-table-column>
								<!-- 成交均价 -->
								<el-table-column prop="dealPrice" :label="$t('bbOrder.conent[1]')" min-width="160" align="center">
									<template slot-scope="scope">
										<span v-if="!scope.row.dealPrice">--</span>
										<span v-else>{{ scope.row.dealPrice }}</span>
									</template>
								</el-table-column>
								<!-- 成交数量 -->
								<el-table-column prop="entrustNum" :label="$t('bbOrder.conent[2]')" min-width="180" align="center">
									<template slot-scope="scope">
										<span v-if="!scope.row.entrustNum">--</span>
										<span v-else>{{ scope.row.entrustNum }}</span>
									</template>
								</el-table-column>
								<!-- 成交金额 -->
								<el-table-column prop="totalPrice" :label="$t('bbOrder.conent[3]')" min-width="160" align="center">
									<template slot-scope="scope">
										<span>{{ $public.toLowFixed((scope.row.dealPrice  * scope.row.entrustNum),4,0) }}</span>
									</template>
									
								</el-table-column>
								<!-- 成交时间 -->
								<el-table-column prop="dealTime" :label="$t('bbOrder.conent[0]')" min-width="160" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.dealTime==0">--</span>
										<span v-else>{{ $public.timestampToTime(scope.row.dealTime) }}</span>
									</template>
								</el-table-column>
								<!-- 手续费 -->
								<el-table-column prop="tradeType" :label="$t('bbOrder.conent[4]')" min-width="130" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.tradeType == 1 ">{{ $public.toLowFixed((scope.row.iniFee - scope.row.fee),4,0) }}</span>
										<span v-else>{{scope.row.fee}}</span>
									</template>
								</el-table-column>
								<!-- 类型 -->
								<el-table-column prop="billPriceType" :label="$t('bbOrder.conent[5]')" min-width="100" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.billPriceType ==2">{{$t('bbOrder.conent[6]')}}</span>
										<span v-else>{{$t('bbOrder.conent[7]')}}</span>
									</template>
								</el-table-column>
								<!-- 状态 -->
								<el-table-column prop="state " :label="$t('bbOrder.conent[15]')" min-width="160" align="center">
									<template slot-scope="scope">
										<div v-if="scope.row.state  == 0">{{$t('bbOrder.conent[16]')}}</div>
										<div v-else-if="scope.row.state  == 1">{{$t('bbOrder.conent[17]')}}</div>
										<div v-else-if="scope.row.state  == 2">{{$t('bbOrder.conent[18]')}}</div>
										<div v-else>{{$t('bbOrder.conent[19]')}}</div>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<!--卖出-->
						<el-tab-pane :label="$t('coincoin.Order[3]')" name="second" class="second">
							<el-table :data="requestData4" style="width: 100%" height="300">
								<!-- 交易对象 -->
								<el-table-column prop="stockName" :label="$t('bbOrder.conent[9]')" min-width="100" align="center">
								</el-table-column>
								<!-- 委托时间 -->
								<el-table-column prop="createTime" :label="$t('bbOrder.conent[8]')" min-width="160" align="center">
									<template slot-scope="scope">
										<div>{{ $public.timestampToTime(scope.row.createTime) }}</div>
									</template>
								</el-table-column>
								<!-- 方向 -->
								<el-table-column prop="tradeType" :label="$t('bbOrder.conent[10]')" min-width="100" align="center">
									<template slot-scope="scope">
										<div v-if="scope.row.tradeType == 1 " class="green">{{$t('bbOrder.conent[11]')}}</div>
										<div v-else class="red">{{$t('bbOrder.conent[12]')}}</div>
									</template>
								</el-table-column>
								<!-- 委托价格 -->
								<el-table-column prop="entrustPrice" :label="$t('bbOrder.conent[13]')" min-width="160" align="center">
									<template slot-scope="scope">
							      		<span v-if="scope.row.billPriceType =='1'">{{$t('coincoin.Order[0]')}}</span>
									    <span v-else>{{scope.row.entrustPrice}}</span>
									</template>
								</el-table-column>
								<!-- 委托数量/金额 -->
								<el-table-column prop="entrustNum" :label="$t('bbOrder.conent[14]')" min-width="120" align="center">
									<template slot-scope="scope">
						      			<!--市价 买入 显示总金额-->
						      			<span v-if=' scope.row.tradeType == 1 && scope.row.billPriceType == 1' >
						      				<span v-if="!scope.row.totalPrice">--</span>
											<span v-else>{{ scope.row.totalPrice }}</span>
						      			</span>
						      			<span v-else>
					      					<span v-if="!scope.row.dealNum">--</span>
											<span v-else>{{ scope.row.dealNum }}</span>
						      			</span>
								   </template>	
								</el-table-column>
								<!-- 成交均价 -->
								<el-table-column prop="dealPrice" :label="$t('bbOrder.conent[1]')" min-width="160" align="center">
									<template slot-scope="scope">
										<span v-if="!scope.row.dealPrice">--</span>
										<span v-else>{{ scope.row.dealPrice }}</span>
									</template>
								</el-table-column>
								<!-- 成交数量 -->
								<el-table-column prop="entrustNum" :label="$t('bbOrder.conent[2]')" min-width="180" align="center">
									<template slot-scope="scope">
										<span v-if="!scope.row.entrustNum">--</span>
										<span v-else>{{ scope.row.entrustNum }}</span>
									</template>
								</el-table-column>
								<!-- 成交金额 -->
								<el-table-column prop="totalPrice" :label="$t('bbOrder.conent[3]')" min-width="160" align="center">
									<template slot-scope="scope">
										<span>{{ $public.toLowFixed((scope.row.dealPrice  * scope.row.entrustNum),4,0) }}</span>
									</template>
									
								</el-table-column>
								<!-- 成交时间 -->
								<el-table-column prop="dealTime" :label="$t('bbOrder.conent[0]')" min-width="160" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.dealTime==0">--</span>
										<span v-else>{{ $public.timestampToTime(scope.row.dealTime) }}</span>
									</template>
								</el-table-column>
								<!-- 手续费 -->
								<el-table-column prop="tradeType" :label="$t('bbOrder.conent[4]')" min-width="130" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.tradeType == 1 ">{{$public.toLowFixed((scope.row.iniFee - scope.row.fee),4,0) }}</span>
										<span v-else>{{scope.row.fee}}</span>
									</template>
								</el-table-column>
								<!-- 类型 -->
								<el-table-column prop="billPriceType" :label="$t('bbOrder.conent[5]')" min-width="100" align="center">
									<template slot-scope="scope">
										<span v-if="scope.row.billPriceType ==2">{{$t('bbOrder.conent[6]')}}</span>
										<span v-else>{{$t('bbOrder.conent[7]')}}</span>
									</template>
								</el-table-column>
								<!-- 状态 -->
								<el-table-column prop="state " :label="$t('bbOrder.conent[15]')" min-width="160" align="center">
									<template slot-scope="scope">
										<div v-if="scope.row.state  == 0">{{$t('bbOrder.conent[16]')}}</div>
										<div v-else-if="scope.row.state  == 1">{{$t('bbOrder.conent[17]')}}</div>
										<div v-else-if="scope.row.state  == 2">{{$t('bbOrder.conent[18]')}}</div>
										<div v-else>{{$t('bbOrder.conent[19]')}}</div>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</section>
			</section>
			<section class="personal">
				<h2 class="personal_header">{{$t('coincoin.tableTitle[2]')}}</h2>
				<div class="personal_box">
					<ul class="personal_left">
						<h2 class="left_header">{{Marketdataheader.code}}</h2>
						<h3 class="left_text">{{Marketdataheader.name}}</h3>
						<h4 class="left_main">{{Marketdataheader.remark}}</h4>
					</ul>
					<ul class="personal_right">
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[3]')}}：</p>
							<p class="right_text">{{Marketdataheader.publishTime}}</p>
						</li>
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[4]')}}：</p>
							<p class="right_text">{{Marketdataheader.publishNum}}</p>
						</li>
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[5]')}}：</p>
							<p class="right_text">{{Marketdataheader.flowNum}}</p>
						</li>
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[6]')}}：</p>
							<p class="right_text">{{Marketdataheader.crowdPrice}}</p>
						</li>
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[7]')}}：</p>
							<p class="right_text">{{Marketdataheader.whitePaper}}</p>
						</li>
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[8]')}}：</p>
							<p class="right_text">{{Marketdataheader.publishWeb}}</p>
						</li>
						<li class="right_list">
							<p class="right_name">{{$t('coincoin.tableTitle[9]')}}：</p>
							<p class="right_text">{{Marketdataheader.blockSearch}}</p>
						</li>
					</ul>
				</div>
			</section>
		</div>
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
				islange:'zh',
				activeName: 'second',
				activeName2: "first",
				activeName3: "first",
				activeName4: "first",
				marketPurchase: {
					PriceData: "", //价格
					CodeData: "", //code
					DalanceData: "", //账号余额
					Typedata: "", //币种名字
					dealFee1: "", //每手交易手续费
				}, //市价买入
				marketSellout: {
					PriceData: "", //价格
					CodeData: "", //code
					DalanceData: "", //账号余额
					Typedata: "", //币种名字
					dealFee1: "", //每手交易手续费
				}, //市价卖出
				fixedPurchase: {
					PriceData: "", //价格
					CodeData: "", //code
					DalanceData: "", //账号余额
					Typedata: "", //币种名字
					dealFee1: "", //每手交易手续费
				}, //限价买入
				fixedSellout: {
					PriceData: "", //价格
					CodeData: "", //code
					DalanceData: "", //账号余额
					Typedata: "", //币种名字
					dealFee1: "", //每手交易手续费
				}, //市价卖出
				Marketdatamainbox: [], //行情主数据盒子
				Marketdatamain1: {}, //行情主数据
				Marketdatamain2: {}, //行情主数据
				Marketdatamain3: {}, //行情主数据
				PurchaseData: [], //买卖价数据推送
				Purchaseshuju: [], //买卖价数据
				Marketdataheader: {}, ///K线图顶部的数据
				tableData1: [], //买入
				tableData2: [], //卖出
				requestData3: [],//全部委托
				requestData4: [],//历史成交
				MainData: null, //主数据推送
				SalePriceData: null, //买卖价推送
				Countdown: null, //倒计时
				SwitchingData1: 0, //第一个
				allCode:{
					usdtCode:'',
					btcCode:'',
					ethCode:'',
				}
			}
		},
		watch: {},
		methods: {
			handleClick1: function() { //nav切换
				var _this = this;
				switch(_this.activeName3) {
					case 'first':
						for(var i = 0; i < _this.Marketdatamainbox.length; i++) {
							if(_this.Marketdatamainbox[i].code == _this.Marketdatamain1[_this.SwitchingData1].code) {
								_this.Marketdataheader = _this.Marketdatamainbox[i];
								_this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.marketSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
							};
						};
						if(!_this.allCode.usdtCode){
							_this.allCode.usdtCode = 'BCH/USDT';
						}
						_this.Orderlist('1',_this.allCode.usdtCode);
						_this.Orderlist('2',_this.allCode.usdtCode);
						_this.Obtain(_this.Marketdatamain1[_this.SwitchingData1].code);
						_this.Buyfivetosellfive(_this.Marketdatamain1[_this.SwitchingData1].code);
						break;
					case 'second':
						for(var i = 0; i < _this.Marketdatamainbox.length; i++) {
							if(_this.Marketdatamainbox[i].code == _this.Marketdatamain2[_this.SwitchingData2].code) {
								_this.Marketdataheader = _this.Marketdatamainbox[i];
								_this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.marketSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
							};
						};
						if(!_this.allCode.btcCode){
							_this.allCode.btcCode = 'BCH/BTC';
						}
						_this.Orderlist('1',_this.allCode.btcCode);
						_this.Orderlist('2',_this.allCode.btcCode);
						_this.Obtain(_this.Marketdatamain2[_this.SwitchingData2].code);
						_this.Buyfivetosellfive(_this.Marketdatamain2[_this.SwitchingData2].code);
						break;
					case 'third':
						for(var i = 0; i < _this.Marketdatamainbox.length; i++) {
							if(_this.Marketdatamainbox[i].code == _this.Marketdatamain3[_this.SwitchingData3].code) {
								_this.Marketdataheader = _this.Marketdatamainbox[i];
								_this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.marketSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedPurchase.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
								_this.fixedSellout.PriceData = Number(_this.Marketdatamainbox[i].stockProductVO.price);
							};
						};
						if(!_this.allCode.ethCode){
							_this.allCode.ethCode = 'BTC/ETH';
						}
						_this.Orderlist('1',_this.allCode.ethCode);
						_this.Orderlist('2',_this.allCode.ethCode);
						_this.Obtain(_this.Marketdatamain3[_this.SwitchingData3].code);
						_this.Buyfivetosellfive(_this.Marketdatamain3[_this.SwitchingData3].code);
						break;
					default:
						// statements_def
						break;
				};
			},
			modifyshuju: function(envent, typedata) { //nav点击时修改
				var _this = this;
				switch(_this.activeName3) {
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
				for(var i = 0; i < _this.Marketdatamainbox.length; i++) {
					if(_this.Marketdatamainbox[i].code == envent) {
						_this.Marketdataheader = _this.Marketdatamainbox[i];
						_this.marketPurchase.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
						_this.marketSellout.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
						_this.fixedPurchase.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
						_this.fixedSellout.PriceData = _this.Marketdatamainbox[i].stockProductVO.price;
					};
				};
				_this.Orderlist('1',envent);
				_this.Orderlist('2',envent);
				_this.Historyorder('1',envent);
				_this.Historyorder('2',envent);
				_this.Obtain(envent);
				_this.Refresh(envent);
				_this.Buyfivetosellfive(envent);
			},
			Obtain(codetype) { //获取止盈和止损
				var _this = this;
				var jiashuju = {
					'stoploss': 123,
					'stopwin': 654
				};

				_this.marketPurchase.CodeData = codetype;
				_this.marketSellout.CodeData = codetype;
				_this.fixedPurchase.CodeData = codetype;
				_this.fixedSellout.CodeData = codetype;

				_this.marketPurchase.Typedata = codetype.split('/')[1];
				_this.marketSellout.Typedata = codetype.split('/')[0];
				_this.fixedPurchase.Typedata = codetype.split('/')[0];
				_this.fixedSellout.Typedata = codetype.split('/')[0];
			},
			Buyfivetosellfive(codetype) { //获取买五卖五数据
				var _this = this;
				var getBuy5Sell5 = {
					code: codetype
				};
				_this.$http.post(_this.$http.getBuy5Sell5, getBuy5Sell5).then((res) => {
					if(res.data.code == '0') {
						_this.Purchaseshuju = res.data.data;
					};
				});
			},
			ServiceCharge() { //获取手续费
				var _this = this;
				_this.$http.post(_this.$http.sysConfig, {
					type: 4,
					name: 'coin_coin_deal_fee'
				}).then(function(res) {
					if(res.data.code == '0') {
						_this.marketPurchase.dealFee1 = res.data.data[0].value;
						_this.marketSellout.dealFee1 = res.data.data[0].value;
						_this.fixedPurchase.dealFee1 = res.data.data[0].value;
						_this.fixedSellout.dealFee1 = res.data.data[0].value;
					};
				}).catch(function(error) {});
			},
			amount(codetype) { //获取用户余额
				var _this = this;
				var getOneCoinInfo1 = {
					stockCode: codetype.split('/')[0]
				};
				var getOneCoinInfo2 = {
					stockCode: codetype.split('/')[1]
				};
				_this.$http.post(_this.$http.getOneCoinInfo, getOneCoinInfo1).then((res) => {
					if(res.data.code == 0) {
						_this.marketSellout.DalanceData = res.data.data.usableFund;
						_this.fixedSellout.DalanceData = res.data.data.usableFund;
					} else {
						_this.marketSellout.DalanceData = '0';
						_this.fixedSellout.DalanceData = '0';
					}
				});
				_this.$http.post(_this.$http.getOneCoinInfo, getOneCoinInfo2).then((res) => {
					if(res.data.code == 0) {
						_this.marketPurchase.DalanceData = res.data.data.usableFund;
						_this.fixedPurchase.DalanceData = res.data.data.usableFund;
						_this.ServiceCharge();
					} else {
						_this.marketPurchase.DalanceData = '0';
						_this.fixedPurchase.DalanceData = '0';
					}
				});
			},
			Buyswitching(price) { //买价切换
				var _this = this;
				_this.marketSellout.PriceData = price;
			},
			Sellswitching(price) { //卖价切换
				var _this = this;
				_this.fixedPurchase.PriceData = price;
			},
			getdatamain() { //获取数据
				var _this = this;
				$.post(_this.$http.conlist, {
					type: "4",
					code: 'USDT'
				}, function(result) {
					if(result.code == "0") {
						_this.Marketdatamain1 = result.data;
						_this.Marketdataheader = result.data[0];
						for(var i = 0; i < result.data.length; i++) {
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
					};
				});
				window.setTimeout(function() {
					this.MainDatapush();
				}, 1500);
			},
			MainDatapush() { // 主区数据推送
				var connet = this;
				var dommain = document.getElementsByClassName('MainArea_list'),
					codedata = [],
					pricedata = [],
					changePercentagedata = [];
				for(var i = 0; i < dommain.length; i++) {
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
					connet.MainData.send(JSON.stringify(msg)); // 发送消息
				};
				// 处理消息时
				connet.MainData.onmessage = function(evnt) {
					var datanum = JSON.parse(evnt.data);
					for(var i = 0; i < codedata.length; i++) {
						if(codedata[i] == datanum.code) {
							if(Number(datanum.change) < 0) {
								pricedata[i].innerHTML = " <span class=fall>" + datanum.price + "</span>";
								changePercentagedata[i].innerHTML = " <span class=fall>" + datanum.changeRate + "</span><i class='el-icon-caret-bottom fall'></i>";
							} else {
								pricedata[i].innerHTML = " <span class=rise>" + datanum.price + "</span>";
								changePercentagedata[i].innerHTML = " <span class=rise>" + datanum.changeRate + "</span><i class='el-icon-caret-top rise'></i>";
							};
						};
						if(connet.Marketdatamainbox[i].stockProductVO.code == datanum.code) {
							connet.Marketdatamainbox[i].stockProductVO = datanum;
						};
						if(connet.Marketdataheader.stockProductVO.code == datanum.code) {
							connet.Marketdataheader.stockProductVO = datanum;
						};
					};

				};
				connet.MainData.onerror = function(evnt) {
				};
				connet.MainData.onclose = function(evnt) {
				};
			},
			SalePriceDatapush(type) { // 买卖价推送
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
					if(connet.Purchaseshuju.code == datanum.code) {
						connet.Purchaseshuju = datanum;
					}
				};
				connet.SalePriceData.onerror = function(evnt) {
				};
				connet.SalePriceData.onclose = function(evnt) {
				};
			},
			Refresh() { //刷新信息
				var _this = this;
				_this.amount(_this.marketPurchase.CodeData);
				switch(_this.activeName2) {
					case "first":
						_this.Orderlist('1',_this.Marketdataheader.code);
						break;
					case "second":
						_this.Orderlist('2',_this.Marketdataheader.code);
						break;
					default:
						_this.Orderlist('1',_this.Marketdataheader.code);
						break;
				};
				switch(_this.activeName4) {
					case "first":
						_this.Historyorder('1',_this.Marketdataheader.code);
						break;
					case "second":
						_this.Historyorder('2',_this.Marketdataheader.code);
						break;
					default:
						_this.Historyorder('1',_this.Marketdataheader.code);
						break;
				};
			},
			handleClick() { //当前委托
				var _this = this;
				switch(_this.activeName2) {
					case "first":
						_this.Orderlist('1',_this.Marketdataheader.code);
						break;
					case "second":
						_this.Orderlist('2',_this.Marketdataheader.code);
						break;
					default:
						_this.Orderlist('1',_this.Marketdataheader.code);
						break;
				};
			},
			handleClick2(){//历史委托
				var _this = this;
				switch(_this.activeName4) {
					case "first":
						_this.Historyorder('1',_this.Marketdataheader.code);
						break;
					case "second":
						_this.Historyorder('2',_this.Marketdataheader.code);
						break;
					default:
						_this.Historyorder('1',_this.Marketdataheader.code);
						break;
				};
			},
			cancel(row) { //取消委托
				var _this = this,
					tradeType;
				if(!row.tradeType){
					tradeType = 2;
				}else {
					tradeType = row.tradeType;
				}
				
				var cancelBill = {
					tradeType: tradeType, //1:买入，2:卖出
					orderId: row.id, //交易订单id
				};
				_this.$http.post(_this.$http.cancelBill, cancelBill).then((res) => {
					if(res.data.code == '0') {
						_this.$public.msg(_this.$t('coincoin.Order[10]'), 'success', _this);
						_this.Refresh();
					} else {
						_this.$public.msg(res.data.msg, 'warning', _this);
					};
				});
			},
			Orderlist(numtype,stockCode) { //当前委托订单列表
				if(!stockCode){
					stockCode = 'BTC/USDT'
				}
				var _this = this;
				var selCoinCoin = {
					stockCode: stockCode,
					tradeType:numtype,
				};
				switch (numtype) {
					case '1':
						_this.$http.post(_this.$http.coinCoinEntrustIng, selCoinCoin).then((res) => {
							if(res.data.code == '0') {
								_this.tableData1 = res.data.data.list;
	
							};
						});
						break;
					case '2':
						_this.$http.post(_this.$http.coinCoinEntrustIng, selCoinCoin).then((res) => {
							if(res.data.code == '0') {
								_this.tableData2 = res.data.data.list;
	
							};
						});
						break;
					case '3':
						_this.$http.post(_this.$http.coinCoinEntrustIng).then((res) => {
							if(res.data.code == '0'){
								_this.requestData3 = res.data.data.list;
							};
						});
						break;
					case '4':
						_this.$http.post(_this.$http.selectCoinCoinMore,{stateStr:'2,3'}).then((res) => {
							if(res.data.code == '0'){
								_this.requestData4 = res.data.data.list;
							};
						});
						break;
					default:
						// statements_def
						break;
				};
			},
			Historyorder(numtype,stockCode){
				if(!stockCode){
					stockCode = 'BTC/USDT'
				}
				var _this = this;
				var selCoinCoin = {
					stockCode: stockCode,
					tradeType:numtype,
					stateStr:'2,3'
				};
				switch (numtype) {
					case '1':
						_this.$http.post(_this.$http.selectCoinCoinMore,selCoinCoin).then((res) => {
							if(res.data.code == '0'){
								_this.requestData3 = res.data.data.list;
							};
						});
						break;
					case '2':
						_this.$http.post(_this.$http.selectCoinCoinMore,selCoinCoin).then((res) => {
							if(res.data.code == '0'){
								_this.requestData4 = res.data.data.list;
							};
						});
						break;
					default:
						// statements_def
						break;
				};
			},
			deleteRow(rows) { // 撤单请求
				var _this = this;
				_this.$confirm(_this.$t('bbOrder.conent[22]'), _this.$t('bbOrder.conent[23]'), {
					type: 'warning'
				}).then(() => {
					_this.$http.post(_this.$http.cancelBill, {
						tradeType: rows.tradeType,
						orderId: rows.id,
					}).then((res) => {
						if(res.data.code == 0) {
							_this.$message({
								message: _this.$t('coincoin.Order[10]'),
								type: 'success'
							});
							_this.Orderlist("3", _this.allCode.btcCode);
							_this.Orderlist("4", _this.allCode.btcCode);
						} else {
							_this.$message({
								message: res.data.msg,
								type: 'warning'
							});
						}
					});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t('bbOrder.conent[24]')
					});
				});
			},
			Countdowntime() { //定时刷新
				var _this = this;
				_this.Countdown = window.setInterval(function() {
					// _this.Orderlist();
				}, 3000);
			},
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {
			var _this = this;
			if(_this.MainData) {
				_this.MainData.close();
			};
			if(_this.SalePriceData) {
				_this.SalePriceData.close();
			};
			window.clearInterval(_this.Countdown);
			next();
		},
		mounted: function() {
			var _this = this;
			if(_this.$cookies.get('language')){
				_this.islange = _this.$cookies.get('language');				
			}
			_this.getdatamain();
			_this.Orderlist('1');
			_this.Historyorder('1');
			_this.Countdowntime();
		},
		components: {
			"Purchase": Purchase,
			"Sellout": Sellout,
			"Quotation": Quotation,
			"Quotationheader": Quotationheader,
			'Buyfivetosellfive': Buyfivetosellfive,
			'TradingNotice': TradingNotice,
		}
	}
</script>