<style scoped lang="less">
        @import '../../assets/public.less';
        @import './kongtouqu.less';
</style>
      
    <template>
    <div class="kongtou">
      <!-- 余额 -->
        <div class="mangeMoney_balance"> 
            <div class="title">
                {{$t('kongtouLA.info[0]')}}
            </div>
        </div>
        <!-- 个人信息 -->
        <div class="mangeMoney_price">
            <div class="flex1">
                <div class="flexItem div1">
                    <img src="../../assets/img/icon_shequ.png" alt="">
                    <h4>{{kongtouData.community_level}}</h4>
                    <p>{{$t('kongtouLA.info[1]')}}</p>
                </div>
                <div class="flexItem div2">
                    <div class="flexIcon">
                        <div class="div_1 color1"></div>
                        <div class="div_2">{{$t('kongtouLA.info[2]')}}</div>
                        <div class="div_3">{{kongtouData.tui_count}} 人</div>
                    </div>
                    <div class="flexIcon border1">
                        <div class="div_1 color2"></div>
                        <div class="div_2">{{$t('kongtouLA.info[3]')}}</div>
                        <div class="div_3">{{kongtouData.total_count }} 人</div>
                    </div>
                    <div class="flexIcon border1">
                        <div class="div_1 color3"></div>
                        <div class="div_2">{{$t('kongtouLA.info[4]')}}</div>
                        <div class="div_3">{{kongtouData.level1_count }} 人</div>
                    </div>
                    <div class="flexIcon border1">
                        <div class="div_1 color4"></div>
                        <div class="div_2">{{$t('kongtouLA.info[5]')}}</div>
                        <div class="div_3">{{kongtouData.level2_count }} 人</div>
                    </div>
                    <div class="flexIcon">
                        <div class="div_1 color5"></div>
                        <div class="div_2">{{$t('kongtouLA.info[6]')}}</div>
                        <div class="div_3">{{kongtouData.level3_count }} 人</div>
                    </div>
                    <!-- <p><span>1</span>社区直推人数{{kongtouData.tui_count}}</p>
                    <p><span>2</span>社区总人数{{kongtouData.total_count }}</p>
                    <p><span>3</span>社区一星人数{{kongtouData.level1_count }}</p>
                    <p><span>4</span>社区二星人数{{kongtouData.level2_count }}</p>
                    <p><span>5</span>社区三星人数{{kongtouData.level3_count }}</p> -->
                </div>
            </div>
        </div>
        <!-- 资金明细 -->
        <div class="mangeMoney_record">
            <div class="position" :style="kongtouBi">
                <span>{{$t('kongtouLA.zijin[0]')}}</span>
                <el-select v-model="value" :placeholder="$t('kongtouLA.zijin[1]')" @change="change">
                    <el-option label="CNB" value="CNB" name="CNB">
                    </el-option>
                    <el-option label="VT" value="VT" name="VT">
                    </el-option>
                    <el-option label="SOP" value="SOP" name="SOP">
                    </el-option>
                  </el-select>
            </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$t('kongtouLA.zijin[2]')" name="first" v-if="kongtouData">
                        <!-- <el-table cell-class-name="haaha" :data="tableData1" style="width: 100%">
                                <el-table-column  prop="date" label="币种" width="130">
                                </el-table-column>
                                <el-table-column prop="name" label="近日已领取/上限" width="230">
                                </el-table-column>
                                <el-table-column prop="address" label="累计奖励" width="110">
                                </el-table-column>
                                <el-table-column prop="date" label="今日次数限额" width="150">
                                </el-table-column>
                                <el-table-column prop="name" label="单笔奖励限额" width="260">
                                </el-table-column>
                                <el-table-column prop="address" label="冻结金额" width="260">
                                </el-table-column>
                                <el-table-column label="操作" class="right">
                                    <el-button type="primary" size="mini" @click="zhangdan">账单</el-button>
                                </el-table-column>  
                        </el-table> -->
                        <!-- <el-pagination background layout="prev, pager, next" :total="page1.total"  @current-change="current_change1" :page-size='page1.pageSize' :current-page.sync="page1.pageNum"></el-pagination> -->
                        <ul class="ul_1 ul">
                            <li>{{$t('kongtouLA.zijin[3]')}}</li><li>{{$t('kongtouLA.zijin[4]')}}</li><li>{{$t('kongtouLA.zijin[5]')}}</li><li>{{$t('kongtouLA.zijin[6]')}}</li><li>{{$t('kongtouLA.zijin[7]')}}</li><li>{{$t('kongtouLA.zijin[8]')}}</li><li class="last">{{$t('kongtouLA.zijin[9]')}}</li>
                        </ul>
                        <ul class="ul_2 ul">
                            <li>{{kongtouData.CNB.code}}</li><li>{{parseFloat(kongtouData.CNB.get_award_day_max)}}USDT</li><li>{{parseFloat(kongtouData.CNB.total_get_award) }}USDT</li><li>{{kongtouData.CNB.get_award_count }}</li><li>{{parseFloat(kongtouData.CNB.get_award_each_max)}}USDT</li><li>{{parseFloat(kongtouData.CNB.frost_get_award) }}USDT</li><li class="btn_a last"><router-link to="/zhangdan?type=CNB">{{$t('kongtouLA.zijin[10]')}}</router-link></li>
                        </ul>
                        <ul class="ul_3 ul">
                            <li>{{kongtouData.VT.code}}</li><li>{{parseFloat(kongtouData.VT.get_award_day_max)}}USDT</li><li>{{parseFloat(kongtouData.VT.total_get_award) }}USDT</li><li>{{kongtouData.VT.get_award_count }}</li><li>{{parseFloat(kongtouData.VT.get_award_each_max)}}USDT</li><li>{{parseFloat(kongtouData.VT.frost_get_award) }}USDT</li><li class="btn_a last"><router-link to="/zhangdan?type=VT">{{$t('kongtouLA.zijin[10]')}}</router-link></li>
                        </ul>
                        <ul class="ul_4 ul">
                            <li>{{kongtouData.SOP.code}}</li><li>{{parseFloat(kongtouData.SOP.get_award_day_max)}}USDT</li><li>{{parseFloat(kongtouData.SOP.total_get_award) }}USDT</li><li>{{kongtouData.SOP.get_award_count }}</li><li>{{parseFloat(kongtouData.SOP.get_award_each_max)}}USDT</li><li>{{parseFloat(kongtouData.SOP.frost_get_award) }}USDT</li><li class="btn_a last"><router-link to="/zhangdan?type=SOP">{{$t('kongtouLA.zijin[10]')}}</router-link></li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('kongtouLA.yeji[0]')" name="second">
                        <div class="flex2">   
                            <div class="flexItem div1">
                                <h4>{{$t('kongtouLA.yeji[1]')}}</h4>
                                <p>{{list.zhitui_kongtou_total}}{{list.code}}</p>
                            </div>
                            <div class="flexItem div2">
                                <h4>{{$t('kongtouLA.yeji[2]')}}</h4>
                                <p>{{list.zhitui_award_total}}{{list.code}}</p>
                            </div>
                            <div class="flexItem div3">
                                <h4>{{$t('kongtouLA.yeji[3]')}}</h4>
                                <p>{{list.community_kongtou_total}}{{list.code}}</p>
                            </div>
                            <div class="flexItem div4">
                                <h4>{{$t('kongtouLA.yeji[4]')}}</h4>
                                <p>{{list.community_award_total}}{{list.code}}</p>
                            </div>
                        </div>
                        <el-table :data="tableData2" style="width: 100%">
                            <el-table-column prop="created_at" :label="$t('kongtouLA.yeji[5]')" width="500">
                            </el-table-column>
                            <el-table-column prop="money" :label="$t('kongtouLA.yeji[6]')" width="500">
                            </el-table-column>
                            <el-table-column prop="type" :label="$t('kongtouLA.yeji[7]')" width="280">
                            </el-table-column>
                        </el-table>
                        <el-pagination background layout="prev, pager, next" :total="page2.total"  @current-change="current_change2" :page-size='page2.pageSize' :current-page.sync="page2.pageNum"></el-pagination>
                    </el-tab-pane>
                    <table></table>
                </el-tabs>
        </div>
        <!-- <div style="clear: both"></div> -->
    </div>
    </template>
    <script>
      export default {
        data() {
            return {
                kongtouData:{
                    CNB:{code:'--'},
                    VT:{code:'--'},
                    SOP:{code:'--'},
                },
                options: [],
                list:{},
                value: 'CNB',
                activeName: 'first',
                tableData1:[
                ],
                tableData2:[
                ],
                yejiList:[],
                page1:{
                    pageNum:1,
                    pageSize:5,
                    total:1,
                },
                page2:{
                    pageNum:1,
                    pageSize:5,
                    total:1,
                },
                kongtouBi:'display:none',
            }
        },
        methods: {
            //获取首页信息
            kongtou(){
                var _this = this;
                _this.$http.get(_this.$http.kongtou,{params:{}}).then(function(res) {
                  if(res.data.code == '200') {
                      _this.kongtouData = res.data.data;
                 }
                })
            },
            //列表数据
            // billInfo(){
            //     _this.$http.get(_this.$http.billInfo,{params:{
            //         wall_code:'',
            //         page:'',
            //     }}).then(function(res) {
            //         console.log(res)
            //       if(res.data.code == '200') {
            //           console.log(res)
            //      }
            //     })
            // },
            //跳转账单页
            zhangdan(val){
            },
            //获取对应币种社区业绩
            yeji(val){
                var _this = this;
                _this.$http.get(_this.$http.kongtou,{params:{}}).then(function(response) {
                    if(response.data.code == '200') {
                        if(val=='CNB'){
                            _this.list = response.data.data.CNB
                        }else if(val=='VT'){
                            _this.list = response.data.data.VT
                        }else if(val=='SOP'){
                            _this.list = response.data.data.SOP
                        }
                    }
                })
            },
            change(val){
                this.yejiListt(val,1)
                this.yeji(val)
            },
            yejiListt(val,pageNum){
                var _this = this;
                _this.$http.get(_this.$http.getCommunityRewardLogs,{params:{
                    code:val,
                    page:pageNum,
                }}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.tableData2 = res.data.data.data;
                        for(let i = 0;i<res.data.data.data.length;i++){
                            _this.tableData2[i].money = parseFloat(_this.tableData2[i].money)+'USDT'
                            _this.tableData2[i].type = parseFloat(_this.tableData2[i].type)+'代'
                        }
                        _this.page2.pageSize = res.data.data.per_page;
                        _this.page2.total = res.data.data.total;
                    }else{
                        _this.public.msg(res.data.msg,'warning',_this)
                    }
                })
            },
            //tab切换
            handleClick(tab, event) {
                var _this = this;
                if(tab.name=='second'){
                    _this.kongtouBi = 'display:block';
                    _this.page2.pageNum = 1;
                    _this.yejiListt(_this.value,1);
                }else{
                    _this.kongtouBi = 'display:none';
                }
            },
          //点击分页获页数
            current_change1(i) {
                var _this = this;
            },
            current_change2(val) {
                var _this = this;
                _this.yejiListt(_this.value,val)
                // var k = (val-1)*_this.page2.pageSize
                // if(val==1){
                //     var k = 0
                // }
                // var arr = [];
                // for(var i = k;i<_this.page2.pageSize*val;i++){
                //     // if(_this.tableData2[i]){
                //         _this.tableData2[i].money = parseFloat(_this.tableData2[i].money) + 'USDT'
                //         _this.tableData2[i].type = parseFloat(_this.tableData2[i].type) + '代'
                //         arr.push(_this.tableData2[i])
                //     // }
                // }
                // _this.yejiList = arr
            },

        },
        mounted () {
            var _this = this;
            _this.kongtou();
            _this.yeji('CNB')
            _this.yejiListt(_this.value,1)
        }
      };
    </script>