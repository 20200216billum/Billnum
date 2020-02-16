<template>
    <div>
        sssssssssssss
        <h3 class="title">{{ $t('apiInfo.titles4[6]') }}</h3>
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
                        <td>mobile</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('register.list[0]') }}</td>
                    </tr>
                    <tr>
                        <td>order_id</td>
                        <td>{{ $t('apiInfo.list5[4]') }}</td>
                        <td>int</td>
                        <td>{{ $t('frenchorder.title[1]') }}ID</td>
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
                            <td>pid</td>
                            <td>币种ID</td>
                        </tr>
                        <tr>
                            <td>pname</td>
                            <td>币种名称</td>
                        </tr>
                        <tr>
                            <td>mark</td>
                            <td>币种标识</td>
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
                                POST {{ this.$http.onLine + '/Api/Trade/cancel' }}
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
                                        "msg" : "....", 
                                        "data" : "" 
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