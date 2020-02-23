<style lang=less>
@import "./exchange.less";
.exchange {
  .HistoricalEntrustment .gg_order_wrapper .order_container {
    min-width: 1000px;
  }
  .HistoricalEntrustment #tab-third {
    display: none;
  }
  .HistoricalEntrustment .headertongji {
    display: none;
  }
  .bb_order_wrapper {
    .order_container {
      width: 100%;
      padding-top: 0px;
      margin: 0;
      max-width: 100%;
      height: 100%;
    }
    .right {
      display: none;
    }
  }
  .currency_header {
    overflow: hidden;
  }
}
</style>
<template>
  <div class="exchange">
    <div class="exchange_cen">
    <!-- 左边行情 -->
    <div class="exchange_nav left">
        <div class="topWarp">
          <!-- 行情列表 -->
          <section class="nav_list">
            <p class="nav_list_title">
              <span>{{ $LangFn("资产行情") }}</span>
            </p>
            <h2 class="currency_header">
              <!-- // 行情 -->
              <span class="header_1">币种</span>
              <span class="header_2">最新价</span>
              <span class="header_3">涨幅</span>
            </h2>
            <Quotation :Marketmain="Marketdatamain" :SS="active" @modifyfun="modifyshuju"></Quotation>
            <!-- <Quotation :Marketmain='Marketdatamain1' @modifyfun="modifyshuju" v-show="active==2"></Quotation>
            <Quotation :Marketmain='Marketdatamain2' @modifyfun="modifyshuju" v-show="active==3"></Quotation>-->
            <!-- <section class="Innovate_box"></section> -->
          </section>
        </div>
      </div>
  
      <div class="klinAndTring right">
        <!-- 中间主内容 -->
        <div class="exchange_mian">
          <div class="exchange_mian_box">
            <!-- 切换k线 -->
            <Quotationheader :Marketheader="Marketdataheader"></Quotationheader>
            <el-radio-group class="radiogroups" v-model="klinetab">
							<el-radio-button class="klinesbtn" label="K线图"></el-radio-button>
							<el-radio-button class="shendubtn" label="深度图"></el-radio-button>
						</el-radio-group>
            <section v-if="klinetab== 'K线图'" class="kine" id="kk">
              <iframe
                style="height:570px"
                :src="'./static/index.html?timers=15&code=' + marketPurchase.code + '&symbol=' + Marketdataheader.pid + '&last_price='+marketPurchase.PriceData"
                width="100%"
                height="460px;"
                id="fram"
              ></iframe>
            </section>
            <section class="kine" v-else>
							<iframe id="fram" :src="'./static/indexsd.html?timers=15&code=' + marketPurchase.code + '&last_price='+urlPrice" width="100%"
								height="100%"></iframe>
						</section>
  
            <!-- 下单box -->
            <div style="overflow: hidden;padding-top: 10px;">
              <section class="transaction">
                <div class="transaction_box">
                  <!-- <span class="canuser">
                    动态权益: {{tongjiData.totalusdt}} &nbsp;&nbsp;&nbsp;&nbsp;
                    可用资金: {{tongjiData.keyong_price}}
                  </span>-->
                  <el-tabs v-model="activeName">

                    <el-tab-pane :label="$LangFn('市价交易')" name="second">
                      <!-- <Purchase @changeData="listenToMyBoy" :ModifyState='true' v-if='marketPurchase && Marketdataheader.cnyPrice' :Data='marketPurchase' :nowCny='Marketdataheader.cnyPrice'></Purchase>
                      <Sellout @changeData="listenToMyBoy" :ModifyState='true' v-if='marketPurchase && Marketdataheader.cnyPrice' :Data='marketPurchase'  :nowCny='Marketdataheader.cnyPrice' style="float: right;"></Sellout>-->
                      <Purchase
                        @changeData="listenToMyBoy"
                        :ModifyState="true"
                        :Data="marketPurchase"
                        :nowCny="Marketdataheader.cnyPrice"
                      ></Purchase>
                      <Sellout
                        @changeData="listenToMyBoy"
                        :ModifyState="true"
                        :Data="marketPurchase"
                        :nowCny="Marketdataheader.cnyPrice"
                        style="float: right;"
                      ></Sellout>
                    </el-tab-pane>

                    <el-tab-pane :label="$LangFn('限价交易')" name="first">
                        <!-- <Purchase @changeData="listenToMyBoy"  :ModifyState='false' v-if='marketPurchase && Marketdataheader.price  && Marketdataheader.cnyPrice ' :Data='marketPurchase' :nowPrice='Marketdataheader.price' :nowCny='Marketdataheader.cnyPrice' ></Purchase>
                        <Sellout @changeData="listenToMyBoy" :ModifyState='false' v-if='marketPurchase  && Marketdataheader.price  && Marketdataheader.cnyPrice ' :Data='marketPurchase'   :nowPrice='Marketdataheader.price' :nowCny='Marketdataheader.cnyPrice' style="float: right;"></Sellout>-->
                        <Purchase
                          @changeData="listenToMyBoy"
                          :ModifyState="false"
                          :Data="marketPurchase"
                          :nowPrice="Marketdataheader.price"
                          :nowCny="Marketdataheader.cnyPrice"
                          :price="price"
                        ></Purchase>
                        <Sellout
                          @changeData="listenToMyBoy"
                          :ModifyState="false"
                          :Data="marketPurchase"
                          :nowPrice="Marketdataheader.price"
                          :nowCny="Marketdataheader.cnyPrice"
                          :price="price"
                          style="float: right;"
                        ></Sellout>
                      </el-tab-pane>
                  </el-tabs>
                </div>
              </section>
            </div>
          </div>

          <div class="change_tab">
            <div class="top_nav">
              <span :class="{active: isPankou}" @click="isPankou = true">盘口</span>
              <span :class="{active: !isPankou}" @click="isPankou = false">实时成交</span>
            </div>
          
          <!-- 盘口 -->
          <div class="exchange_mouth" v-show="isPankou">
            <section class="transaction_main">
              <!-- <div class="tabs_tab">
                  盘口
              </div> -->
              <div class="tabs_fen">
                  <div class="tabs">
                      <div @click="mouthType='all'" :class="['item', {active:mouthType=='all'}]">
                        <img src="../../assets/image/bibi/all.png">
                      </div>
                      <div @click="mouthType='red'" :class="['item',{active:mouthType=='red'}]">
                        <img src="../../assets/image/bibi/red.png">
                      </div>
                      <div @click="mouthType='green'" :class="['item',{active: mouthType=='green'}]">
                        <img src="../../assets/image/bibi/green.png">
                      </div>
                    </div>
                <!-- 深度 -->
                
                <!-- <div class="transaction_deep" v-show="mouthType=='all'">
                  <span>深度</span>
                  
                  <el-select
                    size="small"
                    @change="changeConcat"
                    v-model="DeepConcat"
                    :placeholder="$t('bibi.other[16]')"
                  >
                    <el-option label="5" value="5"></el-option>
                    <el-option label="10" value="10"></el-option>
                    <el-option label="20" value="20"></el-option>
                  </el-select>
                </div> -->
              </div>

  
              <div class="transaction_mainConnent" v-if="PurchaseData">
                <h3 class="transaction_nav">
                  <p class="PurchaseData_name">{{ $LangFn("价格") }}</p>
                  <p class="PurchaseData_name">{{ $LangFn("数量") + "(" + Marketdataheader.pname + ")" }}</p>
                  <p class="PurchaseData_name">{{ $LangFn("累计") + "(" + Marketdataheader.pname + ")" }}</p>
                </h3>
                <div
                  class="Purchase_wrap"
                  :class="{red: mouthType=='red'}"
                  v-show="mouthType=='red' || mouthType=='all'"
                  id="ele"
                >
                  <ul class="PurchaseData" :style="'max-height:'+deepHeight">
                    <li
                      class="PurchaseData_list"
                      v-for="(item, index) in PurchaseData.sell"
                      :key="index"
                      @click="updatePrice(item.price)"
                    >
                      <p class="PurchaseData_name" style="color: #ff5855; cursor: pointer;">
                          {{Number(item.price).toFixed($public.SavePoint(Marketdataheader.code))}}
                      </p>
                      <p class="PurchaseData_name">
                          {{Number(item.totalSize).toFixed($public.SavePoint('btc_usdt'))}}
                      </p>
                      <p class="PurchaseData_name">
                        {{Number(item.price * item.totalSize).toFixed($public.SavePoint('eos_usdt'))}}
                      </p>
                      <div
                        :style="{width:$public.toPercent( $public.Division(item.totalSize, mouthRenderBg.sellMax ) ) }"
                        class="lineBg red"
                      ></div>
                    </li>
                    <!-- 调试 -->
                    <!-- <li class="PurchaseData_list" v-for="i in 30" :key="index">
                        <p class="PurchaseData_name" style="color: #ff5855;">{{i}}</p>
                        <p class="PurchaseData_name">{{i}}</p>
                        <p class="PurchaseData_name" >{{i}}</p>
                        <div style="width: 100%" class="lineBg red"></div>
                    </li>-->
                  </ul>
                </div>
  
                <!-- 最新价 -->
                
                <div class="transaction_mainHeader" v-show="mouthType=='all'">
                  <span
                    class="newPrice"
                    :class="{newPrice:true, down:!isDown, up:isDown}"
                  >{{Number(Marketdataheader.price).toFixed($public.SavePoint(Marketdataheader.code))}}</span>
                  <span :class="{river:true, down:!isDown, up:isDown}">{{ !isDown ?"↓":"↑" }}</span>

                  <!-- <span class="changeCny" v-if="language == 'zh-CN'">≈ {{$public.toDecimal2(Marketdataheader.cnyPrice)}} CNY</span> -->
                  <span class="changeCny">
                      ≈ {{$public.Division(Number(Marketdataheader.cnyPrice),Number(7)).toFixed($public.SavePoint(Marketdataheader.code))}} USD
                  </span>
                  <!-- <span class="changeCny">≈ {{$public.toDecimal2(Marketdataheader.cnyPrice)}} CNY</span> -->
                </div>
                <div
                  class="Purchase_wrap"
                  :class="{green: mouthType=='green'}"
                  v-show="mouthType=='green' || mouthType=='all'"
                >
                  <ul class="SelloutData" :style="'max-height:'+deepHeight">
                    <li
                      class="PurchaseData_list"
                      v-for="(item, index) in PurchaseData.buy"
                      :key="index"
                      @click="updatePrice(item.price)"
                    >
                      <p class="PurchaseData_name" style="color: #00bd82; cursor: pointer;">
                          <!-- {{transDeepMerger(item.price)}} -->
                          {{Number(item.price).toFixed($public.SavePoint(Marketdataheader.code))}}
                      </p>
                      <p class="PurchaseData_name">
                          {{Number(item.totalSize).toFixed($public.SavePoint('btc_usdt'))}}
                      </p>
                      <p class="PurchaseData_name">
                          {{Number(item.price * item.totalSize).toFixed($public.SavePoint('eos_usdt'))}}
                      </p>
                      <div
                        :style="{width:$public.toPercent( $public.Division(item.totalSize, mouthRenderBg.buyMax ) ) }"
                        class="lineBg green"
                      ></div>
                    </li>
                    <!-- 调试 -->
                    <!-- <li class="PurchaseData_list" v-for="i in 30"  :key="index">
                        <p class="PurchaseData_name" style="color: #00bd82;">{{i}}</p>
                        <p class="PurchaseData_name">{{i}}</p>
                        <p class="PurchaseData_name " >{{i}}</p>
                        <div style="width:100%" class="lineBg green"></div>
                    </li>-->
                  </ul>
                </div>

              </div>
              <div class="transaction_mainConnent loading" v-else>
                <img src="../../assets/image/timg.gif" width="80">
                <p style="color:#999;font-size: 12px; text-align: center;">{{ $LangFn("加载中") }}</p>
              </div>
            </section>
          </div>
          <!-- 实时成交 -->
          <div class="vloumeData" v-show="!isPankou">
              <!-- <div class="head">
                <h2>实时成交</h2>
              </div> -->
              <div class="title">
                <span>{{ $LangFn("价格") + "(USDT)" }}</span>
                <span class="num">{{ $LangFn("数量") }}</span>
                <span class="dt">{{ $LangFn("时间") }}</span>
              </div>
              <ul v-if="RealDataLoad">
                <li class="vloumeData_li" v-for="(item,index) in realData" :key="index">
                  <span :class="{price:true, true: item.dc =='sell', false: item.dc != 'sell'}">
                    {{Number(item.price).toFixed($public.SavePoint(Marketdataheader.code))}}
                  </span>

                  <span>
                      {{Number(item.amount).toFixed($public.SavePoint('btc_usdt'))}}
                  </span>
                  <span>{{$public.timestampToTimeshian1(item.dt)}}</span>

                </li>
                <p
                  v-show="realData.length == 0"
                  style="color:#8E94A3;text-align: center;padding-top: 50px;"
                >{{ $LangFn("暂无数据") }}</p>
              </ul>
              <div v-else class="loading" style="text-align:center">
                <img src="../../assets/image/timg.gif" width="80px">
                <p style="color:#999;font-size: 12px; text-align: center;">{{$t("Gic.coincoin[11]")}}</p>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
    <!-- 委托记录 -->
    <section class="HistoricalEntrustment">
        <bbOrder @changeData="listenToMyBoy" ref="offTime"></bbOrder>
      </section>
  </div>
