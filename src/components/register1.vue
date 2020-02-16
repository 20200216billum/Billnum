<style scoped lang="less">
        @import './register1.less';
        @import '../assets/public.less';
    </style>
     
    <template>
    <div class="main">
        <div class="reg">
            <div class="left">
                <h1><span>VT</span></h1>
                <h2>Welcome to our website</h2>
                <p>多个国家设立本土化交易服务中心,打造
                        多业务形态为一体的区块链生态圈
                        5 年数字资产金融服务经验专业分布式架构
                        和防 DDOS 攻击系统</p>
            </div>
            <div class="right">
                <h1>已有账号<router-link to="/login1">立即登录</router-link></a></h1>
                <p>注册</p>
                <el-form :model="regData">
                    <el-form-item class="quhao">
                        <div class="select">
                            <el-select v-model="regData.area_code" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="input">   
                            <el-input class="mobile" prop="phone" v-model="regData.phone" auto-complete="off" placeholder="请输入手机号码" suffix-icon="el-icon-user">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item class="yanzhengma">
                        <div class="codeInput">
                            <el-input class="mobile" prop="code" v-model="regData.code" auto-complete="off" placeholder="请输入验证码">
                            </el-input>
                        </div>
                        <div class="btn_code" @click="getCode()">
                            <el-input type="button" :value="'| '+btnCode.time" :disabled='btnCode.disabled'></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-input class="mobile" prop="password" v-model="regData.password" auto-complete="off" placeholder="请输入登录密码" type="password" suffix-icon="el-icon-lock">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input class="mobile" prop="c_password" v-model="regData.c_password" auto-complete="off" placeholder="请再次输入登录密码密码" type="password" suffix-icon="el-icon-lock">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input class="mobile" prop="recommend" v-model="regData.recommend" auto-complete="off" placeholder="邀请码(必填)" suffix-icon="el-icon-position">
                        </el-input>
                    </el-form-item>
                    <el-checkbox label="我已阅读并同意" name="type"></el-checkbox><a href="javascript:;" class="xieyi">《用户协议》</a>
                    <el-form-item>
                            <el-button type="primary" @click="submit">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
    </template>
    <script>
      export default {
        data() {
            return {
                regData:{
                    area_code:'',
                    phone:'',
                    code:'',
                    recommend:'',
                    password:'',
                    c_password:'',
                },
                checked:true,
                options:[{
                    id:86,
                    name:'中国',
                },
                {
                    id:1,
                    name:'美国',
                }
                ],
                value:'',
                btnCode: {
					time: '获取验证码', //倒计时
					disabled: false
				},
            }
        },
        methods: {
            //提交注册
            submit(){
                var _this = this;
                alert(_this.$http.register)
                _this.$http.post(_this.$http.register,_this.regData).then(function(res) {
                  if(res.data.status == '200') {
                      console.log(res)
                  }
                })
            },
            //验证码
            getCode() {
                var _this = this;
                if(!_this.regData.area_code){
                    return _this.$public.msg("请先选择区号", 'warning', _this);
                }
                if (_this.regData.phone.indexOf('@') == -1) {
					if (!_this.$public.checkMobile(_this.regData.phone)) {
						return _this.$public.msg("手机号输入错误", 'warning', _this);
					} else {
						_this.btnCode.disabled = true;
					//获取验证码
                        _this.$http.post(_this.$http.sendSms, {
                            phone: _this.regData.phone,
                            area_code: _this.regData.area_code
                        }).then(function(response) {
                            if(response.data.status == "200") {
                                _this.$public.setTime(_this); //倒计时函数封装
                                _this.phone = _this.userData.mobile //手机号保存
                            } else {
                                _this.$public.msg(response.data.msg, 'warning', _this);
                                _this.btnCode.disabled = false;
                            }
                        }).catch(function(error) {});
					}
				} else {
					if (!_this.$public.email(_this.regData.phone)) {
						return _this.$public.msg("邮箱账号输入错误", 'warning', _this);
					} else {
						_this.btnCode.disabled = true;
					    //获取验证码
                        _this.$http.post(_this.$http.send_mail, {
                            email: _this.userData.mobile,
                        }).then(function(response) {
                            if(response.data.status == "200") {
                                _this.$public.setTime(_this); //倒计时函数封装
                                _this.phone = _this.userData.mobile //手机号保存
                            } else {
                                _this.$public.msg(response.data.msg, 'warning', _this);
                                _this.btnCode.disabled = false;
                            }
                        }).catch(function(error) {});
					}
				}
			},
        },
        mounted () {
        }
      };
    </script>