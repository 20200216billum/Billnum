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
							<h4>{{$t('Gic.footer[0]')}}</h4>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'1',}}">{{$t('Gic.footer[4]')}}</router-link>
							</span>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'4',}}">{{$t('Gic.footer[5]')}}</router-link>
							</span>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'9'}}">{{$t('Gic.footer[6]')}}</router-link>
							</span>

						</div>
						<!-- <div class="one">
							<h4>{{$t('Gic.footer[1]')}}</h4>
							<span @click="clearIndex">
								<router-link :to="{path:'/help',query: {name_cn:'8'}}">{{$t('Gic.footer[7]')}}</router-link> 
							</span>
						</div> -->
						<div class="one">
							<h4>{{$t('Gic.footer[2]')}}</h4>
							<span>{{email}}</span>
						</div>
						<div class="one">
								<h4>{{$t('Gic.footer[3]')}}</h4>
								<span @click="xiazai">{{$t('Gic.footer[8]')}}</span> 
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
		.tankuang2{
			text-align: center;
			p{
				line-height: 28px;
			}
		}
		.one{
			float:left;
			width:170px;
		}

		/* .footerWarp{
			text-align: center;
		} */
	}
</style>