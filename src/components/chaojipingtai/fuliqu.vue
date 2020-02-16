<style scoped lang="less">
        @import './fuliqu.less';
        @import '../../assets/public.less';
    </style>
     
    <template>
    <div class="fuli">
      <!-- 余额 -->
        <div class="mangeMoney_balance"> 
            <div class="title">
                <h1>{{$t('fuliLA.info[0]')}}</h1>
                <p>{{$t('fuliLA.info[1]')}}</p>
                <p>{{$t('fuliLA.info[2]')}}</p>
            </div>
        </div>
        <!-- 个人信息 -->
        <div class="mangeMoney_price">
            <div class="flex1">
                <div class="flexItem">
                    <div class="item1">
                        <div class="bgImg1">
                            <h1>{{$t('fuliLA.info[3]')}}</h1>
                            <p>{{parseFloat(fuliData.super_handling_fee)}} USDT</p>
                        </div>
                    </div>
                    <div class="item2">
                        <h1>  </h1>
                        <p>  </p>
                        <p class="btnList cjpt" v-if="userData.super_user == 0"><a href="Javascript:;"  @click="showSup">{{$t('fuliLA.info[4]')}}</a></p>
                        <p class="btnList cjpt" v-else><router-link to="/sup?type=sup">{{$t('fuliLA.info[5]')}}</router-link></p>
                    </div>
                </div>
                <div class="flexItem">
                    <div class="item1">
                        <div class="bgImg2">
                            <h1>{{$t('fuliLA.info[0]')}}</h1>
                            <p>{{parseFloat(fuliData.participate_yongshi.total_handling_fee)}} USDT</p>
                        </div>
                    </div>
                    <div class="item2">
                        <h1>{{$t('fuliLA.yongshi[1]')}}: {{parseFloat(fuliData.participate_yongshi.money)}} VT</h1>
                        <p>{{$t('fuliLA.yongshi[2]')}} {{fuliData.participate_yongshi.locked_days}} {{$t('fuliLA.yongshi[3]')}}</p>
                        <!-- <p class="btnList"><a href="Javascript:;">购买超级平台</a></p> -->
                        <p class="btnList"><router-link to="/fenhong?type=1" class="border">{{$t('fuliLA.yongshi[4]')}}</router-link><a href="Javascript:;" @click="open('yongshi')">{{$t('fuliLA.yongshi[5]')}}</a></p>
                    </div>
                </div>
                <div class="flexItem">
                    <div class="item1">
                        <div class="bgImg3">
                            <h1>{{$t('fuliLA.zhizhe[0]')}}</h1>
                            <p>{{parseFloat(fuliData.participate_zhizhe.total_handling_fee)}} USDT</p>
                        </div>
                    </div>
                    <div class="item2">
                        <h1>{{$t('fuliLA.zhizhe[1]')}}: {{parseFloat(fuliData.participate_zhizhe.money)}} VT</h1>
                        <p>{{$t('fuliLA.zhizhe[2]')}} {{fuliData.participate_zhizhe.locked_days}} {{$t('fuliLA.zhizhe[3]')}}</p>
                        <!-- <p class="btnList"><a href="Javascript:;">购买超级平台</a></p> -->
                        <p class="btnList"><router-link to="/fenhong?type=2" class="border">{{$t('fuliLA.zhizhe[4]')}}</router-link><a href="Javascript:;" @click="open('zhizhe')">{{$t('fuliLA.zhizhe[5]')}}</a></p>
                    </div>
                </div>
            </div>
        </div>
