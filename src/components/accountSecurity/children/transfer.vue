<style lang=less>
	@import '../../../assets/public.less';
	/*@import './moneyAddre.less';*/
	
	@import './transfer.less';
</style>
<template>
	<div class="transfer">
		<HeaDer></HeaDer>
		<div class="money_addre_container">
			<el-card class="box-card title">
				<el-breadcrumb>

					<el-breadcrumb-item>站内转账</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<el-card class="box-card bit_addre">

				<el-form :label-position="labelPosition" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">

					<div class="bigWarp">
						<el-form-item label="用户ID" prop="ouid">
							<el-input v-model="ruleForm.ouid" placeholder="请输入对方ID"></el-input>
						</el-form-item>
						<el-form-item label="数量" prop="price">
							<span class="canUserWall">( 可用：{{canuseBalance}} )</span>
							<el-input v-model="ruleForm.price" placeholder="请输入转账数量"></el-input>
						</el-form-item>
						<el-form-item label="交易密码" prop="pwd">
							<el-input v-model="ruleForm.pwd" type='password' placeholder="请输入交易密码"></el-input>
						</el-form-item>
					</div>

				</el-form>
				<p class="importent">
					<span>*转账须知 ：</span> 转账数量将实时转入对方账户，无法退还！请务必确认对方账户正确！
				</p>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading">确定</el-button>
			</el-card>
			<el-card class="box-card addre_list">
				<el-table :data="addrList" style="width: 100%" height="500">
					<el-table-column prop="memo" label="备注" width='500'></el-table-column>
					<el-table-column prop="price" label="转账数量" width='500'></el-table-column>
					<el-table-column prop="dtime" label="转账时间"></el-table-column>

				</el-table>

			</el-card>
		</div>
		<FooTer></FooTer>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				addLoading: false,
				routeData: {}, // 接受传递的路由参数
				labelPosition: 'top', // form 文字排版
				addrList: [], // 地址列表数据
				ruleForm: { // 规则接收值
					ouid: '', //用户ID
					price: '', //转出数量
					pwd: '' //交易密码
				},
				userData:{
					tpwd:'',
					status:'',
				},
				canuseBalance :'--',
				rules: { // 验证规则
					ouid: [{
						required: true,
						message: '用户ID不能为空',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '数量不能为空',
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						message: '交易密码不能为空',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			submitForm(formName) { // 添加事件函数
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						return false;
					}
					if(!_this.$public.Ints(_this.ruleForm.price)){
						_this.$public.msg('转出数量不合法，请重试！', 'warning', _this);
						return false;
					}else if(Number(_this.ruleForm.price)>Number(_this.canuseBalance)){
						_this.$public.msg('转出数量不能大于可用数量', 'warning', _this);
						return false;
					}else if(!_this.userData.tpwd){
						_this.$public.confirm('您没有设置交易密码，是否前往添加?', 'security', _this);
						return false;
					}else if(_this.userData.status != 3){
						_this.$public.msg('您还没有通过实名认证，暂不能进行此操作', 'warning', _this);
						return false;
					}else if(!_this.$public.pwd(_this.ruleForm.pwd)){
						_this.$public.msg('交易密码格式有误', 'warning', _this);
						return false;
					}
					_this.addLoading = true;
					_this.$http.post(_this.$http.transfer, _this.ruleForm).then(function(response) {
						_this.addLoading = false;
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.ruleForm.pwd='';
							_this.ruleForm.price='';
							_this.ruleForm.ouid='';
							//跟新数据
							_this.Record_Transfer();
							_this.get_balance();
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});

				});

			},
			get_balance() {
				var _this = this;
				//请求余额
				_this.$http.post(_this.$http.get_balance, {
					type:0
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.canuseBalance = response.data.data.balance;
					}
				}).catch(function(error) {});
			},
			getuserData(){
				//请求用户信息 看有没有设置资金密码和实名认证
				var _this = this;
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.userData.tpwd = response.data.data.tpwd;
						_this.userData.status =  response.data.data.status;
					}
				}).catch(function(error) {});
				
			},
			//转张流水
			Record_Transfer(){
				var _this = this;
				_this.$http.get(_this.$http.Record_Transfer, {params:{}}).then(function(response) {
					if(response.data.status == "200") {
						_this.addrList = response.data.data;
					}
				}).catch(function(error) {});
			}
			

		},
		created: function() {
			var _this = this;
			_this.get_balance();
			_this.Record_Transfer();
			_this.getuserData();

		},

	}
</script>