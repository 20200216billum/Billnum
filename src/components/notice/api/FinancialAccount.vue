<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles2[1]') }}</h3>
        <div class="parameter_table">
            <table class="code_left_table">
                <thead>
                    <tr>
                        <th>{{ $t('apiInfo.list5[0]') }}</th> <!-- 参数名称 -->
                        <th>{{ $t('apiInfo.list5[1]') }}</th> <!-- 必选 -->
                        <th>{{ $t('apiInfo.list5[2]') }}</th> <!-- 类型 -->
                        <th>{{ $t('apiInfo.list5[3]') }}</th> <!-- 描述 -->
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>accesskey</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td> <!-- 是 -->
                        <td>string</td>
                        <td>accesskey</td>
                    </tr>
                    <tr>
                        <td>timestamp</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list6[0]') }}</td> <!-- 时间 -->
                    </tr>
                    <tr>
                        <td>sign</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list6[1]') }}</td>  <!-- 签名 -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="info_pre_code clearfix">
            <div class="pre_code_left">
                <h3 class="code_left_head">{{ $t('apiInfo.list7[0]') }}</h3>
                <table class="code_left_table">
                    <thead>
                        <tr>
                            <th>{{ $t('apiInfo.list5[6]') }}</th>
                            <th>{{ $t('apiInfo.list5[6]') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ttl_money</td>
                            <td>{{ $t('apiInfo.datalist1[8]') }}usdt</td>
                        </tr>
                        <tr>
                            <td>ttl_cnymoney</td>
                            <td>{{ $t('apiInfo.datalist1[9]') }}</td>
                        </tr>
                        <tr>
                            <td>asset</td>
                            <td>{{ $t('apiInfo.datalist1[10]') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pre_code_right">
                <h3 class="code_right_head">{{ $t('apiInfo.list6[6]') }}</h3>
                  <el-tabs v-model="activeName" class="code_right_tabs">
                    <el-tab-pane label="REQUEST" name="one">
                        <pre>
                            <code>
                                <span class="c1">// request demo</span>
                                POST {{ this.$http.onLine + '/Api/borrow/borrow_asset' }}
                            </code>
                        </pre>
                    </el-tab-pane>
                </el-tabs>

                <h3 class="code_right_head">{{ $t('apiInfo.list6[7]') }}</h3>
                  <el-tabs v-model="activeName2" class="code_right_tabs">
                    <el-tab-pane label="JSON" name="json">
                        <pre>
                            <code>
                                <span class="c1">// {{ $t('apiInfo.list6[8]') }}</span>
                                    {
                                        "status": "200",
                                        "msg": "OK",
                                        "data": {
                                            "ttl_money": 2117.6576,
                                            "ttl_cnymoney": "14611.84",
                                            "asset": [
                                                {
                                                    "pid": "1",
                                                    "mark": "USDT",
                                                    "usable": "372.37760000",
                                                    "frost": "0.00000000"
                                                },
                                                {
                                                    "pid": "3",
                                                    "mark": "ETH",
                                                    "usable": "9.00000000",
                                                    "frost": "0.00000000"
                                                },
                                                {
                                                    "pid": "2",
                                                    "mark": "BTC",
                                                    "usable": "0.00000000",
                                                    "frost": "0.00000000"
                                                },
                                                {
                                                    "pid": "10",
                                                    "mark": "CQTF",
                                                    "usable": "34.40000000",
                                                    "frost": "0.00000000"
                                                }
                                            ]
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