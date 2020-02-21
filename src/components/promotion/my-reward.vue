<template>
    <div class="my_reward">
        <div class="my_reward_container">
            <div class="top_title">
                <span class="name">我的奖励</span>
                <span><router-link to="/reward-record" class="more">奖励记录</router-link></span>
            </div>
            <div class="reward_box">
                <div class="left">
                    <div class="one">
                        <p class="title">奖励总额</p>
                        <p class="num">{{ dataObj.recommends + " " + dataObj.code }}</p>
                    </div>
                    <div class="two">
                        <p class="title">消耗金额</p>
                        <p class="num">{{ dataObj.consume + " " + dataObj.code }}</p>
                    </div>
                </div>
                <div class="right">
                    <div class="yesterday">
                        <p class="name">昨日新增</p>
                        <p class="num">85.0000</p>
                    </div>
                    <div class="week">
                        <p class="name">本周新增</p>
                        <p class="num">85.0000</p>
                    </div>
                </div>
            </div>
            <div class="reward_bg"></div>
            <el-table :data="dataObj.ranking" empty-text="暂无数据" class="reward_table">
                <el-table-column prop="date" label="排名" min-width="180">
                    <template slot-scope="scope">
                        <img v-if="scope.$index == 0" src="../../assets/img/NO.1.png">
                        <img v-else-if="scope.$index == 1" src="../../assets/img/NO.2.png">
                        <img v-else-if="scope.$index == 2" src="../../assets/img/NO.3.png">
                        <span v-else style="margin-left:10px;">{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="account" label="账号" min-width="180"></el-table-column>
                <el-table-column prop="date" label="金额类型" min-width="180" align="right">
                    <template slot-scope="scope">
                        <span>{{ scope.row.total_commission + " " + dataObj.code }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataObj: {
                "consume": 0, //消耗金额
                "recommends": 0, //奖励金额
                "code": "--", //排行榜金额后面展示的币种
            }
        };
    },
    methods: {
        // 获取数据
        getData() {
            this.$http.get(this.$http.my_reward, {params:{}}).then(res => {
                if (res.data.code == 200) {
                    this.dataObj = res.data.data;
                }
            }).catch(err => {})
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style lang="less" scoped>
@import "./my-reward.less";
</style>