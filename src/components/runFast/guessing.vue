<style lang=less>
    @import '../../assets/public.less';
    @import '../../assets/reset.less';
    @import "./guessing.less";
    @import './style.less';
</style>
<template lang="html">
    <div class="runWrap">
        <asidebar></asidebar>
        <div class="conTent">
            <div class="headerTab">
                <ul class="codeUl">
                    <li class="codeLi" :class="{on:isActive==index}" v-for="(item,index) in codeArr"
                        @click="tabCodeFn(item,index)" :code="item">{{item.toUpperCase()}}</li>
                </ul>
            </div>
            <div class="zuozhuang">
                <!-- 点我坐庄 -->
                <!-- <div class="signimg" @click="zuozhuangFn">
                    <img src="../../assets/img/zuozhuang.png" v-if="islange == 'zh'" alt="">
                    <img src="../../assets/img/zzen.png" v-else alt="">
                </div> -->
                <p class="jiangchi">{{$t("runFast.guess[0]")}}：{{Number(currencynum).toFixed(2)}}{{code.toUpperCase()}}</p>
                <div class="canDiv">
                    <div id="myCanvas"></div>
                    <div class="Jackpot">
                        <p class="multiple" style="display: none;"></p>
                        <p class="explosion" style="display: none;"></p>
                        <p class="Countdown" style="display: none;"></p>
                    </div>
                    <div class="Gobeyond" style="display: none;"></div>
                    <div class="barrage-container-wrap clearfix">
                        <div class="barrage-container"></div>
                    </div>
                    <div class="Burstanimation" style="display: none;">
                        <div></div>
                    </div>
                    <p class="p_">{{$t("runFast.guess[1]")}}</p>
                    <!-- 飞机 -->
                    <img v-if="Number(MultipletypeS)>100 && Singlestate==2 " class="imggif" src="../../assets/img/huojian.gif" alt="">
                </div>
                <!-- 登录后 -->
                <div v-if="Loginstate">
                    <!-- 判断购买状态 -->
                    <div v-if="Purchasestatus">
                        <!-- 等待中 -->
                        <button v-if="Singlestate==1" class="touzhu disbtn">{{$t("runFast.guess[5]")}}</button>
                        <!-- 爆炸了 -->
                        <button v-else-if="Singlestate==3" class="touzhu disbtn">{{$t("runFast.guess[3]")}}</button>
                        <!-- 逃跑 -->
                        <button v-else @click="buttonescape" class="touzhu ">{{redayGo}}{{$t("runFast.guess[4]")}}</button>
                    </div>
                    <div v-else>
                        <button v-if="Singlestate==1" class="touzhu" @click="buttonBets">
                            <span  v-if="!makeanappointment.type">{{$t("runFast.guess[2]")}}</span>
                            <span v-else>{{$t("runFast.guess[5]")}}</span>
                        </button>
                        <!-- 爆炸了 -->
                        <button v-else-if="Singlestate==3&&!makeanappointment.type"
                            class="touzhu disbtn">{{$t("runFast.guess[3]")}}</button>
                        <!-- 等待中 -->
                        <button v-else-if="Singlestate==3&&makeanappointment.type"
                            class="touzhu disbtn">{{$t("runFast.guess[5]")}}</button>
                        <button v-else @click="makeanappoint" class="touzhu">
                            <span v-if="!makeanappointment.type">
                                    <!-- 预约（下一局） -->
                                <span>{{$t("runFast.guess[6]")}}</span>
                            </span>
                                     <!-- 等待中...（取消） -->
                            <span v-else>{{$t("runFast.guess[7]")}}</span>
                        </button>
                    </div>
                </div>
                <div v-else>
                    <button v-if="Singlestate==1" @click="Login" class="touzhu">{{$t("runFast.guess[2]")}}</button>
                    <button v-else-if="Singlestate==3" @click="Login"
                        class="touzhu disbtn">{{$t("runFast.guess[3]")}}</button>
                    <button v-else @click="Login" class="touzhu">{{$t("runFast.guess[6]")}}</button>
                </div>
                <div class="inputWrap">
                    <div class="inpW">
                        <el-form class="el_form" label-position="left" label-width="80px" :model="formItem"
                            ref="formItem">
                            <div class="el_form_item tz">
                                <!-- 投注 -->
                                <el-form-item :label='$t("runFast.guess[2]")'>
                                    <el-input 
                                    type="text" 
                                    class="input" 
                                    v-model="formItem.money" 
                                    @on-blur="earnings"></el-input>
                                </el-form-item>
                                <!-- 倍数 -->
                                <div class="beishu">
                                    <span @click="Doubling('Max')">Max</span>
                                    <span @click="Doubling('Min')">Min</span>
                                    <span @click="Doubling('/2')">/2</span>
                                    <span @click="Doubling('x2')">x2</span>
                                </div>
                            </div>
                            <div class="el_form_item">
                                    <!-- 自动逃跑 -->
                                <el-form-item :label='$t("runFast.guess[22]")'>
                                    <el-input 
                                    type="text" 
                                    class="input" 
                                    v-model="formItem.escape_beishu" 
                                    @on-blur="chance">
                                    </el-input>
                                </el-form-item>
                                <div class="shouyi">
                                    <div>
                                        {{$t("runFast.guess[8]")}}
                                        <span>{{Opportunity.a}}</span>
                                    </div>
                                    <div>
                                        <!-- 机会 -->
                                        {{$t("runFast.guess[9]")}}
                                        <span v-show="formItem.escape_beishu">{{Opportunity.b}}%</span>
                                        <span v-show="!formItem.escape_beishu">--</span>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <!-- 所有竞猜 -->
            <div class="userListWrap">
                <div class="userListCon">
                    <el-tabs class="el_tab" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane :label="$t('runFast.guess[10]')" name="first">
                            <p class="title conmmon">
                                <span style="text-align: left">{{$t('runFast.guess[11]')}}</span>
                                <span>{{$t('runFast.guess[12]')}}</span>
                                <span>{{$t('runFast.guess[13]')}}</span>
                                <span style="text-align: right">{{$t('runFast.guess[14]')}}</span>
                            </p>
                            <ul>
                                <li class="listLi conmmon" v-if="list.length>0" v-for="(item,index) in list"
                                    :key="index">
                                    <span>{{item.realname?item.realname.substr(0,1)+"***":""}}</span>
                                    <!-- 1正常2逃跑3爆炸 -->
                                    <span v-if="item.status == '1'">--</span>
                                    <span class="rise" v-else-if="item.status == '2'">{{item.final_beishu}}X</span>
                                    <span class="fall" v-else>{{item.final_beishu}}X</span>
                                    <span v-if="item.status == '1'">{{formItem.money}}{{item.pid_name}}</span>
                                    <span class="rise"
                                        v-else-if="item.status == '2'">{{formItem.money}}{{item.pid_name}}</span>
                                    <span class="fall" v-else>{{formItem.money}}{{item.pid_name}}</span>
                                    <span v-if="item.status == '1'">--</span>
                                    <span class="rise"
                                        v-else-if="item.status == '2'">{{Number(formItem.money)*Number(item.final_beishu)}}{{item.pid_name}}</span>
                                    <span class="fall" v-else>-{{item.buy_money}}{{item.pid_name}}</span>
                                </li>
                                <p class="nodata" v-if="list.length==0">{{$t('runFast.guess[15]')}}</p>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('runFast.guess[16]')" name="second">
                            <p class="title conmmon">
                                <span>{{$t('runFast.guess[17]')}}</span>
                                <span>{{$t('runFast.guess[18]')}}</span>
                                <span>{{$t('runFast.guess[19]')}}</span>
                                <span>{{$t('runFast.guess[13]')}}</span>
                                <span>{{$t('runFast.guess[14]')}}</span>
                            </p>
                            <ul>
                                <li class="listLi conmmon" v-for="(item,index) in mineJCArr" v-if="mineJCArr.length>0"
                                    :key="index">
                                    <span>{{item.qs}}</span>
                                    <span class="rise" v-if="item.status=='2'">{{item.boomValue}}X</span>
                                    <span class="fall" v-else>{{item.boomValue}}X</span>
                                    <span class="rise" v-if="item.status=='2'">{{item.final_beishu}}X</span>
                                    <span class="fall" v-else>{{item.final_beishu}}X</span>
                                    <span class="rise"
                                        v-if="item.status=='2'">{{$public.parseFloat(item.buy_money)}} {{item.pid_name}}</span>
                                    <span class="fall" v-else>{{$public.parseFloat(item.buy_money)}} {{item.pid_name}}</span>
                                    <span class="rise"
                                        v-if="item.status=='2'">{{$public.parseFloat(item.back_money)}} {{item.pid_name}}</span>
                                    <span class="fall" v-else>{{$public.parseFloat(item.back_money)}} {{item.pid_name}}</span>
                                </li>
                                <p class="nodata" v-if="mineJCArr.length==0">{{$t('runFast.guess[15]')}}</p>
                            </ul>
                            <el-pagination background @current-change="handleCurrentChange1" :current-page.sync="p.pageNum1" layout="prev, pager, next" :page-size="p.size1" :total="p.totalPage1" v-if="mineJCArr.length>0"></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('runFast.guess[23]')" name="third">
                            <p class="title conmmon conmmon3">
                                <span class="w1">{{$t('runFast.guess[17]')}}</span>
                                <span class="w1">{{$t('runFast.guess[20]')}}</span>
                                <span class="w3">{{$t('runFast.guess[21]')}}</span>
                            </p>
                            <ul>
                                <li class="listLi conmmon conmmon3" v-for="(item,index) in mineHistory"
                                    v-if="mineHistory.length>0" :key="index">
                                    <span class="w1">{{item.periodID}}</span>
                                    <span class="w1">{{item.boomValue}}</span>
                                    <span class="w3">{{item.boomHash}}
                                        <i @click="jiaoyan(item)">{{$t('runFast.guess[24]')}}</i>
                                    </span>
                                </li>
                                <p class="nodata" v-if="mineHistory.length==0">
                                    {{$t('runFast.guess[15]')}}</p>
                            </ul>
                            <el-pagination background @current-change="handleCurrentChange2" :current-page.sync="p.pageNum2" layout="prev, pager, next" :page-size="p.size2" :total="p.totalPage2" v-if="mineHistory.length>0"></el-pagination>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <el-dialog class="zhuan" :title="$t('runFast.pop[0]')" :visible.sync="dialogVisible" width="40%">
            <div class="zhuangjia">
                <el-tabs class="el_tab" v-model="zjactive" @tab-click="handleClicktc">
                    <!-- 主页 -->
                    <el-tab-pane :label="$t('runFast.pop[1]')" name="first">
                        <div class="percentageDivWrap">
                            <div class="percentageDiv">
                                <el-progress class="percentage" :width="308" color="#6185E5" :stroke-width="34"
                                    type="circle" :percentage="Number(percentagenum/2)" :show-text="false"></el-progress>
                                <p class="el-progress__text">{{percentagenum}}%</p>
                                <p class="gufen b0">{{$t('runFast.pop[2]')}}</p>
                            </div>
                            <span class="span1 b0">0%</span>
                            <span class="span2 b0">100%</span>
                        </div>
                        <div class="jc">
                            <ul class="jcUl">
                                <li class="jcli flex">
                                    <div class="flex jcliitem jcliitem1">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{bank_money}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[3]')}}</p>
                                        </div>
                                    </div>
                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{bank_money_total}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[4]')}}</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="jcli flex">
                                    <div class="flex jcliitem jcliitem1">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{bank_money_lirun}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[5]')}}</p>
                                        </div>
                                    </div>
                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{bank_money_lirun_total}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[6]')}}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <p class="info" @click="tiaozhuaninfoFn">
                                <img src="../../assets/img/faq.png" alt="">
                                {{$t('runFast.pop[7]')}}
                            </p>
                        </div>
                    </el-tab-pane>
                    <!-- 坐庄 -->
                    <el-tab-pane :label="$t('runFast.pop[8]')" name="second">
                        <div class="plr3">
                            <p class="p_1 flex con_p">
                                <span class="yuan"></span>
                                <span>{{$t('runFast.pop[9]')}}</span>
                            </p>
                            <p class="p_1 flex con_p">
                                <span class="yuan"></span>
                                <span class="spans">{{$t('runFast.pop[10]')}}
                                    {{xishi_rate}}%，{{$t('runFast.pop[11]')}}</span>
                            </p>
                            <p class="con_p con_pye">{{$t('runFast.pop[12]')}}：{{$public.parseFloat(currencynumtotal, '--')}}
                                {{code.toUpperCase()}}</p>
                            <div class="flex flexss">
                                <el-input type="number" v-model="inputyue" :placeholder="$t('runFast.pop[13]')"
                                    @input="blurFn">
                                </el-input>
                                <span class="cspan">{{code.toUpperCase()}}</span>
                                <el-button type="primary" @click="zhurutiqu">{{$t('runFast.pop[14]')}}</el-button>
                            </div>
                            <ul class="zzUL">
                                <li class="jcli flex">
                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{percentagenum}}%</p>
                                            <p class="p2">{{$t('runFast.pop[15]')}}</p>
                                        </div>
                                    </div>
                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{yougufen?yougufen+'%':'--'}}</p>
                                            <p class="p2">{{$t('runFast.pop[17]')}}</p>
                                        </div>
                                    </div>
                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{youmoney?youmoney:'--'}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[19]')}}</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="jcli flex">

                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{bank_money}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[18]')}}</p>
                                        </div>
                                    </div>
                                    <div class="flex jcliitem">
                                        <span class="yuan"></span>
                                        <div>
                                            <p class="p1">{{xishi_fee}} {{code.toUpperCase()}}</p>
                                            <p class="p2">{{$t('runFast.pop[16]')}}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <p class="info" @click="tiaozhuaninfoFn">
                                <img src="../../assets/img/faq.png" alt="">
                                {{$t('runFast.pop[7]')}}
                            </p>
                        </div>
                    </el-tab-pane>
                    <!-- 历史 -->
                    <el-tab-pane :label="$t('runFast.pop[33]')" name="third">
                        <div class="plr3">
                            <p class="history title conmmon">
                                <span>{{$t('runFast.pop[20]')}}</span>
                                <span>{{$t('runFast.pop[21]')}}</span>
                                <span>{{$t('runFast.pop[22]')}}</span>
                            </p>
                            <ul>
                                <li class="listLi conmmon" v-for="(item,index) in historyArr" :key="index"
                                    v-if="historyArr.length>0">
                                    <span class="rise" v-if="item.type=='1'">{{$t('runFast.pop[23]')}}</span>
                                    <span class="fall" v-else>{{$t('runFast.pop[24]')}}</span>
                                    <span class="rise" v-if="Number(item.money)>0">{{$public.parseFloat(item.money)}}</span>
                                    <span class="fall" v-else>-{{$public.parseFloat(item.money)}}</span>
                                    <span>{{$public.timestampToTime(item.add_time)}}</span>
                                </li>
                                <p class="nodata" v-if="historyArr.length==0">{{$t('runFast.guess[15]')}}</p>
                            </ul>
                            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pageNum"
                                layout="prev, pager, next" :page-size="size" :total="totalPage"
                                v-if="historyArr.length>0">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
        <div id="petalbox"></div>
    </div>
