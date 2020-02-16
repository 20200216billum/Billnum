<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles1[7]') }}</h3>
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
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>1{{ $t('mortgage.table[15]') }} 2{{ $t('mortgage.table[16]') }}</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>1{{ $t('mmOrder.tip[0]') }} 2{{ $t('mmOrder.tip[1]') }}</td>
                    </tr>
                    <tr>
                        <td>pid</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>{{ $t('ziChan.list[0]') }}pid</td>
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
                        <td>{{ $t('apiInfo.list10[4]') }}</td>
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
                            <td>tran_id</td>
                            <td>{{ $t('apiInfo.list9[11]') }}id</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>1{{ $t('mortgage.table[15]') }} 2{{ $t('mortgage.table[16]') }}</td>
                        </tr>
                        <tr>
                            <td>out_pname</td>
                            <td>{{ $t('apiInfo.datalist[4]') }}</td>
                        </tr>
                        <tr>
                            <td>in_pname</td>
                            <td>{{ $t('apiInfo.datalist[5]') }}</td>
                        </tr>
                        <tr>
                            <td>out_num</td>
                            <td>{{ $t('apiInfo.datalist[2]') }}</td>
                        </tr>
                        <tr>
                            <td>in_num</td>
                            <td>{{ $t('apiInfo.datalist[12]') }}</td>
                        </tr>
                        <tr>
                            <td>day_rate</td>
                            <td>{{ $t('apiInfo.datalist[7]') }}</td>
                        </tr>
                        <tr>
                            <td>rate</td>
                            <td>{{ $t('apiInfo.datalist[13]') }}</td>
                        </tr>
                        <tr>
                            <td>addtime</td>
                            <td>{{ $t('apiInfo.datalist[14]') }}</td>
                        </tr>
                        <tr>
                            <td>endtime</td>
                            <td>{{ $t('apiInfo.datalist[15]') }}</td>
                        </tr>
                        <tr>
                            <td>selltime</td>
                            <td>{{ $t('apiInfo.datalist[16]') }}</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>1{{ $t('mmOrder.tip[0]') }} 2{{ $t('mmOrder.tip[1]') }}</td>
                        </tr>
                        <tr>
                            <td>days</td>
                            <td>{{ $t('apiInfo.datalist[3]') }}</td>
                        </tr>
                        <tr>
                            <td>fee</td>
                            <td>{{ $t('mortgage.table[6]') }}</td>
                        </tr>
                        <tr>
                            <td>dayth</td>
                            <td>{{ $t('apiInfo.list9[12]') }}</td>
                        </tr>
                        <tr>
                            <td>risk</td>
                            <td>1{{ $t('mmOrder.tip[2]') }}  0{{ $t('mmOrder.tip[3]') }}</td>
                        </tr>
                        <tr>
                            <td>risk_rate</td>
                            <td>{{ $t('apiInfo.datalist1[0]') }}（%）</td>
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
                                POST {{ this.$http.onLine + '/Api/Borrow/get_transrecord' }}
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
                                            "count": "3",
                                            "p": 1,
                                            "size": 10,
                                            "res": [
                                                {
                                                    "tran_id":"1",
                                                    "type": "1",
                                                    "out_pname": "ETH",
                                                    "in_pname": "CQTF",
                                                    "out_num": "5.0000",
                                                    "in_num": "60.0000",
                                                    "day_rate": "0.000400",
                                                    "rate": "0.010000",
                                                    "addtime": "1557558274",
                                                    "endtime": "1560182400",
                                                    "selltime": "1557558705",
                                                    "status": "2",
                                                    "days": "30",
                                                    "fee": "0.6000",
                                                    "dayth": 0,
                                                    "risk": 0
                                                    "risk_rate": 362
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