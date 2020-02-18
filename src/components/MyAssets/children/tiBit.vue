<style lang="less" scoped>
	@import './tiBit.less';
</style>
<template>
	<div class="ti_bit_wrapper">
		<div class="ti_bit_container">
			<h4>{{ $route.query.code }}{{$t('Gic.tibit[0]')}}</h4>
			<div class="ti_bit_body">
				<el-form :model="formData" ref="formData" :label-position="labelPosition" :rules="rules1" class="formData">
					<!-- 提币地址 -->
					<div class="across">
						<el-form-item :label="$t('Gic.tibit[1]')" prop="address">
							<el-input v-model="formData.address" :placeholder="$t('Gic.tibit[11]')"></el-input>
						</el-form-item>

						<el-form-item label="">
							<el-select v-model="formData.address" :placeholder="$t('Gic.tibit[12]')">
								<el-option :value="item.address" :label="item.val" v-for='(item,key) in dizhiData' :key='key'>
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<!-- 提币数量 -->
					<div class="across">
						<el-form-item label="数量" prop="money">
							<el-input v-model="formData.money" :placeholder="$t('Gic.tibit[13]')"></el-input>
						</el-form-item>
						<p>{{$t('Gic.tibit[10]')}}：{{ Number(BalanceData.balance).toFixed($public.SavePoint('else'))}} {{code}}</p>
					</div>
					<div class="service">
						<span>手续费</span>
						<span>5 USDT/次</span>
					</div>
					<!-- 资金密码 -->
					<div class="across">
						<el-form-item :label="$t('Gic.tibit[3]')" prop="payment_password">
							<el-input type="password" v-model="formData.payment_password" :placeholder="$t('Gic.tibit[14]')"></el-input>
						</el-form-item>
					</div>
					<!-- 验证码 -->
					<div class="across">
						<!-- <el-form-item label="验证码">
							<el-input v-model="formData.code" placeholder="请输入验证码"></el-input>
						</el-form-item> -->
						<el-form-item class="yanzhengma">
							<el-form-item :label="$t('Gic.tibit[4]')" prop="code" class="codeInput">
								<el-input class="mobile" v-model="formData.code" auto-complete="off" :placeholder="$t('Gic.tibit[15]')">
								</el-input>
							</el-form-item>
							<div class="btn_code" @click="getCode()">
								<!-- <el-input type="button" :value="$t(btnCode.time)" :disabled='btnCode.disabled'></el-input> -->
								<el-input type="button" :value='$public.integerDecimal(btnCode.time) ? btnCode.time +" s" : btnCode.time' :disabled='btnCode.disabled'></el-input>
							</div>
						</el-form-item>
					</div>

				</el-form>
				<div class="body_btn">
					<el-button type="primary" @click="applyWithdraw">{{$t('Gic.tibit[6]')}}</el-button>
				</div>

				<ul class="body_info">
					<p>{{$t('Gic.tibit[7]')}}</p>
					<li>{{$t('Gic.tibit[8]')}}</li>
					<li>{{$t('Gic.tibit[9]')}}</li>
					<!-- <li>{{$t('Gic.tibit[20]')}} {{BalanceData.withdraw_min}} {{code}} {{$t('Gic.tibit[21]')}} {{BalanceData.handling_fee}} {{code}}</li> -->
				</ul>
			</div>
		</div>
	</div>
</template>
<script>

	export default {
		data() {
			var _this = this;
			var address = (rule, value, callback) => {
				if (!value) {
					return callback(new Error(this.$t('Gic.tibit[16]')));//提币地址不能为空
				} else {
					callback();
				}
			}
			var money = (rule, value, callback) => {
				if (!value) {
					return callback(new Error(this.$t('Gic.tibit[17]')));//提币数量不能为空
				} else {
					callback();
				}
			}
			var payment_password = (rule, value, callback) => {
				if (!_this.$public.pwd(value)) {
					callback(new Error(this.$t('Gic.tibit[18]')))// 请输入有效的密码
				} else {
					callback()
				}
			}
			var code = (rule, value, callback) => {
				if (!value) {
					return callback(new Error(this.$t('Gic.tibit[19]')));//验证码不能为空
				} else {
					callback();
				}
			}

			return {
				balance: '',
				code: '',
				labelPosition: 'top', // 插件自带
				dizhiData: [],
				BalanceData:{},
				formData: {
					pid: '',
					address: '',              //提币地址
					money: '',                //提币数量
					payment_password: '',		 //资金密码
					code: '',								 //验证码
				},

				btnCode: {
					time: this.$t("changetpwd.list[4]"), //倒计时
					disabled: false
				},
				userData: '',    //获取登录的邮箱

				rules1: {
					address: [{
						validator: address,
						trigger: 'blur'
					}],
					money: [{
						validator: money,
						trigger: 'blur'
					}],
					payment_password: [{
						validator: payment_password,
						trigger: 'blur'
					}],
					code: [{
						validator: code,
						trigger: 'blur'
					}],
				},
			}
		},
		watch: {

		},
		methods: {

			// 获取手续费
			getShou() {
				var _this = this;
				_this.$http.post(_this.$http.checkBalance, { pid: _this.formData.pid }).then((res) => {
					if (res.data.code == 200) {
						_this.BalanceData = res.data.data;
					}
				});
			},


			getDizhi() {
				var _this = this;
				_this.$http.post(_this.$http.getWithdrawAddress, { type: _this.formData.pid }).then((res) => {
					if (res.data.code == 200) {
						_this.dizhiData = res.data.data.data;
					}
				});
			},
			//验证码
			getCode() {
				var _this = this;
				_this.btnCode.disabled = true;
				//获取验证码
				_this.$http.post(_this.$http.sendEmail, {
					email: _this.userData,
				}).then(function (response) {
					if (response.data.code == "200") {
						_this.$public.setTime(_this); //倒计时函数封装
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
						_this.btnCode.disabled = false;
					}
				}).catch(function (error) { });
			},

			applyWithdraw() {
				var _this = this;
			
				_this.$refs.formData.validate(valid => {
					if (valid) {
						_this.formData.payment_password = _this.$public.$md5(_this.formData.payment_password);
						_this.$http.post(_this.$http.applyWithdraw, _this.formData).then((res) => {
							if (res.data.code == 200) {
								_this.$public.msg(res.data.msg, 'success', _this);
								_this.formData.payment_password = '';
								_this.formData.code = '';
								_this.btnCode.time = _this.$t("changetpwd.list[4]");
							}else{
								_this.$public.msg(res.data.msg, 'warning', _this);
							}
						});
					}
				})




				// _this.$http.post(_this.$http.applyWithdraw, {
				// 	email: _this.formData,
				// }).then(function (response) {
				// 	if (response.data.code == "200") {
				// 		_this.$public.setTime(_this); //倒计时函数封装
				// 	} else {
				// 		_this.$public.msg(response.data.msg, 'warning', _this);
				// 		_this.btnCode.disabled = false;
				// 	}
				// }).catch(function (error) { });
			},
		},
		mounted: function () {

		},
		created() {
			var _this = this;
			_this.code = _this.$route.query.code;
			_this.formData.pid = _this.$route.query.pid;
			_this.userData = sessionStorage.userData;
			_this.getShou();
			_this.getDizhi();

		},
		computed: {

		},

	}
</script>