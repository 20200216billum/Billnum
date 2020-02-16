<template lang='html'>
	<section class="exchange_box">
		<ul class="Placeanorder_header_box" v-if="Marketheader.stockProductVO">
		  	<li class="Placeanorder_list_header">
		    	<p class="Placeanorder_code">{{Marketheader.stockProductVO.code}}<span></span></p>
		  	</li>
		  	<li class="Placeanorder_list_conent">
		    	<p v-if='Marketheader.stockProductVO.change > 0 ' class="Placeanorder_price">
		    		<span><span class="rise">{{Marketheader.stockProductVO.price}}</span>&asymp;{{Math.floor(Number(Marketheader.stockProductVO.cnyPrice)*100)/100}}CNY</span>
		    	</p>
		    	<p v-else class="Placeanorder_price">
		    		<span><span class="rise">{{Marketheader.stockProductVO.price}}</span>&asymp;{{Math.floor(Number(Marketheader.stockProductVO.cnyPrice)*100)/100}}CNY</span>
		    	</p>


		    	<p class="Placeanorder_changeRate">{{$t("coincoin.haeder[0]")}}<span>{{Marketheader.stockProductVO.changeRate}}</span></p>
		    	<p class="Placeanorder_high">{{$t("coincoin.haeder[1]")}}<span>{{Marketheader.stockProductVO.high}}</span></p>
		    	<p class="Placeanorder_low">{{$t("coincoin.haeder[2]")}}<span>{{Marketheader.stockProductVO.low}}</span></p>
		    	<p class="Placeanorder_volume">{{$t("coincoin.haeder[3]")}}<span>{{Marketheader.stockProductVO.volume}}</span></p>
		  	</li>
		</ul>
	</section>
</template>
<script>
	export default {
		props:['Marketheader'],
		data() {
			return {}
		},
		watch: {},
		methods: {},
		// 路由改变时
		beforeRouteLeave(to, from, next) {},
		created: function() {},
		components: {}
	}
</script>