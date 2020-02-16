<style scoped lang="less">
    @import './help.less';
    @import '../../assets/public.less';
</style>

<template>
    <div class="help">
        <div class="help_cen">
            <div class="title">
                <h1>{{$t('Gic.help[0]')}}</h1>
            </div>

            <div class="help_details">
                <ul class="router-list">
                    <li :class="item.active?'active':''" v-for="(item,index) in routerList"
                        @click="click(index,item.id)" :key="index">
                        <span>{{item.name}}</span>
                        <i class="el-icon-caret-right right-icon"></i>
                    </li>
                </ul>
                <div class="details_right" v-html="systemAgree">

                </div>
            </div>
            <!-- <el-tabs v-model="activeName" tab-position="left" @tab-click="navList">

                    <el-tab-pane :label="$t('foot[2]')" :name="$t('language[0]')=='CN' ? 'agreementcn' : 'agreementen'">
                        <div :class="$t('language[0]')=='CN' ? 'agreementcn' : 'agreementen'" id="div">
                        </div>
                    </el-tab-pane>

                    <el-tab-pane :label="$t('foot[4]')"
                        :name="$t('language[0]')=='CN' ? 'privacypolicycn' : 'privacypolicyen'">
                        <div :class="$t('language[0]')=='CN' ? 'privacypolicycn' : 'privacypolicyen'" id="div">
                        </div>
                    </el-tab-pane>



                    <el-tab-pane :label="$t('foot[7]')" :name="$t('language[0]')=='CN' ? 'aboutuscn' : 'aboutusen'">
                        <div :class="$t('language[0]')=='CN' ? 'aboutuscn' : 'aboutusen'" id="div">
                        </div>
                    </el-tab-pane>

                    <el-tab-pane :label="$t('foot[8]')"
                        :name="$t('language[0]')=='CN' ? 'launderingcn' : 'launderingen'">
                        <div :class="$t('language[0]')=='CN' ? 'launderingcn' : 'launderingen'" id="div">
                        </div>
                    </el-tab-pane>

                </el-tabs> -->

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: '',
                text: '',
                lianxi: '',//联系方式
                options: [],//问题类型列表
                value: '',
                systemAgree: "",
                routerList: [
                    { name: this.$t('Gic.footer[4]'), id: '1', active: false },//账号安全
                    { name: this.$t('Gic.footer[5]'), id: '4', active: false },//身份认证
                    { name: this.$t('Gic.footer[6]'), id: '9', active: false },//账号安全
                    // { name: this.$t('Gic.footer[7]'), id: '8', active: false },//身份认证
                ]
            }
        },
        methods: {
            click(val, id) {
                this.routerList.forEach((item, index) => {
                    if (index == val) {
                        item.active = true
                        this.$router.push({path: '/help',query: {name_cn:item.id}})
                    } else {
                        item.active = false
                    }
                })
            },


            navList(val) {
                var _this = this;
                _this.$http.get(_this.$http.systemAgree, {
                    params: {
                        type: val
                    }
                }).then(function (res) {
                    if (res.data.code == '200') {
                        _this.systemAgree = res.data.data.content
                    }
                })
            },
            //获取问题类型列表 
            // feedbackType() {
            //     var _this = this;
            //     _this.$http.get(_this.$http.feedbackType, {
            //         params: {
            //         }
            //     }).then(function (res) {
            //         if (res.data.code == '200') {
            //             _this.options = res.data.data;
            //         }
            //     })
            // },
            // feedback() {
            //     var _this = this;
            //     _this.$http.post(_this.$http.feedback, {
            //         type: _this.value,
            //         desc: _this.text,
            //         tel: _this.lianxi,
            //     }).then(function (res) {
            //         if (res.data.code == '200') {
            //             _this.$public.msg('提交成功', 'success', _this)
            //             _this.valuee = '';
            //             _this.text = '';
            //             _this.lianxi = '';
            //         }
            //     })
            // },
        },

        watch: {
            "$route": function () {
                var _this = this;
                var k = {}
                k.name = _this.$route.query.name_cn;
                _this.activeName = k.name;

                this.routerList.forEach((item, index) => {

                    if (item.id == k.name) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })


                _this.navList(k.name);

            },
        },
        mounted() {
            var _this = this;
            var k = {}
            k.name = _this.$route.query.name_cn
            _this.activeName = k.name;
            this.routerList.forEach((item, index) => {
                if (item.id == k.name) {
                    item.active = true
                } else {
                    item.active = false
                }
            })


            _this.navList(k.name)
            // _this.feedbackType();
        }
    };
</script>