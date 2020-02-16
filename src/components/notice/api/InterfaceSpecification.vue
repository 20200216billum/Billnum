<template>
    <div>
        <h3 class="title title2">{{ $t('apiInfo.list1[0]') }}</h3> <!-- API接口说明 -->
        <div class="info_content">
            {{ $t('apiInfo.list1[1]') }}
            <!-- Bituneex为用户提供了两种调用接口的方式，分别为：Rest和websocket，开发者可根据自身需求来选择适合自己的方式查询行情，进行交易等 -->
        </div>
        <h3 class="subheading">{{ $t('apiInfo.list1[2]') }}</h3> <!-- REST API说明 -->
        <div class="info_content">
            {{ $t('apiInfo.list1[3]') }}
            <!-- REST，即Representational State Transfer的缩写，是目前最流行的一种互联网软件架构。它结构清晰、符合标准、易于理解、扩展方便，正得到越来越多网站的采用。其优点如下： -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[4]') }}
            <!-- 在RESTful架构中，每一个URL代表一种资源； -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[5]') }}
            <!-- 客户端和服务器之间，传递这种资源的某种表现层； -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[6]') }}
            <!-- 客户端通过四个HTTP指令，对服务器端资源进行操作，实现"表现层状态转化"。 -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[7]') }}
            <!-- 建议开发者使用REST API进行币币交易或者资产提现等操作。 -->
        </div>
        <h3 class="subheading">WEBSOCKET API</h3>
        <div class="info_content">
            {{ $t('apiInfo.list1[8]') }}
            <!-- WebSocket是HTML5一种新的协议Protocol。它实现了客户端与服务器全双工通信，使得数据可以快速地双向传播。通过一次简单的握手就可以建立客户端和服务器连接，服务器根据业务规则可以主动推送信息给客户端。其优点如下： -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[9]') }}
            <!-- 客户端和服务器进行数据传输时，请求头信息比较小，大概2个字节； -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[10]') }}
            <!-- 客户端和服务器皆可以主动地发送数据给对方； -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[11]') }}
            <!-- 不需要多次创建TCP请求和销毁，节约宽带和服务器的资源。 -->
        </div>
        <div class="info_content">
            {{ $t('apiInfo.list1[12]') }}
            <!-- 强烈建议开发者使用WebSocket API获取市场行情和买卖深度等信息。 -->
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {

    },
    methods: {

    }
}
</script>