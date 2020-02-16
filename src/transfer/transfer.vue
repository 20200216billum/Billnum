<style lang=less>
	@import '../../assets/public.less';
	@import './moneyAddre.less';
	@import './transfer.less';
</style>
<template>
	<div class="money_addre_wrapper">
		<HeaDer></HeaDer>
		<div class="money_addre_container">
			<el-card class="box-card title">
				<el-breadcrumb>
					<!--<el-breadcrumb-item :to="routeData.url">-->
					<!--{{routeData.name}}-->
					<!--账户提现-->
					<!--</el-breadcrumb-item>-->
					<el-breadcrumb-item>提币地址管理</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<el-card class="box-card bit_addre">

				<el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
					<div class="selectWarp">
						<el-form-item label="钱包提币地址类型">
							<el-select v-model="pname" placeholder="请选择钱包地址类型">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="bigWarp">
						<el-form-item label="提币地址" prop="addUrl">
							<el-input v-model="ruleForm.addUrl"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="beizhu">
							<el-input v-model="ruleForm.beizhu"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading">添加</el-button>
			</el-card>
			<el-card class="box-card addre_list">
				<el-table :data="addrList" style="width: 100%" height="500">
					<el-table-column prop="type" label="钱包提币地址类型" width="200" :formatter="isType">
					</el-table-column>
					<el-table-column prop="qiaobao_url" label="提币地址">
					</el-table-column>
					<el-table-column prop="notes" label="备注">
					</el-table-column>
					<el-table-column prop="id" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope, addrList)" type="primary" plain size="small">
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>

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
				addLoading:false,
				routeData: {}, // 接受传递的路由参数
				labelPosition: 'top', // form 文字排版
				addrList: [], // 地址列表数据
				ruleForm: { // 规则接收值
					name: 'USDT',
					addUrl: '',
					beizhu: '',
				},
				rules: { // 验证规则
					addUrl: [{
							required: true,
							message: '请输入提币地址',
							trigger: 'blur'
						},
						{
							max: 255,
							message: '长度过长，最多255个字符',
							trigger: 'blur'
						}
					],
					beizhu: [{
							required: true,
							message: '请输入备注内容',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '长度在 1 到 50 个字符',
							trigger: 'blur'
						}
					],
				},
				options: [{
					value: 'btc',
					label: '比特币'
				}], // 下拉框值
				
//				{
//					value: 'eth',
//					label: '以太坊'
//				}, 
			
				value: '', // 下拉框默认值
				pname: ''
			}
		},
		methods: {
			submitForm(formName) { // 添加事件函数
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						if(!_this.pname){
							_this.$public.msg('请选择一种钱包地址类型', 'warning', _this);
							return false;
						}
						_this.addRow();
					} else {
						return false;
					}
				});
			},
			addRow: function() { // 添加请求
				var _this = this;
				_this.addLoading = true;
				_this.$http.post(_this.$http.deltAddre, {
						qiaobao_url: _this.ruleForm.addUrl,
						notes: _this.ruleForm.beizhu,
						type:_this.pname
					})
					.then((res) => {
						_this.addLoading = false;
						if(res.data.status == 200) {
							_this.$public.msg(res.data.msg, 'success', _this);
							_this.requestData();
						} else {
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
						_this.ruleForm.addUrl = '';
						_this.ruleForm.beizhu = '';
					});
			},
			deleteRow(scope, rows) { // 删除请求
				var _this = this;
				_this.$confirm('是否确认删除该钱包地址?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var $id = scope.row.id;
					var sendData = {
						qiaobao_url:scope.row.qiaobao_url,
						notes:scope.row.notes,
						act:'del',
						id:$id,
						type:scope.row.type
					}
//					rows.splice(scope.$index, 1);
					
					_this.$http.post(_this.$http.deltAddre, sendData)
						.then((res) => {
							if(res.data.status == '200'){
								rows.splice(scope.$index, 1);
							}
							_this.$message({
								message: res.data.msg,
								type: 'success'
							});
						});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			requestData: function() { // 默认地址列表数据请求
				var _this = this;
				_this.$http.get(_this.$http.addrList, {
						params: {}
					})
					.then((res) => {
						_this.addrList = res.data.data.btc;
						for(var i = 0; i < res.data.data.eth.length; i++) {
							_this.addrList.push(res.data.data.eth[i]);
						}
					});
			},
			isType: function(cellValue) {
				if(cellValue.type === "btc") {
					return '比特币提币地址';
				} else if(cellValue.type === "eth") {
					return '以太坊提币地址';
				}
			}
		},
		created: function() {
			var _this = this;
			_this.routeData = this.$route.query;
			_this.value = this.$route.query.code;
			_this.pname = this.$route.query.pname;
			_this.requestData();
		},
		// components: {
		// 	"HeaDer": Header,
		// 	"FooTer": Footer,
		// }
	}
</script>