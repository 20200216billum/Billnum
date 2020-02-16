<style lang=less>
    @import '../../assets/public.less';
    @import '../../assets/reset.less';
    @import "./guessing.less";
</style>
<template lang="html">
    <div class="runWrap jiaoyanWrap">
        <asidebar></asidebar>
        <div class="conTent">
            <h1>LA run.game Crash-Game Verification Script</h1>
            <h4>Third party script used to cerify games on crash game.</h4>
            <div class="inpgroup">
                <div class="flex1">
                    <img src="../../assets/img/yaoshi.png" alt="">
                    <el-input class="inpu" v-model="hash"></el-input>
                </div>
                <div class="flex1">
                    <img src="../../assets/img/yaoshijing.png" alt="">
                    <el-input type="number" class="inpu" v-model="inps"></el-input>
                </div>
                <el-button class="btn_s" @click="submit" type="primary">Verify</el-button>
            </div>
            <div class="tabless">
                <p class="flex">
                    <span>Game's hash</span>
                    <span>Bust</span>
                </p>
                <ul>
                    <li class="flex" v-for="(item,index) in hashList" :key="index" v-if="hashList.length>0">
                        <span>{{item.boomHash}}</span>
                        <span>{{item.boomValue}}</span>
                    </li>
                    <p class="nodata" v-if="hashList.length==0">{{$t('runFast.guess[15]')}}</p>
                </ul>
                <!-- <el-pagination background @current-change="handleCurrentChange" :current-page.sync="p.pageNum" layout="prev, pager, next" :page-size="p.size" :total="p.totalPage" v-if="hashList.length>0"></el-pagination> -->
            </div>
        </div>
    </div>
</template>
<script>
    import asidebar from "./asidebar.vue";
    export default {
        data() {
            return {
                hash:"",
                inps:10,
                hashList:[],
                p:{
                    pageNum:1,
                    size:1,
                    totalPage:null
                }
            }
        },
        watch: {
            
        },
        methods: {
            submit(){
                var _this = this;
                if(!_this.hash){
                    _this.$public.msg(_this.$t("ziChantishi.main[9]"), 'warning', _this);
                    return false;
                }
                if(_this.inps<0||_this.inps.toString().indexOf(".")!==-1){
                    _this.$public.msg(_this.$t("ziChantishi.main[10]"), 'warning', _this);
                    return false;
                }
                _this.$http.post(_this.$http.verification_hash,{hash:_this.hash,num:_this.inps}).then(function(res){
                    if(res.data.code == "200"){
                        if(res.data.data){
                            _this.hashList = res.data.data.list;
                            // _this.p.totalPage = Number(res.data.data.count_page*_this.p.size);
                        }else{
                            _this.hashList = [];
                        }
                    }else{
                        _this.$public.msg(res.data.msg, 'warning', _this);
                        _this.hashList = [];
                    }
                }).catch(function(){})
            },
            // handleCurrentChange(i){
            //     this.submit(i);
            // }
        },
        // 路由改变时
        beforeRouteLeave(to, from, next) {
            var _this = this;

            next();
        },
        mounted: function () {
            var _this = this;
            _this.hash = _this.$route.query.hash;
            _this.submit();
        },
        created: function () {
            var _this = this;
        },
        components: {
            asidebar: asidebar
        }
    };
</script>

<style scoped="scoped">

</style>