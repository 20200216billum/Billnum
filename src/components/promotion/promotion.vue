<style scoped lang="less">
        @import './promotion.less';
        @import '../../assets/public.less';
</style>

<style lang="less">
    .fanyong {
        th {
            background: #2b2b2b;
        }
        td {
            background: #171717;
        }
        .is-leaf {
            color: #FFFFFF !important;
        }
    }
</style>
    
<template>
<div class="fanyong">
    <div class="title">
        <h1>{{$t("promotionLA.no1[0]")}}</h1>
        <p>{{$t("promotionLA.no1[1]")}}~</p>
    </div>
    <div class="tabs">
        <el-tabs v-model="activeName" tab-position="left">
                <!-- <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left"> -->
            <el-tab-pane :label="$t('promotionLA.no1[2]')" name="first">
                <div class="myNum">   
                    <div class="topBanner">  
                    </div>
                    <div class="flex">
                        <div class="div_1 div">
                            <div>
                                <img :src="fanyong.qrcode" alt="">
                            </div>
                            <h1>{{$t("promotionLA.no1[3]")}}</h1>
                            <p>{{$t("promotionLA.no1[4]")}}</p>
                        </div>
                        <div class="div_2 div">
                            <h1>{{$t("promotionLA.no1[5]")}}</h1>
                            <p id="addInput">{{fanyong.account}}</p>
                            <!-- <p>{{$t("promotionLA.no1[6]")}}</p> -->
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('promotionLA.tuandui[0]')" name="second">
                <div class="myFrind">  
                    <el-tabs v-model="activeName1">
                            <!-- <el-tabs v-model="activeName1" @tab-click="handleClick1"> -->
                        <el-tab-pane :label="$t('promotionLA.tuandui[1]')" name="first">
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column prop="account" label="UID" width="280">
                                </el-table-column>
                                <el-table-column prop="phone" :label="$t('promotionLA.tuandui[2]')" width="280">
                                </el-table-column>
                                <el-table-column prop="created_at" :label="$t('promotionLA.tuandui[3]')">
                                </el-table-column>
                            </el-table>
                            <el-pagination background layout="prev, pager, next" :total="page1.total" @current-change="getpage1" :page-size='page1.size'></el-pagination>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('promotionLA.tuandui[4]')" name="second">
                            <el-table :data="tableData1" style="width: 100%">
                                <el-table-column prop="account" label="UID" width="280">
                                </el-table-column>
                                <el-table-column prop="phone" :label="$t('promotionLA.tuandui[5]')" width="280">
                                </el-table-column>
                                <el-table-column prop="created_at" :label="$t('promotionLA.tuandui[6]')">
                                </el-table-column>
                            </el-table>
                            <el-pagination background layout="prev, pager, next" :total="page2.total" @current-change="getpage2" :page-size='page2.size'></el-pagination>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <!-- 我的佣金 -->
            <el-tab-pane :label="$t('promotionLA.tuandui[7]')" name="third">
                <div class="myFrind">  
                    <template>
                        <el-table
                        :data="tableData3"
                        style="width: 100%">
                            <el-table-column
                                prop="money"
                                :label="$t('promotionLA.tuandui[8]')"
                                width="260">
                                <template slot-scope="scope">
                                    <p>{{scope.row.money}} USDT</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="from_uid"
                                :label="$t('promotionLA.tuandui[9]')"
                                width="260">
                            </el-table-column>
                            <el-table-column
                                prop="mark"
                                :label="$t('promotionLA.tuandui[11]')"
                                width="260">
                            </el-table-column>
                            <el-table-column
                                prop="created_at"
                                :label="$t('promotionLA.tuandui[10]')"
                                align="right"
                                width="300">
                            </el-table-column>
                        </el-table>
                    </template>
                    <el-pagination background layout="prev, pager, next" :total="page3.total" @current-change="getpage3" :page-size='page3.size'></el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>
