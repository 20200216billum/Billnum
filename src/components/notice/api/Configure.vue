<template>
    <div>
        <h3 class="title">配置</h3>
        <div class="info_content">
            获取已开启的市场信息，包括价格、数量小数点位数
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
                            <td>priceScale</td>
                            <td>价格小数位数</td>
                        </tr>
                        <tr>
                            <td>amountScale</td>
                            <td>数量小数位数</td>
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
                                GET {{ this.$http.onLine }}
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
                                    "btc_usdt": {
                                        "amountScale": 4,
                                        "priceScale": 2
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