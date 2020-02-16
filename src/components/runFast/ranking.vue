<style lang=less>
  @import "../../assets/public.less";
  @import "../../assets/reset.less";
  @import "./ranking.less";
</style>
<template lang="html">
  <div class="rankingWrap">
    <asidebar></asidebar>
    <div class="conTent">
      <div class="rankheader">
        <div class="rankheadL">
          <h1 class="goldColor rankTitle">{{$t('runFast.ranking[0]')}}</h1>
          <h2 class="goldColor rankTitleSub">RANKING LIST</h2>
        </div>
        <div class="rankheadR">
          <img src="../../assets/img/rank.png">
        </div>
      </div>
      <div class="sel">
        <el-select v-model="codeValue" :placeholder="$t('runFast.ranking[1]')" popper-class="customSelect" class="customSelectBg"
          @change="codeChangeList">
          <el-option v-for="item in codeArr" :key="item.id" :label="item.code" :value="item.code">
          </el-option>
        </el-select>
        <el-select v-model="profitValue" :placeholder="$t('runFast.ranking[1]')" popper-class="customSelect" class="customSelectBg"
          style="margin-left:15px;" @change="profitChangeList">
          <!-- <el-option v-for="item in profitArr" :key="item.value" :label="$t('item.label')" :value="item.value"> -->
          <el-option v-for="item in profitArr" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <!-- 表格 -->
      <div class="rankTable">
        <el-table :data="tableData" class="customTableBg" header-row-class-name="customTableHeader"
          row-class-name="customTable" style="width: 100%">
          <el-table-column label="#" width="80px;">
            <template slot-scope="scope">
              <img v-if="scope.$index == 0" src="../../assets/img/top1.png">
              <img v-else-if="scope.$index == 1" src="../../assets/img/top2.png">
              <img v-else-if="scope.$index == 2" src="../../assets/img/top3.png">
              <span v-else>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('runFast.ranking[2]')">
            <template slot-scope="scope">
              <p>{{$public.nameEncryption(scope.row.name)}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="s_income" :label="$t('runFast.ranking[3]')"></el-table-column>
          <el-table-column prop="zuigao" :label="$t('runFast.ranking[4]')"></el-table-column>
          <el-table-column prop="leiji" :label="$t('runFast.ranking[5]')"></el-table-column>
        </el-table>
      </div>
      <div v-show="tableData.length != 0" style="margin-top:15px;">
        <el-pagination background layout="prev, pager, next" :total="parseInt(page.total)"
          @current-change="current_change1" :page-size='page.size' :current-page.sync="page.current"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import asidebar from "./asidebar.vue";
  export default {
    data() {
      return {
        codeArr: [],//币种列表
        codeValue: "USDT",//币种列表值
        profitArr: [
          {
            label: this.$t('ranking[0]'),
            value: "leiji"
          },
          {
            label: this.$t('ranking[1]'),
            value: "ranking"
          },
          // {
          //   label: this.$t('ranking[2]'),
          //   value: "zuigao"
          // },
          // {
          //   label: this.$t('ranking[3]'),
          //   value: "bank_money"
          // },
          // {
          //   label: this.$t('ranking[4]'),
          //   value: "bank_money_lirun"
          // },
          // {
          //   label: this.$t('ranking[5]'),
          //   value: "income"
          // },
          // {
          //   label: this.$t('ranking[6]'),
          //   value: "loss"
          // },
          // {
          //   label: this.$t('ranking[7]'),
          //   value: "num"
          // },
        ],//类型列表
        profitValue: "leiji",//类型列表值
        tableData: [],
        page: {
          size: 10,
          total: 0,
          current: 1
        }
      };
    },
    methods: {
      // 获取币种列表
      getCodeList() {
        var _this = this;
        _this.$http.post(_this.$http.currency, {}).then(res => {
          if (res.status == "200") {
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
        _this.showRankList(value,_this.profitValue);
      },
      profitChangeList(value) {
        var _this = this;
        _this.profitValue = value;
        _this.showRankList(_this.codeValue,value,1);
      },
      // 获取排行榜
      showRankList(val,tp,pg) {
        var _this = this;
        _this.$http.post(_this.$http.leaderboard, {
          money_type: _this.codeValue.toLowerCase(),
          type: tp,
          page:pg,
        }).then(res => {
          if (res.data.code == "200") {
            _this.tableData = res.data.data.data
            for(let i = 0; i<_this.tableData.length; i++){
              if(_this.tableData[i].name == ''){
                _this.tableData[i].name = '- - -'
              }
              if(_this.tableData[i].s_income == ''){
                _this.tableData[i].s_income = '- - -'
              }else{
                _this.tableData[i].s_income = String(_this.tableData[i].s_income).replace(/^(.*\..{4}).*$/,"$1");
              }
              if(_this.tableData[i].zuigao == ''){
                _this.tableData[i].zuigao = '- - -'
              }else{
                _this.tableData[i].zuigao = String(_this.tableData[i].zuigao).replace(/^(.*\..{4}).*$/,"$1");
              }
              if(_this.tableData[i].leiji == ''){
                _this.tableData[i].leiji = '- - -'
              }else{
                _this.tableData[i].leiji = String(_this.tableData[i].leiji).replace(/^(.*\..{4}).*$/,"$1");
              }
            }
            _this.page.total = res.data.data.total; 
            _this.page.size = res.data.data.per_page;
            _this.page.Number = pg;
            // {
            //   size: res.data.data.per_page,
            //   total: res.data.data.total,
            //   current: current_page,
            // }
          } else {
            _this.$public.msg(res.data.msg, 'warning', _this);
          }
        }).catch(err => { })
      },
      current_change1(i) {
        var _this = this;
        var item = Number(i);
        _this.showRankList(_this.codeValue,_this.profitValue,item);
      },
    },
    created: function () {
      var _this = this;
      _this.getCodeList();
      _this.showRankList(_this.codeValue,_this.profitValue,1)
    },
    components: {
      asidebar: asidebar
    }
  };
</script>