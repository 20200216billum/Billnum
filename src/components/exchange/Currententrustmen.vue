<template lang="html">
	<section class="HistoricalEntrustment">
		<section class="CurrentEntrustment">
			<div class="CurrentEntrustment_header">
				<p @click="Currentshow = !Currentshow">
					<i class="el-icon-arrow-down" v-if="Currentshow"></i>
					<i class="el-icon-arrow-up" v-else ></i>
					当前委托
				</p>
			</div>
			<el-collapse-transition>
				<div class="CurrentEntrustment_box" v-show="Currentshow">
		          	<el-table :data="requestData1" width='100' height='500' v-loading="loading" >
						<el-table-column prop="addtime" label="委托时间" width="180">
							<template slot-scope="scope">
								<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
							</template>
						</el-table-column>
						<el-table-column prop="otype" label="方向">
							<template slot-scope="scope">
								<div v-if="scope.row.otype == 1 " class="red">做多</div>
								<div v-else class="green">做空</div>
							</template>
						</el-table-column>
						<el-table-column prop="en_no" label="委托编号" width="180">
						</el-table-column>
						<el-table-column prop="account" label="会员账号">
						</el-table-column>
						<el-table-column prop="username" label="会员姓名">
						</el-table-column>
						<el-table-column prop="totalprice" label="总计金额">
						</el-table-column>
						<el-table-column prop="sxfee" label="手续费用">
						</el-table-column>
						<el-table-column prop="pname" label="币种名称">
						</el-table-column>
						<el-table-column prop="buyprice" label="委托价格">
						</el-table-column>
						<el-table-column prop="buynum" label="委托数量">
						</el-table-column>
						<el-table-column prop="id" label="操作">
							<template slot-scope="scope">
								<el-button v-if="scope.row.state == 1"  @click.native.prevent="deleteRow(scope.row.en_id)" type="primary" plain size="small">
									<span>撤销</span>
								</el-button>
							</template>
						</el-table-column>
					</el-table>
		        </div>
			</el-collapse-transition>
		</section>
	</section>
</template>
<script>
	export default {
		props: ['Code'],
		data(){
			return{
				Currentshow:true,
				loading: true,
	 			isActive: true,
	 			show: true,
	 			activeName: 'first',
	 			requestData1: [],
	 			selectLabel: '',
	 			selectValue: '',
	 			expands: [], // 要展开的行，数值的元素是row的key值
			}
		},
		watch:{
			"Code":function(){
				var _this = this;
				_this.requestPublic();
			},
		},
		methods:{
			getRowKeys(row) {
 				return row.orders_id;
 			},
			handleClick(tab, event) { // 切换事件
				var _this = this;
				_this.loading = true;
				_this.requestPublic();
			},
			deleteRow(scope) { // 撤单请求
				var _this = this;
				_this.$confirm('是否确认撤单操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var orders_id = scope;
					var mobile = sessionStorage.getItem('mobile');
					_this.$http.post(_this.$http.cancellations, {
						'mobile': mobile,
						'order_id': orders_id
					}).then((res) => {
						if(res.data.status == 200){
							_this.requestPublic();
							_this.$message({
								message: "撤单成功",
								type: 'success'
							});
							//刷新页面数据
							_this.$emit('changeData');
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
						message: '已取消撤单操作'
					});          
				});				
			},
			requestPublic:function () { // 默认请求、初始化请求
				var _this = this;
				var dataType = dataType;
				var mobile = sessionStorage.getItem('mobile');
				var type;
				switch (_this.activeName) {
					case "first":
						type = "1";
						break;
					case "second":
						type = "2";
						break;
					case "there":
						type = "";
						break;
					default:
						type = "";
						break;
				}
				var weituo = {
					mobile:mobile,
				};
				_this.requestData1 = [];
				_this.$http.post(_this.$http.weituo,weituo).then((res) => {
					
					_this.loading = false;
					if (res.data.status == "200") {
						_this.requestData1 = res.data.data;
					}
				});
			}
		}, 
	  	created:function(){
	  		var _this = this;
			_this.requestPublic();
	  	},
	  	components:{}
	}
</script>
