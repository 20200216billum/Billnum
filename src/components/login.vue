<style scoped lang="less">
    @import './login.less';
</style>

<template>
    <div class="main">
        <div class="reg">
            <h1>{{$t('Gic.login[0]')}}</h1>
            <el-form :model="userData" class="login_form" ref="userData" :label-position="labelPosition" :rules="rules1">
                <!-- 账号 -->
                <el-form-item label="账号" prop="username">
                    <el-input class="mobile" v-model="userData.username" auto-complete="off" placeholder="请输入登陆账号">
                    </el-input>
                </el-form-item>
                <!-- 登录密码 -->
                <el-form-item :label="$t('Gic.login[5]')" prop="password">
                    <el-input class="mobile" v-model="userData.password" auto-complete="off" placeholder="请输入8-20位数字与字母组合登录密码" type="password">
                    </el-input>
                </el-form-item>
                <el-form-item label="" class="forget-pwd">
                    <router-link to="/forgetpwd" class="wangji">忘记密码</router-link>
                </el-form-item>
                <div class="login_btn">
                    <el-button type="primary" @click="submit" :loading="loading">登录</el-button>
                </div>
                <div class="now-register">
                    <span class="no-user">还不是平台用户？</span><router-link to="/register">立即注册</router-link>
                </div>
            </el-form>

            <div class="saoma">
                <div class="cont">
                    <img />
                    <div>
                        <p>Billum数字资产交易平台</p>
                        <p>随时随地 便捷交易</p>
                        <p>扫描二维码下载Billum APP</p>
                    </div>
                </div>
            </div>

            <!-- <div class="right">
            <h1>{{$t('loginLA[1]')}} <router-link to="/register"> {{$t('loginLA[2]')}}</router-link></h1>
            <p>{{$t('loginLA[3]')}}</p>
            <el-form :model="userData">
                <el-form-item>
                    <el-input class="mobile" prop="phone" v-model="userData.phone" auto-complete="off" :placeholder="$t('loginLA[4]')" suffix-icon="el-icon-user">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="mobile" prop="phone" v-model="password" auto-complete="off" :placeholder="$t('loginLA[5]')" type="password" suffix-icon="el-icon-lock">
                    </el-input>
                    <span class="password" style="position: relative;margin-top:-10px;padding-left: 15px;color: red;"></span> 
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="submit">{{$t('loginLA[6]')}}</el-button><router-link to="/forgetpwd" class="wangji">{{$t('loginLA[7]')}}</router-link>
                </el-form-item>
            </el-form>
        </div> -->
        </div>
        <!-- 谷歌验证码 -->
        <div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;"
            :style="dialogVisible1">
            <div class="el-message-box">
                <div class="el-message-box__header">
                    <div class="el-message-box__title">
                        <span class="el-message-box__word">{{$t('loginLA[8]')}}</span>
                    </div>
                    <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
                        <i class="el-message-box__close el-icon-close"></i>
                    </button>
                </div>
                <div class="google">
                    <div>
                        <p>{{$t('loginLA[9]')}}</p>
                        <div class="getcode">
                            <el-input v-model="googleCode" auto-complete="off" :placeholder="$t('loginLA[10]')">
                            </el-input>
                        </div>
                        <div class="btnList">
                            <a href="javascript:;" @click="googleSubmit"
                                style="color: #ffffff;">{{$t('loginLA[11]')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 登录弹窗 -->
        <div class="reg_popup" v-show="reg_popup">
            <div class="popup_cen">
                <img src="../assets/Gicimg/heder/×.png" class="close_btn" @click="close_btn_1" alt="">
                <h6>{{$t('Gic.login[11]')}}</h6>
                <p>{{$t('Gic.login[12]')}} <span>{{userData.username}}</span> {{$t('Gic.login[13]')}}</p>
                <el-input class="code_inp" v-model="userData.code" :placeholder="$t('Gic.login[14]')"></el-input>
                <el-button class="reg_btn" @click="submitForm" :loading="loading" type="primary">{{$t('Gic.login[15]')}}</el-button>
            </div>
        </div>
        <!-- 谷歌验证弹窗 -->
        <div class="reg_popup" v-show="gool_popup">
            <div class="popup_cen">
                <img src="../assets/Gicimg/heder/×.png" class="close_btn" @click="close_btn" alt="">
                <h6>{{$t('Gic.login[16]')}}</h6>
                <p>{{$t('Gic.login[17]')}}</p>
                <el-input class="code_inp" v-model="userData.google_code" :placeholder="$t('Gic.login[18]')"></el-input>
                <el-button class="reg_btn" @click="submitForm" :loading="loading" type="primary">{{$t('Gic.login[15]')}}</el-button>
            </div>
        </div>

        <!-- 尾部 -->
        <div class="login-footer">
            © 2017 - 2020 Billum.com. All rights reserved
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            var _this = this;
            var username = (rule, value, callback) => {
                if (!_this.$public.email(value)) {
                    return callback(new Error("请输入登录账号"))   
                } else {
                    callback()
                }
            }
            var validateopwd = (rule, value, callback) => {
                if (!_this.$public.pwd(value)) {
                    callback(new Error("请输入8-20位数字与字母组合登录密码"))// 请输入有效的密码
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                gool_popup: false,
                reg_popup: false,
                userData: {
                    username: '',
                    password: '',
                    google_code: '',
                    code: '',
                },
                password: '',
                checked: true,
                activeName: 'second',
                tableData1: [
                ],
                tableData2: [
                ],
                dialogVisible1: 'display:none',//谷歌验证
                googleCode: '',
                googlesecret: '',
                labelPosition: 'top', // 插件自带
                rules1: {
                    username: [{
                        validator: username,
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validateopwd,
                        trigger: 'blur'
                    }],
                },
            }
        },
        methods: {
            close_btn() {
                var _this = this;
                _this.gool_popup = false;
            },
            close_btn_1() {
                var _this = this;
                _this.reg_popup = false;
            },
            submit() {
                var _this = this;
                _this.$refs.userData.validate(valid => {
                    if (valid) {
                        _this.loading = true;
                        this.userData.password = this.$public.$md5(this.userData.password)
                        _this.$http.post(_this.$http.loginPre, _this.userData).then(function (res) {
                            if (res.data.code == '200') {
                                _this.loading = false;
                                if (res.data.data.sta == '1') {
                                    _this.getCode();
                                } else {
                                    _this.gool_popup = true;
                                }
                            } else {
                                _this.loading = false;
                                _this.$public.msg(res.data.msg, 'warning', _this);
                            }
                        })



                        // _this.getCode();
                    }
                })



            },
            googleSubmit() {
                var _this = this;
                var _data = {
                    phone: _this.userData.password,
                    password: _this.userData.phone,
                    google_code: _this.googleCode,
                    secret: _this.googlesecret
                }
                _this.$http.post(_this.$http.login, _data).then(function (res) {
                    if (res.data.code == '200') {
                        sessionStorage.token = res.data.data.token;
                        //获取个人信息
                        _this.$http.get(_this.$http.details, { params: {} }).then(function (res) {
                            if (res.data.code == '200') {
                                sessionStorage.userData = JSON.stringify(res.data.data);
                                _this.$router.push({ path: '/home' });
                                _this.$public.msg(_this.$t('loginLA[14]'), 'success', _this);
                            }
                        })
                    } else {
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                })
            },
            //登录
            submitForm() {
                var _this = this;
                _this.loading = true;
                // this.userData.password = this.$public.$md5(this.userData.password)
                _this.$http.post(_this.$http.login, _this.userData).then(function (res) {
                    if (res.data.code == '200') {
                        _this.loading = false;
                        sessionStorage.token = res.data.data.token;
                        sessionStorage.userData = _this.userData.username;
                        _this.$router.push({ path: '/home' });
                        _this.$public.msg(_this.$t('Gic.login[19]'), 'success', _this);

                        // _this.$http.get(_this.$http.details, { params: {} }).then(function (res) {
                        //     if (res.data.code == '200') {
                        //         sessionStorage.userData = _this.userData.username;
                        //         if (res.data.data.authentication == 0) {
                        //             _this.$public.msg(_this.$t('securityLa.shangjia[4]'), 'success', _this);
                        //             _this.$router.push({ path: '/changePerson2' });
                        //             return
                        //         }
                        //         _this.$router.push({ path: '/home' });
                        //         _this.$public.msg(_this.$t('loginLA[14]'), 'success', _this);
                        //     }
                        // })
                    } else {
                        _this.loading = false;
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                })
            },
            //验证码
            getCode() {
                var _this = this;
                _this.loading = true;
                _this.$http.post(_this.$http.sendEmail, {
                    email: _this.userData.username
                }).then(function (response) {
                    if (response.data.code == "200") {
                        _this.loading = false;
                        _this.reg_popup = true;
                    } else {
                        _this.loading = false;
                        _this.$public.msg(response.data.msg, 'warning', _this);
                    }
                }).catch(function (error) { });

            },
            close_moble() {
                var _this = this;
                _this.dialogVisible1 = 'display:none';
                _this.googleCode = '';
            },
            pwdyanzheng() {
                var _this = this;
                var reg = /^[0-9A-Za-z]{8,12}$/;
                if (reg.test(_this.userData.password) == false) {
                    _this.$public.msg(_this.$t('loginLA[13]'), 'warning', _this);
                    return;
                }
                if (reg.test(_this.password_confirmation) == false) {
                    _this.$public.msg(_this.$t('loginLA[13]'), 'warning', _this);
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
        },
        mounted() {
        }
    };
</script>