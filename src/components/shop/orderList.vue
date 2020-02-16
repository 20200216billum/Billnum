<!--  -->
<template>
  <div class="shop_order_wrap">
    <div class="shop_orderList">
      <el-select @change="getOrderList()" class="sltGoods" v-model="curState" :placeholder="$t('securityLa.zhifu[1]')">
        <el-option :label="$t('crowdFundRecord.main1[2]')" value=""></el-option>
        <el-option
        v-for="(item,index) in state"
        :key="index"
        :label="item"
        :value="String(index)">
        </el-option>
      </el-select>
      <!-- 内容区域 -->
      <div class="goodsBox"  v-for="(i, index) in orderList" :key="index">
          <div class="goods_title">
              <div class="time">{{i.created_at}}</div>
              <!-- 订单编号： -->
              <div class="ordeNum">{{$t("apiInfo.datalist9[0]")}}：{{i.sn}}</div>
          </div>
          <div class="goods_content">
              <div class="item col1">
                <img :src="$http.basess+i.product.pics[0]" alt="">
              </div>
              <div class="item col2">
                  <!-- 商品名称 -->
                      {{i.product.name}}
                  </div>
              <div class="item col3">{{parseFloat(i.product.price)}} VT</div>
              <!-- 数量 -->
              <div class="item col4">{{i.total_num}}</div>
              <!-- 总价 -->
              <div class="item col5">{{parseFloat(i.total_price)}} VT</div>
              <div class="item col6">
                <!-- 订单状态 --> 
                  <div class="state">{{$public.transOrderState(i.status, scope)}}</div>
                  <div class="detail" @click="$router.push({name:'shopOrderDetail',params:{id:i.id}})">{{$t("apiInfo.datalist10[5]")}}</div>
              </div>
              <div class="item col7">
                                          <!-- 订单状态说明
                                          1//支付状态 未支付
                                          2//已支付，待发货
                                          3//卖家发货,待收货
                                          4//确认收货,已完成
                                          5//买家退款
                                          0//订单取消 -->
                  <!-- 确认支付-->
                  <span class="get btn"  v-show="i.status == 1" @click="showDialog(i.id, '', confirmPay, i.sn,i.total_price)">{{$t('shopOrder.tips[0]')}}</span>
                  <!-- 删除 -->
                  <span class="cancel btn"  v-show="i.status == 0" @click="showDialog(i.id, $t('shopOrder.tips1[0]'), deleteOrder)">{{$t("apiEnCn.list5[4]")}}</span>
                  <!-- 确认收货 -->
                  <span class="get btn" v-show=" i.status == 3" @click="showDialog(i.id, $t('shopOrder.tips1[1]'), orderReceive)">{{$t("shopOrder.tips[1]")}}</span>
                  <!-- 取消订单 -->
                  <span class="cancel btn" v-show="i.status == 1" @click="showDialog(i.id, $t('shopOrder.tips1[2]'), cancelOrder)">{{$t("shopOrder.tips[2]")}}</span>
              </div>
          </div>
      </div>
      <div style="padding-bottom: 400px" class="noData" v-if="orderList.length==0 ">
        <!-- 暂无数据暂无数据 -->
        {{$t('sell.showlist[8]')}}
      </div>


      <el-pagination style="margin-top: 30px" background @current-change="getOrderList" :current-page="page"
        layout="prev, pager, next" :total="total">
      </el-pagination>
      <!-- loding -->
      <div class="overLoading" v-if="loading"></div>
      <!-- 确认订单弹框 -->
      <el-dialog :title="$t('frenchorder.mob2[0]')" :visible.sync="dialogVisible" width="300px" >
        <span>{{dialogText}}</span>
        <span slot="footer" class="dialog-footer">
            <!-- 取 消 -->
          <el-button @click="dialogVisible = false">{{$t('fbDetars.mobile[4]')}}</el-button>
          <!-- 确 定 -->
          <el-button type="primary" @click="confirmFn">{{$t('fbDetars.mobile[5]')}}</el-button>
        </span>
     </el-dialog>
      <!-- 确认支付 -->
      <!-- 订单支付 -->
      <el-dialog :title="$t('shopOrder.main1[0]')" :visible.sync="dialogVisible_pay" width="300px" >
        <div style="color:#6185E5;margin-bottom: 20px;">{{$t('supLA[3]')}} {{totalPrice}} VT</div>
        <el-input type="password" v-model="tpwd" :placeholder="$t('managemoney.place[9]')"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_pay = false">{{$t('fbDetars.mobile[4]')}}</el-button>
          <el-button type="primary" @click="confirmFn">{{$t('fbDetars.mobile[5]')}}</el-button>
        </span>
     </el-dialog>

    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
