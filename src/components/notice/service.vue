<style scoped lang="less">
    @import '../../assets/public.less';
    @import './help.less';
</style>

<template>
    <div class="help">
        <div class="clause_box">
            <div class="content">
                <p class="title">服务条款</p>
                <div class="cont" v-html="systemAgree"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: '',
                systemAgree: "暂无数据",
            }
        },
        methods: {
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
        },
        mounted() {
            this.navList(this.$route.query.name_cn);
        }
    };
</script>