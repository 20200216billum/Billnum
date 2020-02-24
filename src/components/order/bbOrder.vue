<style lang="less">
	@import './bbOrder.less';
</style>
<template>
	<div class="bb_order_wrapper">
		<div class="order_container">
			<el-tabs v-model="activeName" @tab-click="handleClick" class="tab_top">
				<el-tab-pane label='当前委托' name="first">
					<el-table :data="tranListData" empty-text="暂无数据" style="width: 100%">
						<el-table-column prop="add_time" :label='$LangFn("时间")'>
							<template slot-scope="scope">
								<span>{{$public.timestampToTime(scope.row.add_time)}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="code" :label='$LangFn("交易对")'>
						</el-table-column>
						<el-table-column prop="type" :label='$LangFn("方向")'>
							<template slot-scope="scope">
								<span v-if="scope.row.type == '1'" style="color:#24d985;">{{ $LangFn("买入") }}</span>
								<span v-if="scope.row.type == '2'" style="color:#f33939;">{{ $LangFn("卖出") }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="otype" :label='$LangFn("方式")'>
							<template slot-scope="scope">
								<span v-if="scope.row.otype == '1'">{{ $LangFn("限价") }}</span>
								<span v-if="scope.row.otype == '2'">{{ $LangFn("市价") }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="wtnum" :label='$LangFn("委托数量")'>
						</el-table-column>
						<el-table-column prop="wtprice" :label='$LangFn("委托价格")'>
						</el-table-column>
						<el-table-column prop="wtnum" :label='$LangFn("委托总额")'>
							<template slot-scope="scope">
								<span>
									{{$public.Multiplication(Number(scope.row.wtprice),Number(scope.row.wtnum)).toFixed($public.SavePoint('else'))}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="cjnum" :label='$LangFn("已成交")'>
						</el-table-column>
						<el-table-column prop="wtnum" :label='$LangFn("未成交")'>
							<template slot-scope="scope">
								<span>{{$public.Subtraction(Number(scope.row.wtnum),Number(scope.row.cjnum)).toFixed($public.SavePoint('else'))}}
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="status" :label='$LangFn("操作")'>
							<template slot-scope="scope">
								<span class="cancel_order" @click="cancel_order(scope.row.type,scope.row.wtprice,scope.row.wtnum,scope.row.cjnum,scope.row.orders_id)" v-if="scope.row.status == '0' || scope.row.status == '1'">{{ $LangFn("撤单") }}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label='历史委托' name="second">
					<el-table :data="tranListData" empty-text="暂无数据" style="width: 100%">
						<el-table-column prop="add_time" :label='$LangFn("时间")'>
							<template slot-scope="scope">
								<span>{{$public.timestampToTime(scope.row.add_time)}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="code" :label='$LangFn("交易对")'>
						</el-table-column>
						<el-table-column prop="type" :label='$LangFn("方向")'>
							<template slot-scope="scope">
								<span v-if="scope.row.type == '1'" style="color:#24d985;">{{ $LangFn("买入")}}</span>
								<span v-if="scope.row.type == '2'" style="color:#f33939;">{{ $LangFn("卖出") }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="otype" :label='$LangFn("方式")'>
							<template slot-scope="scope">
								<span v-if="scope.row.otype == '1'">{{ $LangFn("限价") }}</span>
								<span v-if="scope.row.otype == '2'">{{ $LangFn("市价") }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="wtnum" :label='$LangFn("委托数量")'>
						</el-table-column>
						<el-table-column prop="wtprice" :label='$LangFn("委托价格")'>
							<template slot-scope="scope">
								<span v-if="scope.row.wtprice == '市价'">{{ $LangFn("市价") }}</span>
								<span v-else>{{ scope.row.wtprice }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="cjnum" :label='$LangFn("成交数量")'>
						</el-table-column>
						<el-table-column prop="totalprice" :label='$LangFn("成交金额")'></el-table-column>
						<el-table-column prop="fee" :label='$LangFn("手续费")'></el-table-column>
						<el-table-column prop="cjprice" :label='$LangFn("成交均价")'></el-table-column>
						<el-table-column prop="status" :label='$LangFn("状态")'>
							<template slot-scope="scope">
								<span v-if="scope.row.status == '-1'">{{ $LangFn("已撤销") }}</span>
								<span v-if="scope.row.status == '2'">{{ $LangFn("已完成") }}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'first',
				tranListData: [], 
				withdrawLogData: [],
				page: 1,
				total: 0,
				size: 10,
			}
		},
		methods: {
			handleClick(tab, event) {
				if (tab.paneName == 'first') {
					this.get_tranList('3')
				} else {
					this.get_tranList('4')
				}
			},
			//交易记录
			get_tranList(status) {
				var _this = this;
				this.$http.get(this.$http.tranList, { params: { status: status } }).then((r) => {
					if (r.data.code == 200) {
						this.tranListData = r.data.data.list;
					} else {
						// this.public.msg(r.data.msg,'error',this)
					}
				})
			},
			//撤单
			cancel_order(type,price,num,cjnum,order_id){
				let Mcolor = ''
				if(type == '1'){
					this.fangxiang = this.$LangFn("买入")
					Mcolor = '#03C087';
				}else{
					this.fangxiang = this.$LangFn("卖出")
					Mcolor = '#f33939';
				}


				var _this = this;
				const h = this.$createElement;
				var nightModel = this.$cookies.get('changeBg') == 'night'
				this.$msgbox({
					title:this.$LangFn("撤单提醒"),
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
								h('span', null, this.$LangFn("方向") + '：'),
								h('span', {
									style: 'color:'+Mcolor
								}, this.fangxiang),
							]),

							h('p', {
								style: 'float:left;marginLeft:30px;'
							}, [
								h('span', null, this.$LangFn("委托价") + '：'),
								h('span', null, this.$public.toDecimal2(price)),
							])

						]),
						h('div', {
							style: 'overflow: hidden'
						}, [
							h('p', {
								style: 'float:left;width:140px;'
							}, [
								h('span', null, this.$LangFn("委托量") + '：'),
								h('span', null, this.$public.toDecimal2(num)),
							]),
							h('p', {
								style: 'float:left;marginLeft:30px;'
							}, [
								h('span', null, this.$LangFn("已成交") + '：'),
								h('span', null, this.$public.toDecimal2(cjnum)),
							])
						]),


					]),
					showCancelButton: true,
					confirmButtonText:this.$$LangFn("确认撤单"),
					cancelButtonText: this.$LangFn("关闭"),
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonText = _this.$t("bibi.alse[11]");
							done();
							_this.$http.post(_this.$http.cancel_order, {order_id:order_id}).then(function (response) {

								if (response.data.code == "200") {
									_this.$public.msg(response.data.msg, 'success', _this);
									_this.get_tranList('3');
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
		created: function () {
			var _this = this;

			if(!sessionStorage.token){
				this.isLogin = false;
			} else {
				this.isLogin = true;
				_this.get_tranList('3');

				this.timer = window.setInterval(() => {
					if (this.activeName == 'first') {
						this.get_tranList('3')
					} else {
						this.get_tranList('4')
					}
				}, 3000)
			}
		},
	}
</script>