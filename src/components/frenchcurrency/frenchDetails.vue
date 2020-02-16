<style lang=less>
@import "../../assets/public.less";
@import "./frenchDetails.less";

.mainy i.el-icon.el-icon-arrow-right {
  color: #333;
}
</style>
<template lang="html">
	<div class="frenchdatails">
		<div class="frenchdatails_header">
			<div class="name">
				<div class="name_tit">
					<span>{{userDataTongji.name.slice(0,1)}}</span>
					<sub class="el-badge__content is-dot"></sub>
				</div>
				<h2>{{userDataTongji.name}}</h2>
			</div>
			<div class="toji">
				<ul class="warp_lis">
					
					<!--<li>
						完成率
						<h2>{{userDataTongji.rate}} <span>%</span></h2>
						<span>{{$t("fbDetars.list1[0]")}}</span>
					</li>-->
					
					<!--<li>
						
						<h2>{{userDataTongji.cd_num}} <span>次</span></h2>
						<span>{{$t("fbDetars.list1[1]")}}</span>
					</li>
					<li>
						
						<h2>{{userDataTongji.three_num}} <span>次</span></h2>
						<span>{{$t("fbDetars.list1[2]")}}</span>
					</li>-->
					<li>
						<!--申诉-->
						<h2>{{userDataTongji.shensu}} <span>次</span></h2>
						<span>{{$t("fbDetars.list1[3]")}}</span>
					</li>
					<li>
						<!--胜诉-->
						<h2>{{userDataTongji.shengsu}} <span>次</span></h2>
						<span>{{$t("fbDetars.list1[4]")}}</span>
					</li>
					<!--<li>
						<h2>0.86 <span>分钟</span></h2>
						<span>平均放行</span>
					</li>-->
				</ul>
			</div>
		</div>
		<div class="reg_time_warp">
			<div class="time">
				<!--注册时间-->
				<!--<span>{{$t("fbDetars.list2[0]")}}：</span>-->
				<!--<span>{{$public.timestampToTime(userDataTongji.reg_time)}}</span>-->
			</div>
			<div class="study">
				<ul class="lis_warp">
					<li v-show="userDataTongji.email == 1">
						{{$t("fbDetars.list2[1]")}}
						<!--邮箱验证-->
						<i class="el-icon-success study_icon"></i>
					</li>
					<li v-show="userDataTongji.mobile == 1">
						{{$t("fbDetars.list2[2]")}}
						<!--手机验证-->
						<i class="el-icon-success study_icon"></i>
					</li>
					<li v-show="userDataTongji.smrz == 1">
						{{$t("fbDetars.list2[3]")}}
						<!--实名验证-->
						<i class="el-icon-success study_icon"></i>
					</li>
					<!-- <li v-show="userDataTongji.status == 3">
						{{$t("fbDetars.list2[4]")}} -->
						<!--高级验证-->
						<!-- <i class="el-icon-success study_icon"></i>
					</li> -->
				</ul>
			</div>
		</div>

		<div class="online_sale">
			<div class="title">
				<h2>
					{{$t("fbDetars.list3[0]")}}
				</h2>
				<!--在线出售-->
			</div>
			<!--暂无数据-->
			<p class="no_list" v-show="sell.sell_list.length == 0">{{$t("fbDetars.list3[1]")}}</p>
			<ul class="online_sale_lis_warp" v-show="sell.sell_list.length != 0">
				<li class="lis" v-for="(v,k)  in sell.sell_list ">
					<span class="sp sp_img_warp">
							<img src="../../assets/image/usdt.png"/>
					</span>
					<span class="sp price_warp">
							<h2>{{v.price}} CNY/USDT</h2>
							<span>{{$t("fbDetars.list3[2]")}}：{{v.quota}}</span>
							<!--限额-->
					</span>
					<span class="sp num">
						<h2>{{$t("fbDetars.list3[3]")}}</h2>
						<!--出售数量 / 剩余数量-->
						<span>{{$public.toLowFixed(v.trans_num,4,0)}}</span>
					<span>/</span>
					<span>{{ $public.toLowFixed(v.amount,4,0)}}</span>
					</span>
					<span class="sp pay">
							<i class="icon iconfont icon-weixin wx" v-show="v.pay_wx == 1"></i>
							<i class="icon iconfont icon-zhifubao alipay" v-show="v.pay_alipay == 1"></i>
							<i class="icon iconfont icon-yinhangka car" v-show="v.pay_backcard == 1"></i>
					</span>
					<span class="sp buy_btn_warp" @click="dialogFormVisibles(v.price,v.min_price,v.max_price,v.order_no,'1',v.amount,v.account)">
						<span class="buy_btn">{{$t("fbDetars.list3[4]")}}USDT</span>
					</span>
				</li>
				<li class="lis fenye">
					<el-pagination background layout="prev, pager, next" :total="parseInt(sell.sell_paging.count)" :page-size='sell.sell_paging.size' @current-change="sell_page"></el-pagination>
				</li>
			</ul>
		</div>
		<div class="online_bay">
			<div class="title">
				<h2>{{$t("fbDetars.list4[0]")}}</h2>
			</div>
			<p class="no_list" v-show="pmma.pmma_list.length == 0">{{$t("fbDetars.list4[1]")}}</p>
			<!--暂无数据-->
			<ul class="online_sale_lis_warp" v-show="pmma.pmma_list.length != 0">
				<li class="lis" v-for="(v,k)  in pmma.pmma_list ">
					<span class="sp sp_img_warp">
							<img src="../../assets/image/usdt.png"/>
					</span>
					<span class="sp price_warp">
							<h2>{{v.price}} CNY/USDT</h2>
							<span>{{$t("fbDetars.list4[2]")}}：{{v.quota}}</span>
					</span>
					<span class="sp num">
						<h2>{{$t("fbDetars.list4[3]")}}</h2>
						<!--<h2>求购数量 / 剩余数量</h2>-->
						<span>{{$public.toLowFixed(v.trans_num,4,0)}}</span>
					<span>/</span>
					<span>{{ $public.toLowFixed(v.amount,4,0)}}</span>
					</span>
					<span class="sp pay">
							<i class="icon iconfont icon-weixin wx" v-show="v.pay_wx == 1"></i>
							<i class="icon iconfont icon-zhifubao alipay" v-show="v.pay_alipay == 1"></i>
							<i class="icon iconfont icon-yinhangka car" v-show="v.pay_backcard == 1"></i>
					</span>
					<span class="sp buy_btn_warp" @click="dialogFormVisibles(v.price,v.min_price,v.max_price,v.order_no ,'2',v.amount,v.account)">
					<span class="buy_btn">{{$t("fbDetars.list4[4]")}}USDT</span>
					<!--出售USDT-->
					</span>
				</li>
				<li class="lis fenye">
					<el-pagination background layout="prev, pager, next" :total="parseInt(pmma.pmma_paging.count)" :page-size='pmma.pmma_paging.size' @current-change="pmma_page"></el-pagination>
				</li>
			</ul>
		</div>

		<!--弹框-->
		<el-dialog :title="$t('fbDetars.mobile[0]')" width="30%" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item :label="$t('fbDetars.mobile[1]')" :label-width="formLabelWidth">
					<el-input v-model="form.cny" auto-complete="off" type='number' @focus='cny_focus=1' @blur='cny_focus=0'>
						<template slot="append">CNY</template>
					</el-input>
				</el-form-item>
				<el-form-item :label="$t('fbDetars.mobile[2]')" :label-width="formLabelWidth">
					<el-input v-model="form.num" auto-complete="off" type='number' @focus='num_focus=1' @blur='num_focus=0'>
						<template slot="append">USDT</template>
					</el-input>
				</el-form-item>
				<el-form-item :label="$t('fbDetars.mobile[3]')" :label-width="formLabelWidth">
					<el-input v-model="form.tpwd" auto-complete="off" type="password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{$t('fbDetars.mobile[4]')}}</el-button>
				<el-button type="primary" @click="OrderDown()">{{$t('fbDetars.mobile[5]')}}</el-button>
			</div>
		</el-dialog>

	</div>

