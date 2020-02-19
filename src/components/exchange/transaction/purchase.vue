<template lang="html">
	<div class="Sellout buyWarp">
		<el-form ref="form" :model="form" size="small" label-position="left">
			<!-- <h4 style="color:#24d985;">{{$t('Gic.Placeorder[2]')}}</h4> -->
			<el-form-item label="买入价格">
				<!-- 市价交易 -->
				<el-input v-if="ModifyState" :value="$t('Gic.Placeorder[4]')" :disabled="ModifyState">
				</el-input>
				<el-input v-else @change="transValue('price')" v-model="sendData.newprice" :disabled="ModifyState"></el-input>
				<div class="opreation" v-if="!ModifyState">
					<div class="reduce" @click="changeValue('-')">
						<img src="../../../assets/image/bibi/-.png"></img>
					</div>
					<div class="river"></div>
					<div class="add" @click="changeValue('+')">
						<img src="../../../assets/image/bibi/+.png"></img>
					</div>
				</div>
				<!-- <div v-if="ModifyState" class="toCny">≈{{$public.toLowFixed(nowCny,2,0) }} CNY</div>
				
				<div v-else class="toCny">≈{{$public.toLowFixed($public.Multiplication($public.Division(nowCny,nowPrice), sendData.newprice),2,0) }} CNY</div> -->
			</el-form-item>
			<!-- 交易数量 -->
			<el-form-item label="交易额">
				<el-input @change="transValue('nums')" class="jynums" v-model="sendData.buynum" placeholder="0">
					<!-- <template slot="append" v-if="ModifyState">{{Data.code | normal1}}</template>
					<template slot="append" v-else>{{Data.code | normal }}</template> -->
					<span slot="suffix" v-if="ModifyState">{{Data.code | normal1}}</span>
						<span slot="suffix" v-else>{{Data.code | normal }}</span>


				</el-input>

				<!-- <div class="number" v-if="isLogin && form.maximum>=0">
					<div class="jump">
						<div @click="fill('0.25')" class="item">25%</div>
						<div @click="fill('0.5')" class="item">50%</div>
						<div @click="fill('0.75')" class="item">75%</div>
						<div @click="fill('1')" class="item">100%</div>
					</div>
				</div>
				<div class="number" v-else>
					<div class="jump">
						<div @click="fill('0.25')" class="item">25%</div>
						<div @click="fill('0.5')" class="item">50%</div>
						<div @click="fill('0.75')" class="item">75%</div>
						<div @click="fill('1')" class="item">100%</div>
					</div>
				</div> -->
			</el-form-item>
			<div class="jiaoyiAll">
				<p v-if="isLogin">
					<!-- <span>{{$t('bibi.other[0]')}}： {{$public.toLowFixed(form.turnover,6,'',false)}}{{Data.code | normal1}}</span> -->
					<span>{{$t('Gic.Placeorder[5]')}}</span>
					<span>{{$public.toLowFixed(Data.wallone,6,'',false)}} {{Data.code | normal1}}</span>
					<p v-else>
						<!-- <span>{{$t('bibi.other[0]')}}：{{$public.toLowFixed(form.turnover,6,'',false)}}{{Data.code | normal1}}</span> -->
						<span>{{$t('Gic.Placeorder[5]')}}</span>
						<span>{{$public.toLowFixed(Data.wallone,6,'',false)}} {{Data.code | normal1}}</span>
					</p>
			</div>
				<div class="number" v-if="isLogin && form.maximum>=0">
					<div class="jump">
						<div @click="fill('0.25')" class="item">25%</div>
						<div @click="fill('0.5')" class="item">50%</div>
						<div @click="fill('0.75')" class="item">75%</div>
						<div @click="fill('1')" class="item">100%</div>
					</div>
				</div>
				<div class="number" v-else>
					<div class="jump">
						<div @click="fill('0.25')" class="item">25%</div>
						<div @click="fill('0.5')" class="item">50%</div>
						<div @click="fill('0.75')" class="item">75%</div>
						<div @click="fill('1')" class="item">100%</div>
					</div>
				</div>


			<el-form-item>
				<div v-if='isLogin'>
						<el-button v-if="Data.buy_state == '1'" type="" size="small" :loading="loadingsellout" @click="onSubmit">
								{{$t('Gic.Placeorder[2]')}}</el-button>
								<el-button v-else type="" size="small" :loading="loadingsellout" @click="onSubmit" disabled>
										{{$t('Gic.Placeorder[2]')}}</el-button>
				</div>
				
				<el-button v-else type="" size="small" :loading="loadingsellout" @click="onSubmit" disabled>
						{{$t('Gic.Placeorder[7]')}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		props: ['Data', 'ModifyState', 'nowCny', 'nowPrice', 'price'],
		data() {
			return {
				dialogFormVisible: true,
				activeName: 'first',
				form: {
					maximum: 100, //交易最大数量
					turnover: "", //交易额
				},
				//需要向后台传的数据
				sendData: {
					mobile: null, //手机号
					code: '', //code
					newprice: '', //最新价格 
					buynum: "", //买入数量 
					otype: 2, //市价 2 限价 1 （默认市价）
					type: 1, //涨（买入） 1 跌 2（卖出)

				},
				loadingsellout: false, //防止重复提交
				isLogin: false, //判断有没有登录
				cg: '',
				yuecny: '',//交易额越等于人民币

			}
		},
		watch: {
			'cg': function (val, oval) {
				this.sendData.buynum = val;

			},
			'Data.code': function (val, oval) {
				this.sendData.newprice = this.Data.PriceData;
				this.sendData.buynum = "";
			},
			'Data.PriceData': function (val, oval) {
				var _this = this;
				if (_this.ModifyState) {
					_this.sendData.newprice = val;
				}
				//点击卖5买5
				if (this.Data.buyorsell == 'sell') {
					_this.sendData.newprice = val;
				}
				_this.sendData.newprice = val;
				// _this.sendData.code = _this.Data.code; //code 
				this.maxCanBuy();
			},
			'Data.wallone': function (val, oval) {
				this.maxCanBuy();
				this.allMoney();
			},
			'price': function (val, oval) {
				let _this = this
				_this.sendData.newprice = val;
				this.maxCanBuy();
			},

			'sendData.newprice': function (val, oval) {
				var saveNums = this.$public.SavePoint(this.Data.code)
				//从新计算最大购买量和交易额
				if (!this.isLogin) return false;
				// 只可输入1个小数点
				var arr = String(val).split(".")
				if (arr.length == 3) {
					val = oval
					return false
				}
				// 不可输入特殊字符
				if (isNaN(Number(val))) {
					val = oval
					return false
				}
				// 达到限定小数位后不可输入
				if (arr.length == 2 && arr[1].length > saveNums) {
					val = oval
				}
				this.maxCanBuy();
				this.allMoney();
			},
			'sendData.buynum': function (val, oval) {
				// 限价交易按交易数量保留市价按交易额保留
				var saveNums = this.ModifyState ? this.$public.SavePoint(this.Data.code) : this.savePoint
				var arr = String(val).split(".")
				// 只可输入1个小数点
				if (arr.length == 3) {
					this.sendData.buynum = oval
					return false
				}
				// 不可输入特殊字符
				if (isNaN(Number(val))) {
					this.sendData.buynum = oval
					return false
				}
				if (arr.length == 2 && arr[1].length > saveNums) {
					this.sendData.buynum = oval
				}
				//从新计算最大购买量和交易额
				if (!this.isLogin) return false;
				this.maxCanBuy();
				this.allMoney();
				this.cnyMoney();

			},
		},
		//过滤器
		filters: {
			normal: function (val) {
				if (!val) return '--'
				var n = val.indexOf('_');
				if (n == -1) return '--'
				return (val.toUpperCase().slice(0, n));
			},
			normal1: function (val) {
				if (!val) return '--'
				var n = val.indexOf('_');
				if (n == -1) return '--'
				return (val.toUpperCase().slice(n + 1, val.length));
			}
		},
		computed: {
			// userData:
			// userData() {
			// 	if (sessionStorage.token) {
			// 		return JSON.parse(sessionStorage.userData)
			// 	} else {
			// 		return "null"
			// 	}
			// },
			codeRight() {
				if (this.Data) return '--'
				var arr = this.Data.code.split("/")
				return arr[1]
			},
			codeLeft() {
				if (this.Data) return '--'
				var arr = this.Data.code.split("/")
				return arr[0]
			},
			// 买 可用数量保留位数
			canUsePoint() {
				if (this.codeRight == "USDT") {
					return 4
				} else {
					return 8
				}
			},
			savePoint() {
				switch (this.codeLeft) {
					// case "BTC":
					// 	return 4
					// case "OMG":
					// 	return 4
					// case "GNT":
					// 	return 4
					// case "PST":
					// 	return 2
					// case "ZRX":
					// 	return 2
					// case "MANA":
					// 	return 2
					// case "ETH":
					// 	return 4
					// case "CQTF":
					// 	return 2
					default:
						return 6
				}
			}
		},
		methods: {
			// input change事件
			transValue(type) {
				switch (type) {
					case "price":
						var saveNums = this.$public.SavePoint(this.Data.code)
						this.sendData.newprice = Number(this.sendData.newprice).toFixed(saveNums)
						break
					case "nums":
						var saveNums = this.savePoint
						if (this.sendData.buynum == 0) {
							// 防止全部删除后输入框显示0.0000
							this.sendData.buynum = ''
						} else {
							// this.sendData.buynum =Number(this.sendData.buynum).toFixed(saveNums);
							if (this.ModifyState) {
								// 市价交易按交易对保留
								this.sendData.buynum = parseFloat(Number(this.sendData.buynum).toFixed(this.$public.SavePoint(this.Data.code)));
							} else {
								this.sendData.buynum = parseFloat(Number(this.sendData.buynum).toFixed(saveNums));
							}
						}
						break
				}
			},
			// 加减
			changeValue(type) {
				var _this = this
				var pointNums = _this.$public.SavePoint(this.Data.code)
				var _arr = ["0", "."]
				var nums;
				for (var i = 0; i < pointNums; i++) {
					if (i + 1 == pointNums) {
						_arr.push("1")
						break
					} else {
						_arr.push("0")
					}
				}
				nums = Number(_arr.join(""))
				if (type == '+') {
					_this.sendData.newprice = _this.$public.Addition(_this.sendData.newprice, nums)

				} else if (_this.sendData.newprice !== 0) {
					_this.sendData.newprice = _this.$public.Subtraction(_this.sendData.newprice, nums)
				}
			},
			/*
				 注意 ：市价 买入的时候 不知道当前的价格   是以USDT交易 滑竿和输入框显示的是USDT的数量  判断 字段 (ModifyState) true 市价  false 限价
			 * */

			//最大购买量
			maxCanBuy() {
				// var canUser =Number(this.Data.wallone/(1 + this.Data.trans_fee)).toFixed(8)
				var canUser = Number(this.Data.wallone / (1)).toFixed(8)
				if (this.ModifyState) {
					//说明是市价 买入 
					this.form.maximum = canUser;
					return false
				}
				if (this.sendData.newprice) {
					var num = Number(canUser / this.sendData.newprice);
					this.form.maximum = Number(num.toFixed(8));
				} else {
					this.form.maximum = ''
				}
			},
			fill(rate) {
				this.maxCanBuy();
				this.allMoney();
				if (this.ModifyState) {
					this.sendData.buynum = Number(this.form.maximum * rate).toFixed(this.$public.SavePoint(this.Data.code))
					console.log(this.sendData.buynum)

				} else {
					this.sendData.buynum = parseFloat(Number(this.form.maximum * rate).toFixed(this.savePoint))
				}
				// this.maxCanBuy();
				// this.allMoney();
			},
			cnyMoney() {
				this.yuecny = Number(this.$public.Multiplication(this.form.turnover, this.Data.cnyPrice)).toFixed(2);
			},
			//最总交易额
			allMoney() {
				// if(this.Data.trans_fee===""||this.Data.trans_fee===null){
				// 	this.form.turnover = 0;
				// 	return false;
				// }
				if (this.ModifyState) {
					// this.form.turnover =  Number(this.sendData.buynum  *  (1+ this.Data.trans_fee) ).toFixed(8);
					this.form.turnover = Number(this.sendData.buynum * (1)).toFixed(8);
					return false
				}

				// 数量 * 单价/(1 + 手续费)
				this.form.turnover = ((this.sendData.newprice * this.sendData.buynum) * (1)).toFixed(8);
				//this.form.turnover =  ( ( this.sendData.newprice * this.sendData.buynum)  *  (1+ this.Data.trans_fee) ).toFixed(8);
			},
			onSubmit: function () { //订单
				var _this = this;
				this.sendData.code = _this.Data.code; //code 
				// if(_this.sendData.code == 'ETC/USDT') {
				// 	this.$alert(_this.$t("bibi.tk[1]"), {
				// 		confirmButtonText: _this.$t("bibi.tk[0]"),

				// 	});
				// 	return false;
				// }
				// if(_this.sendData.code == 'ea_usdt' ||_this.sendData.code == 'hub_usdt' ||_this.sendData.code == 'hac_usdt'){
				// 	this.$alert(_this.$t("bibi.tk[2]"), {
				// 		confirmButtonText: _this.$t("bibi.tk[0]"),
				// 	});
				// 	return false;
				// }
				var dis = null;
				// if(this.userData.authentication ==0){
				// 	_this.$public.confirm(_this.$t('header.Tipstext2[0]'), 'changePerson2', _this);
				// 	// _this.$public.msg(_this.$t('header.Tipstext2[0]'), 'warning', _this);
				//     return false;
				// }

				// if(!sessionStorage.tpwd){
				// 	_this.$public.confirm(_this.$t('apply.judge[1]'), 'security', _this);
				// 	// _this.$public.msg(_this.$t('apply.judge[1]'), 'warning', _this);
				//     return false;
				// }
				// 最小交易额限制
				// var sums=Number(_this.$public.Multiplication(_this.form.turnover,_this.Data.cnyPrice));
				// if(sums<Number(_this.Data.minbuynum)){
				// 	_this.$public.msg(_this.$t('bibi.other[3]')+_this.Data.minbuynum+'CNY', 'warning', _this);
				// 	return false;
				// }
				//				_this.loadingsellout = true;
				if (_this.ModifyState) {
					_this.sendData.otype = 2;
					//市价
					if(_this.sendData.buynum == ''){
						_this.$public.msg(this.$t('Gic.Placeorder[6]'), 'warning', _this);
						return false
					}

					dis = this.$t("Gic.bbOrderAll[19]")

				} else if (!_this.ModifyState) {
					_this.sendData.otype = 1;
					if(_this.sendData.newprice == ''){
						_this.$public.msg('请输入委托价格', 'warning', _this);
						return false
					}
					if(_this.sendData.buynum == ''){
						_this.$public.msg(this.$t('Gic.Placeorder[6]'), 'warning', _this);
						return false
					}


					//限价
					dis = this.$t("Gic.bbOrderAll[18]")
				}
				// _this.sendData.mobile = _this.userData.phone; //手机号

				if (_this.ModifyState) {
					//市价  委托总金额  委托总数量 
					_this.sendData.newprice = _this.$t("Gic.bbOrderTan[12]");
					var sendData = {
						// mobile: _this.userData.phone,
						code: _this.sendData.code,
						toalprice: _this.sendData.buynum,  //委托总金额 (市价买入)
						type: _this.sendData.type, //1买入 2卖出 
						otype: _this.sendData.otype, //1限价 2市价 
					}

				} else {
					//委托价格 委托数量 
					var sendData = {
						// mobile: _this.userData.phone,
						code: _this.sendData.code,
						buyprice: _this.sendData.newprice,  //委托价格
						buynum: _this.sendData.buynum, //委托数量
						type: _this.sendData.type, //1买入 2卖出 
						otype: _this.sendData.otype, //1限价 2市价 
					}
				}
				// if (!_this.$public.dataDetection(sendData, _this.Data.wallone, _this)) {
				// 	return false
				// }
				const h = this.$createElement;
				var nightModel = this.$cookies.get('changeBg') == 'night'
				this.$msgbox({
					title: this.$t("Gic.bbOrderTan[6]"),
					customClass: nightModel ? "bbMessageBox Night" : "bbMessageBox Day",
					cancelButtonClass: "bbMessageBox-cancel",
					confirmButtonClass: "bbMessageBox-confirm",
					message: h('div', {
						style: 'width: 100%;margin:0 auto;minWidth:260px;'
					}, [

						h('div', {
							style: 'overflow: hidden'
						}, [
							h('p', {
								style: 'float:left;width:140px;'
							}, [
								h('span', null, this.$t("Gic.bbOrderAll[4]") + '：'),
								h('span', {
									style: 'color:#03C087'
								},  this.$t("Gic.bbOrderAll[16]")),
							]),

							h('p', {
								style: 'float:left;marginLeft:30px;'
							}, [
								h('span', null, this.$t("Gic.bbOrderTan[7]") + "："),
								h('span', null, dis),
							])

						]),
						h('div', {
							style: 'overflow: hidden'
						}, [
							h('p', {
								style: 'float:left;width:140px;'
							}, [
								h('span', null, this.$t("Gic.bbOrderTan[8]") + "："),
								h('span', null, _this.sendData.newprice),
							]),
							h('p', {
								style: 'float:left;marginLeft:30px;'
							}, [
								h('span', null, this.$t("Gic.bbOrderTan[9]") + "："),
								h('span', null, _this.sendData.buynum),
							])
						]),

						h('div', {
							style: 'overflow: hidden'
						}, [
							h('p', {
								style: 'float:left;width:100%;'
							}, [
								h('span', null, this.$t("Gic.Placeorder[8]") + "："),
								h('span', null, this.$t("Gic.Placeorder[9]") + _this.$public.Multiplication(_this.Data.trans_fee,Number(1000))),
							]),
						]),


					]),
					showCancelButton: true,
					confirmButtonText: this.$t("Gic.bbOrderTan[11]"),
					cancelButtonText: this.$t("Gic.bbOrderTan[10]"),
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = _this.$t("bibi.alse[11]");
							//数据请求 开始下单
							done();

							_this.$http.post(_this.$http.bbtran, sendData).then(function (response) {
								//								done();
								instance.confirmButtonLoading = false;
								if (response.data.code == "200") {
									_this.$public.msg(_this.$t("bibi.alse[12]"), 'success', _this);
									_this.sendData.buynum = 0;
									_this.cg = null;
									_this.maxCanBuy();
									_this.allMoney();
									_this.$emit('changeData');
								} else {
									_this.$public.msg(response.data.msg, 'warning', _this);
								}
							}).catch(function (error) { });

						} else {
							done();
						}
					}
				}).then(action => { });

			},
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) { },
		mounted: function () {
			var _this = this;
			//			_this.userInfo();
			if (sessionStorage.token) {
				//表示已经登录了
				_this.isLogin = true;
			}
			_this.sendData.code = _this.Data.code; //code
			setTimeout(function () {
				_this.sendData.newprice = _this.Data.PriceData; //最新价格
				_this.maxCanBuy();
				_this.allMoney();
			}, 1500)
		},
		components: {}
	}
</script>
<style>

</style>