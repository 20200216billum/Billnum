<style scoped lang="less">
    @import './forget.less';
    @import '../assets/public.less';
</style>

<style lang="less">
    /* .forget {
        .el-form-item__content {
            line-height: 0;
        }
    } */
</style>

<template>
    <div class="forget">
        <div class="reg">
            <h1>{{$t('Gic.forgetpwd[0]')}}</h1>
            <div class="go_zhubtn">
                <p>{{$t('Gic.forgetpwd[1]')}}</p>
                <router-link to="/Login">{{$t('Gic.forgetpwd[2]')}}></router-link>
            </div>

            <el-form :model="forgetData" ref="forgetData" :label-position="labelPosition" :rules="rules1" status-icon
                class="login_form">
                <!-- 邮箱地址 -->
                <el-form-item :label="$t('Gic.forgetpwd[3]')" prop="email">
                    <el-input class="mobile" v-model="forgetData.email" auto-complete="off" :placeholder="$t('Gic.forgetpwd[4]')">
                    </el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item class="yanzhengma">
                    <el-form-item :label="$t('Gic.forgetpwd[5]')" prop="code" class="codeInput">
                        <el-input class="mobile" v-model="forgetData.code" auto-complete="off"
                            :placeholder="$t('Gic.forgetpwd[6]')">
                        </el-input>
                    </el-form-item>
                    <div class="btn_code" @click="getCode()">
                        <el-input type="button" :value="$t(btnCode.time)" :disabled='btnCode.disabled'></el-input>
                    </div>
                </el-form-item>
                <!-- 登录密码 -->
                <el-form-item :label="$t('Gic.forgetpwd[7]')" prop="password">
                    <el-input class="mobile" v-model="forgetData.password" auto-complete="off"
                        :placeholder="$t('Gic.forgetpwd[8]')" type="password" suffix-icon="el-icon-lock">
                    </el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item :label="$t('Gic.forgetpwd[9]')" prop="password_confirmation">
                    <el-input class="mobile" v-model="forgetData.password_confirmation" auto-complete="off"
                        :placeholder="$t('Gic.forgetpwd[10]')" type="password" suffix-icon="el-icon-lock">
                    </el-input>
                </el-form-item>

                <div class="login_btn">
                    <el-button type="primary" @click="submit">{{$t('Gic.forgetpwd[11]')}}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            var _this = this;
            var email = (rule, value, callback) => {
                if (!_this.$public.email(value)) {
                    return callback(new Error(_this.$t('Gic.forgetpwd[12]')))     //邮箱
                } else {
                    callback()
                }
            }
            var code = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(_this.$t('Gic.forgetpwd[13]')));//验证码不能为空
                } else {
                    callback();
                }
            };
            var validateopwd = (rule, value, callback) => {
                if (!_this.$public.pwd(value)) {
                    callback(new Error(_this.$t('Gic.forgetpwd[14]')))// 请输入有效的密码
                } else {
                    callback()
                }
            }
            var validateopwd2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(_this.$t('Gic.forgetpwd[15]')))// 请再次输入密码
                } else if (value !== this.forgetData.password) {
                    callback(new Error(_this.$t('Gic.forgetpwd[16]')))// 两次输入密码不一致!
                } else {
                    callback()
                }
            }
            return {
                labelPosition: 'top', // 插件自带
                forgetData: {
                    email: '',
                    code: '',
                    password: '',
                    password_confirmation: '',
                },
                password: '',
                password_confirmation: '',
                checked: true,
                options: [
                    { id: 86, name: '中国', },
                    { id: 82, name: '韩国', },
                    { id: 81, name: '日本', },
                    { id: 60, name: '马来西亚', },
                    { id: 886, name: '台湾', }
                ],
                value: '',
                btnCode: {
                    time: 'forLA[10]', //倒计时
                    disabled: false
                },
                area_code: '86',
                rules1: {
                    email: [{
                        validator: email,
                        trigger: 'blur'
                    }],
                    code: [{
                        validator: code,
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                    password_confirmation: [{
                        validator: validateopwd2,
                        trigger: 'blur'
                    }],
                },
            }
        },
        methods: {
            //提交注册
            submit() {
                var _this = this;
                _this.$refs.forgetData.validate(valid => {
                    if (valid) {
                        this.forgetData.password = this.$public.$md5(this.forgetData.password);
                        this.forgetData.password_confirmation = this.$public.$md5(this.forgetData.password_confirmation);
                        _this.$http.post(_this.$http.forgetPassword, _this.forgetData).then(function (res) {
                            if (res.data.code == '200') {
                                _this.$router.push({ path: '/login' }); //路由跳转
                                _this.$public.msg(_this.$t('forLA[14]'), 'success', _this);
                            } else {
                                _this.$public.msg(res.data.msg, 'warning', _this);
                            }
                        })
                    }
                })

            },
            //验证码
            getCode() {
                var _this = this;
                if (!_this.$public.email(_this.forgetData.email)) {
                    return _this.$public.msg(_this.$t('Gic.forgetpwd[17]'), 'warning', _this);
                } else {
                    _this.btnCode.disabled = true;
                    //获取验证码
                    _this.$http.post(_this.$http.sendEmail, {
                        email: _this.forgetData.email,
                    }).then(function (response) {
                        if (response.data.code == "200") {
                            _this.$public.setTime(_this); //倒计时函数封装
                            _this.phone = _this.userData.mobile //手机号保存
                        } else {
                            _this.$public.msg(response.data.msg, 'warning', _this);
                            _this.btnCode.disabled = false;
                        }
                    }).catch(function (error) { });
                }
            },
            //密码验证
            pwdyanzheng(val) {
                var _this = this;
                var reg = /^[0-9A-Za-z]{8,12}$/;
                if (reg.test(val) == false) {
                    _this.$public.msg(_this.$t('forLA[13]'), 'warning', _this);
                    return;
                }
                if (reg.test(val) == false) {
                    _this.$public.msg(_this.$t('forLA[13]'), 'warning', _this);
                    return;
                }
            },
        },
        watch: {
            password() {
                var _this = this;
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
                if (reg.test(_this.password) == false) {
                    $('.password').html(_this.$t('loginLA[13]'));
                    return;
                } else {
                    $('.password').html('');
                    return;
                }
            },
            password_confirmation() {
                var _this = this;
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
                if (reg.test(_this.password_confirmation) == false) {
                    $('.password_confirmation').html(_this.$t('loginLA[13]'));
                    return;
                } else {
                    $('.password_confirmation').html('');
                    return;
                }
            }
        },
        mounted() {
        }
    };
</script>