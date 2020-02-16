<template lang="html">
	<div>
		<ul class="PurchaseData">
		  	<li class="PurchaseData_list" v-for="(item, index) in DateList.asks" @click="PriceSwitchingpurchase(DateList.asks[DateList.asks.length-index-1].price)">
		    	<p class="PurchaseData_name fall">{{$t('coincoin.transaction[14]')}}{{ DateList.asks.length - index}}</p>
		   		<p class="PurchaseData_name">{{DateList.asks[DateList.asks.length-index-1].price}}</p>
		    	<p class="PurchaseData_name">{{DateList.asks[DateList.asks.length-index-1].totalSize}}</p>
		  	</li>
		</ul>
		<ul class="SelloutData">
		  	<li class="PurchaseData_list" v-for="(item, index) in DateList.bids" @click="PriceSwitchingsellout(item.price)">
		    	<p class="PurchaseData_name rise">{{$t('coincoin.transaction[15]')}}{{index+1}}</p>
		   		<p class="PurchaseData_name">{{item.price}}</p>
		    	<p class="PurchaseData_name">{{item.totalSize}}</p>
		  	</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props:['DateList'],
		data() {
			return {}
		},
		methods: {
			// 点击跳转
			RoutingJump(typenum) {
				var connet = this;
			},
			PriceSwitchingpurchase(type){//卖价修改
				var _this = this;
				_this.$emit('refreshList1',type);
			},
			PriceSwitchingsellout(type){//买价修改
				var _this = this;
				_this.$emit('refreshList2',type);
			}
		},
		created: function() {}
	}
</script>