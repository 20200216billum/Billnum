<style lang=less>
	@import '../../assets/public.less';
	@import './bbOrder.less';
</style>
<template>
	<div class="bb_order_all_wrapper">
		<div class="order_container">
			<el-tabs v-model="activeName" @tab-click="handleClick" class="tab_top">
				<!-- 充币记录 -->
				<el-tab-pane :label='$t("Gic.bbOrderAll[0]")' name="first">
						<el-table :data="tranListData" style="width: 100%">
								<el-table-column prop="add_time" :label='$t("Gic.bbOrderAll[2]")' width="150">
									<template slot-scope="scope">
										<span>{{$public.timestampToTime(scope.row.add_time)}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="pname" :label='$t("Gic.bbOrderAll[3]")'>
								</el-table-column>
								<el-table-column prop="type" :label='$t("Gic.bbOrderAll[4]")'>
									<template slot-scope="scope">
										<span v-if="scope.row.type == '1'" style="color:#24d985;">{{$t("Gic.bbOrderAll[16]")}}</span>
										<span v-if="scope.row.type == '2'" style="color:#f33939;">{{$t("Gic.bbOrderAll[17]")}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="otype" :label='$t("Gic.bbOrderAll[5]")'>
									<template slot-scope="scope">
										<span v-if="scope.row.otype == '1'">{{$t("Gic.bbOrderAll[18]")}}</span>
										<span v-if="scope.row.otype == '2'">{{$t("Gic.bbOrderAll[19]")}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="wtnum" :label='$t("Gic.bbOrderAll[6]")'>
								</el-table-column>
								<el-table-column prop="wtprice" :label='$t("Gic.bbOrderAll[7]")'>
									
								</el-table-column>
								<el-table-column prop="wtnum" :label='$t("Gic.bbOrderAll[8]")'>
									<template slot-scope="scope">
										<span>
											{{$public.Multiplication(Number(scope.row.wtprice),Number(scope.row.wtnum)).toFixed($public.SavePoint('else'))}}
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="cjnum" :label='$t("Gic.bbOrderAll[9]")'>
								</el-table-column>
								<el-table-column prop="wtnum" :label='$t("Gic.bbOrderAll[10]")'>
									<template slot-scope="scope">
										<span>
												{{$public.Subtraction(Number(scope.row.wtnum),Number(scope.row.cjnum)).toFixed($public.SavePoint('else'))}}
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="status" :label='$t("Gic.bbOrderAll[11]")'>
									<template slot-scope="scope">
										<span class="cancel_order" @click="cancel_order(scope.row.type,scope.row.wtprice,scope.row.wtnum,scope.row.cjnum,scope.row.orders_id)" v-if="scope.row.status == '0' || scope.row.status == '1'">{{$t("Gic.bbOrderAll[20]")}}</span>
									</template>
								</el-table-column>
							</el-table>
				</el-tab-pane>
				<!-- 提币记录 -->
				<el-tab-pane :label='$t("Gic.bbOrderAll[1]")' name="second">
						<el-table :data="tranListData" style="width: 100%">
								<el-table-column prop="add_time" :label='$t("Gic.bbOrderAll[2]")' width="150">
									<template slot-scope="scope">
										<span>{{$public.timestampToTime(scope.row.add_time)}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="pname" :label='$t("Gic.bbOrderAll[3]")'>
								</el-table-column>
								<el-table-column prop="type" :label='$t("Gic.bbOrderAll[4]")'>
									<template slot-scope="scope">
										<span v-if="scope.row.type == '1'" style="color:#24d985;">{{$t("Gic.bbOrderAll[16]")}}</span>
										<span v-if="scope.row.type == '2'" style="color:#f33939;">{{$t("Gic.bbOrderAll[17]")}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="otype" :label='$t("Gic.bbOrderAll[5]")'>
									<template slot-scope="scope">
										<span v-if="scope.row.otype == '1'">{{$t("Gic.bbOrderAll[18]")}}</span>
										<span v-if="scope.row.otype == '2'">{{$t("Gic.bbOrderAll[19]")}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="wtnum" :label='$t("Gic.bbOrderAll[6]")'>
								</el-table-column>
								<el-table-column prop="wtprice" :label='$t("Gic.bbOrderAll[7]")'>
										<template slot-scope="scope">
												<span v-if="scope.row.wtprice == '市价'">{{$t("Gic.bbOrderAll[19]")}}</span>
												<span v-else>{{scope.row.wtprice}}</span>
											</template>
								</el-table-column>
								<el-table-column prop="cjnum" :label='$t("Gic.bbOrderAll[12]")'>
								</el-table-column>
								<el-table-column prop="totalprice" :label='$t("Gic.bbOrderAll[13]")'>
		
								</el-table-column>
								<el-table-column prop="fee" :label='$t("Gic.Placeorder[8]")'>

									</el-table-column>
								<el-table-column prop="cjprice" :label='$t("Gic.bbOrderAll[14]")'>
								</el-table-column>
								<el-table-column prop="status" :label='$t("Gic.bbOrderAll[15]")'>
									<template slot-scope="scope">
										<span v-if="scope.row.status == '-1'">{{$t("Gic.bbOrderAll[21]")}}</span>
										<span v-if="scope.row.status == '2'">{{$t("Gic.bbOrderAll[22]")}}</span>
									</template>
								</el-table-column>
							</el-table>
				</el-tab-pane>

			</el-tabs>


			<div class="shaixuan">
				<el-select v-model="form.type"  @change="orgSelectClick" :placeholder='$t("Gic.bbOrderAll[23]")'>
					<el-option :label='$t("Gic.bbOrderAll[16]")' value="1"></el-option>
					<el-option :label='$t("Gic.bbOrderAll[17]")' value="2"></el-option>
				</el-select>
				<el-select v-model="form.dizhi"  @change="orgSelectClick1" :placeholder='$t("Gic.bbOrderAll[23]")'>
						<el-option :value="item.mark" :label="item.pname" v-for='(item,key) in currency' :key='key'>
							</el-option>
				</el-select>
			</div>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'first',
				tranListData: [],    //当前委托
				withdrawLogData: [], //提币明细

				page: null,
				total: null,
				size: 10,
				region: '',
				currency:[],
				paneName:'3',

			form:{
					dizhi:'',
					type:'',
			}
			}
		},
		watch: {

		},
		methods: {
			orgSelectClick(){
				this.get_tranList(this.paneName,this.form.type);
			},
			orgSelectClick1(){
					this.get_tranList(this.paneName,this.form.type,this.form.dizhi);
			},
			handleClick(tab, event) {
				console.log(tab.paneName);
				if (tab.paneName == 'first') {
					this.paneName = '3';
					this.get_tranList(this.paneName,this.form.type)
				} else {
					this.paneName = '4';
					this.get_tranList(this.paneName,this.form.type)
				}
			},

			// 获取筛选列表
			getBbTrade(){
					var _this = this;
					this.$http.get(this.$http.BbTrade_list, { params: { } }).then((r) => {
					if (r.data.code == 200) {
						this.currency = r.data.data;
					} else {
						// this.public.msg(r.data.msg,'error',this)
					}
				})
			},

			//交易记录
			get_tranList(status,type) {
				var _this = this;
				this.$http.get(this.$http.tranList, { params: { status: status ,type:this.form.type,code:this.form.dizhi} }).then((r) => {
					if (r.data.code == 200) {
						this.tranListData = r.data.data.list;
					} else {
						// this.public.msg(r.data.msg,'error',this)
					}
				})
			},
			//撤单
			cancel_order(type, price, num, cjnum, order_id) {
				console.log(type, price, num, cjnum, order_id);
				let Mcolor = '';
				if(type == '1'){
					this.fangxiang = this.$t("Gic.bbOrderAll[16]");
					Mcolor = '#03C087';
				}else{
					this.fangxiang = this.$t("Gic.bbOrderAll[17]");
					Mcolor = '#f33939';
				}
				var _this = this;
				const h = this.$createElement;
				var nightModel = this.$cookies.get('changeBg') == 'night'
				this.$msgbox({
					title: this.$t("Gic.bbOrderTan[0]"),
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
									style: 'color:'+Mcolor
								}, this.fangxiang),
							]),

							h('p', {
								style: 'float:left;marginLeft:30px;'
							}, [
							h('span', null, this.$t("Gic.bbOrderTan[1]") + '：'),
								h('span', null, this.$public.toDecimal2(price)),
							])

						]),
						h('div', {
							style: 'overflow: hidden'
						}, [
							h('p', {
								style: 'float:left;width:140px;'
							}, [
								h('span', null, this.$t("Gic.bbOrderTan[2]") + '：'),
								h('span', null, this.$public.toDecimal2(num)),
							]),
							h('p', {
								style: 'float:left;marginLeft:30px;'
							}, [
							h('span', null, this.$t("Gic.bbOrderTan[3]") + '：'),
								h('span', null, this.$public.toDecimal2(cjnum)),
							])
						]),


					]),
					showCancelButton: true,
					confirmButtonText:this.$t("Gic.bbOrderTan[5]"),
					cancelButtonText: this.$t("Gic.bbOrderTan[4]"),
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonText = _this.$t("bibi.alse[11]");
							done();
							_this.$http.post(_this.$http.cancel_order, { order_id: order_id }).then(function (response) {

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
			_this.get_tranList('3');
			_this.getBbTrade();
		},

	}
</script>