<style lang=less>
	@import '../../assets/public.less';
	/*@import './exchange.less';*/
</style>
<template>
	<div class="tradingNotice">
		<h2>{{$t("coincoin.coincoin_nav[3]")}}</h2>
		<ul class="announcementList" v-if="annListData.length">
			<li class="list" v-for="(v,item) in annListData" @click="goUrl(v.id)" >
				<p class="title">{{v.title}}</p>
				<span class="time">{{v.createTime }}</span>
			</li>
		</ul>
		<ul class="announcementList" v-else>
			<p style="text-align: center; padding-top: 50px; color: #999; font-size: 12px;">{{$t("coincoin.coincoin_nav[4]")}}</p>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				annListData: []
			}
		},
		methods: {
			goUrl(id) {
				this.$router.push({
					name: 'zixunDetails',
					params: {	
						article_id: id
					}
				})
			},
			getDataList(){
				var _this = this;
				this.$http.post(this.$http.view, {
					page:1,
					pageSize:10
				}).then(function(response) {
				if(response.data.code == "0") {
					_this.annListData = response.data.data.list;
				}else{
					_this.annListData = [];
				}
			}).catch(function(error) {});
				
				
			}
		},
		created(){
			this.getDataList();
		}
	};
</script>