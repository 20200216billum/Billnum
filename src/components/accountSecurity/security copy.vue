<style lang=less>
	@import '../../assets/public.less';
	@import './security.less';
</style>
<template>
	<div class="security_main">
		<div class="contain">
			<h2 class="toptitle">个人中心</h2>
			<el-tabs type="card" tab-position="left" class="securitytabs">
				<el-tab-pane>
					<span class="tabslabel" slot="label">账号安全<i class="el-icon-caret-right right-icon"></i></span>
					<ul class="container" style="overflow:hidden;">
						<li>请不要透露短信给任何人，包括平台客服</li>
						<!-- 登录密码 -->
						<li>
							<span class="left">登录密码</span>
							<span class="icon error">
								<i class="el-icon-circle-check right"></i>
								<i class="el-icon-circle-close error"></i>
							</span>
							<span class="describe">安全级别</span>
							<span class="result">低</span>
							<span class="operation">修改</span>
							<span class="detail">187****5834@qq.com</span>
						</li>
						<!-- 资金密码 -->
						<li>
							<span class="left">资金密码</span>
							<span class="icon">
								<i class="el-icon-circle-check right"></i>
								<i class="el-icon-circle-close error"></i>
							</span>
							<span class="describe">交易，提现时使用设置资金密码前请先绑定手机或邮箱</span>
							<span class="operation">修改</span>
						</li>
						<!-- 谷歌验证 -->
						<li>
							<span class="left">谷歌验证</span>
							<span class="icon">
								<i class="el-icon-circle-check right"></i>
								<i class="el-icon-circle-close error"></i>
							</span>
							<span class="describe">邮箱用于登录、提币及安全设置时使用，激活后不可修改</span>
							<span class="operation">未绑定</span>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="身份认证">
					<span class="tabslabel" slot="label">身份认证<i class="el-icon-caret-right right-icon"></i></span>
					<div class="container">
						身份认证666
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		},
		created: function() {
		},
		mounted:function () {
		},
		watch: {
		}

	};
</script>