</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      num_focus: "", // 数量 当获得焦点时为1 失去焦点时为0
      cny_focus: "", //人民币 当获得焦点时为1 失去焦点为0
      Sign: 1, //防止重复提示标志位
      form: {
        cny: "",
        num: "",
        tpwd: "",
        one_price: "", //单价
        min_price: "", //最小
        max_price: "", //最大
        order_no: "", //订单编号
        type: "", //购买1，出售2
        amount: "" //可购买数量
      },
      userDataTongji: {
        wallone: "", // 用户余额
        account: "", //上个页面传过来的用户id号
        reg_time: "", //注册时间
        name: "",
        mobile: 0, //手机认证
        email: 0, //邮箱认证
        smrz: 0, //实名认证
        status: 0, //高级认证
        rate: "-", //完成率
        cd_num: "-", //成单
        three_num: "-", //30天
        shensu: "-", //申述
        shengsu: "-" //胜诉
      },
      //出售信息列表
      sell: {
        sell_paging: {
          size: 3, //默认显示五条
          p: 1, //当前页
          count: "" //一共有几页
        },
        sell_list: []
      },
      //出售分页

      //购买信息列表
      pmma: {
        pmma_paging: {
          size: 3, //默认显示五条
          p: 1, //当前页
          count: "" //一共有几页
        },
        pmma_list: []
      }
    };
  },
  methods: {
    getShopinfo() {
      var _this = this;
      _this.userDataTongji.account = _this.$route.query.account;
      if (!_this.userDataTongji.account) return false;
      _this.$http
        .post(_this.$http.cat_shopinfo, {
          account_shop: _this.userDataTongji.account,
          sell_size: _this.sell.sell_paging.size,
          pmma_size: _this.pmma.pmma_paging.size,
          sell_p: _this.sell.sell_paging.p,
          pmma_p: _this.pmma.pmma_paging.p
        })
        .then(function(response) {
          if (response.data.status == "200") {
            //						个人信息
            _this.userDataTongji.name = response.data.data.set_status.name;
            _this.userDataTongji.mobile = response.data.data.set_status.mobile;
            _this.userDataTongji.email = response.data.data.set_status.email;
            _this.userDataTongji.smrz = response.data.data.set_status.smrz;
            _this.userDataTongji.status = response.data.data.set_status.status;
            _this.userDataTongji.reg_time =
              response.data.data.set_status.reg_time;
            _this.userDataTongji.shengsu = response.data.data.shengsu;
            _this.userDataTongji.shensu = response.data.data.shensu;
            _this.userDataTongji.three_num = response.data.data.three_num;
            _this.userDataTongji.rate = response.data.data.rate;
            _this.userDataTongji.cd_num = response.data.data.cd_num;

            //出售信息
            _this.sell.sell_list = response.data.data.sell.res;
            _this.sell.sell_paging.count = response.data.data.sell.count;
            _this.sell.sell_paging.p = response.data.data.sell.p;

            //购买信息
            _this.pmma.pmma_list = response.data.data.pmma.res;
            _this.pmma.pmma_paging.count = response.data.data.pmma.count;
            _this.pmma.pmma_paging.p = response.data.data.pmma.p;
          } else {
            _this.$public.msg(response.data.msg, "warning", _this);
          }
        })
        .catch(function(error) {});
    },
    //购买执行函数
    OrderDown() {
      var _this = this;

      if (_this.form.type == 2) {
        //表示用户点的是出售 加一个余额判断
        if (Number(_this.form.num) > Number(_this.userDataTongji.wallone)) {
          //'用户余额不足，请充值',
          _this.$public.msg(
            _this.$t("frenchcurrency.tishi[4]"),
            "warning",
            _this
          );
          _this.nullData();
          return false;
        }
      }
      if (!_this.$public.Ints(_this.form.cny)) {
        //'交易金额请输入大于0的非空纯数字',
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[5]"),
          "warning",
          _this
        );
        _this.nullData();
        return false;
      } else if (!_this.$public.Ints(_this.form.num)) {
        //'交易数量请输入大于0的非空纯数字'
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[6]"),
          "warning",
          _this
        );
        _this.nullData();
        return false;
      } else if (
        _this.form.cny.toString().indexOf(".") != -1 &&
        _this.form.cny.split(".")[1].length > 2
      ) {
        //资金最多保留两位有效数字
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[1]"),
          "warning",
          _this
        );
        return false;
      } else if (
        _this.form.num.toString().indexOf(".") != -1 &&
        _this.form.num.split(".")[1].length > 6
      ) {
        //数量最多保留四位有效数字
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[2]"),
          "warning",
          _this
        );
        return false;
      } else if (Number(_this.form.num) > Number(_this.form.amount)) {
        //交易数量不能大于剩余数量
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[7]"),
          "warning",
          _this
        );
        _this.nullData();
        return false;
      } else if (
        Number(_this.form.cny) > Number(_this.form.max_price) ||
        Number(_this.form.cny) < Number(_this.form.min_price)
      ) {
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[8]") +
            _this.form.min_price +
            "-" +
            _this.form.max_price +
            _this.$t("frenchcurrency.tishi[9]"),
          "warning",
          _this
        );
        _this.nullData();
        return false;
      } else if (!_this.$public.pwd(_this.form.tpwd)) {
        //资金密码格式有误
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[10]"),
          "warning",
          _this
        );
        return false;
      } else {
        //去结算
        var create_orderdata = {
          type: _this.form.type,
          tpwd: _this.$md5(_this.form.tpwd), //资金密码，出售时需要，购买时不用此字段
          order_no: _this.form.order_no,
          total_num: _this.form.num,
          total_price: _this.form.cny
        };
        _this.$http
          .post(_this.$http.create_order, create_orderdata)
          .then(function(response) {
            if (response.data.status == "200") {
              _this.$router.push({
                path: "/frenchorder"
              });
              window.sessionStorage.order = escape(
                JSON.stringify(response.data)
              );
            } else {
              _this.$public.msg(response.data.msg, "warning", _this);
            }
          })
          .catch(function(error) {});
      }
    },
    //个人中心请求函数
    dialogFormVisibles(val, min, max, order_no, type, amount, thisAccount) {
      var _this = this;
      _this.form.one_price = val;
      _this.form.max_price = max;
      _this.form.min_price = min;
      _this.form.order_no = order_no;
      _this.form.type = type;
      _this.form.amount = amount;
      //判断一下自己不能买自己家的币
      if (thisAccount == sessionStorage.account) {
        if (type == 1) {
          _this.$public.msg(
            _this.$t("frenchcurrency.tishi2[1]"),
            "warning",
            _this
          );
        } else {
          _this.$public.msg(
            _this.$t("frenchcurrency.tishi2[2]"),
            "warning",
            _this
          );
        }
        return false;
      }

      if (!sessionStorage.account || !sessionStorage.token) {
        _this.$public.confirm(
          _this.$t("frenchcurrency.tishi2[0]"),
          "login",
          _this
        );
        return false;
      }
      //请求个人接口，判断有没有设置交易密码及实名认证和高级认证
      _this.$http
        .post(_this.$http.user_info, {})
        .then(function(response) {
          if (response.data.status == "200") {
            _this.userDataTongji.wallone = response.data.data.wallone;
            if (!response.data.data.tpwd) {
              _this.$public.confirm(
                _this.$t("frenchcurrency.tishi2[3]"),
                "security",
                _this
              );
              return false;
            } else if (response.data.data.pay_list == 0 && type == 2) {
              _this.$public.confirm(
                _this.$t("frenchcurrency.tishi2[4]"),
                "security",
                _this
              );
              return false;
            } else {
              _this.nullData(); //清空数据
              _this.dialogFormVisible = true;
            }
          } else {
            _this.$public.msg(response.data.msg, "warning", _this);
          }
        })
        .catch(function(error) {});
    },
    sell_page(i) {
      var _this = this;
      _this.sell.sell_paging.p = i;
      _this.getShopinfo();
    },
    pmma_page(i) {
      var _this = this;
      _this.pmma.pmma_paging.p = i;
      _this.getShopinfo();
    },
    //数据清空
    nullData() {
      var _this = this;
      _this.form.cny = "";
      _this.form.num = "";
      _this.form.tpwd = "";
    }
  },
  created: function() {
    this.getShopinfo();
  },
  //事件监听函数
  watch: {
    "form.cny": function(val, oval) {
      var _this = this;
      if (_this.num_focus == 1 && _this.cny_focus == 0) {
        //表示正在输入num 则取消cny的监听
        return false;
      } else if (isNaN(val)) {
        //您输入的金额格式有误
        // _this.$public.msg(
        //   _this.$t("frenchcurrency.tishi[0]"),
        //   "warning",
        //   _this
        // );
        _this.form.cny = "";
        return false;
      } else if (
        val.toString().indexOf(".") != -1 &&
        val.split(".")[1].length > 2
      ) {
        //					_this.form.cny = Number(_this.form.cny).toFixed(2);
        if (_this.Sign != 1) return false;
        _this.Sign++;
        //最多保留两个有效数字
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[1]"),
          "warning",
          _this
        );
        setTimeout(function() {
          _this.Sign = 1;
        }, 1500);
        return false;
      }
      //验证全过再进行计算
      _this.form.num = _this.$public
        .Division(_this.form.cny, _this.form.one_price)
        .toFixed(4);
      _this.form.num = Number(_this.form.num) == 0 ? "" : _this.form.num;
    },
    "form.num": function(val, oval) {
      var _this = this;
      if (_this.num_focus == 0 && _this.cny_focus == 1) {
        //表示正在输入cny 则取消num的监听
        return false;
      } else if (isNaN(val)) {
        //您输入的数量格式有误
        // _this.$public.msg(
        //   _this.$t("frenchcurrency.tishi[2]"),
        //   "warning",
        //   _this
        // );
        _this.form.num = "";
        return false;
      } else if (
        val.toString().indexOf(".") != -1 &&
        val.split(".")[1].length > 6
      ) {
        _this.form.num = Number(val).toFixed(6);
        if (_this.Sign != 1) return false;
        _this.Sign++;
        _this.$public.msg(
          _this.$t("frenchcurrency.tishi[3]"),
          "warning",
          _this
        );
        setTimeout(function() {
          _this.Sign = 1;
        }, 1500);
        return false;
      }
      //验证全过再进行计算
      _this.form.cny = _this.$public
        .Multiplication(_this.form.one_price, _this.form.num)
        .toFixed(2);
      _this.form.cny = Number(_this.form.cny) == 0 ? "" : _this.form.cny;
    }
  }
};
</script>