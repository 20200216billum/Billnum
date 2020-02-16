<style lang=less>
  @import "./home.less";

  .el-dialog__body {
    text-align: center;
  }

  .el-dialog__title {
    color: #fff;
  }

  .fenge {
    width: 100%;
    min-width: 1280px;
    background: url(../../assets/image/index/fenge.png) center center no-repeat;
    background-size: cover;
    height: 1px;
  }

  .fenge2 {
    width: 100%;
    min-width: 1280px;
    background: url(../../assets/image/index/fenge.png) center center no-repeat;
    background-size: cover;
    height: 1px;
    position: relative;
    left: -100px;
    top: -10px;
    margin-bottom: 20px;
  }

  #home {
    .el-dialog__body {
      /*height: 400px;*/
      min-height: 200px;
      max-height: 450px;
      overflow-y: auto;
    }

    .alertp {
      line-height: 20px;
      color: #fff;
    }

    .el-dialog {
      background: #413aa4;
    }
  }

  /*滚动条样式*/

  .el-dialog__body::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 15px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  .el-dialog__body::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .el-dialog__body::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .el-carousel__indicators {
    display: none;
  }

  .notice {
    text-align: center;

    li {
      cursor: pointer;
    }
  }

  .right {
    float: left;
    width: 285px;
  }

  .res {
    width: 460px;
    margin: 0 auto;

    .input-with-select {
      width: 460px;
      height: 55px;

      .el-input__inner {
        height: 55px;
        line-height: 55px;
        color: #3166d0;
      }

      .el-input-group__append {
        width: 124px;
        padding: 0;
        text-align: center;
        color: #3166d0;
        background: #bcd2ff;
      }
    }
  }
