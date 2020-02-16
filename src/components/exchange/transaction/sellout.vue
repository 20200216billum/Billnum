<template lang="html">
  <div class="Sellout">
    <el-form ref="form" :model="form" size="small">
      <h4 style="color:#f33939;">{{$t('Gic.Placeorder[3]')}}</h4>
      <!--卖出价-->
      <el-form-item>
        <!--以当前最优价格交易-->
        <!-- ModifyState为true时为市价交易 -->
        <el-input v-if="ModifyState" :value="$t('Gic.Placeorder[4]')" :disabled="ModifyState"></el-input>
        <el-input @change="transValue('price')" v-else v-model="sendData.buyprice" :disabled="ModifyState"></el-input>
        <div class="opreation" v-if="!ModifyState">
          <div @click="changeValue('-')" class="reduce">
            <img src="../../../assets/image/bibi/-.png"></img>
          </div>
          <div class="river"></div>
          <div @click="changeValue('+')" class="add">
            <img src="../../../assets/image/bibi/+.png"></img>
          </div>

        </div>
        <!-- <div v-if="ModifyState" class="toCny">≈{{ $public.toLowFixed(nowCny,2,0) }} CNY</div>
				<div v-else class="toCny">≈{{ $public.toLowFixed($public.Multiplication($public.Division(nowCny,nowPrice), sendData.buyprice),2,0) }} CNY</div> -->

      </el-form-item>
      <!--交易数量-->
      <el-form-item>

        <el-input class="jynums" @change="transValue('num')" v-model="sendData.buynum" placeholder="0">
          <!-- <template slot="append">{{ Data.code | normal }}</template> -->
          <span slot="suffix">{{Data.code | normal}}</span>
        </el-input>
        <!-- <div class="number" v-if="isLogin && form.maximum>=0">

          <div class="jump">
            <div @click="fill('0.25')" class="item">25%</div>
            <div @click="fill('0.5')" class="item">50%</div>
            <div @click="fill('0.75')" class="item">75%</div>
            <div @click="fill('1')" class="item">100%</div>
          </div>

        </div>
        <div class="number" v-else>

          <div class="jump">
            <div @click="fill('0.25')" class="item">25%</div>
            <div @click="fill('0.5')" class="item">50%</div>
            <div @click="fill('0.75')" class="item">75%</div>
            <div @click="fill('1')" class="item">100%</div>
          </div>
        </div> -->
      </el-form-item>
      <div class="jiaoyiAll jiaoyiSell">

        <p v-if="ModifyState">
          <!-- <span>{{$t('bibi.other[1]')}}：{{$public.toLowFixed(sendData.buynum,6,'',false)}}{{Data.code | normal}}</span> -->
          <span>{{$t('Gic.Placeorder[5]')}}</span>
          <span>{{$public.toLowFixed(form.maximum,6,'',false)}} {{Data.code | normal}}</span>
        </p>
        <p v-else>
          <!-- <span>{{$t('bibi.other[0]')}}：{{$public.toLowFixed(form.turnover,6,'',false)}}{{Data.code | normal1}}</span> -->
          <span>{{$t('Gic.Placeorder[5]')}}</span>
          <span>{{$public.toLowFixed(form.maximum,6,'',false)}} {{Data.code | normal}}</span>
        </p>
      </div>

      <div class="number" v-if="isLogin && form.maximum>=0">
        <div class="jump">
          <div @click="fill('0.25')" class="item">25%</div>
          <div @click="fill('0.5')" class="item">50%</div>
          <div @click="fill('0.75')" class="item">75%</div>
          <div @click="fill('1')" class="item">100%</div>
        </div>
      </div>
      <div class="number" v-else>
        <div class="jump">
          <div @click="fill('0.25')" class="item">25%</div>
          <div @click="fill('0.5')" class="item">50%</div>
          <div @click="fill('0.75')" class="item">75%</div>
          <div @click="fill('1')" class="item">100%</div>
        </div>
      </div>


      <el-form-item>
        <!--卖出 请登录-->
        <div v-if='isLogin'>
            <el-button v-if="Data.sell_state" type="" size="small" :loading="loadingsellout" @click="onSubmit">
                {{$t('Gic.Placeorder[3]')}}</el-button>
                <el-button v-else type="" size="small" :loading="loadingsellout" @click="onSubmit">
                    {{$t('Gic.Placeorder[3]')}}</el-button>
        </div>
        <el-button v-else type="" size="small" :loading="loadingsellout" @click="onSubmit" disabled>
            {{$t('Gic.Placeorder[7]')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: ["Data", "ModifyState", "nowCny", "nowPrice", "price"],
    data() {
      return {
        activeName: "first",
        form: {
          maximum: 0, //交易最大数量
          turnover: "" //交易额
        },
        //需要向后台传的数据
        sendData: {
          mobile: null, //手机号
          code: "", //code
          buyprice: 0, //最新价格
          buynum: 0, //买入数量
          otype: 2, //市价 2 限价 1 （默认市价）
          type: 2 //涨（买入） 1 跌 2（卖出）
        },
        loadingsellout: false, //防止重复提交
        isLogin: false, //判断有没有登录
        cg: "",
        yuecny: ""
      };
    },
    watch: {
      "cg": function (val, oval) {
        this.sendData.buynum = val;
      },
      "Data.code": function () {
        this.sendData.buyprice = this.Data.PriceData;
        this.sendData.buynum = "";
      },
      "Data.syb": function () {
        this.maxCanBuy();
      },
      "Data.PriceData": function (val, oval) {
        var _this = this;
        //点击卖5买5
        if (_this.ModifyState) {
          _this.sendData.buyprice = val
        }
        if (this.Data.buyorsell == "buy") {
          _this.sendData.buyprice = val;
        }
        _this.sendData.buyprice = val;
        //   _this.sendData.code = _this.Data.code; //code
        this.maxCanBuy();
      },
      "Data.wallone": function (val, oval) {
        this.maxCanBuy();
        this.allMoney();
      },
      "price": function (val, oval) {
        let _this = this;
        _this.sendData.buyprice = val;
        this.maxCanBuy();
      },
      "sendData.buyprice": function (val, oval) {
        var arr = String(val).split(".");
        var saveNums = this.$public.SavePoint(this.Data.code);
        if (arr.length == 3) {
          val = oval;
          return false;
        }
        // 不可输入特殊字符
        if (isNaN(Number(val))) {
          val = oval;
          return false;
        }
        if (Number(val) < 0) {
          val = oval
        }
        // 达到限定小数位后不可输入
        if (arr.length == 2 && arr[1].length > saveNums) {
          val = oval;
        }
        //从新计算最大购买量和交易额
        if (!this.isLogin) return false;
        this.maxCanBuy();
        this.allMoney();
      },
      "sendData.buynum": function (val, oval) {
        var saveNums = this.savePoint;
        // 只可输入1个小数点
        var arr = String(val).split(".");
        if (arr.length == 3) {
          this.sendData.buynum = oval;
          return false;
        }
        // 不可输入特殊字符
        if (isNaN(Number(val))) {
          this.sendData.buynum = oval;
          return false;
        }
        // 达到限定小数位后不可输入
        if (arr.length == 2 && arr[1].length > saveNums) {
          this.sendData.buynum = oval;
        }
        //从新计算最大购买量和交易额
        if (!this.isLogin) return false;
        this.maxCanBuy();
        this.allMoney();
        this.cnyMoney();
        if (val == 0) {
          this.cg = "";
        }
      }
    },
    //过滤器
    filters: {
      normal: function (val) {
        if (!val) return "--";
        var n = val.indexOf("_");
        if (n == -1) return "--";
        return val.toUpperCase().slice(0, n);
      },
      normal1: function (val) {
        if (!val) return "--";
        var n = val.indexOf("_");
        if (n == -1) return "--";
        return val.toUpperCase().slice(n + 1, val.length);
      }
    },
    methods: {
      // input change事件
      transValue(type) {
        switch (type) {
          case "price":
            var saveNums = this.$public.SavePoint(this.Data.code);
            this.sendData.buyprice = Number(this.sendData.buyprice).toFixed(
              saveNums
            );
            break;
          case "num":
            var saveNums = this.savePoint;
            if (this.sendData.buynum == 0) {
              // 防止全部删除后输入框显示0.0000
              this.sendData.buynum = "";
            } else {
              this.sendData.buynum = parseFloat(
                Number(this.sendData.buynum).toFixed(saveNums)
              );
            }
            break;
        }
      },
      // 加减
      changeValue(type) {
        var _this = this;
        var pointNums = _this.$public.SavePoint(this.Data.code);
        var _arr = ["0", "."];
        var nums;
        for (var i = 0; i < pointNums; i++) {
          if (i + 1 == pointNums) {
            _arr.push("1");
            break;
          } else {
            _arr.push("0");
          }
        }
        nums = Number(_arr.join(""));
        if (type == "+") {
          _this.sendData.buyprice = _this.$public.Addition(
            _this.sendData.buyprice,
            nums
          );
        } else if (_this.sendData.buyprice !== 0) {
          _this.sendData.buyprice = _this.$public.Subtraction(
            _this.sendData.buyprice,
            nums
          );
        }
      },
      fill(rate) {
        this.maxCanBuy();
        this.allMoney();
        this.sendData.buynum = parseFloat(
          Number(this.form.maximum * rate).toFixed(this.savePoint)
        );
        // this.maxCanBuy();
        // this.allMoney();
      },
      //最大购买量
      maxCanBuy() {
        //				if(this.ModifyState) {
        //					this.form.maximum = Number(Number(this.Data.syb).toFixed(4)); //交易最大数量
        //					return false;
        //				}

        this.form.maximum = Number(this.Data.syb).toFixed(8); //交易最大数量
      },
      cnyMoney() {
        // if(this.ModifyState){
        // this.yuecny=Number(this.$public.Multiplication(this.$public.Multiplication(this.form.turnover,this.Data.PriceData),this.Data.cnyPrice)).toFixed(2);
        // }else{
        this.yuecny = Number(
          this.$public.Multiplication(
            this.$public.Multiplication(this.form.turnover, this.Data.PriceData),
            this.Data.cnyPrice
          )
        ).toFixed(2);
        // }
        // this.yuecny=Number(this.$public.Multiplication(this.$public.Multiplication(this.form.turnover,this.Data.PriceData),this.Data.cnyPrice)).toFixed(2);
      },
      //最总交易额
      allMoney() {
        /*
             总价格计算公式  价格* 数量（ 手续费 + 1/杠杆  ）
              其中价格  （买入）= 当前价格  + 点差 * 最小浮动价         （卖出）= 当前价格  - 点差 * 最小浮动价
           * */

        if (this.ModifyState) {
          this.form.turnover = Number(this.sendData.buynum).toFixed(8);
          return false;
        }
        this.form.turnover = Number(
          this.sendData.buynum * this.sendData.buyprice
        ).toFixed(8);
      },
      onSubmit: function () {
        //订单
        var _this = this;
        _this.sendData.code = _this.Data.code; //code
        //etc 提示正在奖励币种,暂停交易
        // if(_this.sendData.code == 'etc_usdt') {
        // 	this.$alert(_this.$t("bibi.tk[1]"), {
        // 		confirmButtonText: _this.$t("bibi.tk[0]"),

        // 	});
        // 	return false;
        // }
        // if(_this.sendData.code == 'ea_usdt' ||_this.sendData.code == 'hub_usdt' ||_this.sendData.code == 'hac_usdt'){
        // 	this.$alert(_this.$t("bibi.tk[2]"), {
        // 		confirmButtonText: _this.$t("bibi.tk[0]"),

        // 	});
        // 	return false;
        // }
        var dis = null;
        // if(this.userData.authentication ==0){
        // 	_this.$public.confirm(_this.$t('header.Tipstext2[0]'), 'changePerson2', _this);
        // 	// _this.$public.msg(_this.$t('header.Tipstext2[0]'), 'warning', _this);
        //     return false;
        // }
        // if(!sessionStorage.tpwd){
        // 	_this.$public.confirm(_this.$t('apply.judge[1]'), 'security', _this);
        // 	// _this.$public.msg(_this.$t('apply.judge[1]'), 'warning', _this);
        //     return false;
        // }

        // var sums=Number(_this.$public.Multiplication(_this.$public.Multiplication(_this.form.turnover,_this.Data.PriceData),_this.Data.cnyPrice)).toFixed(2);
        // var sums=Number(_this.$public.Multiplication(_this.form.turnover,_this.Data.cnyPrice)).toFixed(2);
        // if(sums<Number(_this.Data.minbuynum)){
        // 	_this.$public.msg('最小交易额为'+_this.Data.minbuynum+'CNY', 'warning', _this);
        // 	return false;
        // }
        if (_this.ModifyState) {
          _this.sendData.otype = 2;
          if(_this.sendData.buynum == ''){
						_this.$public.msg(this.$t('Gic.Placeorder[6]'), 'warning', _this);
						return false
					}
          //市价
          var sums = Number(
            this.$public.Multiplication(
              this.$public.Multiplication(
                this.form.turnover,
                this.Data.PriceData
              ),
              this.Data.cnyPrice
            )
          ).toFixed(2);
          if (sums < Number(_this.Data.minbuynum)) {
            _this.$public.msg(
              _this.$t("bibi.other[3]") + _this.Data.minbuynum + "CNY",
              "warning",
              _this
            );
            return false;
          }
          dis = dis = this.$t("Gic.bbOrderAll[19]")
        } else if (!_this.ModifyState) {
          _this.sendData.otype = 1;
          if(_this.sendData.newprice == ''){
						_this.$public.msg('请输入委托价格', 'warning', _this);
            
						return false
					}
					if(_this.sendData.buynum == ''){
						_this.$public.msg(this.$t('Gic.Placeorder[6]'), 'warning', _this);
						return false
					}
          //限价
          var sums = Number(
            _this.$public.Multiplication(_this.form.turnover, _this.Data.cnyPrice)
          ).toFixed(2);
          if (sums < Number(_this.Data.minbuynum)) {
            _this.$public.msg(
              _this.$t("bibi.other[3]") + _this.Data.minbuynum + "CNY",
              "warning",
              _this
            );
            return false;
          }
          dis = dis = this.$t("Gic.bbOrderAll[18]")
        }
        // _this.sendData.mobile = _this.userData.phone; //手机号
        if (_this.ModifyState) {
          //市价  委托总金额  委托总数量

          //当前最优价格
          _this.sendData.buyprice = _this.$t("Gic.bbOrderTan[12]");
          var sendData = {
            // mobile: _this.userData.phone,
            code: _this.sendData.code,
            toalnum: _this.sendData.buynum, //委托总金额 (市价买入)
            type: _this.sendData.type, //1买入 2卖出
            otype: _this.sendData.otype //1限价 2市价
          };
        } else {
          //委托价格 委托数量
          var sendData = {
            // mobile: _this.userData.phone,
            code: _this.sendData.code,
            buyprice: _this.sendData.buyprice, //委托价格
            buynum: _this.sendData.buynum, //委托数量
            type: _this.sendData.type, //1买入 2卖出
            otype: _this.sendData.otype //1限价 2市价
          };
        }

        // if (!_this.$public.dataDetection(sendData, _this.Data.wallone, _this)) {
        //   return false;
        // }
        var nightModel = this.$cookies.get("changeBg") == "night";
        const h = this.$createElement;
        this.$msgbox({
          // title: _this.$t("bibi.alse[3]"),
          title: this.$t("Gic.bbOrderTan[6]"),
          customClass: nightModel ? "bbMessageBox Night" : "bbMessageBox Day",
          cancelButtonClass: "bbMessageBox-cancel",
          confirmButtonClass: "bbMessageBox-confirm",
          message: h(
            "div",
            {
              style: "width: 100%;margin:0 auto;minWidth:260px"
            },
            [
              h(
                "div",
                {
                  style: "overflow: hidden"
                },
                [
                  h(
                    "p",
                    {
                      style: "float:left;width:140px;"
                    },
                    [
                      h("span", null, this.$t("Gic.bbOrderAll[4]") + '：'),
                      h(
                        "span",
                        {
                          style: "color:#FF4B4F"
                        },
                        this.$t("Gic.bbOrderAll[17]")
                      )
                    ]
                  ),
                  h(
                    "p",
                    {
                      style: "float:left;marginLeft:30px;"
                    },
                    [
                      h("span", null, this.$t("Gic.bbOrderTan[7]") + "："),
                      h("span", { style: "color:#bbb" }, dis)
                    ]
                  )
                ]
              ),
              h(
                "div",
                {
                  style: "overflow: hidden"
                },
                [
                  h(
                    "p",
                    {
                      style: "float:left;width:140px;"
                    },
                    [
                      h("span", null, this.$t("Gic.bbOrderTan[8]") + "："),
                      h("span", { style: "color:#bbb" }, _this.sendData.buyprice)
                    ]
                  ),
                  h(
                    "p",
                    {
                      style: "float:left;marginLeft:30px;"
                    },
                    [
                      h("span", null, this.$t("Gic.bbOrderTan[9]") + "："),
                      h("span", { style: "color:#bbb" }, _this.sendData.buynum)
                    ]
                  )
                ]
              ),
              h('div', {
							style: 'overflow: hidden'
						}, [
							h('p', {
								style: 'float:left;width:100%;'
							}, [
								h('span', null, this.$t("Gic.Placeorder[8]") + "："),
								h('span', null, this.$t("Gic.Placeorder[9]") + _this.$public.Multiplication(_this.Data.trans_fee,Number(1000))),
							]),
						]),
            ]
          ),
          showCancelButton: true,
					confirmButtonText: this.$t("Gic.bbOrderTan[11]"),
					cancelButtonText: this.$t("Gic.bbOrderTan[10]"),
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = _this.$t("bibi.alse[11]");
              //数据请求 开始下单
              done();
              _this.$http
                .post(_this.$http.bbtran, sendData)
                .then(function (response) {
                  instance.confirmButtonLoading = false;
                  if (response.data.code == "200") {
                    _this.$public.msg(
                      _this.$t("bibi.alse[12]"),
                      "success",
                      _this
                    );
                    _this.sendData.buynum = 0;
                    _this.cg = null;
                    _this.$emit("changeData");
                  } else {
                    _this.$public.msg(response.data.msg, "warning", _this);
                  }
                })
                .catch(function (error) { });
            } else {
              done();
            }
          }
        }).then(action => { });
      }
    },
    // 路由改变时
    beforeRouteLeave(to, from, next) { },
    mounted: function () {
      var _this = this;
      //			_this.userInfo();
      if (sessionStorage.token) {
        //表示已经登录了
        _this.isLogin = true;
      }
      _this.sendData.code = _this.Data.code; //code
      setTimeout(function () {
        _this.sendData.buyprice = _this.Data.PriceData; //最新价格
        _this.maxCanBuy();
        _this.allMoney();
      }, 1500);
    },
    computed: {
      // userData() {
      //   if (sessionStorage.token) {
      //     return JSON.parse(sessionStorage.userData);
      //   } else {
      //     return "null";
      //   }
      // },
      codeRight() {
        if (this.Data) return "--";
        var arr = this.Data.code.split("/");
        return arr[1];
      },
      codeLeft() {
        if (this.Data) return "--";
        var arr = this.Data.code.split("/");
        return arr[0];
      },
      savePoint() {
        switch (this.codeLeft) {
          // case "BTC":
          // 	return 4
          // case "OMG":
          // 	return 4
          // case "GNT":
          // 	return 4
          // case "PST":
          // 	return 2
          // case "ZRX":
          // 	return 2
          // case "MANA":
          // 	return 2
          // case "ETH":
          // 	return 4
          // case "CQTF":
          // 	return 2
          default:
            return 6;
        }
      }
    }
  };
</script>