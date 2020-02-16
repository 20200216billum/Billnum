<style lang=less>
    @import '../../assets/public.less';
    @import './Details.less';
</style>
<template>
    <div class="shopList">
        <div class="auto">
            <div class="flex">
                <div class="flexItem div_1">
                    <div class="swiper-container2 banner">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-if="commodity.pics">
                                <img :src="$http.basess + commodity.pics['0']" alt="">   
                            </div>
                            <!-- <div class="swiper-slide" v-for="(item, index) in commodity.pics">
                                <img :src="$http.basess+'storage/'+item" alt="">   
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="flexItem div_2">
                    <p class="p_1">
                        {{commodity.name}}
                        <!-- 中国商界风云人物全9册 任正非什么时候出发都不晚+马云+马化腾+王石传雷军俞敏洪李嘉诚 创业管理书籍 -->
                    </p>
                    <p class="p_2">
                        {{commodity.goods_desc}}
                    </p>
                    <div class="p_3"><span>{{$t('Details[0]')}}</span>{{commodity.price}} VT</div>
                    <div class="p_4">
                        <!-- <div class="floatLeft">配送至</div> -->
                        <div class="floatRight">
                                <!-- <div class="block" style="width: 270px;">
                                    <el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
                                    </el-cascader>
                                </div> -->
                            <p class="select">
                                <!-- <el-select v-model="value" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select> -->
                                <span class="span">{{$t('Details[1]')}}: {{commodity.num}}</span>
                                <span class="span">{{commodity.purchase_number}} {{$t('Details[2]')}}</span>
                            </p>
                            <p class="text">{{$t('Details[3]')}}</p>
                        </div>
                    </div>
                    <div class="btnNum">
                        <div class="div1">
                            <input class="numLeft"  v-model="num" :disabled="commodity.num==0" oninput="value=value.replace(/[^\d]/g,'')">
                            <!-- <div class="numLeft">
                                {{num}}
                            </div> -->
                            <div class="numRight">
                                <div v-if="commodity.num == 0" style="cursor:pointer;user-select: none; ">+</div>
                                <div v-else @click="addNum('1')" style="cursor:pointer;user-select: none; ">+</div>
                                <div v-if="num==1 || commodity.num == 0" style="cursor:pointer;user-select: none; ">-</div>
                                <div @click="addNum('0')" v-else style="cursor:pointer;user-select: none; ">-</div>
                            </div>
                        </div>
                        <div class="div2" v-if="commodity.num == 0">{{$t('Details[4]')}}</div>
                        <div class="div3" @click="payment" v-else>{{$t('Details[5]')}}</div>
                    </div>
                </div>
            </div> 
            <div class="title">
                <p><span>{{$t('Details[6]')}}</span></p>
            </div>
            <div class="bottom">
                <div v-if="commodity.desc">
                    <img v-for="(i,k) in commodity.desc" :key="k" :src="$http.basess + i" alt="">
                </div>
            </div>
        </div>
        <el-dialog title="购买超级平台" :visible.sync="shopSup" width="320px" class="dialog">
            <p class="p">您未是超级平台, 前去购买?</p>
            <!-- <el-input  v-model="payment" placegolder="$t('paymentTip[2]')" type="password"></el-input> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="shopSup = false">{{$t('paymentTip[3]')}}</el-button>
                <el-button type="primary" @click="sup">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import region from '../../shujuData/region.js'; 
    export default {
        data() {
            return {
                commodity:{pics:''}, //商品详情
                siteList:[],
                img:'/static/logo.png ',
                value: '',
                // 三级联动
                options:[],
                selectedOptions: [],
                num:1,//购买商品数量
                isSup:'',
                shopSup:false,
            }
        },
        methods: {
            //去超级平台
            sup(){
                this.$router.push({
            　　　　path: '/cjpt',
            　　　　query:{
            　　　　 　　id:this.uuId
            　　　　 }
                });
            },
            //获取用户是否是超级平台
            userSup(){
                var _this = this;
                _this.$http.get(_this.$http.details, {params:{}}).then(function(res) {
                      if(res.data.code == '200') {
                      _this.isSup = res.data.data.super_user;
                     }else{
                        _this.public.msg(res.data.msg,'warning',_this)
                     }
                })
            },
            //购买
            payment(){
                var _this = this;
                if(_this.num < 1){
                    _this.$public.msg('购买数量不能小于1', 'warning', _this)
                    return ;
                }
                // if(_this.isSup == 0){
                //     _this.shopSup = true;
                //     return;
                // }
                _this.$router.push({
                    path:'payment',
                    query:{
                        id:_this.$route.query.id,
                        num:_this.num,
                    }
                });
            },
            //获取商品详情
            goodsInfo(){
                var _this = this;
                _this.$http.get(_this.$http.goodsInfo,{params:{
                    product_id:_this.$route.query.id,
                }} ).then(function(res) {
                  if(res.data.code == '200') {
                      _this.commodity = res.data.data;
                 }
                })
            },
            //数量
            addNum(val){
                if(val==1){
                    this.num = Number(this.num)+1;
                }else if(val==0){
                    this.num = Number(this.num)-1;
                }
        }, 
        }, 
        watch:{
            num(n,o){
                var _this = this;
                if(n != ''){
                    if(Number(n) >Number(_this.commodity.num)){
                        _this.num = _this.commodity.num
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
            this.goodsInfo();
            this.userSup();
            // region.dict.dict.forEach((item,index) => {
            //     var province ={value:item.key,label:item.key,children:[]} // 省
            //     if(item.dict.dict.constructor === Array){ // 有多个市 多个市区时类型为数组 单个为对象
            //         for(var i in item.dict.dict){
            //             var _i = item.dict.dict
            //             var city ={value:_i[i].key,label:_i[i].key,children:[]} // 市
            //             for( var x in item.dict.dict[i].array.string ){
            //                 var _x = item.dict.dict[i].array.string
            //                 var area ={value:_x[x],label:_x[x]} // 区
            //                 city.children.push(area)
            //             }
            //             province.children.push(city) 
            //         }
            //     }else{ // 只有一个市 例如北京 上海
            //         var _key = item.dict.dict.key
            //         var city ={value:_key,label:_key,children:[]} // 市
            //         for(var y in item.dict.dict.array.string){
            //             var _y = item.dict.dict.array.string
            //             var area = {value:_y[y],label:_y[y]}
            //             city.children.push(area )
            //         }
            //         province.children.push(city) 
            //     }
            //     this.options.push(province) 
            // });
        }
    }
</script>