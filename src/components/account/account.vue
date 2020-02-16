<!--  -->
<template>
  <div class="myAccount_wrap">
    <div class="myAccount">
        <!-- 资产管理 -->
        <h1>{{$t('laaccount.title[0]')}}</h1> 
        <div class="content">
          <div class="tabs">
              <!-- 钱包账户','币币账户','法币账户' -->
            <div class="item" @click="changeType(1)" :class="type=='1'?'active':''">{{$t('laaccount.title[1]')}}</div>
            <div class="item" @click="changeType(2)" :class="type=='2'?'active':''">{{$t('laaccount.title[2]')}}</div>
            <div class="item" @click="changeType(3)" :class="type=='3'?'active':''">{{$t('laaccount.title[3]')}}</div>
          </div>
          <!-- 表格 -->
          <div class="table">
            <div class="head">
              <p>
                  {{account.name}}：{{$public.toLowFixed(account.price,6)}} USDT 
                   <span class="cnyPrice" >≈ {{$public.toLowFixed(account.cnyPrice,2)}} CNY</span>
              </p>
              <p class="order" v-if="type==1" @click="$router.push({path:'/moneyRecord'})">{{$t('laaccount.title[4]')}}</p>
            </div>
            <div class="body">
              <div class="title">
                  <!-- 币种 -->
                <div class="item">{{$t('laaccount.title[5]')}}</div>
                <!-- 可用 -->
                <div class="item center">{{$t('laaccount.title[6]')}}</div>
                <!-- 冻结 -->
                <div class="item right">{{$t('laaccount.title[7]')}}</div>
                <!-- 操作 -->
                <div class="item right">{{$t('laaccount.title[8]')}}</div>
              </div>
              <div v-if="!listLoading">
                <div class="val" :key="index" v-for="(item,index) in assetsList">
                  <div class="item">{{item.wallet_code}}</div> 
                  <div class="item center">{{$public.toLowFixed(item.usable,6)}}</div>
                  <div class="item right">{{$public.toLowFixed(item.frost,6)}}</div>
                  <div class="item action"> 
                      <!-- 充币 -->
                    <div class="btn" @click="changeUrl('/chongbit',item.wallet_code)" v-if='type==1'>{{$t('laaccount.title[9]')}}</div>
                    <!-- 提币 -->
                    <div class="btn" @click="changeUrl('/tibit',item.wallet_code)" v-if='type==1'>{{$t('laaccount.title[10]')}}</div>
                    <!-- <div class="btn" @click="$router.push({path:'/chongbit'})">充币</div> -->
                    <!-- <div class="btn" @click="$router.push({path:'/tibit'})">提币</div> -->
                    <!-- 划转 -->
                    <div class="btn" @click="changeUrl('/transferAssets',item.wallet_code)">{{$t('laaccount.title[11]')}}</div>
                  </div>
                </div>
                <!-- 暂无数据 -->
                <div v-show="assetsList.length==0" class="noData" >{{$t('laaccount.title[12]')}}</div>
              </div>
              <div v-else class="loveMagicRoundAndRound" >
                <img src="../../assets/img/Loading.png" alt="">
              </div>
            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listLoading:false,
      userData: JSON.parse(sessionStorage.userData),
      type:this.$route.query.type,
      tableData:[],
      account:{
        // 钱包账户
        name:this.$t('laaccount.title[1]'),
        price:"--",
        cnyPrice:"--"
      },
      assetsList:[]
    };
  },

  components: {},

  watch:{
    $route(n,o) {
      this.type = this.$route.query.type
      
    },
    'type'(n,o) {
      this.getAsstes(n) 
    },
  },

  computed: {},


  created() {
    this.type = this.$route.query.type
    this.getAsstes(this.type)
  },

  methods: {
    changeUrl(path,query) {
      if(path =="/tibi"){
        if(userData.authentication !=2){
          // 请先通过身份验证
          this.$public.msg(this.$t('moneyAddre.rules[4]'),"error",this)
          return false
        }
        if(userData.config.sms_verify ==0 && userData.config.google_verify  ==0  ){
          // 为了保证您的账号安全，短信验证和谷歌验证方式至少开启一种
          this.$public.msg(this.$t('moneyAddre.rules[5]'),"error",this)
          return false
        }
      }
      this.$router.push({path,query:{id:query}})
    },
    changeType(type) {
    if(!this.listLoading){
        this.type = type
    }
    },
    getAsstes(type) {
      this.listLoading = true
      // this.account.name =['','钱包账户','币币账户', '法币账户'][type]
      this.account.name =['',this.$t('laaccount.title[1]'),this.$t('laaccount.title[2]'), this.$t('laaccount.title[3]')][type]
      this.account.cnyPrice = "--"
      this.account.price = "--"
      this.$http.get(this.$http.getAssets, {params:{type}}).then((r)=>{
        this.listLoading = false
        if(r.data.code == 200){ 
          this.account.cnyPrice = r.data.data.guzhi_cny
          this.account.price = r.data.data.guzhi_usdt
          this.assetsList = r.data.data.zichan
        }else{ 
          // this.public.msg(r.data.msg,'error',this)
        }
      })
    }
  }
}

</script>
<style lang='less'>
  @import "./account.less";
</style>