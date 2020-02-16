<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.datalist7[1]') }}</h3>
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
                            <td>order_num</td>
                            <td>{{ $t('fbOrder.conent[0]') }}</td>
                        </tr>
                        <tr>
                            <td>add_time</td>
                            <td>{{ $t('apiInfo.list6[0]') }}</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>1.{{ $t('frenchcurrency.todo[0]') }} 2.{{ $t('frenchcurrency.todo[1]') }}</td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td>{{ $t('apiInfo.list6[5]') }}</td>
                        </tr>
                        <tr>
                            <td>total_num</td>
                            <td>{{ $t('apiInfo.list6[4]') }}</td>
                        </tr>
                        <tr>
                            <td>total_price</td>
                            <td>{{ $t('fbOrder.conent[4]') }}</td>
                        </tr>
                        <tr>
                            <td>sxfee</td>
                            <td>{{ $t('fbOrder.conent[5]') }}</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>{{ $t('fbOrder.conent[6]') }}</td>
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
                                GET {{ this.$http.onLine + '/API/qbw/get_mx' }}
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
                                            "count": "2",
                                            "p": 1,
                                            "size": 5,
                                            "res": [
                                                {
                                                    "chu_account": "384115",
                                                    "gou_account": "384119",
                                                    "order_num": "15306231258586805287",       
                                                    "add_time": "1530623125",       
                                                    "type": "2",
                                                    "price": "20.00",        
                                                    "total_num": "5.0000",        
                                                    "total_price": "100.00",        
                                                    "sxfee": "0.0000",       
                                                    "status": "5",    
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