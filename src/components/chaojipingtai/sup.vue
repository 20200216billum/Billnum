<style scoped lang="less">
    @import './sup.less';
    @import '../../assets/public.less';
</style>
 
<template>
<div class="supList">
  <!-- 余额 -->
    <div class="mangeMoney_balance"> 
        <div class="title">
            {{$t('supLA[0]')}} > {{$t('supLA[1]')}}
        </div>
    </div>
    <!-- 分红记录 -->
    <div class="mangeMoney_record">
            <el-table :data="tableData1" style="width: 100%">
                <el-table-column prop="created_at" :label="$t('supLA[2]')" width="640">
                </el-table-column>
                <el-table-column prop="money" :label="$t('supLA[3]')" width="640">
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
            activeName: 'second',
            getList:{
                type:'',
                page:1,
            },
            tableData1:[
            ],
            fenhong:[],
            page1:{
                pageNum:1,
                pageSize:5,
                total:1,
            },
        }
    },
    methods: {
        //获取分红纪录
        fenhongInfo(val){
            var _this = this;
            _this.$http.get(_this.$http.dividendLog,{params:{
                page:val
            }}).then(function(res) {
              if(res.data.code == '200') {
                _this.tableData1 = res.data.data.data;
                for(let i=0;i<_this.tableData1.length;i++){
                    _this.tableData1[i].money = parseFloat(_this.tableData1[i].money) + 'USDT'
                }
                _this.page1.pageSize = res.data.data.per_page;
                _this.page1.total = res.data.data.total;
             }
            })
        },
        //tab切换
        handleClick(tab, event) {
        },
      //点击分页获页数
        current_change1(val) {
            var _this = this;
            _this.fenhongInfo(val)
        },
    },
    mounted () {
        var _this = this;
        _this.getList.type = _this.$route.query.type;
        _this.fenhongInfo(1)
    }
  };
</script>