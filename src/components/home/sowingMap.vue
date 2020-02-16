<style lang=less>
	@import '../../assets/public.less';
	@import './sowingMap.less';
	
</style>
<template lang="html">
	<section class="banners">
		<div class="inner">
			<div class="right">
				<div class="pos">
					<img src="../../assets/image/index/ios.png">
					<img src="../../assets/image/index/android.png">
				</div>
			</div>
			<div class="left">
				<div class="leftWarp">
					<div class="headers">
						<h2>随时随地多平台交易</h2><!-- Android 和 IOS全平台终端正式上线 -->
						<p class="info">{{$t("home.main1[1]")}}</p><!--HUB聚会全国用户,致力于打造世界级区块链资产平台。 -->
					</div>
					<div class="uploadPhone">
						<div class="uploadWarp">
							
							<div class="uploadAndroad">
								<img class="rwm" src="../../assets/image/uploadewm.png"/>
								<img src="../../assets/image/index/rwmwarp.png"/>
								<p class="wenzhi">{{$t("home.main1[2]")}}</p><!--扫码下载Androad版 -->
							</div>
							<div class="uploadIos">
								<img src="../../assets/image/index/rwmwarp.png"/>
								<img  class="rwm" src="../../assets/image/uploadewm.png"/>
								<p class="wenzhi">{{$t("home.main1[3]")}}</p><!-- 扫码下载IOS版 -->
							</div>
							
						</div>
					</div>

				</div>

			</div>

			<div class="backimg"></div>
		</div>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				slideDataArr: [],
				publicSrc: '',
			}
		},
		methods: {},
		created: function() {
			var _this = this;
			_this.publicSrc = _this.$http.bases;
			_this.$http.get(_this.$http.publicData, {
					params: {}
				})
				.then((res) => {
					_this.slideDataArr = res.data.data.slide;
				});
		},
	}
</script>
