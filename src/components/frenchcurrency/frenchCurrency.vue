<style lang=less>
	@import '../../assets/public.less';
	@import './frenchcurrency.less';
	.el-dialog__header{
		.el-dialog__title{
			color:#303133;
		}
	}
</style>
<template>
	<section class="frenchcurrency">
		<div class="frenchcurrency_main">
			<ul class="frenchcurrency_header">

				<li class="frenchcurrency_name1">
					<div class="tabs">
						<div class="item" @click="tabPosition ='pmma'">
							<div :class="{title:true, active:tabPosition=='pmma'}">{{$t("frenchcurrency.todo[1]")}}</div>
							<p>USDT{{$t("frenchcurrency.price[0]")}}:<span style="color:#54C581">{{sankaojia}}CNY</span></p>
						</div> 
						<div class="river"></div>
						<div class="item"  @click="tabPosition ='sell'" >
							<div :class="{title:true, active:tabPosition=='sell'}">{{$t("frenchcurrency.todo[0]")}}</div>
							<p>USDT{{$t("frenchcurrency.price[0]")}}:<span style="color:#54C581">{{sankaojia}}CNY</span></p>
						</div>
					</div>
					<!-- <div class="btn-fabu" v-if="tabPosition == 'sell'" @click="rout('sell')" >{{$t("frenchcurrency.buyorsell[1]")}}</div>
					<div class="btn-fabu" v-if="tabPosition == 'pmma'" @click="rout('buy')">{{$t("frenchcurrency.buyorsell[0]")}}</div> -->
				</li>
			</ul>
			<section class="frenchcurrency_jiaoyi">
				<ul class="frenchcurrency_jiaoyi_header">
					<li class="frenchcurrency_jiaoyi_list one1">{{$t("frenchcurrency.list[0]")}}</li>
					<li class="frenchcurrency_jiaoyi_list one2 navOne2">{{$t("frenchcurrency.list[1]")}}</li>
					<li class="frenchcurrency_jiaoyi_list one3">{{$t("frenchcurrency.list[2]")}}</li>
					<li class="frenchcurrency_jiaoyi_list one4">{{$t("frenchcurrency.list[3]")}}</li>
					<li class="frenchcurrency_jiaoyi_list one5" >{{$t("frenchcurrency.list[4]")}}</li>
					<li class="frenchcurrency_jiaoyi_list one6" style="top:0px;">{{$t("frenchcurrency.list[5]")}}</li>
				</ul>
				<section class="Blocktrade">
					<!--、暂无数据-->
					<div class="Period_box" v-show="trData.length==0">{{$t("frenchcurrency.noList[0]")}}</div>	
					<ol class="Blocktrade_mian" v-for="item in trData">
					<!-- <ol class="Blocktrade_mian" v-for="item in [{realname:'123',cd_num:'cd_num',rate:'rate',amount:'amout',min_price:'min_price',max_price:'max_price',price:'price'}]"> -->
						<li class="Blocktrade_list one1 contOne1" >
							<p class="Blocktrade_name">
								<span>{{InterceptingCharacter(item.realname)}}</span>
							</p>
							<h1 class="Blocktrade_name_ab">
								<!--成单数 完成绿-->
								<p>
									<span>{{item.realname}}</span>
								</p>
								<!-- <p>
									<span>{{item.cd_num}}</span>|
									<span>{{item.rate}}</span>
								</p> -->

								<i class="iconfont icon-zhuanshi"></i>
							</h1>
						</li>
						<li class="Blocktrade_list one2">
							<span class="Blocktrade_num">{{$public.toLowFixed(item.amount,6)}}</span>&nbsp;USDT
						</li>
						<li class="Blocktrade_list one3">
							<span class="Blocktrade_num">{{item.min_price}}</span>~
							<span class="Blocktrade_num">{{item.max_price}}</span>&nbsp;CNY
						</li>
						<li class="Blocktrade_list one4">
							<span class="Blocktrade_num noenum">{{item.price}}&nbsp;CNY</span>
						</li>
						<li class="Blocktrade_list one5">
							<!--支持微信支付-->
							<el-tooltip class="item" effect="dark" :content="$t('frenchcurrency.alse2[2]')" v-if="item.pay_backcard=='1'" placement="top">
						      	<i class="iconfont yinhangka "></i>
						    </el-tooltip>
						    <!--支持支付宝支付-->
							<el-tooltip class="item" v-if="item.pay_alipay=='1'" effect="dark" :content="$t('frenchcurrency.alse2[1]')" placement="top">
						      	<i class="iconfont icon-zhifubao"></i>
						    </el-tooltip>
						    <!--支持银行卡支付-->
						    <el-tooltip class="item" v-if="item.pay_wx=='1'" effect="dark" :content="$t('frenchcurrency.alse2[0]')" placement="top">
						      	<i class="iconfont icon-weixin"></i>
						    </el-tooltip>
						</li>
						<li class="Blocktrade_list one6">
							<h2 class="" v-if="tabPosition=='pmma'"  @click="dialogFormVisibles(item, '1')"> {{$t("frenchcurrency.todo[1]")}}</h2>
							<h2 class="" v-else  @click="dialogFormVisibles(item, '2')">{{$t("frenchcurrency.todo[0]")}}</h2>
						</li>
					</ol>					
				</section>
			</section>
			<section class="Period_main" v-show="trData.length != 0">								
				<el-pagination background :current-page="isPage.page" layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>											
			</section>
			<!-- 弹框 -->
			<div class="modal coin" v-show="dialogFormVisible" >
				<div class="content" v-if="tabPosition=='sell'">
					<div class="head">
						<span >{{$t("frenchcurrency.todo[0]")}}</span>
						<img @click="dialogFormVisible=false" style="cursor:pointer" src="../../assets/image/fabu/×.png" alt="">
					</div>
					<el-form  class="form" label-width="80px">
					<el-form-item class="iptNums moeny" :label="$t('frenchcurrency.mobile1[1]')" >
						<el-input  type="text" v-model="form.cny" @focus='cny_focus=1' @blur='cny_focus=0' auto-complete="off"  >
						</el-input>
					</el-form-item>

					<el-form-item class="iptNums nums" :label="$t('frenchcurrency.mobile1[2]')" >
						<el-input  type="text" v-model="form.num"  @focus='num_focus=1' @blur='num_focus=0' >
						</el-input>
					</el-form-item>

					<el-form-item class="iptNums" :label="$t('frenchcurrency.mobile1[3]')" >
						<el-input  type="password" v-model="form.payment_password_set" >
						</el-input>
					</el-form-item>

					<div class="submit">
						<el-button class="btn btn-close" @click="dialogFormVisible=false" >{{$t('frenchcurrency.addPay[1]')}}</el-button>
						<el-button type="primary" @click="OrderDown()" class="btn btn-submit">{{$t('frenchcurrency.addPay[2]')}}</el-button>
					</div>
					</el-form>
				</div>
				<div class="content" v-else>
					<div class="head">
						<span>{{$t("frenchcurrency.todo[1]")}}</span>
						<img @click="dialogFormVisible=false" style="cursor:pointer" src="../../assets/image/fabu/×.png" alt="">
					</div>
					<el-form  class="form" label-width="80px">
						<el-form-item class="iptNums moeny" :label="$t('frenchcurrency.mobile[1]')" >
							<el-input  type="text" v-model="form.cny" @focus='cny_focus=1' @blur='cny_focus=0' auto-complete="off"  >
							</el-input>
						</el-form-item>

						<el-form-item class="iptNums nums" :label="$t('frenchcurrency.mobile[2]')" >
							<el-input  type="text" v-model="form.num"  @focus='num_focus=1' @blur='num_focus=0' >
							</el-input>
						</el-form-item>

						<el-form-item class="iptNums" :label="$t('frenchcurrency.mobile[3]')" >
							<el-input  type="password" v-model="form.payment_password_set" >
							</el-input>
						</el-form-item>

						<div class="submit">
							<el-button class="btn btn-close" @click="dialogFormVisible=false" >{{$t('frenchcurrency.addPay[1]')}}</el-button>
							<el-button type="primary" @click="OrderDown()" class="btn btn-submit">{{$t('frenchcurrency.addPay[2]')}}</el-button>
						</div>
					</el-form>
				</div>
			</div>
			<!--弹框-->
			<!-- <el-dialog class="dialog" :title="$t('frenchcurrency.mobile[0]')" width="437px" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item :label="$t('frenchcurrency.mobile[1]')" :label-width="formLabelWidth">
						<el-input v-model="form.cny" @focus='cny_focus=1' @blur='cny_focus=0' auto-complete="off">
							<template slot="append">CNY</template>
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('frenchcurrency.mobile[2]')" :label-width="formLabelWidth">
						<el-input v-model="form.num" @focus='num_focus=1' @blur='num_focus=0' auto-complete="off">
							<template slot="append">USDT</template>
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('frenchcurrency.mobile[3]')" :label-width="formLabelWidth">
						<el-input v-model="form.tpwd" auto-complete="off" type="password"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="OrderDown()">{{$t("frenchcurrency.addPay[2]")}}</el-button>
					<el-button @click="dialogFormVisible = false">{{$t("frenchcurrency.addPay[1]")}}</el-button>
				</div>
			</el-dialog> -->
		</div>
	</section>
