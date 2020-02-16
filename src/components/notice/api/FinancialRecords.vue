<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles2[5]') }}</h3>
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
                        <td>status</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>1{{ $t('managemoney.header[1]') }} 2{{ $t('managemoney.status[6]') }}</td>
                    </tr>
                    <tr>
                        <td>pid</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.list9[8]') }}pid</td>
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
                            <td>pname</td>
                            <td>{{ $t('apiInfo.datalist2[6]') }}</td>
                        </tr>
                        <tr>
                            <td>num</td>
                            <td>{{ $t('apiInfo.datalist2[1]') }}</td>
                        </tr>
                        <tr>
                            <td>interest_rate</td>
                            <td>{{ $t('managemoney.place[1]') }}（%）</td>
                        </tr>
                        <tr>
                            <td>fine_rate</td>
                            <td>{{ $t('apiInfo.datalist1[6]') }}（%）</td>
                        </tr>
                        <tr>
                            <td>addtime</td>
                            <td>{{ $t('apiInfo.datalist[17]') }}</td>
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
                            <td>1{{ $t('managemoney.header[1]') }} 2{{ $t('managemoney.status[6]') }}</td>
                        </tr>
                        <tr>
                            <td>is_auto</td>
                            <td>1{{ $t('apiInfo.datalist2[2]') }}  0{{ $t('apiInfo.datalist2[3]') }}</td>
                        </tr>
                        <tr>
                            <td>days</td>
                            <td>{{ $t('apiInfo.datalist[3]') }}</td>
                        </tr>
                        <tr>
                            <td>interest</td>
                            <td>{{ $t('apiInfo.datalist2[7]') }}</td>
                        </tr>
                        <tr>
                            <td>commision</td>
                            <td>{{ $t('apiInfo.datalist2[8]') }}</td>
                        </tr>
                        <tr>
                            <td>fine</td>
                            <td>{{ $t('apiInfo.datalist2[9]') }}</td>
                        </tr>
                        <tr>
                            <td>dayth</td>
                            <td>{{ $t('apiInfo.list9[12]') }}</td>
                        </tr>
                        <tr>
                            <td>income</td>
                            <td>{{ $t('managemoney.header[2]') }}</td>
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
                                POST {{ this.$http.onLine + '/Api/lend/get_transrecord' }}
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
                                            "count": "2",
                                            "p": 1,
                                            "size": 10,
                                            "res": [
                                                {
                                                    "tran_id":"1",
                                                    "pname": "ETH",
                                                    "num": "5.0000",
                                                    "interest_rate": "0.150000",
                                                    "fine_rate": "1",
                                                    "addtime": "1557575036",
                                                    "endtime": "1560182400",
                                                    "selltime": "1557575630",
                                                    "status": "2",
                                                    "is_auto": "0",
                                                    "days": "30",
                                                    "interest": "0.0000",
                                                    "commision": "0.0000",
                                                    "fine": "0.0500",
                                                    "dayth": 0,
                                                    "income": -0.05
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