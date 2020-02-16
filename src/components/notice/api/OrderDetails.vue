<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.datalist10[5]') }}</h3>
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
                        <td>order_num</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('apiInfo.datalist9[0]') }}</td>  
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
                            <td>oop_account</td>
                            <td>{{ $t('apiInfo.datalist10[6]') }}</td>
                        </tr>
                        <tr>
                            <td>oop_name</td>
                            <td>{{ $t('apiInfo.datalist10[7]') }}</td>
                        </tr>
                        <tr>
                            <td>oop_mobile</td>
                            <td>{{ $t('apiInfo.datalist10[8]') }}</td>
                        </tr>
                        <tr>
                            <td>oop_mail</td>
                            <td>{{ $t('apiInfo.datalist10[9]') }}</td>
                        </tr>
                        <tr>
                            <td>order_num</td>
                            <td>{{ $t('apiInfo.datalist9[0]') }}</td>
                        </tr>
                        <tr>
                            <td>total_num</td>
                            <td>{{ $t('apiInfo.datalist10[10]') }}</td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td>{{ $t('sell.list[2]') }}</td>
                        </tr>
                        <tr>
                            <td>total_price</td>
                            <td>{{ $t('apiInfo.datalist10[11]') }}</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>{{ $t('fbOrder.conent[6]') }}</td>
                        </tr>
                        <tr>
                            <td>tip</td>
                            <td>{{ $t('apiInfo.list5[2]') }}</td>
                        </tr>
                        <tr>
                            <td>refer</td>
                            <td>{{ $t('apiInfo.datalist10[1]') }}</td>
                        </tr>
                        <tr>
                            <td>command</td>
                            <td>{{ $t('apiInfo.datalist10[12]') }}</td>
                        </tr>
                        <tr>
                            <td>add_time</td>
                            <td>{{ $t('mmOrder.header[2]') }}</td>
                        </tr>
                        <tr>
                            <td>down_time</td>
                            <td>{{ $t('apiInfo.datalist10[13]') }}</td>
                        </tr>
                        <tr>
                            <td>qr_time</td>
                            <td>{{ $t('apiInfo.datalist10[14]') }}</td>
                        </tr>
                        <tr>
                            <td>notes</td>
                            <td>{{ $t('apiInfo.datalist10[15]') }}</td>
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
                                GET {{ this.$http.onLine + '/API/Fbtrans/orderDetail' }}
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
                                            "oop_account": "384115",        
                                            "oop_name": "李*白",        
                                            "oop_mobile": "155***1575",        
                                            "oop_mail": "",        
                                            "type": 2,       
                                            "ss_reason": null，
                                            "order_num": "8653487381566",        
                                            "total_num": "8.3333",        
                                            "price": "1.20",        
                                            "total_price": "10.00",        
                                            "refer": "9306",        
                                            "command": null,    
                                            "add_time": "1530686534",        
                                            "status": "1",     
                                            "down_time": 0,   
                                            "qr_time": 0,        
                                            "notes": '',        
                                            "pay_list": [
                                                {
                                                    "id": "4",
                                                    "name": "lixiaobai",
                                                    "number": "16351",
                                                    "img": "6565",
                                                    "type": "alipay",
                                                    "status": "0",
                                                    "tip": "支付宝"
                                                },
                                                ...
                                            ],
                                            "pay_type":{
                                                "id": "3",
                                                "name": "lixiaobai",
                                                "bank": "16654",
                                                "branch": "465456",
                                                "number": "654654564",
                                                "type": "backcard",
                                                "status": "1",
                                                "tip": "银行卡"
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