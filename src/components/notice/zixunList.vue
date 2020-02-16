<style lang=less>
	@import '../../assets/public.less';
	@import './noticeList.less';
	@import './noticeDetails.less';
	.list_container {
		.el-tabs__nav.is-top {
			transform: translateX(80%) !important;
		}
		#tab-first,
		#tab-second {
			padding: 0 100px;
			font-size: 18px;
		}
		.el-tabs__header {
			background: @YeDackGroundColor2;
		}
		.el-tabs__nav-scroll {
			padding: 15px 0;
		}
	}
</style>
<template lang="html">
	<div class="notice_list_wrapper">
		<!-- <HeaDer></HeaDer> -->
		<div class="notice_top">
				{{$t('Gic.header[2]')}}
		</div>
		<div class="list_container">

			<ul class="content" >
				<li v-for="(i,index) in listData" :key="index" @click="$router.push({path:'/zixunDetails', query:{posts_id:i.id,type:'6'}})">
					<p> {{ i.title }}</p>	

					<p>{{ i.created_at }}</p>
				</li>
				<!-- 暂无数据 -->
				<p class="noData" v-show="listData.length==0 && !loading">{{$t('sell.showlist[8]')}}</p>
				<!-- 加载中 -->
				<p class="noData" v-show="loading">{{$t("bibi.loading")}}</p>

			</ul>
			
		</div>
		<el-pagination background class="zixun_fen" layout="prev, pager, next" :total="total"  @current-change="current_change1" :page-size='size' :current-page.sync="page"></el-pagination>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				loading:false,
				// type=gg 公告 type==zx 资讯
				type:this.$route.query.type,
				listData:[],
				page:1,
				total:null,
				size:10,
			}
		},
		watch:{
			// 切换tabs
			'type'(n, o) {
				this.page=1
				// this.renderList(n)
			}
		},
		methods: {
			renderList(type) {
				var _this = this
				var http,lang;
				lang = this.$cookies.get("language") == 'English' ? 'en' : 'zh-CN';
				// type=='zx' ? http = this.$http.zxList : http = this.$http.ggList

				$.ajax({
          type:"get",
          url:_this.$http.systemPosts,
          data:{
            type:'6',
						page:this.page,
						size:this.size
          },
          headers: {
            'locale': lang,
            'from':'pc'
          },
          dataType:"json",  
          success:function(res){
            if (res.code == '200') {
              _this.listData = res.data.data
              _this.page = res.data.current_page
							_this.total = res.data.total

            }
          },
          error:function(error){
             console.log(error)
          }
      });


				// this.loading = true
        //   this.$http.get(this.$http.systemPosts, {params:{type:'6',page:this.page, size:this.size}}).then(r=>{
        //     this.loading = false
        //     if(r.data.code=='200'){
        //       this.listData = r.data.data.data
        //       this.page = r.data.data.current_page
        //       this.total = r.data.data.total
        //     }else{
        //       this.$public.msg(r.data.msg,'error',this)
        //     }
        //   })
			},
		// 	getBanner() {
    //     const _this = this;

    // },
			current_change1(val){
				this.page = val 
				this.renderList(this.type)
				// this.$http.get(http, {params:{page:val, size:this.size, lang}}).then(r=>{
				// 	this.loading = false
				// 	if(r.data.code=='200'){
				// 		this.listData = r.data.data.data
				// 	}else{
				// 		this.$public.msg(r.data.msg,'error',this)
				// 	}
				// })
			}
		},
		computed: {},
		created() {
			this.type?this.type:this.type ="zx"
			this.renderList(this.type)
		},

	}
</script>