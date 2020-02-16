<style lang=less>
	@import '../../assets/public.less';
	@import './apply.less';
</style>
 
<!--
		sell 和buy 的less 在apply.less
		
	-->
<template>
	<div class="sell_main">
		<div class="sellBuy_title">
			<h2>{{$t("sell.list[0]")}}</h2>
			<p>{{$t("sell.list[1]")}}</p>
		</div>
		<div class="form_warp">
			<el-form :label-position="labelPosition" :model="sellData" status-icon :rules="rules2" ref="sellData"  class="demo-ruleForm">
				<!--单价-->
				<el-form-item :label="$t('sell.list[2]')+'(CNY)'" prop="price">
					<el-input v-model="sellData.price" auto-complete="off" type="number"></el-input>
				</el-form-item>
        	<!--数量-->
				<el-form-item :label="$t('sell.list[3]')" prop="trans_num">
					<el-input v-model.trans_number="sellData.trans_num" auto-complete="off" type="number"></el-input>
				</el-form-item>
				<!--限额-->

				<div class="limit">
					<el-form-item :label="$t('sell.list[4]')" prop="min_price">
						<!--最低-->
						<el-input type="number" v-model.number="sellData.min_price" auto-complete="off" :placeholder="$t('sell.list[6]')" ></el-input>
						<span class="cny">CNY</span>
					</el-form-item>

					<el-form-item :label="$t('sell.list[4]')" prop="max_price">
						<!--最高-->
						<el-input type="number" v-model.number="sellData.max_price" auto-complete="off" :placeholder="$t('sell.list[5]')" ></el-input>
						<span class="cny">CNY</span>
					</el-form-item>
				
				</div>

				<!--备注-->
				<el-form-item :label="$t('sell.list[12]')" prop="trans_num">
					<el-input v-model.trans_number="sellData.notes" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item class="pay_select">
					<span>
						<!--//支付方式-->
						{{$t('sell.list[8]')}}  
						<span class="tishi">
							<i class="el-icon-info"></i>
							{{$t('sell.list[9]')}}
						</span>
					</span>
					<ul class="lis_warp">
						<li v-for="(v,k) in pay_list" v-show="v.status == 1" v-loading="loadings">
							<i v-if="v.type == 'wx'">
								<i class="icon iconfont icon-weixin wx"></i>
							</i>
							<i v-else-if="v.type == 'alipay'">
								<i class="icon iconfont icon-zhifubao alipay"></i>
							</i>
							<i v-else-if="v.type == 'backcard'">
								<i class="icon iconfont icon-yinhangka car"></i>
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
							

							<el-checkbox v-model="sellData.pay_wx" :true-label='1' false-label='0' @change='changeAct(v.type)' v-if="v.type == 'wx'"></el-checkbox>
							<el-checkbox v-model="sellData.pay_backcard" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'backcard'"></el-checkbox>
							<el-checkbox v-model="sellData.pay_alipay" :true-label='1' false-label='0' @change='changeAct(v.type)' v-else-if="v.type == 'alipay'"></el-checkbox>

						</li>
					</ul>

					<router-link to="/security" v-if="pay_list.length==3">
						<div class="add_pay"> 
							<!--添加支付方式-->
							<p>{{$t('sell.list[10]')}}</p>
						</div>
					</router-link>
				</el-form-item>

				<el-form-item>
					<!--出售-->
					<el-button type="primary" @click="submitForm('sellData')" :loading="loading">{{$t('sell.list[11]')}}</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="sellBuy_list">
			<div class="sellBuy_title">
				<!--出售列表-->
				<h2>{{$t('sell.showlist[0]')}}</h2>
				<p style="cursor: pointer"  @click="$router.push({path:'/fbOrder'})">查看更多</p>
			</div>
			<div class="sellBuy_title_warp">
				<div class="sellBuy_nav">
					<span class="dingdan">{{$t('sell.showlist[1]')}}</span>
					<span>{{$t('sell.showlist[2]')}}</span>
					<span>{{$t('sell.showlist[3]')}}</span>
					<span>{{$t('sell.showlist[4]')}}</span>
					<span>{{$t('sell.showlist[5]')}}</span>
					<span>{{$t('sell.showlist[6]')}}</span>
					<span class="todo">{{$t('sell.showlist[7]')}}</span>
				</div>
				<p class="no_list" v-show="sell.sell_list.length <= 0">{{$t('sell.showlist[8]')}}</p>
				<ul class="sellBuy_lis_warp" v-show="sell.sell_list.length > 0">
					<li class="sellBuy_lis" v-for="(v,k) in sell.sell_list">
						<span class="dingdan">{{v.order_no}}</span>
						<span>{{v.trans_num}}</span>
						<span>{{v.deals_num}}</span>
						<span>{{v.totalprice}}</span>
						<span>{{v.price}}</span>
						<span>{{$public.timestampToTime(v.add_time)}}</span>

						<span class="todo"><span class="chedan" @click="pmmaRev(v.id)">{{$t('buy.showlist[9]')}}</span></span>
					</li>
				</ul>
				<el-pagination background layout="prev, pager, next" v-show="sell.sell_list.length > 0" :total="parseInt(sell.totle)" @current-change="current_change" :page-size='sell.size'></el-pagination>

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
						<el-input type="password" v-model="sellData.payment_password" placeholder="请输入资金密码"></el-input>
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
					//请输入大于0的非空纯数字
					return callback(new Error( _this.$t("sell.trans_num[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 6) {
					//只能保留小数点后四位
					return callback(new Error(_this.$t("sell.trans_num[1]")));
				} else {
					callback();
				}
			};
			var min_price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					//请输入大于0的非空纯数字
					return callback(new Error( _this.$t("sell.min_price[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					//只能保留二位有效数字
					return callback(new Error( _this.$t("sell.min_price[1]") ));
				} else {
					callback();
				}
			};
//			var notes = (rule, value, callback) => {
//				if(!_this.$public.Trim(value)){
//					return callback(new Error('请加添备注'));
//				}else{
//					callback();
//				}	
//			};
			var max_price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					//请输入大于0的非空纯数字
					return callback(new Error(_this.$t("sell.max_price[0]")))
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
//					/只能保留二位有效数字
					return callback(new Error(_this.$t("sell.max_price[1]")));
				} else {
					callback();
				}
			};
			var price = (rule, value, callback) => {
				if(!_this.$public.Ints(value)) {
					//'请输入大于0的非空纯数字')
					return callback(new Error( _this.$t("sell.price[0]") ));
				} else if(value.toString().indexOf('.') != -1 && value.toString().split(".")[1].length > 2) {
					//'只能保留二位有效数字'
					return callback(new Error( _this.$t("sell.price[1]") ));
				} else {
					callback();
				}
			};

			return {
				isDisplay:false,
				sellData: {
					payment_password:"",
					trans_num: '', //数量
					min_price: '', //最小
					max_price: '', //最大
					price: '', //价格
					//					pay_type: [], //选择支付方式
					pay_wx: 0, //微信
					pay_alipay: 0, //支付宝
					pay_backcard: 0, //银行卡
					type: 'sell', //下单类型
					notes:''  //备注

				},
				wallone: '', //钱包余额
				pay_list: [], //支付方式列表
				sell: {
					sell_list: [], //出售列表
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
					}],