</template>
<script>
    import asidebar from "./asidebar.vue";
    export default {
        data() {
            return {
                handle: null,
                isActive: 0,
                redayGo:'',
                codeArr: [],
                code: "USDT",//币种
                formItem: {//投注下单
                    money: "",
                    escape_beishu: ""
                },
                makeanappointment: {//预约下单
                    currency: "",
                    money: '1',
                    escape_beishu: "100",
                    type: false,//预约下局的状态
                },
                activeName: "first",
                dialogVisible: false,
                inputyue: "",
                page: 1,
                size: 10,
                mainDataPushTimer:null,
                mineJCArr: [],
                mineHistory: [],
                zjactive: "first",
                // 绘图
                Loginstate: false, //登录状态
                myChart: "",
                MainData: "",//推送
                isopen: true,
                TaoChronicle: null,//40ms绘制一次的定时器
                Singlestate: 1,//true是投注false是逃跑
                Pushstate: true, //判断推送状态
                isduankai: true,//检测是否是断开链接
                Purchasestatus: false, //判断购买状态
                isyuyue: false,//是否预约
                echartsdata: [
                    [0, 1]
                ],
                currencynumtotal: "",//钱包余额
                currencynum: "0",//奖池币种数量
                currency: "",//币种类型
                requestdata: null,//划线定时器
                isduankaitimer: null,//检测是否断开链接的计时器
                publictime: '', //公用定时器
                list: [],//所有竞猜
                Opportunity: {
                    a: "100",
                    b: "100",
                },
                currencyinfozhong: {},//购买限制条件
                //主页
                bank_money: "",
                bank_money_lirun: "",
                bank_money_total: "",
                bank_money_lirun_total: "",
                percentagenum: 0,
                historyArr: [],
                xishi_rate: "",
                yougufen: "",
                youmoney: "",
                gufen: "",
                MultipletypeS: null,
                islange: "zh",
                pageNum: 1,
                size: 10,
                totalPage: null,
                xishi_fee: 0,
                p:{
                    pageNum1: 1,
                    size1: 10,
                    totalPage1: null,
                    pageNum2: 1,
                    size2:15,
                    totalPage2: null,
                }
            }
        },
        watch: {
            'code': function (val, oval) {
                var _this = this;
                // window.localStorage.Currencytype = 'cny';
                switch (val) {
                    case 'USDT':
                        _this.currency = "USDT";
                        _this.formItem.money = _this.currencyinfozhong.USDT_buy_min_money;
                        _this.formItem.escape_beishu = _this.currencyinfozhong.USDT_escape_beishu;
                        break;
                    case 'SOP':
                        _this.currency = "SOP";
                        _this.formItem.money = _this.currencyinfozhong.SOP_buy_min_money;
                        _this.formItem.escape_beishu = _this.currencyinfozhong.SOP_escape_beishu;
                        break;
                    case 'CNB':
                        _this.currency = "CNB";
                        _this.formItem.money = _this.currencyinfozhong.CNB_buy_min_money;
                        _this.formItem.escape_beishu = _this.currencyinfozhong.CNB_escape_beishu;
                        break;
                    case 'VT':
                        _this.currency = "VT";
                        _this.formItem.money = _this.currencyinfozhong.VT_buy_min_money;
                        _this.formItem.escape_beishu = _this.currencyinfozhong.VT_escape_beishu;
                        break;
                };
            },
            'formItem.money': function (val, oval) {
                var _this = this;
                if(_this.formItem.money.toString().indexOf(".")!==-1){
                    var n = _this.formItem.money.toString().split(".")[1].length;
                    if(n>4){
                        _this.formItem.money = Number(_this.formItem.money).toFixed(4);
                    }
                }
                _this.Opportunity.a = _this.$public.Multiplication(val, Number(_this.formItem.escape_beishu));
            },
            'formItem.escape_beishu': function (val, oval) {
                var _this = this;
                _this.Opportunity.a = _this.$public.Multiplication(val, Number(_this.formItem.money));
                _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
            }
        },
        methods: {
            tiaozhuaninfoFn() {
                var _this = this;
                _this.$router.push({ path: "/faq", query: { id: '1' } });
            },
            // 切换顶部币种
            tabCodeFn(item, index) {
                var _this = this;
                _this.isActive = index;
                _this.code = item;
            },
            // 竞猜切换
            handleClick() {
                var _this = this;
                this.p.pageNum1 = 1
                this.p.pageNum2 = 1
                this.p.pageNum3 = 1
                switch (_this.activeName) {
                    case "first":
                        break;
                    case "second":
                        _this.getMineJingCai(1);
                        break;
                    case "third":
                        _this.Historicalrecords(1);
                        break;
                }
            },
            // 我的竞猜
            getMineJingCai(i) {
                var _this = this;
                _this.$http.post(_this.$http.myquiz, { page: i, size: _this.p.size1 }).then(function (res) {
                    if (res.data.code == "200") {
                        if (res.data.data.list) {
                            _this.mineJCArr = res.data.data.list;
                            // _this.p.totalPage1 = Number(Number(res.data.data.count_page)*_this.p.size1);
                            _this.p.totalPage1 = Number(Number(res.data.data.count));
                        } else {
                            _this.mineJCArr = [];
                        }
                    } else {
                    }
                }).catch(function (error) { console.log(error) });
            },
            // 开奖历史
            Historicalrecords(i) {
                var _this = this;
                // $.post(_this.$http.lottery, { page: i, size: _this.p.size2 }).then(function (res) {
                //     if (res.status == "200") {
                //         _this.mineHistory = res.data.list;
                //         // _this.p.totalPage2 = Number(res.data.count_page*_this.p.size2);
                //         _this.p.totalPage2 = Number(res.data.count);
                //     }
                // });
                if(!sessionStorage.token){
                    return false
                }
                this.$http.post(this.$http.lottery, {page: i, size: _this.p.size2} ).then((r)=>{
                    if(r.data.code == 200){ 
                        _this.mineHistory = r.data.data.list;
                        // _this.p.totalPage2 = Number(res.data.count_page*_this.p.size2);
                        _this.p.totalPage2 = Number(r.data.data.count_page);
                    }else{ 
                        this.$public.msg(r.data.msg,'error',this)
                    }
                })
            },
            //校验
            jiaoyan(item){
                var _this = this;
                if(!_this.Loginstate){
                    _this.$confirm(_this.$t("runFast.login[0]"), _this.$t("bibi.other[6]"), {
						confirmButtonText: _this.$t('loginLA[6]'),
						cancelButtonText:_this.$t('securityLa.shoujiYZ[9]'),
						type: "warning"
					}).then(() => {
						sessionStorage.clear();
						_this.$public.go("login", 100, _this);
					}).catch(() => { });
					return false;
                }
                _this.$router.push({path:"/jiaoyan",query:{"hash":item.boomHash}});
            },
            // 点我坐庄
            zuozhuangFn() {
                var _this = this;
                // if (_this.Loginstate) {
                //     _this.dialogVisible = true;
                //     _this.zjactive = "first";
                //     _this.getBanker_pool();
                //     _this.getdata();
                // } else {
                //     _this.Login();
                // }

                    _this.dialogVisible = true;
                    _this.zjactive = "first";
                    _this.getBanker_pool();
                    _this.getdata();
            },
            //获取币种
            getCode() {
                var _this = this;
                _this.$http.post(_this.$http.currency, {}).then(function (res) {
                    if (res.data.code == "200") {
                        for (var i in res.data.data) {
                            _this.codeArr.push(res.data.data[i].code);
                            
                        }
                    }
                }).catch(function (error) {
                })
            },
            // 弹窗里的切换
            handleClicktc() {
                var _this = this;
                switch (_this.zjactive) {
                    case "first":
                        _this.getBanker_pool();
                        break;
                    case "second":
                        _this.inputyue = "";
                        _this.yougufen = "--";
                        _this.youmoney = "--";
                        _this.xishi_fee = "--";
                        break;
                    case "third":
                        _this.pageNum = 1;
                        _this.getbanker_history(_this.pageNum);
                        break;
                }
            },
            // 弹窗
            // 主页
            getBanker_pool() {
                var _this = this;
                _this.$http.post(_this.$http.Banker_pool, { money_type: _this.code.toLowerCase() }).then(function (res) {
                    if (res.data.code == "200") {
                        _this.bank_money = res.data.data.bank_money;
                        _this.bank_money_lirun = res.data.data.bank_money_lirun;
                        _this.bank_money_total = res.data.data.bank_money_total;
                        _this.bank_money_lirun_total = res.data.data.bank_money_lirun_total;
                        _this.percentagenum = _this.$public.Multiplication(Number(res.data.data.scale),100).toFixed(2);

                    }
                }).catch(function () { });
            },
            blurFn() {
                var _this = this;
                if (!_this.inputyue) {
                    // _this.$public.msg("请输入金额", 'warning', _this);
                    return false;
                } else {
                    _this.xishi_fee = _this.$public.Division(_this.$public.Multiplication(Number(_this.inputyue), Number(_this.xishi_rate)), 100).toFixed(2);
                    _this.yougufen = _this.$public.Multiplication(_this.$public.Division(_this.$public.Addition(Number(_this.inputyue), Number(_this.bank_money)), _this.$public.Addition(Number(_this.inputyue), Number(_this.currencynum))), 100).toFixed(4);
                    _this.youmoney = _this.$public.Addition(_this.$public.Subtraction(Number(_this.inputyue), Number(_this.xishi_fee)), Number(_this.bank_money)).toFixed(4);
                    // _this.inputyue = "";
                }
            },
            // 计算注入后的股份等
            computedZhuru() {

            },
            // 投注抽取
            zhurutiqu() {
                var _this = this;
                if (!_this.inputyue) {
                    _this.$public.msg(_this.$t("runFast.pop[13]"), 'warning', _this);
                    return false;
                }
                _this.$http.post(_this.$http.bank_op_post, { money_type: _this.code, money: _this.inputyue }).then(function (res) {
                    if (res.data.code == "200") {
                        _this.getdata()
                        _this.getBanker_pool()
                        _this.$public.msg(res.data.msg, 'success', _this);
                        _this.xishi_fee = _this.$public.Division(_this.$public.Multiplication(Number(_this.inputyue), Number(_this.xishi_rate)), 100).toFixed(2);
                        _this.yougufen = _this.$public.Multiplication(_this.$public.Division(_this.$public.Addition(Number(_this.inputyue), Number(_this.bank_money)), _this.$public.Addition(Number(_this.inputyue), Number(_this.currencynum))), 100).toFixed(4);
                        _this.youmoney = _this.$public.Addition(_this.$public.Subtraction(Number(_this.inputyue), Number(_this.xishi_fee)), Number(_this.bank_money)).toFixed(4);
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                    _this.inputyue = "";
                }).catch(function () { });
            },
            // 历史
            getbanker_history(i) {
                var _this = this;
                _this.$http.post(_this.$http.banker_history, { money_type: _this.code, page: _this.pageNum }).then(function (res) {
                    if (res.data.code == "200") {
                        if (res.data.data.list) {
                            _this.historyArr = res.data.data.list;
                            // _this.totalPage = Number(res.data.data.count_page * _this.size);
                            _this.totalPage = Number(res.data.data.count);
                        } else {
                            _this.historyArr = [];
                        }
                    }
                }).catch(function () { });
            },
            // 历史分页
            handleCurrentChange(i) {
                var _this = this;
                _this.getbanker_history(i);
            },
            // 分页
            handleCurrentChange1(i) {
                var _this = this;
                _this.getMineJingCai(i);
            },
            handleCurrentChange2(i){
                var _this = this;
                _this.Historicalrecords(i);
            },
            buttonescape() {//逃跑
                var _this = this;
                _this.$http.post(_this.$http.order_escape_post).then(function (response) {
                    if (response.data.code == "200") {
                        _this.$public.msg(_this.$t("runFast.pop[25]"), 'warning', _this);
                        _this.Purchasestatus = false;
                        _this.Singlestate = "2";
                        _this.makeanappointment.type = false;
                        // $('button.touzhu')[0].innerHTML = "预约（下一局）";
                    } else {
                        _this.$public.msg(response.data.msg, 'warning', _this);
                    }
                }).catch(function (error) { });
            },
            // 个人中心接口
            getdata() {
                var _this = this;
                let account = sessionStorage.account;
                let token = sessionStorage.token;
                if (account || token) {
                    _this.Loginstate = true;
                    _this.$http.post(_this.$http.get_game_list, {}).then(function (res) {
                        if (res.data.code == "200") {
                            var usdtMoney = res.data.data.filter((item)=>item.name == 'USDT')[0]
                            var sopMoney = res.data.data.filter((item)=>item.name == 'SOP')[0]
                            var cnbMoney = res.data.data.filter((item)=>item.name == 'CNB')[0]
                            var vtMoney = res.data.data.filter((item)=>item.name == 'VT')[0]
                            // window.sessionStorage.USDT_game_money = res.data.data.cnb_game_money;
                            // window.sessionStorage.usdt_game_money = res.data.data.usdt_game_money;
                            // window.sessionStorage.usdt_game_money = res.data.data.usdt_game_money;
                            // window.sessionStorage.sop_game_money = res.data.data.sop_game_money;
                            // window.sessionStorage.eos_game_money = res.data.data.eos_game_money;
                            switch (_this.code) {
                                case "USDT":
                                    _this.currencynumtotal = usdtMoney==undefined? 0 : usdtMoney.usable
                                    break;
                                case "SOP":
                                    _this.currencynumtotal = sopMoney==undefined? 0 : sopMoney.usable
                                    break;
                                case "CNB":
                                    _this.currencynumtotal = cnbMoney==undefined? 0 : cnbMoney.usable
                                    break;
                                case "VT":
                                    _this.currencynumtotal = vtMoney==undefined? 0 : vtMoney.usable
                                    break;
                            }
                        }
                    }).catch(function (error) { });
                }
            },
            //登录
            Login() {
                var _this = this;
                _this.$confirm(_this.$t("runFast.login[0]"), _this.$t("bibi.other[6]"), {
						confirmButtonText: _this.$t('loginLA[6]'),
						cancelButtonText:_this.$t('securityLa.shoujiYZ[9]'),
						type: "warning"
					}).then(() => {
						sessionStorage.clear();
						_this.$public.go("login", 100, _this);
					}).catch(() => { });
                return false;
            },

            MainDatapushh() { //Highcharts推送
                var connet = this,
                    explosiontime = 0,//游戏开始时间每40s加一次
                    explosiontimetype = 0,
                    multipletime = 6000,//游戏开始倒计时
                    multipletimetype, k, timex, timey, Explosioneffecttype = true,
                    Multipletype;
                var multiple = $(".Jackpot .multiple")[0];
                var explosion = $(".Jackpot .explosion")[0];
                var Countdown = $(".Jackpot .Countdown")[0];
                var escape = $(".Underline .escape")[0];
                var Gobeyond = $('.Gobeyond')[0];
                var Burstanimation = $('.Burstanimation')[0];
                var percent1 = 0,
                    percent2;
                // 首先判断是否 支持 WebSocket
                if ('WebSocket' in window) {
                    connet.MainData = new WebSocket(connet.$http.secrurl);
                } else if ('MozWebSocket' in window) {
                    connet.MainData = new MozWebSocket(connet.$http.secrurl);
                } else {
                    connet.MainData = new SockJS(connet.$http.secrurl);
                }
                // 打开时
                connet.MainData.onopen = function (evnt) {
                    var msg = {
                        op: "look"
                    };
                    // 发送消息
                    connet.MainData.send(JSON.stringify(msg));
                };
                // 处理消息时
                connet.MainData.onmessage = function (evnt) {
                    if(connet.$route.path != '/guessing'){
                        connet.MainData.close()
                        return false
                    }
                    var datanum = JSON.parse(evnt.data);
                    // switch (datanum.status) {
                    //     case 1:
                    //         for (var k = 0, length3 = datanum.data[1].xiazhu_list.length; k < length3; k++) {
                    //             if (datanum.data[1].xiazhu_list[k].account == connet.account) {
                    //                 if (connet.Purchasestatus) { } else {
                    //                     connet.Purchasestatus = true;
                    //                     connet.formItem.type = true;
                    //                     connet.Multiple = Number(datanum.data[1].xiazhu_list[k].buy_money);
                    //                 };
                    //             };
                    //         };
                    //         break;
                    //     case 2:
                    //         for (var k = 0, length3 = datanum.data[1].xiazhu_list.length; k < length3; k++) {
                    //             if (datanum.data[1].xiazhu_list[k].account == connet.account) {
                    //                 if (connet.Purchasestatus) { } else {
                    //                     connet.Purchasestatus = true;
                    //                     connet.formItem.type = false;
                    //                     connet.Multiple = Number(datanum.data[1].xiazhu_list[k].buy_money);
                    //                 };
                    //             };
                    //         };
                    //         break;
                    // }
                    switch (datanum.status) {
                        case 1:
                            if (sessionStorage.getItem('yuyue')) {
                                connet.yuyuexiazhu();
                            }
                            connet.echartsdata = [
                                [0, 1]
                            ];
                            explosiontime = 0;
                            multipletime = datanum.data[0].prepare.st - datanum.back_time;
                            connet.Pushstate = false;
                            Countdown.style.display = "block";
                            multiple.style.display = "none";
                            explosion.style.display = "none";
                            Gobeyond.style.display = "none";
                            connet.Singlestate = 1;
                            switch (connet.code) {
                                case 'USDT':
                                    connet.currencynum = datanum.data[0].prepare.start_usdt_pool_money;
                                    break;
                                case 'SOP':
                                    connet.currencynum = datanum.data[0].prepare.start_sop_pool_money;
                                    break;
                                case 'CNB':
                                    connet.currencynum = datanum.data[0].prepare.start_cnb_pool_money;
                                    break;
                                case 'VT':
                                    connet.currencynum = datanum.data[0].prepare.start_vt_pool_money;
                                    break;
                            };
                            if (connet.makeanappointment.type) {
                                var senddata = {
                                    type: connet.code,
                                    money: connet.makeanappointment.money,
                                    escape_beishu: connet.makeanappointment.escape_beishu,
                                }
                                connet.Purchasestatus = true;
                                connet.$http.post(connet.$http.order_add_post, senddata).then(function (res) {
                                    if (res.data.code == "200") {
                                        connet.$public.msg(res.data.msg, 'success', connet);
                                        connet.getdata();
                                        connet.Purchasestatus = true;
                                    } else {
                                        connet.Purchasestatus = false;
                                        connet.$public.msg(res.data.msg, 'warning', connet);
                                    }
                                }).catch(function (error) { });
                                connet.makeanappointment.type = false;
                            };
                            connet.requestdatacountdown();
                            clearTimeout(connet.requestdata);
                            connet.requestdata = window.setTimeout(function () {
                                connet.Historicalrecords();
                                connet.myChart.xAxis[0].setExtremes(0, 10, true, true);
                                connet.myChart.yAxis[0].setExtremes(1, 2, true, true);
                                connet.myChart.update({
                                    series: [{
                                        data: [
                                            [0, 1]
                                        ]
                                    }]
                                });
                                explosiontimetype = 300;
                            }, 600);
                            break;
                        case 2:
                            connet.isduankai = true;
                            clearTimeout(connet.isduankaitimer);
                            connet.isduankaitimer = setTimeout(function () {
                                connet.isduankai = false;
                            }, 2000)
                            explosiontime = datanum.data[0].process.e;
                            var arrayshuju = [
                                [0, 1]
                            ];
                            if (connet.Singlestate == 1) {
                                k = 0;
                                while (k < datanum.data[0].process.e) {
                                    k += 300;
                                    arrayshuju.push([k / 1000, Number(getbeishu(k))]);
                                };
                                connet.myChart.update({
                                    series: [{
                                        data: arrayshuju,
                                    }]
                                })
                            };
                            timex = (datanum.data[0].process.e / 1000).toFixed('4');
                            timey = Number(getbeishu(datanum.data[0].process.e)).toFixed('2');
                            if (connet.isopen) {
                                setTimeout(function () {
                                    // 一下是消耗内存最严重的地方，大量数据绘图，会导致页面卡死
                                    if (timex > 10) {
                                        connet.myChart.xAxis[0].setExtremes(0, timex, true, true);
                                    };
                                    if (timey > 2) {
                                        connet.myChart.yAxis[0].setExtremes(1, Math.ceil(timey), true, true);
                                    };
                                    connet.myChart.series[0].addPoint([Number(timex), Number(timey)]);
                                }, 50)
                            }
                            switch (connet.code) {
                                case 'USDT':
                                    connet.currencynum = datanum.data[0].process.start_usdt_pool_money;
                                    break;
                                case 'SOP':
                                    connet.currencynum = datanum.data[0].process.start_sop_pool_money;
                                    break;
                                case 'CNB':
                                    connet.currencynum = datanum.data[0].process.start_cnb_pool_money;
                                    break;
                                case 'VT':
                                    connet.currencynum = datanum.data[0].process.start_vt_pool_money;
                                    break;
                            };
                            if (timey > 100) {
                                Gobeyond.style.display = "block";
                            };
                            connet.Pushstate = true;
                            multiple.style.display = "block";
                            explosion.style.display = "none";
                            Countdown.style.display = "none";
                            connet.Singlestate = 2;
                            Explosioneffecttype = true;
                            for (var i = 0; i < datanum.data[2].escape_list.length; i++) {
                                // 弹幕
                                var realName = datanum.data[2].escape_list[i].realname ? datanum.data[2].escape_list[i].realname : "--"
                                connet.$barrage.Method(realName + " @ " + datanum.data[2].escape_list[i].final_beishu)
                            };
                            break;
                        case 3://游戏结束爆炸
                            timex = datanum.data[0].crash.e;
                            timey = getbeishu(datanum.data[0].crash.e);
                            connet.echartsdata = [[0, 1]];
                            if (connet.myChart.series) {
                                connet.myChart.series[0].setData([0, 1]);
                                connet.myChart.series[0].addPoint([0, 1]);
                            }
                            connet.Pushstate = false;
                            connet.Purchasestatus = false;
                            switch (connet.code) {
                                
                                case 'USDT':
                                    connet.currencynum = datanum.data[0].crash.start_usdt_pool_money;
                                    break;
                                case 'SOP':
                                    connet.currencynum = datanum.data[0].crash.start_sop_pool_money;
                                    break;
                                case 'CNB':
                                    connet.currencynum = datanum.data[0].crash.start_cnb_pool_money;
                                    break;
                                case 'VT':
                                    connet.currencynum = datanum.data[0].crash.start_vt_pool_money;
                                    break;
                            };
                            if (Explosioneffecttype) {
                                connet.$explosioneffect.effect();
                                window.setTimeout(function () {
                                    connet.getdata();
                                }, 3000);
                            };
                            try{
                                Explosioneffecttype = false;
                                explosion.style.display = "block";
                                explosion.innerHTML = connet.$t("runFast.guess[3]") + '<span>' + datanum.data[0].crash.boomValue + 'X</span>';
                                multiple.style.display = "none";
                                Countdown.style.display = "none";
                                Gobeyond.style.display = "none";
                                connet.Singlestate = 3;
                            }catch(r){

                            }

                            break;
                            // connet.$barrage.Method(""); 
                    }
                    connet.list = datanum.data[1].xiazhu_list;
                };
                connet.handle = function (event) {
                    switch (connet.MainData.readyState) {
                        case 0://表示正在连接
                            Countdown.style.display = "block";
                            Countdown.innerHTML = connet.$t("runFast.pop[29]");
                            multiple.style.display = "none";
                            explosion.style.display = "none";
                            break;
                        case 1://连接成功
                            if (connet.isopen) { // 当切换到后台，不在进行创建图表
                                try{
                                    connet.drawLineHigh();
                                }catch(r){
                                }
                                connet.TaoChronicle = window.setInterval(function () {
                                    if(connet.$route.path!=='/guessing'){
                                        window.clearInterval(connet.TaoChronicle)
                                        return false
                                    }
                                    if (connet.Singlestate === 1) {
                                        multipletime = multipletime - 40;
                                        if (multipletime > 0) {
                                            Countdown.innerHTML = connet.$t("runFast.pop[30]") + connet.$public.toDecimal1((multipletime) / 1000) + 's';
                                        } else {
                                            Countdown.innerHTML = connet.$t("runFast.pop[30]") + '0s';
                                            if (connet.myChart.series) {
                                                connet.myChart.series[0].setData([0, 1]);
                                                connet.myChart.series[0].addPoint([0, 1]);
                                            }
                                        }
                                    } else {
                                        if (connet.Pushstate && connet.isduankai) {
                                            if (explosiontime < "4000") {
                                                explosiontime += 40;
                                            } else if (explosiontime < "8000") {
                                                explosiontime += 30;
                                            } else {
                                                explosiontime += 20;
                                            }

                                            Multipletype = Number(getbeishu(explosiontime)).toFixed("2");
                                            if (Multipletype > Number(connet.formItem.escape_beishu)) {
                                                if (connet.Purchasestatus) {
                                                    connet.Pushstate = false;
                                                    connet.Purchasestatus = false;
                                                };
                                            };
                                            multiple.innerHTML = Multipletype + 'X';
                                            connet.MultipletypeS = Multipletype;
                                            connet.redayGo = Multipletype + 'X ';
                                        };
                                    }
                                }, 40);
                            }
                            break;
                        case 2://连接正在关闭
                            connet.MultipletypeS = null;
                            Countdown.style.display = "block";
                            Countdown.innerHTML = connet.$t("runFast.pop[31]");
                            multiple.style.display = "none";
                            explosion.style.display = "none";
                            clearInterval(connet.TaoChronicle);
                            break;
                        case 3://连接已经关闭，连接失败
                            connet.MultipletypeS = null;
                            Countdown.style.display = "block";
                            Countdown.innerHTML = connet.$t("runFast.pop[32]");
                            multiple.style.display = "none";
                            explosion.style.display = "none";
                            clearInterval(connet.TaoChronicle);
                            break;
                        default:
                            break;
                    }
                }
                connet.MainData.addEventListener('open', connet.handle
                );
                connet.MainData.onerror = function (evnt) {
                };
                connet.MainData.onclose = function (evnt) {
                    if(connet.$route.path!=='/guessing'){
                        return 
                    }
                    Countdown.style.display = "block";
                    Countdown.innerHTML = connet.$t("runFast.pop[32]");
                    multiple.style.display = "none";
                    explosion.style.display = "none";
                    clearInterval(connet.TaoChronicle);
                    connet.MainDatapushh();
                };
                function getbeishu(x) {
                    var a = 1.0716; //需要和workman配置一致
                    x = x / 1000;
                    var y = Math.pow(a, x);
                    y = y.toFixed('2');
                    if (y < 1.01) {
                        y = 1.01;
                    };
                    return y;
                };
            },
            drawLineHigh() { //Highcharts绘图
                var _this = this;
                var _data = [
                    [0, 1]
                ];
                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });
                if (!_this.$cookies.get('changeBg') || _this.$cookies.get('changeBg') == 'night') {
                    var bg = "#fff";
                    var bgimg = require("../../assets/img/run_bg.png");
                } else {
                    var bg = "#666";
                    var bgimg = require("../../assets/img/tp-bgimg.png");
                }
                var options = {
                    chart: {
                        type: 'spline',
                        backgroundColor: 'rgba(0,0,0,0)',
                        plotBackgroundImage: bgimg,
                        events: {
                            load: function () { },
                        },
                    },
                    rangeSelector: {
                        selected: 0
                    },
                    title: {
                        text: null,
                        useHTML: true,
                    },
                    tooltip: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false, //是否启用导出模块
                    },
                    series: [{
                        data: _data,
                        color: "#e94256" //画图线条颜色
                    }],
                    xAxis: {
                        title: null,
                        lineWidth: 2, //设置坐标宽度
                        // floor: 0,//自动计算坐标轴极值的下限
                        lineColor: bg,
                        gridLineWidth: 0,
                        min: 0,
                        tickColor: bg,
                        labels: {
                            enabled: true,
                            step: 1,
                            style: {
                                color: bg
                            }
                        }
                    },
                    yAxis: {
                        title: null,
                        // floor: 1,//自动计算坐标轴极值的下限
                        lineWidth: 2,
                        lineColor: bg,
                        gridLineWidth: 0,
                        max: 2,
                        min: 1,
                        labels: {
                            enabled: true,
                            step: 1,
                            format: '{value} X',
                            style: {
                                color: bg
                            }
                        },
                        tickPositioner: function () {
                            var maxdata = this.max,
                                getidata = 0;
                            if (maxdata % 2 == 0) {
                                getidata = Math.ceil((maxdata - 1) / 4).toFixed("1");
                                return [1, 1 + 1 * getidata, 1 + 2 * getidata, 1 + 3 * getidata, maxdata];
                            } else {
                                getidata = ((maxdata - 1) / 3).toFixed("1");
                                return [1, 1 + 1 * getidata, 1 + 2 * getidata, maxdata];
                            };
                        }
                    },
                    legend: { //清除下部的图例
                        enabled: false,
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                fillColor: 'transparent',
                                lineWidth: 0,
                                lineColor: null // inherit from series
                            },
                            states: { //清除鼠标移动事件
                                hover: {
                                    enabled: false
                                }
                            }
                        }
                    },
                    credits: { //是否显示版权信息
                        enabled: false
                    },
                };
                _this.myChart = Highcharts.chart('myCanvas', options);
                _this.myChart.xAxis[0].setExtremes(0, 10, true, true);
                _this.myChart.yAxis[0].setExtremes(1, 10, true, true);
            },
            requestdatacountdown() {//检测推送关闭状态
                let _this = this;
                clearTimeout(_this.publictime);
                _this.publictime = window.setTimeout(function () {
                    // _this.MainData.close();
                }, 600);
            },
            // 投注
            buttonBets() {
                var _this = this;
                if (!_this.formItem.money) {
                    _this.$public.msg(_this.$t("runFast.gutishi[0]"), 'warning', _this);
                    return false;
                };
                if (isNaN(_this.formItem.money)) {
                    _this.$public.msg(_this.$t("runFast.gutishi[1]"), 'warning', _this);
                    return false;
                };
                // 竞猜数不能为空！
                if(!_this.formItem.escape_beishu){
                    _this.$public.msg(_this.$t("runFast.gutishi[0]"), 'warning', _this);
                    return false
                }
                // if (_this.formItem.money % 1 != 0) {
                //     _this.$public.msg(_this.$t("runFast.gutishi[2]"), 'warning', _this);
                //     return false;
                // };
                if (_this.formItem.escape_beishu) {
                    if (isNaN(_this.formItem.escape_beishu)) {
                        _this.$public.msg(_this.$t("runFast.gutishi[3]"), 'warning', _this);
                        return false;
                    };
                    if (_this.formItem.escape_beishu.toString().split(".").length > "1") {
                        if (_this.formItem.escape_beishu.toString().split(".")[1].length > "2") {
                            _this.$public.msg(_this.$t("runFast.gutishi[4]"), 'warning', _this);
                            return false;
                        }
                    }
                };
                if (_this.makeanappointment.type) {
                    var senddata = {
                        type: _this.code,
                        money: _this.makeanappointment.money,
                        escape_beishu: _this.makeanappointment.escape_beishu,
                    }
                } else {
                    var senddata = {
                        type: _this.code,
                        money: _this.formItem.money,
                        escape_beishu: _this.formItem.escape_beishu
                    }
                }
                _this.$http.post(_this.$http.order_add_post, senddata).then(function (res) {
                    if (res.data.code == "200") {
                        _this.$public.msg(res.data.msg, 'success', _this);
                        _this.getdata();
                        _this.Purchasestatus = true;
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                }).catch(function (error) { });
            },
            // 预约下注
            yuyuexiazhu() {

                const _this = this;
                let _data = JSON.parse(sessionStorage.getItem('yuyue'));
                sessionStorage.removeItem('yuyue');
                _this.$http.post(_this.$http.order_add_post, _data).then(function (res) {
                    if (res.data.code == "200") {
                        _this.$public.msg(res.data.msg, 'success', _this);
                        _this.getdata();
                        _this.Purchasestatus = true;
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                }).catch(function (error) { });
            },
            // 预约
            makeanappoint() {
                var _this = this;
                if (!_this.formItem.money) {
                    _this.$public.msg(_this.$t("runFast.gutishi[0]"), 'warning', _this);
                    return false;
                };
                if (isNaN(_this.formItem.money)) {
                    _this.$public.msg(_this.$t("runFast.gutishi[1]"), 'warning', _this);
                    return false;
                };
                // if (_this.formItem.money % 1 != 0) {
                //     _this.$public.msg(_this.$t("runFast.gutishi[2]"), 'warning', _this);
                //     return false;
                // };
                // 竞猜数不能为空！
                if(!_this.formItem.escape_beishu){
                    _this.$public.msg(_this.$t("runFast.gutishi[0]"), 'warning', _this);
                    return false
                }
                if (_this.formItem.escape_beishu) {
                    if (isNaN(_this.formItem.escape_beishu)) {
                        _this.$public.msg(_this.$t("runFast.gutishi[3]"), 'warning', _this);
                        return false;
                    };
                    if (_this.formItem.escape_beishu.toString().split(".").length > "1") {
                        if (_this.formItem.escape_beishu.toString().split(".")[1].length > "2") {
                            _this.$public.msg(_this.$t("runFast.gutishi[4]"), 'warning', _this);
                            return false;
                        }
                    }
                };
                _this.makeanappointment.currency = _this.code,
                _this.makeanappointment.money = _this.formItem.money;
                _this.makeanappointment.escape_beishu = _this.formItem.escape_beishu;
                if (_this.makeanappointment.type) {
                    _this.makeanappointment.type = false;
                } else {
                    _this.makeanappointment.type = true;
                };
                _this.isyuyue = true;
                // var senddata = {
                //     type: _this.code,
                //     money: _this.formItem.money,
                //     escape_beishu: _this.formItem.escape_beishu
                // }
                // _this.isyuyue = true;
                // if (!sessionStorage.getItem('yuyue')) {
                //     sessionStorage.setItem('yuyue', JSON.stringify(senddata));
                //     _this.$public.msg("预约成功", 'warning', _this);
                // } else {
                //     _this.$public.msg("您已预约", 'warning', _this);
                // }
            },
            getcommon_data() {
                var _this = this;
                $.post(_this.$http.common_data, function (res) {
                    if (res.code == "200") {
                        for (var i in res.data.buy_info.CNB_info) {
                            _this.currencyinfozhong[i] = res.data.buy_info.CNB_info[i];
                        };
                        for (var j in res.data.buy_info.VT_info) {
                            _this.currencyinfozhong[j] = res.data.buy_info.VT_info[j];
                        };
                        for (var i in res.data.buy_info.SOP_info) {
                            _this.currencyinfozhong[i] = res.data.buy_info.SOP_info[i];
                        };
                        for (var k in res.data.buy_info.USDT_info) {
                            _this.currencyinfozhong[k] = res.data.buy_info.USDT_info[k];
                        };
                        switch (_this.code) {
                            case "USDT":
                                _this.formItem.money = res.data.buy_info.USDT_info.USDT_buy_min_money;
                                _this.formItem.escape_beishu = res.data.buy_info.USDT_info.USDT_escape_beishu;
                                break;
                            case "SOP":
                                _this.formItem.money = res.data.buy_info.SOP_info.SOP_buy_min_money;
                                _this.formItem.escape_beishu = res.data.buy_info.SOP_info.sop_escape_beishu;
                                break;
                            case "CNB":
                                _this.formItem.money = res.data.buy_info.CNB_info.CNB_buy_min_money;
                                _this.formItem.escape_beishu = res.data.buy_info.CNB_info.cnb_escape_beishu;
                                break;
                            case "VT":
                                _this.formItem.money = res.data.buy_info.VT_info.VT_buy_min_money;
                                _this.formItem.escape_beishu = res.data.buy_info.VT_info.VT_escape_beishu;
                                break;
                        }
                        _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                        _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                        _this.xishi_rate = res.data.buy_info.xishi_rate;
                    }
                });
            },
            Doubling(type) { //投注点击翻倍
                var _this = this;
                switch (type) {
                    case "Max":
                        switch (_this.code) {
                            case 'USDT':
                                _this.formItem.money = _this.currencyinfozhong.USDT_buy_max_money;
                                break;
                            case 'SOP':
                                _this.formItem.money = _this.currencyinfozhong.SOP_buy_max_money;
                                break;
                            case 'CNB':
                                _this.formItem.money = _this.currencyinfozhong.CNB_buy_max_money;
                                break;
                            case 'VT':
                                _this.formItem.money = _this.currencyinfozhong.VT_buy_max_money;
                                break;
                        }
                        // _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                        _this.Opportunity.a = _this.$public.Multiplication(_this.formItem.money, _this.formItem.escape_beishu);
                        break;
                    case "Min":
                        switch (_this.code) {
                            case 'USDT':
                                _this.formItem.money = _this.currencyinfozhong.USDT_buy_min_money;
                                break;
                            case 'SOP':
                                _this.formItem.money = _this.currencyinfozhong.SOP_buy_min_money;
                                break;
                            case 'CNB':
                                _this.formItem.money = _this.currencyinfozhong.CNB_buy_min_money;
                                break;
                            case 'VT':
                                _this.formItem.money = _this.currencyinfozhong.VT_buy_min_money;
                                break;
                        }
                        // _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                        _this.Opportunity.a = _this.$public.Multiplication(_this.formItem.money, _this.formItem.escape_beishu);
                        break;
                    case "/2":
                        switch (_this.code) {
                            case 'USDT':
                                if (_this.formItem.money / 2 > _this.currencyinfozhong.USDT_buy_min_money) {
                                    _this.formItem.money = parseInt(_this.formItem.money / 2);
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.USDT_buy_min_money;
                                }
                                break;
                            case 'SOP':
                                if (_this.formItem.money / 2 > _this.currencyinfozhong.SOP_buy_min_money) {
                                    _this.formItem.money = parseInt(_this.formItem.money / 2);
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.SOP_buy_min_money
                                }
                                break;
                            case 'CNB':
                                if (_this.formItem.money / 2 > _this.currencyinfozhong.CNB_buy_min_money) {
                                    _this.formItem.money = parseInt(_this.formItem.money / 2);
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.CNB_buy_min_money
                                }
                                break;
                            case 'VT':
                                if (_this.formItem.money / 2 > _this.currencyinfozhong.VT_buy_min_money) {
                                    _this.formItem.money = parseInt(_this.formItem.money / 2);
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.VT_buy_min_money
                                }
                                break;
                        };
                        // _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                        _this.Opportunity.a = _this.$public.Multiplication(_this.formItem.money, _this.formItem.escape_beishu);
                        break;
                    case "x2":
                        switch (_this.code) {
                            case 'USDT':
                                if (_this.formItem.money * 2 < _this.currencyinfozhong.USDT_buy_max_money) {
                                    _this.formItem.money = _this.formItem.money * 2;
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.USDT_buy_max_money;
                                }
                                break;
                            case 'SOP':
                                if (_this.formItem.money * 2 < _this.currencyinfozhong.SOP_buy_max_money) {
                                    _this.formItem.money = _this.formItem.money * 2;
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.SOP_buy_max_money;
                                }
                                break;
                            case 'CNB':
                                if (_this.formItem.money * 2 < _this.currencyinfozhong.CNB_buy_max_money) {
                                    _this.formItem.money = _this.formItem.money * 2;
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.CNB_buy_max_money;
                                }
                                break;
                            case 'VT':
                                if (_this.formItem.money * 2 < _this.currencyinfozhong.VT_buy_max_money) {
                                    _this.formItem.money = _this.formItem.money * 2;
                                } else {
                                    _this.formItem.money = _this.currencyinfozhong.VT_buy_max_money;
                                }
                                break;
                        }
                        // // _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                        _this.Opportunity.a = _this.$public.Multiplication(_this.formItem.money, _this.formItem.escape_beishu);
                        break;
                }
            },
            earnings() {//投注计算
                var _this = this;
                if (!_this.formItem.money) {
                    switch (_this.code) {
                        case 'USDT':
                            _this.formItem.money = _this.currencyinfozhong.USDT_buy_min_money;
                            break;
                        case 'SOP':
                            _this.formItem.money = _this.currencyinfozhong.SOP_buy_min_money;
                            break;
                        case 'CNB':
                            _this.formItem.money = _this.currencyinfozhong.CNB_buy_min_money;
                            break;
                        case 'VT':
                            _this.formItem.money = _this.currencyinfozhong.VT_buy_min_money;
                            break;
                    };
                    _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                    _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                    return false;
                };
                if (isNaN(_this.formItem.money)) {
                    switch (_this.code) {
                        case 'USDT':
                            _this.formItem.money = _this.currencyinfozhong.USDT_buy_min_money;
                            break;
                        case 'SOP':
                            _this.formItem.money = _this.currencyinfozhong.SOP_buy_min_money;
                            break;
                        case 'SOP':
                            _this.formItem.money = _this.currencyinfozhong.CNB_buy_min_money;
                            break;
                        case 'VT':
                            _this.formItem.money = _this.currencyinfozhong.VT_buy_min_money;
                            break;
                    };
                    _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                    _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                    return false;
                };
                switch (_this.code) {
                    case 'USDT':
                        if (Number(_this.formItem.money) < Number(_this.currencyinfozhong.USDT_buy_min_money)) {
                            _this.formItem.money = _this.currencyinfozhong.USDT_buy_min_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        if (Number(_this.formItem.money) > Number(_this.currencyinfozhong.USDT_buy_max_money)) {
                            _this.formItem.money = _this.currencyinfozhong.USDT_buy_max_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        break;
                    case 'SOP':
                        if (Number(_this.formItem.money) < Number(_this.currencyinfozhong.SOP_buy_min_money)) {
                            _this.formItem.money = _this.currencyinfozhong.SOP_buy_min_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        if (Number(_this.formItem.money) > Number(_this.currencyinfozhong.SOP_buy_max_money)) {
                            _this.formItem.money = _this.currencyinfozhong.SOP_buy_max_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        break;
                    case 'CNB':
                        if (Number(_this.formItem.money) < Number(_this.currencyinfozhong.CNB_buy_min_money)) {
                            _this.formItem.money = _this.currencyinfozhong.CNB_buy_min_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        if (Number(_this.formItem.money) > Number(_this.currencyinfozhong.CNB_buy_max_money)) {
                            _this.formItem.money = _this.currencyinfozhong.CNB_buy_max_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        break;
                    case 'VT':
                        if (Number(_this.formItem.money) < Number(_this.currencyinfozhong.VT_buy_min_money)) {
                            _this.formItem.money = _this.currencyinfozhong.VT_buy_min_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        if (Number(_this.formItem.money) > Number(_this.currencyinfozhong.vt_buy_max_money)) {
                            _this.formItem.money = _this.currencyinfozhong.VT_buy_max_money;
                            _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                            _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                            return false;
                        };
                        break;
                };
                if (_this.formItem.money.split(".").length > 1) {
                    _this.formItem.money = _this.formItem.money.split(".")[0];
                    _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                    _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                    return false;
                };
                _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
            },
            chance() {//自动逃跑计算
                var _this = this;
                if (!_this.formItem.escape_beishu) {
                    switch (_this.code) {
                        case 'USDT':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.USDT_escape_beishu;
                            break;
                        case 'SOP':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.sop_escape_beishu;
                            break;
                        case 'CNB':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.cnb_escape_beishu;
                            break;
                        case 'VT':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.VT_escape_beishu;
                            break;
                    };
                    _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                    _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                    return false;
                };
                if (isNaN(_this.formItem.escape_beishu)) {
                    switch (_this.code) {
                        case 'USDT':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.USDT_escape_beishu;
                            break;
                        case 'SOP':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.sop_escape_beishu;
                            break;
                        case 'CNB':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.cnb_escape_beishu;
                            break;
                        case 'VT':
                            _this.formItem.escape_beishu = _this.currencyinfozhong.VT_escape_beishu;
                            break;
                    };
                    _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                    _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                    return false;
                };
                switch (_this.code) {
                    case 'USDT':
                        break;
                    case 'SOP':
                        break;
                    case 'CNB':
                        break;
                    case 'VT':
                        break;
                };
                if (_this.formItem.escape_beishu < 1.01) {
                    _this.formItem.escape_beishu = 1.01;
                    _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                    _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
                    return false;
                };
                _this.Opportunity.a = _this.formItem.money * _this.formItem.escape_beishu;
                _this.Opportunity.b = _this.$public.toDecimal2(100 / _this.formItem.escape_beishu);
            },

        },

        // 路由改变时
        beforeRouteLeave(to, from, next) {
            var _this = this;
            // if (_this.MainData) _this.MainData.close();
            if (_this.TaoChronicle) window.clearInterval(_this.TaoChronicle);
            if (_this.requestdata) window.clearInterval(_this.requestdata);
            if (_this.isduankaitimer) window.clearInterval(_this.isduankaitimer);
            if (_this.publictime) window.clearInterval(_this.publictime);
            next();
        },
        mounted: function () {
            var _this = this;
            _this.getdata();
            // 进度条换算
            // _this.percentagenum = Number(_this.percentagenum / 2);
            _this.getCode();
            window.setTimeout(function () {
                _this.MainDatapushh();
            }, 500);
            // 获取限制条件
            _this.getcommon_data();
            if (_this.$cookies.get("language")) {
                _this.$i18n.locale = _this.$cookies.get("language");
                _this.islange = _this.$cookies.get("language");
            } else {
                _this.$cookies.set("language", "zh", 60 * 60 * 24 * 30);
            }
            // window.addEventListener("visibilitychange",function(){
			//     if (document.hidden) {
			//     	clearInterval(_this.TaoChronicle);
	        // 		_this.isopen=false;
	        // 		_this.MainData.close();
			//     } else {
	        // 		_this.isopen=true;
        	// 		_this.MainDatapushh();
			//     }
			// });
        },
        beforeDestroy(){
            this.MainData?this.MainData.close():false
            this.MainData.removeEventListener('open', this.handle);
        },
        destroyed(){
            this.MainData?this.MainData.close():false
        },
        created: function () {
            var _this = this;
        },
        components: {
            asidebar: asidebar
        }
    };
</script>

<style scoped="scoped">

</style>