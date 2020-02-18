<template>
    <div class="reward_record">
        <div class="record_container">
            <div class="nav">
                资产管理><span class="active">明细</span>
            </div>
            <div class="cont">
                <p class="title">奖励明细</p>
                <el-table :data="tableData" empty-text="暂无数据" class="reward_table">
                    <el-table-column prop="date" label="奖励名称" min-width="180"></el-table-column>
                    <el-table-column prop="name" label="数量" min-width="180" align="right"></el-table-column>
                    <el-table-column prop="date" label="时间" min-width="180" align="right"></el-table-column>
                </el-table>
            </div>
        </div>
        <el-pagination 
            background 
            class="common-pagination" 
            layout="prev, pager, next" 
            prev-text="上一页"
            next-text="下一页"
            :total="total"
            @current-change="current_change1" 
            :page-size='size' 
            :current-page.sync="page"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            page: 1,
            total: 0,
            size: 10,
        };
    },
    methods: {
        requestData() {},
        current_change1(val) {
				this.page = val
				this.requestData()
			},
    },
    mounted() {

    },
};
</script>

<style lang="less" scoped>
@import "./reward-record.less";
</style>