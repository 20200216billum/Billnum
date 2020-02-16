<style lang=less>
	@import '../../assets/public.less';
	@import './fbOrder.less';
	.AD{
		color: #75a7ff
	}
</style>
<template>
	<div class="fb_order_wrapper">

		<div class="order_container">

				<el-tabs v-model="activeName" class="deal_tables" @tab-click="handleClick">
					<!--购买明细-->
					<el-tab-pane :label="$t('fbOrder.header[0]')" name="first">
						<el-table :data="requestData1" style="width: 100%" height="600">
							<el-table-column prop="order_num" :label="$t('fbOrder.conent[0]')" width="220">
								<template slot-scope="scope">
									<div>{{ $public.toLowFixed(scope.row.order_num,6) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="	" :label="$t('fbOrder.conent[1]')" width="220">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
								</template>
							</el-table-column>
							<!--价格-->
							<el-table-column prop="price" :label="$t('fbOrder.conent[2]')">
								<template slot-scope="scope">
									<div>{{ $public.toLowFixed(scope.row.price,6) }}</div>
								</template>
							</el-table-column>
							<!--数量-->
							<el-table-column prop="total_num" :label="$t('fbOrder.conent[3]')">
								<template slot-scope="scope">
								<div>{{ $public.toLowFixed(scope.row.total_num,6) }}</div>
								</template>
						</el-table-column>
							<el-table-column prop="total_price" :label="$t('fbOrder.conent[4]')">
								<template slot-scope="scope">
								<div>{{ $public.toLowFixed(scope.row.total_price,6) }}</div>
								</template>
						</el-table-column>
							<el-table-column prop="status" :label="$t('fbOrder.conent[6]')" >
								
								<!--待付款', '已付款', '已确认', '申诉中', '取消', 冻结-->
								<template slot-scope="scope">
									<div v-if="scope.row.status == 1" class="AD">{{$t('fbOrder.conent[7]')}}</div>
									<div v-if="scope.row.status == 2" class="AD">{{$t('fbOrder.conent[8]')}}</div>
									<div v-if="scope.row.status == 3" class="AD">{{$t('fbOrder.conent[9]')}}</div>
									<div v-if="scope.row.status == 4" class="AD">{{$t('fbOrder.conent[10]')}}</div>
									<div v-if="scope.row.status == 5" class="AD">{{$t('fbOrder.conent[11]')}}</div>
									<div v-if="scope.row.status == 6" class="AD">{{$t('ziChan.list[2]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="id" :label="$t('fbOrder.conent[12]')">
								<template slot-scope="scope">
									<el-button type="primary" plain size="small" @click="linkOrdersFun(scope.row)">
										<span>{{$t('fbOrder.conent[13]')}}</span>
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>

					<!--出售明细-->
					<el-tab-pane :label="$t('fbOrder.header[1]')" name="second">
						<el-table :data="requestData2" style="width: 100%" height="600">
							<el-table-column prop="order_num" :label="$t('fbOrder.conent[0]')" width="220">
							</el-table-column>
							<el-table-column prop="add_time" :label="$t('fbOrder.conent[1]')" width="220">
								<template slot-scope="scope">
									<div>{{ $public.timestampToTime(scope.row.add_time) }}</div>
								</template>
							</el-table-column>
							<el-table-column prop="price" :label="$t('fbOrder.conent[2]')">
								<template slot-scope="scope">
								<div>{{ $public.toLowFixed(scope.row.price, 6) }}</div>
								</template>							</el-table-column>
						<el-table-column prop="total_num" :label="$t('fbOrder.conent[3]')">
								<template slot-scope="scope">
								<div>{{ $public.toLowFixed(scope.row.total_num, 6) }}</div>
								</template>		
						</el-table-column>
							<el-table-column prop="total_price" :label="$t('fbOrder.conent[4]')">
								<template slot-scope="scope">
								<div>{{ $public.toLowFixed(scope.row.total_price, 6) }}</div>
								</template>	
						</el-table-column>
							<el-table-column prop="sxfee" :label="$t('fbOrder.conent[5]')">
							</el-table-column>

							<el-table-column prop="status" :label="$t('fbOrder.conent[6]')">
								<!--待付款', '已付款', '已确认', '申诉中', '取消' 冻结,-->
								<template slot-scope="scope">
									<div v-if="scope.row.status == 1" >{{$t('fbOrder.conent[7]')}}</div>
									<div v-if="scope.row.status == 2">{{$t('fbOrder.conent[8]')}}</div>
									<div v-if="scope.row.status == 3">{{$t('fbOrder.conent[9]')}}</div>
									<div v-if="scope.row.status == 4">{{$t('fbOrder.conent[10]')}}</div>
									<div v-if="scope.row.status == 5">{{$t('fbOrder.conent[11]')}}</div>
									<div v-if="scope.row.status == 6">{{$t('ziChan.list[2]')}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="id" :label="$t('fbOrder.conent[12]')">
								<template slot-scope="scope">
									<el-button type="primary" plain size="small" @click="linkOrdersFun(scope.row)">
										<span>{{$t('fbOrder.conent[13]')}}</span>
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>

					<div class="pagination" style="margin-bottom:20px;" v-if="page.total>0">
						<el-pagination layout="prev, pager, next" :prev-text="$t('managemoney.other[1]')" :next-text="$t('managemoney.other[2]')" :total="page.total" :current-page.sync="page.current" :page-count="5" @current-change="changePage"></el-pagination>
					</div>
				</el-tabs>
				<div class="right" style="display: none;">
					<div class="bitType">{{$t('fbOrder.header[2]')}}</div>
					<span>/</span>
					<el-select disabled v-model="selectValue" :placeholder="$t('fbOrder.header[3]')">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			<!-- </el-card> -->
		</div>
		<!--<FooTer></FooTer>-->
	</div>
</template>
<script>
//import Header from "../../header/heaer.vue";
//import Footer from "../../footer/footer.vue";
export default {
	data() {
		return {
			isActive: true,
			show: true,
			activeName: 'first',
			options: [{
				value: 'USDT',
				label: 'USDT'
			}],
			selectValue: 'USDT',
			requestData1: [],
			requestData2: [],
			page: {
				current: 1,
				size: 10,
				total: 0
			},
		}
	},
	methods: {
		handleClick(tab, event) { // 切换事件
			var _this = this;
			_this.page.current = 1
			if(_this.activeName == 'first'){
				_this.requestPublic('requestData1','getMx','1');
			} else {
				_this.requestPublic('requestData2','getMx','2');
			}
		},
		requestPublic:function (status,url,type) {
			var _this = this;
			_this.$http.get(_this.$http[eval('url')],{
				params: {
					page: _this.page.current,
					size: _this.page.size,
					type:type
				}
			})
			.then((res) => {
				_this[eval('status')] = res.data.data.res;
				_this.page.total = Number(res.data.data.count);
				// _this.page.current = Number(res.data.data.p);
			});
		},
		linkOrdersFun:function (res) {
			var _this = this;
			var data = {};
			data = res;
			_this.$router.push({path: '/frenchorder'});
			window.sessionStorage.order = escape(JSON.stringify(data));
		},
		changePage(i){
			var _this = this;
			this.page.current = i;
			if(_this.activeName == 'first'){
				_this.requestPublic('requestData1','getMx','1');
			} else {
				_this.requestPublic('requestData2','getMx','2');
			}
		},
	},
	created: function() {
		var _this = this;
		_this.requestPublic('requestData1','getMx','1');
	},
}
</script>
<style>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
</style>