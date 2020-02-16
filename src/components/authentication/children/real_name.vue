<!--实名认证-->
<!--
	身份认证和高级认证的css在identity.less
-->
<template>
	<div class="real_name_main">
		<div class="real_name_title">
			<h2 class="title" @click="go_back">{{$t("realname.list[0]")}}</h2><!-- 身份认证 -->
			<span>></span>
			<h2>{{$t("realname.list[1]")}}</h2><!-- 实名认证 -->
		</div>
		<div class="real_name_information">
			<div class="real_name_information_header">
				<h2>{{$t("realname.list[0]")}}</h2><!-- 身份认证 -->
				<!--<span @click="go_senior()">高级认证</span>-->
			</div>
		</div>
		<div class="real_name_cont">
			<div class="form_cont">
				<el-form :label-position="labelPosition" :model="userData" status-icon :rules="rules2" ref="userData" label-width="100px" class="demo-ruleForm">
					<el-form-item :label='$t("realname.list[2]")' prop="realname"><!-- 姓名 -->
						<el-input v-model.idcardword="userData.realname" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item :label='$t("realname.list[3]")' prop="idcard"><!-- 身份证号 -->
						<el-input type="idcardword" v-model="userData.idcard" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submitForm('userData')" :loading="loading">{{$t("realname.list[4]")}}</el-button><!-- 提交审核 -->
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var _this = this;
			var realname = (rule, value, callback) => {
				if(!_this.$public.name(value)) {
					callback(new Error(this.$t("realname.reanname")));//姓名格式有误
				} else {
					callback();
				}
				
			};
			var idcard = (rule, value, callback) => {
				if(!_this.$public.isCardID(value)) {
					callback(new Error(this.$t("realname.reanname")));//身份证号格式有误
				} else {
					callback();
				}
			};
			return {
				userData: {
					realname: '', //姓名
					idcard: '', //身份证号

				},
				rules2: {
					idcard: [{
						validator: idcard,
						trigger: 'blur'
					}],
					realname: [{
						validator: realname,
						trigger: 'blur'
					}]

				},
				labelPosition: 'top', //插件自带
				loading: false, //防止表单重复提交标志				
			};
		},
		methods: {
			//注册执行函数
			submitForm(formrealname) {
				var _this = this;
				_this.$refs[formrealname].validate((valid) => {
					if(valid) {
						_this.$http.post(_this.$http.set_sm, _this.userData).then(function(response) {
							if(response.data.status == "200") {
								_this.$public.msg(response.data.msg, 'success', _this);
								setTimeout(function() {
									_this.$router.go(-1); //返回上一层
								}, 10)

							} else {
								_this.$public.msg(response.data.msg, 'warning', _this);
							}
						}).catch(function(error) {});

					} else {
						return false
					}
				});
			},
			
			go_back() {
				var _this = this;
				_this.$router.go(-1); //返回上一层
			}
			

		},
		created:function(){
			
		}
	}
</script>

<style>

</style>