<style lang="less" scoped>
	@import './security.less';
</style>
<template>
	<div class="center">
        <div class="centercontain">
			<p class="top-title">安全中心</p>
			<ul  class="router-list">
				<li :class="!item.url?'title':item.active?'active':''" v-for="(item,index) in routerList" :key="index">
					<router-link :to="item.url">{{item.name}}</router-link>
					<i class="el-icon-caret-bottom right-icon"></i>
				</li>
			</ul>
			<div class="center-right">
				<router-view/>
			</div>
		</div>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				routerList:[//个人中心左侧列表路由 如果页面中存在跳转 则在上一层路由后加/ 例如/center/baseInfo/666  需要跟router.js中相对应 不可点击的url设置为空即可
					{name: this.$LangFn("安全设置"), url:'/security/index', active: true},//账号安全
					{name: this.$LangFn("身份认证"), url:'/security/identity', active: false},//身份认证
				]
			}
		},
		methods: {
			setrouterListActive(){
				this.routerList.forEach((item)=>{
					if(this.$route.path.indexOf(item.url) >= 0){
						item.active = true
					} else{
						item.active = false
					}
				});
			}
		},
		mounted() {
			this.setrouterListActive()
			console.log(this.$route.path)
		},
		watch: {
			$route(){
				this.setrouterListActive()
			}
		}

	};
</script>