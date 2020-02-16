<template>
    <div>
        <h3 class="title">用户信息</h3>
        <div class="info_content">
            用户信息
        </div>
        <div class="info_pre_code clearfix">
            <div class="pre_code_left">
                <h3 class="code_left_head">请求参数说明（签名参数按照ASCII值排序，Sign和ReqTime不用加入待签名字符串）</h3>
                <table class="code_left_table">
                    <thead>
                        <tr>
                            <th>返回值</th>
                            <th>描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>name</td>
                            <td>名字</td>
                        </tr>
                        <tr>
                            <td>mobile</td>
                            <td>手机</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>邮箱</td>
                        </tr>
                        <tr>
                            <td>idcard</td>
                            <td>省份证号</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>初级认证</td>
                        </tr>
                        <tr>
                            <td>auth_status</td>
                            <td>高级认证</td>
                        </tr>
                        <tr>
                            <td>is_shop</td>
                            <td>商家认证</td>
                        </tr>
                        <tr>
                            <td>is_start_google</td>
                            <td>谷歌认证</td>
                        </tr>
                        <tr>
                            <td>zc_total</td>
                            <td>资产信息</td>
                        </tr>
                        <tr>
                            <td>lc_total</td>
                            <td>理财信息</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pre_code_right">
                <h3 class="code_right_head">请求示例</h3>
                  <el-tabs v-model="activeName" class="code_right_tabs">
                    <el-tab-pane label="REQUEST" name="one">
                        <pre>
                            <code>
                                <span class="c1">// request demo</span>
                                POST {{ this.$http.onLine + '/Api/Qbw/user_info' }}
                            </code>
                        </pre>
                    </el-tab-pane>
                </el-tabs>

                <h3 class="code_right_head">响应示例</h3>
                  <el-tabs v-model="activeName2" class="code_right_tabs">
                    <el-tab-pane label="JSON" name="json">
                        <pre>
                            <code>
                                <span class="c1">// 返回结果</span>
                                    {
                                        "status": "200",
                                        "msg": "OK",
                                        "data": {
                                            "name": "山*",
                                            "uid": "3841188",
                                            "mobile": "157****3951",
                                            "email": "263500",
                                            "opwd": "******",
                                            "tpwd": "******",
                                            "idcard": "410***********8012",
                                            "smrz": true,
                                            "status": "2",//1 未认证 2 待审核 3 已通过  4拒绝
                                            "auth_status":"1",//高级认证 1 未认证 2 待审核 3 已通过  4拒绝
                                            "is_shop": "1",//0未提交  2待审核  1通过
                                            "wallone": 100000,
                                            "is_apply": "3",
                                            "apply_reason": "照片不清楚",
                                            "concession_rate": "0.00",
                                            "jigou_code": null,
                                            "tgno": "NNF3841188",
                                            "user_level": 3,// 1:低,2:中,3:高
                                            "pay_list": 0,
                                            "usdt": "1000",//商家保证金
                                            "sxfee": 0,
                                            "command": 0,//0未认证  1已认证
                                            "is_start_google": "0",
                                            "register_type": "1",
                                            "zc_total": {
                                                "ttl_usable": 781849839.3,//可用余额
                                                "ttl_frost": 0,//冻结余额
                                                "ttl_money": 787228120.5,//usdt总额
                                                "ttl_cnymoney": "5431874031.45"//CNY总和
                                            },
                                            "lc_total": {
                                                "ttl_usable": 781849839.3,
                                                "ttl_frost": 0,
                                                "ttl_money": 6591.67378,
                                                "ttl_cnymoney": "45482.55"
                                            }
                                        }
                                    }
                            </code>
                        </pre>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeName: 'one',
            activeName2: 'json',
        }
    },
}
</script>