<style lang="less" scoped>
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_details_wrapper">
		<!--<HeaDer></HeaDer>-->
		<div class="details_container">
				<div class="detail_title_top">
					<p class="name">{{ data.title }}</p>
					<p class="time">{{ data.created_at }}</p>
				</div>
			</el-card>
			<div class="details_content">
				<el-card>
					<div class="content" >
					</div>
				</el-card>
			</div>
		</div>
		<!--<FooTer></FooTer>-->
	</div>
</template>
<script>
	//	import Header from "../../header/heaer.vue";
	//	import Footer from "../../footer/footer.vue";
	export default {
		data() {
			return {
				data: {},
			}
		},
		methods: {
			requestPublic: function() {
				var _this = this;
				// var http = this.$route.query.type=='gg' ? this.$http.ggDetail :this.$http.zxDetail
				_this.$http.get(_this.$http.postsInfo, {
						params: {
							"posts_id": _this.$route.query.posts_id,
							"type":_this.$route.query.type
						}
					})
					.then((res) => {
						_this.data = res.data.data;
						$(".content").html(_this.data.content)
					});
			},
			// HTMLDecode(text) {
			// 	var temp = document.createElement("div"); 
			// 	temp.innerHTML = text; 
			// 	var output = temp.innerText || temp.textContent; 
			// 	temp = null; 
			// 	return output; 
			// } 
		},
		created: function() {
			var _this = this;
			_this.requestPublic();
			_this.$public.scrollTop();
		},
		watch: {
			'$route': 'requestPublic'
		},

		//		components: {
		//			"HeaDer": Header,
		//			"FooTer": Footer,
		//		}
	}
</script>