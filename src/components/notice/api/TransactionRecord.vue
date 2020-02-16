<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.titles4[4]') }}</h3>
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
                    <tr>
                        <td>mobile</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('register.list[0]') }}</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.list9[8]') }}</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td>{{ $t('apiInfo.list5[5]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist4[7]') }}</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist4[8]') }}</td>
                    </tr>
                    <tr>
                        <td>otype</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>1{{ $t('bibi.status[2]') }}  2{{ $t('bibi.status[3]') }}</td>
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
                            <td>{{ $t('apiInfo.datalist4[9]') }}</td>
                        </tr>
                        <tr>
                            <td>wtprice</td>
                            <td>{{ $t('apiInfo.datalist4[3]') }}</td>
                        </tr>
                        <tr>
                            <td>cjprice</td>
                            <td>{{ $t('bibi.list1[1]') }}</td>
                        </tr>
                        <tr>
                            <td>wtnum</td>
                            <td>{{ $t('apiInfo.datalist4[4]') }}</td>
                        </tr>
                        <tr>
                            <td>cjnum</td>
                            <td>{{ $t('bibi.list1[2]') }}</td>
                        </tr>
                        <tr>
                            <td>totalprice</td>
                            <td>{{ $t('apiInfo.datalist4[10]') }}</td>
                        </tr>
                        <tr>
                            <td>fee</td>
                            <td>{{ $t('apiInfo.datalist4[11]') }}</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>1{{ $t('bibi.status[0]') }} 2{{ $t('bibi.status[1]') }}</td>
                        </tr>
                        <tr>
                            <td>add_time</td>
                            <td>{{ $t('bibi.list1[5]') }}</td>
                        </tr>
                        <tr>
                            <td>trade_time</td>
                            <td>{{ $t('bibi.list1[0]') }}</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>{{ $t('apiInfo.datalist4[7]') }}</td>
                        </tr>
                        <tr>
                            <td>otype</td>
                            <td>1{{ $t('bibi.status[2]') }}  2{{ $t('bibi.status[3]') }}</td>
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
                                POST {{ this.$http.onLine + '/Api/Trade/tranlist' }}
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
                                        "msg": "{{ $t('apiInfo.datalist3[9]') }}!",
                                        "data": {
                                            "count": "0",
                                            "p": 1,
                                            "size": 5,
                                            "res" :[
                                            { 
                                                "orders_id" : "1", 
                                                "member_id" : "1", 
                                                "account" : "384111", 
                                                "currency_id" : "1", 
                                                "pname" : "BTC/USDT",  
                                                "wtprice" : "100",  
                                                "cjprice" : "0.0000",  
                                                "wtnum" : "10.0000",  
                                                "cjnum" : "0.0000", 
                                                "totalprice" : "1.0000",
                                                "fee" : "0.0010",   
                                                "type" : "1",         
                                                "add_time" : "1525860777",
                                                "trade_time" : "0",   
                                                "status" : "0",    
                                                "otype" : "1"      
                                            }, 
                                            ...
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