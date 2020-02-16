<style lang=less>
	@import '../../assets/public.less';
	@import './fund.less';
</style>
<template lang="html">
	<div id="fund">
		<div class="fundHeader">
			<div class="title boxs">
				<h2>基金管理</h2>
			</div>
			<ul class="dataListWarp boxs">
				<li class="list">
					<p>昨日挖矿产出（BF）</p>
					<h3 v-if="headerData.frostbf">{{headerData.frostbf}}</h3>
					<h3 v-else>0.0000</h3>
				</li>
				<li class="list">
					<p>持有基金总量（BF）</p>
					<h3 v-if="headerData.wallbf">{{headerData.wallbf}}</h3>
					<h3 v-else>0.0000</h3>
				</li>
				<li class="list line">
					<p>今日分红（USDT）</p>
					<h3 v-if="headerData.fund">{{headerData.fund}}</h3>
					<h3 v-else>0.0000</h3>
				</li>
				<li class="list">
					<p>累计分红（USDT）</p>
					<h3 v-if="headerData.wallfund">{{headerData.wallfund}}</h3>
					<h3 v-else>0.0000</h3>
				</li>
			</ul>
			<div class="btnWarp boxs">
				<span @click="dialogFormVisible = true">划转</span>
			</div>
		</div>
		<div class="fundbody">
			<el-tabs v-model="whitch" @tab-click="handleClick">
				<el-tab-pane label="基金分红" name="first">
					<el-table :data="fundlist" stripe style="width: 100%" v-loading="loading">
						<el-table-column prop="price" label="分红金额" width="690">
						</el-table-column>
						<el-table-column prop="addtime" :formatter='changeTime' label="时间" width=""></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="挖矿产出" name="second">
					<el-table :data="mininglist" stripe style="width: 100%" v-loading="loading">
						<el-table-column prop="bf_num" label="挖矿产出" width="690"></el-table-column>
						<el-table-column prop="addtime" :formatter='changeTime' label="时间" width=""></el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="资金明细" name="third">
					<el-table :data="bflist" stripe style="width: 100%" v-loading="loading">
						<el-table-column prop="type" :formatter="bftype" label="类型" width="300"></el-table-column>
						<el-table-column prop="bf_num" label="转化资金" width="350"></el-table-column>
						<el-table-column prop="bf_ttl" label="余额" width="350"></el-table-column>
						<el-table-column prop="state" label="状态" :formatter='bfState' ></el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!--弹框-->
		<div class="tankuang">
			<el-dialog title="划转" width="340px" :visible.sync="dialogFormVisible">
				<div class="modelWarp">
					<div class="changeWarp">
						<div class="star">
							<p>从</p>
							<h2 v-if="dataChangeFlat">交易账户</h2>
							<h2 v-else>基金账户</h2>
						</div>
						<div class="changeIcon">
							<span class="iconWarp" @click="dataChangeFlat = false;sendForm.type=2;sendForm.num=''" id="icon" v-if="dataChangeFlat">
								<i class="el-icon-sort"></i>
							</span>
							<span class="iconWarp iconWarp2" @click="dataChangeFlat = true;sendForm.type=1;sendForm.num=''" id="icon" v-else>
								<i class="el-icon-sort"></i>
							</span>
						</div>
						<div class="end">
							<p>转至</p>
							<h2 v-if="dataChangeFlat">基金账户</h2>
							<h2 v-else>交易账户</h2>
						</div>
					</div>
					<div class="changeNum">
						<p class="title" v-if="!dataChangeFlat">转化数量（可转化数量 :{{headerData.wallbf}} BF）</p>
						<p class="title" v-else-if="headerData.yue">转化数量（可转化数量 :{{headerData.yue}} BF）</p>
						<p class="title" v-else>转化数量（可转化数量 : 0 BF）</p>
						<el-input placeholder="请输入内容" v-model="sendForm.num">
						</el-input>
						<div class="el-input-group__append" @click="changeAll">全部</div>
						<p class="tishi" v-show="!dataChangeFlat">提示 ： 基金账户转出到账时间为 T+5</p>

					</div>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="converSion">立即转化</el-button>
						<el-button @click="dialogFormVisible = false">取 消</el-button>
					</div>
				</div>
			</el-dialog>
		</div>

		<div class="pageWarp" v-show="listLength != 0">
			<el-pagination background layout="prev, pager, next" :total="parseInt(pageData.totle)" :current-page="Number(isNum)" @current-change="pageChange" :page-size='pageData.size'></el-pagination>
		</div>
	</div>
