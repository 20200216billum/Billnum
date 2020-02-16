<style lang=less>
	@import '../../assets/public.less';
	@import './apply.less';
</style>

<!--
		buy 和buy 的less 在apply.less
		
	-->
<template>
	<div class="sell_main">
		<div class="sellBuy_title">
			<h2>{{$t("buy.list[0]")}}</h2>
			<p >{{$t("buy.list[1]")}}</p>
		</div>
		<div class="form_warp">
			<el-form :label-position="labelPosition" :model="buyData" status-icon :rules="rules2" ref="buyData"  class="demo-ruleForm el-form--label-top">
				<!--单价-->
				<el-form-item :label="$t('buy.list[2]')+'(CNY)'" prop="price">
					<el-input v-model="buyData.price" auto-complete="off" type="number"></el-input>
				</el-form-item>
				<!--数量-->
				<el-form-item :label="$t('buy.list[3]')" prop="trans_num">
					<el-input v-model.trans_number="buyData.trans_num" auto-complete="off" type="number"></el-input>

				</el-form-item>

				<div class="limit">
					<!--限额-->
					<el-form-item :label="$t('buy.list[4]')" prop="min_price">
						<!--最低-->
						<el-input v-model.number="buyData.min_price" auto-complete="off" :placeholder="$t('buy.list[6]')" type="number"></el-input>
						<span class="cny">CNY</span>
					</el-form-item>

					<el-form-item :label="$t('buy.list[4]')" prop="max_price">
						<!--最高-->
						<el-input v-model.number="buyData.max_price" auto-complete="off" :placeholder="$t('buy.list[5]')"  type="number"></el-input>
						<span class="cny">CNY</span>
					</el-form-item>
					
				</div>
				<!--备注-->
				<el-form-item :label="$t('buy.list[11]')" prop="notes">
					<el-input v-model.trans_number="buyData.notes" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item class="pay_select">
					<span>
						<!--支付方式-->
						{{$t('buy.list[7]')}}
						<span class="tishi">
							<i class="el-icon-info"></i>
							<!--请勾选你要使用的支付方式-->
							{{$t('buy.list[8]')}}
						</span>
					</span>
					<ul class="lis_warp">
						<li v-for="(v,k) in pay_list" v-show="v.status == 1">
							<i v-if="v.type == 'wx'">
								<i class="icon iconfont  wx"></i>
							</i>
							<i v-else-if="v.type == 'alipay'">
								<i class="icon iconfont alipay"></i>
							</i>
							<i v-else-if="v.type == 'backcard'">
								<i class="icon iconfont car"></i>
							</i>
							<span v-if="v.type == 'wx'">
								<span class="type">{{v.number}}</span>
							</span>
							<span v-else-if="v.type == 'alipay'">
								<span class="type">{{v.number}}</span>
							</span>
							<span v-else-if="v.type == 'backcard'">
								<span class="type">{{v.tip}}</span>
								<span class="type">{{v.number}}</span>
								<span class="type">{{v.bank}}</span>
								<span class="type">{{v.branch}}</span>
							</span>
							<el-checkbox v-model="buyData.pay_wx" :true-label='1' false-label='0' @change='changeAct(v.type)' v-if="v.type == 'wx'"></el-checkbox>
							<el-checkbox v-model="buyData.pay_backcard" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'backcard'"></el-checkbox>
							<el-checkbox v-model="buyData.pay_alipay" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'alipay'"></el-checkbox>
						</li>
					</ul>
					<router-link to="/security" v-if="pay_list.length==3">
						<div class="add_pay">
							<p>
							<!--添加支付方式-->
							{{$t('buy.list[9]')}}
							</p>
						</div>
					</router-link>
				</el-form-item>

				<el-form-item>
					<!--求购-->
					<el-button type="primary" @click="submitForm('buyData')" :loading="loading">{{$t('buy.list[10]')}} </el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="sellBuy_list">
			<div class="sellBuy_title">
				<!--求购列表-->
				<h2>{{$t('buy.showlist[0]')}}</h2>
				<p  style="cursor: pointer"  @click="$router.push({path:'/fbOrder'})">查看更多</p>
			</div>
			<div class="sellBuy_title_warp">
				<div class="sellBuy_nav">
					<!--订单号-->
					<span class="dingdan">{{$t('buy.showlist[1]')}}</span>
					<!--交易数量-->
					<span>{{$t('buy.showlist[2]')}}</span>
					<!--成交数量-->
					<span>{{$t('buy.showlist[3]')}}</span>
					<!--总价-->
					<span>{{$t('buy.showlist[4]')}}</span>
					<!--单价-->
					<span>{{$t('buy.showlist[5]')}}</span>
					<!--时间-->
					<span>{{$t('buy.showlist[6]')}}</span>
					<span class="todo">{{$t('buy.showlist[7]')}}</span>
				</div>
				<!--暂无数据-->
				<p class="no_list" v-show="buy.buy_list.length <= 0">{{$t('buy.showlist[8]')}}</p>
				<ul class="sellBuy_lis_warp" v-show="buy.buy_list.length > 0">
					<li class="sellBuy_lis" v-for="(v,k) in buy.buy_list">
						<span class="dingdan">{{v.order_no}}</span>
						<span>{{v.trans_num}}</span>
						<span>{{v.deals_num}}</span>
						<span>{{v.totalprice}}</span>
						<span>{{v.price}}</span>
						<span>{{$public.timestampToTime(v.add_time)}}</span>
						<!--cedan-->
						<span class="todo"><span @click="pmmaRev(v.id)" class="chedan">{{$t('buy.showlist[9]')}}</span></span>
					</li>
				</ul>
				<el-pagination background layout="prev, pager, next" v-show="buy.buy_list.length > 0" :total="parseInt(buy.totle)" @current-change="current_change" :page-size='buy.size'></el-pagination>

			</div>
		</div>

		<!-- 安全验证 -->
		<div tabindex="-1" v-show="isDisplay" role="dialog" aria-modal="true" aria-label="标题名称" class="el-message-box__wrapper" style="z-index: 2045;">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>安全验证</span>
					</div>
					<img @click="isDisplay=false" src="../../assets/image/fabu/×.png"></img>

				</div>
				<div class="el-message-box__content">
						<!-- 谷歌 -->
						<!-- <div class="label m5">{{$t('google[1]')}}</div>
						<el-input v-model="ruleForm.googleCode" :placeholder="$t('google[2]')"></el-input> -->
						<!-- 资金密码 -->
						<div class="label">{{$t('frenchcurrency.mobile[3]')}}</div>
						<el-input type="password" v-model="buyData.payment_password" :placeholder="'请输入资金密码'"></el-input>
						<!-- 短信 -->
						<!-- <div class="code_warp">
							<div class="label">{{$t('register.list[2]')}}</div>
							<el-input v-model.number="ruleForm.code" auto-complete="off" :placeholder='$t("tiBit.list1[3]")'></el-input>
							<el-button class="btn_code" @click="getCode()" type="text"  :disabled='btnCode.disabled'>{{btnCode.time}}</el-button>
						</div> -->

				</div>
				<div class="el-message-box__btns">
						<el-button class="btn btn-submit close" type="primary" @click='isDisplay=false'>{{$t("apply.alse[1]")}}</el-button>
						<el-button class="btn btn-submit confirm" type="primary" @click='isok()'>{{$t("apply.alse[0]")}}</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var _this = this;
			var trans_num = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error(  _this.$t("buy.trans_num[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 6) {
					return callback(new Error( _this.$t("buy.trans_num[1]") ));
				} else {
					callback();
				}
			};
			var min_price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error( _this.$t("buy.min_price[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					return callback(new Error( _this.$t("buy.min_price[1]") ));
				} else {
					callback();
				}
			};
			var max_price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					return callback(new Error( _this.$t("buy.max_price[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					return callback(new Error( _this.$t("buy.max_price[1]") ));
				} else {
					callback();
				}
			};
			var price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					//请输入大于0的非空纯数字
					return callback(new Error( _this.$t("buy.price[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
//					/只能保留二位有效数字
					return callback(new Error(  _this.$t("buy.price[1]")  ));
				} else {
					callback();
				}
			};

			return {
				isDisplay:false,
				buyData: {
					payment_password:"",
					trans_num: '', //数量
					min_price: '', //最小
					max_price: '', //最大
					price: '', //价格
					//					pay_type: [], //选择支付方式
					pay_wx: 0, //微信
					pay_alipay: 0, //支付宝
					pay_backcard: 0, //银行卡
					type: 'pmma', //下单类型
					notes: '', // 备注
				},
				wallone:'', //钱包余额
				pay_list: [], //支付方式列表
				buy: {
					buy_list: [], //出售列表
					totle: 2, //总条数
					size: 5 //每页显示条数
				},
				loading: false,
				rules2: {
					trans_num: [{
						validator: trans_num,
						trigger: 'blur'
					}],
					min_price: [{
						validator: min_price,
						trigger: 'blur'
					}],
					max_price: [{
						validator: max_price,
						trigger: 'blur'
					}],
					price: [{
						validator: price,
						trigger: 'blur'
					}]
				},
				labelPosition: 'center', //插件自带

			}

		},
		methods: {
			isok(){
				var _this = this
				this.buyData.payment_password = this.$md5(this.buyData.payment_password)
				_this.$http.post(_this.$http.pmma, _this.buyData).then(function(response) {
					_this.dataNull();
					if(response.data.code == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.getUserData();
						_this.getbuyData();
						_this.$public.go('/frenchcurrency',500,_this);
						
					} else {
						_this.dataNull();
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						if(_this.buyData.min_price > _this.buyData.max_price) {
							_this.$public.msg( _this.$t("buy.submitForm[0]"), 'warning', _this);
							return false
						} else if(_this.buyData.pay_wx == 0 && _this.buyData.pay_backcard == 0 && _this.buyData.pay_alipay == 0) {
							//请选择一种支付方式
							_this.$public.msg(_this.$t("buy.submitForm[1]"), 'warning', _this);
							return false
						}else if(_this.buyData.min_price <_this.buyData.price){
							//最低限额不能小于单价
							_this.$public.msg(_this.$t("buy.submitForm[2]"), 'warning', _this);
							return false;					
						}else if(Number(_this.buyData.price)*Number(_this.buyData.trans_num)<Number(_this.buyData.min_price) ){
							//您设置的最低限额有误，请重新设置
							_this.$public.msg(_this.$t("buy.submitForm[3]"), 'warning', _this);
							_this.buyData.min_price = '';
							return false;							
						}

						_this.isDisplay =true
					} else {
						return false
					}
				});
			},
			//支付方式列表 
			getData() {
				var _this = this;
				_this.$http.post(_this.$http.pay_list, {}).then(function(response) {
					if(response.data.code == "200") {
						_this.pay_list = response.data.data.status;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//获得个人中心数据和出售列表数据
			getUserData() {
				var _this = this;
				_this.$http.get(_this.$http.user_info, {}).then(function(response) {
					if(response.data.code == "200") {
						_this.wallone = response.data.data.wallone;
						
					} else {}
				}).catch(function(error) {});
			},
				//获取出售列表数据
			getbuyData(i){
				var _this = this;
				_this.$http.get(_this.$http.pmmaList, {
					params: {
						type: _this.buyData.type,
						size: _this.buy.size,
						p:i,
					}
				}).then(function(response) {
					if(response.data.code == "200") {
						_this.buy.buy_list = response.data.data.res;
						_this.buy.totle = response.data.data.count;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//分页处理函数
			current_change(i) {
				var _this = this;
				_this.getbuyData(i);
			},
			//
			changeAct(i) {},
			//撤单
			pmmaRev(id) {
				var _this = this;
				_this.$confirm(_this.$t("buy.pmmaRev[0]") ,_this.$t("buy.pmmaRev[1]") , {
					confirmButtonText: _this.$t("buy.alse[0]"),
					cancelButtonText: _this.$t("buy.alse[1]"),
					type: 'warning'
				}).then(() => {
					_this.$http.post(_this.$http.pmmaRev, {
						type: 'pmma',
						id: id
					}).then(function(response) {
						if(response.data.code == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getbuyData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t("buy.pmmaRev[2]")
					});
				});

			},
			get_price() {
				var _this = this;
				_this.$http.post(_this.$http.commonData,{}).then(function(response) {
					if(response.data.code == "200") {
						_this.buyData.price =response.data.data.fb_price;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//数据清空
			dataNull() {
				var _this = this;
				_this.buyData = {
					trans_num: '', //数量
					min_price: '', //最小
					max_price: '', //最大
//					price: '', //价格
					pay_wx: 0, //微信
					pay_alipay: 0, //支付宝
					pay_backcard: 0, //银行卡
					type: 'pmma' //下单类型
				}
			}
		},
		created: function() {
			var _this = this;
			_this.get_price();  //获得默认价格
			_this.getData();
			_this.getUserData();
			_this.getbuyData(1);

		},

	}
</script>

<style>

</style>