</style>
<template lang="html">
  <div class="index_main">

    <section class="sowingmap">
        <!-- 轮播图 -->
				<el-carousel :height="height" indicator-position="none">
				    <el-carousel-item id="carouselWarp" v-for="(item,index) in bannerList" :key="index">
				        <img @load="imgload" ref="bannerImg" class="bannerImg" :src='item.image' style="width: 100%;">
				    </el-carousel-item>
				</el-carousel>
      </section>


    <!-- 公告3 -->
    <section class="Notice_3">
      <ul class="Notice_3_cen">
        <li class="cen_list" v-for="(item,index) in SystemPosts" :key="index" v-if="index<3">
          <p @click="$router.push({path:'/zixunDetails', query:{posts_id:item.id,type:'2'}})">{{item.title}}</p>
          <span>/</span>
        </li>
      </ul>
      <router-link class="more" to="/gonggaoList">{{$t('Gic.home[0]')}}</router-link>
    </section>

    <section class="bannerCenter wow slideInUp">
      <div class="bannerheader">
        <IndexCommodity></IndexCommodity>
      </div>
    </section>

    <section class="download_app">
        <h5>{{$t('Gic.home[8]')}}</h5>
        <p>{{$t('Gic.home[9]')}}</p>
        <div class="zhuce_btn" @click="xiazai">{{$t('Gic.home[10]')}}</div>
        <img class="home_pc" :src="pc_img" alt="">
    </section>

    <section class="jieshao">
      <div class="jieshao_cen">
        <h5>{{$t('Gic.home[11]')}}</h5>
        <p>{{$t('Gic.home[12]')}}</p>
        <ul class="jieshao_list">
          <li>
            <div class="img_div">
              <img src="../../assets/Gicimg/home/img_1.png" alt="">
            </div>
            <h6>{{$t('Gic.home[13]')}}</h6>
            <p>{{$t('Gic.home[19]')}}</p>
            <p>{{$t('Gic.home[20]')}}</p>
            <p>{{$t('Gic.home[21]')}}</p>
          </li>
          <li>
            <div class="img_div">
              <img src="../../assets/Gicimg/home/img_2.png" alt="">
            </div>
            <h6>{{$t('Gic.home[14]')}}</h6>
            <p>{{$t('Gic.home[22]')}}</p>
            <p>{{$t('Gic.home[23]')}}</p>
            <p>{{$t('Gic.home[24]')}}</p>
          </li>
          <li>
            <div class="img_div">
              <img src="../../assets/Gicimg/home/img_3.png" alt="">
            </div>
            <h6>{{$t('Gic.home[15]')}}</h6>
            <p>{{$t('Gic.home[25]')}}</p>
            <p>{{$t('Gic.home[26]')}}</p>
            <p>{{$t('Gic.home[27]')}}</p>
          </li>
          <li>
            <div class="img_div">
              <img src="../../assets/Gicimg/home/img_4.png" alt="">
            </div>
            <h6>{{$t('Gic.home[16]')}}</h6>
            <p>{{$t('Gic.home[28]')}}</p>
            <p>{{$t('Gic.home[29]')}}</p>
            <p>{{$t('Gic.home[30]')}}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="immediate_registration">
      <h5>{{$t('Gic.home[11]')}}</h5>
      <p>{{$t('Gic.home[17]')}}</p>
      <router-link to="/Register" class="zhuce_btn">{{$t('Gic.home[18]')}}</router-link>
    </section>

    <!-- <p class="fenge"></p> -->
    <section class="platform" style="display: none;">
      <div class="platformWarp">
        <div class="platformHeader">
          <h2>{{$t('home.main3[13]')}}</h2>
          <!-- <p>IOAEX 汇聚全球用户，致力于打造世界级的区块链资产平台</p> -->
        </div>
      </div>
      <div class="fourImg">
        <!-- <ul class="fourLiWarp">
						<li>
							<a href="http://www.8btc.com">
								<img src="../../assets/image/index/logo1.png" alt="" />
							</a>
						</li>
						<li>
							<a href="http://www.bishijie.com">
								<img src="../../assets/image/index/logo2.png" alt="" />
							</a>
						</li>
						<li>
							<a href="http://www.feixiaohao.com">
								<img src="../../assets/image/index/logo3.png" alt="" />
							</a>
						</li>
						<li>
							<a href="http://www.jinse.com">
								<img src="../../assets/image/index/logo4.png" alt="" />
							</a>
						</li>
						<li>
							<a href="http://www.mytoken.io">
								<img src="../../assets/image/index/logo5.png" alt="" />
							</a>

						</li>
						<li style="margin-right:0px;">
							<a href="http://www.ihuoqiu.com/">
								<img src="../../assets/image/index/logo6.png" alt="" />
							</a>
						</li>
					</ul> -->
      </div>
    </section>
    <!--弹框-->
    <!-- <el-dialog title="扫码下载" width="420px" :visible.sync="dialogFormVisible">
				<img src="../../assets/image/index/upload.png" alt="" />
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false" type="primary">确定</el-button>
				</div>
			</el-dialog> -->
    <!--tankuang2-->
    <el-dialog :title="$t('header.navlist[4]')" width="600px" :visible.sync="tankuang">
      <p class="fenge2"></p>
      <div class="el-message-box__content" style="position: relative; top: -15px;">
        <div class="alertp" v-html="alertData">
        </div>
      </div>
    </el-dialog>
  </div>
  </div>
  </div>

  </div>

</template>

