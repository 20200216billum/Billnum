<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles2[2]') }}</h3>
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
                        <td>code</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list9[6]') }}</td>
                    </tr>
                    <tr>
                        <td>start</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist1[11]') }}</td>
                    </tr>
                    <tr>
                        <td>end</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist1[12]') }}</td>
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
                            <td>{{ $t('apiInfo.list9[8]') }}</td>
                        </tr>
                        <tr>
                            <td>usable</td>
                            <td>{{ $t('apiInfo.datalist2[0]') }}</td>
                        </tr>
                        <tr>
                            <td>lend_sum</td>
                            <td>{{ $t('managemoney.header[3]') }}</td>
                        </tr>
                        <tr>
                            <td>lending_sum</td>
                            <td>{{ $t('managemoney.header[1]') }}</td>
                        </tr>
                        <tr>
                            <td>expect</td>
                            <td>{{ $t('managemoney.header[2]') }}</td>
                        </tr>
                        <tr>
                            <td>in_come</td>
                            <td>{{ $t('managemoney.header[4]') }}</td>
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
                                POST {{ this.$http.onLine + '/Api/lend/blend' }}
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
                                        "status": 0,
                                        "msg": "ok",
                                        "data": {
                                            "pname": "ETH",
                                            "usable": "6.95000000",
                                            "lend_sum": 7,
                                            "lending_sum": 4,
                                            "expect": 0.0048,
                                            "in_come": -0.05
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