<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
</style>
<template lang="html">
	<div class="notice_list_wrapper">
		<!--<HeaDer></HeaDer>-->
		<div class="list_container">
			<el-card class="box-card">
				<div class="title">{{$t("zixunList[0]")}}</div><!-- HUB公告中心 -->
			</el-card>
			<div class="list_content">
				<el-card class="box-card">
					<nav>{{$t("zixunList[1]")}}</nav><!-- 列表 -->
				</el-card>
				<el-card class="box-card">
					<ul class="content">
						<li v-for="(todo,index) in newsData.res" :key="index">
							<router-link :to="{path:'/zixunDetails',query:{article_id:todo.id}}">
								<p class="left">
									<span class="tag" v-if="todo.is_tuijian == 1">{{$t("zixunList[2]")}}</span><!-- 重要 -->
									<span class="news">{{ todo.title }}</span>
								</p>
								<time>{{ $public.timestampToTime(todo.create_time) }}</time>
							</router-link>
						</li>
					</ul>
					<div class="block button_pages" v-if="totalPage >1">
						<i>{{$t("ziChan.page[0]")}} {{ pageNum }} {{$t("ziChan.page[1]")}}</i><!-- 第 {{ pageNum }} 页 -->
						<span @click="prevClick" v-if="prevBool">{{$t("ziChan.page[2]")}}</span><!-- 上一页 -->
						<span @click="nextClick" v-if="nextBool">{{$t("ziChan.page[3]")}}</span><!-- 下一页 -->
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
				routerData: {}, // 上个界面router传递的name、id
				newsData: [], // 列表数据
				pageNum: 1, // 当前页数
				totalPage: null, // 总页数
				prevBool: false,
				nextBool: true
			}
		},
		methods: {
			// 上一页、下一页
			prevClick: function(page) {
				var _this = this;
				_this.pageNum--;
				if(_this.pageNum <= 1) {
					_this.prevBool = false;
					_this.nextBool = true;
					_this.requestPublic();
					return;
				} else {
					_this.nextBool = true;
					_this.requestPublic();
				}
			},
			nextClick: function(page) {
				var _this = this;
				_this.pageNum++;
				if(_this.pageNum >= _this.totalPage) {
					_this.requestPublic();
					_this.prevBool = true;
					_this.nextBool = false;
				} else {
					_this.prevBool = true;
					_this.requestPublic();
				}
			},
			init: function() {
				var _this = this;
				_this.routerData = _this.$route.query;
				_this.requestPublic();
			},
			requestPublic: function() {
				var _this = this;
				_this.$http.get(_this.$http.zixunList, {
						params: {
							"p": _this.pageNum,
							size: 9
						}
					})
					.then((res) => {
						_this.newsData = res.data.data;
						_this.totalPage = Math.ceil(res.data.data.count / res.data.data.size);
					});
			}
		},
		computed: {},
		created: function() {
			var _this = this;
			_this.init();
			_this.$public.scrollTop();
		},
//		components: {
//			"HeaDer": Header,
//			"FooTer": Footer,
//		}
	}
</script>