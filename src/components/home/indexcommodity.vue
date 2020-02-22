<style lang=less>
</style>
<template lang="html">
	<section class="two_hang">
		<div class="btclist">
			<ul class="mainList">
				<li v-for="(item,index) in listt" :key="index" v-if="index < 6"
					:data_code='item.code' class="btclist_box wow animate fadeInDown " :data-wow-delay="(index)*(0.25)+'s'">
          <div class="trend trend-red" v-if="item.range < 0">
					  <div class="name">{{ item.code }}</div>
					  <!-- <div class="name">{{$public.changeInterceptingAdd(item.name)}}</div> -->
						<!-- <div class="money one" :class="'price_'+item.code">
                {{Number(item.price).toFixed($public.SavePoint(item.code))}}
              <span v-if="language == 'zh-CN'">≈{{$public.toDecimal2(item.cnyPrice)}} CNY</span>
              <span>
                ≈ {{$public.Division(Number(item.cnyPrice),Number(7)).toFixed($public.SavePoint(item.code))}} USD
              </span>
            </div> -->
            <div class="col col_one" :class="'changeRate_'+item.code">{{ "-" + item.range + "%" }}</div>
            <!-- 价格 -->
            <div class="price price-red">
              {{ item.close }}
            </div>
            <!-- 成交量 -->
            <!-- <div class="chengjiao">
                {{$t('Gic.home[1]')}}：{{item.volume}}
            </div> -->
						<!-- <div class="trend trend-red"></div> -->
					</div>
					<div class="trend trend-lv" v-else>
            <div class="name">{{ item.code }}</div>
            <!-- <div class="name">{{$public.changeInterceptingAdd(item.name)}}</div> -->
						<!-- <div class="money two" :class="'price_'+item.code">
                {{Number(item.price).toFixed($public.SavePoint(item.code))}}
                <span v-if="language == 'zh-CN'">≈{{$public.toDecimal2(item.cnyPrice)}} CNY</span>
                <span>
                    ≈ {{$public.Division(Number(item.cnyPrice),Number(7)).toFixed($public.SavePoint(item.code))}} USD
                </span>
            </div> -->
            <div class="col col_two" :class="'changeRate_'+item.code">{{ "+" + item.range + "%" }}</div>
            <!-- 价格 -->
            <div class="price price-lv">
              {{ item.close }}
            </div>
            <!-- 成交量 -->
            <!-- <div class="chengjiao">
                {{$t('Gic.home[1]')}}：{{$public.toDecimal2(item.volume)}}
            </div> -->
						<!-- <div class="trend trend-lv"></div> -->
					</div>
				</li>
			</ul>
		</div>
		<!-- <div class='top_din'>
			<p :class='{p_hov:zID==0}' @click='zIDClick(0)'>
				{{$t("apiEnCn.list3[2]")}}
			</p>
			<p :class='{p_hov:zID==1}' @click='zIDClick(1)'>
				{{$t("apiEnCn.list3[7]")}}
			</p>
			<p :class='{p_hov:zID==2}' @click='zIDClick(2)'>
				{{$t("apiEnCn.list3[8]")}}
			</p>
		</div> -->
		<!-- <div class="hangqingWarp" v-if="list.length != 0 "> -->

    <!-- 新手教程 -->
    <div class="novice_tutorial">
      <div class="left">
        <p class="title">新手教程</p>
        <p class="tip">欢迎进入Billum，请登录/注册体验交易</p>
      </div>
      <ul class="right">
        <li>
          <img class="duihao" src="../../assets/img/home/weijinxing-img.png">
          登录/注册
          <img class="jiantou" src="../../assets/img/home/jiantou-img.png">
        </li>
        <li>
          <img class="duihao" src="../../assets/img/home/weijinxing-img.png">
          设置交易密码
          <img class="jiantou" src="../../assets/img/home/jiantou-img.png">
        </li>
        <li>
          <img class="duihao" src="../../assets/img/home/weijinxing-img.png">
          实名认证
          <img class="jiantou" src="../../assets/img/home/jiantou-img.png">
        </li>
        <li>
          <img class="duihao" src="../../assets/img/home/weijinxing-img.png">
          充值
          <img class="jiantou" src="../../assets/img/home/jiantou-img.png">
        </li>
        <li>
          <img class="duihao" src="../../assets/img/home/weijinxing-img.png">
          开始交易
        </li>
      </ul>
    </div>

    <!-- 行情列表 -->
    <div class="hangqing_top">
      <p class="name">
        随时随地 流畅交易
      </p>
      <p class="tip">
        在这里开启数字化进程
      </p>
    </div>
		<div class="hangqingWarp" v-if="list.length != 0 ">
			<ul class="hangq_top wow animate fadeInDown" >
				<li>币种</li>
				<li>最新价</li>
				<li>24h涨幅</li>
				<li>24h最高</li>
				<li>24h最低</li>
				<li>24h成交量</li>
				<li>操作</li>
			</ul>
			<ul class="hangqwingul wow animate bounceInUp" data-wow-delay="1s" v-if='listt'>
				<!-- // <router-link v-for="(item,index) in list" :to="{path:'/exchange',query:{account:item.code}}" :key="index"> -->
				<a href="javascript:;" v-for="(item,index) in listt"
					:data_code='item.code' @click="gourl(item.code,index)" class="indexcommodity_box renderBg" :key="index">
					<li >
            <!-- 1 -->
						<div class="hang_1">
							<img :src="item.icon"/>
							<!-- <p>{{$public.changeInterceptingAdd(item.name)}}</p> -->
							<p>{{ item.code }}</p>
						</div>
						<!--2-->
						<div class="hang_2">
							<p class="priceone" :class="'price_'+item.code">
                <!-- {{$public.toLowFixed(item.price,$public.SavePoint(item.code),true)}} -->
                {{Number(item.close).toFixed($public.SavePoint(item.code))}}
                <!-- {{$public.SavePoint(item.price,item.code)}} -->
              </p>
            </div>
            <!-- 3 涨跌幅 -->
						<aside>
							<p class="title">
								<!-- {{$public.InterceptingAdd(item.name)}} / USDT -->
								<span v-if="item.range > 0" class="changeRate">
									<span class="fall" style="color: #00bc80 !important;" :class="'changeRate_'+item.code">{{"+" + item.range + "%"}}</span>
									<!-- <i class="el-icon-caret-top fall"></i> -->
								</span>
								<span v-else class="changeRate">
									<span class="rise" style="color: #fe5955 !important;" :class="'changeRate_'+item.code">{{"-" + item.range + "%"}}</span>
									<!-- <i class="el-icon-caret-bottom rise"></i> -->
								</span>
							</p>
						</aside>
						<!--4-->
						<div class="hang_4">
							<p class="high" :class="'high_'+item.code">
                <!-- {{$public.toLowFixed(item.high,$public.SavePoint(item.code),0)}} -->
                {{$public.toDecimal2(item.high)}}
              </p>
						</div>
						<!--5-->
						<div class="hang_5">
							<p class="low" :class="'low_'+item.code">
                <!-- {{$public.toLowFixed(item.low,$public.SavePoint(item.code),0)}} -->
                {{$public.toDecimal2(item.low)}}
              </p>
							<!--<span class="priceNum">-->
							<!--<span class="priceone">{{item.price}}</span>-->
							<!--</span>-->
							<!--<span class="yuedeng">  ≈{{item.cnyPrice}}  CNY</span>-->
						</div>
						<!--6 成交量-->
						<aside class="hang_6">
							<p class="allNum">
								<!-- <span class="numWarp" :class="'volume_'+item.code">{{$public.toLowFixed(item.volume,6)}}</span> -->
                <span class="numWarp" :class="'volume_'+item.code">
                  <!-- {{$public.toLowFixed(item.volume,$public.SavePoint(item.code),0)}} -->
                  {{$public.toDecimal2(item.amount) +" USDT"}}
                </span>
							</p>
						</aside>
						<div class="hang_7">
							<img class="jy_1" src="../../assets/image/jiaoyi-icon.png" alt="">
						</div>
					</li>
				</a>
				
			</ul>
		</div>
		<div class="hangqingWarp" v-else>
			<div class="nolistWarp">
				<img src="../../assets/image/timg.gif" alt="" style="width: 90px;" />
			</div> 
		</div>

	</section>
