<template>
    <div>
        <h3 class="title">{{ $t('apiInfo.datalist10[0]') }}</h3>
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
                        <td>account</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('forgetpwd.titleTwo[1]') }}</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('mortgage.table[3]') }}</td>
                    </tr>
                    <tr>
                        <td>tpwd</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>string</td>
                        <td>{{ $t('frenchcurrency.mobile[3]') }}</td>
                    </tr>
                    <tr>
                        <td>order_no</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist8[7]') }}</td>
                    </tr>
                    <tr>
                        <td>total_num</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist9[8]') }}</td>
                    </tr>
                    <tr>
                        <td>total_price</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('apiInfo.datalist9[9]') }}</td>
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
                            <td>{{ $t('apiInfo.datalist9[0]') }}</td>
                        </tr>
                        <tr>
                            <td>shop_realname</td>
                            <td>{{ $t('apiInfo.datalist8[11]') }}</td>
                        </tr>
                        <tr>
                            <td>refer</td>
                            <td>{{ $t('apiInfo.datalist9[1]') }}</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>{{ $t('fbOrder.conent[6]') }}</td>
                        </tr>
                        <tr>
                            <td>tip</td>
                            <td>{{ $t('apiInfo.list5[2]') }}</td>
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
                                POST {{ this.$http.onLine + '/API/Fbtrans/create_order' }}
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
                                        "status" : "200", 
                                        "msg" : "ok", 
                                        "data" : { 
                                            "order_num" : "15263479017312888102", 
                                            "total_num" : "12", 
                                            "shop_account": "3841158",
                                            "shop_realname": "刘*辉",
                                            "price" : "1.00", 
                                            "total_price" : "12", 
                                            "refer" : "5447",         
                                            "pay_list" : { 
                                                "0" : { 
                                                        "id" : "16", 
                                                        "name" : "刘亚辉", 
                                                        "number" : "646491654", 
                                                        "wx_img" : "uploads/cardimg/20180510213351_971.jpg", 
                                                        "type" : "wx", 
                                                        "status" : "1", 
                                                        "tip" : "微信" 
                                                }, 
                                                ...
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