<style lang=less>
	@import '../../assets/public.less';
	@import './shop.less';
</style>
<template>
	<div class="shop">
        <!-- <div class="banner">
            <img src="../../assets/img/shop/banner.png" alt="">
        </div> -->
        <!-- 轮播 -->
        <div style="overflow:hidden" class="swiper-container2 banner">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in slider">
                    <img :src="$http.basess + item.pic" alt="" @click="skip(item.href)">   
                </div>
            </div>
        </div>

        <div class="shopBody">
            <div class="shopNav">
                <div class="flex">   
                    <!-- 分类 -->
                    <div class="navItem" :key="index" v-for="(item,index) in category" @click="checkGoods(item.id,1)">
                        <img :src="$http.basess + item.icon" alt="">
                        <p>{{item.title}}</p>
                    </div>
                </div>
            </div>
            <!-- 分类下商品 -->
            <div class="list">
                <div class="title">
                    <div class="left">{{$t('shopIndex.info[0]')}} <span>{{$t('shopIndex.info[1]')}}</span></div>
                    <div class="floatRight">
                        <el-input v-model="sousuo" :placeholder="$t('shopIndex.info[2]')">
                            <el-button slot="append"  icon="el-icon-search" @click="goodsSearch(1)">{{$t('shopIndex.info[3]')}}</el-button>
                        </el-input>
                    </div>
                </div>
                <div class="flex" v-if="productList.length">
                    <div class="flexItem" v-for="(i,k) in productList" :key="k" @click="xiangqing(i.id)">
                        <div class="img">
                            <!-- <div class="swiper-container">
                                <div class="swiper-wrapper"> -->
                                    <!-- <div class="swiper-slide" v-for="(item, index) in i.pics">
                                        <img :src="$http.basess+'storage/'+item" alt="">   
                                    </div> -->
                            <!-- </div> 
                            </div> -->
                            <div class="swiper-slide">
                                <img :src="$http.basess+i.pics[0]" alt="">   
                            </div>
                        </div>
                        <div class="detail-warp">
                            {{i.name}}
                            <span class="floatRight">{{i.purchase_number}}{{$t('shopIndex.info[4]')}}</span>
                            <p class="detail-price">{{i.price}} VT</p>
                        </div>
                    </div>
                </div>
                <div v-else class="noData"> {{$t('shopIndex.info[5]')}} </div>
                <el-pagination background layout="prev, pager, next" :total="page.total"  @current-change="current_change" :page-size='page.size' :current-page.sync="page. num"></el-pagination>
            </div>
        </div>
        <div class="order-warp" @click="goShopOrder">
            <img class="order-img" src="../../assets/img/shop/order-img.png" alt="">
            <p class="order-title">订单管理</p>
        </div>
	</div>
</template>
<script>
    import Swiper from 'swiper'; 
	export default {
		data() {
			return {
                productList:'', //商品列表
                page:{
                    num:1,
                    size:1,
                    total:1,
                },
                img:'/static/logo.png',
                sousuo:'',
                // 当前类型id
                curId:"",
                // 轮播图data
                slider:[],
                // 商品类别
                category:[],
            }
		},
		methods: {
            // 去订单列表页
            goShopOrder() {
                this.$router.push({ name: 'shopOrder' })
            },
            //获取热门商品
            hotGoodsList(val){
                var _this = this;
                _this.$http.get(_this.$http.hotGoodsList, {params:{page:val}}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.productList = res.data.data.data;
                        _this.page.total = res.data.data.total;
                        _this.page.size = res.data.data.per_page;
                    }
                })
            },
            //搜索商品
            goodsSearch(page){
                var _this = this;
                console.log(this.$public.encryt);
                
                _this.$http.get(_this.$http.goodsSearch,{params:{
                    key_words:_this.sousuo
                }}).then(function(res) {
                  if(res.data.code == '200') {
                        _this.page.num = page;
                        _this.productList = res.data.data.data;
                        _this.page.total = res.data.data.total;
                        _this.page.size = res.data.data.per_page;
                 }else{
                     _this.$public.msg(res.data.msg, this)
                 }
                })
            },
            //获取分类下商品
            checkGoods(id,num){
                var _this = this;
                // _this.page = {
                //     num:1,
                //     size:1,
                //     total:1,
                // },
                // if( id == this.curId){
                //     return false
                // } 
                this.curId = id
                _this.page.num = 1;
                this.$http.get(this.$http.productList, {params:{category_id:id,page:num}} ).then((res)=>{
                    if(res.data.code == 200){ 
                        _this.productList = res.data.data.data;
                        _this.page.total = res.data.data.total;
                        _this.page.size = res.data.data.per_page;
                    }else{ 
                        this.$public.msg(res.data.msg,'error',this)
                    }
                })
            },
            xiangqing(val){
                var _this = this;
                _this.$router.push({
                    path:'Details',
                    query:{
                        id:val,
                        
                    }
                });
            },
            // 创建轮播
            createSwiper() {
                var mySwiper = new Swiper('.swiper-container2', {
                    autoplay: true,//可选选项，自动滑动
                })
            },
            createSwiper1() {
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: true,//可选选项，自动滑动
                })
            },
            // 分类+轮播 category 首页分类 slides 首页轮播
            getCateList() {
                this.$http.get(this.$http.cateList, {params:{is_pc:1}} ).then((r)=>{
                    if(r.data.code == 200){ 
                        this.slider = r.data.data.slides 
                        this.category  = r.data.data.category  
                        this.$nextTick(()=>{
                            this.createSwiper();
                            this.createSwiper1();
                        })
                    }else{ 
                        this.$public.msg(r.data.msg,'error',this)
                    }
                })
            },
            //跳转到网页
            skip(href){
                window.location.href = href; 
            },
            current_change(val){
                var _this = this;
                if(!_this.curId){
                    _this.hotGoodsList(val)
                    return ;
                }
                _this.checkGoods(_this.curId,val)
            }
        },
        created() {
            this.getCateList()
            this.hotGoodsList(1);
        }
    }
</script>