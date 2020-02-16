<style lang=less>
	@import '../../../assets/public.less';
	@import './moneyRecord2.less';
</style>
<template>
	<div class="money_record_wrapper money_record2">
		<HeaDer></HeaDer>
		<div class="money_record_container">
			<el-card class="box-card title">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>{{ $t("moneyRecord.list[0]") }}</el-breadcrumb-item>
					<el-breadcrumb-item>{{ $t("moneyRecord.rests[4]") }}</el-breadcrumb-item> <!-- 理财账户 -->
					<el-breadcrumb-item>{{ $t("moneyRecord.rests[3]") }}</el-breadcrumb-item> <!-- 账单记录 -->
				</el-breadcrumb>
			</el-card>

			<!-- 充币、提币 -->
			<el-card class="box-card record_list">
				<table class="table" v-loading="loading">
					<tr>
						<th>{{$t("moneyRecord.rests[0]")}}</th><!-- 时间 -->
						<th>{{$t("moneyRecord.rests[1]")}}</th><!-- 数量 -->
						<th>{{ $t("moneyRecord.rests[5]") }}</th><!-- 描述 -->
					</tr>
					<tr v-for="(todo,index) in recordData3.res" :key="index">
						<td>{{ $public.timestampToTime(todo.addtime) }}</td>
						<td>{{ $public.toLowFixed(todo.price,8,0) }}</td>
						<!-- <td v-if="todo.type">{{todo.type}} </td> -->
						<td>{{ todo.memo }}</td>
					</tr>
				</table>
				<div v-if="page.total == 0" class="notData">{{$t("moneyRecord.data")}}</div><!-- 暂无数据 -->

				<!-- 分页 -->
				<div class="pagination" v-if="page.total>0">
					<el-pagination layout="prev, pager, next" :prev-text="$t('moneyRecord.page[2]')"  :next-text="$t('moneyRecord.page[3]')" :total="page.total" :current-page.sync="page.current" :page-count="5" @current-change="changePage"></el-pagination>
				</div>

			</el-card>
		</div>
		<FooTer></FooTer>
	</div>
</template>
<script>
	// import Header from "../../header/heaer.vue";
	// import Footer from "../../footer/footer.vue";

	export default {
		data() {
			return {
				loading: false,
				recordData3: [],
				pid: '', //查询需要的条件
				page: {
					current: 1,
					size: 10,
					total: 0
				}
			}
		},
		methods: {
			alse: function() {
				var _this = this;
				_this.$http.get(_this.$http.re_asset, {
						params: {
							type: 2,
							p: _this.page.current,
							size: _this.page.size,
							pid: _this.pid
						}
					})
					.then((res) => {
						if(res.data.status == 200) {
							_this.recordData3 = res.data.data;
							_this.page.current = Number(res.data.data.p);
							_this.page.total = Number(res.data.data.count);
						} else {
							_this.recordData3 = [];
							_this.page.current = 1;
							_this.page.total = 0;
						}
						setTimeout(function() {
							_this.loading = false;
						}, 500);
				});

			},
			changePage(i){
				this.page.current = i;
				this.alse();
			},
		},
		created: function() {
			var _this = this;
			window.scrollTo(0, 0); //回到顶部
			_this.pid = this.$route.query.pid;
			_this.alse();
		},
	}
</script>