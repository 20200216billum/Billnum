<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.datalist7[11]') }}</h3>
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
                        <td>shop_account</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.datalist9[2]') }}</td>
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
                            <td>pay_type</td>
                            <td>{{ $t('buy.list[7]') }}</td>
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
                                GET {{ this.$http.onLine + '/API/Fbtrans/cat_shopinfo' }}
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
                                            "shensu": "0",
                                            "shengsu": "0",
                                            "three_num": 0,
                                            "rate": "0.0000",
                                            "cd_num": 0,
                                            "set_status": {
                                                "name": "**",
                                                "reg_time": "1530168416",
                                                "mobile": 1,
                                                "email": 1,
                                                "smrz": 1,
                                                "status": "3"
                                            },
                                            "sell": {
                                                "count": "1",
                                                "p": 1,
                                                "size": 5,
                                                "res": [
                                                    ...
                                                ]
                                            },
                                            "pmma": {
                                                "count": "1",
                                                "p": 1,
                                                "size": 5,
                                                "res": [
                                                    ...
                                                ]
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