<style lang="less">
	@import './mangeMoney.less';
</style>
 
<template>
<div class="mangeMoney">
  <!-- 余额 -->
    <div class="mangeMoney_balance"> 
        <div class="title">
           <div v-for="(item, index) in coinList" :key="index" :class="{item:true, active:chooseCoinType == item.pname}" @click="changeMark(item.pname, item.pid)">
                <img :src="getSrc(item.pname)" />
                 <span>{{item.pname}}</span>   
            </div>
        </div>
        <div class="river"></div>
        <div class="details">
          <div class="item">
            <div class="title">
              <img src="./../../assets/image/manage/kyye-icon.png"></img>
              <span>{{$t('managemoney.header[0]')}} ({{chooseCoinType}})</span> <!-- 可用余额 -->
            </div>
            <div class="nums">{{coinData.usable==false?"0":$public.toLowFixed(coinData.usable,8,0)}}</div>
          </div>

          <div class="item">
            <div class="title">
              <img src="../../assets/image/manage/lcz-icon.png"></img>
              <span>{{$t('managemoney.header[1]')}}({{chooseCoinType}})</span> <!-- 理财中 -->
            </div>
            <div class="nums">{{$public.toLowFixed(coinData.lending_sum,8,0)}}</div>
          </div>

          <div class="item">
            <div class="title">
              <img src="../../assets/image/manage/yjsy-icon.png"></img> 
              <span>{{$t('managemoney.header[2]')}}({{chooseCoinType}})</span> <!-- 预计收益 -->
            </div>
            <div class="nums">{{$public.toLowFixed(coinData.expect,8,0)}}</div>
          </div>

          <div class="item">
            <div class="title">
              <img src="../../assets/image/manage//ljlc-icon.png"></img> <!-- 累计理财 -->
              <span>{{$t('managemoney.header[3]')}}:{{chooseCoinType}}</span>
            </div>
            <div class="nums">{{$public.toLowFixed(coinData.lend_sum,8,0)}}</div>
          </div>

          <div class="item">
            <div class="title">
              <img src="../../assets/image/manage/ljsy-icon.png"></img>
              <span>{{$t('managemoney.header[4]')}}:{{chooseCoinType}}</span> <!-- 累计收益 -->
            </div>
            <div class="nums">{{$public.toLowFixed(coinData.in_come,8,0)}}</div>
          </div>

        </div>
    </div>
    <!-- 数量 -->
    <div class="mangeMoney_price">
      <div class="profit">
        <div class="sltGroup">
          <el-select v-model="sltDate.year" @change="searchYear">
            <el-option
              v-for="item in 10"
              :key="item"
              :label="2017+item"
              :value="2017+item">
            </el-option>
          </el-select>
          <el-select class="month" v-model="sltDate.month" @change="searchMonth">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item < 10 ? '0'+item:item"
              :value="item">
            </el-option>
          </el-select>
        </div>
          <span>{{$t('managemoney.header[5]')}}: {{ chooseCoinType }}</span> <!-- 收益情况 -->
          <span class="nums">{{ $public.toLowFixed(amount_income,8,0) }}</span>
      </div>

    <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="form">
      <el-form-item class="iptNums" prop="num">
        <el-input v-model="formInline.num" :placeholder="$t('managemoney.place[0]')"></el-input>
        <span class="right_tips">{{ chooseCoinType }}</span>
      </el-form-item>
      <el-form-item class="iptrate" prop="rate">
        <el-select v-model="formInline.days" @change="selectRate" :placeholder="$t('managemoney.place[2]')">
          <el-option
            v-for="item in dateArr"
            :key="item.id"
            :label="item.days + $t('managemoney.other[0]')"
            :value="item.days">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="sltDays" prop="days">
        <el-input readonly v-model="formInline.rate" :placeholder="$t('managemoney.place[1]')"></el-input>
        <span class="right_tips right_tips2">%</span>
      </el-form-item>
      <el-form-item  class="iptNums" prop="tpwd">
        <el-input type="password" v-model="formInline.tpwd" :placeholder="$t('managemoney.place[9]')"></el-input>
      </el-form-item>

      <el-form-item class="auto" prop="is_auto">
        <el-checkbox v-model="formInline.is_auto">{{$t('managemoney.tip[0]')}}</el-checkbox>
        <el-tooltip popper-class="popperTip" class="help" effect="dark" :content="$t('managemoney.tip[1]')" placement="top-end">
          <img src="../../assets/image/manage/wenhao.png">
        </el-tooltip>
      </el-form-item>
      <el-form-item class="submit">
        <p>{{$t('managemoney.tip[2]')}}</p>
        <div class="btn-submit" @click="onSubmit">{{$t('managemoney.tip[3]')}}</div>
      </el-form-item>
    </el-form>
    </div>
    <!-- 记录 -->
    <div class="mangeMoney_record">
      <h2>{{$t('managemoney.status[0]')}}</h2>
      <div class="tabs">
        <div class="item" :class="index == -1 ? 'active' : '' " @click="toggleRecord(-1)">{{$t('managemoney.status[1]')}}</div>
        <div class="item" :class="index == 1 ? 'active' : '' " @click="toggleRecord(1)">{{$t('managemoney.status[2]')}}</div>
        <div class="item" :class="index == 2 ? 'active' : '' " @click="toggleRecord(2)">{{$t('managemoney.status[3]')}}</div>
      </div>

      <el-table :data="tableData" class="recordList">
        <template slot="empty">
          <img style="margin: 20px 0 -30px 0 " class="data-pic" src="../../assets/image/manage/zwxgjl-img.png" alt="" />
          <h4 >{{$t('managemoney.status[4]')}}</h4>
        </template>
          <el-table-column prop="addtime" :label="$t('managemoney.table[0]')" width="150"> <!-- 发布时间 -->
            <template slot-scope="scope">
              <span>{{ $public.timestampToTime(scope.row.addtime) }}</span>
            </template> 
          </el-table-column>
          <el-table-column prop="status" :label="$t('managemoney.table[1]')">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">{{$t('managemoney.status[5]')}}</span>
              <span v-else-if="scope.row.status == 2">{{$t('managemoney.status[6]')}}</span>
              <span v-else>----</span>
            </template>
          </el-table-column>
          <el-table-column prop="num" :label="$t('managemoney.table[2]')" width="100">
            <template slot-scope="scope">
              <span>{{ $public.toLowFixed(scope.row.num,8,0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="interest_rate" :label="$t('managemoney.table[3]')" width="100">
            <template slot-scope="scope">
              <span>{{ parseFloat(scope.row.interest_rate) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="days" :label="$t('managemoney.table[4]')">
            <template slot-scope="scope">
              <span>{{ scope.row.days }} {{$t('managemoney.other[0]')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dayth" :label="$t('managemoney.table[5]')"> <!-- 完成进度 -->
            <template slot-scope="scope">
              <span>{{ scope.row.dayth }} {{$t('managemoney.other[0]')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="endtime" :label="$t('mmOrder.header[6]')" width="170"> <!-- 到期时间 -->
            <template slot-scope="scope">
              <span>{{ $public.timestampToTime(scope.row.endtime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="is_auto" :label="$t('managemoney.table[6]')"> <!-- 是否自动房贷 -->
            <template slot-scope="scope">
              <span v-if="scope.row.is_auto == 0">{{$t('managemoney.other[5]')}}</span> <!-- 否 -->
              <span v-else-if="scope.row.is_auto == 1">{{$t('managemoney.other[4]')}}</span> <!-- 是 -->
            </template>
          </el-table-column>
          <el-table-column prop="income" :label="$t('managemoney.table[7]')" width="120"> <!-- 收益 -->
            <template slot-scope="scope">
              <span>{{ $public.toLowFixed(scope.row.income,8,0) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('managemoney.table[8]')" width="150"> <!-- 操作 -->
            <template slot-scope="scope">
              <el-button v-if="scope.row.status == 1" @click="redeem(scope.row.tran_id, scope.row.num)">{{$t('managemoney.status[7]')}}</el-button>
              <span v-else-if="scope.row.status == 2">{{$t('managemoney.status[6]')}}</span>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="pagination" style="margin-bottom:20px;" v-if="page.total>0">
      <el-pagination layout="prev, pager, next" :prev-text="$t('managemoney.other[1]')"  :next-text="$t('managemoney.other[2]')" :total="page.total" :current-page.sync="page.current" :page-count="5" @current-change="changePage"></el-pagination>
    </div>
</div>
</template>
<script>
  export default {
    data() {
      var validateNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t("managemoney.place[0]")));
          // return callback(new Error(this.$t("header.place[0]")));
        } else if (!this.$public.integerDecimal(value)) {
          return callback(new Error(this.$t("managemoney.place[3]")));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('managemoney.other[3]')));
        } else {
          callback();
        }
      };
      var validateRate = (rule, value, callback) => {
        if (!/^[0-9]+\.?[0-9]*$/.test(value)) {
          return callback(new Error(this.$t("managemoney.place[1]")));
        } else if (value > 0.2 || value < 0.05) {
          return callback(new Error(this.$t("managemoney.place[1]")));
        } else {
          callback();
        }
      };

      return {
        coinList:[],
        coinData:{
          usable:'0',
          lending_sum:'0',
          expect: '0',
          lend_sum: '0',
          in_come: '0'
        },
        amount_income: 0,
        chooseCoinType: '',
        choosePid: -1,
        checked: '',
        url: require("../../assets/image/manage/ETH.png"),
        activeName: 'second',
        sltDate:{
          year: '',
          month: ''
        },
        formInline: {
          num: '',
          rate: '',
          days: '',
          is_auto: false,
          tpwd:""
        },
        dateArr: [],
        rules: {
          num:[
            { validator: validateNum, trigger: 'blur' }
          ],
          tpwd:[
            { validator: validatePassword, trigger: 'blur' }
          ],
          days:[
            { required: true, message: this.$t('managemoney.place[2]'), trigger: 'blur' }
          ],
          // rate:[
          //   { validator: validateRate, trigger: 'blur' }
          // ]
        },
        tableData: [],
        page: {
          current: 1,
          size: 10,
          total: 0
        },
        index: -1
      };
    },
    methods: {
      // 币种列表
      coinsList() {
        this.coinList = [];
        this.$http.post(this.$http.lend_coin_list, {}).then(res => {
          if (res.data.status == '200') {
            this.coinList = res.data.data;
            this.chooseCoinType = res.data.data[0].pname;
            this.choosePid = res.data.data[0].pid;
            this.dateArr = res.data.data[0].day_rate;
            this.coinToInfo();
            this.incomeSituation();
            this.showRecord();
          } else {
            this.$public.msg(res.data.msg, "error", this);
            this.chooseCoinType = '';
            this.choosePid = -1;
            this.dateArr = [];
          }
        }).catch(err => {})
      },
      selectRate(day) {
        this.dateArr.forEach(val => {
          if (val.days == day) {
            this.formInline.rate = parseFloat(Number(val.rate).toFixed(2));
          }
        })
      },
      // 对应币种图片
      getSrc(name) {
        switch (name){
        case "USDT":
          return require(`../../assets/image/manage/usdt.png`);
          break;
        case "BTC":
          return require(`../../assets/image/manage/btc.png`);
          break;
        case "ETH":
          return require(`../../assets/image/manage/ETH.png`);
          break;
        case "OMG":
          return require(`../../assets/image/manage/OMG.png`);
          break;
        case "ZRX":
          return require(`../../assets/image/manage/ZRX.png`);
          break;
        case "GNT":
          return require(`../../assets/image/manage/GNT.png`);
          break;
        case "MANA":
          return require(`../../assets/image/manage/MANA.png`);
          break;
        case "PST":
          return require(`../../assets/image/manage/PST.png`);
          break;
        case "CQTF":
          return require(`../../assets/image/manage/CQTF.png`);
          break;
        case "BAT":
          return require(`../../assets/image/manage/BAT.png`);
          break;
        }
      },
      // 币种对应信息
      coinToInfo() {
        let data = {
          code: this.chooseCoinType
        };
        this.$http.post(this.$http.lend_blend, data).then(res => {
          if (res.data.status == '200') {
            this.coinData = res.data.data;
          } else {
            this.$public.msg(res.data.msg, "error", this);
          }
        }).catch(err => {})
      },
      searchYear(year) {
        this.sltDate.year = year;
        this.incomeSituation();
      },
      searchMonth(month) {
        this.sltDate.month = month;
        this.incomeSituation();
      },
      // 年月时  收益情况
      incomeSituation() {
        let data = {
          code: this.chooseCoinType,
          start: this.computeTime(this.sltDate.year, this.sltDate.month)[0],
          end: this.computeTime(this.sltDate.year, this.sltDate.month)[1],
        };
        this.$http.post(this.$http.lend_blend, data).then(res => {
          if (res.data.status == '200') {
            this.amount_income = res.data.data.in_come;
          } else {
            this.amount_income = 0;
            this.$public.msg(res.data.msg, "error", this);
          }
        }).catch(err => {})
      },
      // 币种改变时
      changeMark(val, pid) {
        this.chooseCoinType = val;
        this.choosePid = pid;
        this.index = -1;
        this.$refs.formInline.resetFields();
        this.coinList.forEach(item => {
          if (item.pname == val) {
            this.dateArr = item.day_rate;
          }
        });
        var date = new Date();
        this.sltDate.year = date.getFullYear();
        this.sltDate.month = date.getMonth() + 1;
        this.coinToInfo();
        this.incomeSituation();
        this.showRecord();
        this.showRecord();
      },
      // 理财挂单
      onSubmit() {
        let tpwd = sessionStorage.getItem('tpwd');
        if (!tpwd) {
          this.$confirm(this.$t('mortgage.tip[3]'), this.$t("mortgage.tip[4]"), {
            confirmButtonText: this.$t("mortgage.tip[5]"), // 确定
            cancelButtonText: this.$t("mortgage.tip[6]"),  // 取消
            type: 'warning'
          }).then(() => {
            this.$router.push('changetpwd2');
          }).catch(() => {
            return
          })
          return
        }
        this.$refs.formInline.validate((valid) => {
          if (valid) {
            let tsdata = {
              code: this.chooseCoinType,
              // tpwd: sessionStorage.getItem('tpwd'),
            };
            if(this.formInline.is_auto){
              this.formInline.is_auto = '1'
            }else{
              this.formInline.is_auto = '0'
            }
            this.formInline.tpwd = this.$md5(this.formInline.tpwd)
            let data = Object.assign({}, this.formInline, tsdata);
            
            this.$http.post(this.$http.financialStatement, data).then(res => {
              if (res.data.status == '200') {
                this.$public.msg(res.data.msg, "success", this);
                this.coinToInfo();
                this.showRecord();
                this.formInline = {
                  num: '',
                  rate: '',
                  days: '',
                  is_auto: false,
                  tpwd:''
                };
              } else {
                this.$public.msg(res.data.msg, "error", this);
                this.formInline = {
                  num: '',
                  rate: '',
                  days: '',
                  is_auto: false,
                  tpwd:''
                };
              }
            }).catch(err => {})
          } else {
            return false
          }
        });
      },
      // 切换理财记录状态 
      toggleRecord(index) {
        this.index = index;
        this.showRecord();
      },
      // 理财记录
      showRecord() {
        let data = {
          p: this.page.current,
          size: this.page.size
        };

        if (this.choosePid != -1) {
          data.pid = this.choosePid;
        }

        if (this.index != -1) {
          data.status = this.index;
        }

        this.$http.post(this.$http.transrecord, data).then(res => {
          if (res.data.status == '200') {
            this.tableData = res.data.data.res;
            this.page.current = Number(res.data.data.p);
            this.page.total = Number(res.data.data.count);
          } else {
            this.$public.msg(res.data.msg, "error", this);
            this.page.total = 0;
            this.tableData = [];
          }
        })
      },
      // 理财赎回
      redeem(id, num) {
        let cont = this.$t('managemoney.place[4]');
        this.$http.post(this.$http.financialBackBreak, {type:2, tran_id: id}).then(res => {
          if (res.data.status == 200) {
            if (res.data.data.is_adv == 1) { 
              cont = this.$t('managemoney.place[10]') + parseInt(res.data.data.fine_rate) + '%' + this.$t('managemoney.place[11]');
            }
          } else {
            cont = this.$t('managemoney.place[4]');
          }

          this.$confirm(cont, this.$t('managemoney.place[6]'), {
            confirmButtonText: this.$t('managemoney.place[7]'),
            cancelButtonText: this.$t('managemoney.place[8]'),
            type: 'warning'
          }).then(() => {
            this.$http.post(this.$http.financialBack, {
              order_id: id
            }).then(res => {
              if (res.data.status == '200') {
                this.$public.msg(res.data.msg, "success", this);
                this.showRecord();
                this.coinToInfo();
                this.incomeSituation();
              } else {
                this.$public.msg(res.data.msg, "error", this);
              }
            }).catch(err => {})  
          }).catch(() => {});

        }).catch(err => {});
      },
      changePage(i){
        this.page.current = i;
        this.showRecord();
      },
      // 获取月末初时间戳
      computeTime(year, month){
        return [
            String(Number(new Date(year, month - 1, 1).getTime())/1000),
            String(Number(new Date(year, month, 0).getTime())/1000)
        ]
      }
    },
    mounted () {
      this.coinsList();
      var date = new Date();
      this.sltDate.year = date.getFullYear();
      this.sltDate.month = date.getMonth() + 1;
    }
  };
</script>