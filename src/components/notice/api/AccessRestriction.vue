<template>
    <div>
        <h3 class="title title2">{{ $t('apiInfo.list4[0]') }}</h3> <!-- 访问限制 -->
        <div class="info_content">
            1.{{ $t('apiInfo.list4[1]') }}
            <!-- 针对交易API，单个IP限制每分钟1000次访问，超过1000次将被锁定1小时，一小时后自动解锁。 -->
        </div>
        <div class="info_content">
            2.{{ $t('apiInfo.list4[2]') }}
            <!-- 针对交易API，单个用户限制每秒钟30次访问，一秒钟内30次以上的请求，将会视作无效。 -->
        </div>
        <div class="info_content">
            3.{{ $t('apiInfo.list4[3]') }}
            <!-- K线接口每秒只能请求一次数据。 -->
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    }
}
</script>