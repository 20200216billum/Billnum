<style lang=less>
	@import '../../assets/public.less';
	@import './ggOrder.less';
	.alerts {
		color: #999;
		margin-left: 20px;
	}
</style>
<template>
	<div class="gg_order_wrapper">
		<div class="order_container">
			<div class="headertongji">
			<div class="tongji1 tongji">
				<h2>
					动态权益:
					<span>{{tongjiData.totalusdt}}</span>
				</h2>
				<h2>
					浮动盈亏:
					<span>{{tongjiData.yingkui}}</span>
				</h2>
			</div>
			<div class=" line"></div>
			<div class="tongji2 tongji">
				<h2>
					可用资金:
					<span>{{tongjiData.keyong_price}}</span>
				</h2>
				<h2>
					平仓盈亏:
					<span>{{tongjiData.pingcang}}</span>
				</h2>
			</div>
			<div class=" line"></div>
			
			<div class="tongji3 tongji">
				<h2>
					冻结保证金:
					<span>{{tongjiData.totaldeposit}}</span>
				</h2>
				<h2>
					爆仓率:
					<span>{{tongjiData.risk}}</span>
				</h2>
			</div>
		</div>
			
			<el-card class="content">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="持仓" name="first" class="historyWt">
						<el-table :data="requestData3" style="width: 100%" height="600">
							<el-table-column prop="pname" label="币种名称" width="120">
							</el-table-column>
							<el-table-column prop="otype" label="方向" width="60">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="red">做多</div>
									<div v-else class="green">做空</div>
								</template>
							</el-table-column>
							<el-table-column prop="addtime" label="建仓时间" width="150">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="hold_no" label="持仓编号" width="140">
							</el-table-column>
							<el-table-column prop="buynum" label="持仓数量">
							</el-table-column>
							<el-table-column prop="buyprice" label="持仓价格">
							</el-table-column>
							<el-table-column prop="newprice" label="最新价格">
							</el-table-column>
							<el-table-column prop="sxfee" label="手续费">
							</el-table-column>
							<el-table-column prop="dayfee" label="利息">
							</el-table-column>
							<el-table-column prop="poit_win" label="止盈点位" width="50">
							</el-table-column>
							<el-table-column prop="poit_loss" label="止损点位" width="50">
							</el-table-column>
							<el-table-column prop="fdyk" label="浮动盈亏" width="100">
								<template slot-scope="scope">
									<div v-if="scope.row.fdyk == 0 ">— —</div>
									<div v-else>{{ scope.row.fdyk }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="totalprice" label="保证金" width="100">
							</el-table-column>
							<el-table-column prop="id" label="操作" width="150">
								<template slot-scope="scope">
									<!--<el-button @click.native.prevent="deleteRow(scope, requestData3)" type="primary" plain size="small">
										<span>平仓</span>
									</el-button>-->
									<!-- <span class="todos" @click="deleteRow(scope, requestData2)">平仓</span> -->
									<el-button type="primary" class="todos" @click="deleteRow(scope, requestData2)">平仓</el-button>
									<el-button type="warning" class="todos" @click="editStop(scope.row)">编辑</el-button>

									<!-- <span class="todos" @click="editStop(scope.row)">编辑</span> -->

								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="委托记录" name="second" class="historyWt">
						<el-table :data="requestData2" style="width: 100%" height="600">
							<el-table-column prop="addtime" label="委托时间" width="150">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="otype" label="方向" width="60">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="red">做多</div>
									<div v-else class="green">做空</div>
								</template>
							</el-table-column>

							<el-table-column prop="en_no" label="委托编号" width="140">
							</el-table-column>
							<el-table-column prop="account" label="会员账号">
							</el-table-column>
							<el-table-column prop="username" label="会员姓名">
							</el-table-column>
							<el-table-column prop="totalprice" label="保证金">
							</el-table-column>
							<el-table-column prop="sxfee" label="手续费用">
							</el-table-column>
							<el-table-column prop="pname" label="币种名称" width="100">
							</el-table-column>
							<el-table-column prop="buyprice" label="委托价格" width="80">
							</el-table-column>
							<el-table-column prop="buynum" label="委托数量">
							</el-table-column>
							<el-table-column prop="poit_win" label="止盈点位">
							</el-table-column>
							<el-table-column prop="poit_loss" label="止损点位">
							</el-table-column>
							<el-table-column prop="id" label="操作">
								<template slot-scope="scope">
									<!--<el-button v-if="scope.row.state == 1" @click.native.prevent="deleteRow(scope, requestData2)" type="primary" plain size="small">
										<span style="font-size: 12px;">撤销</span>
									</el-button>
									<el-button v-else disabled @click.native.prevent="deleteRow(scope, requestData3)" type="primary" plain size="small">
										<span>撤销</span>
									</el-button>-->
									<el-button type="warning" class="todos" @click="deleteRow(scope, requestData2)">编辑</el-button>
									<!-- <span class="todos" @click="deleteRow(scope, requestData2)">撤销</span> -->
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="成交记录" name="third" class="nowDeal">
						<el-table :data="requestData1" style="width: 100%" height="600">
							<el-table-column prop="pname" label="币种" width='120'>
							</el-table-column>
							<el-table-column prop="buynum" label="购买数量">
							</el-table-column>
							<el-table-column prop="otype" label="方向">
								<template slot-scope="scope">
									<div v-if="scope.row.otype == 1 " class="red">做多</div>
									<div v-else class="green">做空</div>
								</template>
							</el-table-column>
							<el-table-column prop="en_no" label="平仓类型" width="120">
								<template slot-scope="scope">
									<div v-if="scope.row.pc_type == 1 " class="green">手动平仓</div>
									<div v-else-if="scope.row.pc_type == 2" class="green">止盈平仓</div>
									<div v-else-if="scope.row.pc_type == 3" class="green">止损平仓</div>
									<div v-else-if="scope.row.pc_type == 4" class="green">系统强平</div>
									<div v-else class="green"> --</div>
								</template>
							</el-table-column>

							<el-table-column prop="selltime" label="平仓时间" width="150">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.selltime) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="sellprice" label="平仓价格">
							</el-table-column>
							<el-table-column prop="buyprice" label="委托价格">
							</el-table-column>
							<el-table-column prop="sxfee" label="手续费">
							</el-table-column>
							<el-table-column prop="dayfee" label="利息">
							</el-table-column>
							<el-table-column prop="profit" label="盈亏">
							</el-table-column>
							<el-table-column prop="poit_win" label="止盈点位">
							</el-table-column>
							<el-table-column prop="poit_loss" label="止损点位">
							</el-table-column>
							<el-table-column prop="totalprice" label="保证金" width="100">
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<!--<div class="right">
					<div class="bitType">币种</div>
					<span>/</span>
					<el-select v-model="selectValue" placeholder="请选择">
						<el-option key="" label="全部" value=""></el-option>
						<el-option v-for="item in options" :key="item.mark" :label="item.pname" :value="item.mark"></el-option>
					</el-select>
					<el-button @click="searchBtn" type="primary">搜索</el-button>
				</div>-->
				<!--<div class="right" v-show="activeName == 'first'" style="display: none;">
					<el-button @click="all_ping" type="primary">一键平仓</el-button>
				</div>-->

			</el-card>
		</div>
		<!--<FooTer></FooTer>-->
		<!--弹框-->
		<el-dialog title="设置止盈止损" width="520px" :visible.sync="dialogFormVisible">
			<div class="diaBody">
				<div class="stopwill">
					<span>止盈: </span>

					<el-input-number v-model="listData.zy" :min='0' :max="stopwin.max"></el-input-number>
					<span class="alerts"> >={{ stopwin.min }}</span>
				</div>
				<div class="stopLoss">
					<span>止损: </span>
					<el-input-number v-model="listData.zs" :min='0' :max="stoploss.max"></el-input-number>
					<!--<el-input-number v-model="listData.zs" :min='0' :max="stoploss.max"  :disabled="true"  v-else></el-input-number>-->
					<!--<span class="alerts" ></span>-->
					<span class="alerts">>={{ stoploss.min }}</span>
				</div>
			</div>
			<p class="beizhu">
				<span>
					注：未输入点位，系统将默认放弃设置
				</span>
			</p>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="OrderDown()" :loading="addLoading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isShow: false,
				dialogFormVisible: false,
				addLoading: false,
				isActive: true,
				show: true,
				activeName: 'first',
				requestData1: [],
				requestData2: [],
				requestData3: [],
				listData: {
					zy: '', //止盈
					zs: '', //止损
					h_id: '' //订单ID
				}, //列表返回过来的数据
				options: [],
				selectLabel: '',
				selectValue: '',
				timer: null,
				code: '',
				stop: {
					stopwin: '', //止盈
					stoploss: '', //止损

				},
				//判断止盈止损所需条件
				scopeData: {
					otype: '', //方向 1 是做多 2是做空
					newprice: '', //最新价格
					orderprice: '', //下单价
					var_price: '', //最小变动价
					stoploss: '', //止损（最大）  //后台设置
					stopwin: '' //止盈（最大） //后台设置
				},
				//止盈最大最小
				stopwin: {
					min: '',
					max: ''
				},
				//止损最大最小
				stoploss: {
					min: '',
					max: ''
				},
				tongjiData:{
					keyong_price:'--',  //可用资金
					totalusdt:'--', //动态权益
					totaldeposit:'--', //冻结保证金
					yingkui:'--',  //浮动盈亏
					risk:'--',  //风险率
					pingcang:'--'  //平常盈亏
				},
				hold_id: '' //订单ID
			}
		},
		methods: {
			handleClick(tab, event) { // 切换事件
				var _this = this;
				_this.getBitType(); // 获取币种
				_this.code = null; // 清空搜索条件
				switch(_this.activeName) {
					case 'first':
						clearInterval(_this.timer);
						_this.requestPublic('requestData3', 'chicang');
						if(_this.timer) {
							clearInterval(_this.timer);
						}
						_this.timer = window.setInterval(function() {
							_this.requestPublic('requestData3', 'chicang');
							_this.tongji();
						}, 2000);
						
						break;
					case 'second':
						clearInterval(_this.timer);
						_this.requestPublic('requestData2', 'weituo');
						break;
					case 'third':
						clearInterval(_this.timer);
						_this.requestPublic('requestData1', 'chengjiao');

						break;
					default:
						break;
				}
			},
			//一键平仓执行函数
			all_ping() {
				var _this = this;
				//判断有没有订单
				if(this.requestData3.length == 0){
					_this.$public.msg('您暂无持仓单', 'warning', _this);
					return false;
				}
				this.$confirm('您确定对所有持仓单进行平仓操作么？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//请求接口
					_this.$http.post(_this.$http.all_ping, {}).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消该操作'
					});
				});

			},
			tongji(){
				var _this = this;
				// console.log(1);
				_this.$http.post(_this.$http.tongji, {
					mobile:sessionStorage.mobile
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.tongjiData =response.data.data; 
						
					}
			}).catch(function(error) {});
				
				
			},
			
			//止盈止损确定函数
			OrderDown() {
				var _this = this;
				//设置止盈的最小值要大于计算止盈的最小值
				//设置 listData.zy
				//设置止损的最小值要大于计算止损的最小值
				
				 if(_this.listData.zs != 0 && _this.listData.zs < _this.stoploss.min) {
					_this.$public.msg('止损点位要大于等于' + _this.stoploss.min, 'warning', _this);
					return false
				} else if(_this.listData.zy != 0 && _this.listData.zy < _this.stopwin.min) {
					_this.$public.msg('止盈点位要大于等于' + _this.stopwin.min, 'warning', _this);
					return false
				}
				_this.addLoading = true;
				_this.$http.post(_this.$http.set_poit, _this.listData).then(function(response) {
					_this.addLoading = false;
					if(response.data.status == "200") {
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.requestPublic('requestData3', 'chicang');
						_this.dialogFormVisible = false;

						_this.listData.zy = 0;
						_this.listData.zs = 0;

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			deleteRow(scope, rows) { // 操作事件函数
				var _this = this;
				_this.$confirm('是否确认此操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var reqUrl;
					var mobile = sessionStorage.getItem('mobile');
					var orders_id;
					if(_this.activeName == 'second') {
						reqUrl = _this.$http.cancellations;
						orders_id = scope.row.en_id;
					}
					if(_this.activeName == 'first') {
						reqUrl = _this.$http.pingcang;
						orders_id = scope.row.hold_id;
					}
					_this.$http.post(reqUrl, {
							'mobile': mobile,
							'order_id': orders_id
						})
						.then((res) => {
							if(res.data.status == 200) {
								rows.splice(scope.$index, 1);
								_this.$message({
									message: res.data.msg,
									type: 'success'
								});
								if(_this.activeName == 'first') {
									_this.requestPublic('requestData1', 'chichang');
								}
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
						message: '已取消操作'
					});
				});
			},
			searchBtn() { // 搜索按钮事件
				var _this = this;
				_this.code = _this.selectValue;
				//				if(_this.selectValue == '') {
				//					_this.$public.msg('搜索值为空，请选择搜索条件', 'warning', _this);
				//				} else {
				if(_this.activeName == 'first') {
					_this.requestPublic('requestData1', 'chichang');
				} else if(_this.activeName == 'second') {
					_this.requestPublic('requestData2', 'weituo');
				} else {
					_this.requestPublic('requestData3', 'chengjiao');
				}
				//				}
			},
			//编辑止盈止损按钮执行函数
			editStop(datas) {
				this.listData.h_id = datas.hold_id, //订单Id
					this.listData.zy = datas.poit_win, //止盈
					this.listData.zs = datas.poit_loss //止损

				this.scopeData.otype = datas.otype;
				this.scopeData.newprice = datas.newprice;
				this.scopeData.orderprice = datas.buyprice;
				this.hold_id = datas.hold_id; //改变code
				this.judgment(datas.code);

			},
			//获得判断条件
			judgment(code) {
				var _this = this;
				_this.$http.get(_this.$http.get_lever, {
					params: {
						code: code
					}
				}).then((res) => {
					_this.scopeData.var_price = res.data.data.var_price;
					_this.scopeData.stoploss = res.data.data.stoploss;
					_this.scopeData.stopwin = res.data.data.stopwin;
					_this.scope(); //计算范围
					this.dialogFormVisible = true;
				});
			},
			scope() {
				//计算止盈止损范围
				//				scopeData:{
				//					otype:'',  //方向 1 是做多 2是做空
				//					newprice:'',  //最新价格
				//					orderprice:'', //下单价
				//					var_price:'',//最小变动价
				//					stoploss:'',  //止损（最大）
				//					stopwin:''  //止盈（最大）
				//				}	
				if(this.scopeData.otype == 1) {
					//做多

					var doBad = Number(this.scopeData.newprice - this.scopeData.orderprice);
					var fanwei = Math.ceil(Math.abs(Number(doBad)) / Number(this.scopeData.var_price));

					if(doBad > 0) {
						this.stopwin.min = fanwei;
						this.stopwin.max = Number(this.scopeData.stopwin);

						this.stoploss.min = 0;
						this.stoploss.max = Number(this.scopeData.stoploss);
					} else if(doBad < 0) {
						this.stopwin.min = 0;
						this.stopwin.max = Number(this.scopeData.stopwin);

						this.stoploss.min = fanwei;
						this.stoploss.max = Number(this.scopeData.stoploss);
					}

				} else if(this.scopeData.otype == 2) {
					//做空
					var doBad = this.scopeData.orderprice - this.scopeData.newprice;
					var fanwei = Math.ceil(Math.abs(Number(doBad)) / Number(this.scopeData.var_price));
					if(doBad > 0) {
						this.stopwin.min = fanwei;
						this.stopwin.max = Number(this.scopeData.stopwin);

						this.stoploss.min = 0
						this.stoploss.max = Number(this.scopeData.stoploss);
					} else if(doBad < 0) {
						this.stopwin.min = 0
						this.stopwin.max = Number(this.scopeData.stopwin);

						this.stoploss.min = fanwei;
						this.stoploss.max = Number(this.scopeData.stoploss);
					}
				}
			},
			getBitType: function() { // 获取币种信息
				var _this = this;
				_this.$http.post(_this.$http.getPro, {})
					.then((res) => {
						_this.selectLabel = res.data.data[0].pname;
						_this.selectValue = '';
						_this.options = res.data.data;
					});
			},
			requestPublic: function(status, url) { // 默认请求、初始化请求
				var _this = this;
				var mobile = sessionStorage.getItem('mobile');
				_this.$http.post(_this.$http[eval('url')], {
						mobile: mobile,
						code: _this.code
					})
					.then((res) => {
						_this.requestData1 = [];
						_this.requestData2 = [];
						_this.requestData3 = [];
//						console.log(res);
						if(!res){
							return false;
						}
						if(res.data.status == 200) {
							_this[eval('status')] = res.data.data;
							if(url == 'chicang' && _this.hold_id != 0) {
								for(var i = 0; i < res.data.data.length; i++) {
									if(res.data.data[i].hold_id == _this.hold_id) {
										_this.scopeData.newprice = res.data.data[i].newprice;
										_this.scopeData.orderprice = res.data.data[i].buyprice;
										//刷新弹框 从新计算最大最小值
										_this.scope();
									}
								}
							}
						}
					});
			},
			offTime(){
				clearInterval(this.timer);
			}
		},
		beforeRouteLeave(to, from, next) { // 路由改变时
			var _this = this;
			clearInterval(_this.timer);
			next()
		},
		created: function() {
			var _this = this;
			_this.getBitType();
			_this.requestPublic('requestData3', 'chicang');
			if(_this.timer) {
				clearInterval(_this.timer);
			}
			if(sessionStorage.getItem('account')){
				_this.timer = window.setInterval(function() {
					_this.requestPublic('requestData3', 'chicang');
					_this.tongji();
				}, 2000);
			}
		},
		components: {}
	}
</script>