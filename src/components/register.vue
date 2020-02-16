<style scoped lang="less">
    @import './register.less';
</style>

<style lang="less">

</style>

<template>
    <div class="register">
        <div v-show="noVer">
            <div class="reg">
                <h1>注册</h1>
                <ul class="tab-register">
                    <li @click="changeTabRegister(1)" :class="{'active': tabIndex==1}">
                        <img v-if="tabIndex == 1" src="../assets/img/login/shouji-hover.png">
                        <img v-else src="../assets/img/login/shouji.png">
                        <span>手机注册</span>
                    </li>
                    <li @click="changeTabRegister(2)" :class="{'active': tabIndex==2}"> 
                        <img v-if="tabIndex == 2" src="../assets/img/login/youxiang-hover-img.png">
                        <img v-else src="../assets/img/login/youxiang-img.png">
                        <span>邮箱注册</span>
                    </li>
                </ul>
                <!-- 手机注册 -->
                <el-form v-show="tabIndex == 1" class="login_form" :model="phoneForm" ref="phoneForm" :label-position="labelPosition" :rules="rules">
                    <!-- 手机号码 -->
                    <el-form-item label="手机号码" prop="phone" class="phone-area">
                        <el-select v-model="phoneForm.areaindex" :placeholder="$t('regLA[4]')">
                            <el-option v-for="item in options" :key="item.id" :label="'+' + item.id" :value="item.id"></el-option>
                        </el-select>
                        <el-input class="mobile" v-model="phoneForm.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <!-- 登录密码 -->
                    <el-form-item :label="$t('Gic.forgetpwd[7]')" prop="password">
                        <el-input class="mobile" v-model="phoneForm.password" auto-complete="off"
                            :placeholder="$t('Gic.forgetpwd[8]')" type="password">
                        </el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item :label="$t('Gic.forgetpwd[9]')" prop="password_confirmation">
                        <el-input class="mobile" v-model="phoneForm.password_confirmation" auto-complete="off"
                            :placeholder="$t('Gic.forgetpwd[10]')" type="password">
                        </el-input>
                    </el-form-item>
                    <!-- 邀请码 -->
                    <el-form-item :label="$t('Gic.Register[1]')" prop="recommend">
                        <el-input class="mobile" v-model="phoneForm.recommend" auto-complete="off" :placeholder="$t('Gic.Register[2]')">
                        </el-input>
                    </el-form-item>
                    <div class="register-agreement">
                        <span class="gray">注册即代表同意</span><span class="agree" @click="agreement(1)">《服务条款》</span><span class="gray">和</span><span class="agree" @click="agreement(2)">《隐私条款》</span>
                    </div>
                    <div class="login_btn">
                        <el-button type="primary" @click="submitPhone" :loading="loading">{{$t('Gic.Register[3]')}}</el-button>
                    </div>
                    <div class="now-register">
                        <span class="no-user">已有账号？</span><router-link to="/login">立即登陆</router-link>
                    </div>
                </el-form>
                    <!-- <el-form-item class="yanzhengma">
                        <div class="codeInput">
                            <el-input class="mobile" prop="code" v-model="phoneForm.code" auto-complete="off" :placeholder="$t('forgetpwd.titleOne[4]')">
                            </el-input>
                        </div>
                        <div class="btn_code" @click="getCode()">
                            <el-input type="button" :value="'| '+ $t(btnCode.time)" :disabled='btnCode.disabled'></el-input>
                        </div>
                    </el-form-item> -->
                <!-- 邮箱注册 -->
                <el-form v-show="tabIndex == 2" class="login_form" :model="regData" ref="regData" :label-position="labelPosition" :rules="rules">
                    <!-- 邮箱地址 -->
                    <el-form-item :label="$t('Gic.forgetpwd[3]')" prop="email">
                        <el-input class="mobile" v-model="regData.email" auto-complete="off" :placeholder="$t('Gic.forgetpwd[4]')">
                        </el-input>
                    </el-form-item>
                    <!-- 登录密码 -->
                    <el-form-item :label="$t('Gic.forgetpwd[7]')" prop="password">
                        <el-input class="mobile" v-model="regData.password" auto-complete="off"
                            :placeholder="$t('Gic.forgetpwd[8]')" type="password">
                        </el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item :label="$t('Gic.forgetpwd[9]')" prop="password_confirmation">
                        <el-input class="mobile" v-model="regData.password_confirmation" auto-complete="off"
                            :placeholder="$t('Gic.forgetpwd[10]')" type="password">
                        </el-input>
                    </el-form-item>
                    <!-- 邀请码 -->
                    <el-form-item :label="$t('Gic.Register[1]')" prop="recommend">
                        <el-input class="mobile" v-model="regData.recommend" auto-complete="off" :placeholder="$t('Gic.Register[2]')">
                        </el-input>
                    </el-form-item>
                    <div class="register-agreement">
                        <span class="gray">注册即代表同意</span><span class="agree" @click="agreement(1)">《服务条款》</span><span class="gray">和</span><span class="agree" @click="agreement(2)">《隐私条款》</span>
                    </div>
                    <div class="login_btn">
                        <el-button type="primary" @click="submit" :loading="loading">{{$t('Gic.Register[3]')}}</el-button>
                    </div>
                    <div class="now-register">
                        <span class="no-user">已有账号？</span><router-link to="/login">立即登陆</router-link>
                    </div>
                </el-form>
            </div>
            <!-- 协议 -->
            <div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;"
                :style="dialogVisible1">
                <div class="el-message-box">
                    <div class="el-message-box__header">
                        <div class="el-message-box__title">
                            <span class="el-message-box__word">{{ agreeType == 1 ? "服务条款" : "隐私条款" }}</span>
                        </div>
                        <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
                            <i class="el-message-box__close el-icon-close"></i>
                        </button>
                    </div>
                    <div class="pre">
                        <pre></pre>
                    </div>
                </div>
            </div>

            <!-- 验证码弹窗 -->
            <!-- <div class="reg_popup" v-show="reg_popup">
                <div class="popup_cen">
                    <img src="../assets/Gicimg/heder/×.png" class="close_btn" @click="close_btn">
                    <h6>{{$t('Gic.login[11]')}}</h6>
                    <p>{{$t('Gic.login[12]')}} <span>{{regData.email}}</span> {{$t('Gic.login[13]')}}</p>
                    <el-input class="code_inp" v-model="regData.code" :placeholder="$t('Gic.login[14]')"></el-input>
                    <el-button class="reg_btn" @click="submitForm" :loading="loading1" type="primary">{{$t('Gic.Register[6]')}}</el-button>
                </div>
            </!-->
        </div>
        <div v-show="!noVer" class="no_ver">
            <p class="title">安全验证</p>
            <el-form :model="verForm" :rules="rulesVer" ref="verForm" label-width="80px" label-position="top" class="ver_form">
                <div class="tip">
                    <p>我们已向如下{{ tabIndex == 1 ? "手机号" : "邮箱" }}发送了一组验证码</p>
                    <p>123****@qq.com</p>
                </div>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="verForm.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <div class="ver_code">
                    重新发送验证码>50s
                </div>
                <el-form-item>
                    <el-button class="reg_btn" @click="submitForm" :loading="loading1" type="primary">完成注册</el-button>
                </el-form-item>
                <div class="is-login">
                    <span class="gray">已有账号？</span><router-link to="/login">立即登录</router-link>
                </div>
            </el-form>  
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
            var validatePhone = (rule, value, callback) => {
                if (!_this.$public.checkMobile(value)) {
                    return callback(new Error("手机号格式不正确"))     //手机
                } else {
                    callback()
                }
            }
            var email = (rule, value, callback) => {
                if (!_this.$public.email(value)) {
                    return callback(new Error(_this.$t('Gic.forgetpwd[12]')))     //邮箱
                } else {
                    callback()
                }
            }
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
                } else if (value == this.regData.password ||  value == this.phoneForm.password) {
                    callback()
                } else {
                    callback(new Error(_this.$t('Gic.forgetpwd[16]')))// 两次输入密码不一致!
                }
            }

            var recommend = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(_this.$t('Gic.Register[5]')));//推荐码不能为空
                } else {
                    callback();
                }
            };

            var verCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("验证码不能为空"));
                } else {
                    callback();
                }
            };

            return {
                noVer: true,
                tabIndex: 1,
                agreeType: 1,
                reg_popup: false,
                code_inp: '',//验证码
                phoneForm: {
                    phone: '',
                    areaindex: "86",
                    password: '',
                    password_confirmation: '',
                    recommend: '',
                    code: '',   //验证码
                },
                regData: {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    recommend: '',
                    code: '',   //验证码
                },
                rules: {
                    phone: [{
                        validator: validatePhone,
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: email,
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
                    recommend: [{
                        validator: recommend,
                        trigger: 'blur'
                    }]
                },
                verForm: {
                    code: ""
                },
                rulesVer: {
                    code: [
                        { validator: verCode, trigger: "blur" }
                    ],
                },
                loading: false, // 防止表单重复提交标志
                loading1: false, // 防止表单重复提交标志
                labelPosition: 'top', // 插件自带
                password: '',
                c_password: '',
                checked: true,
                options: [
                    { id: 86, name: '+86', },
                    { id: 82, name: '+82', },
                    { id: 81, name: '+81', },
                    { id: 60, name: '+60', },
                    { id: 886, name: '+886', }
                ],
                value: '',
                btnCode: {
                    time: "getCode[0]", //倒计时
                    disabled: false
                },
                dialogVisible1: 'display:none',
            }
        },
        methods: {
            changeTabRegister(index) {
                this.tabIndex = index;
                this.$refs.phoneForm.resetFields();
                this.$refs.regData.resetFields();
            },
            close_btn() {
                var _this = this;
                _this.reg_popup = false;
            },
            getImgByCode() {
                if (this.regData.area_code == 86) {
                    return require('../assets/img/login/zh.png')
                } else if (this.regData.area_code == 60) {
                    return require('../assets/img/login/mlxy.png')
                } else if (this.regData.area_code == 81) {
                    return require('../assets/img/login/rb.png')
                } else if (this.regData.area_code == 82) {
                    return require('../assets/img/login/hg.png')
                } else if (this.regData.area_code == 886) {
                    return require('../assets/img/login/zh.png')
                }
            },
            getImgUrl(name) {
                if (name == '中国') {
                    return require('../assets/img/login/zh.png')
                } else if (name == '马来西亚') {
                    return require('../assets/img/login/mlxy.png')
                } else if (name == '日本') {
                    return require('../assets/img/login/rb.png')
                } else if (name == '韩国') {
                    return require('../assets/img/login/hg.png')
                } else if (name == '台湾') {
                    return require('../assets/img/login/zh.png')
                }
            },
            //获取用户协议
            agreement(type) {
                var _this = this;
                _this.agreeType = type;
                if (_this.$t('reg.[0]') == 'CN') {
                    var _data = 'agreementcn'
                } else if (_this.$t('reg.[0]') == 'EN') {
                    var _data = 'agreementen '
                }
                _this.dialogVisible1 = 'display:block'
                _this.$http.get(_this.$http.agreementcn, { params: { key: _data } }).then(function (res) {
                    if (res.data.code == '200') {
                        $('.pre pre').html(res.data.data.content);
                    }
                })
            },
            //手机注册
            submitPhone() {
                this.$refs.phoneForm.validate(valid => {
                    if (valid) {
                        this.noVer = false;
                        this.getCodePhone();
                    }
                })
            },
            // 邮箱注册
            submit() {
                this.$refs.regData.validate(valid => {
                    if (valid) {
                        this.noVer = false;
                        this.getCode();
                    }
                })
            },
            //手机验证码
            getCodePhone() {
                var _this = this;
                _this.loading = true;
                _this.$http.post(_this.$http.sendSms, {
                    phone: _this.phoneForm.phone,
                    area_code:_this.phoneForm.areaindex,
                    from: 'register'
                }).then(function (response) {
                    if (response.data.code == "200") {
                        _this.loading = false;
                        _this.reg_popup = true;
                    } else {
                        _this.loading = false;
                        _this.$public.msg(response.data.msg, 'warning', _this);
                    }
                }).catch(function (error) {});
            },
            //邮箱验证码
            getCode() {
                var _this = this;
                _this.loading = true;
                _this.$http.post(_this.$http.sendEmail, {
                    email: _this.regData.email,
                    recommend:_this.regData.recommend,
                    from: 'register'
                }).then(function (response) {
                    if (response.data.code == "200") {
                        _this.loading = false;
                        _this.reg_popup = true;
                    } else {
                        _this.loading = false;
                        _this.$public.msg(response.data.msg, 'warning', _this);
                    }
                }).catch(function (error) {});
            },

            // 完成注册
            submitForm() {
                var _this = this;
                _this.loading1 = true;
                this.regData.password = this.$public.$md5(this.regData.password);
                this.regData.password_confirmation = this.$public.$md5(this.regData.password_confirmation);
                $.ajax({
                    url: _this.$http.gicregister,
                    type: "post",
                    data: _this.regData,
                    headers: {
                        'locale': _this.$cookies.get('language') == 'Chinese' ? 'zh-CN' : 'en',
                        'from': 'pc'
                    },
                    dataType: "json",
                    success: function (response) {
                        _this.loading1 = false;
                        if (response.code == '200') {
                            _this.$public.msg(response.msg, 'success', _this)
                            _this.$public.go('login', 10, _this)
                            _this.loading1 = false;
                        } else {
                            _this.$public.msg(response.msg, 'warning', _this)
                        }
                    },
                    error: err => {
                        _this.loading1 = false;
                    }
                });
            },

            close_moble() {
                var _this = this;
                _this.dialogVisible1 = 'display:none';
                _this.googleCode = '';
            },
            pwdyanzheng() {
                var _this = this;
                var reg = /^[0-9A-Za-z]{8,12}$/;
                if (reg.test(_this.password) == false) {
                    _this.$public.msg(_this.$t('regLA[18]'), 'warning', _this);
                    return;
                }
                if (reg.test(_this.password_confirmation) == false) {
                    _this.$public.msg(_this.$t('regLA[18]'), 'warning', _this);
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
            c_password() {
                var _this = this;
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
                if (reg.test(_this.c_password) == false) {
                    $('.c_password').html(_this.$t('loginLA[13]'));
                    return;
                } else {
                    $('.c_password').html('');
                    return;
                }
            }
        },
        mounted() {
        }
    };
</script>