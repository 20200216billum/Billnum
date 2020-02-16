<style lang=less>
    @import '../../assets/public.less';
    @import '../../assets/reset.less';
    @import "./standings.less";
</style>
<template lang="html">
    <div class="standingsWrap">
        <asidebar></asidebar>
        <div class="conTent">
            <el-select v-model="codeValue" placeholder="请选择" popper-class="customSelect" class="customSelectBg"
                @change="codeChangeList">
                <el-option v-for="item in codeArr" :key="item.id" :label="item.code" :value="item.code">
                </el-option>
            </el-select>
            <div>
                <!-- <h1 v-if="tableData.name" class="goldColor standingTitle">{{ tableData.name }}</h1>
                <h1 v-else class="goldColor standingTitle">------</h1> -->
                <ul class="standingList">
                    <li>
                        <img src="../../assets/img/1.png">
                        <div class="standingDivInline">
                            <p class="itemName">{{$t('runFast.standing[1]')}}</p>
                            <p class="itemNum">{{ tableData.income ? tableData.income:  '------'}}</p>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/2.png">
                        <div class="standingDivInline">
                            <p class="itemName">{{$t('runFast.standing[2]')}}</p>
                            <p class="itemNum">{{ tableData.leiji ? tableData.leiji:  '------'}}</p>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/3.png">
                        <div class="standingDivInline">
                            <p class="itemName">{{$t('runFast.standing[3]')}}</p>
                            <p class="itemNum">{{ tableData.zuigao ? tableData.zuigao:  '------'}}</p>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/4.png">
                        <div class="standingDivInline">
                            <p class="itemName">{{$t('runFast.standing[4]')}}</p>
                            <p class="itemNum">{{ tableData.loss ? tableData.loss:  '------'}}</p>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/5.png">
                        <div class="standingDivInline">
                            <p class="itemName">{{$t('runFast.standing[5]')}}</p>
                            <p class="itemNum">{{ tableData.ranking ? tableData.ranking:  '------'}}</p>
                        </div>
                    </li>
                    <li>
                        <img src="../../assets/img/6.png">
                        <div class="standingDivInline">
                            <p class="itemName">{{$t('runFast.standing[6]')}}</p>
                            <p class="itemNum">{{ tableData.num ? tableData.num : '------'}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import asidebar from "./asidebar.vue";
    export default {
        data() {
            return {
                codeArr: [],
                codeValue: "USDT",
                tableData: {}
            }
        },
        methods: {
            // 获取币种列表
            getCodeList() {
                var _this = this;
                _this.$http.post(_this.$http.currency, {}).then(res => {
                    if (res.data.code == "200") {
                       _this.codeArr = res.data.data;
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                }).catch(err => { })
            },
            // 币种改变时
            codeChangeList(value) {
                var _this = this;
                _this.codeValue = value;
                _this.showRankList(value);
            },
            // 获取战绩
            showRankList(val) {
                var _this = this;
                _this.$http.post(_this.$http.record, {
                    money_type: val,
                }).then(res => {
                    if (res.data.code == "200") {
                        _this.tableData = res.data.data
                            _this.tableData.income = _this.$public.toLowFixed(_this.tableData.income,4);
                            _this.tableData.leiji = _this.$public.toLowFixed(_this.tableData.leiji,4);
                            _this.tableData.zuigao = _this.$public.toLowFixed(_this.tableData.zuigao,4);
                            _this.tableData.loss = _this.$public.toLowFixed(_this.tableData.loss,4);
                            _this.tableData.num = _this.$public.toLowFixed(_this.tableData.num,4);
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                }).catch(err => { })
            }
        },
        created: function () {
            var _this = this;
            _this.getCodeList();
            _this.showRankList(_this.codeValue);
        },
        components: {
            asidebar: asidebar
        }
    };
</script>

<style scoped="scoped">

</style>