</template>
<script>
	export default {
		data(){
			return{
				modalData:{
				},
				payMethod: [], //支付方式
				dialogFormVisible: false,
				formLabelWidth:"80px",
				num_focus: '', // 数量 当获得焦点时为1 失去焦点时为0
				cny_focus: '', //人民币 当获得焦点时为1 失去焦点为0
				Sign: 1, //防止重复提示标志位
				form: {
					cny: '',
					num: '',
					payment_password_set: '',
					one_price: '', //单价
					min_price: '', //最小
					max_price: '', //最大
					order_no: "", //订单编号
					type: "", //购买1，出售2
					amount: '', //可购买数量
				},
				isPage:{
					isCount:4,  //一共有几页
					isSize:10,  //默认显示几页
					page:1,  //当前页  
				},
				trData:[],
				sankaojia:"",
				tabPosition:"pmma",
				headertext:"求购",
				userDataTongji: {
					wallone: '', // 用户余额
					account: '', //上个页面传过来的用户id号
					reg_time: '', //注册时间
					name: '',
					mobile: 0, //手机认证
					email: 0, //邮箱认证
					smrz: 0, //实名认证
					status: 0, //高级认证
					rate: '-', //完成率
					cd_num: '-', //成单
					three_num: '-', //30天
					shensu: '-', //申述
					shengsu: '-' //胜诉
				},
				userData: {
					zpwd: "", //是否设置资金密码
					email: "", //是否绑定邮箱
					is_shop: "", //判断是不是商家
					smrz: "", //判断有没有身份认证
					status: "", //判断有没有实名认证
					wallone: "", //用户钱包
					auth_status:"", //高级认证
					pay_list: ''
				}
			}
		},
		watch:{
			tabPosition:function(){
				var connet = this;
	  			connet.DataAcquisition(1);
			},
			'form.cny': function(val, oval) {
				var _this = this;
				if(_this.num_focus == 1 && _this.cny_focus == 0) {
					//表示正在输入num 则取消cny的监听
					return false;
				} else if(isNaN(val)) {
					//您输入的金额格式有误
					// _this.$public.msg( _this.$t("frenchcurrency.tishi[0]"), 'warning', _this);
					_this.form.cny = oval;
					return false
				} else if(val.toString().indexOf('.') != -1 && val.split(".")[1].length > 2) {
					_this.form.cny = _this.$public.toLowFixed(_this.form.cny,2);
					if(_this.Sign != 1) return false
					_this.Sign++;
					//最多保留两个有效数字
					_this.$public.msg( _this.$t("frenchcurrency.tishi[1]") , 'warning', _this);
					setTimeout(function() {
						_this.Sign = 1
					}, 1500);
					return false
				}
				//验证全过再进行计算
				_this.form.num = _this.$public.Division(_this.form.cny, _this.form.one_price);
				_this.form.num= _this.$public.toLowFixed(_this.form.num,6);
				_this.form.num = Number(_this.form.num) == 0 ? '' : _this.form.num;
			},
			'form.num': function(val, oval) {
				var _this = this;
				if(_this.num_focus == 0 && _this.cny_focus == 1) {
					//表示正在输入cny 则取消num的监听
					return false;
				} else if(isNaN(val)) {
					//您输入的数量格式有误
					// _this.$public.msg(_this.$t("frenchcurrency.tishi[2]"), 'warning', _this);
					_this.form.num = oval;
					return false
				} else if(val.toString().indexOf('.') != -1 && val.split(".")[1].length > 6) {
					_this.form.num = _this.$public.toLowFixed(val,6);
					if(_this.Sign != 1) return false
					_this.Sign++;
					//最多保留四个有效数字
					_this.$public.msg(_this.$t("frenchcurrency.tishi[3]"), 'warning', _this);
					setTimeout(function() {
						_this.Sign = 1
					}, 1500);
					return false;
				}
				//验证全过再进行计算			
				_this.form.cny = _this.$public.Multiplication(_this.form.one_price, _this.form.num);
				_this.form.cny = _this.$public.toLowFixed(_this.form.cny,2)
				_this.form.cny = Number(_this.form.cny) == 0 ? '' : _this.form.cny;
			}
		},
		methods:{
			getData() {
				var _this = this;
				_this.$http.get(_this.$http.user_info, {}).then(function(response) {
						if(response.data.code == "200") {
							_this.userData = response.data.data
							sessionStorage.userData = JSON.stringify(_this.userData)
						} else if(response.data.code == "0") {
							_this.$public.confirm(_this.$t("apply.script[0]"), "login", _this);
						}
					})
					.catch(function(error) {});
					//获得支付方式列表
				_this.$http.post(_this.$http.pay_list, {}).then(function(response) {
					if(response.data.code == "200") {
						var  payList =  response.data.data.status;
						for(var i in payList){
							if(payList[i].id != undefined){
								_this.payMethod.push(payList[i])
							}
						}
						
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			rout(val){
				var _this = this;
				if(!sessionStorage.token) {
					_this.$public.msg(_this.$t('frenchcurrency.tishi2[0]'), "warning", _this);
					_this.$public.go("login", 10, _this);
					return false;
				} else {
					if(!_this.userData.zpwd) {
						_this.$public.confirm(_this.$t('frenchcurrency.tishi2[3]'), "changetpwd2", _this);
						return false;
					}
					if(_this.userData.status == '1') {
						_this.$public.confirm(_this.$t('frenchcurrency.tishi2[5]'),"changePerson1",	_this);
						return false;
					}
					if(_this.userData.status == '2') {
						_this.$public.msg(_this.$t('frenchcurrency.tishi2[6]'), "warning", _this);
						return false;
					}
					if(_this.userData.status == '4') {
						_this.$public.confirm(_this.$t('frenchcurrency.tishi2[7]'),"changePerson1",_this);
						return false;
					}
					if(_this.userData.is_shop == '0') {//商家认证 未认证
						_this.$public.confirm(_this.$t('frenchcurrency.tishi2[8]'), "apply", _this);
						return false;
					}
					if(_this.userData.is_shop == '2') {//商家认证 待审核
						_this.$public.msg(_this.$t('frenchcurrency.tishi2[9]'), "warning", _this);
						return false;
					}
					if(_this.userData.is_shop == '3') {//商家认证 拒绝
						_this.$public.confirm(_this.$t('frenchcurrency.tishi2[10]'), "apply", _this);
						return false;
					}
				}
				_this.$router.push({
					path: val
				});
			},
			// 获取个人
			// getShopinfo() {
			// 	var _this = this;
			// 	_this.userDataTongji.account = _this.$route.query.account;
			// 	if(!_this.userDataTongji.account) return false;
			// 	_this.$http.post(_this.$http.cat_shopinfo, {
			// 		account_shop: _this.userDataTongji.account,
			// 		sell_size: _this.sell.sell_paging.size,
			// 		pmma_size: _this.pmma.pmma_paging.size,
			// 		sell_p: _this.sell.sell_paging.p,
			// 		pmma_p: _this.pmma.pmma_paging.p
			// 	}).then(function(response) {
					
			// 		if(response.data.code == "200") {
			// 			//						个人信息
			// 			_this.userDataTongji.name = response.data.data.set_status.name;
			// 			_this.userDataTongji.mobile = response.data.data.set_status.mobile;
			// 			_this.userDataTongji.email = response.data.data.set_status.email;
			// 			_this.userDataTongji.smrz = response.data.data.set_status.smrz;
			// 			_this.userDataTongji.status = response.data.data.set_status.status;
			// 			_this.userDataTongji.reg_time = response.data.data.set_status.reg_time;
			// 			_this.userDataTongji.shengsu = response.data.data.shengsu;
			// 			_this.userDataTongji.shensu = response.data.data.shensu;
			// 			_this.userDataTongji.three_num = response.data.data.three_num;
			// 			_this.userDataTongji.rate = response.data.data.rate;
			// 			_this.userDataTongji.cd_num = response.data.data.cd_num;

			// 			//出售信息
			// 			_this.sell.sell_list = response.data.data.sell.res;
			// 			_this.sell.sell_paging.count = response.data.data.sell.count;
			// 			_this.sell.sell_paging.p = response.data.data.sell.p;

			// 			//购买信息
			// 			_this.pmma.pmma_list = response.data.data.pmma.res;
			// 			_this.pmma.pmma_paging.count = response.data.data.pmma.count;
			// 			_this.pmma.pmma_paging.p = response.data.data.pmma.p;

			// 		} else {
			// 			_this.$public.msg(response.data.msg, 'warning', _this);
			// 		}
					
					
			// 	}).catch(function(error) {});
			// },
			
			// 确定购买
			OrderDown(){
				var _this = this;
				if(_this.form.type == 2) {
					//表示用户点的是出售 加一个余额判断
					if( Number( _this.form.num) > Number( _this.userData.wallone )) {
						//'用户余额不足，请充值',
						_this.$public.msg(_this.$t("frenchcurrency.tishi[4]"), 'warning', _this);
						_this.nullData();
						return false;
					}
				}
				if(!_this.$public.Ints(_this.form.cny)) {
					//'交易金额请输入大于0的非空纯数字',
					_this.$public.msg(_this.$t("frenchcurrency.tishi[5]"), 'warning', _this);
					_this.nullData();
					return false
				} else if(!_this.$public.Ints(_this.form.num)) {
					//'交易数量请输入大于0的非空纯数字'
					_this.$public.msg( _this.$t("frenchcurrency.tishi[6]"), 'warning', _this);
					_this.nullData();
					return false
				} else if(Number(_this.form.num) > Number( _this.form.amount)) {
					//'交易数量不能大于剩余数量'
					_this.$public.msg(_this.$t("frenchcurrency.tishi[7]"), 'warning', _this);
					_this.nullData();
					return false
				} else if(Number(_this.form.cny) > Number(_this.form.max_price) || Number(_this.form.cny) < Number(_this.form.min_price) ) {
					_this.$public.msg(_this.$t("frenchcurrency.tishi[8]") + _this.form.min_price + '-' + _this.form.max_price + _this.$t("frenchcurrency.tishi[9]"), 'warning', _this);
					_this.nullData();
					return false
				} else if(!_this.$public.pwd(_this.form.payment_password_set)) {
					//资金密码格式有误
					_this.$public.msg(_this.$t("frenchcurrency.tishi[10]"), 'warning', _this);
					return false
				} else {
					//去结算
					// _this.$public.msg('去结算', 'success', _this);
					_this.dialogFormVisible = false;
					var create_orderdata = {
						type:_this.form.type,
						payment_password:_this.$md5(_this.form.payment_password_set),//资金密码，出售时需要，购买时不用此字段
						order_no:_this.form.order_no,
						total_num:_this.form.num,
						total_price:_this.form.cny,
					}
					
					_this.$http.post(_this.$http.create_order,create_orderdata).then(function(response){
						if (response.data.code=="200") {
							_this.$router.push({path: '/frenchorder'});
							window.sessionStorage.order = escape(JSON.stringify(response.data.data));
						}else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});
				}
			},
			// 截取第一字符
			InterceptingCharacter(character){
				if(character){					
					return character.slice(0,1);
				}else{
					return 'A'
				}			
			},
			pageChange(i) {
				var _this = this;
				_this.DataAcquisition(i);

			},
			// 列表获取
			DataAcquisition(i){
				var connet = this;
				connet.trData = [];
				if (connet.tabPosition == 'sell') {
					connet.headertext = "求购";
				}else {
					connet.headertext = "出售";
				}
				let tradingdata = {
					params:{
					// 我要出售 看对方求购单子
					type:connet.tabPosition=='sell'?1:2,
					size:connet.isPage.isSize,
					page:i
					}

				};  
		      	this.$http.get(connet.$http.trading,tradingdata).then(function(result){	      		
								if(result.data.code == "200") {				   
									connet.trData = result.data.data.res;
									connet.isPage.isCount = result.data.data.count;
									for(var i=0;i<connet.trData.length; i++){
										connet.trData[i].amount = connet.$public.toLowFixed(connet.trData[i].amount,6);
									}
									// connet.sankaojia = result.data.ck_price
								}
							}
						);
						connet.$http.post(connet.$http.commonData, {}).then(function(response) {
						if(response.data.code == "200") {
							connet.sankaojia = response.data.data.fb_price
						} else if(response.data.code == "0") {
						}
					})
					.catch(function(error) {});
							
			},
			//数据清空
			nullData() {
				var _this = this;
				_this.form.cny = '';
				_this.form.num = '';
				_this.form.payment_password_set = '';
			},
			dialogFormVisibles(item, type) {
				
				var _this = this;
				_this.form.one_price = item.price;
				_this.form.max_price = item.max_price;
				_this.form.min_price = item.min_price;
				_this.form.order_no = item.order_no;
				_this.form.amount = item.amount;
				_this.form.type = type;
				var thisAccount = item.account;
				// console.log(_this.$t("apply.judge[2]"));

				if(!sessionStorage.token) {
					_this.$public.confirm(_this.$t("frenchcurrency.tishi2[0]"), 'login', _this);
					return false
				}
				if(thisAccount == this.userData.account){ //判断一下自己不能买自己家的币
					if(type == 1){ //您不能购买自己发布的订单
						_this.$public.msg(_this.$t("frenchcurrency.tishi2[1]"), 'warning', _this);
					}else{	//您不能向自己的订单出售
						_this.$public.msg(_this.$t("frenchcurrency.tishi2[2]"), 'warning', _this);
					}
					return false
				}
				if(_this.userData.authentication != 2){
					_this.$public.confirm(_this.$t('header.Tipstext2[0]'), 'changePerson2', _this);
					return false
				}
				if(!_this.userData.config.payment_password_set) {
					//'您还没有设置资金密码，是否前往设置',
					_this.$public.confirm(_this.$t("frenchcurrency.tishi2[3]"), 'changetpwd2', _this);							
					return false;					
				}
				if(_this.userData.pay_list == 0 && type == 2){
				//'您还没有添加支付方式，是否前往添加?'
					_this.$public.confirm(_this.$t("frenchcurrency.tishi2[4]"), 'security', _this);
					return false;
				}

				if(type == 2){
					if(item.pay_wx == '1' && item.pay_alipay == '0' && item.pay_backcard == '0'){ //买家支持通过微信向您付款
						var flag = 	_this.payMethod.some((a) =>{
							return a.type == 'wx'
						})
						if(flag == false){
							_this.$public.confirm(_this.$t("frenchcurrency.tishi3[0]"), 'security', _this);
							return false;		
						} else{
							_this.nullData();
							_this.dialogFormVisible = true;
						}
					}
				  else	if(item.pay_wx == '0' && item.pay_alipay == '1' && item.pay_backcard == '0'){ //买家支持通过支付宝向您付款
						var flag = 	_this.payMethod.some((a) =>{
							return a.type == 'alipay'
						})
						if(flag == false){
							_this.$public.confirm(_this.$t("frenchcurrency.tishi3[1]"), 'security', _this);	
							return false;			
						} else{
							_this.nullData();
							_this.dialogFormVisible = true;
						}
					}
					else	if(item.pay_wx == '0' && item.pay_alipay == '0' && item.pay_backcard == '1'){ //买家支持通过银行卡向您付款
						var flag = 	_this.payMethod.some((a) =>{
							return a.type == 'backcard'
						})
						if(flag == false){
							_this.$public.confirm(_this.$t("frenchcurrency.tishi3[2]"), 'security', _this);
							return false;		
						} else{
							_this.nullData();
							_this.dialogFormVisible = true;
						}
					}
					else	if(item.pay_wx == '1' && item.pay_alipay == '1' && item.pay_backcard == '0'){//买家支持通过微信支付宝向您付款
						var flag = 	_this.payMethod.some((a) =>{
							return a.type == 'wx' || a.type == 'alipay'
						})
						if(flag == false){
							_this.$public.confirm(_this.$t("frenchcurrency.tishi3[3]"), 'security', _this);
							return false;		
						} else{
							_this.nullData();
							_this.dialogFormVisible = true;
						}
					}
					else	if(item.pay_wx == '1' && item.pay_alipay == '0' && item.pay_backcard == '1'){//买家支持通过微信 银行卡向您付款
						var flag = 	_this.payMethod.some((a) =>{
							return a.type == 'wx' || a.type == 'bankcard'
						})
						if(flag == false){
							_this.$public.confirm(_this.$t("frenchcurrency.tishi3[4]"), 'security', _this);
							return false;		
						} else{
							_this.nullData();
							_this.dialogFormVisible = true;
						}
					}
					else	if(item.pay_wx == '0' && item.pay_alipay == '1' && item.pay_backcard == '1'){//买家支持通过支付宝 银行卡向您付款
						var flag = 	_this.payMethod.some((a) =>{
							return a.type == 'bankcard' || a.type == 'alipay';
						})
						if(flag == false){
							_this.$public.confirm(_this.$t("frenchcurrency.tishi3[5]"), 'security', _this);
							return false;		
						} else{
							_this.nullData();
							_this.dialogFormVisible = true;
						}
					}
					else {
						_this.nullData(); //清空数据
						_this.dialogFormVisible = true;
					}
				}
				else {
					_this.nullData(); //清空数据
					_this.dialogFormVisible = true;
				}

			},
		}, 
	  	created:function(){
			if(sessionStorage.token){
				this.getData();
				this.userData = JSON.parse(sessionStorage.userData)  
			}
			// this.getShopinfo();
			this.DataAcquisition(1);	
	  	},
	  	components:{}
	}
</script>

<style scoped>

	
</style>