</template>
<script>
import Purchase from "./transaction/purchase.vue";
import Sellout from "./transaction/sellout.vue";
import Quotation from "./Quotation.vue";
import Quotationheader from "./Quotationheader.vue";
//	import Currententrustmen from "./Currententrustmen.vue"; //委托
import bbOrder from "../order/bbOrder.vue"; //委托
import tradingNotice from "./tradingNotice.vue"; //公告

export default {
  data() {
    return {
      isPankou: true,
      klinetab:"K线图",
      // 深度合并
      DeepMerger: "",
      // 深度挡位
      DeepConcat: "",
      deepHeight: "",
      bbAccount: "",
      isLogin: false,
      RealDataLoad: false,
      moneyHide: false,
      activeName: "second", //默认市价还是限价更改
      setInter: null,
      mouthType: "all",
      //给组建传的值
      marketPurchase: {
        buy_state:'',
        sell_state:'',
        syb: 0, //币的数量
        PriceData: 0, //最新价
        wallone: 0, //用户资产余额
        spread: 0, //点差
        var_price: 0, //最小浮动价
        trans_fee: 0, //手续费
        stopwin: 0, //止盈
        stoploss: 0, //止损
        num_min: 0, //最小购买量
        leverage: 0, //杠杆
        buyorsell: "",
        cnyPrice: "", //币种人民币价格
        minbuynum: "", //最小交易额
        code: "3c_usdt" //控制code 重要字段不可随意更改
      }, //市价买入
      Marketdatamainbox: [], //行情主数据盒子
      Marketdatamain: [], //行情主数据
      Marketdatamain1: {}, //行情主数据
      Marketdatamain2: {}, //行情主数据
      PurchaseData: {
        sell: [],
        buy: []
      }, //买卖价数据
      Marketdataheader: {}, //K线图顶部的数据
      tableData: [],
      MainData: null, //主数据推送
      SalePriceData: null, //买卖价推送
      tongjiData: {
        keyong_price: "--", //可用资金
        totalusdt: "--", //动态权益
        totaldeposit: "--", //冻结保证金
        yingkui: "--", //浮动盈亏
        risk: "--" //风险率
      },
      // 盘口渲染列表背景色用
      mouthRenderBg: {
        buyMax: "",
        sellMax: ""
      },
      allCode: [],
      active: 1,
      timer: null,
      realData: [],
      language: "",
      timer: null,
      timer1: null,
      timer2: null,
      price: "" // 盘口价格
    };
  },
  watch: {},
  mounted() {
    if (sessionStorage.token) {
      this.isLogin = true;
    }
  },
  methods: {
    changeConcat() {
      var obj = {
        "5": "175px",
        "10": "365px",
        "20": "743px"
      };
      this.deepHeight = obj[this.DeepConcat];
    },
    //要刷新的数据放在这个函数里面
    listenToMyBoy() {
      var _this = this;
      this.getdatamain();
      this.amount(); //个人资产数据
      this.$refs.offTime.offTime();
    },
    modifyshuju: function (envent) {
      //nav点击时修改
      var _this = this;
      _this.DeepMerger = "";
      clearInterval(this.timer2);
      clearInterval(this.timer1);
      this.timer2 == null;
      this.timer1 == null;
      _this.marketPurchase.code = envent;
      // alert(_this.marketPurchase.code)
      for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
        if (_this.Marketdatamainbox[i].code == envent) {
          _this.Marketdataheader = _this.Marketdatamainbox[i];
          _this.marketPurchase.PriceData = Number(_this.Marketdatamainbox[i].price).toFixed(_this.$public.SavePoint(_this.marketPurchase.code));
          _this.marketPurchase.cnyPrice = _this.$public.Division(
            _this.Marketdatamainbox[i].cnyPrice,
            _this.Marketdatamainbox[i].price
          );
        }
        
      }
      _this.amount(envent);
      //				_this.Obtain(envent);
      _this.SalePriceDatapush(envent);
      _this.realData = [];
      if (_this.timer) {
        clearInterval(_this.timer);
      }
      _this.refresdata();
      // _this.PurchaseData = null;
    },
    Obtain(codetype) {
      //获取止盈和止损手续费等
      var _this = this; //get_lever
      _this.$http
        .post(_this.$http.get_lever, {
          code: codetype
        })
        .then(function (response) {
          if (response.data.code == "200") {
            _this.marketPurchase.leverage = Number(response.data.data.leverage);
            _this.marketPurchase.spread = Number(response.data.data.spread); //点差
            _this.marketPurchase.stoploss = Number(response.data.data.stoploss); //止损
            _this.marketPurchase.stopwin = Number(response.data.data.stopwin); //止盈
            //						_this.marketPurchase.trans_fee = _this.$public.toPoint(response.data.data.trans_fee); //手续费
            _this.marketPurchase.var_price = Number(
              response.data.data.var_price
            ); //最小浮动价
            _this.marketPurchase.leverage = Number(response.data.data.leverage); //杠杆
            _this.marketPurchase.num_min = Number(response.data.data.num_min); //最小购买量
          }
        })
        .catch(function (error) { });
    },
    amount(codetype) {
      //获取用户余额
      var _this = this;
      // var _mobile = sessionStorage.token
      //   ? JSON.parse(sessionStorage.userData).phone
      //   : "null";
      var xinxidata = {
        code: _this.marketPurchase.code
      };
      if (!sessionStorage.token) {
        return false;
      }
      _this.$http
        .get(_this.$http.getCodeBalance, { params: xinxidata })
        .then(function (response) {
          if (response.data.code == "200") {
            _this.marketPurchase.wallone = Number(
              response.data.data.right_code
            ); //用户余额
            _this.marketPurchase.trans_fee = response.data.data.trans_fee; //手续费
            _this.marketPurchase.syb = response.data.data.left_code; //币种数量
            _this.marketPurchase.minbuynum = response.data.data.trans_min_yuan; //最小交易额

            _this.marketPurchase.buy_state = response.data.data.buy_state; //可以买否
            _this.marketPurchase.sell_state = response.data.data.sell_state; //可以卖否


          }
        })
        .catch(function (error) { });
    },

    getdatamain() {
      //获取数据
      var _this = this;
      $.get(_this.$http.getNewInfo, {}, function (result) {
        let arr = [];
        if (result.code == "200") {
          for (var i in result.data) {
            arr.push(result.data[i])
          }
          _this.Marketdatamain = arr;
          
          if (!_this.marketPurchase.code) {
            _this.marketPurchase.code = arr[0].code;
            _this.refresdata();
            _this.marketPurchase.cnyPrice = _this.$public.Division(
              arr[0].cnyPrice,
              arr[0].price
            );
          }
          
          var _codeArr = [];
          for (var i = 0; i < arr.length; i++) {
            _this.Marketdatamainbox.push(arr[i]);
            _codeArr.push(arr[i].code);
            if (_this.marketPurchase.code == arr[i].code) {
              _this.Marketdataheader = arr[i];
              _this.marketPurchase.PriceData = Number(arr[i].price);
              //								_this.Obtain(arr[i].code);
              if (sessionStorage.token) {
                _this.amount(arr[i].code);
              }
            }
          }
          _this.allCode = _codeArr.join("|");

          // _this.getdatamain1();
          _this.SalePriceDatapush(_this.marketPurchase.code); //买卖价 盘口
          window.setTimeout(function () {
            // _this.MainDatapush(); 解开
          }, 1500);
        }
      });
    },
    // 获取资产 币币账户
    getAssets() {
      this.$http.get(this.$http.getAssets, { params: { type: 2 } }).then(r => {
        if (r.data.code == 200) {
          this.bbAccount = r.data.data;
        } else {
          this.public.msg(r.data.msg, "error", this);
        }
      });
    },
    //切换
    /* changeAct(id) {
      if (id == 3) {
        if (!sessionStorage.token) {
          this.$public.go("login", 10, this);
          return;
        }
        window.setTimeout(function () {
          _this.MainDatapush();
        }, 1500);
        this.$http.post(this.$http.optionalList, {}).then(res => {
          switch (res.data.code) {
            case 200:
              if (res.data.data.length == 0) {
                this.$public.msg(
                  this.$t("hub3drecord.tableconent[6]"),
                  "warning",
                  this
                );
                return;
              }
              this.active = id;
              this.marketPurchase.code = res.data.data[0].code;
              this.Marketdatamain = res.data.data;
              this.$public.msg(res.data.msg, "success", this);
              this.changeActive(1);
              break;
            default:
              this.$public.msg(res.data.msg, "warning", this);
              break;
          }
        });
        return;
      } else {
        this.getdatamain();
        this.changeActive(id);
        window.setTimeout(function () {
          this.MainDatapush();
        }, 1500);
      }
      this.active = id;
    }, */
    // 改变行情交易对
    changeActive(index) {
      const _this = this;
      switch (index) {
        case 1:
          //   _this.active = index;
          _this.marketPurchase.code = _this.Marketdatamain[0].code;
          break;
        // case 2:
        //   _this.marketPurchase.code = _this.Marketdatamain1[0].code;
        //   break;
        // case 3:
        //   _this.marketPurchase.code = _this.Marketdatamain2[0].code;
        //   break;
        default:
          break;
      }
      var envent = _this.marketPurchase.code;
      for (var i = 0; i < _this.Marketdatamainbox.length; i++) {
        if (_this.Marketdatamainbox[i].code == envent) {
          _this.Marketdataheader = _this.Marketdatamainbox[i];
          _this.marketPurchase.PriceData = Number(
            _this.Marketdatamainbox[i].price
          );
          _this.marketPurchase.cnyPrice = _this.$public.Division(
            _this.Marketdatamainbox[i].cnyPrice,
            _this.Marketdatamainbox[i].price
          );
        }
      }
      _this.amount(envent);
      //				_this.Obtain(envent);
      _this.SalePriceDatapush(envent);
      _this.realData = [];
      if (_this.timer) {
        clearInterval(_this.timer);
      }
      // _this.RealData = null
      _this.refresdata();
      // _this.PurchaseData = null;
    },
    getdatamain1() {
      //获取数据
      var _this = this;
      $.get(_this.$http.getNewInfo, { qu: 2 }, function (result) {
        if (result.status == "200") {
          _this.Marketdatamain1 = result.data;
          // _this.Marketdatamainbox = result.data;
          for (var i = 0; i < result.data.length; i++) {
            _this.Marketdatamainbox.push(result.data[i]);
            if (_this.marketPurchase.code == result.data[i].code) {
              _this.Marketdataheader = result.data[i];
              _this.marketPurchase.PriceData = Number(result.data[i].price);
              _this.amount(result.data[i].code);
            }
          }
          _this.getdatamain2();
          // _this.SalePriceDatapush(_this.marketPurchase.code); //买卖价
          // window.setTimeout(function() {
          // 	_this.MainDatapush();
          // }, 1500);
        }
      });
    },
    getdatamain2() {
      //获取数据
      var _this = this;
      $.get(_this.$http.getNewInfo, { qu: 3 }, function (result) {
        if (result.status == "200") {
          _this.Marketdatamain2 = result.data;
          for (var i = 0; i < result.data.length; i++) {
            _this.Marketdatamainbox.push(result.data[i]);
            if (_this.marketPurchase.code == result.data[i].code) {
              _this.Marketdataheader = result.data[i];
              _this.marketPurchase.PriceData = Number(result.data[i].price);
              _this.amount(result.data[i].code);
            }
          }
          // _this.SalePriceDatapush(_this.marketPurchase.code); //买卖价
          // window.setTimeout(function() {
          // 	_this.MainDatapush();
          // }, 1500);
        }
      });
    },

    RealDataPush() {
      // 实时成交推送
      var _this = this;
      _this.RealDataLoad = false;
      if (_this.RealData) {
        _this.RealData.close();
      }
      if ("WebSocket" in window) {
        _this.RealData = new WebSocket(_this.$http.MainwsUrl);
      } else if ("MozWebSocket" in window) {
        _this.RealData = new WebSocket(_this.$http.MainwsUrl);
      } else {
        _this.RealData = new WebSocket(_this.$http.MainwsUrl);
      }
      // 打开时
      _this.RealData.onopen = function (evnt) {
        _this.RealDataLoad = true;
        var msg = {
          sub: "trader@" + _this.marketPurchase.code
        };
        _this.RealData.send(JSON.stringify(msg)); // 发送消息
        _this.timer1 = setInterval(function () {
          var mm = { pong: new Date().getTime() };
          _this.RealData.send(JSON.stringify(mm));
          // _this.RealData.send('xtb');
        }, 20000); 
      };
      _this.RealData.onmessage = function (evnt) {
        if (_this.$route.path != "/coincoin") {
          clearInterval(_this.timer1);
          _this.RealData.close();
        }
        try {
          var data = JSON.parse(evnt.data);
          if(data.code !==_this.marketPurchase.code){
            clearInterval(_this.timer1);
            return
          }
          var ul = document.querySelector(".vloumeData ul");
          var htmlArry = ``;
          for (var i = 0; i < data.data.length; i++) {
            var tansDate = _this.$public.getLocalTime(data.data[i].dt);
            htmlArry =
              htmlArry +
              `
							<li class="vloumeData_li">
                <span class="price ${data.data[i].dc == "sell"}">
                  ${Number(data.data[i].price).toFixed(_this.$public.SavePoint(data.code))}
                </span>
								<span>${Number(data.data[i].amount).toFixed(_this.$public.SavePoint('btc_usdt'))}</span>
								<span>${tansDate}</span>
								<!-- <span v-if="item.cj_type=='1'" style="color:#ff5855">买入</span>
								<span v-if="item.cj_type=='2'" style="color:#00bd82">卖出</span> -->
							</li>
							`;
          }
          ul.innerHTML = htmlArry;
        } catch (e) { }
      };
      _this.RealData.onerror = function (evnt) { };
      _this.RealData.onclose = function (evnt) { };
    },

    MainDatapush() {
      // 主区数据推送
      var _this = this;
      var dommain = document.getElementsByClassName("MainArea_list"),
        codedata = [],
        pricedata = [],
        changeRatedata = [];
      for (var i = 0; i < dommain.length; i++) {
        // 获取当前交易对
        codedata[i] = dommain[i].getAttribute("data_code");
        pricedata[i] = dommain[i].children[1];
        changeRatedata[i] = dommain[i].children[2];
      }
      // 首先判断是否 支持 WebSocket
      if ("WebSocket" in window) {
        _this.MainData = new WebSocket(_this.$http.MainwsUrl);
        // 实时成交

        // _this.RealData = new WebSocket(_this.$http.RealTime);
      } else if ("MozWebSocket" in window) {
        _this.MainData = new MozWebSocket(_this.$http.MainwsUrl);
        // _this.RealData = new WebSocket(_this.$http.RealTime);
      } else {
        _this.MainData = new SockJS(_this.$http.MainskUrl);
        // _this.RealData = new WebSocket(_this.$http.RealTime);
      }
      // 打开时
      _this.MainData.onopen = function (evnt) {
        var msg = {
          sub: "ticker@" + _this.allCode
        };
        _this.MainData.send(JSON.stringify(msg)); // 发送消息
        _this.timer = setInterval(function () {
          // _this.MainData.send('xtb');
          var mm = { pong: new Date().getTime() };
          _this.MainData.send(JSON.stringify(mm));
        }, 20000);
      };
      // _this.RealData.onopen = function(evnt) {
      // 	var msg = {
      // 		code: _this.marketPurchase.code
      // 	};
      // 	_this.RealData.send(JSON.stringify(msg)); // 发送消息
      // };
      // _this.RealData.onmessage = function(evnt) {
      // 	try {
      // 		var data = JSON.parse(evnt.data)
      // 		var ul = document.querySelector(".vloumeData ul")
      // 		var htmlArry = ``
      // 		for( var i=0; i<data.data.length; i++){
      // 			var tansDate = _this.$public.getLocalTime(data.data[i].dt)
      // 			htmlArry=htmlArry+ `
      // 			<li class="vloumeData_li">
      // 				<span class="price ${data.data[i].dc =='sell'}">${data.data[i].price}</span>
      // 				<span>${Number(data.data[i].amount).toFixed(4)}</span>
      // 				<span>${tansDate}</span>
      // 				<!-- <span v-if="item.cj_type=='1'" style="color:#ff5855">买入</span>
      // 				<span v-if="item.cj_type=='2'" style="color:#00bd82">卖出</span> -->
      // 			</li>
      // 			`
      // 		}
      // 		ul.innerHTML= htmlArry

      // 	} catch(e) {
      // 		console.log(e)
      // 	}
      // }
      var SavePoint = function (code) {
        //return 6
        switch (true) {
          case code == "BTC/USDT" || code == "ETH/USDT":
            return 2;
          case code == "OMG/USDT" ||
            code == "GNT/USDT" ||
            code == "PST/USDT" ||
            code == "ZRX/USDT" ||
            code == "MANA/USDT" ||
            code == "CQTF/USDT" ||
            code == "USDT/USDT":
            return 4;
          case code == "OMG/BTC" || code == "OMG/ETH" || code == "PST/ETH":
            return 6;
          case code == "ZRX/BTC" ||
            code == "BAT/BTC" ||
            code == "GNT/BTC" ||
            code == "PST/BTC" ||
            code == "MANA/BTC" ||
            code == "ZRX/ETH" ||
            code == "BAT/ETH" ||
            code == "GNT/ETH" ||
            code == "MANA/ETH":
            return 8;
          default:
            return 4;
        }
      };
      // 处理消息时
      _this.MainData.onmessage = function (evnt) {
        if (_this.$route.path != "/coincoin") {
          clearInterval(_this.timer);
          _this.MainData.close();
        }
        try {
          var datanum = JSON.parse(evnt.data);
          for (var i = 0; i < _this.Marketdatamain.length; i++) {
            if (_this.Marketdatamain[i].code == datanum.code) {
              _this.$set(_this.Marketdatamain, i, {
                ..._this.Marketdatamain[i],
                ...datanum
              });
              // console.log(_this.Marketdatamain[i].changeRate,datanum.changeRate)
            }
          }
          if (_this.Marketdataheader.code == datanum.code) {
            _this.Marketdataheader = datanum;
            // _this.marketPurchase.PriceData = datanum.price;
          }
          // for (var i = 0; i < codedata.length; i++) {
          //   if (codedata[i] == datanum.code) {
          //     console.log(codedata[i],datanum.code)
          //     if (datanum.change > 0) {
          //       pricedata[
          //         i
          //       ].innerHTML = `<span class="name">${datanum.name.toUpperCase() +
          //         "/USDT"}</span ><span class="toCny">≈${Number(
          //         datanum.cnyPrice
          //       ).toFixed(2)} CNY</span>`;
          //       // changeRatedata[i].innerHTML = datanum.changeRate;
          //       changeRatedata[i].innerHTML = `<span class="nums">${Number(
          //         datanum.price
          //       ).toFixed(SavePoint(datanum.code))}</span><span class="up">${
          //         datanum.changeRate
          //       }</span>`;
          //     } else {
          //       pricedata[
          //         i
          //       ].innerHTML = `<span class="name">${datanum.name.toUpperCase() +
          //         "/USDT"}</span><span class="toCny">≈${Number(
          //         datanum.cnyPrice
          //       ).toFixed(2)} CNY</span>`;
          //       // changeRatedata[i].innerHTML = datanum.changeRate;
          //       changeRatedata[i].innerHTML = `<span class="nums">${Number(
          //         datanum.price
          //       ).toFixed(SavePoint(datanum.code))}</span><span class="down">${
          //         datanum.changeRate
          //       }</span>`;
          //     }
          //     _this.changeColor(pricedata[i], datanum.price);
          //   }
          //   if (_this.Marketdatamainbox[i].code == datanum.code) {
          //     _this.Marketdatamainbox[i] = datanum;
          //   }
          // }
        } catch (e) {
          console.log(e);
        }
      };
      _this.MainData.onerror = function (evnt) { };
      _this.MainData.onclose = function (evnt) { };
    },
    changeColor(dom, num) {
      // window.setTimeout(function() {
      // 	dom.innerHTML = '<span style="">' + num + '</span>';
      // }, 1500)
    },
    SalePriceDatapush(type) {
      // 买卖价推送
      var connet = this,
        sellbuytype = true;
      if (connet.SalePriceData) {
        connet.SalePriceData.close();
      }
      // 首先判断是否 支持 WebSocket
      if ("WebSocket" in window) {
        connet.SalePriceData = new WebSocket(connet.$http.MainwsUrl);
      } else if ("MozWebSocket" in window) {
        connet.SalePriceData = new MozWebSocket(connet.$http.MainwsUrl);
      } else {
        connet.SalePriceData = new SockJS(connet.$http.MainwsUrl);
      }
      // 打开时
      connet.SalePriceData.onopen = function (evnt) {
        //					var msg = type;
        var msg = {
          sub: "depth@" + type
        };
        // 发送消息
        connet.SalePriceData.send(JSON.stringify(msg));
        connet.timer2 = setInterval(function () {
          // connet.SalePriceData.send('xtb');
          var mm = { pong: new Date().getTime() };
          connet.SalePriceData.send(JSON.stringify(mm));
        }, 20000);
      };

      // 处理消息时
      connet.SalePriceData.onmessage = function (evnt) {
        if (connet.$route.path != "/coincoin") {
          clearInterval(connet.timer2);
          connet.SalePriceData.close();
        }
        var datanum = JSON.parse(evnt.data);
        if(datanum.code !== connet.marketPurchase.code){
          clearInterval(connet.timer2);
          return
        }
        connet.PurchaseData = datanum; //join

        // 获得最大买价
        connet.mouthRenderBg.buyMax = datanum.bids.map(item => {
          return item.totalSize;
        });
        connet.mouthRenderBg.buyMax = connet.mouthRenderBg.buyMax.sort(
          (x, y) => y - x
        )[0];

        // 获得最大卖价
        connet.mouthRenderBg.sellMax = datanum.asks.map(item => {
          return item.totalSize;
        });
        connet.mouthRenderBg.sellMax = connet.mouthRenderBg.sellMax.sort(
          (x, y) => y - x
        )[0];
        var sellArr = datanum.asks;
        var buyArr = datanum.bids;
        // var min;
        // for(var i=0; i<sellArr.length; i++){
        // for(var j=i; j<sellArr.length;j++){
        //   if(parseFloat(sellArr[i].price)<parseFloat(sellArr[j].price)){
        //       min=sellArr[j];
        //       sellArr[j]=sellArr[i];
        //       sellArr[i]=min;
        //   }
        // }
        // }
        connet.PurchaseData.sell = sellArr.reverse();
        connet.PurchaseData.buy = buyArr;
      };
      connet.SalePriceData.onerror = function (evnt) { };
      connet.SalePriceData.onclose = function (evnt) { };
    },
    quanping() {
      var kine = document.getElementById("kk");
      var h = window.screen.height + "px";
      $("iframe").height(h);
      $("#fram")
        .contents()
        .find("#kline_container")
        .height(h);
      $("#fram")
        .contents()
        .find("#chart_overlayCanvas")
        .height(h);

      this.fullScreen(kine);

      //监听退出全屏事件
      window.onresize = function () {
        if (!checkFull()) {
          //要执行的动作
          $("iframe").height("800px");
          $("#fram")
            .contents()
            .find("#kline_container")
            .height("800px");
          $("#fram")
            .contents()
            .find("#chart_overlayCanvas")
            .height("747px");
        }
      };
      function checkFull() {
        var isFull =
          document.fullscreenEnabled ||
          window.fullScreen ||
          document.webkitIsFullScreen ||
          document.msFullscreenEnabled;
        //to fix : false || undefined == undefined
        if (isFull === undefined) {
          isFull = false;
        }
        return isFull;
      }
    },
    fullScreen(el) {
      var rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen,
        wscript;

      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
      }

      if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
          wscript.SendKeys("{F11}");
        }
      }
    },

    getRealData(code) {
      const _this = this;
      let data = {
        code: code
      };
      _this.$http
        .get(_this.$http.RealTimeDeal, { params: data })
        .then(function (res) {
          _this.RealDataLoad = true;
          if (res.data.code == "200") {
            _this.realData = res.data.data.data;
          }
        });
    },

    getDepth_url(code){
      const _this = this;
      let data = {
        code: code,
        type:'depth'
      };
      _this.$http
        .get(_this.$http.getDepth, { params: data })
        .then(function (res) {
          _this.RealDataLoad = true;
          if (res.data.code == "200") {

            var sellArr = res.data.data[0].asks;
            var buyArr = res.data.data[0].bids;

            _this.PurchaseData.sell = sellArr.reverse();
            _this.PurchaseData.buy = buyArr;
          }
        });
    },


    refresdata() {
      const _this = this;
      // _this.timer=setInterval(function(){
      // 	_this.$refs.offTime.offTime();
      // 	;
      // },3000)
      console.log("aaaa", _this.marketPurchase)
      _this.getRealData(_this.marketPurchase.code);
      _this.getDepth_url(_this.marketPurchase.code);
      // if(_this.RealData ===null){
      // 	alert('关闭')
      // 	_this.RealData.close();
      // }
      _this.DeepConcat = "10";
      _this.changeConcat();
      // _this.DeepMerger = ""
      _this.RealDataPush();
    },
    // 深度合并
    transDeepMerger(val) {
      var _this = this;
      var _val = _this.$public.toLowFixed(val, this.savePoint, 0);
      if (this.savePoint != this.DeepMerger && this.DeepMerger != "") {
        _val = String(_val);
        var arr = _val.split(".");
        var _arr = arr[1].split("");
        // 当前选择位数小于规定交易对保留小数
        for (var i = 0; i < _arr.length; i++) {
          // 循环到当前下标大于当前所选深度合并位数时，归零
          if (i + 1 > _this.DeepMerger) {
            _arr[i] = "0";
          }
        }
        arr[1] = _arr.join("");
        _val = arr.join(".");
      }
      return _val;
    },
    // 更新限价交易价格
    updatePrice(price) {
      // this.marketPurchase.PriceData = price;
      this.price = this.$public.toLowFixed(price, 2, 0);
    }
  },

  created: function () {
    var _this = this;
    if (sessionStorage.token) {
      // _this.getAssets();
    }
    _this.marketPurchase.code = _this.$route.query.code;
    // alert(_this.marketPurchase.code)
    _this.refresdata();
    _this.getdatamain();
    window.scrollTo(0, 0); //回到顶部
    _this.language = _this.$cookies.get("language");
    // if(_this.$cookies.get('language') == 'zh'){
    //   	_this.language = 'zh';
    //   }else{
    //     _this.language = 'en';
    //   }
  },
  destroyed() {
    var _this = this
    clearInterval(_this.timer)
    clearInterval(_this.timer1)
    clearInterval(_this.timer2)
    _this.timer = null
    _this.timer1 = null
    _this.timer2 = null
  },
  watch: {
    "marketPurchase.code"() { }
    // 深度合并改变时的函数
    // DeepMerger(n, o){
    // 	var _this = this
    // 	if(n != ""){
    // 		var str = 1212.18421549624
    // 		// 保留位数
    // 		var _str = str.toFixed(_this.savePoint)
    // 		// 处理
    // 		alert(_str)
    // 	}
    // }
  },

  computed: {
    PKD() {
      if (this.DeepConcat && this.PurchaseData.sell.length) {
        let Deep = parseFloat(this.DeepConcat);
        let sele = this.PurchaseData.sell;
        sele.splice(0, this.PurchaseData.sell.length - Deep);
        if(Deep>10){
          var ele = document.getElementById("ele");
          if(ele.scrollHeight){
            ele.scrollTop = ele.scrollHeight;
          }
        }
        return sele;
      }
      return [];
    },
    // klinetab() {
    //   return 'K线图';
    // },
    // 交易对需要保留的小数位
    savePoint() {
      switch (true) {
        // case this.marketPurchase.code == "BTC/USDT"
        // ||	 this.marketPurchase.code == "ETH/USDT"
        // :
        // 	return 2
        // case this.marketPurchase.code == "OMG/USDT"
        // ||	 this.marketPurchase.code == "GNT/USDT"
        // ||	 this.marketPurchase.code == "PST/USDT"
        // ||	 this.marketPurchase.code == "ZRX/USDT"
        // ||	 this.marketPurchase.code == "MANA/USDT"
        // ||	 this.marketPurchase.code == "CQTF/USDT"
        // ||	 this.marketPurchase.code == "USDT/USDT"
        // :
        // 	return 4
        // case this.marketPurchase.code == "OMG/BTC"
        // ||	 this.marketPurchase.code == "OMG/ETH"
        // ||	 this.marketPurchase.code == "PST/ETH"
        // :
        // 	return 6
        // case this.marketPurchase.code == "ZRX/BTC"
        // ||	 this.marketPurchase.code == "BAT/BTC"
        // ||	 this.marketPurchase.code == "GNT/BTC"
        // ||	 this.marketPurchase.code == "PST/BTC"
        // ||	 this.marketPurchase.code == "MANA/BTC"
        // ||	 this.marketPurchase.code == "ZRX/ETH"
        // ||	 this.marketPurchase.code == "BAT/ETH"
        // ||	 this.marketPurchase.code == "GNT/ETH"
        // ||	 this.marketPurchase.code == "MANA/ETH"
        // :
        // 	return 8
        default:
          return 6;
      }
    },

    isDown() {
        if(!this.Marketdataheader.range) return false 
        if(this.Marketdataheader.range > 0) {
          return true
        } else {
          return false
        }
        // var index =this.Marketdataheader.range.indexOf('-')
        // if(index > -1) {
        //   return false
        // }else{
        //   return true
        // }
      },
  },
  components: {
    Purchase: Purchase,
    Sellout: Sellout,
    Quotation: Quotation,
    Quotationheader: Quotationheader,
    bbOrder: bbOrder,
    tradingNotice: tradingNotice
  }
};
</script>