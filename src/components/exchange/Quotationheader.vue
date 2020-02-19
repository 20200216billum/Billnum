<template lang='html'>
	<section class="exchange_box">
		<ul class="Placeanorder_header_box">
			<li class="Placeanorder_list_header">
				<p v-if='Marketheader.name'>{{ Marketheader.code }}<span></span></p>
			</li>
			<li class="Placeanorder_list_conent">
				<div class="newPrice">
					<p class="price">
						<span class="one">{{Number(Marketheader.price).toFixed($public.SavePoint(Marketheader.code))}}</span><br/>
						<span class="two">≈{{$public.Division(Number(Marketheader.cnyPrice),Number(7)).toFixed($public.SavePoint(Marketheader.code))}} USD</span>
					</p>
					
					
					<!-- <span class="cny">{{$public.toDecimal2(Marketheader.cnyPrice)}}CNY</span> -->
					<!-- <span v-if="language == 'zh-CN'">{{$public.toDecimal2(Marketheader.cnyPrice)}} CNY</span> -->
					<!-- <p>
						{{$public.Division(Number(Marketheader.cnyPrice),Number(7)).toFixed($public.SavePoint(Marketheader.code))}} USD
					</p> -->
				</div>

				<p>
					涨跌幅<br/>
					<span>{{ Marketheader.changeRate }}</span>
				</p>
				<p>
					最高价<br/> 
					<span>{{$public.toDecimal2(Marketheader.high)}}</span>
				</p>
				<p>
					最低价<br/>
					<span>{{$public.toDecimal2(Marketheader.low)}}</span>
				</p>
				<p>
					24H成交量<br/>
					<span>{{$public.toDecimal2(Marketheader.volume)}}</span>
				</p>
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