</template>
<script>
import { WOW } from "wowjs";
// import Btclist from "./btclist.vue"

export default {
  data() {
    return {
      listMain: [],
      list: [],
      second: [],
      MainData: "",
      SecondData: "",
      codedata: [],
      pricedata: [],
      changeRate: [],
      highdata: [],
      lowdata: [],
      volumedata: [],
      changedata: [],
      yuedengdata: [],
      allCode: [],
      onedata: [],
      twodata: [],
      zID: 0,
      Clic: true,
      ZX: [],
      timer: null,
      language:'',
    };
  },
  // watch: {
  //   list: function() {
  //     this.$nextTick(() => {
  //       // 在dom渲染完后,再执行动画
  //       var wow = new WOW({
  //         live: false
  //       });
  //       wow.init();
  //     });
  //   }
  // },
  computed: {
    listt() {
      if (this.zID == 1) {
        var max;
        let arr = this.list;
        for (var i = 0; i < arr.length; i++) {
          for (var j = i; j < arr.length; j++) {
            if (parseFloat(arr[i].changeRate) < parseFloat(arr[j].changeRate)) {
              max = arr[j];
              arr[j] = arr[i];
              arr[i] = max;
            }
          }
        }
        this.list = arr;
      } else if (this.zID == 2) {
        return this.ZX;
      }
      return this.list;
    }
  },
  methods: {
    //列表切换
    zIDClick(id) {
      if(id == 2&&!sessionStorage.token){
        this.$public.go("login", 10, this);
        return
      }
      this.zID = id;
    },

    gourl(code, index) {
      var _this = this;
      this.$router.push({ name: "coincoin", query: { code } });
    },
    // 获取主区数据
    GetDatamain() {
      var _this = this;
      $.get(_this.$http.getNewInfo, {}, function(result) {
        if (result.code == "200") {
          var _codeArr = [];
          for (var i = 0; i < result.data.length; i++) {
            _codeArr.push(result.data[i].code);
          }
          _this.list = result.data;
          
          _this.allCode = _codeArr.join("|");
          _this.MainDatapush();
            // _this.$http.get(_this.$http.getMast, {}).then(r => {
            //   if (r.data.code == 200) {
            //     _this.listMain = r.data.data;
            //     for (var x = 0; x < r.data.data.length; x++) {
            //       _codeArr.push(r.data.data[x].code);
            //     }
            //   window.setTimeout(function() {
            //     _this.allCode = _codeArr.join("|");
            //     _this.MainDatapush();
            //   }, 800);
            //     }
            //   })
          // if (sessionStorage.token) {
          //   new Promise((resolve, reject) => {
          //     _this.$http.post(_this.$http.optionalList, {}).then(res => {
          //       if (res.data.data.length == 0) {
          //         _this.list = result.data;
          //         _this.ZX = [];
          //         resolve();
          //         return;
          //       }
          //       _this.ZX = res.data.data;
          //       let dat = res.data.data;
          //       let daa = result.data;
          //       for (var i = 0; i < dat.length; i++) {
          //         for (var t = 0; t < daa.length; t++) {
          //           if (dat[i].code == daa[t].code) {
          //             daa[t].Cli = true;
          //           }
          //         }
          //       }
          //       _this.list = daa;
          //       resolve();
          //     });
          //   }).then(() => {
          //     _this.$http.get(_this.$http.getMast, {}).then(r => {
          //     if (r.data.code == 200) {
          //       _this.listMain = r.data.data;
          //       for (var x = 0; x < r.data.data.length; x++) {
          //         _codeArr.push(r.data.data[x].code);
          //       }
          //     window.setTimeout(function() {
          //       _this.allCode = _codeArr.join("|");
          //       _this.MainDatapush();
          //     }, 800);
          //       }
          //     })
          //   });
          // } else {

          // }
        }
      });
    },
    // 主区数据推送
    MainDatapush() {
      var _this = this;

      // 首先判断是否 支持 WebSocket
      if ("WebSocket" in window) {
        _this.MainData = new WebSocket(_this.$http.MainwsUrl);
      } else if ("MozWebSocket" in window) {
        _this.MainData = new MozWebSocket(_this.$http.MainwsUrl);
      } else {
        _this.MainData = new SockJS(_this.$http.MainskUrl);
      }
      // 打开时
      _this.MainData.onopen = function(evnt) {
        var msg = {
          sub: "ticker@" + _this.allCode
        };
        // 发送消息
        _this.MainData.send(JSON.stringify(msg));
        _this.timer = setInterval(function() {
          // _this.MainData.send('xtb');
          var mm = { pong: new Date().getTime() };
          _this.MainData.send(JSON.stringify(mm));
        },20000)
      };
      // 处理消息时
      _this.MainData.onmessage = function(evnt) {
        if (_this.$route.path != "/home") {
          clearInterval(_this.timer)
          _this.MainData.close();
        }
        if (evnt.data.split("{").length != "2") {
          return false;
        }
        var datanum = JSON.parse(evnt.data);
        let arr = _this.list;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].code == datanum.code) {
            arr[i] = { ...arr[i], ...datanum };
            arr[i].price = Number(arr[i].price).toFixed(_this.$public.SavePoint(arr[i].code))
            arr[i].high = Number(arr[i].high).toFixed(_this.$public.SavePoint(arr[i].code))
            arr[i].low = Number(arr[i].low).toFixed(_this.$public.SavePoint(arr[i].code))
            arr[i].volume = Number(arr[i].volume).toFixed(_this.$public.SavePoint(arr[i].code))
            _this.$set(_this.list,i,arr[i])
            // return;
          }
        }
        let arrz = _this.ZX;
        for (var i = 0; i < arrz.length; i++) {
          if (arrz[i].code == datanum.code) {
            arrz[i] = { ...arrz[i], ...datanum };
            arrz[i].price = Number(arrz[i].price).toFixed(_this.$public.SavePoint(arrz[i].code))
            arrz[i].high = Number(arrz[i].high).toFixed(_this.$public.SavePoint(arrz[i].code))
            arrz[i].low = Number(arrz[i].low).toFixed(_this.$public.SavePoint(arrz[i].code))
            arrz[i].volume = Number(arrz[i].volume).toFixed(_this.$public.SavePoint(arrz[i].code))
            _this.$set(_this.ZX,i,arrz[i])
            // return;
          }
        }
        let listMain = _this.listMain
        for(var i = 0; i < listMain.length; i++) {
          if (listMain[i].code == datanum.code) {
            listMain[i] = { ...listMain[i], ...datanum };
            _this.$set(_this.listMain,i,listMain[i])
            return;
          }
        }
        // try{
        // 	$('.price_'+datanum.code).text(_this.$public.toLowFixed(datanum.price,6))
        // 	$('.changeRate_'+datanum.code).text(datanum.changeRate)
        // 	$('.high_'+datanum.code).text(_this.$public.toLowFixed(datanum.high,6))
        // 	$('.low_'+datanum.code).text(_this.$public.toLowFixed(datanum.low,6))
        // 	$('.volume_'+datanum.code).text(_this.$public.toLowFixed(datanum.volume,6))
      // }catch(r){

        // }
      };

      _this.MainData.onerror = function(evnt) {};
      _this.MainData.onclose = function(evnt) {};
    },
    // 创新区数据推送
    // 点击跳转
    RoutingJump(typenum) {
      var _this = this;
      _this.$router.push({
        path: "/exchange",
        query: {
          code: typenum
        }
      });
    }
  },

  created: function() {
    var _this = this;
    if(_this.$cookies.get('language') == 'zh'){
      	_this.language = 'zh';
      }else{
        _this.language = 'en';
      }
    _this.GetDatamain();
  },
  mounted() {
    new WOW().init();
  },
  components: {
    // "Btclist": Btclist
  }
};
</script>