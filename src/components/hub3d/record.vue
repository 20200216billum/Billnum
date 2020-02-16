<style lang="less">
	@import '../../assets/public.less';
	@import './record.less';
</style>

<template>
	<div class="crowdRecordMain">
		<section class="crowdFundRecord">
			<section class="crowdFundTitle">
				<h3>{{$t('hub3drecord.header[0]')}}</h3><!--HUB3D参与记录  -->
			</section>
			<el-table :data="tableData" style="width: 100%" align="center">
		      	<el-table-column prop="create_time" align="center" :label="$t('hub3drecord.tableheader[0]')"><!--参与时间  -->
		      		<template slot-scope="scope">
		      			<div>{{$public.timestampToTime(scope.row.create_time)}}</div>
		      		</template>
		      	</el-table-column>
	      		<el-table-column prop="game_num" align="center" :label="$t('hub3drecord.tableheader[1]')"></el-table-column><!--参与场次  -->
	      		<el-table-column prop="team" align="center" :label="$t('hub3drecord.tableheader[2]')">
	      			<template slot-scope="scope">
		      			<div v-if="scope.row.team == '1'">{{$t('hub3drecord.tableconent[0]')}}</div>
		      			<div v-else-if="scope.row.team == '2'">{{$t('hub3drecord.tableconent[3]')}}</div>
		      			<div v-else-if="scope.row.team == '3'">{{$t('hub3drecord.tableconent[1]')}}</div>
		      			<div v-else>{{$t('hub3drecord.tableconent[2]')}}</div>
		      		</template>
	      		</el-table-column><!--加入战队  -->
	      		<el-table-column prop="money" align="center" :label="$t('hub3drecord.tableheader[3]')"></el-table-column><!--参与总额  -->
	      		<el-table-column prop="num" align="center" :label="$t('hub3drecord.tableheader[4]')"></el-table-column><!--购买数量  -->
	      		<!--<el-table-column prop="tprice" align="center" :label="$t('hub3drecord.tableheader[5]')"></el-table-column>--><!--开奖结果  -->
	      		<!--<el-table-column prop="tprice" align="center" :label="$t('hub3drecord.tableheader[6]')"></el-table-column>--><!--分红金额  -->
	      		<!--<el-table-column prop="tprice" align="center" :label="$t('hub3drecord.tableheader[7]')"></el-table-column>--><!--开奖时间  -->
			</el-table>
			<section class="Period_main" v-show="tableData.length != 0">
				<el-pagination background layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>
			</section>
		</section>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				tableData: [],
				select:'',
				isPage:{
					isCount:4,  //一共有几页
					isSize:15,  //默认显示几页
					p:1,  //当前页  
				},
			}
     	},
     	methods:{
     		getdata(typenum){//获取数据
				var _this = this;
				let tradingdata = {
					size:_this.isPage.isSize,
					p:typenum
				};
				_this.$http.post(_this.$http.transList,tradingdata).then((res) => {
					if(res.data.status == 200){
						// _this.isPage.isCount = res.data.data.count;
						_this.tableData = res.data.data;
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