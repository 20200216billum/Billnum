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
                        <p class="num">865.0000 USDT</p>
                    </div>
                    <div class="two">
                        <p class="title">消耗金额</p>
                        <p class="num">865.0000 USDT</p>
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
            <el-table :data="tableData" empty-text="暂无数据" class="reward_table">
                <el-table-column prop="date" label="排名" min-width="180">
                    <template slot-scope="scope">
                        <img v-if="scope.$index == 0" src="../../assets/img/NO.1.png">
                        <img v-else-if="scope.$index == 1" src="../../assets/img/NO.2.png">
                        <img v-else-if="scope.$index == 2" src="../../assets/img/NO.3.png">
                        <span v-else>{{ scope.$index }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="账号" min-width="180"></el-table-column>
                <el-table-column prop="date" label="金额类型" min-width="180" align="right"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        };
    },
    methods: {

    },
    mounted() {

    },
};
</script>

<style lang="less" scoped>
@import "./my-reward.less";
</style>