<script>
    export default {
    data() {
        return {
            fanyong:{},
            activeName:'first',//外层标签页
            activeName1:'first',//内层标签页
            zhitui:[],
            jiantui:[],
            tableData:[
                // {
                //     account:'1',
                //     phone:'123',
                //     created_at:'2019',
                // },
                // {
                //     account:'2',
                //     phone:'123',
                //     created_at:'2019',
                // },
                // {
                //     account:'3',
                //     phone:'123',
                //     created_at:'2019',
                // },
                // {
                //     account:'4',
                //     phone:'123',
                //     created_at:'2019',
                // },
            ],//直推
            tableData1:[
                // {
                //     account:'1',
                //     phone:'17797759951',
                //     created_at:'2019',
                // },
            ],//间推
            tableData3: [],
            page1:{
                size:5,
                num:1,
                total:1,
            },
            page2:{
                size:5,
                num:1,
                total:1,
            },
            page3:{
                size:5,
                num:1,
                total:1,
            }
        }
    },
    methods: {
        //获取直推数据
        promotionzt(val){
            var _this = this;
            _this.$http.get(_this.$http.promotionzt,{params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                _this.tableData = res.data.data.data;
                _this.page1.size = res.data.data.per_page
                _this.page1.total = res.data.data.total;
                // _this.getpage1(1);
             }
            })
        }, 
        //获取间推数据
        promotionjt(val){
            var _this = this;
            _this.$http.get(_this.$http.promotionjt,{params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                _this.tableData1 = res.data.data.data;
                _this.page2.size = res.data.data.per_page
                _this.page2.total = res.data.data.total;
                // _this.getpage2(1)
             }
            })
        },
        //获取佣金
        rewardLog(val) {
            var _this = this;
            _this.$http.post(_this.$http.rewardLog,{params:{
                page:val
            }}).then(function(res) {
                console.log(res)
                if(res.data.code == '200') {
                    _this.tableData3 = res.data.data.data;
                    _this.page3.size = res.data.data.per_page
                    _this.page3.total = res.data.data.total;
                }
            })
        },
        registerLink(){
            var _this = this;
            _this.$http.get(_this.$http.registerLink,{params:{}}).then(function(res) {
              if(res.data.code == '200') {
                  _this.fanyong = res.data.data;
             }
            })
        },
        // copy: function(para) { // 复制函数
        //     var _this = this;
        //     var ele = document.getElementById(para).select();
        //     document.execCommand("Copy");
        //     // 复制成功
        //     _this.$public.msg(_this.$t('googleverify.list[8]'), 'success', _this);
        // },
        //分页查询
        getpage1(val){
            var _this = this;
            _this.promotionzt(val)
            // var k = (val-1)*_this.page1.size
            // if(val==1){
            //     var k = 0
            // }
            // var arr = [];
            // for(var i = k;i<_this.page1.size*val;i++){
            //     if(!_this.tableData[i]){
            //         break;
            //     }
            //     _this.tableData[i].phone = _this.$public.phoneEncryption(_this.tableData[i].phone)
            //     arr.push(_this.tableData[i])
            // }
            // _this.zhitui = arr
        },
        getpage2(val){
            var _this = this;
            _this.promotionjt(val)
            // var k = (val-1)*_this.page2.size
            // if(val==1){
            //     var k = 0
            // }
            // var arr = [];
            // for(var i = k;i<_this.page2.size*val;i++){
            //     if(!_this.tableData1[i]){
            //         break;
            //     }
            //     _this.tableData1[i].phone = _this.$public.phoneEncryption(_this.tableData1[i].phone)
            //     arr.push(_this.tableData1[i])
            // }
            // _this.jiantui = arr
        },
        getpage3(val) {
            this.rewardLog(val)
        }
    },
    mounted () {
        var _this = this;
        _this.registerLink();
        _this.promotionzt(1);
        _this.promotionjt(1);
        _this.rewardLog(1)
    }
    };
</script>