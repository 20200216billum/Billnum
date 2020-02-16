<style lang=less>
	@import '../../../assets/public.less';
	@import '../security.less';

</style>
<template>
	<div class="back_card_main">
		<el-form :model="addForm" :label-position="labelPosition" status-icon :rules="rules2" ref="addForm" label-width="100px" class="demo-ruleForm">
			<el-form-item :label='$t("bankcard.list[0]")' prop="name"><!-- 姓名 -->
				<el-input type="text" v-model="userData.name" auto-complete="off" :disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item :label='$t("bankcard.list[1]")' prop="bank"><!-- 开户银行 -->
				<el-input type="text" v-model="addForm.bank" auto-complete="off" :placeholder='$t("bankcard.tip[0]")'></el-input>
			</el-form-item>
			<el-form-item :label='$t("bankcard.list[2]")' prop="branch"><!-- 开户支行 -->
				<el-input type="text" v-model="addForm.branch" auto-complete="off" :placeholder='$t("bankcard.tip[1]")'></el-input>
			</el-form-item>
			<el-form-item :label='$t("bankcard.list[3]")' prop="bank_car"><!-- 银行卡号 -->
				<el-input v-model.text="addForm.bank_car" :placeholder='$t("bankcard.tip[2]")'></el-input>
			</el-form-item>
			<el-form-item :label='$t("bankcard.list[4]")'><!-- 资金密码 -->
				<el-input type="password" v-model="tpwd" auto-complete="off" :placeholder='$t("bankcard.tip[3]")'></el-input>
			</el-form-item>
		</el-form>

		<div class="el-message-box__btns">
			<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="submitForm()">
				<span>{{$t("bankcard.list[5]")}}</span><!-- 确认添加 -->
			</button>
			<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="cancel()">
				<span>{{$t("bankcard.list[6]")}}</span><!-- 取消 -->
			</button>
		</div>
	</div>
</template>
<script>
	export default {

		data() {
			var _this = this;
			var name = (rule, value, callback) => {
				if(!value) {
					return callback(new Error(this.$t("bankcard.nametips")));//姓名不能为空
				} else {
					callback();
				}
			};
			var bank = (rule, value, callback) => {
				if(!value) {
					callback(new Error(this.$t("bankcard.bank")));//开户行不能为空
				} else {
					callback();
				}
			};
			var branch = (rule, value, callback) => {
				if(!value) {
					callback(new Error(this.$t("bankcard.branch")));//开户支行不能为空
				} else {
					callback();
				}
			};
			var bank_car = (rule, value, callback) => {
				if(!_this.$public.bank_car(value)) {
					callback(new Error(this.$t("bankcard.bankcard")));//银行卡号格式有误
				} else {
					callback();
				}
			};
			var tpwd = (rule, value, callback) => {
				if(!_this.$public.pwd(value)) {
					callback(new Error(this.$t("bankcard.submitForm[4]")));//资金密码格式有误
				} else {
					callback();
				}
			};
			return {
				userData:{},
				labelPosition: 'top',
				addForm: {
					act: 'add', //添加还是编辑
					type: 'backcard', //类型
					bank_car: '', //银行卡号
					branch: '', //开户支行
					bank: '', //开户行
					payment_password: '' //资金密码
				},
				tpwd:'',
				rules2: {
					name: [{
						validator: name,
						trigger: 'blur'
					}],
					bank: [{
						validator: bank,
						trigger: 'blur'
					}],
					branch: [{
						validator: branch,
						trigger: 'blur'
					}],
					bank_car: [{
						validator: bank_car,
						trigger: 'blur'
					}],
				}
			}; 
		},
		methods: {
			// 请求个人信息
			userInfo(){
				var _this = this;
				_this.$http.get(_this.$http.details,{params:{}}).then(function(res) {
					if(res.data.code == '200') {
						sessionStorage.userData = JSON.stringify(res.data.data);
						_this.userData = res.data.data;
					}
				})
			},
			submitForm() {
				var _this = this;
				//				_this.$refs[_this.addForm].resetFields();
				if(!_this.addForm.bank_car) {
					_this.$public.msg(_this.$t("bankcard.submitForm[1]"), 'warning', _this);//开户行不能为空
					return false;
				} else if(!_this.addForm.branch) {
					_this.$public.msg(_this.$t("bankcard.submitForm[2]"), 'warning', _this);//开户支行不能为空
					return false;

				} else if(!_this.$public.bank(_this.addForm.bank_car)) {
					_this.$public.msg(_this.$t("bankcard.submitForm[3]"), 'warning', _this);//银行卡号格式有误
					return false;
				} else if(!_this.$public.pwd(_this.tpwd)) {
					_this.$public.msg(this.$t("bankcard.submitForm[4]"), 'warning', _this);//资金密码格式有误
					return false;
				}
				//请求接口
				_this.addForm.payment_password = _this.$md5(_this.tpwd);
				// _this.addForm.payment_password = _this.tpwd;
				
				_this.$http.post(_this.$http.payAdd, _this.addForm).then(function(res) {
					if(res.data.code == '200') {
						_this.$public.go('/security?flat=ok',10,_this); 
						if(_this.addForm.act == 'add'){
						_this.$public.msg('添加成功', 'success', _this);
						}else{
							_this.$public.msg('修改成功', 'success', _this);
						}
					}else{
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
					}).catch(function(error) {});

				//请求ajax发送数据
			},
			// 取消
			cancel () {
				this.$public.go('/security?flat=ok',10,this); 
			},
			//判断支付方式添加或修改
			add(){
				var _this = this;
				if(!_this.$route.query.id){
					_this.addForm.act = 'add';
				}else{
					_this.addForm.act = 'edit'
					//获取支付方式详情
					_this.$http.post(_this.$http.payEdit, {
						id:_this.$route.query.id,
						type:_this.$route.query.type
					}).then(function(res) {
						if(res.data.code == '200') {
							_this.addForm.bank_car = res.data.data.bank_car;
							_this.addForm.bank = res.data.data.bank
							_this.addForm.branch = res.data.data.branch
							_this.addForm.bank = res.data.data.bank
						}
					})
				}
			},
		},
		mounted:function(){
			var _this = this;
			_this.add();
		},
		created: function() {
			var _this = this;
			_this.userData = JSON.parse(sessionStorage.userData);
			_this.userInfo();
			// console.log(_this.userData,JSON.parse(sessionStorage.userData));
		},
	}
</script>

<style scoped="scoped">

</style>