<template lang="html">
	<div class="footer">
		<div class="footer-desc">
			<section class="footer_mian">
				<!-- <div class="footerLeft">
					<img src="../../assets/Gicimg/heder/logo.png">
				</div> -->

				<div class="footerWarp">
					<div class="footerRight">
						<div class="one">
							<h4>条款协议</h4>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'9'}}">用户协议</router-link>
							</span>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'4',}}">隐私条款</router-link>
							</span>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'3',}}">法律声明</router-link>
							</span>
						</div>
						<div class="one">
							<h4>工具支持</h4>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'8'}}">交易指南</router-link> 
							</span>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'8'}}">交易规则</router-link> 
							</span>
						</div>
						<div class="one">
							<h4>关于</h4>
							<span @click="clearIndex">
								<router-link :to="{path:'/aboutus',query: {name_cn:'1'}}">关于我们</router-link> 
							</span>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'7'}}">关于反洗钱</router-link> 
							</span>
						</div>
						<div class="one">
							<h4>联系我们</h4>
							<span>{{email}}</span>
							<span class="three-img">
								<img src="../../assets/img/footer/f-img.png">
								<img src="../../assets/img/footer/t-img.png">
								<img src="../../assets/img/footer/h-img.png">
							</span>
							<span class="copy">
								©2017 - 2020 Billum All Rights Reserved
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return { 
				email: null,
				dialogFormVisible:false
			}
		},
		methods: {
			xiazai(){
				window.open('https://admin.faceke.com/upload/?id=gg3224106513')
				// this.$public.msg( this.$t('Gic.footer[9]'), 'warning', this);
			},
			clearIndex() {
				this.$parent.$refs.header.navIndex = 0
				sessionStorage.navIndex = 0
			},
			linkMe: function() {
				var _this = this;
				_this.dialogFormVisible = true;
			},
			requestData: function() {
				var _this = this;
				_this.$http.get(_this.$http.software_con, { params: { key:'contactemail' } }).then(function(res) {
					if(res.data.code == "200") {
						_this.email = res.data.data.content;
					}
				}).catch(function(error) {});
			},
			jump() {
				this.$router.push({name: 'Introduce'})
			}
		},
		created: function() {
			var _this = this;
			_this.requestData();
		}
	}
</script>
<style lang="less">
	.footer{
		background: #030609;
		border-top: 2px solid #343A3A;
		.tankuang2{
			text-align: center;
			p{
				line-height: 28px;
			}
		}
		.one{
			float:left;
			width:170px;
			.three-img {
				img {
					width: 24px;
					margin-right: 20px;
				}
			}
			.copy {
				white-space: nowrap;
				font-size: 14px;
			}
		}

		/* .footerWarp{
			text-align: center;
		} */
	}
</style>