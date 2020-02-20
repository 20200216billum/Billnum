<style lang="less" scoped>
	@import './moneyAddre.less';
</style>
<template>
	<div class="money_addre_wrapper">
		<div class="money_addre_container">
			<!-- <el-card class="box-card title">
				<el-breadcrumb>
					<el-breadcrumb-item>{{$t("moneyAddre.name")}}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card> -->
			<el-card class="box-card bit_addre">
				<h5>{{$t("moneyAddre.name")}}</h5>
				<el-form :label-position="labelPosition" label-width="140px" :model="ruleForm" :rules="rules" ref="ruleForm">
					<div class="bigWarp">
						<el-form-item class="bigWarpSelect" :label='$t("moneyAddre.list[0]")' prop="type">
							<!--钱包提币地址类型-->
							<el-select v-model="ruleForm.type" :placeholder='$t("moneyAddre.list[1]")'>
								<!--请选择钱包地址类型-->
								<el-option :value="item.pid" :label="item.pname" v-for='(item,key) in addrList' :key='key'>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item :label='$t("moneyAddre.list[2]")' prop="address">
							<!--提币地址-->
							<el-input v-model="ruleForm.address" :placeholder='$t("moneyAddre.rules[0]")'></el-input>
						</el-form-item>
						<!--Tag地址-->
						<!-- <el-form-item v-if="ruleForm.type=='EOS'" :label='$t("moneyAddre.list[10]")' prop="tag">
							<el-input v-model="ruleForm.tag" :placeholder='$t("moneyAddre.rules[6]")'></el-input>
						</el-form-item> -->
						<el-form-item :label='$t("moneyAddre.list[3]")' prop="notes">
							<!--备注-->
							<el-input v-model="ruleForm.notes" :placeholder='$t("moneyAddre.rules[2]")'></el-input>
						</el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading">{{$t("moneyAddre.list[4]")}}
						</el-button>
					</div>
				</el-form>
			</el-card>


			<el-card class="box-card addre_list">
				<h5>
					<span>{{$t("moneyAddre.list[7]")}}</span>
				</h5>
				<el-table :data="addressList" empty-text="暂无数据" style="width: 100%;">
					<!-- 地址 -->
					<el-table-column prop="address" :label='$t("moneyAddre.list[8]")'></el-table-column>
					<!-- 类型 -->
					<el-table-column prop="type" :label='$t("moneyAddre.list[9]")'>
						<template slot-scope="scope">
							<span v-if="scope.row.type == 1">BTC</span>
							<span v-if="scope.row.type == 2">ETH</span>
						</template>
					</el-table-column>
					<!--备注-->
					<el-table-column prop="notes" :label='$t("moneyAddre.list[3]")' align="center"></el-table-column>
					<el-table-column prop="id" :label='$t("moneyAddre.list[5]")' align="right">
						<!--操作-->
						<template slot-scope="scope">
							<el-button @click.native.prevent="deleteRow(scope, ListA)" type="primary" plain size="small">
								{{$t("moneyAddre.list[6]")}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<el-pagination 
					background 
					class="zixun_fen common-pagination" 
					layout="prev, pager, next" 
					prev-text="上一页"
        			next-text="下一页"
					:total="total"
					@current-change="current_change1" 
					:page-size='size' 
					:current-page.sync="page"
				></el-pagination>
			</el-card>
		</div>
	</div>
</template>
<script>
	// import Header from "../../header/heaer.vue";
	// import Footer from "../../footer/footer.vue";

	export default {
		data() {
			return {
				addLoading: false,
				routeData: {}, // 接受传递的路由参数
				labelPosition: 'right', // form 文字排版
				addrList: [
					// { val: 'BTC', type: '1' },
					// { val: 'ETH', type: '2' },
				], // 地址列表数据
				ruleForm: { // 规则接收值
					type: '',
					address: '',
					notes: '',
				},
				addressList: [],
				page: 1,
				total: 0,
				size: 10,
				rules: { // 验证规则
					type: [
						{
							required: true, message: this.$t("moneyAddre.rules[7]"), trigger: 'change'
						}
					],
					address: [{
						required: true,
						message: this.$t("moneyAddre.rules[0]"),//请输入提币地址
						trigger: 'blur'
					},
					{
						max: 255,
						message: this.$t("moneyAddre.rules[1]"),//长度过长，最多255个字符
						trigger: 'blur'
					}
					],
					tag: [
						{
							required: true,
							message: this.$t("moneyAddre.rules[6]"),//请输入Tag地址
							trigger: 'blur'
						}
					],
					notes: [{
						required: true,
						message: this.$t("moneyAddre.rules[2]"),//请输入备注内容
						trigger: 'blur'
					},
					{
						min: 1,
						max: 50,
						message: this.$t("moneyAddre.rules[3]"),//长度在 1 到 50 个字符
						trigger: 'blur'
					}
					],
				},
				options: [{
					value: 'eth',
					label: this.$t('moneyAddre.options[0]'),
				}, {
					value: 'btc',
					label: this.$t('moneyAddre.options[1]'),
				},
				], // 下拉框值

				value: '', // 下拉框默认值
				pname: '',
				optionsAddress: '',
				ListA: null
			}
		},
		methods: {
			//获取提币币种列表
            getList() {
                this.$http.post(this.$http.asset_list, {withdrawal: 1}).then((r) => {
                    if (r.data.code == 200) {
                        this.addrList = r.data.data;
                    }
                })
            },
			//添加提币地址
			submitForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.addLoading = true;
						_this.$http.post(_this.$http.createWithdrawAddress, _this.ruleForm).then((res) => {
							_this.addLoading = false;
							if (res.data.code == 200) {
								_this.$public.msg(this.$t('Gic.securityChangeopwd[9]'), 'success', _this);
								_this.requestData();
							} else {
								_this.$public.msg(res.data.msg, 'warning', _this);
							}
							_this.$refs.ruleForm.resetFields();

						}).catch(err => {
							_this.addLoading = false;
						})

					} else {
						return false;
					}
				});
			},
			deleteRow(scope, rows) { // 删除请求
				var _this = this;
				_this.$confirm(_this.$t("moneyAddre.deleteRow[0]"), _this.$t("moneyAddre.deleteRow[1]"), {//是否确认删除该钱包地址
					confirmButtonText: _this.$t("moneyAddre.deleteRow[2]"),
					cancelButtonText: _this.$t("moneyAddre.deleteRow[3]"),
					type: 'warning'
				}).then(() => {
					var $id = scope.row.id;
					var sendData = {
						address_id: $id,
					}

					_this.$http.post(_this.$http.deleteWithdrawAddress, sendData)
						.then((res) => {
							if (res.data.code == '200') {
								// rows.splice(scope.$index, 1);
								_this.$message({
									message: res.data.msg,
									type: 'success'
								});
								_this.requestData();
							}else{
								_this.$public.msg(res.data.msg, 'warning', _this);
							}

						});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: _this.$t("moneyAddre.deleteRow[4]"),//已取消删除
					});
				});

			},
			requestData: function () { // 默认地址列表数据请求
				var _this = this;
				_this.$http.post(_this.$http.getWithdrawAddress, { page: this.page, size: this.size  }).then((res) => {
					if (res.data.code == 200) {
						_this.addressList = res.data.data.data;
						_this.page = res.data.data.current_page
						_this.total = res.data.data.total
					}
				});
			},
			current_change1(val) {
				this.page = val
				this.requestData()
				// this.$http.get(http, {params:{page:val, size:this.size, lang}}).then(r=>{
				// 	this.loading = false
				// 	if(r.data.code=='200'){
				// 		this.listData = r.data.data.data
				// 	}else{
				// 		this.$public.msg(r.data.msg,'error',this)
				// 	}
				// })
			},


			isType: function (cellValue) {
				var _this = this;
				if (cellValue.type === "btc") {
					return _this.$t("moneyAddre.isType[0]");//比特币提币地址
				} else if (cellValue.type === "eth") {
					return _this.$t("moneyAddre.isType[1]");//以太坊提币地址
				} else if (cellValue.type == "usdt") {
					return _this.$t("moneyAddre.isType[2]");//以太坊提币地址
				}
			}
		},
		created: function () {
			var _this = this;
			_this.routeData = this.$route.query;
			_this.value = this.$route.query.code;
			_this.pname = this.$route.query.pname;
			
			_this.getList();
			_this.requestData();
		},
	}
</script>