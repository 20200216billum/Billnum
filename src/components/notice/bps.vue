<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
	.hd {
		min-width: 1280px;
		margin: 0 auto;
		max-width: 1520px;
		.el-header{
			padding:0px;
		}
		margin:20px 0 ;
		.title{
			font-size:30px;
		}
	}
</style>
<template lang="html">

	<div class="notice_list_wrapper">
		
		<div class="list_container">

			<div class="hd">
			<el-header class="top">
				<el-card class="box-card">
					<div class="title" v-if="$cookies.get('language') == 'zh'">{{ routerData.name_cn }}</div>
					<div class="title" v-else>{{ routerData.name_en }}</div>
				</el-card>
			</el-header>
		</div>
			<div class="list_content">
				<el-card class="box-card">
					<ul class="content">
						<li v-for="(todo,index) in newsData" :key="index">
							
								<a :href="basUrl + todo.url" rel="noopener noreferrer"  target="_blank">
									<p>{{todo.title}}</p>
								</a>
								
							
						</li>
					</ul>
					
				</el-card>
			</div>
		</div>
		<!--<FooTer></FooTer>-->
	</div>
</template>

<!--<el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>-->

<script>
	//	import Header from "../../header/heaer.vue";
	//	import zixunDetails from "./zixunDetails.vue";
	export default {
		data() {
			return {
				activeName2: 'first',
				routerData: {}, // 上个界面router传递的name、id
				newsData: [], // 列表数据
				pageNum: 1, // 当前页数
				totalPage: null, // 总页数
				prevBool: false,
				nextBool: true,
				videoData: '',
				basUrl:''
			}
		},
		methods: {
			goulrs: function(title, url, cont, time) {
				this.$router.push({
					name: 'videoDetails',
					query: {
						title: title,
						url: url,
						cont: cont,
						time: time
					}
				})

			},
			
			init: function() {
				var _this = this;
				_this.routerData = _this.$route.query;
				_this.requestPublic();
			},
			requestPublic: function() {
				var _this = this;
				_this.$http.get(_this.$http.bps, {
						params: {
							
						}
					})
					.then((res) => {
						_this.newsData = res.data.data;
						
					});
			}	
		},
		computed: {},
		created: function() {
			var _this = this;
			_this.init();
			_this.basUrl = 'http://' + window.location.host + '/';
			_this.$public.scrollTop();
			if(_this.$route.query.type == 'new') {
				_this.activeName2 = 'second';
			} else {
				_this.activeName2 = 'first';
			}
		},
		components: {
			//			"zixunDetails": zixunDetails,

		}
	}
</script>