<style lang=less>
	@import '../../../assets/public.less';
	@import './moneyRecord.less';
</style>
<template>
	<div class="money_record_wrapper">
		<div class="money_record_container">
			<h5>{{$t('Gic.moneyRecord[0]')}}</h5>
			<el-tabs v-model="activeName" @tab-click="handleClick" class="tab_top">
				<!-- 充币记录 -->
				<el-tab-pane :label="$t('Gic.moneyRecord[1]')" name="first">
					<el-table :data="rechargeData" style="width: 100%">
						<el-table-column prop="mark" :label="$t('Gic.moneyRecord[4]')" width="360">
								<template slot-scope="scope">
										<span v-if="scope.row.mark == '后台充值' || scope.row.mark == '后台调节'">{{$t('Gic.addCoin[18]')}}</span>
										<span v-else>{{scope.row.mark}}</span>
								</template>
						</el-table-column>
						<el-table-column prop="money" :label="$t('Gic.moneyRecord[5]')" width="240">
						</el-table-column>
						<el-table-column prop="created_at" :label="$t('Gic.moneyRecord[6]')">
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<!-- 提币记录 -->
				<el-tab-pane :label="$t('Gic.moneyRecord[2]')" name="second">
					<el-table :data="withdrawLogData" style="width: 100%">
						<el-table-column prop="address" :label="$t('Gic.moneyRecord[7]')" width="360">
						</el-table-column>
						<el-table-column prop="money" :label="$t('Gic.moneyRecord[8]')" width="240">
						</el-table-column>
						<el-table-column prop="created_at" :label="$t('Gic.moneyRecord[9]')" width="240">
						</el-table-column>
						<el-table-column prop="refuse_reason" :label="$t('Gic.moneyRecord[10]')">
								<template slot-scope="scope">
										<span v-if="scope.row.refuse_reason == '' || scope.row.refuse_reason == null">--</span>
										<span v-else>{{scope.row.refuse_reason}}</span>
								</template>
						</el-table-column>
						<el-table-column prop="status" :label="$t('Gic.moneyRecord[11]')">
							<template slot-scope="scope">
								<span v-if="scope.row.status == '1'">{{$t('Gic.moneyRecord[14]')}}</span>
								<span v-if="scope.row.status == '2'">{{$t('Gic.moneyRecord[15]')}}</span>
								<span v-if="scope.row.status == '3'" style="color:#ff5652;">{{$t('Gic.moneyRecord[16]')}}</span>
								<span v-if="scope.row.status == '4'">{{$t('Gic.moneyRecord[17]')}}</span>
								<span v-if="scope.row.status == '5'">{{$t('Gic.moneyRecord[18]')}}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<!-- 其他 -->
				<el-tab-pane :label="$t('Gic.moneyRecord[3]')" name="third">
					<el-table :data="userMoneyLogData" style="width: 100%">
						<el-table-column prop="mark" :label="$t('Gic.moneyRecord[12]')" width="400">
								<template slot-scope="scope">
										<span v-if="scope.row.mark == '后台充值' || scope.row.mark == '后台调节'">{{$t('Gic.addCoin[18]')}}</span>
										<span v-else>{{scope.row.mark}}</span>
								</template>
						</el-table-column>
						<el-table-column prop="money" :label="$t('Gic.moneyRecord[13]')" width="400">
						</el-table-column>
						<el-table-column prop="created_at" :label="$t('Gic.moneyRecord[6]')">
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>

		</div>
		<el-pagination v-if="activeName == 'first'" background class="fenye" layout="prev, pager, next" :total="total" @current-change="current_change1"
			:page-size='size' :current-page.sync="page"></el-pagination>
			<el-pagination v-else-if="activeName == 'second'" background class="fenye" layout="prev, pager, next" :total="total" @current-change="current_change2"
			:page-size='size' :current-page.sync="page"></el-pagination>
			<el-pagination v-else background class="fenye" layout="prev, pager, next" :total="total" @current-change="current_change3"
			:page-size='size' :current-page.sync="page"></el-pagination>
	</div>
</template>
<script>


	export default {
		data() {
			return {
				activeName: 'first',
				rechargeData: [],    //充币明细
				withdrawLogData: [], //提币明细
				userMoneyLogData: [], //其他明细

				page: null,
				total: null,
				size: 10,
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab.paneName);
				if (tab.paneName == 'second') {
					this.get_withdrawLog();
				}
				if (tab.paneName == 'third') {
					this.get_userMoneyLog();
				}
			},
			//充币明细
			get_recharge_index() {
				var _this = this;
				this.$http.get(this.$http.recharge_index, { params: { pid: this.$route.query.id,page:this.page, size:this.size } }).then((r) => {
					if (r.data.code == 200) {
						this.rechargeData = r.data.data.data;
						this.page = r.data.data.current_page
						this.total = r.data.data.total
					} else {
						// this.public.msg(r.data.msg,'error',this)
					}
				})
			},
			//提币明细
			get_withdrawLog() {
				this.$http.get(this.$http.withdrawLog, { params: { pid: this.$route.query.id,page:this.page, size:this.size } }).then((r) => {
					if (r.data.code == 200) {
						this.withdrawLogData = r.data.data.data;
						this.page = r.data.data.current_page
						this.total = r.data.data.total
					} else {
						// this.public.msg(r.data.msg,'error',this)
					}
				})
			},
			// 其他明细
			get_userMoneyLog() {
				this.$http.post(this.$http.userMoneyLog, { pid: this.$route.query.id ,page:this.page, size:this.size}).then((r) => {
					if (r.data.code == 200) {
						this.userMoneyLogData = r.data.data.data;
						this.page = r.data.data.current_page
						this.total = r.data.data.total
					} else {
						// this.public.msg(r.data.msg,'error',this)
					}
				})
			},
			current_change1(val) {
				this.page = val
				this.get_recharge_index();
			},
			current_change2(val) {
				this.page = val
				this.get_withdrawLog();
			},
			current_change3(val) {
				this.page = val
				this.get_userMoneyLog();
			},
		},
		created: function () {
			var _this = this;
			_this.get_recharge_index();


			window.scrollTo(0, 0); //回到顶部
		},
	}
</script>