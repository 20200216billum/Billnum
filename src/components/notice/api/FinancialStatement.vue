<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles2[3]') }}</h3>
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
                        <td>num</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>float</td>
                        <td>{{ $t('apiInfo.datalist2[1]') }}</td>
                    </tr>
                    <tr>
                        <td>rate</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>float</td>
                        <td>{{ $t('managemoney.place[1]') }}</td>
                    </tr>
                    <tr>
                        <td>days</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist[3]') }}</td>
                    </tr>
                    <tr>
                        <td>is_auto</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>1{{ $t('apiInfo.datalist2[2]') }} 0{{ $t('apiInfo.datalist2[3]') }}</td>
                    </tr>
                    <tr>
                        <td>tpwd</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('security.information[3]') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="info_pre_code clearfix">
            <div class="pre_code_left">
                <h3 class="code_left_head">{{ $t('apiInfo.list7[0]') }}</h3>
                <!-- <table class="code_left_table">
                    <thead>
                        <tr>
                            <th>返回值</th>
                            <th>描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>pname</td>
                            <td>币种</td>
                        </tr>
                        <tr>
                            <td>usable</td>
                            <td>账户余额</td>
                        </tr>
                        <tr>
                            <td>lend_sum</td>
                            <td>累计理财</td>
                        </tr>
                        <tr>
                            <td>lending_sum</td>
                            <td>理财中</td>
                        </tr>
                        <tr>
                            <td>expect</td>
                            <td>预期收益</td>
                        </tr>
                        <tr>
                            <td>in_come</td>
                            <td>累计收益</td>
                        </tr>
                    </tbody>
                </table> -->
            </div>
            <div class="pre_code_right">
                <h3 class="code_right_head">{{ $t('apiInfo.list6[6]') }}</h3>
                  <el-tabs v-model="activeName" class="code_right_tabs">
                    <el-tab-pane label="REQUEST" name="one">
                        <pre>
                            <code>
                                <span class="c1">// request demo</span>
                                POST {{ this.$http.onLine + '/Api/lend/lend_add' }}
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
                                        "status": 200,
                                        "msg": "{{ $t('apiInfo.datalist2[4]') }}",
                                        "data": ""
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