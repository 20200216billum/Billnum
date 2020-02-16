<style scoped lang="less">
        @import './zhangdan.less';
        @import '../../assets/public.less';
</style>
    
<template>
<div class="zhangdan">
    <div class="title">
            {{$t('zhangdanLA[0]')}} > {{$t('zhangdanLA[1]')}}
    </div>
    <div class="table">   
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="ymoney" :label="$t('zhangdanLA[2]')" width="560">
            </el-table-column>
            <el-table-column prop="money" :label="$t('zhangdanLA[3]')" width="460">
            </el-table-column>
            <el-table-column prop="nmoney" :label="$t('zhangdanLA[4]')">
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="page1.total"  @current-change="current_change1" :page-size='page1.pageSize' :current-page.sync="page1.pageNum"></el-pagination>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                tableData:[
                ],
                page1:{
                    pageNum:1,
                    pageSize:5,
                    total:1,
                }
            }
        },
        methods: {
            //获取列表信息 
            userMoneyLog(val){
                var _this = this;
                _this.$http.get(_this.$http.billInfo, {params:{
                    code:_this.$route.query.type,
                    page:val
                }}).then(function(res) {
                  if(res.data.code == '200') {
                        _this.tableData = res.data.data.data;
                        _this.page1.pageSize = res.data.data.per_page;
                        _this.page1.total = res.data.data.total;
                 }
                })
            },
            current_change1(i){
                _this.userMoneyLog(i);
            }
        },
        mounted () {
            var _this = this;
            _this.userMoneyLog(1);
        },
    };
</script>