<style lang=less>
    @import '../../assets/public.less';
    @import '../../assets/reset.less';
    @import "./faq.less";
</style>
<template lang="html">
    <div class="faqWrap">
        <asidebar></asidebar>
        <div class="conTent">
            <div class="conTentLeft">
                <h1 class="f-tit">FAQ</h1>
                <el-tabs class="el_tab" tab-position="left" @tab-click="handleClick" v-model="activeName">
                    <el-tab-pane :label="$t('runFast.faq[0]')" name="first">
                        <h2 class="faqtit">{{faqObj.title[0]}}</h2>
                        <p class="detail details">{{ faqObj.content[0]}}</p>
                        <h2 class="faqtit">{{faqObj.title[1]}}</h2>
                        <p class="detail detail2">{{ faqObj.content[1] }}</p>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('runFast.faq[1]')" name="second">
                        <h2 class="faqtit">{{faqObj.title[2]}}</h2>
                        <p class="detail pricePoolIntro details">{{ faqObj.content[2] }}</p>
                        <h2 class="faqtit">{{faqObj.title[3]}}</h2>
                        <p class="detail pricePoolIntro">{{ faqObj.content[3] }}</p>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('runFast.faq[2]')" name="third ">
                        <h2 class="faqtit">{{faqObj.title[4]}}</h2>
                        <p class="detail gameFair details">{{ faqObj.content[4] }}</p>
                        <h2 class="faqtit">{{faqObj.title[5]}}</h2>
                        <p class="detail gameFair details">{{ faqObj.content[5] }}</p>
                        <h2 class="faqtit">{{faqObj.title[6]}}</h2>
                        <p class="detail gameFair detail">{{ faqObj.content[6] }}</p>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('runFast.faq[3]')" name="fourth">
                        <h2 class="faqtit">{{faqObj.title[7]}}</h2>
                        <p class="detail gameFair details">{{ faqObj.content[7] }}</p>
                        <h2 class="faqtit">{{faqObj.title[8]}}</h2>
                        <p class="detail gameFair details">{{ faqObj.content[8] }}</p>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>
<script>
    import asidebar from "./asidebar.vue";
    export default {
        data() {
            return {
                activeName: "first",
                faqObj: {
                    title:[],
                    content:[],
                },
                islange: "zh",
            }
        },
        methods: {
            handleClick() {

            },
            showFaq() {
                var _this = this;
                if (_this.$cookies.get("language")) {
                    _this.$i18n.locale = _this.$cookies.get("language");
                    _this.islange = _this.$cookies.get("language");
                } else {
                    _this.$cookies.set("language", "zh", 60 * 60 * 24 * 30);
                }
                if (_this.islange == "zh") {
                    var _type = 1;
                } else {
                    var _type = 2;
                }
                _this.$http.post(_this.$http.introduce, { type: _type }).then(res => {
                    if (res.data.code == "200") {
                        for(var i in res.data.data){
                            _this.faqObj.title.push(res.data.data[i].title);
                            _this.faqObj.content.push(res.data.data[i].content);
                        }
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                }).catch(err => { })
            }
        },
        created: function () {
            var _this = this;
            _this.showFaq();
        },
        mounted: function () {
            var _this = this;
            if (_this.$route.query.id == '1') {
                _this.activeName = "second";
            }
            if (_this.$cookies.get("language")) {
                _this.$i18n.locale = _this.$cookies.get("language");
                _this.islange = _this.$cookies.get("language");
            } else {
                _this.$cookies.set("language", "zh", 60 * 60 * 24 * 30);
            }
        },
        components: {
            asidebar: asidebar
        }
    };
</script>