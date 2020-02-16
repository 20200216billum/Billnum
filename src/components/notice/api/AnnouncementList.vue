<template>
    <div>
        <h3 class="title">公告列表</h3>
        <div class="info_content">
            公告列表
        </div>
        <div class="parameter_table">
            <table class="code_left_table">
                <thead>
                    <tr>
                        <th>参数名称</th>
                        <th>必选</th>
                        <th>类型</th>
                        <th>描述</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>accesskey</td>
                        <td>是</td>
                        <td>string</td>
                        <td>accesskey</td>
                    </tr>
                    <tr>
                        <td>timestamp</td>
                        <td>是</td>
                        <td>string</td>
                        <td>时间</td>
                    </tr>
                    <tr>
                        <td>sign</td>
                        <td>是</td>
                        <td>string</td>
                        <td>签名</td>
                    </tr>
                    <tr>
                        <td>page</td>
                        <td>否</td>
                        <td>int</td>
                        <td>页码，默认1</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>否</td>
                        <td>int</td>
                        <td>页码条数，默认10</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="info_pre_code clearfix">
            <div class="pre_code_left">
                <h3 class="code_left_head">请求参数说明（签名参数按照ASCII值排序，Sign和ReqTime不用加入待签名字符串）</h3>
                <table class="code_left_table">
                    <thead>
                        <tr>
                            <th>返回值</th>
                            <th>描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>count</td>
                            <td>总数</td>
                        </tr>
                        <tr>
                            <td>page</td>
                            <td>当前页</td>
                        </tr>
                        <tr>
                            <td>size</td>
                            <td>当前页数量</td>
                        </tr>
                        <tr>
                            <td>list</td>
                            <td>数据列表</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pre_code_right">
                <h3 class="code_right_head">请求示例</h3>
                  <el-tabs v-model="activeName" class="code_right_tabs">
                    <el-tab-pane label="REQUEST" name="one">
                        <pre>
                            <code>
                                <span class="c1">// request demo</span>
                                POST {{ this.$http.onLine + '/Api/Article/notice_list' }}
                            </code>
                        </pre>
                    </el-tab-pane>
                </el-tabs>

                <h3 class="code_right_head">响应示例</h3>
                  <el-tabs v-model="activeName2" class="code_right_tabs">
                    <el-tab-pane label="JSON" name="json">
                        <pre>
                            <code>
                                <span class="c1">// 返回结果</span>
                                    {
                                        "status": "200",
                                        "msg": "ok",
                                        "data": {
                                            "count": "85",
                                            "page": "1",
                                            "size": "10",
                                            "list": [
                                                {
                                                    "id": "120",
                                                    "title": "抢筹CSC客户释放公告",
                                                    "date": "2018-12-12 16:05:00"
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