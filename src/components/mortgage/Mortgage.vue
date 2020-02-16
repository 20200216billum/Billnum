<style lang="less">
	@import './mortgage.less';
</style>
 
<template>
<div class="mortgage">
    <div class="mortgage_opreation">
        <h1>{{$t('mortgage.header[0]')}}</h1>
        <h4>{{$t('mortgage.header[1]')}}</h4>
        <div class="opreation">
            <div class="item lendMoney" @click="showModal('moeny')">
                <img src="../../assets/image/manage/wyjq-icon.png" alt="">
                <div class="content">
                    <div class="title">{{$t('mortgage.header[2]')}}</div>
                    <div class="info">{{$t('mortgage.header[3]')}}</div>
                </div>
                <img style="width:42px; height:35px"  src="../../assets/image/manage/wyjq-jt-icon.png" alt="">
            </div>
 
            <div class="river"></div>

            <div class="item lendCoin "  @click="showModal('coin')">
                <img src="../../assets/image/manage/wyjb-icon.png" alt="">
                <div class="content">
                    <div class="title">{{$t('mortgage.header[4]')}}</div>
                    <div class="info">{{$t('mortgage.header[5]')}}</div>
                </div>
                <img style="width:42px; height:35px" src="../../assets/image/manage/wyjb-jt-icon.png" alt="">
            </div>
        </div>
    </div>

    <div v-if="explain" class="mortgage_explain">
        <h2>{{$t('mortgage.header[6]')}}</h2>
        <div v-html='ruleContent' class="rules_content" style="line-height:1.6; width:70%; font-size:14px;"></div>
        <div class="rateImg" @click="changeRouter('mortgageLending')">
          <img src="../../assets/image/manage/dyjd-img.png" alt="">
          <p>{{$t('mortgage.header[7]')}}</p>
        </div>
        <img @click="explain = false" src="../../assets/image/fabu/×.png" class="close" alt="">
    </div>
    <!-- 抵押记录 -->
    <div class="mortgage_record">
      <h2>{{$t('mortgage.table[0]')}}</h2>
     
      <el-table :data="tableData" class="recordList">
        <template slot="empty">
          <img style="margin: 20px 0 -30px 0 " class="data-pic" src="../../assets/image/manage/zwxgjl-img.png" alt="" />
          <h4 >{{$t('mortgage.table[1]')}}</h4>
        </template>
          <el-table-column prop="addtime" :label="$t('mortgage.table[2]')" width="150px" >
            <template slot-scope="scope">
              <span>{{ $public.timestampToTime(scope.row.addtime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('mortgage.table[3]')" width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">{{$t('mortgage.table[15]')}}</span>
              <span v-if="scope.row.type == 2">{{$t('mortgage.table[16]')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="risk_rate" :label="$t('mortgage.table[4]')" width="150px"> <!-- 风险/状态 -->
            <template slot-scope="scope">
              <span>{{scope.row.risk_rate}}% / </span>
              <span v-if="scope.row.status == '1'"> {{$t('mortgage.table[10]')}}</span> <!-- 计息中 -->
              <span v-else>{{$t('mortgage.table[11]')}}</span> <!-- 已赎回 -->
            </template>
          </el-table-column>
          <el-table-column prop="out_num" :label="$t('mmOrder.header[4]')" width="100px"> <!-- 抵押保证金 -->
            <template slot-scope="scope">
              <span>{{ $public.toLowFixed(scope.row.out_num,8,0) + scope.row.out_pname }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="in_num" :label="$t('mmOrder.header[8]')" width="100px"> <!-- 借入金额 -->
            <template slot-scope="scope">
              <span>{{ $public.toLowFixed(scope.row.in_num,8,0) + scope.row.in_pname }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="rate" :label="$t('mortgage.table[5]')" width="100px"> <!-- 利率 -->
            <template slot-scope="scope">
              <span>{{ $public.toLowFixed(scope.row.rate,4,0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('mortgage.table[6]')" width="100px"> <!-- 已产生利息 -->
            <template slot-scope="scope">
              <span>{{ $public.toLowFixed(scope.row.fee,4,0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="endtime" :label="$t('mortgage.table[7]')" width="150px"> <!-- 最迟赎回日期 -->
            <template slot-scope="scope">
              <span>{{ $public.timestampToTime(scope.row.endtime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="selltime" :label="$t('mortgage.table[8]')" width="150px"> <!-- 实际赎回日期 -->
            <template slot-scope="scope">
              <span v-if="scope.row.selltime">{{ $public.timestampToTime(scope.row.selltime) }}</span>
              <span v-else>----</span>
            </template>
          </el-table-column>  
          <el-table-column prop="status"  :label="$t('mortgage.table[9]')"> <!-- 操作 -->
            <template slot-scope="scope">
              <el-button style="padding:8px 16px;" v-if="scope.row.status == '1'" @click="makeUp(scope.row.tran_id, scope.row.out_pname)">{{$t("mmOrder.tip[6]")}}</el-button> <!-- 补仓 -->
              <el-button style="padding:8px 16px;" v-if="scope.row.status == '1'" @click="redeem(scope.row.tran_id)">{{$t('mortgage.table[14]')}}</el-button> <!-- 赎回 -->
              <span v-else>{{$t('mortgage.table[11]')}}</span> <!-- 已赎回 -->
            </template>
          </el-table-column>
      </el-table>

    </div>
    <div class="pagination" style="margin-bottom:20px;" v-if="page.total != 0">
      <el-pagination layout="prev, pager, next" :prev-text="$t('managemoney.other[1]')" :next-text="$t('managemoney.other[2]')" :total="page.total" :current-page.sync="page.current" :page-count="5" @current-change="changePage"></el-pagination>
    </div>
    <!-- 我要借币 弹框-->
    <div class="modal coin" v-if="modalShow">
        <div class="content">
            <div class="head">
                <span v-if="modalType=='coin'">{{$t('mortgage.text[0]')}}</span>
                <span v-else>{{$t('mortgage.text[1]')}}</span>
                <img  @click="closeModal" style="cursor:pointer" src="../../assets/image/fabu/×.png" alt="">
            </div>
            <el-form :model="modalData" ref="modalData" :rules="rules" :hide-required-asterisk="true" class="form">
              <el-form-item class="slt sltCoinType" :label="$t('mortgage.text[2]')" prop="out_code">
                  <!-- <span>{{modalData.type}}</span> -->
                  <el-select v-model="modalData.out_code" v-if="modalType=='coin'" @change="postMortgage">
                    <el-option
                      v-for="item in options2"
                      :key="item.pid"
                      :label="item.mark"
                      :value="item.mark">
                    </el-option>
                  </el-select>
                  <el-select v-model="modalData.out_code" v-else @change="postMortgage">
                    <el-option
                      v-for="item in options"
                      :key="item.pid"
                      :label="item.mark"
                      :value="item.mark">
                    </el-option>
                  </el-select>
                  <div class="tips">
                    <span>
                      {{$t('mortgage.text[3]')}}:
                      <span class="nums" v-if="formTips.pname == 'USDT'">{{ $public.toLowFixed(formTips.usable,4,0) + " " +formTips.pname }}</span>
                      <span class="nums" v-else>{{ $public.toLowFixed(formTips.usable,8,0) + " " +formTips.pname }}</span>
                    </span>
                    <span v-if="modalType=='moeny'">{{$t('mortgage.text[4]')}}：<span class="nums">￥ {{ $public.toLowFixed(formTips.price_cny,2,0) }}</span></span> <!-- 参考价 -->
                    <!-- <span v-if="modalType=='moeny'">USDT/BTC {{$t('mortgage.text[4]')}}：<span class="nums">￥ {{ parseFloat(Number(formTips.price_cny).toFixed(2)) }}</span></span> -->
                  </div>
              </el-form-item>
              <el-form-item class="iptNums available" prop="num">
                  <el-input  type="text" v-model="modalData.num" :placeholder="$t('mortgage.text[5]')">
                  </el-input>
                  <div class="tips">
                    <!-- <span>{{$t('mortgage.text[6]')}}:{{brrowInfo.out_num}}</span> -->
                  </div>
              </el-form-item>
              <el-form-item class=" slt sltAround" prop="days" :label="modalType=='coin' ? $t('mortgage.text[8]') : $t('mortgage.text[9]')"> <!-- 借款周期 -->
                  <el-select v-model="modalData.days" @change="postBorrow">
                    <el-option
                        v-for="item in dateArr"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"> 
                    </el-option>
                  </el-select>
                  <div class="tips"> <!-- 年化利率 -->
                    <span v-if="modalType=='coin'">{{ $t('mortgage.text[10]') + ":" + parseFloat(Number(brrowInfo.rate)) +"%" }}</span>
                    <span v-else>{{ $t('mortgage.text[11]') + ":" + parseFloat(Number(brrowInfo.rate)) +"%" }}</span>
                  </div>
              </el-form-item>
              <el-form-item class="slt sltCoinType" prop="in_code" :label="modalType=='coin' ? $t('mortgage.text[12]'): $t('mortgage.text[13]')"> <!-- 借款币种 -->
                  <el-select v-model="modalData.in_code" @change="postBorrow">
                    <el-option
                      v-for="item in options3"
                      :key="item.pid"
                      :label="item.mark"
                      :value="item.mark">
                    </el-option>
                  </el-select>
                  <div class="tips">
                    <span class="maxNums">{{$t('mortgage.text[14]')}}:{{ Number(brrowInfo.in_num) + " " + brrowInfo.in_code }}</span> <!-- 最多可借 -->
                    <span v-if="modalType=='coin'">{{$t('mortgage.text[15]')}}:<span class="nums">￥ {{ $public.toLowFixed(formTips.price_cny,2,0) }}</span></span> <!-- 参考价 -->
                    <!-- <span v-if="modalType=='coin'" >USDT/BTC {{$t('mortgage.text[15]')}}:<span class="nums">￥ {{ parseFloat(Number(formTips.price_cny).toFixed(2)) }}</span></span> -->
                  </div>
              </el-form-item>
              <el-form-item class="iptNums available" prop="in_num">
                  <el-input  type="text" v-model="modalData.in_num" :placeholder="$t('mortgage.text[16]')">
                  </el-input>
                  <div class="tips">
                    <!-- <span v-if="modalType=='coin'">{{$t('mortgage.text[17]')}}</span>
                    <span v-else>{{$t('mortgage.text[18]')}}</span> -->
                    <span>{{ $t('mortgage.text[23]') }} </span>
                  </div>
              </el-form-item>
              <el-form-item class="iptNums available" prop="tpwd"> <!-- 资金密码 -->
                  <el-input   type="password" v-model="modalData.tpwd" :placeholder="$t('mortgage.tip[14]')">
                  </el-input>
              </el-form-item>
              <el-form-item class="warning" >
                  {{$t('mortgage.text[19]')}}<br>
                  {{ $t('mortgage.text[20]') + $public.toLowFixed(mortgage_rate,2,0) + "%" + $t('mortgage.text[24]') }}<br>
              </el-form-item>
              <el-form-item class="submit">
                  <div class="btn-submit" @click="onSubmit" v-if="modalType=='coin'">{{$t('mortgage.text[21]')}}</div>
                  <div class="btn-submit" @click="onSubmit" v-else>{{$t('mortgage.text[22]')}}</div>
              </el-form-item>
            </el-form>
        </div>

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
							<el-input type="text" v-model.number="bucangForm.num" auto-complete="off" :placeholder="$t('managemoney.other[8]')"></el-input>
						</el-form-item>
						<el-form-item :label='$t("security.information[3]")' prop="tpwd">
							<el-input type="password" v-model="bucangForm.tpwd" auto-complete="off" :placeholder='$t("security.name[1]")'></el-input>
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
import { truncate } from 'fs';
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
        explain: true,
        modalShow: false,
        modalType: '',
        ruleContent: '',
        modalData:{
          out_code: '',
          num: '',
          days: '',
          in_code: '',
          in_num: '',
          tpwd: ''
        },
        dateArr: [
          {
            label: '30天',
            value: '30'
          },
          {
            label: '60天',
            value: '60'
          },
          {
            label: '180天',
            value: '180'
          }
        ],
        rules: {
          out_code:[ 
            { required: true, message: ' ', trigger: 'blur' }
          ],
          num:[
            { required: true, message: ' ', trigger: 'blur' }
          ],
          days:[
            { required: true, message: ' ', trigger: 'blur' }
          ],
          in_code:[
            { required: true, message: ' ', trigger: 'blur' }
          ],
          in_num:[
            { required: true, message: ' ', trigger: 'blur' }
          ]
        },
        page: {
          current: 1,
          size: 10,
          total: 0
        },
        tableData: [],
        options: [],
        options2: [],
        options3: [],
        formTips: {
          pname: '',
          usable: 0.00000000,
          price_cny: 0.00
        },
        brrowInfo: {
          in_num: 0.00000000,
          in_code: '',
          out_num: 1,
          rate: 0
        },
        mortgage_rate: 0,
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
      // 抵押借贷规则
      showBorrowRules() {
        let zh_en = this.$cookies.get('language');
        this.$http.post(this.$http.borrowRule, {}).then(res => {
          if (res.data.status == '200') {
            if (zh_en == 'Chinese') {
              this.ruleContent = res.data.data.rule;
            } else if (zh_en == 'English') {
              this.ruleContent = res.data.data.rule_en;
            } else {
              this.ruleContent = ""
            }
          }
        }).catch(err => {})
      },
      // 跳转页面
      changeRouter(name) {
        this.$router.push(name);
      },
      // 抵押借款违约金率
      postMortgageRate() {
        this.$http.post(this.$http.mortgageRate, {}).then(res => {
          if (res.data.status == '200') {
            this.mortgage_rate = res.data.data.fine_rate;
          } else {
            this.$public.msg(res.data.msg, 'error', this);
            this.mortgage_rate = 0;
          }
        }).catch(err => {});
      },
      // 关闭借款弹窗
      closeModal() {
        for(var key in this.modalData)this.modalData[key]=""
        this.modalShow = false;
        this.modalType = ''
      },
      // 打开借款弹窗
      showModal(type) {
        this.modalType = type
        this.modalShow = true;
        this.modalData = {
          out_code: '',
          num: '',
          days: '',
          in_code: '',
          in_num: '',
          tpwd: ''
        };
        this.formTips = {
          pname: '',
          usable: 0.00000000,
          price_cny: 0.00
        };
        this.brrowInfo = {
          in_num: 0.00000000,
          in_code: '',
          out_num: 1,
          rate: 0
        };
        this.postCoinsList();
        this.postCoinsList2();
        this.postMortgageRate();
      },
      // 获取抵押币信息
      postMortgage(val) { 
        this.$http.post(this.$http.mortgageInfo, { 
          out_code: val,
          type:  this.modalType == 'coin' ? 2 : 1
          }).then(res => {
          if (res.data.status == "200") {
            this.formTips = res.data.data;
            this.options3 = res.data.data.in_coins;
          } else {
            this.formTips = {
              pname: '',
              usable: 0.00000000,
              price_cny: 0.00
            };
            this.options3 = [];
            this.$public.msg(res.data.msg, 'error', this);
          }
        }).catch(err => {});

        this.postBorrow();
      },
      // 获取借入币信息
      postBorrow() {
        if (!this.modalData.out_code) {
          // this.$public.msg(this.$t("mortgage.tip[0]"), 'warning', this);
          return
        }
        if (!this.modalData.num) {
          // this.$public.msg(this.$t("mortgage.tip[1]"), 'warning', this);
          return
        }
        if (!this.modalData.days) {
          // this.$public.msg(this.$t("mortgage.tip[2]"), 'warning', this);
          return
        }

        if (!this.modalData.in_code) {
          // this.$public.msg(this.$t("mortgage.tip[2]"), 'warning', this); 
          return
        }

        let data = {
          in_code: this.modalData.in_code,
          out_code: this.modalData.out_code,
          num: this.modalData.num,
          days: this.modalData.days,
          type: this.modalType == 'coin' ? 2 : 1
        };
        this.$http.post(this.$http.borrowedInfo, data).then(res => {
          if (res.data.status == "200") {
            this.brrowInfo= res.data.data;
          } else {
            this.brrowInfo = {
              in_num: 0.00000000,
              in_code: '',
              out_num: 1,
              rate: 0
            };
            this.$public.msg(res.data.msg, 'error', this);
          }
        }).catch(err => {})
      },
      // 提交借款
      onSubmit() {
        let tpwd = sessionStorage.getItem('tpwd');
        if (!tpwd) {
          this.$confirm(this.$t("mortgage.tip[3]"), this.$t("mortgage.tip[4]"), {
            confirmButtonText: this.$t("mortgage.tip[5]"),
            cancelButtonText: this.$t("mortgage.tip[6]"),
            type: 'warning'
          }).then(() => {
            this.$router.push('changetpwd2');
          }).catch(() => {
            return
          })
          return
        }
        if (!this.modalData.out_code) {
          this.$public.msg(this.$t("mortgage.tip[0]"), 'warning', this);
          return
        }
        if (!this.modalData.num) {
          this.$public.msg(this.$t("mortgage.tip[1]"), 'warning', this);
          return
        }
        if (!this.modalData.days) {
          this.$public.msg(this.$t("mortgage.tip[2]"), 'warning', this);
          return
        }
        if (!this.modalData.in_code) {
          this.$public.msg(this.$t("mortgage.tip[7]"), 'warning', this);
          return
        }
        if (!this.modalData.in_num) {
          this.$public.msg(this.$t("mortgage.tip[8]"), 'warning', this);
          return
        }
        if (!this.modalData.tpwd) {
          this.$public.msg(this.$t("mortgage.tip[14]"), 'warning', this);
          return
        }

        this.$refs.modalData.validate((valid) => {
          if (valid) {
            if (this.modalType=='coin') {
              this.modalData.type = 2;
            } else {
              this.modalData.type = 1;
            }
            this.modalData.tpwd = this.$md5(this.modalData.tpwd)
            this.$http.post(this.$http.mortgageLoan, this.modalData).then(res => {
              if (res.data.status == "200") {
                this.modalShow = false;
                this.$public.msg(res.data.msg, 'success', this);
                this.showList();
                this.modalData = {
                  out_code: '',
                  num: '',
                  days: '',
                  in_code: '',
                  in_num: '',
                  tpwd: ''
                };
                
              } else {
                this.$public.msg(res.data.msg, 'error', this);
                this.modalData = {
                  out_code: '',
                  num: '',
                  days: '',
                  in_code: '',
                  in_num: '',
                  tpwd: ''
                };
              }
            })
          } else {
            return false
          }
        })
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
      // 可抵押币种列表
      postCoinsList() {
        this.$http.post(this.$http.coinsList, { type:1 }).then(res => {
          if (res.data.status == "200") {
            this.options = res.data.data;
          } else {
            this.options = [];
            this.$public.msg(res.data.msg, 'error', this);
          }
        }).catch(err => {})
      }, 
      // 可抵押钱列表
      postCoinsList2() {
        this.$http.post(this.$http.coinsList, { type:2 }).then(res => {
          if (res.data.status == "200") {
            this.options2 = res.data.data;
          } else {
            this.options2 = [];
            this.$public.msg(res.data.msg, 'error', this);
          }
        }).catch(err => {})
      }, 
      // 抵押记录
      showList() {
        let data = {
          p: this.page.current,
          size:this.page.size
        };
        this.$http.post(this.$http.mortgageRecord, data).then(res => {
          if (res.data.status == "200") {
            this.tableData = res.data.data.res;
            this.page.current = Number(res.data.data.p);
            this.page.total = Number(res.data.data.count);
          } else {
            this.$public.msg(res.data.msg, 'error', this);
            this.tableData = [];
            this.page.current = 1;
						this.page.total = 0;
          }
        }).catch(err => {})
      },
      changePage(i){
        this.page.current = i;
        this.showList();
			},
    },
    mounted() {
      this.showBorrowRules();
      this.showList();
    }
  };
</script>