// 0//订单取消
//       1//支付状态 未支付
// 2//已支付，待发货
// 3//卖家发货,待收货
// 4//确认收货,已完成
// 5//买家退款
        scope:this,
        curState:"",
        // '已取消','未支付','待发货','待收货','已完成','买家退款'
        // state:[    
        //   '已取消',
        //   '未支付',
        //   '待发货',
        //   '待收货',
        //   '已完成',
        //   '买家退款',
        // ],
        totalPrice:'',
        tpwd:"",
        value:"",
        dialogVisible:false,
        dialogVisible_pay:false,
        loading:false,
        orderList:[],
        total:0,
        page:1,
        order_id:'', //订单id,
        dialogText: '', // 对话框文本
        confirmFn:""
    };
  },

  components: {},

  computed: {
    'state'(){
      var a = [    
          this.$t("shopOrder.state[0]"),
          this.$t("shopOrder.state[1]"),
          this.$t("shopOrder.state[2]"),
          this.$t("shopOrder.state[3]"),
          this.$t("shopOrder.state[4]"),
          // this.$t("shopOrder.state[5]"),
        ]
        return a
      }
  },

  methods: {
    // 对话框
    showDialog(id, text, Fn, sn, total) {
      this.totalPrice = parseFloat(Number(total))
      this.sn = sn
      this.order_id = id
      this.dialogText = text
      this.confirmFn = Fn
      if(text==""){
        this.dialogVisible_pay = true
      }else{
        this.dialogVisible=true
      }
    },
    // 取消订单
    cancelOrder() {
      this.dialogVisible=false
      this.$http.post(this.$http.cancelOrder, {order_id:this.order_id} ).then((r)=>{
        if(r.data.code == 200){ 
          this.getOrderList()
          this.$public.msg(this.$t('apiInfo.datalist9[10]'),'success',this)
        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    },
    // 确认支付
    confirmPay() {
      if(this.tpwd==""){
        // 请输入资金密码
        this.$public.msg(this.$t('changePwd2.info[4]'),'error',this)
        return
      }
      if(!this.$public.pwd(this.tpwd)){
        // 密码格式不正确
        this.$public.msg(this.$t('changePwd2.tip[4]'),'error',this)
        return
      }
      var sendData = {
        payment_password:this.$md5(this.tpwd),
        sn: this.sn
      }
      this.dialogVisible_pay = false
      this.$http.post(this.$http.handlePay, sendData ).then((r)=>{
        this.tpwd = ""
        if(r.data.code == 200){ 
          this.getOrderList()
          this.$public.msg(this.$t('shopOrder.tips2[0]'),'success',this)
          
        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })

    },
    // 确认收货
    orderReceive() {
      this.dialogVisible=false
      this.$http.post(this.$http.orderReceive, {order_id:this.order_id} ).then((r)=>{
        if(r.data.code == 200){ 
          this.getOrderList()
          this.$public.msg(this.$t('shopOrder.tips2[1]'),'success',this)
        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    },
    // 删除订单
    deleteOrder() {
      this.dialogVisible=false
      this.$http.post(this.$http.orderDelete, {order_id:this.order_id} ).then((r)=>{
        if(r.data.code == 200){ 
          this.getOrderList()
          this.$public.msg(this.$t('shopOrder.tips2[2]'),'success',this)
        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    },

    // 获取订单列表
    getOrderList(page) {
      page?this.page = page :this.page = 1
      this.loading = true
      // 当前选择全部状态
      if(this.curState === ""){
        this.$http.get(this.$http.orderAll, {params:{page:this.page}}).then((r)=>{
          this.loading = false
          if(r.data.code == 200){ 
            this.orderList = r.data.data.data
            this.total = r.data.data.total
          }else{ 
            this.$public.msg(r.data.msg,'error',this)
          }
        }).catch((r)=>{this.loading = false})
      }else{
      // 当前有选择状态
        var status = this.curState
        if(this.curState ==0) status="'0'"
        this.$http.get(this.$http.orderGet, {params:{status,page:this.page}}).then((r)=>{
          this.loading = false
          if(r.data.code == 200){ 
            this.orderList = r.data.data.data
            this.total = r.data.data.total
          }else{ 
            this.$public.msg(r.data.msg,'error',this)
          }
        }).catch(r=>{this.loading = false})
      }
    },
  },
  created() {
    this.getOrderList()
  },
}

</script>
<style lang="less">
@import "./orderList.less";

    
</style>