<!-- 交易勇士 -->
        <div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="dialogVisible">
            <div class="el-message-box">
                <div class="el-message-box__header">
                    <div class="el-message-box__title">
                        <span class="el-message-box__word">{{$t('fuliLA.dol[0]')}}</span><!--参与交易智者奖池-->
                    </div>
                    <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
                        <i class="el-message-box__close el-icon-close" ></i>
                    </button>
                </div>
                <div class="google">
                    <div>
                        <p>{{$t('fuliLA.dol[2]')}}<span></span></p>
                        <el-input v-model="yongshi.money" auto-complete="off" :placeholder="$t('fuliLA.dol[3]')"></el-input>
                        <p>{{$t('fuliLA.dol[4]')}}</p>
                        <el-input v-model="yongshi.payment_password" type="password" auto-complete="off" :placeholder="$t('fuliLA.dol[5]')"></el-input>
                        <div class="btnList">	
                            <a href="javascript:;" class="quxiao" @click="close_moble()">{{$t('fuliLA.dol[6]')}}</a>
                            <a href="javascript:;" @click="submit1">{{$t('fuliLA.dol[7]')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!-- 交易智者 -->
        <div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="dialogVisible1">
            <div class="el-message-box">
                <div class="el-message-box__header">
                    <div class="el-message-box__title">
                        <span class="el-message-box__word">{{$t('fuliLA.dol[1]')}}</span><!--参与交易智者奖池-->
                    </div>
                    <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
                        <i class="el-message-box__close el-icon-close" ></i>
                    </button>
                </div>
                <div class="google">
                    <div>
                        <p>{{$t('fuliLA.dol[2]')}}<span></span></p>
                        <el-input v-model="zhizhe.money" auto-complete="off" :placeholder="$t('fuliLA.dol[3]')"></el-input>
                        <p>{{$t('fuliLA.dol[4]')}}</p>
                        <el-input type="password" v-model="zhizhe.payment_password" auto-complete="off" :placeholder="$t('fuliLA.dol[5]')"></el-input>
                        <div class="btnList">	
                            <a href="javascript:;" class="quxiao" @click="close_moble()">{{$t('fuliLA.dol[6]')}}</a>
                            <a href="javascript:;" @click="submit2">{{$t('fuliLA.dol[7]')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 购买超级平台 -->
        <div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="dialogVisible2">
            <div class="el-message-box" id="sup">
                <div class="el-message-box__header">
                    <div class="el-message-box__title">
                        <span class="el-message-box__word">{{$t('fuliLA.dol[8]')}}</span><!--添加支付方式-->
                    </div>
                    <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
                        <i class="el-message-box__close el-icon-close" ></i>
                    </button>
                </div>
                <div class="google">
                    <div>
                        <p>{{$t('fuliLA.dol[9]')}}<span  style="float: right">{{$t('fuliLA.dol[10]')}} {{userUSDT}} USDT</span></p>
                        <div class="getcode">
                            <el-input type="password" v-model="payment_password" auto-complete="off" :placeholder="$t('fuliLA.dol[5]')"></el-input>
                        </div>
                        <div class="btnList">	
                            <a href="javascript:;" @click="googleSubmit">{{$t('fuliLA.dol[7]')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
    </template>
    <script>
      export default {
        data() {
            return {
                fuliData:{
                    participate_yongshi:{},
                    participate_zhizhe:{},
                },//首页数据
                userData:{},
                userUSDT:'',
                upgradeSuperUserMoney:'',//升级超级平台所需费用
                yongshi:{
                    type:1,
                    money:'',
                    payment_password:'',
                },
                zhizhe:{
                    type:2,
                    jine:'',
                    payment_password:'',
                },
                payment_password:'',
                dialogVisible:'display:none',
                dialogVisible1:'display:none',
                dialogVisible2:'display:none',
            }
        },
        methods: {
            //获取用户信息
            details(){
                var _this = this;
                _this.$http.get(_this.$http.details,{params:{}}).then(function(res) {
                  if(res.data.code == '200') {
                        _this.userData = res.data.data;
                 }
                })
            },
            //获取用户可用usdt数量
            assetInfo(){
                var _this = this;
                _this.$http.get(_this.$http.assetInfo,{params:{
                    type:3
                }}).then(function(res) {
                  if(res.data.code == '200') {
                    _this.userUSDT = res.data.data.guzhi_usdt;
                 }
                })
            },
            //获取首页数据
            welfareInfo(){
                var _this = this;
                _this.$http.get(_this.$http.welfareInfo, {params:{}}).then(function(res) {
                  if(res.data.code == '200') {
                      _this.fuliData = res.data.data;
                 }
                })
            },
            //参与交易勇士
            submit1(){
                var _this = this;
                _this.yongshi.payment_password = _this.$md5(_this.yongshi.payment_password)
                _this.$http.post(_this.$http.fuli, _this.yongshi).then(function(res) {
                    if(res.data.code == '200') {
                        _this.welfareInfo();
                        _this.$public.msg(_this.$t('fuliLA.tip[0]'),'success',_this)
                        _this.close_moble();
                    }else{
                        _this.$public.msg(res.data.msg,'warning',_this)
                    }
                })
            },
            //参与交易智者
            submit2(){
                var _this = this;
                _this.zhizhe.payment_password = _this.$md5(_this.zhizhe.payment_password)
                _this.$http.post(_this.$http.fuli, _this.zhizhe).then(function(res) {
                    if(res.data.code == '200') {
                        _this.welfareInfo();
                        _this.$public.msg(_this.$t('fuliLA.tip[0]'),'success',_this)
                        _this.close_moble();
                    }else{
                        _this.$public.msg(res.data.msg,'warning',_this)
                    }
                })
            },
            //打开弹框
            open(vla){
                var _this = this;
                if(vla == 'yongshi'){
                    _this.dialogVisible = 'display:block';
                }
                if(vla == 'zhizhe'){
                    _this.dialogVisible1 = 'display:block';
                }
            },
            showSup(){
                var _this = this;
                _this.dialogVisible2 = 'display:block';
            },
            upgradeSuperUser(){
                var _this = this;
                _this.dialogVisible1 = 'display:block'
            },
            googleSubmit(){
                var _this = this;
                if(!_this.payment_password){
                    _this.$public.msg(_this.$t('fuliLA.tip[1]'),'warning',_this);
                    return ;
                }
                _this.$http.post(_this.$http.upgradeSuperUser, {payment_password:_this.$md5(_this.payment_password)}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.$public.msg(_this.$t('fuliLA.tip[2]'),' success',_this);
                        _this.dialogVisible1 = 'display:none';
                        _this.payment_password = '';
                    }else{
                        _this.$public.msg(res.data.msg,'warning',_this);
                    }
                })
            }, 
            //tab切换
            handleClick(tab, event) {
            },
          //点击分页获页数
            current_change1: function(i) {
                var _this = this;
            },
            current_change2: function(i) {
                var _this = this;
            },
            close_moble(){
                var _this = this;
                _this.dialogVisible = 'display:none';
                _this.dialogVisible1 = 'display:none';
                _this.dialogVisible2 = 'display:none';
                _this.payment_password = '';
            },
        },
        mounted () {
            var _this = this;
            _this.welfareInfo();
            _this.assetInfo();
            _this.details();
        }
      };
    </script>