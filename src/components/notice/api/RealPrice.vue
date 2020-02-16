<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles[7]') }}</h3>
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
                        <td>qu</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>1usdt 2btc 3eth</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list6[2]') }}</td>
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
                            <td>code</td>
                            <td>{{ $t('apiInfo.list6[3]') }}</td>
                        </tr>
                        <tr>
                            <td>date</td>
                            <td>{{ $t('apiInfo.list5[9]') }}</td>
                        </tr>
                        <tr>
                            <td>time</td>
                            <td>{{ $t('apiInfo.list6[1]') }}</td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td>{{ $t('apiInfo.list8[1]') }}</td> <!-- 实时价格 -->
                        </tr>
                        <tr>
                            <td>cnyPrice</td>
                            <td>{{ $t('apiInfo.list8[2]') }}</td>
                        </tr>
                        <tr>
                            <td>open</td>
                            <td>{{ $t('apiInfo.list8[3]') }}</td>
                        </tr>
                        <tr>
                            <td>close</td>
                            <td>{{ $t('apiInfo.list8[4]') }}</td>
                        </tr>
                        <tr>
                            <td>high</td>
                            <td>{{ $t('apiInfo.list8[5]') }}</td>
                        </tr>
                        <tr>
                            <td>low</td>
                            <td>{{ $t('apiInfo.list8[6]') }}</td>
                        </tr>
                        <tr>
                            <td>volume</td>
                            <td>{{ $t('apiInfo.list8[7]') }}</td>
                        </tr>
                        <tr>
                            <td>change</td>
                            <td>{{ $t('apiInfo.list8[8]') }}</td>
                        </tr>
                        <tr>
                            <td>changeRate</td>
                            <td>{{ $t('apiInfo.list8[9]') }}</td>
                        </tr>
                        <tr>
                            <td>buy</td>
                            <td>{{ $t('apiInfo.list8[10]') }}</td>
                        </tr>
                        <tr>
                            <td>sell</td>
                            <td>{{ $t('apiInfo.list8[11]') }}</td>
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
                                GET {{ this.$http.onLine + '/Api/ajax/getpro' }}
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
                                        "msg": "{{ $t('apiInfo.list5[8]') }}",
                                        "data": [
                                            {
                                                "code": "BTC/USDT",
                                                "name": "BTC/USDT",
                                                "date": "2019-05-21",
                                                "time": "20:20:09",
                                                "timestamp": 1558441010658,
                                                "price": 7837,
                                                "cnyPrice": 53416.992,
                                                "open": 7837.09,
                                                "close": 7837,
                                                "high": 8286.64,
                                                "low": 7560,
                                                "volume": 37901.092638312,
                                                "change": -0.09,
                                                "changeRate": "-0.00%",
                                                "buy": 7830.13,
                                                "sell": 7836.9,
                                                "img": "/Uploads/img/2018/12-27/5c24649eac12663091.png"
                                            }
                                        ]    
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