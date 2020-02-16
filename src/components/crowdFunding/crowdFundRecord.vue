<style lang="less">
	@import '../../assets/public.less';
	@import './crowdFunding.less';
</style>

<template>
	<div class="crowdRecordMain">
		<section class="crowdFundRecord">
			<section class="crowdFundTitle">
				<h3>{{$t('crowdFundRecord.main1[0]')}}</h3><!--认筹记录  -->
				<el-select v-model="select" slot="prepend" :placeholder="$t('crowdFundRecord.main1[1]')" @change="getdata(1)" class='selectCoin'><!--选择币种  -->
			      	<el-option :label="$t('crowdFundRecord.main1[2]')" value=""></el-option><!--全部  -->
			      	<el-option :label="item.pname" :value="item.pid" v-for="(item,index) in coinData" :key="index"></el-option>
			    </el-select>
			</section>
			
			<div class="tableWarp">
			<el-table :data="tableData" style="width: 100%">
		      	<el-table-column prop="addtime" :label="$t('crowdFundRecord.main2[0]')"><!--时间  -->
		      		<template slot-scope="scope">
		      			<div>{{$public.timestampToTimeshian(scope.row.addtime)}}</div>
		      		</template>
		      	</el-table-column>
	      		<el-table-column prop="title" :label="$t('crowdFundRecord.main2[1]')"></el-table-column><!--认筹币种  -->
	      		<el-table-column prop="price" :label="$t('crowdFundRecord.main2[2]')"></el-table-column><!--单价  -->
	      		<el-table-column prop="num" :label="$t('crowdFundRecord.main2[3]')"></el-table-column><!--数量  -->
	      		<el-table-column prop="tprice" :label="$t('crowdFundRecord.main2[4]')"></el-table-column><!--总金额  -->
			</el-table>
			
			<section class="Period_main" v-show="tableData.length != 0">
				<el-pagination background layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>
			</section>
			</div>
			
		</section>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				tableData: [],
				coinData: [],
				select:'',
				isPage:{
					isCount:4,  //一共有几页
					isSize:10,  //默认显示几页
					p:1,  //当前页  
				},
			}
     	},
     	methods:{
     		getdata(typenum){//获取数据
				var _this = this;
				let tradingdata = {
					coin:_this.select,
					type:_this.tabPosition,
					size:_this.isPage.isSize,
					p:typenum
				};
				_this.$http.post(_this.$http.reclist,tradingdata).then((res) => {
					if(res.data.status == 200){
						if(_this.coinData.length == 0){
							_this.coinData = res.data.data.coin
						};
						_this.isPage.isCount = res.data.data.count;
						_this.tableData = res.data.data.list;
					};
				});
			},
			pageChange(i) {
				var _this = this;
				_this.getdata(i);
			},
     	},
     	created:function() {
     		var _this = this;
			 _this.getdata('1');
     	}
	}
</script>