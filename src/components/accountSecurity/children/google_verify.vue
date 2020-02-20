<style lang="less" scoped>
@import "./google_verify.less";
</style>
<template>
  <div class="google_verify">
    <div class="top-tips">
          <p class="title">绑定谷歌验证</p>
          <!-- 谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。 -->
          <p class="tips_content tips_top1">{{$t('Gic.securityGoogleverify[1]')}}</p>
        </div>
    <div class="form_warp">
      <div class="inner">
        <div class="tips">
          <p class="info">
            <span>1</span>
            <!-- 下载谷歌验证器APP -->
            <span>{{$t('Gic.securityGoogleverify[2]')}}</span>
          </p>
          <!-- IOS用户登录App Store搜索“Authenticator”下载 -->
          <p class="airticle tips_content">{{$t('Gic.securityGoogleverify[3]')}}</p>
          <!-- 安卓用户登录应用商店或使用手机浏览器搜索“谷歌验证器”下载 -->
          <p class="airticle tips_content">{{$t('Gic.securityGoogleverify[4]')}}</p>
          <p class="btns">
            <span class="btn">App Store</span>
            <span class="btn2">Google Play</span>
          </p>
        </div>
        <div class="tips">
          <p class="info">
            <span>2</span>
            <!-- 在谷歌验证器中添加密钥并备份 -->
            <span>{{$t('Gic.securityGoogleverify[5]')}}</span>
          </p>
          <!-- 打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。 -->
          <!-- <p class="airticle tips_content">{{$t('googleverify.contentlist[3]')}}</p> -->
          <!-- 密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存 -->
          <p class="airticle tips_content">{{$t('Gic.securityGoogleverify[6]')}}</p>
          <div class="step2">
            <img :src="userData.QrCodeurl" />
            <p>
              <!-- 密钥 -->
              <span class="security">{{$t('Gic.securityGoogleverify[7]')}}</span>
              <br />
              <el-input
                auto-complete="off"
                style="width:200px"
                id="addInput"
                v-model="userData.secretKey"
                readonly
              ></el-input>
              <!-- <input :value="userData.secretKey" ></input> -->
              <!-- 复制 -->
              <span @click="copy('addInput')" class="step2_copy">{{$t('Gic.securityGoogleverify[8]')}}</span>
            </p>
          </div>
        </div>
        <div class="tips">
          <p class="info">
            <span>3</span>
            <!-- 输入谷歌验证器中6位验证码 -->
            <span>{{$t('Gic.securityGoogleverify[9]')}}</span>
          </p>
          <el-form
            :model="userData"
            statu
            ref="userData"
            label-width="100px"
            class="demo-ruleForm tips_google"
            label-position="top"
            style="width:450px;"
          >
            <!-- 谷歌验证码 -->
            <el-form-item :label="$t('Gic.securityGoogleverify[10]')" prop="realname">
              <el-input
                auto-complete="off"
                style="width:450px;margin-left:0;"
                placeholder="请输入6位数谷歌验证码"
                v-model="userData.googleCode"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tips">
          <p class="info">
            <span>4</span>
            <!-- 输入邮箱验证码 -->
            <span>{{$t('Gic.securityGoogleverify[11]')}}</span>
          </p>
          <el-form
            :model="userData"
            statu
            ref="userData"
            label-width="100px"
            class="demo-ruleForm tips_google"
            label-position="top"
            style="width:450px;"
          >
            <!-- 邮箱验证码 -->
            <el-form-item :label="$t('Gic.securityGoogleverify[12]')" prop="realname">
              <el-input
                auto-complete="off"
                :placeholder="$t('Gic.securityGoogleverify[12]')"
                style="width:325px;margin-left:0;"
                v-model="userData.code"
              ></el-input>
              <div class="btn_code" @click="getCode()">
                <el-input type="button" :value='$public.integerDecimal(btnCode.time) ? btnCode.time +" s" : btnCode.time' :disabled='btnCode.disabled' ></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="tips">
          <!-- <p class="info"> -->
          <!-- <span>4</span> -->
          <!-- 输入手机验证码 -->
          <!-- <span>{{$t('googleverify.titlelist[4]')}}</span> -->
          <!-- </p> -->
          <el-form
            :model="userData"
            status-icon
            ref="userData"
            label-width="100px"
            class="demo-ruleForm"
            style="width:450px;"
          >
            <!-- 手机验证码 -->
            <!-- <el-form-item :label="$t('googleverify.list[3]')" prop="realname"> -->
            <!-- <el-input auto-complete="off" style="width:450px" v-model="userData.smsCode"></el-input> -->
            <!-- <span class="send" @click="getCode()" :disabled="btnCode.disabled">{{btnCode.time}}</span> -->
            <!-- <el-button id="send" @click="getCode()" :disabled="btnCode.disabled">{{btnCode.time}}</el-button> -->
            <!-- </el-form-item> -->
            <!-- 绑定 -->
            <el-button type="primary" @click="submitForm()">{{$t('Gic.securityGoogleverify[13]')}}</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      :title="$t('googleverify.titlelist[4]')"
      :before-close="handleClose"
      class="SWSWS"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form>
        <el-input v-model="code" maxlength="10" autocomplete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$router.back()">{{$t('apiEnCn.list6[3]')}}</el-button>
        <el-button type="primary" @click="getQrCode" :loading="LOD">{{$t('apiEnCn.list6[2]')}}</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        QrCodeurl: "", //二维码
        secretKey: "", //密钥
        googleCode: "", //谷歌验证码
        code: "" //短信验证码
      },
      LOD: false,
      btnCode: {
        time: this.$t("changetpwd.list[4]"), //倒计时
        disabled: false
      },
      type: "",
      dialogFormVisible: false
    };
  },
  methods: {
    handleClose(done) {},
    //绑定执行函数
    submitForm() {
      const _this = this;
      if (_this.userData.googleCode == "") {
        // 谷歌验证码不能为空
        _this.$public.msg(_this.$t('Gic.securityGoogleverify[14]'), "warning", _this);
        return false;
      }
      if (_this.userData.code == "") {
        // 邮箱验证码不能为空
        _this.$public.msg(_this.$t('Gic.securityGoogleverify[15]'), "warning", _this);
        return false;
      }
      // if(_this.userData.smsCode==''){
      // 	// 短信验证码不能为空
      // 	_this.$public.msg(_this.$t('googleverify.list[7]'),'warning',_this)
      // 	return false;
      // }
      let _data = {
        google_code: _this.userData.googleCode,
        google_secret: _this.userData.secretKey,
        code:_this.userData.code,
        // type:_this.type
      };
      _this.$http.post(_this.$http.authenticatorBind, _data).then(res => {
        if (res.data.code == "200") {
          _this.$public.msg(_this.$t('Gic.securityChangeopwd[9]'), 'success', _this);
          _this.$router.back();
        } else {
          _this.$public.msg(res.data.msg, "error", _this);
        }
      });
    },
    //获取验证码
    getCode() {
      var _this = this;
      var email = sessionStorage.userData
      if(_this.$public.email(email)){//邮箱登录
        if(!_this.$public.pwd(_this.userData.password_confirmation)) {
          // _this.$public.msg(_this.$t("changetpwd.getCode"), 'warning', _this);//请输入有效的密码
          // return false;
        }
        _this.btnCode.disabled = true;
        _this.$http.post(_this.$http.send_email, {
          email: email
        }).then(function(response) {
          if(response.data.code == "200") {
            // _this.$public.msg(response.data.msg, 'success', _this);
            _this.$public.setTime(_this); //倒计时函数封装
          } else {
            _this.btnCode.disabled = false;
            _this.$public.msg(response.data.msg, 'warning', _this);
          }
        }).catch(function(error) {
          _this.btnCode.disabled = false;
        });

      }
    },
    getQrCode() {
      const _this = this;
      // if (this.code == "") {
      //   _this.$public.msg(
      //     _this.$t("googleverify.titlelist[4]"),
      //     "warning",
      //     _this
      //   );
      //   return false;
      // }
      this.LOD = true;
      _this.$http
        .post(_this.$http.createGoogleSecret, {})
        .then(function(res) {
          if (res.data.code == "200") {
            // _this.$public.msg(res.data.msg, "success", _this);
            _this.userData.QrCodeurl = res.data.data.createSecret.codeurl;
            _this.userData.secretKey = res.data.data.createSecret.secret;
            _this.dialogFormVisible = false;
          } else {
            _this.$public.msg(res.data.msg, "error", _this);
          }
          _this.LOD = false;
        });
    },
    go_back() {
      var _this = this;
      _this.$router.back(); //返回上一层
    },
    copy: function(para) {
      // 复制函数
      var _this = this;
      var ele = document.getElementById(para);
      ele.select();
      document.execCommand("Copy");
      // 复制成功
      _this.$public.msg(_this.$t('Gic.securityGoogleverify[16]'), "success", _this);
    },
    addFocus: function(para) {
      var _this = this;
      var ele = document.getElementById(para);
      ele.setAttribute("disabled", "disabled");
    },
    addOut: function(para) {
      var _this = this;
      var ele = document.getElementById(para);
      ele.removeAttribute("disabled");
    }
  },
  created() {
    this.getQrCode()
    // var _this = this;
    // let user = JSON.parse(sessionStorage.getItem("userData"));
    // _this.$http
    //   .post(_this.$http.sendSms, {
    //     phone: user.phone,
    //     area_code: user.area_code
    //   })
    //   .then(function(response) {
    //     if (response.data.code == "200") {
    //       _this.$public.msg(response.data.msg, "success", _this);
    //     } else {
    //       _this.$public.msg(response.data.msg, "error", _this);
    //     }
    //   })
    //   .catch(function(error) {});
    //_this.getQrCode();	//获取谷歌秘钥
    // _this.userData.mobile = sessionStorage.getItem('mobile');
    // _this.$public.scrollTop(); //返回但最顶部函数
  }
};
</script>

<style>
.SWSWS .el-dialog__title {
  color: #303133 !important;
}
</style>