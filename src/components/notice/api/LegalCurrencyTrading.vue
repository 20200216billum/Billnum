<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.datalist10[3]') }}</h3>
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
                        <td>string</td>
                        <td>{{ $t('forgetpwd.titleTwo[1]') }}</td>
                    </tr>
                    <tr>
                        <td>p</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.list10[3]') }}</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.list10[3]') }}</td>
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
                            <td>trans_num</td>
                            <td>{{ $t('bibi.other[1]') }}</td>
                        </tr>
                        <tr>
                            <td>deals_num</td>
                            <td>{{ $t('buy.showlist[3]') }}</td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td>{{ $t('buy.showlist[5]') }}</td>
                        </tr>
                        <tr>
                            <td>quota</td>
                            <td>{{ $t('sell.list[4]') }}</td>
                        </tr>
                        <tr>
                            <td>cd_num</td>
                            <td>{{ $t('apiInfo.datalist9[7]') }}</td>
                        </tr>
                        <tr>
                            <td>rate</td>
                            <td>{{ $t('fbDetars.list1[0]') }}</td>
                        </tr>
                        <tr>
                            <td>amount</td>
                            <td>{{ $t('apiInfo.datalist9[11]') }}</td>
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
                                GET {{ this.$http.onLine + '/API/Fbtrans/trading' }}
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
                                        "msg": "ok",
                                        "data": {
                                            "ck_price": "6.56",
                                            "count": "7",
                                            "p": 1,
                                            "size": 15,
                                            "res": [
                                                {
                                                    "account": "384119",
                                                    "order_no": "15306193203163639544",
                                                    "realname": "l***n",
                                                    "trans_num": "10.0000",
                                                    "deals_num": "0.0000",
                                                    "price": "10.00",
                                                    "min_price": "10.00",
                                                    "max_price": "20.00",
                                                    "pay_wx": "1",
                                                    "pay_alipay": "1",
                                                    "pay_backcard": "0",
                                                    "add_time": "1530619320",
                                                    "amount": "10.0000",
                                                    "quota": "10.00-20.00",
                                                    "cd_num": 0,
                                                    "rate": "0.0000"
                                                },
                                                ...
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