//					notes: [{
//						validator: notes,
//						trigger: 'blur'
//					}]
				},
				labelPosition: 'top', //插件自带
				loadings: false,
			}

		},
		methods: {
			isok() {
				var _this = this
				this.sellData.payment_password = this.$md5(this.sellData.payment_password)
				_this.$http.post(_this.$http.pmma, _this.sellData).then(function(response) {
					_this.dataNull();
					if(response.data.code == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.getUserData();
						_this.getSellData();
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
						if(_this.sellData.min_price > _this.sellData.max_price) {
							//'最低限额不能高于最高限额'
							_this.$public.msg( _this.$t("sell.submitForm[0]"), 'warning', _this);
							return false
						} else if(_this.sellData.pay_wx == 0 && _this.sellData.pay_backcard == 0 && _this.sellData.pay_alipay == 0) {
							//请选择一种支付方式
							_this.$public.msg(_this.$t("sell.submitForm[1]"), 'warning', _this);
							return false
						} else if(_this.sellData.min_price < _this.sellData.price) {
							//'最低限额不能小于单价'
							_this.$public.msg(_this.$t("sell.submitForm[2]"), 'warning', _this);
							return false;
						} else if(Number(_this.sellData.trans_num) > Number(_this.wallone)) {
							//'您的余额不足，请充值'
							_this.$public.msg(_this.$t("sell.submitForm[3]"), 'warning', _this);
							_this.dataNull();
							return false;
						} else if(Number(_this.sellData.price) * Number(_this.sellData.trans_num) < Number(_this.sellData.min_price)) {
							//'您设置的最低限额有误，请重新设置'
							_this.$public.msg(_this.$t("sell.submitForm[4]"), 'warning', _this);
							_this.sellData.min_price = '';
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
				_this.loadings = true;
				_this.$http.post(_this.$http.pay_list, {}).then(function(response) {
					_this.loadings = false;
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
			getSellData(i) {
				var _this = this;
				_this.$http.get(_this.$http.pmmaList, {
					params: {
						type: _this.sellData.type,
						size: _this.sell.size,
						page: i,
					}
				}).then(function(response) {
					if(response.data.code == "200") {
						_this.sell.sell_list = response.data.data.res;
						_this.sell.totle = response.data.data.count;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//分页处理函数
			current_change(i) {
				var _this = this;
				_this.getSellData(i);
			},
			//
			changeAct(i) {
			},
			//撤单
			pmmaRev(id) {
				var _this = this;
				_this.$confirm(_this.$t("sell.pmmaRev[0]"), _this.$t("sell.pmmaRev[1]"), {
					confirmButtonText: _this.$t("sell.alse[0]"),
					cancelButtonText: _this.$t("sell.alse[1]"),
					type: 'warning'
				}).then(() => {
					_this.$http.post(_this.$http.pmmaRev, {
						type:'sell',
						id: id
					}).then(function(response) {
						if(response.data.code == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.getSellData();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t("sell.pmmaRev[2]")
					});
				});

			},
			get_price() {
				var _this = this;
				_this.$http.post(_this.$http.commonData,{}).then(function(response) {
					if(response.data.code == "200") {
						_this.sellData.price =response.data.data.fb_price;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//数据清空
			dataNull() {
				var _this = this;
				_this.sellData = {
					trans_num: '', //数量
					min_price: '', //最小
					max_price: '', //最大
//					price: '', //价格
					pay_wx: 0, //微信
					pay_alipay: 0, //支付宝
					pay_backcard: 0, //银行卡
					type: 'sell' //下单类型
				}
			}
		},
		created: function() {
			var _this = this;
			_this.get_price();  //获得默认价格
			_this.getData();
			_this.getUserData();
			_this.getSellData(1);
		},
	}
</script>

<style>

</style>