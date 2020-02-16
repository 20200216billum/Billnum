<style scoped lang="less">
    @import './help.less';
    @import '../../assets/public.less';
</style>

<template>
    <div class="help">
        <!-- <div class="help_cen">
            <div class="title">
                <h1>条款协议</h1>
            </div>

            <div class="help_details">
                <ul class="router-list">
                    <li :class="item.active?'active':''" v-for="(item,index) in routerList"
                        @click="click(index,item.id)" :key="index">
                        <span>{{item.name}}</span>
                        <i class="el-icon-caret-right right-icon"></i>
                    </li>
                </ul>
                <div class="details_right" v-html="systemAgree"></div>
            </div> -->
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

        <!-- </div> -->

        <div class="clause_box">
            <div class="top">
                <p class="title">条款协议</p>
                <ul class="list">
                    <li v-for="(item, index) in agreeArr" :key="index" @click="changeAgree(item.id)" :class="{active: activeIndex == item.id}">
                        {{ item.name }}
                        <img v-if="activeIndex == item.id" src="../../assets/img/xuanz-icon.png">
                    </li>
                </ul>
            </div>
            <div class="content">
                <p class="title" v-for="(item, index) in agreeArr" :key="index" v-if="activeIndex == item.id">{{ item.name }}</p>
                <div class="cont" v-html="systemAgree"></div>
            </div>
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
                systemAgree: "暂无数据",
                routerList: [
                    { name: this.$t('Gic.footer[4]'), id: '1', active: false },//账号安全
                    { name: this.$t('Gic.footer[5]'), id: '4', active: false },//身份认证
                    { name: this.$t('Gic.footer[6]'), id: '9', active: false },//账号安全
                    // { name: this.$t('Gic.footer[7]'), id: '8', active: false },//身份认证
                ],
                activeIndex: "9",
                agreeArr: [
                    { name: "用户协议", id: "9" },
                    { name: "隐私条款", id: "4" },
                    { name: "法律声明", id: "3" },
                    { name: "交易规则", id: "10" },
                    { name: "交易指南", id: "8" },
                    { name: "关于反洗钱", id: "7" },
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
            // 切换协议
            changeAgree(index) {
                this.activeIndex  = index;
                this.navList(index);
            },
            // 获取协议
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
                _this.activeIndex = _this.$route.query.name_cn;
                _this.navList(_this.$route.query.name_cn);
                // var k = {}
                // k.name = _this.$route.query.name_cn;
                // _this.activeName = k.name;

                // this.routerList.forEach((item, index) => {
                //     if (item.id == k.name) {
                //         item.active = true
                //     } else {
                //         item.active = false
                //     }
                // })
                // _this.navList(k.name);

            },
        },
        mounted() {
            if (this.$route.query.name_cn) {
                this.activeIndex = this.$route.query.name_cn;
                this.navList(this.$route.query.name_cn);
            } else {
                this.navList(this.activeIndex);
            }
            // var _this = this;
            // var k = {}
            // k.name = _this.$route.query.name_cn
            // _this.activeName = k.name;
            // this.routerList.forEach((item, index) => {
            //     if (item.id == k.name) {
            //         item.active = true
            //     } else {
            //         item.active = false
            //     }
            // })


            // _this.navList(k.name)
            // _this.feedbackType();
        }
    };
</script>