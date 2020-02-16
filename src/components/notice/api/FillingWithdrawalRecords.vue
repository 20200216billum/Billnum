<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles4[9]') }}</h3>
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
                        <td>cash{{ $t('ziChan.canten[1]') }} recharge{{ $t('ziChan.canten[0]') }}</td>
                    </tr>
                    <tr>
                        <td>p</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.list10[3]') }}</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
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
                            <td>addtime</td>
                            <td>{{ $t('moneyRecord.titips[1]') }}</td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td>{{ $t('apiInfo.list6[4]') }}</td>
                        </tr>
                        <tr>
                            <td>state</td>
                            <td>{{ $t('bibi.list1[11]') }}</td>
                        </tr>
                        <tr>
                            <td>check_time</td>
                            <td>{{ $t('moneyRecord.titips[2]') }}</td>
                        </tr>
                        <tr>
                            <td>pname</td>
                            <td>{{ $t('apiInfo.list9[8]') }}</td>
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
                                POST {{ this.$http.onLine + '/Api/Qbw/record' }}
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
                                            "count": "13",
                                            "p": "1",
                                            "size": "5",
                                            "res": [
                                                {
                                                    "id":"1",
                                                    "addtime": "2018-12-06 12:01:36",
                                                    "price": "200.0000",
                                                    "state": "4",
                                                    "pid": "0",
                                                    "qianbao_url": "1K2m9iGZuPXvgeiyW9nyiCH3Z5FNVZ9kRe",
                                                    "check_time": "2018-12-06 12:01:50",
                                                    "pname": null
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