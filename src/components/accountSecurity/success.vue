<!-- 认证失败 -->
<template>
  <div class="fail">
    <h2>{{$t('fail.main[0]')}}</h2>
    <div class="content">
      <!-- <img v-if="$cookies.get('changeBg') =='night'" src="../../assets/image/shibai.png" alt=""> -->
      <img src="../../assets/image/chenggong.png" alt="">
      <p class="tips">{{$t('fail.suc[0]')}}</p>
      <a @click="jump" class="btn-agin">{{$t('fail.suc[1]')}}</a>
    </div>
  </div>
</template>
<style lang='less' scoped>
  @import '../../assets/public.less';
  .fail{
    width: 1280px;
    margin: 0 auto;
    padding: 20px 0 300px 0;
  }

  h2{
    box-sizing: border-box;
    font-size: 20px;
    width:1280px;
    height:60px;
    line-height: 60px;
    padding-left: 30px;
    background:rgba(33,40,59,1);
    border-radius:4px;
    color:rgba(255,255,255,1);
  }
  .content{
    text-align: center;
    width: 60%;
    margin: 100px auto 0 auto;
    color: #ffffff;
    .tips{
      margin: 28px 0 20px 0;

    }
    .reason{
      color: #868686;
      margin: 28px 0 60px 0;
    }
    .btn-agin{
      display: block;
      width:120px;
      height:42px;
      border:1px solid rgba(117,167,255,1);
      border-radius:4px;
      font-size: 18px;
      line-height: 42px;
      text-align: center;
      margin: 0 auto;
      color: rgba(117,167,255,1);
      cursor: pointer;
      &:hover{
        box-shadow: 0 0 2px 2px rgba(117,167,255,.5);
      }
    }
  }

</style>
<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {
    jump() {
      this.$router.push({path:'security'})
    }
  }
}

</script>
