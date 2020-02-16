<!--  -->
<template>
  <div class="mmOrder">
    <div class="mortgage_record">
      <div class="head">
        <h2>{{$t("mmOrder.header[0]")}} </h2>
        <el-select v-model="pid" @change="searchList">
          <el-option v-for="(item, index) in coinsArr" :label="item.mark" :value="item.pid" :key="index"></el-option>
        </el-select>
      </div>
      <!-- <div class="tabs">
        <div class="item active">全部</div>
        <div class="item">理财中</div>
        <div class="item">已成功</div>
      </div>-->

      <el-table :data="tableData" class="recordList">
        <template slot="empty">
          <img
            style="margin: 20px 0 -30px 0 "
            class="data-pic"
            src="../../assets/image/manage/zwxgjl-img.png"
            alt
          >
          <h4>{{$t("mmOrder.header[1]")}}</h4>
        </template>
        <el-table-column prop="addtime" :label='$t("mmOrder.header[2]")' width="170px">
          <template slot-scope="scope">
            <span>{{ $public.timestampToTime(scope.row.addtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" :label='$t("mmOrder.header[3]")' width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">{{$t('mortgage.table[15]')}}</span>
              <span v-if="scope.row.type == 2">{{$t('mortgage.table[16]')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="out_num" :label='$t("mmOrder.header[4]")'> <!-- 抵押保证金 -->
          <template slot-scope="scope">
            <span>{{ $public.toLowFixed(scope.row.out_num,8,0) + scope.row.out_pname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rate" :label='$t("mmOrder.header[5]")'> <!-- 利率 -->
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.rate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endtime" :label='$t("mmOrder.header[6]")' width="170px"> <!-- 到期时间 -->
          <template slot-scope="scope">
            <span>{{ $public.timestampToTime(scope.row.endtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="risk" :label='$t("mmOrder.header[7]")' width="150px"> <!-- 风险/状态 -->
          <template slot-scope="scope">
            <span>{{scope.row.risk_rate}}% / </span>
            <span v-if="scope.row.status == '1'"> {{$t('mortgage.table[10]')}}</span> <!-- 计息中 -->
            <span v-else>{{$t('mortgage.table[11]')}}</span> <!-- 已赎回 -->
          </template>
        </el-table-column>
        <el-table-column prop="in_num" :label='$t("mmOrder.header[8]")'> <!-- 借入金额 -->
          <template slot-scope="scope">
            <span>{{ $public.toLowFixed(scope.row.in_num,8,0) + scope.row.in_pname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fee" :label='$t("mmOrder.header[9]")'> <!-- 已产生利息 -->
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.fee) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="days" :label='$t("mmOrder.header[10]")'> <!-- 周期 -->
          <template slot-scope="scope">
            <span>{{ scope.row.days }} {{$t("mmOrder.tip[4]")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" :label='$t("mmOrder.header[11]")' min-width="140px;"> <!-- 操作 -->
          <template slot-scope="scope">
            <el-button style="padding:8px 16px;" v-if="scope.row.status == '1'" @click="makeUp(scope.row.tran_id, scope.row.out_pname)">{{$t("mmOrder.tip[6]")}}</el-button> <!-- 补仓 -->
            <el-button style="padding:8px 16px;" v-if="scope.row.status == '1'" @click="redeem(scope.row.tran_id)">{{$t("mmOrder.tip[5]")}}</el-button> <!-- 赎回 -->
            <span v-else>{{$t('mortgage.table[11]')}}</span> <!-- 已赎回 -->
          </template>
        </el-table-column>
      </el-table>

      
    </div>

    <div class="pagination" style="margin-bottom:20px" v-if="page.total != 0">
      <el-pagination
        layout="prev, pager, next"
        :prev-text="$t('managemoney.other[1]')" :next-text="$t('managemoney.other[2]')"
        :total="page.total"
        :current-page.sync="page.current"
        :page-count="5"
        @current-change="changePage"
      ></el-pagination>
    </div>

    <!-- 补仓 -->
    <div role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2064;" v-if="modalShow2">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{ $t('managemoney.other[6]') }}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="modalShow2 = false">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<el-form label-position="top" :model="bucangForm" status-icon :rules="bucangFormRules" ref="bucangForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label='' prop="">
							<span style="color:#75a7ff" v-if="bucangForm.out_code == 'USDT'">{{ $t('managemoney.other[7]') }}: {{ $public.toLowFixed(mortgage_balance,4,0) + bucangForm.out_code }}</span>
							<span style="color:#75a7ff" v-else>{{ $t('managemoney.other[7]') }}: {{ $public.toLowFixed(mortgage_balance,8,0) + bucangForm.out_code }}</span>
						</el-form-item>
						<el-form-item :label="$t('managemoney.other[8]')" prop="num" style="margin-top:-30px;">
							<el-input type="text" v-model.number="bucangForm.num" auto-complete="off" autocomplete="off" :placeholder="$t('managemoney.other[8]')"></el-input>
						</el-form-item>
						<el-form-item :label='$t("security.information[3]")' prop="tpwd">
							<el-input type="password" v-model="bucangForm.tpwd" auto-complete="off" autocomplete="off" :placeholder='$t("security.name[1]")'></el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button type="primary" class="btn_confirm" @click="submitBucang">{{$t("security.log[6]")}}</el-button>
							<el-button type="primary" plain class="btn_cancel" @click="modalShow2 = false">{{$t("security.log[7]")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  data() {
    var numRule = (rule, value, callback) => {
      if(!value) {
        return callback(new Error(this.$t('managemoney.other[9]')));
      } else {
        callback();
      }
    };
    var tpwdRule = (rule, value, callback) => {
      if(!this.$public.pwd(value)) {
        callback(new Error(this.$t("changetpwd.validateopwd")));//请输入有效的密码
      } else {
        callback();
      }
    };

    return {
      coinsArr: [],
      pid: '币种选择',
      tableData: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      mortgage_balance: 0,
      modalShow2: false,
      bucangForm: {
        tran_id: null,
        out_code: '',
        num: null,
        tpwd: ''
      },
      bucangFormRules: {
        num: [
          { validator: numRule, trigger: 'blur' }
        ],
        tpwd: [
          { validator: tpwdRule, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 币种列表
    coinsList() {
      this.coinsArr = [];
      this.$http.post(this.$http.liCai, {}).then(res => {
        if (res.data.status == '200') {
          this.coinsArr = res.data.data.asset;
        } else {
          this.$public.msg(res.data.msg, "error", this);
        }
      }).catch(err => {})
    },
    // 抵押记录
    showList(pid) {
      let data = {
        p: this.page.current,
        size: this.page.size
      };
      if (pid) {
        data.pid = pid;
      }
      this.$http.post(this.$http.mortgageRecord, data).then(res => {
          if (res.data.status == "200") {
            this.tableData = res.data.data.res;
            this.page.current = Number(res.data.data.p);
            this.page.total = Number(res.data.data.count);
          } else {
            this.$public.msg(res.data.msg, "error", this);
            this.tableData = [];
            this.page.current = 1;
            this.page.total = 0;
          }
        })
        .catch(err => {});
    },
    // 补仓
    makeUp(id, pname) {
      this.$http.post(this.$http.bucangAvailable, {out_code: pname}).then(res => {
        if (res.data.status == '200') {
          this.mortgage_balance = res.data.data.usable;
        } else {
          this.mortgage_balance = 0;
        }
      }).catch(err => {});
      this.bucangForm = {
        tran_id: null,
        out_code: '',
        num: null,
        tpwd: ''
      };
      this.bucangForm.tran_id = id;
      this.bucangForm.out_code = pname;
      this.modalShow2 = true;
    },
    // 提交补仓
    submitBucang() {
      this.$refs.bucangForm.validate((valid) => {
        if (valid) {
          this.bucangForm.tpwd = this.$md5(this.bucangForm.tpwd);
          this.$http.post(this.$http.mortgageLoanCover, this.bucangForm).then(res => {
            if (res.data.status == '200') {
              this.$public.msg(res.data.msg, 'success', this);
              this.modalShow2 = false;
              this.showList();
            } else {
              this.$public.msg(res.data.msg, 'error', this);
            }
          }).catch(err => {})
        } else {
          return false
        }
      })
    },
    // 还款
    redeem(id) {
      let cont = this.$t("mortgage.tip[9]");
        this.$http.post(this.$http.financialBackBreak, {type:1, tran_id: id}).then(res => {
          if (res.data.status == 200) {
            if (res.data.data.is_adv == 1) {
              cont = this.$t("mortgage.tip[10]");
            }
          } else {
            cont = this.$t("mortgage.tip[9]");
          }

          this.$confirm(cont, this.$t("mortgage.tip[11]"), {
            confirmButtonText: this.$t("mortgage.tip[12]"),
            cancelButtonText: this.$t("mortgage.tip[13]"),
            type: 'warning'
          }).then(() => {
            this.$http.post(this.$http.borrowPayBack, {
              order_id: id
            }).then(res => {
              if (res.data.status == '200') {
                this.$public.msg(res.data.msg, "success", this);
                this.showList();
              } else {
                this.$public.msg(res.data.msg, "error", this);
              }
            }).catch(err => {})  
      }).catch(() => {});
      });
    },
    // 币种查询
    searchList(val) {
      this.showList(val);
      this.page.current = 1;
    },
    changePage(i) {
      this.page.current = i;
      this.showList();
    }
  },
  mounted() {
    this.coinsList();
    this.showList();
  }
};
</script>
<style lang='less' scoped>
@import url("./mmOrder.less");
</style>