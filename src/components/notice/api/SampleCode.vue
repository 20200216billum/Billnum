<template>
    <div>
        <h3 class="title title2">{{ $t('apiInfo.list3[0]') }}</h3> <!-- 示例代码 -->
        <div class="info_content">
            1.{{ $t('apiInfo.list3[1]') }}
        </div>
        <div class="info_content">
            2.{{ $t('apiInfo.list3[2]') }}
        </div>
        <div class="info_content">
            3.{{ $t('apiInfo.list3[3]') }}
        </div>
        <div class="info_content">
            4.{{ $t('apiInfo.list3[4]') }}
            <pre>
                <code>
                    {
                        "status": "200",
                        "msg": "OK",
                        "data": {
                            "pname": "BTC",
                            "code": "BTC/USDT",
                            "fxtime": "1970-01-01",
                            "fxnum": "10000000.0000",
                            "fxprice": "10.00",
                            "fxweb": null,
                            "fxbook": "www.baidu.com",
                            "memo": "123456",
                            "coin_type": "1",
                            "gw_address": "www.baidu.com",
                            "cx_address": "www.baidu.com"
                        }
                    },
                </code>
            </pre>
            <p>{{ $t('apiInfo.list3[5]') }}</p>
            <div style="padding-left:20px;">
                <p>0 {{ $t('apiInfo.datalist5[4]') }}</p>
                <p>100 {{ $t('apiInfo.datalist5[5]') }}</p>
                <p>200 {{ $t('apiInfo.datalist5[6]') }}</p>
                <p>300 {{ $t('apiInfo.datalist5[7]') }}</p>
                <p>400 {{ $t('apiInfo.datalist5[8]') }}</p>
                <p>500 {{ $t('apiInfo.datalist5[9]') }}</p>
                <p>600 {{ $t('apiInfo.datalist5[10]') }}</p>
            </div>
            <p>{{ $t('apiInfo.list3[6]') }}</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
}
</script>