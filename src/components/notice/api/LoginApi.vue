<template>
    <div>
        <h3 class="title">登录</h3>
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
                        <td>accesskey</td>
                        <td>是</td>
                        <td>string</td>
                        <td>accesskey</td>
                    </tr>
                    <tr>
                        <td>timestamp</td>
                        <td>是</td>
                        <td>string</td>
                        <td>时间</td>
                    </tr>
                    <tr>
                        <td>sign</td>
                        <td>是</td>
                        <td>string</td>
                        <td>签名</td>
                    </tr>
                    <tr>
                        <td>mobile</td>
                        <td>是</td>
                        <td>int</td>
                        <td>账号</td>
                    </tr>
                    <tr>
                        <td>opwd</td>
                        <td>是</td>
                        <td>str</td>
                        <td>密码</td>
                    </tr>
                </tbody>
            </table>
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
                        <td>token</td>
                        <td>token</td>
                    </tr>
                    <tr>
                    <tr>
                        <td>account</td>
                        <td>账号</td>
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
                                POST {{ this.$http.onLine + '/Api/Qbw/user_login' }}
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
                                        "msg": "登录成功",
                                        "data": {
                                            "token": "cf7ec8187ab3da4c52c7ca02283edd9c",
                                            "account": "3841121"
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