<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles[9]') }}</h3>
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
                        <td>goodsType</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list9[5]') }}（minute，minute5，minute15，minute30，minute60，day）</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list9[6]') }}</td>
                    </tr>
                    <tr>
                        <td>pageSize</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.list9[7]') }}</td>
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
                            <td>{{ $t('apiInfo.list9[8]') }}</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>{{ $t('apiInfo.list9[1]') }}</td>
                        </tr>
                        <tr>
                            <td>volume</td>
                            <td>{{ $t('apiInfo.list8[7]') }}</td>
                        </tr>
                        <tr>
                            <td>openingPrice</td>
                            <td>{{ $t('apiInfo.list9[3]') }}</td>
                        </tr>
                        <tr>
                            <td>closingPrice</td>
                            <td>{{ $t('apiInfo.list9[4]') }}</td>
                        </tr>
                        <tr>
                            <td>highestPrice</td>
                            <td>{{ $t('apiInfo.list8[5]') }}</td>
                        </tr>
                        <tr>
                            <td>lowestPrice</td>
                            <td>{{ $t('apiInfo.list8[6]') }}</td>
                        </tr>
                        <tr>
                            <td>date</td>
                            <td>{{ $t('apiInfo.list5[9]') }}</td>
                        </tr>
                        <tr>
                            <td>time</td>
                            <td>{{ $t('apiInfo.list6[1]') }}</td>
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
                                GET {{ this.$http.onLine + '/Api/Ajax/index' }}
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
                                        "data": {
                                            {
                                                "id": "13",
                                                "pid": "1",
                                                "code": "iccg",
                                                "name": "ICCG",
                                                "openingPrice": "5.2645",
                                                "closingPrice": "6.1548",
                                                "highestPrice": "6.1548",
                                                "lowestPrice": "5.1125",
                                                "volume": "198.0000",
                                                "date": "2018-08-13",
                                                "time": "14:22:00",
                                                "dateTime": "2018-08-13 14:22:00",
                                                "timestamp": "1534141320"
                                            },
                                            ...
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