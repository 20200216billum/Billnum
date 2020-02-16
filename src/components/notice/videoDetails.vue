<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_details_wrapper">
		<!--<HeaDer></HeaDer>-->
		<div class="details_container">
			<el-card>
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>
						<router-link :to="{path:'/zixunList',query: {type:'new'}}">{{$t('zixunList[4]') }}</router-link>
						<!-- HUB公告中心 -->
					</el-breadcrumb-item>
					<el-breadcrumb-item>{{ getdata.title }}</el-breadcrumb-item>
				</el-breadcrumb>
			</el-card>
			<div class="details_content">
				<el-card class="top">
					<nav>{{ getdata.title }}</nav>
					<!--<time v-show="getdata.time">{{$public.timestampToTime(getdata.time)}}</time>-->
				</el-card>
				<el-card>
					<div class="videoWarp" v-show="getdata.url">
						<video :src="getdata.url" controls="controls">
							您的浏览器不支持 video 标签。
						</video>
					</div>
					<div class="contents" v-html="getdata.cont">
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
	//	test.value.replace(/\n/g, '<br/>').replace(/\r/g, '<br/>').replace(/\s/g, '&nbsp;');
	export default {
		data() {
			return {
				data: {
					getdata: ''
				},
			}
		},
//		computed: {
//			showHtml() {
//				return this.getdata.cont
//					.replace(this.getdata.cont ? /&(?!#?\w+;)/g : /&/g, '&amp;')
//					.replace(/&lt;/g, "<")
//					.replace(/&gt;/g, ">")
//					.replace(/&quot;/g, "\"")
//					.replace(/&#39;/g, "\'");
//			}
//		},
		methods: {
			requestPublic: function() {
				var _this = this;
				_this.$http.get(_this.$http.zixunDetails, {
						params: {
							"id": _this.$route.query.article_id
						}
					})
					.then((res) => {
						_this.data = res.data.data;
					});
			}
		},
		created: function() {
			var _this = this;
			//			_this.requestPublic();
			this.getdata = this.$route.query;
			//			this.getdata.cont = this.getdata.cont.replace(/\n/g, '<br/>').replace(/\r/g, '<br/>').replace(/\s/g, '&nbsp;');
			console.log(this.getdata)
			_this.$public.scrollTop();
		},
		//		components: {
		//			"HeaDer": Header,
		//			"FooTer": Footer,
		//		}
	}
</script>