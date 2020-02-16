<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles1[3]') }}</h3>
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
                    <tr>
                        <td>type</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>1{{ $t('apiInfo.list9[9]') }} 2{{ $t('apiInfo.list9[10]') }}</td>
                    </tr>
                    <tr>
                        <td>out_code</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list9[6]') }}</td>
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
                            <td>pname</td>
                            <td>{{ $t('apiInfo.list10[9]') }}</td>
                        </tr>
                        <tr>
                            <td>usable</td>
                            <td>{{ $t('apiInfo.list10[10]') }}</td>
                        </tr>
                        <tr>
                            <td>price_usdt</td>
                            <td>{{ $t('apiInfo.list10[11]') }}</td>
                        </tr>
                        <tr>
                            <td>price_cny</td>
                            <td>{{ $t('apiInfo.list10[12]') }}</td>
                        </tr>
                        <tr>
                            <td>in_coins</td>
                            <td>{{ $t('apiInfo.list10[13]') }}</td>
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
                                POST {{ this.$http.onLine + '/Api/borrow/mortgage_info' }}
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
                                            "pname": "USDT",
                                            "usable": "1372.37760000",
                                            "price_usdt": "1372.37760000",
                                            "price_cny": "6.90",
                                            "in_coins": {
                                                "1": {
                                                    "pid": "3",
                                                    "mark": "ETH"
                                                },
                                                "2": {
                                                    "pid": "2",
                                                    "mark": "BTC"
                                                },
                                                "3": {
                                                    "pid": "10",
                                                    "mark": "CQTF"
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