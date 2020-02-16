<style scoped lang="less">
    @import './cjpt.less';
    @import '../../assets/public.less';
</style>
 
<template>
<div class="mangeMoney cjpt">
  <!-- 余额 -->
    <div class="mangeMoney_balance"> 
        <div class="title">
            {{$t('cjptLA.info[0]')}}<span @click="upgradeSuperUser" style="float: right;margin-right:30px;color: #6185E5;font-size: 14px;cursor:pointer;" v-if="userData.super_user==0">{{$t('cjptLA.info[1]')}}</span>
            <!-- 超级平台 -->
        </div>
    </div>
    <!-- 个人信息 -->
    <div class="mangeMoney_price">
        <div class="flex1">
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[2]')}}</h4>
                <p>{{infoData.usdt_return.id}}</p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[3]')}}</h4>
                <p>{{infoData.usdt_return.locked ? parseFloat(infoData.usdt_return.locked) : '---'}} USDT</p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[4]')}}</h4>
                <p>{{infoData.usdt_return.already_return ? parseFloat(infoData.usdt_return.already_return) : '---'}} USDT</p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[5]')}}</h4>
                <p>{{infoData.usdt_return.acceleration_rate}} USDT/天</p>
            </div>
        </div>
        <div class="flex2">
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[6]')}}</h4>
                <p>{{infoData.tui_count}} 人</p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[7]')}}</h4>
                <p>{{infoData.tui_super}}</p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[8]')}}</h4>
                <p>{{infoData.tui_yeji}} USDT</p>
            </div>
            <div class="solid">
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[9]')}}</h4>
                <p>{{infoData.team_count}} 人</p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[10]')}}</h4>
                <p>{{infoData.team_super}} </p>
            </div>
            <div class="flexItem">
                <h4>{{$t('cjptLA.info[11]')}}</h4>
                <p>{{infoData.team_yeji}} USDT</p>
            </div>
        </div>
    </div>
    <!-- 释放纪录 -->
    <div class="mangeMoney_record">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('cjptLA.shifang[0]')" name="first">
                    <el-table :data="tableData1" style="width: 100%" class="table">
                        <el-table-column prop="created_at" :label="$t('cjptLA.shifang[1]')" width="426">
                        </el-table-column>
                        <el-table-column prop="money" :label="$t('cjptLA.shifang[2]')" width="426">
                        </el-table-column>
                        <el-table-column prop="mark" :label="$t('cjptLA.shifang[3]')">
                        </el-table-column>
                    </el-table>
                    <!-- <div class="btn_a">
                        <a href="javascript:;">话费360USDT购买超级平台</a>
                    </div> -->
                    <el-pagination background layout="prev, pager, next" :total="page1.total"  @current-change="current_change1" :page-size='page1.pageSize' :current-page.sync="page1.pageNum"></el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="$t('cjptLA.shifang[4]')" name="second">
                    <el-table :data="tableData2" style="width: 100%">
                        <el-table-column prop="money" :label="$t('cjptLA.shifang[5]')" width="626">
                        </el-table-column>
                        <el-table-column prop="type" :label="$t('cjptLA.shifang[6]')   " width="426">
                        </el-table-column>
                        <el-table-column prop="created_at" :label="$t('cjptLA.shifang[7]')">
                        </el-table-column>
                    </el-table>
                    <!-- <div class="btn_a">
                        <a href="javascript:;" @click="upgradeSuperUser" v-if="userData.super_user==0">花费360USDT购买超级平台</a>
                    </div> -->
                    <el-pagination background layout="prev, pager, next" :total="page2.total"  @current-change="current_change2" :page-size='page2.pageSize' :current-page.sync="page2.pageNum"></el-pagination>
                </el-tab-pane>
            </el-tabs>
    </div>
    <div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="dialogVisible1">
        <div class="el-message-box">
            <div class="el-message-box__header">
                <div class="el-message-box__title">
                    <span class="el-message-box__word">{{$t('cjptLA.shifang[8]')}}</span><!--购买超级平台-->
                </div>
                <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
                    <i class="el-message-box__close el-icon-close" ></i>
                </button>
            </div>
            <div class="google"> 
                <div>
                    <p>{{$t('cjptLA.shifang[9]')}}({{userData.upgradeSuperUserMoney}}USDT)<span style="float: right">{{$t('cjptLA.shifang[10]')}}{{userUSDT}}USDT</span></p>
                    <div class="getcode">
                        <el-input type="password" v-model="payment_password" auto-complete="off" :placeholder="$t('cjptLA.shifang[11]')"></el-input>
                    </div>
                    <div class="btnList">	
                        <a href="javascript:;" @click="googleSubmit">{{$t('cjptLA.shifang[12]')}}</a>
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
            infoData:{
                usdt_return:{},
            }, //首页信息
            payment_password:'',
            userData:'',
            userUSDT:'',//可用usdt数量
            dialogVisible1:'display:none',
            activeName: 'first',
            tableData1:[
            ],
            tableData2:[
            ],
            shifang:[],
            fenhong:[],
            page1:{
                pageNum:1,
                pageSize:5,
                total:1,
            },
            page2:{
                pageNum:1,
                pageSize:5,
                total:1,
            }
        }
    },
    methods: {
        //获取个人信息判断是否是超级平台
        userInfo(){
            var _this = this;
            _this.$http.get(_this.$http.details,{params:{}}).then(function(res) {
                if(res.data.code == '200') {
                    _this.userData = res.data.data;
                }
            })
        },
        //可用usdt数量
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
        //首页信息 
        info(val){
            var _this  = this;
            _this.$http.get(_this.$http.info, {params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                  _this.infoData = res.data.data;
             }
            })
        },
        info1(val){
            var _this  = this;
            _this.$http.get(_this.$http.info, {params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                _this.tableData1 = res.data.data.return_logs.data;
                for(let i = 0;i<res.data.data.return_logs.data.length;i++){
                    _this.tableData1[i].money = parseFloat(_this.tableData1[i].money) + 'USDT'
                    _this.tableData1[i].type = parseFloat(_this.tableData1[i].type) + _this.$t('cjptLA.tip[0]')
                }
                _this.page1.total = res.data.data.return_logs.total;
                _this.page1.pageSize = res.data.data.return_logs.per_page;
             }
            })
        },
        info2(val){
            var _this  = this;
            _this.$http.get(_this.$http.info, {params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                  _this.tableData2 = res.data.data.dynamic_logs.data;
                  _this.page2.total = res.data.data.dynamic_logs.total;
                  _this.page2.pageSize = res.data.data.dynamic_logs.per_page;
                  for(let i = 0;i<_this.tableData2.length;i++){
                    _this.tableData2[i].money = parseFloat(_this.tableData2[i].money) + ' ' + _this.tableData2[i].code
                    _this.tableData2[i].type = parseFloat(_this.tableData2[i].type) + _this.$t('cjptLA.tip[0]')
                }
             }
            })
        },
        upgradeSuperUser(){
            var _this = this;
            _this.dialogVisible1 = 'display:block'
        },
        //升级为超级平台
        googleSubmit(){
            var _this = this;
            if(!_this.payment_password){
                _this.$public.msg(_this.$t('cjptLA.tip[1]'),'warning',_this);
                return ;
            }
            _this.$http.post(_this.$http.upgradeSuperUser, {payment_password:_this.$md5(_this.payment_password)}).then(function(res) {
                if(res.data.code == '200') {
                    _this.$public.msg(_this.$t('cjptLA.tip[2]'),' success',_this);
                    _this.dialogVisible1 = 'display:none';
                    _this.payment_password = '';
                    _this.userInfo();
                    _this.info();
                    _this.assetInfo();
                }else{
                    _this.$public.msg(res.data.msg,'warning',_this);
                }
            })
        },
        youhua(val){
            var _this  = this;
            _this.$http.get(_this.$http.info, {params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                  _this.tableData2 = res.data.data.dynamic_logs.data;
                  _this.page2.total = res.data.data.dynamic_logs.total;
                  _this.page2.pageSize = res.data.data.dynamic_logs.per_page;
                  for(let i = 0;i<_this.tableData2.length;i++){
                    _this.tableData2[i].money = parseFloat(_this.tableData2[i].money) + 'USDT'
                    _this.tableData2[i].type = parseFloat(_this.tableData2[i].type) + _this.$t('cjptLA.tip[0]')
                }
             }
            })
        },
        //tab切换
        handleClick(tab, event) {
            var _this = this;
            if(tab.name=='first'){
                _this.page1.pageNum = 1;
                _this.info1(1)
            }else if(tab.name=='second'){
                _this.page2.pageNum = 1;
                _this.info2(1)
            }
        },
      //点击分页获页数
        current_change1(val) {
            var _this = this;
            _this.info1(val)
        },
        current_change2(val) {
            var _this = this;
            _this.info2(val)
        },
        close_moble(){
            var _this = this;
            _this.dialogVisible1 = 'display:none';
            _this.payment_password = '';
        },
    },
    create:function(){
        
    },
    mounted () {
        var _this = this;
        _this.userInfo();
        _this.info();
        _this.info1(1);
        _this.info2(1);
        _this.assetInfo();
    }
  };
</script>