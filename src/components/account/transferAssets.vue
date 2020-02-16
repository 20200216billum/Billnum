<!--  -->
<template>
  <div class="transfer_wrap">
    <div class="nav">
      <!-- 资产管理 -->

      <span>{{$t("laaccount.title[0]")}}</span> >
      <span>{{$t("laaccount.title[11]")}}</span>
    </div>
    <!-- 划转 *** -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      label-width="100px"
      class="ruleForm"
    >
      <el-dropdown @command="command" style="margin:30px 0 50px 0">
        <span class="el-dropdown-link">
          {{$t("laaccount.title[11]")}} {{curCode.code}}
          <i class="el-icon--right">
            <img style="vertical-align: middle" src="../../assets/img/down.png" alt />
          </i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :command="item.id"
            v-for="(item,index) in rotationCoinList"
            :key="index"
            divided
          >{{item.code}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="item_transfer">
        <!-- 从 -->
        <el-form-item :label="$t('laaccount.other[0]')" prop="formWalletType">
          <el-select v-model="ruleForm.formWalletType" :placeholder="$t('ziChan.list[4]')">
            <el-option value="1" :label="$t('laaccount.title[1]')"></el-option>
            <el-option value="2" :label="$t('laaccount.title[2]')"></el-option>
            <el-option value="3" :label="$t('laaccount.title[3]')"></el-option>
          </el-select>
        </el-form-item>
        <!-- 到 -->
        <el-form-item :label="$t('laaccount.other[1]')" prop="toWalletType">
          <el-select
            :disabled="rotationWallet.length ==0"
            v-model="ruleForm.toWalletType"
            :placeholder="$t('ziChan.list[4]')"
          >
            <el-option
              v-for="(item,index) in rotationWallet"
              :value="item.type"
              :label="item.name"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 划转数量 -->
      <el-form-item :label="$t('laaccount.other[2]')" prop="rotationNum">
        <el-input v-model="ruleForm.rotationNum	" :placeholder="$t('laaccount.other[3]')"></el-input>
        <div class="canUse">{{$t('laaccount.other[4]')}}：{{canUse}}</div>
      </el-form-item>
      <!-- 资金密码 -->
      <el-form-item :label="$t('frenchcurrency.mobile[3]')" prop="payment_password">
        <el-input
          type="password"
          v-model="ruleForm.payment_password"
          :placeholder="$t('frenchorder.mob2[6]')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="submitForm('ruleForm')"
        >{{$t('laaccount.title[11]')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        formWalletType: "1",
        toWalletType: "",
        rotationNum: "",
        payment_password: ""
      },
      rules: {
        rotationNum: [
          {
            required: true,
            message: this.$t("laaccount.other[3]"), //请输入划转数量
            trigger: "blur"
          }
        ],
        payment_password: [
          {
            required: true,
            message: this.$t("tiBit.passtips"), //请输入交易密码
            trigger: "blur"
          }
        ]
      },
      // 当前钱包类型允许划转的钱包类型
      rotationWallet: [],
      // 当前允许的类型可划转的币种列表
      rotationCoinList: [],
      // 当前选择的币种
      curCode: {},
      // 可用余额
      canUse: "--"
    };
  },

  components: {},
  watch: {
    "ruleForm.formWalletType"(n, o) {
      this.getRotationWallet(n);
    },
    "ruleForm.toWalletType"(n, o) {
      this.rotationWalltCoinList(this.ruleForm.formWalletType, n);
    }
  },
  computed: {
    // 现在所有钱包类型
    wallet() {
      var arr = [
        "",
        { name: this.$t("laaccount.title[1]"), type: "1" },
        { name: this.$t("laaccount.title[2]"), type: "2" },
        { name: this.$t("laaccount.title[3]"), type: "3" }
      ];
      return arr;
    }
  },

  created() {
    this.getRotationWallet(this.ruleForm.formWalletType);
  },

  methods: {
    // 根据划转钱包类型得到允划转的钱包类型
    getRotationWallet(type) {
      this.rotationWallet = [];
      this.$http.post(this.$http.getRotationWallet, { type }).then(r => {
        if (r.data.code == 200) {
          var data = r.data.data.toWallet;
          // 返回数据不能直接拿来用 会有中英文问题 so 循环操作下
          for (var i in data) {
            this.rotationWallet.push(this.wallet[data[i].walletType]);
          }
          // 默认选择第一个允许划转钱包
          this.ruleForm.toWalletType = this.rotationWallet[0].type;
          // 获取允许的币种列表
          this.rotationWalltCoinList(
            this.ruleForm.formWalletType,
            this.ruleForm.toWalletType
          );
        } else {
          this.$public.msg(r.data.msg, "error", this);
        }
      });
    },

    // 根据划转钱包和选择的接收钱包 得到允许划转的币种列表
    rotationWalltCoinList(formWalletType, toWalletType) {
      var _this = this;
      this.$http
        .post(this.$http.rotationWalltCoinList, {
          formWalletType,
          toWalletType
        })
        .then(r => {
          if (r.data.code == 200) {
            this.rotationCoinList = r.data.data;
            // 默认第一个
            if (this.$route.query.id) {
              let z = r.data.data.filter(x => {
                if (x.code == _this.$route.query.id) {
                  return x;
                }
              });
              if (z.length == 0) {
                this.curCode = r.data.data[0];
              } else {
                this.curCode = z[0];
              }
            } else {
              this.curCode = r.data.data[0];
            }
            // 请求当前选中code余额
            this.getWalltUsable(formWalletType, this.curCode.id);
          } else {
            this.$public.msg(r.data.msg, "error", this);
          }
        })
        .catch(r => {
          this.$public.msg("服务器错误", "error", this);
        });
    },

    // 根据划转钱包 币种 得到可用余额
    getWalltUsable(formWalletType, id) {
      this.canUse = "--";
      this.$http
        .post(this.$http.getWalltUsable, { formWalletType, id })
        .then(r => {
          if (r.data.code == 200) {
            this.canUse = r.data.data.usable;
          } else {
            this.$public.msg(r.data.msg, "error", this);
          }
        });
    },

    // 选择币种
    command(code) {
      this.curCode = this.rotationCoinList.filter(i => i.id == code)[0];
      // 选择币种时请求，切换钱包时请求 监听curCode切换钱包会请求两次
      this.getWalltUsable(this.ruleForm.formWalletType, this.curCode.id);
    },

    // 立即划转
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 余额不足
          if (Number(this.ruleForm.rotationNum > Number(this.canUse))) {
            this.$public.msg(this.$t("exchangeCoin.main4[1]"), "error", this);
            return false;
          }
          // 余额获取中
          if (this.canUse == "--") {
            this.$public.msg("wait...", "warring", this);
            return false;
          }
          this.loading = true;
          var sendData = {
            ...this.ruleForm
          };
          sendData.payment_password = this.$md5(sendData.payment_password);
          sendData.id = this.curCode.id;
          this.$http
            .post(this.$http.rotation, sendData)
            .then(r => {
              this.loading = false;
              this.ruleForm.payment_password = "";
              this.ruleForm.rotationNum = "";
              if (r.data.code == 200) {
                // 划转成功
                this.$public.msg(
                  this.$t("exchangeCoin.main4[3]"),
                  "success",
                  this
                );
              } else {
                this.$public.msg(r.data.msg, "error", this);
              }
            })
            .catch(r => {
              // 服务器错误
              this.loading = false;
              this.$public.msg("error", "error", this);
            });
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "./transfer.less";
</style>