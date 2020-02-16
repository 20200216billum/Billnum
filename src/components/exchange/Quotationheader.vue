<template lang='html'>
	<section class="exchange_box">
		<ul class="Placeanorder_header_box">
			<li class="Placeanorder_list_header">
				<p v-if='Marketheader.name'>{{$public.changeInterceptingAdd(Marketheader.name)}}<span></span></p>
			</li>
			<li class="Placeanorder_list_conent">
				<p class="newPrice">
					<span class="price">
						{{Number(Marketheader.price).toFixed($public.SavePoint(Marketheader.code))}}
					</span>
					&nbsp; ≈
					
					<!-- <span class="cny">{{$public.toDecimal2(Marketheader.cnyPrice)}}CNY</span> -->

					<!-- <span v-if="language == 'zh-CN'">{{$public.toDecimal2(Marketheader.cnyPrice)}} CNY</span> -->
					<span>
						{{$public.Division(Number(Marketheader.cnyPrice),Number(7)).toFixed($public.SavePoint(Marketheader.code))}} USD
					</span>
				</p>

				<p>{{$t("Gic.coincoin[12]")}} <span>{{Marketheader.changeRate}}</span></p>
				<p>{{$t("Gic.coincoin[13]")}} <span>{{$public.toDecimal2(Marketheader.high)}}</span></p>
				<p>{{$t("Gic.coincoin[14]")}} <span>{{$public.toDecimal2(Marketheader.low)}}</span></p>
				<p>{{$t("Gic.coincoin[15]")}} <span>{{$public.toDecimal2(Marketheader.volume)}}</span></p>
			</li>

		</ul>
	</section>
</template>
<script>
	export default {
		props: ['Marketheader'],
		data() {
			return {
				klinetab: "",
				language:''
			}
		},
		watch: {},
		methods: {},
		// 路由改变时
		beforeRouteLeave(to, from, next) { },
		created: function () {
			var _this = this;
			if(_this.$cookies.get('language') == 'Chinese'){
      	_this.language = 'zh-CN';
      }else{
        _this.language = 'en';
      }
		},
		components: {}
	}
</script>