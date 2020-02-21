<template>
    <div class="Assets_gic">
        <div class="Assets_gic_top">
            <div class="Assets_gic_top_cen">
                <div class="cen_top">
                    <img src="../../assets/img/zc-img.png">
                    <div class="cen_top_right">
                        <p class="title">总资产折合:</p>
                        <div class="p_1">
                            <span>
                                {{ Number(ttl_usdt).toFixed($public.SavePoint('else'))}} USDT
                                <span class="p_2">  
                                    ≈ {{ $public.toDecimal2($public.Division(Number(ttl_rmb),Number(7))) }} USD
                                </span>
                            </span>
                        </div>
                        <p class="tip">注：资金总估是由市场行情估算值，仅为用户提供一个参考，请以单项资金为准</p>
                    </div>
                </div>
                <div class="bi_list">
                    <ul class="list_top">
                        <li>{{$t('Gic.addCoin[2]')}}</li>
                        <li>{{$t('Gic.addCoin[3]')}}</li>
                        <li>{{$t('Gic.addCoin[4]')}}</li>
                        <li>{{$t('Gic.addCoin[5]')}}</li>
                    </ul>
                    <ul class="list_list">
                        <li v-for="(item,index) in assetsList" :key="index">
                            <p><img :src="item.icon">{{item.pname}}</p>
                            <p>{{ Number(item.asset.balance).toFixed($public.SavePoint('else'))}}</p>
                            <p>{{ Number(item.asset.frost).toFixed($public.SavePoint('else'))}}</p>
                            <div class="btn">
                                <!-- <el-button class="btn_1" v-if="item.pname == 'USDT'" @click="changeUrl('/chongbit',1, 'USDT')"
                                    type="primary">{{$t('Gic.addCoin[6]')}}</el-button>
                                <el-button class="btn_1" v-if="item.pname == 'BTC'" @click="changeUrl('/chongbit',1, 'BTC')"
                                    type="primary">{{$t('Gic.addCoin[6]')}}</el-button>
                                <el-button class="btn_1" v-if="item.pname == 'ETH'" @click="changeUrl('/chongbit',2, 'ETH')"
                                    type="primary">{{$t('Gic.addCoin[6]')}}</el-button> -->

                                <el-button class="btn_1" v-if="item.recharges == 1" @click="changeUrl('/chongbit', item, item.pname)"
                                    type="primary">{{$t('Gic.addCoin[6]')}}</el-button>

                                <!-- <el-button class="btn_2" v-if="item.pname == 'USDT'"
                                    @click="changeUrl('/tibit',1,item.pname,item.pid)" type="primary">
                                    {{$t('Gic.addCoin[7]')}}
                                </el-button>
                                <el-button class="btn_2" v-else-if="item.pname == 'BTC'"
                                    @click="changeUrl('/tibit',1,item.pname,item.pid)" type="primary">
                                    {{$t('Gic.addCoin[7]')}}
                                </el-button>
                                <el-button class="btn_2" v-else
                                    @click="changeUrl('/tibit',2,item.pname,item.pid)" type="primary">
                                    {{$t('Gic.addCoin[7]')}}
                                </el-button> -->

                                <el-button class="btn_2" v-if="item.withdrawal == 1"
                                    @click="changeUrl('/tibit', item, item.pname, item.pid)" type="primary">
                                    {{$t('Gic.addCoin[7]')}}
                                </el-button>


                                <el-button class="btn_3" @click="changeUrl('/moneyRecord',item.pid)" type="primary">
                                    {{$t('Gic.addCoin[8]')}}
                                </el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="Assets_gic_bot">
            <div class="Assets_gic_bot_cen">
                <div class="cen_top">
                    <h5>{{$t('Gic.addCoin[9]')}}</h5>
                    <span class="more" @click="changeUrl('/moneyRecord')">更多</span>
                </div>
                <div class="Record_list">
                    <el-table :data="MoneyLogData">
                        <el-table-column prop="ptype" label="资产">
                        </el-table-column>
                        <el-table-column prop="mark" :label="$t('Gic.addCoin[10]')">
                        </el-table-column>
                        <el-table-column prop="money" :label="$t('Gic.addCoin[11]')">
                            <template slot-scope="scope">
                                <span>{{Number(scope.row.money).toFixed($public.SavePoint('else'))}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="时间" align="right">
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <el-pagination 
                    background 
                    class="fenye" 
                    layout="prev, pager, next" 
                    :total="total"
                    @current-change="current_change1" 
                    :page-size='size' 
                    :current-page.sync="page"
                ></el-pagination> -->
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'addCoin',
        data() {
            return {
                ttl_rmb: '',//人民币
                ttl_usdt: '', //总资产
                assetsList: {}, //币种列表
                MoneyLogData: [],
                page: 1,
                total: 0,
                size: 10,
                language:'',
            }
        },
        watch: {
            // 切换tabs
            'type'(n, o) {
                this.page = 1
                // this.renderList(n)
            }
        },
        methods: {
            // 币种img
            coinImg(code) {
                let url = "";
                switch (code) {
                    case "USDT": 
                        url = require("../../assets/img/USDT.png");
                        break;
                    case "BTC": 
                        url = require("../../assets/img/btc.png");
                        break;
                    case "ETH": 
                        url = require("../../assets/img/eth.png");
                        break;
                }
                return url
            },
            changeUrl(path, query, code, pid) {
                if (path == "/tibit") {
                    if (sessionStorage.payment_password_set != 1) {
                        this.$public.confirm(this.$t('Gic.addCoin[13]'), "/security/index", this);
                        return false;
                    }
                    if (sessionStorage.authentication == 0) {
                        this.$public.confirm(this.$t('Gic.addCoin[14]'), "/security/identity", this);
                        return false;
                    }
                    if (sessionStorage.authentication == 1) {
                        this.$public.confirm(this.$t('Gic.addCoin[15]'), "/security/identity", this);
                        return false;
                    }
                    if (sessionStorage.authentication == 2) {
                        this.$public.msg(this.$t('Gic.addCoin[16]'), "warning", this);
                        return false;
                    }
                    if (sessionStorage.authentication == 4) {
                        this.$public.confirm(this.$t('Gic.addCoin[17]'), "/security/identity", this);
                        return false;
                    }


                    this.$router.push({ path, query: { id: query, objInfo: JSON.stringify(query), code: code, pid: pid } })

                } else {
                    this.$router.push({ path, query: { id: query, objInfo: JSON.stringify(query), code: code } })
                }

            },
            //获取用户资产
            getAsstes() {
                this.$http.get(this.$http.assetInfo, {params:{}}).then((r) => {
                    if (r.data.code == 200) {
                        this.ttl_rmb = r.data.data.ttl_usd;
                        this.ttl_usdt = r.data.data.ttl_btc;
                        // this.assetsList = r.data.data.list;
                    } else {
                        // this.public.msg(r.data.msg,'error',this)
                    }
                })
            },
            //获取充/提币币种列表
            getList() {
                this.$http.post(this.$http.asset_list, {}).then((r) => {
                    if (r.data.code == 200) {
                        this.assetsList = r.data.data;
                    }
                })
            },
            //获取资金明细
            getMoneyLog() {
                this.$http.post(this.$http.userMoneyLog, { page: this.page, size: this.size }).then((r) => {
                    if (r.data.code == 200) {
                        this.MoneyLogData = r.data.data.data;
                        this.page = r.data.data.current_page
                        this.total = r.data.data.total
                    } else {
                        // this.public.msg(r.data.msg,'error',this)
                    }
                })
            },
            current_change1(val) {
                this.page = val
                this.getMoneyLog()
            }

        },
        mounted() {
            if (this.$cookies.get('language') == 'zh') {
                this.language = 'zh';
            } else {
                this.language = 'en';
            }
            this.getAsstes();
            this.getList();
            this.getMoneyLog();
        },
    }
</script>

<style lang="less" scoped>
    @import './addCoin.less';
</style>