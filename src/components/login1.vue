<style scoped lang="less">
        @import './login1.less';
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
                <h1>还没有账号?<router-link to="/reg1">立即注册</router-link></h1>
                <p>密码登录</p>
                <el-form :model="userData">
                    <el-form-item>
                        <el-input class="mobile" prop="phone" v-model="userData.phone" auto-complete="off" placeholder="请输入手机号码">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input class="mobile" prop="phone" v-model="userData.password" auto-complete="off" placeholder="请输入登录密码" type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                            <el-button type="primary" @click="submit">登录</el-button><router-link to="/login1" class="wangji">忘记密码</router-link>
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
                userData:{
                    phone:'',
                    password:'',
                },
                checked:true,
                activeName: 'second',
                tableData1:[
                ],
                tableData2:[
                ],
            }
        },
        methods: {
            submit(){
                var _this = this;
                _this.$http.post(_this.$http.login, _this.userData).then(function(res) {
                    if(res.data.code == '200') {
                        if(res.data.data.token == '0'){
                            console.log(123)
                            return _this.$public.msg('已开启谷歌验证', 'warning', _this); 
                        }
                        sessionStorage.token = res.data.data.token;
                        _this.$http.get(_this.$http.details,{params:{}}).then(function(res) {
                          if(res.data.code == '200') {
                            // sessionStorage.account = res.data.data.account;
                            // sessionStorage.phone = res.data.data.phone;
                            // sessionStorage.area_code = res.data.data.area_code;
                            // sessionStorage.name = res.data.data.name;
                            // sessionStorage.nickname = res.data.data.nickname;
                            // sessionStorage.token = res.data.data.token;
                            // sessionStorage.token = res.data.data.token;
                            // sessionStorage.token = res.data.data.token;
                            sessionStorage.userData = res.data.data;
                            console.log(sessionStorage.userData.phone)
                          }
                        })
                        _this.$router.push({path: '/home'});
                        _this.$public.msg("登陆成功", 'success', _this);
                    }else{
                        _this.$public.msg(res.data.msg, 'warning', _this);
                    }
                })
            },
        },
        mounted () {
        }
      };
    </script>