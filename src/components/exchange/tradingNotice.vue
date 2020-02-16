<style lang=less>
	@import '../../assets/public.less';
	@import './exchange.less';
	.tradingNotice{
		h2{
			span{
				padding-left: 6px;
				border-left: 3px solid #7a98fa;
			}
		}
	}
</style>
<template>
	<div class="tradingNotice">
		<h2><span>{{$t('zixunList[5]')}}</span></h2>
		<ul class="announcementList" v-if="annListData.length">
			<li class="list" v-for="(v,item) in annListData" @click="goUrl(v.id)">
				<p class="title">{{v.title}}</p>
				<span class="time">{{ v.date }}</span>
			</li>
		</ul>
		<ul class="announcementList" v-else>
			<p style="text-align: center; padding-top: 50px; color: #999; font-size: 12px;">暂无数据</p>
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
					path: '/zixunDetails',
					query: {	
						article_id: id
					}
				})
			},
			getDataList(){
				var _this = this;
				this.$http.post(this.$http.notice_list, {
					p:1,
					size:9
				}).then(function(response) {
				if(response.data.status == "200") {
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