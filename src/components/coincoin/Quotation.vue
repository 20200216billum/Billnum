<template lang="html">
	<section class="MainArea_box">
		<p class="titleDes"><i></i>{{$t('home.table[0]')}}</p>
    	<ul class="MainArea_main">
      		<li :data_code="item.stockProductVO.code" v-for="(item,index) in Marketmain" :key="index" class="MainArea_list" v-bind:class="{ active: isActive == index}" @click="handleClick(item.code,index)">
        		<p class="MainArea_list_name">{{item.stockProductVO.name}}</p>

        		<p class="indexcommodity_box_list" v-if="item.stockProductVO.change > 0 ">
					<span class="rise">{{item.stockProductVO.price}}</span>
				</p>
				<p class="indexcommodity_box_list" v-else>
					<span class="fall">{{item.stockProductVO.price}}</span>
				</p>
				<p class="indexcommodity_box_list" v-if="item.stockProductVO.change > 0 ">
					<span class="rise">{{item.stockProductVO.changeRate}}</span>
					<i class="el-icon-caret-top rise"></i>
				</p>
				<p class="indexcommodity_box_list" v-else>
					<span class="fall">{{item.stockProductVO.changeRate}}</span>
					<i class="el-icon-caret-bottom fall"></i>
				</p>
      		</li>
    	</ul>
    	<p class="titleDes creatArea"><i></i>{{$t('home.table[1]')}}</p>
    	<div class="nullData">{{$t('home.table[2]')}}</div>
  	</section>
</template>
<script>
	export default {
		props:['Marketmain'],
		data() {
			return {
				isActive:0,
			}
		},
		watch: {},
		methods: {
			handleClick:function(enevt,type){
				var _this = this;
				_this.isActive = type;
				_this.$emit('modifyfun', enevt,type);
			},
		},	
		// 路由改变时
		beforeRouteLeave(to, from, next) {
		},
		created: function() {
			
		},
		components: {}
	}
</script>