<style lang=less scoped>
    @import './gonggaoList.less';
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
      <!-- <div class="notice_top">
          {{$t('Gic.gonggaoList[0]')}}
      </div> -->
      <div class="list_container">
        <div class="title">
          系统公告
          <span class="little">System Bulletin</span>  
        </div> 
        <ul class="content">
          <li v-for="(i,index) in listData" v-show="!loading" @click="$router.push({path:'/zixunDetails', query:{posts_id:i.id,type:'2'}})">
            <p> {{ i.title }}</p>	
            <p class="time">{{ i.created_at }}</p>
          </li>
          <!-- 暂无数据 -->
          <p class="noData" v-show="listData.length==0 && !loading">{{$t('sell.showlist[8]')}}</p>
          <!-- 加载中 -->
          <p class="noData" v-show="loading">{{$t("bibi.loading")}}</p>
        </ul>
      </div>
      <el-pagination 
        background 
        class="zixun_fen common-pagination" 
        layout="prev, pager, next" 
        prev-text="上一页"
        next-text="下一页"
        :total="total" 
        @current-change="current_change1" 
        :page-size='size' 
        :current-page.sync="page"
      ></el-pagination>
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
          page:null,
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

          // type=='zx' ? http = this.$http.zxList : http = this.$http.ggList
          this.loading = true
          this.$http.get(this.$http.systemPosts, {params:{type:'2',page:this.page, size:this.size}}).then(r=>{
            this.loading = false
            if(r.data.code=='200'){
              this.listData = r.data.data.data
              this.page = r.data.data.current_page
              this.total = r.data.data.total
            }else{
              this.$public.msg(r.data.msg,'error',this)
            }
          })
        },
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