</template>
<script>
	//import  from "";
	export default {
		data() {
			return {
				loading: true,
				whitch: 'first',
				dialogFormVisible: false, //弹框触发
				dataChangeFlat: true, //true 表示从交易转基金
				whitchChoose: 0, //判断table切换的位置
				listLength: 0, //分页是否显示
				isNum: 1,
				//头部数据
				headerData: {
					wallbf: 0.0000, // 基金BF余额（ 总挖矿）
					wallfund: 0.0000, // 累计分红
					frostbf: 0.0000, // 今日挖矿产出
					yue: 0.0000, //资产BF余额
					fund: 0.0000, //今天分红
					price: 0.0000 //分红金额
				},

				//基金分红
				fundlist: [{
					price: 1454,
					addtime: '1531798039'
				}],
				//挖矿明细
				mininglist: [],
				//资金明细
				bflist: [],

				pageData: {
					totle: 1, //一共有多少页
					size: 8, //显示条数
				},
				//向后台传的数据分页数据
				setData: {
					p: 1,
					size: 8
				},
				//余额转化数据
				sendForm: {
					type: 1, //1 余额转基金 2 基金赚余额
					num: '' //划转金额最多保留小数点后4位
				}
			}
		},
		methods: {
			//点击转化执行函数
			changeAll() {
				// dataChangeFlat: true, //true 表示从交易转基金
				if(this.dataChangeFlat) {
					this.sendForm.num = this.headerData.yue
				} else {
					this.sendForm.num = this.headerData.wallbf
				}

			},
			//时间转化函数
			changeTime(cellValue) {
				return this.$public.timestampToTime(cellValue.addtime);
			},
			bftype(cellValue) {
				if(cellValue.type == 1) {
					return '转入'
				} else if(cellValue.type == 2) {
					return '转出'
				} else {
					return '--'
				}
			},
			bfState(val) {
				if(val.state == 1) {
					return '已到账'
				} else if(val.state == 2) {
					return '处理中'
				} else {
					return '--'
				}

			},
			//事件切换处理函数
			handleClick(tab, event) {
				var _this = this;
				_this.whitchChoose = tab.index;
				switch(tab.index) {
					case '0':
						//基金分红
						_this.loading = true;
						_this.pageData.totle = 1;
						_this.fundBonus(_this.setData);
						break;
					case '1':
						_this.loading = true;
						_this.pageData.totle = 1;
						_this.bigRefs(_this.setData);
						//挖矿产出
						break;
					case '2':
						//资金明细
						_this.loading = true;
						_this.pageData.totle = 1;
						_this.subsidiary(_this.setData);
						break;
				}
			},
			//头部数据
			index() {
				var _this = this;
				_this.$http.post(_this.$http.index, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.headerData = response.data.data;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},

			//基金分红函数
			fundBonus(send) {
				var _this = this;
				_this.$http.post(_this.$http.fundlist, send).then(function(response) {
					_this.loading1 = false;
					if(response.data.status == "200") {
						_this.pageData.totle = response.data.data.count; //总条数
						_this.fundlist = response.data.data.list;
						_this.listLength = response.data.data.list.length;

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
					setTimeout(function() {
						_this.loading = false;
					}, 500);
				}).catch(function(error) {});
			},
			//挖矿参出函数
			bigRefs(send) {
				var _this = this;
				_this.$http.post(_this.$http.mininglist, send).then(function(response) {

					if(response.data.status == "200") {
						_this.pageData.totle = response.data.data.count; //总条数
						_this.mininglist = response.data.data.list;
						_this.listLength = response.data.data.list.length;

						//						_this.pageData.totle =20;  //总条数
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}

					setTimeout(function() {
						_this.loading = false;
					}, 500);
				}).catch(function(error) {});
			},
			//资金明细函数
			subsidiary(send) {
				var _this = this;

				_this.$http.post(_this.$http.bflist, send).then(function(response) {

					if(response.data.status == "200") {
						_this.pageData.totle = response.data.data.count; //总条数
						_this.bflist = response.data.data.list;
						_this.listLength = response.data.data.list.length;

					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
					setTimeout(function() {
						_this.loading = false;
					}, 500);
				}).catch(function(error) {});
			},
			//分页page更改执行函数
			pageChange(page) {
				var _this = this;
				var setData = {
					p: page,
					size: _this.setData.size
				}
				console.log(_this.whitchChoose);
				//调用具体函数				
				switch(_this.whitchChoose) {
					case '0':
						_this.fundBonus(setData);
						//基金分红
						break;
					case '1':
						_this.bigRefs(setData);
						//挖矿产出
						break;
					case '2':
						//资金明细
						_this.subsidiary(setData);
						break;
				}

			},
			//点击立刻转化执行函数
			converSion() {
				var _this = this;
				if(this.sendForm.num <= 0) {
					_this.$public.msg('划转数量不能为零', 'warning', _this);
					return false;
				} else if(this.sendForm.type == 1 && (Number(this.sendForm.num) > Number(this.headerData.yue))) {
					// type:1, //1 余额转基金 2 基金赚余额
					_this.$public.msg('划转数量不能大于余额', 'warning', _this);
					return false;
				} else if(this.sendForm.type == 2 && (Number(this.sendForm.num) > Number(this.headerData.wallbf))) {
					_this.$public.msg('划转数量不能大于持有数量', 'warning', _this);
					return false;
				}
				_this.$http.post(_this.$http.transform, _this.sendForm).then(function(response) {
					if(response.data.status == "200") {
						_this.dialogFormVisible = false;
						_this.$public.msg(response.data.msg, 'success', _this);
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});

			}

		},
		created: function() {
			this.fundBonus(this.setData);
			this.index();
		},
		mounted: function() {},
		components: {}
	}
</script>