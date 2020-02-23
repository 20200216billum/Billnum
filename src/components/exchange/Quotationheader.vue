<template lang='html'>
	<section class="exchange_box">
		<ul class="Placeanorder_header_box">
			<li class="Placeanorder_list_header">
				<p v-if='Marketheader.code'>{{ Marketheader.code }}<span></span></p>
			</li>
			<li class="Placeanorder_list_conent">
				<div class="newPrice">
					<p class="price">
						<span class="one">{{Number(Marketheader.close).toFixed($public.SavePoint(Marketheader.code))}}</span><br/>
						<!-- <span class="two">≈{{$public.Division(Number(Marketheader.cnyPrice),Number(7)).toFixed($public.SavePoint(Marketheader.code))}} USD</span> -->
						<span class="two">≈{{ Marketheader.aboute }}</span>
					</p>
					
					
					<!-- <span class="cny">{{$public.toDecimal2(Marketheader.cnyPrice)}}CNY</span> -->
					<!-- <span v-if="language == 'zh-CN'">{{$public.toDecimal2(Marketheader.cnyPrice)}} CNY</span> -->
					<!-- <p>
						{{$public.Division(Number(Marketheader.cnyPrice),Number(7)).toFixed($public.SavePoint(Marketheader.code))}} USD
					</p> -->
				</div>

				<p>
					涨跌幅<br/>
					<span :class="{greenColor: Marketheader.range >=0, redColor: Marketheader.range <0 }">{{ Marketheader.range }}%</span>
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
					<span>{{$public.toDecimal2(Marketheader.amount)}}</span>
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
		created () {
			this.language = this.$cookies.get('language');
			// if(this.$cookies.get('language') == 'zh'){
			// 	this.language = 'zh';
			// }else{
			// 	this.language = 'en';
			// }
		},
	}
</script>