<script>
  // import Sowingmap from "./sowingMap.vue";
  import { WOW } from "wowjs";
  var wow = new WOW();
  wow.init();
  import IndexCommodity from "./indexcommodity.vue";
  export default {
    data() {
      return {
        pc_img:'',
        height: "",
        list: [],
        alertData: "",
        alertCg: true,
        dialogFormVisible: false,
        tankuang: false,
        mobile: "",
        isshow: "",
        bannerList:[], // 轮播
        SystemPosts:[],  //公告
        language:'zh-CN',
      };
    },
    methods: {
      xiazai(){
        window.open('https://admin.faceke.com/upload/?id=gg3224106513')
        // this.$public.msg( this.$t('Gic.footer[9]'), 'warning', this);
			},
      //轮播图
      getBanner() {
        const _this = this;
        $.ajax({
          type:"get",
          url:_this.$http.slides,
          data:{
            type:'2',
            position:'1'
          },
          headers: {
            'locale': _this.language,
            'from':'pc'
          },
          dataType:"json",  
          success:function(res){
            if (res.code == '200') {
              _this.bannerList = res.data
            }
          },
          error:function(error){
             console.log(error)
          }
      });
    },
    //获取公告
    getSystemPosts() {
        const _this = this;
        $.ajax({
          type:"get",
          url:_this.$http.systemPosts,
          data:{
            type:'2',
          },
          headers: {
            'locale': _this.language,
            'from':'pc'
          },
          dataType:"json",  
          success:function(res){
            if (res.code == '200') {
              _this.SystemPosts = res.data.data
            }
          },
          error:function(error){
             console.log(error)
          }
      });
    },
    //公告详情
    getNotice_details(id){
      // console.log(id);

    },
      goDeal() {
        if (sessionStorage.token) {
          this.$router.push({ path: "/coincoin" });
        } else {
          this.$public.msg("请先登录！", "error", this);
          this.$router.push({ path: "/login" });
        }
      },
      goUrl(url) {
        if (url == "windows" || url == "mac") {
          this.tankuang = true;
          return false;
        }
        this.dialogFormVisible = true;
      },

      // requestPublic: function() {
      // 	var _this = this;
      // 	_this.$http.get(_this.$http.notice_list, {
      // 			params: {}
      // 		})
      // 		.then((res) => {
      // 			_this.noticeList = res.data.data.list;
      // 		});
      // },
      getAlertData() {
        var _this = this;
        _this.$http
          .get(_this.$http.public_alert, {
            params: {}
          })
          .then(res => {
            let lang = _this.$cookies.get("language");
            if (lang == "Chinese") {
              _this.alertData = res.data.data.tpgg;
            } else {
              _this.alertData = res.data.data.tpgg_en;
            }
          });
      },
      go() {
        var _this = this;
        if (_this.mobile.indexOf("@") == -1) {
          if (!_this.$public.checkMobile(_this.mobile)) {
            _this.$public.msg("请填写正确的手机号或邮箱", "warning", _this);
            return false;
          }
        } else {
          if (!_this.$public.email(_this.mobile)) {
            _this.$public.msg("请填写正确的手机号或邮箱", "warning", _this);
            return false;
          }
        }
        _this.$router.push({
          path: "/Register",
          query: { account: _this.mobile }
        });
      },

      imgload() {
        var _this = this;
        _this.$nextTick(() => {
          var box = document.getElementsByClassName("el-carousel__container");
          _this.height = _this.$refs.bannerImg[0].height + "px";
        });
      }
    },
    created: function () {
      var _this = this;
      if(_this.$cookies.get('language') == 'Chinese'){
        _this.language = 'zh-CN';
        _this.pc_img = require('../../assets/Gicimg/home/home_pc1.png');
      } else if(_this.$cookies.get('language') == 'English'){
        _this.language = 'en';
        _this.pc_img = require('../../assets/Gicimg/home/home_pc2.png');
      }else{
        _this.language = 'ft';
        _this.pc_img = require('../../assets/Gicimg/home/home_pc3.png');
      }
      _this.getBanner();
      _this.getSystemPosts();

      // _this.$cookies.get('language')=='Chinese'?'zh-CN':'en'

      // console.log(_this.$cookies.get('language'));




      // _this.requestPublic();
      // if(!sessionStorage.alert) {
      // 	//第一次进来
      // 	_this.getAlertData();
      // 	sessionStorage.alert = true;
      // } else {
      // 	_this.tankuang = false;
      // }
      // if(_this.$cookies.get('language')=='English'){
      // 	_this.isshow=false;
      // }else{
      // 	_this.isshow=true;
      // }
    },
    // 路由改变时
    beforeRouteLeave(to, from, next) {
      // var _this = this;
      // $('.kf_qycn_com_cckf_icon,.kf_qycn_com_cckf_dock,.kf_qycn_com_cckf_inpage_chat_window_min').hide();
      next();
    },
    mounted: function () {
      // $('.kf_qycn_com_cckf_icon,.kf_qycn_com_cckf_dock,.kf_qycn_com_cckf_inpage_chat_window_min').show();
      // var c = document.createElement("script"),
      // 	s = document.getElementsByTagName("script")[0];
      // c.src = "//kefu.ziyun.com.cn/vclient/?webid=140650";
      // s.parentNode.insertBefore(c, s);
      var _this = this;
      $(".home_hader_background1").css("background", "#0A125EFF");
      _this.account = JSON.parse(sessionStorage.getItem("account"));
      new WOW().init();
    },
    components: {
      // "Sowingmap": Sowingmap,
      IndexCommodity: IndexCommodity
    }
  };
</script>