<style lang=less>
    @import '../../assets/public.less';
    @import './payment.less';
</style>
<template>
    <div class="payment">
        <div class="paymentBody">
            <div class="title">
                <span>{{$t('payment[0]')}}</span><span class="titleRight" @click="addSite">{{$t('payment[1]')}}</span>
            </div>
            <div class="flex" v-if="take">
                <div class="flexItem" v-for="(i,k) in take" :key="k">
                    <div @click="active(k,i.id,i)" :class="status == k ? pitch : ' '"  v-if="i.id != at.id">
                        <h1>{{i.province}}{{i.city}}  （{{i.name}} {{$t('payment[2]')}}）</h1>
                        <p>{{i.country}} {{i.detail}} </p>
                        <p>{{i.phone}}</p>
                    </div>
                    <div @click="active(k,i.id,i)" :class="pitch"  v-else>
                        <h1>{{i.province}}{{i.city}}  （{{i.name}} {{$t('payment[2]')}}）</h1>
                        <p>{{i.country}} {{i.detail}} </p>
                        <p>{{i.phone}}</p>
                    </div>
                </div> 
            </div>
            <div class="noTake" v-else><router-link to="/addSite">{{$t('payment[3]')}}</router-link></div>
            <div class="flex1">
                <div class="flexItem item1">{{$t('payment[4]')}}</div>
                <div class="flexItem item2">{{$t('payment[5]')}}</div>
                <div class="flexItem item3">{{$t('payment[6]')}}</div>
                <div class="flexItem item4">{{$t('payment[7]')}}</div>
            </div>
            <div class="flex2">
                <div class="flexItem item1">
                    <div style="float:left;">
                        <img :src="$http.basess + product.pics[0]" alt="" v-if="product.desc[0]">
                    </div>
                    <div>
                        <span>{{product.name}} </span>
                    </div>
                </div>
                <div class="flexItem item2">
                    <span>{{product.price}} VT</span>
                </div>
                <div class="flexItem item3">
                    <p>
                        <span class="span1" v-if="num==1" style="cursor:pointer;user-select: none; ">-</span><span class="span1" @click="addNum('0')" v-else style="cursor:pointer;user-select: none; ">-</span>
                        <!-- <span class="span2">{{num}}</span> -->
                        <el-input class="span2" v-model="num" :disabled="product.num==0" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                        <!-- <el-input v-model.number="num" class="span2" ></el-input> -->
                        <span class="span3" @click="addNum('1')" style="cursor:pointer; user-select: none;">+</span>
                    </p>
                </div>
                <div class="flexItem item4"><span>{{parseFloat(product.price * num)}} VT</span> </div>
            </div>
            <div class="flex3">
                <div class="item1"><span>{{$t('payment[8]')}}</span></div>
                <div class="item2"><el-input v-model="remark" :placeholder="$t('payment[9]')"></el-input></div>
                <div class="item3"><span>{{$t('payment[10]')}}</span></div>
                <div class="item4"><span>{{parseFloat(product.shipping_money)}} VT</span></div>
            </div>
            <div class="textRight">
                <h1>{{$t('payment[11]')}}：{{parseFloat(product.price) * num + parseFloat(product.shipping_money)}} VT</h1>
                <p><span>{{$t('payment[12]')}}: </span> {{at.province}}{{at.city}} {{at.country}} {{at.detail}}</p>
                <p><span>{{$t('payment[13]')}}: </span> {{at.name}} {{at.phone}}</p>
                <div class="btn_">
                    <div class="btn" @click="purchase">{{$t('payment[14]')}}</div>
                    <div style="clear: both"></div>
                </div>
            </div>
        </div>
        <el-dialog :title="$t('paymentTip[0]')" :visible.sync="pay" width="320px" class="dialog" @close="close">
            <p class="p">{{$t('paymentTip[1]')}}：{{parseFloat(product.price) * num + parseFloat(product.shipping_money)}} VT</p>
            <div class="zijinpwd">
                <el-input  v-model="payment" :placeholder="$t('paymentTip[2]')" type="password"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="no">{{$t('paymentTip[3]')}}</el-button>
                <el-button type="primary" @click="payMoney">{{$t('paymentTip[4]')}}</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="$t('paymentTip[5]')" :visible.sync="repertory" width="320px" class="dialog">
            <p class="p">{{$t('paymentTip[6]')}}</p>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                remark:'',//订单备注
                pitch:'pitch',
                status:'-1',
                page:{
                    num:1,
                    size:1,
                    total:1,
                },
                num:1,//购买商品数量
                take:[],
                product:{
                    desc:[]
                },//商品详情
                at:{},//当前选中的地址
                pay:false,//支付弹窗
                repertory:false,//库存不足弹窗
                payment:'',
            }
        }, 
        methods: {
            active(val,id,item){
                this.status = val;
                this.at = item
            },
            //获取收货地址
            site(){
                var _this = this;
                _this.$http.get(_this.$http.shouhuo,{params:{}}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.take = res.data.data.data;
                    }
                })
            },
            //获取默认收货地址
            getDefaultAddress(){
                var _this = this;
                _this.$http.get(_this.$http.getDefaultAddress,{params:{}}).then(function(res) {
                  if(res.data.code == '200') {
                      _this.at = res.data.data;
                      for(let i=0;i<_this.take.length;i++){
                          if(_this.take[i].id == res.data.data.id){
                            //拿出默认收货地址   放到收货地址列表中的第一项
                            var obj = _this.take[i]
                            _this.take.splice(i,1)
                            _this.take.unshift(obj)
                          }
                      }
                 }
                })
            },
            //获取商品详情
            getCommodity(){
                var _this = this;
                _this.$http.get(_this.$http.goodsInfo,{params:{
                    product_id:_this.$route.query.id
                }}).then(function(res) {
                  if(res.data.code == '200') {
                    _this.product = res.data.data;
                 }
                })
            },
            //创建订单
            purchase(){
                var _this = this;
                if(!_this.at.id){
                    _this.$public.msg(_this.$t('paymentTip[7]'),'warning',_this)
                    return ;
                }
                _this.$http.post(_this.$http.createLA,{
                    product_id:_this.$route.query.id,//商品id
                    address_id:_this.at.id,//地址id
                    num:_this.num,//购买数量
                    remark:_this.remark,//订单备注
                }).then(function(res) {
                  if(res.data.code == '200') {
                      _this.pay = true;
                      _this.sn = res.data.data.sn;
                 }else{
                     _this.$public.msg(res.data.msg,'warning',_this)
                 }
                })
            },
            // 支付
            payMoney(){
                var _this = this;
                _this.$http.post(_this.$http.handlePay,{
                    sn:_this.sn,
                    payment_password:_this.$md5(_this.payment)
                }).then(function(res) {
                  if(res.data.code == '200') {
                      _this.$public.msg(_this.$t('paymentTip[8]'),'success',_this)
                    _this.$router.push({
                　　　　path: '/shopOrder',
                    });
                 }else{
                    _this.$public.msg(res.data.msg,'warning',_this)
                 }
                })
            },
            //取消支付
            no(){
                var _this = this;
                _this.pay = false;
                _this.$router.push({
            　　　　path: '/shopOrder',
                });
            },
            //增加购买数量
            addNum(val){
                if(val==1){
                    this.num = parseFloat(this.num) + 1;
                }else if(val==0){
                    this.num = parseFloat(this.num) - 1;
                }
            },
            //跳转添加地址
            addSite(){
                this.$router.push({path:'addSite'});
            },
            //关闭支付弹框是跳转到订单页面
            close(){
                this.$router.push({
            　　　　path: '/shopOrder',
                });
            },
        },
        watch:{
            num(n,o){
                
                var _this = this;
                if(n != ''){
                    if(Number(n) >Number(_this.product.num)){
                        _this.num = String(_this.product.num)
                        return ;
                    }
                }
                if(String(n).indexOf('.') > -1){
                    this.num = o
                }
                if(isNaN(Number(n))){
                    if(o==""){
                        this.num = 1
                    }else{
                        this.num = o
                    }
                }
                if(n === '0') {
                    this.num = 1
                }
                
            },
        },
        mounted:function(){
        },
        created:function(){
            // this.num = this.$route.query.num
            this.site();
            this.getCommodity();
            this.getDefaultAddress();
        },
    }
</script>