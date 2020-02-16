> A Vue.js project
## Build Setup

``` bash
# install dependencies
npm install



# 币币交易部分逻辑
可交易金额    =  总资金 /(1 + 手续费)

市价买入   市价 不知道当前价格  滑竿显示usdt个数  
市价卖出  市价 不知道当前价格 滑竿显示 币种数量

限价 买入  价格可以修改  以usdt买 币种 滑竿是可以买的币种个数
限价 卖出 价格可以修改 以usdt卖 币种 滑竿显示的是可以卖的币种数量

注意：其中有手续费  
 
connet.canbuy = connet.Assets.wallone/(1 + connet.Assets.trans_fee)


# 红涨  绿跌

接口地址 ：  https://www.showdoc.cc/hub
 密码 123456
 

# 法币交易订单 优化  
# 头部导航 下划线 优化

#15333

# 需要后台修改的地方
1 平台中心 新手指导 需要分开 的传相应的字段
2 抢筹 后台返回数据更改后前台再做更改

# 每次上线要注意的事情

1 看看static 里面的 index.html 文件里面请求的接口对不对
2 看看login.vue 里面的idpc是不是打开
3 看看api.js 里面的地址有没有写活 
