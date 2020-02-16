<template>
    <div>
        <h3 class="title">忘记密码</h3>
        <div class="info_content">
            重置登录密码
        </div>
        <div class="parameter_table">
            <table class="code_left_table">
                <thead>
                    <tr>
                        <th>参数名称</th>
                        <th>必选</th>
                        <th>类型</th>
                        <th>描述</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>mobile</td>
                        <td>是</td>
                        <td>string</td>
                        <td>手机号/邮箱</td>
                    </tr>
                    <tr>
                        <td>opwd</td>
                        <td>是</td>
                        <td>string</td>
                        <td>新密码</td>
                    </tr>
                    <tr>
                        <td>opwd1</td>
                        <td>是</td>
                        <td>string</td>
                        <td>确认新密码</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>是</td>
                        <td>string</td>
                        <td>验证码</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="info_pre_code clearfix">
            <div class="pre_code_left">
                <h3 class="code_left_head">请求参数说明（签名参数按照ASCII值排序，Sign和ReqTime不用加入待签名字符串）</h3>
                <!-- <table class="code_left_table">
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
                </table> -->
            </div>
            <div class="pre_code_right">
                <h3 class="code_right_head">请求示例</h3>
                  <el-tabs v-model="activeName" class="code_right_tabs">
                    <el-tab-pane label="REQUEST" name="one">
                        <pre>
                            <code>
                                <span class="c1">// request demo</span>
                                POST {{ this.$http.onLine + '/Api/Qbw/find_opwd' }}
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
                                        "msg": "更新成功",
                                        "data": ""
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