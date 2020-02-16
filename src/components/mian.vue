<style lang=less>
	@import './mian.less';
</style>
<template>
	<div class="main" style="min-width:1320px;" id="main">
		<HeaDer ref="header" :is-fixed="isFixed"></HeaDer>
		<router-view></router-view>
		<FooTer v-if="$route.name != 'login' && $route.name != 'register' && $route.name != 'forgetpwd'"></FooTer>
	</div>
</template>
<script>
	import Header1 from "./main/header.vue";
	import Footer1 from "./main/footer.vue";
	export default {
		data(){
			return{
				isFixed:true
			}
		},
		methods:{}, 
	  	created:function(){
	  		// this.$i18n.locale = "Chinese"
	  	},
	  	mounted:function(){
	  		var _this = this;
				if(!_this.$cookies.get('changeBg')||_this.$cookies.get('changeBg')=='night') {
					$('#main').removeClass('mainb');
					$('#main').addClass('mainy');
				} else {
					$('#main').removeClass('mainy');
					$('#main').addClass('mainb');
				}
				if(_this.$route.path=='/home'){
					_this.isFixed=true;
				}else{
					_this.isFixed=false;
				}
	  	},
	  	watch:{
		  $route(to,from){
		  	// console.log(to.path);
		    if(to.path=='/home'){
		    	this.isFixed=true;
		    }else{
		    	this.isFixed=false;
		    }
		  }
		},
	  	components:{
		    "HeaDer":Header1,
		    "FooTer":Footer1,
		}
	}
</script>