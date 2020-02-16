p<!--  -->
<template>
  <div class="shop_orderDetail">
    <!-- 状态 -->
    <div class="order_state">
      <div>
<!-- 当前订单状态： -->
        <span>{{$t('shopOrder.detail[0]')}}：</span>
        {{$public.transOrderState(orderInfo.status,this)}}
      </div>
      <!-- 待支付 -->
      <div class="stateBox" v-show="orderInfo.status==1">
          <!-- 订单信息无误，请点击 -->
          <span>{{$t('shopOrder.detail[1]')}}</span>
          <div class="confirm" @click="showDialog(orderInfo.id, '', confirmPay, orderInfo.sn)" >{{$t('shopOrder.detail[2]')}}</div>
          <div class="confirm cancel" @click="showDialog(orderInfo.id, $t('shopOrder.tips1[2]'), cancelOrder)">{{$t('shopOrder.detail[3]')}}</div>
        </div>
      <!-- 待收货 -->
      <div class="stateBox" v-show="orderInfo.status==3">
        <span>{{$t('shopOrder.detail[4]')}}</span>
        <div class="confirm" @click="showDialog(orderInfo.id, $t('shopOrder.tips1[1]'), orderReceive)">{{$t('shopOrder.tips[1]')}}</div>
      </div>
      <!-- 待发货 -->
      <div class="stateBox" v-show="orderInfo.status==2">
        <span>{{$t('shopOrder.detail[5]')}}</span>
      </div>
      <!-- 已完成 -->
      <div class="stateBox" v-show="orderInfo.status==4">
        <span>{{$t('shopOrder.detail[6]')}}</span>
        <!-- <div class="confirm">确认收货</div> -->
      </div>
    </div>
    <!-- 订单标题 -->
    <div class="order_title">
      <div class="block"></div>
      <!-- 订单信息 -->
      <span>{{$t('shopOrder.detail1[0]')}}</span>
    </div>
    <!-- 订单信息 -->
    <div class="order_info">
      <span class="orderNum">
          {{$t('shopOrder.detail1[1]')}}：{{orderInfo.sn}}
      </span>
      <span class="orderTime">
          {{$t('shopOrder.detail1[2]')}}：{{orderInfo.created_at}}
      </span>
    </div>
    <!-- 商品详情 -->
    <div class="order_goods">
      <div class="title">
        <!-- 1商品 2状态 3单价 4数量 5商品总价 6运费 -->
        <div class="item col1">{{$t('shopOrder.tabel[0]')}}</div>
        <div class="item col2">{{$t('shopOrder.tabel[1]')}}</div>
        <div class="item col3">{{$t('shopOrder.tabel[2]')}}</div>
        <div class="item col4">{{$t('shopOrder.tabel[3]')}}</div>
        <div class="item col5">{{$t('shopOrder.tabel[4]')}}</div>
        <div class="item col6">{{$t('shopOrder.tabel[5]')}}</div>
      </div>
      <div class="content">
          <div class="item col1">
            <img :src="$http.basess+orderInfo.product.pics[0]" alt="">
            <p>
                {{orderInfo.product.name}}
            </p>
          </div>
          <!-- 待收货 -->
          <div class="item col2">{{$public.transOrderState(orderInfo.status, this)}}</div>
          <div class="item col3">{{parseFloat(orderInfo.product.price)}} VT</div>
          <div class="item col4">{{orderInfo.total_num}}</div>
          <div class="item col5">{{parseFloat(orderInfo.total_price)}} VT</div>
          <div class="item col6">￥{{orderInfo.product.shipping_money}}</div>      
      </div>
    </div>
    <!-- 实付款 -->
    <div class="payMoney">
      {{$t('shopOrder.detail1[3]')}}：<span>{{parseFloat(Number(orderInfo.total_price) + Number(orderInfo.product.shipping_money))}} VT</span>
    </div>
    <!-- 物流信息 -->
    <div class="ems">
      <div class="ems_title"> {{$t('shopOrder.detail1[4]')}}</div>
      <div class="ems_content">
        <ul>
            <!-- 快递费用 -->
          <li > {{$t('shopOrder.detail1[5]')}}： <span>{{orderInfo.shipping_money}} VT</span></li>
          <!-- 物流信息： -->
          <li v-show="orderInfo.express_info"> {{$t('shopOrder.detail1[4]')}}： <span>{{orderInfo.express_info}}</span></li>
          <!-- 订单备注： -->
          <li > {{$t('shopOrder.detail1[6]')}}： <span>{{orderInfo.remark}}</span></li>
        </ul>
      </div>
    </div>


      <!-- 确认订单弹框 -->
      <el-dialog :title="$t('frenchorder.mob2[0]')" :visible.sync="dialogVisible" width="300px" >
          <span>{{dialogText}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{$t('frenchorder.mob1[6]')}}</el-button>
            <el-button type="primary" @click="confirmFn">{{$t('frenchorder.mob1[7]')}}</el-button>
          </span>
       </el-dialog>
        <!-- 确认支付 -->
        <el-dialog :title="$t('shopOrder.main1[0]')" :visible.sync="dialogVisible_pay" width="300px" >
          <div style="color:#6185E5;margin-bottom: 20px;">{{$t('supLA[3]')}} 111 VT</div>
          <el-input type="password" v-model="tpwd" :placeholder="$t('managemoney.place[9]')"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible_pay = false">{{$t('frenchorder.mob1[6]')}}</el-button>
            <el-button type="primary" @click="confirmFn">{{$t('frenchorder.mob1[7]')}}</el-button>
          </span>
       </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
        dialogVisible:false,
        dialogVisible_pay:false,
        value:"",
        orderInfo:{product:{pics:['']}},
        order_id:this.$route.params.id,
        dialogText:"",
        confirmFn:"",
        sn:"",
        tpwd:""
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
          this.$t("shopOrder.state[5]"),
        ]
        return a
      }
  },

  methods: {
    getInfo() {
      this.$http.get(this.$http.orderInfo, {params:{order_id:this.order_id}} ).then((r)=>{
        if(r.data.code == 200){ 
          this.orderInfo = r.data.data

        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    },
    // 对话框
    showDialog(id, text, Fn, sn) {
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
          this.$public.msg(this.$t('apiInfo.datalist9[10]'),'success',this)

          this.getInfo()
        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    },
    // 确认支付
    confirmPay() {
      if(this.tpwd==""){
        this.$public.msg(this.$t('changePwd2.info[4]'),'error',this)

        return
      }
      if(!this.$public.pwd(this.tpwd)){
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
          this.getInfo()
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
          this.getInfo()
          this.$public.msg(this.$t('shopOrder.tips2[1]'),'success',this)

        }else{ 
          this.$public.msg(r.data.msg,'error',this)
        }
      })
    },
    // // 删除订单
    // deleteOrder() {
    //   this.dialogVisible=false
    //   this.$http.post(this.$http.orderDelete, {order_id:this.order_id} ).then((r)=>{
    //     if(r.data.code == 200){ 
    //       this.$public.msg('删除成功','success',this)
    //     }else{ 
    //       this.$public.msg(r.data.msg,'error',this)
    //     }
    //   })
    // },


  },

  created() {
    this.getInfo()
  }
}

</script>
<style lang="less">
@import "./orderDetail.less";

    
</style>