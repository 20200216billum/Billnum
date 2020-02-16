<style scoped lang="less">
        @import './fenhong.less';
        @import '../../assets/public.less';
    </style>
     
    <template>
    <div class="mangeMoney">
      <!-- 余额 -->
        <div class="mangeMoney_balance"> 
            <div class="title">
                {{$t('fenhongLA[0]')}} > {{$t('fenhongLA[1]')}}
            </div>
        </div>
        <!-- 释放纪录 --> 
        <div class="mangeMoney_record">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$t('fenhongLA[2]')" name="first">
                        <el-table :data="tableData1" style="width: 100%">
                            <el-table-column prop="created_at" :label="$t('fenhongLA[3]')" width="640">
                            </el-table-column>
                            <el-table-column prop="money" :label="$t('fenhongLA[4]')" width="640">
                            </el-table-column>
                        </el-table>
                        <el-pagination background layout="prev, pager, next" :total="page1.total"  @current-change="current_change1" :page-size='page1.pageSize' :current-page.sync="page1.pageNum"></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('fenhongLA[5]')" name="second">
                        <el-table :data="tableData2" style="width: 100%">
                            <el-table-column prop="created_at" :label="$t('fenhongLA[6]')" width="640">
                            </el-table-column>
                            <el-table-column prop="money" :label="$t('fenhongLA[7]')" width="640">
                            </el-table-column>
                        </el-table>
                        <el-pagination background layout="prev, pager, next" :total="page2.total"  @current-change="current_change2" :page-size='page2.pageSize' :current-page.sync="page2.pageNum"></el-pagination>
                    </el-tab-pane>
                </el-tabs>
        </div>
    </div>
    </template>
    <script>
      export default {
        data() {
            return {
                activeName: 'first',
                getList:{
                    type:'',
                    page:1,
                },
                tableData1:[
                ],
                tableData2:[
                ],
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
            //参与纪录
            canyuList(val){
                var _this = this;
                _this.$http.get(_this.$http.participateLog,{params:{
                    page:val,
                    type:_this.getList.type
                }}).then(function(res) {
                  if(res.data.code == '200') {
                    _this.tableData1 = res.data.data.data;
                    for(let i=0;i<_this.tableData1.length;i++){
                            _this.tableData1[i].money = parseFloat(_this.tableData1[i].money) + _this.tableData1[i].code
                        }
                    _this.page1.pageSize = res.data.data.pper_page;
                    _this.page1.total = res.data.data.total;
                 }
                })
            },
            //分红记录
            shifangList(val){
                var _this = this;
                _this.$http.get(_this.$http.fenhongLog,{params:{
                    page:val
                }}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.tableData2 = res.data.data.data;
                        for(let i=0;i<_this.tableData2.length;i++){
                            _this.tableData2[i].money = parseFloat(_this.tableData2[i].money) + _this.tableData2[i].code
                        }
                        _this.page2.pageSize = res.data.data.pper_page;
                        _this.page2.total = res.data.data.total;
                    }
                })
            },
            //tab切换
            handleClick(tab, event) {
            },
          //点击分页获页数
        current_change1(val) {
            var _this = this;
            _this.canyuList(val)
        },
        current_change2(val) {
            var _this = this;
            _this.shifangList(val);
        },
        },
        mounted () {
            var _this = this;
            _this.getList.type = _this.$route.query.type;
            _this.canyuList(1);
            _this.shifangList(1);
        }
      };
    </script>