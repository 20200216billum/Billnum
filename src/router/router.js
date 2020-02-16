import Main from '@/components/mian.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
      path: 'addCoin',
      name: 'addCoin',
      component: () => import('@/components/addCoin/addCoin.vue')
    },
    {
      path: 'home',
      title: {
        i18n: 'home'
      },
      name: 'home_index',
      component: () => import('@/components/home/home.vue')
    },
    {
      path: 'cjpt',
      name: 'cjpt',
      component: () => import('@/components/chaojipingtai/cjpt.vue')
    }, //超级平台
    {
      path: 'fuli',
      name: 'fuli',
      component: () => import('@/components/chaojipingtai/fuliqu.vue')
    }, //福利区
    {
      path: 'sup',
      name: 'fuli',
      component: () => import('@/components/chaojipingtai/sup.vue')
    }, //sup分红纪录
    {
      path: 'kongtou',
      name: 'kongtou',
      component: () => import('@/components/chaojipingtai/kongtouqu.vue')
    }, //空投区
    {
      path: 'zhangdan',
      name: 'zhangdan',
      component: () => import('@/components/chaojipingtai/zhangdan.vue')
    }, //空投区账单页
    {
      path: 'fenhong',
      name: 'fenhong',
      component: () => import('@/components/chaojipingtai/fenhong.vue')
    }, //分红
    {
      path: 'coincoin',
      name: 'coincoin',
      component: () => import('@/components/exchange/index.vue')
    }, //币币交易 
    {
      path: 'register',
      name: 'register',
      component: () => import('@/components/register.vue')
    }, //注册
    {
      path: 'login',
      name: 'login',
      component: () => import('@/components/login.vue')
    }, //登录
    {
      path: 'forgetpwd',
      name: 'forgetpwd',
      component: () => import('@/components/forget.vue')
    }, //忘记密码
    {
      path: 'promotion',
      name: 'promotion',
      component: () => import('@/components/promotion/promotion.vue')
    }, //我的推广
    {
      path: 'help',
      name: 'promotion',
      component: () => import('@/components/notice/help.vue')
    }, //帮助中心
    // 跑得快
    {
      path: 'guessing',
      name: 'guessing',
      component: () => import('@/components/runfast/guessing.vue')
    }, //竞猜
    {
      path: 'faq',
      name: 'faq',
      component: () => import('@/components/runfast/faq.vue')
    }, //常见问题
    {
      path: 'ranking',
      name: 'ranking',
      component: () => import('@/components/runfast/ranking.vue')
    }, //排行榜
    {
      path: 'standings',
      name: 'standings',
      component: () => import('@/components/runfast/standings.vue')
    }, //战绩
    {
      path: 'asset',
      name: 'asset',
      component: () => import('@/components/runfast/asset.vue')
    }, //资产
    {
      path: 'jiaoyan',
      name: 'jiaoyan',
      component: () => import('@/components/runfast/jiaoyan.vue')
    },
    //商城
    {
      path: 'shopIndex',
      name: 'shopIndex',
      component: () => import('@/components/shop/index.vue')
    }, //商城首页
    {
      path: 'Details',
      name: 'Details',
      component: () => import('@/components/shop/Details.vue')
    }, //商品详情
    {
      path: 'addSite',
      name: 'addSite',
      component: () => import('@/components/shop/addSite.vue')
    }, //添加收货地址
    {
      path: 'payment',
      name: 'payment',
      component: () => import('@/components/shop/payment.vue')
    }, //立即支付
    {
      path: 'shopOrder',
      name: 'shopOrder',
      component: () => import('@/components/shop/orderList.vue')
    },
    {
      path: 'shopOrder/:id',
      name: 'shopOrderDetail',
      component: () => import('@/components/shop/orderDetail.vue')
    },



    {
      path: 'myAccount',
      name: 'myAccount',
      component: () => import('@/components/account/account.vue')
    }, //币币交易 

    {
      path: 'apply',
      name: 'apply',
      component: () => import('@/components/advertisement/apply.vue')
    }, //发布广告
    {
      path: 'buy',
      name: 'buy',
      component: () => import('@/components/advertisement/buy.vue')
    }, //发布广告  求购
    {
      path: 'sell',
      name: 'sell',
      component: () => import('@/components/advertisement/sell.vue')
    }, //发布广告 出售   
    {
      path: 'transferAssets',
      name: 'transferAssets',
      component: () => import('@/components/account/transferAssets.vue')
    }, //站内转账

    // { path: 'managemoney', name: 'managemoney', component: () => import('@/components/manageMoney/ManageMoney.vue') },  // 理财
    // { path: 'mortgage', name: 'mortgage', component: () => import('@/components/mortgage/Mortgage.vue') },  // 理财
    // { path: 'mortgageLending', name: 'mortgageLending', component: () => import('@/components/mortgage/MortgageLending.vue') },  // 抵押借款费率
    // { path: 'mmOrder', name: 'mmOrder', component: () => import('@/components/mortgage/order.vue') },  // 理财
    {
      path: 'economicMan',
      name: 'economicMan',
      component: () => import('@/components/economicMan/economicMan.vue')
    }, //经济人
    {
      path: 'promotion',
      name: 'promotion',
      component: () => import('@/components/promotion/promotion.vue')
    }, //我的推广
    {
      path: 'invite_friends',
      name: 'invite_friends',
      component: () => import('@/components/economicMan/invite_friends.vue')
    },


    //		{ path: 'transfer', name: 'transfer', component: () => import('@/components/transfer/transfer.vue')},  //站内转账
    {
      path: 'MyAssets',
      name: 'MyAssets',
      component: () => import('@/components/MyAssets/ziChan.vue')
    }, //我的资产  
    {
      path: 'tiBit',
      name: 'tiBit',
      component: () => import('@/components/MyAssets/children/tiBit.vue')
    }, //提币   
    {
      path: 'chongBit',
      name: 'chongBit',
      component: () => import('@/components/MyAssets/children/chongBit.vue')
    }, //充币     
    {
      path: 'moneyRecord',
      name: 'moneyRecord',
      component: () => import('@/components/MyAssets/children/moneyRecord.vue')
    }, //明细
    {
      path: 'moneyRecord2',
      name: 'moneyRecord2',
      component: () => import('@/components/MyAssets/children/moneyRecord2.vue')
    }, //理财明细
    {
      path: 'exchangeCoin',
      name: 'exchangeCoin',
      component: () => import('@/components/MyAssets/children/exchangeCoin.vue')
    }, //兑换
    {
      path: 'security',
      name: 'security',
      redirect: '/security/index',
      component: () => import('@/components/accountSecurity/security.vue'),
      children: [{
          path: 'alipay',
          name: 'alipay',
          component: () => import('@/components/accountSecurity/pay/alipay.vue')
        }, //修改支付宝支付方式
        {
          path: 'backcard',
          name: 'backcard',
          component: () => import('@/components/accountSecurity/pay/back_card.vue')
        }, //修改修改银行卡支付方式
        { //修改微信支付方式
          path: 'wx',
          name: 'wx',
          component: () => import('@/components/accountSecurity/pay/wx.vue')
        },
        { //个人中心
          path: 'index',
          name: 'index',
          component: () => import('@/components/accountSecurity/children/index.vue')
        },
        {//身份认证
          path: '/security/identity',
          name: 'change_opwd',
          component: () => import('@/components/accountSecurity/children/identity.vue')
        }, 
        { // 身份认证初级
          path: '/security/identity/changePerson1',
          name: 'changePerson1',
          component: () => import('@/components/accountSecurity/children/change_person1.vue')
        },
        {// 身份认证高级
          path: '/security/identity/changePerson2',
          name: 'changePerson2',
          component: () => import('@/components/accountSecurity/children/change_person2.vue')
        }, 
        { //修改登录密码
          path: '/security/index/changeopwd',
          name: 'change_opwd',
          component: () => import('@/components/accountSecurity/children/change_opwd.vue')
        },
        { //绑定手机
          path: '/security/index/change_mobile',
          name: 'change_opwd',
          component: () => import('@/components/accountSecurity/children/change_mobile.vue')
        },
        { //设置资金密码
          path: '/security/index/set_tpwd',
          name: 'set_tpwd',
          component: () => import('@/components/accountSecurity/children/set_tpwd.vue')
        },
        { //修改资金密码
          path: '/security/index/change_tpwd',
          name: 'change_tpwd',
          component: () => import('@/components/accountSecurity/children/change_tpwd.vue')
        },
        { //修改邮箱
          path: '/security/index/change_email',
          name: 'change_tpwd2',
          component: () => import('@/components/accountSecurity/children/change_email.vue')
        },
        {
          path: '/security/index/googleverify',
          name: 'google_verify',
          component: () => import('@/components/accountSecurity/children/google_verify.vue')
        }, //绑定谷歌验证页面
        {
          path: '/security/index/googleverifyonoff',
          name: 'google_verify_onoff',
          component: () => import('@/components/accountSecurity/children/google_verify_onoff.vue')
        }, //绑定谷歌验证页面
      ]
    }, //账号安全
    {
      path: 'fail',
      name: 'fail',
      component: () => import('@/components/accountSecurity/fail.vue')
    },
    {
      path: 'success',
      name: 'success',
      component: () => import('@/components/accountSecurity/success.vue')
    },

    {
      path: 'isapply',
      name: 'isapply',
      component: () => import('@/components/broker/isApply.vue')
    }, //经纪人

    {
      path: 'changeemail',
      name: 'change_email',
      component: () => import('@/components/accountSecurity/children/change_email.vue')
    }, //绑定邮箱
    {
      path: 'changemobile',
      name: 'change_mobile',
      component: () => import('@/components/accountSecurity/children/change_mobile.vue')
    }, //修改绑定手机号
    
    
    {
      path: 'transfer',
      name: 'transfer',
      component: () => import('@/components/accountSecurity/children/transfer.vue')
    }, //站内转账

    {
      path: 'authentication',
      name: 'authentication',
      component: () => import('@/components/authentication/identity.vue')
    }, //认证
    {
      path: 'senior',
      name: 'senior',
      component: () => import('@/components/authentication/children/senior.vue')
    }, //重新认证
    {
      path: 'realname',
      name: 'realname',
      component: () => import('@/components/authentication/children/real_name.vue')
    }, //认证
    {
      path: 'broker',
      name: 'broker',
      component: () => import('@/components/broker/isApply.vue')
    }, //经纪人申请
    {
      path: 'fundmannagement',
      name: 'fundmannagement',
      component: () => import('@/components/fundmanagement/fund.vue')
    }, //基金管理
    {
      path: 'Mentionmoneyaddress',
      name: 'Mentionmoneyaddress',
      component: () => import('@/components/Mentionmoneyaddress/moneyAddre.vue')
    }, //提币地址

    {
      path: 'frenchcurrency',
      name: 'frenchcurrency',
      component: () => import('@/components/frenchcurrency/frenchcurrency.vue')
    }, //法币交易   
    {
      path: 'frenchdetails',
      name: 'frenchdetails',
      component: () => import('@/components/frenchcurrency/frenchDetails.vue')
    }, //法币交易   
    {
      path: 'frenchOrder',
      name: 'frenchOrder',
      component: () => import('@/components/frenchcurrency/frenchOrder.vue')
    }, //法币交易   
    {
      path: 'zixunList',
      name: 'zixunList',
      component: () => import('@/components/notice/zixunList.vue')
    }, //资讯  
    {
      path: 'zixunDetails',
      name: 'zixunDetails',
      component: () => import('@/components/notice/zixunDetails.vue')
    }, //资讯  详情

    {
      path: 'gonggaoList',
      name: 'gonggaoList',
      component: () => import('@/components/notice/gonggaoList.vue')
    }, //公告
    {
      path: 'videoDetails',
      name: 'videoDetails',
      component: () => import('@/components/notice/videoDetails.vue')
    }, //公告  详情
    {
      path: 'bps',
      name: 'bps',
      component: () => import('@/components/notice/bps.vue')
    }, //公告  详情
    {
      path: 'fbOrder',
      name: 'fbOrder',
      component: () => import('@/components/order/fbOrder.vue')
    },
    {
      path: 'ggOrder',
      name: 'ggOrder',
      component: () => import('@/components/order/ggOrder.vue')
    },
    {
      path: 'bbOrder',
      name: 'bbOrder',
      component: () => import('@/components/order/bbOrderAll.vue')
    },
    {
      path: 'agreement',
      name: 'agreement',
      component: () => import('@/components/notice/agreement.vue')
    },
    {
      path: 'api',
      name: 'api',
      component: () => import('@/components/notice/API.vue'),
      children: [{
          path: 'Introduce',
          name: 'Introduce',
          component: () => import('@/components/notice/api/Introduce.vue')
        },
        {
          path: 'InterfaceSpecification',
          name: 'InterfaceSpecification',
          component: () => import('@/components/notice/api/InterfaceSpecification.vue')
        },
        {
          path: 'ResetApi',
          name: 'ResetApi',
          component: () => import('@/components/notice/api/ResetApi.vue')
        },
        {
          path: 'SampleCode',
          name: 'SampleCode',
          component: () => import('@/components/notice/api/SampleCode.vue')
        },
        {
          path: 'AccessRestriction',
          name: 'AccessRestriction',
          component: () => import('@/components/notice/api/AccessRestriction.vue')
        },
        {
          path: 'Configure',
          name: 'Configure',
          component: () => import('@/components/notice/api/Configure.vue')
        },
        {
          path: 'AllTicker',
          name: 'AllTicker',
          component: () => import('@/components/notice/api/AllTicker.vue')
        },
        {
          path: 'Ticker',
          name: 'Ticker',
          component: () => import('@/components/notice/api/Ticker.vue')
        },
        {
          path: 'RealTransaction',
          name: 'RealTransaction',
          component: () => import('@/components/notice/api/RealTransaction.vue')
        },
        {
          path: 'RealPrice',
          name: 'RealPrice',
          component: () => import('@/components/notice/api/RealPrice.vue')
        },
        {
          path: 'AppBanner',
          name: 'AppBanner',
          component: () => import('@/components/notice/api/AppBanner.vue')
        },
        {
          path: 'HomeMarketList',
          name: 'HomeMarketList',
          component: () => import('@/components/notice/api/HomeMarketList.vue')
        },
        {
          path: 'KLine',
          name: 'KLine',
          component: () => import('@/components/notice/api/KLine.vue')
        },
        {
          path: 'MailboxCode',
          name: 'MailboxCode',
          component: () => import('@/components/notice/api/MailboxCode.vue')
        },
        {
          path: 'RegisterApi',
          name: 'RegisterApi',
          component: () => import('@/components/notice/api/RegisterApi.vue')
        },
        {
          path: 'LoginApi',
          name: 'LoginApi',
          component: () => import('@/components/notice/api/LoginApi.vue')
        },
        {
          path: 'MessageCode',
          name: 'MessageCode',
          component: () => import('@/components/notice/api/MessageCode.vue')
        },
        {
          path: 'UserInfo',
          name: 'UserInfo',
          component: () => import('@/components/notice/api/UserInfo.vue')
        },
        {
          path: 'ResetLoginPassword',
          name: 'ResetLoginPassword',
          component: () => import('@/components/notice/api/ResetLoginPassword.vue')
        },
        {
          path: 'ReplacementFundCode',
          name: 'ReplacementFundCode',
          component: () => import('@/components/notice/api/ReplacementFundCode.vue')
        },
        {
          path: 'ForgetPassword',
          name: 'ForgetPassword',
          component: () => import('@/components/notice/api/ForgetPassword.vue')
        },
        {
          path: 'BindMailbox',
          name: 'BindMailbox',
          component: () => import('@/components/notice/api/BindMailbox.vue')
        },
        {
          path: 'AnnouncementList',
          name: 'AnnouncementList',
          component: () => import('@/components/notice/api/AnnouncementList.vue')
        },
        {
          path: 'AnnouncementDetails',
          name: 'AnnouncementDetails',
          component: () => import('@/components/notice/api/AnnouncementDetails.vue')
        },
        {
          path: 'AccountTransfer',
          name: 'AccountTransfer',
          component: () => import('@/components/notice/api/AccountTransfer.vue')
        },
        {
          path: 'TransferRecord',
          name: 'TransferRecord',
          component: () => import('@/components/notice/api/TransferRecord.vue')
        },
        {
          path: 'MortgageInformation',
          name: 'MortgageInformation',
          component: () => import('@/components/notice/api/MortgageInformation.vue')
        },
        {
          path: 'BorrowedCurrency',
          name: 'BorrowedCurrency',
          component: () => import('@/components/notice/api/BorrowedCurrency.vue')
        },
        {
          path: 'MortgageLoan',
          name: 'MortgageLoan',
          component: () => import('@/components/notice/api/MortgageLoan.vue')
        },
        {
          path: 'Repayment',
          name: 'Repayment',
          component: () => import('@/components/notice/api/Repayment.vue')
        },
        {
          path: 'MortgageRecord',
          name: 'MortgageRecord',
          component: () => import('@/components/notice/api/MortgageRecord.vue')
        },
        {
          path: 'CurrencyManagement',
          name: 'CurrencyManagement',
          component: () => import('@/components/notice/api/CurrencyManagement.vue')
        },
        {
          path: 'FinancialAccount',
          name: 'FinancialAccount',
          component: () => import('@/components/notice/api/FinancialAccount.vue')
        },
        {
          path: 'FinancialStatistics',
          name: 'FinancialStatistics',
          component: () => import('@/components/notice/api/FinancialStatistics.vue')
        },
        {
          path: 'FinancialStatement',
          name: 'FinancialStatement',
          component: () => import('@/components/notice/api/FinancialStatement.vue')
        },
        {
          path: 'FinancialRedemption',
          name: 'FinancialRedemption',
          component: () => import('@/components/notice/api/FinancialRedemption.vue')
        },
        {
          path: 'FinancialRecords',
          name: 'FinancialRecords',
          component: () => import('@/components/notice/api/FinancialRecords.vue')
        },
        {
          path: 'MarginCall',
          name: 'MarginCall',
          component: () => import('@/components/notice/api/MarginCall.vue')
        },
        {
          path: 'LendingRules',
          name: 'LendingRules',
          component: () => import('@/components/notice/api/LendingRules.vue')
        },
        {
          path: 'RedemptionPopUp',
          name: 'RedemptionPopUp',
          component: () => import('@/components/notice/api/RedemptionPopUp.vue')
        },
        {
          path: 'ListMortgage',
          name: 'ListMortgage',
          component: () => import('@/components/notice/api/ListMortgage.vue')
        },
        {
          path: 'CreditRate',
          name: 'CreditRate',
          component: () => import('@/components/notice/api/CreditRate.vue')
        },
        {
          path: 'MortgageloanReplenishment',
          name: 'MortgageloanReplenishment',
          component: () => import('@/components/notice/api/MortgageloanReplenishment.vue')
        },
        {
          path: 'LoanStatistics',
          name: 'LoanStatistics',
          component: () => import('@/components/notice/api/LoanStatistics.vue')
        },
        {
          path: 'DaysMortgage',
          name: 'DaysMortgage',
          component: () => import('@/components/notice/api/DaysMortgage.vue')
        },
        {
          path: 'CurrencyAmount',
          name: 'CurrencyAmount',
          component: () => import('@/components/notice/api/CurrencyAmount.vue')
        },
        {
          path: 'CurrencyList',
          name: 'CurrencyList',
          component: () => import('@/components/notice/api/CurrencyList.vue')
        },
        {
          path: 'CurrencyDetails',
          name: 'CurrencyDetails',
          component: () => import('@/components/notice/api/CurrencyDetails.vue')
        },
        {
          path: 'RealData',
          name: 'RealData',
          component: () => import('@/components/notice/api/RealData.vue')
        },
        {
          path: 'DetailsEachCurrency',
          name: 'DetailsEachCurrency',
          component: () => import('@/components/notice/api/DetailsEachCurrency.vue')
        },
        {
          path: 'CurrencyTrading',
          name: 'CurrencyTrading',
          component: () => import('@/components/notice/api/CurrencyTrading.vue')
        },
        {
          path: 'TransactionRecord',
          name: 'TransactionRecord',
          component: () => import('@/components/notice/api/TransactionRecord.vue')
        },
        {
          path: 'CurrencyInformation',
          name: 'CurrencyInformation',
          component: () => import('@/components/notice/api/CurrencyInformation.vue')
        },
        {
          path: 'CommissionWithdrawal',
          name: 'CommissionWithdrawal',
          component: () => import('@/components/notice/api/CommissionWithdrawal.vue')
        },
        {
          path: 'RechargePage',
          name: 'RechargePage',
          component: () => import('@/components/notice/api/RechargePage.vue')
        },
        {
          path: 'FillingWithdrawalRecords',
          name: 'FillingWithdrawalRecords',
          component: () => import('@/components/notice/api/FillingWithdrawalRecords.vue')
        },
        {
          path: 'WithdrawMoney',
          name: 'WithdrawMoney',
          component: () => import('@/components/notice/api/WithdrawMoney.vue')
        },
        {
          path: 'WithdrawalOfCurrency',
          name: 'WithdrawalOfCurrency',
          component: () => import('@/components/notice/api/WithdrawalOfCurrency.vue')
        },
        {
          path: 'TicketAddressList',
          name: 'TicketAddressList',
          component: () => import('@/components/notice/api/TicketAddressList.vue')
        },
        {
          path: 'AddressAddDelete',
          name: 'AddressAddDelete',
          component: () => import('@/components/notice/api/AddressAddDelete.vue')
        },
        {
          path: 'ProcessingCurrency',
          name: 'ProcessingCurrency',
          component: () => import('@/components/notice/api/ProcessingCurrency.vue')
        },
        {
          path: 'ErrorCode',
          name: 'ErrorCode',
          component: () => import('@/components/notice/api/ErrorCode.vue')
        },
        {
          path: 'CommonProblem',
          name: 'CommonProblem',
          component: () => import('@/components/notice/api/CommonProblem.vue')
        },
        {
          path: 'HistoricalDetailsMerger',
          name: 'HistoricalDetailsMerger',
          component: () => import('@/components/notice/api/HistoricalDetailsMerger.vue')
        },
        {
          path: 'USDT-real-time',
          name: 'USDT-real-time',
          component: () => import('@/components/notice/api/USDT-real-time.vue')
        },
        {
          path: 'Buy-sell-bills',
          name: 'Buy-sell-bills',
          component: () => import('@/components/notice/api/Buy-sell-bills.vue')
        },
        {
          path: 'GetThePrice',
          name: 'GetThePrice',
          component: () => import('@/components/notice/api/GetThePrice.vue')
        },
        {
          path: 'Buy-sell-widthdraw',
          name: 'Buy-sell-widthdraw',
          component: () => import('@/components/notice/api/Buy-sell-widthdraw.vue')
        },
        {
          path: 'MarkedPayment',
          name: 'MarkedPayment',
          component: () => import('@/components/notice/api/MarkedPayment.vue')
        },
        {
          path: 'ConfirmRelease',
          name: 'ConfirmRelease',
          component: () => import('@/components/notice/api/ConfirmRelease.vue')
        },
        {
          path: 'RevokeMerchant',
          name: 'RevokeMerchant',
          component: () => import('@/components/notice/api/RevokeMerchant.vue')
        },
        {
          path: 'ListPaymentMethods',
          name: 'ListPaymentMethods',
          component: () => import('@/components/notice/api/ListPaymentMethods.vue')
        },
        {
          path: 'SubmitAppeal',
          name: 'SubmitAppeal',
          component: () => import('@/components/notice/api/SubmitAppeal.vue')
        },
        {
          path: 'ViewListings',
          name: 'ViewListings',
          component: () => import('@/components/notice/api/ViewListings.vue')
        },
        {
          path: 'Order',
          name: 'Order',
          component: () => import('@/components/notice/api/Order.vue')
        },
        {
          path: 'CancelOrder',
          name: 'CancelOrder',
          component: () => import('@/components/notice/api/CancelOrder.vue')
        },
        {
          path: 'BecomeBbusiness',
          name: 'BecomeBbusiness',
          component: () => import('@/components/notice/api/BecomeBbusiness.vue')
        },
        {
          path: 'LegalCurrencyTrading',
          name: 'LegalCurrencyTrading',
          component: () => import('@/components/notice/api/LegalCurrencyTrading.vue')
        },
        {
          path: 'Buy-sell-list',
          name: 'Buy-sell-list',
          component: () => import('@/components/notice/api/Buy-sell-list.vue')
        },
        {
          path: 'OrderDetails',
          name: 'OrderDetails',
          component: () => import('@/components/notice/api/OrderDetails.vue')
        },
      ]
    },
    {
      path: 'apisetting',
      name: 'apisetting',
      component: () => import('@/components/notice/APISetting.vue')
    },
    {
      path: 'download',
      name: 'download',
      component: () => import('@/components/notice/download.vue')
    },
    {
      path: 'crowdFunding',
      name: 'crowdFunding',
      component: () => import('@/components/crowdFunding/crowdFunding.vue')
    }, //众筹
    {
      path: 'crowdFundRecord',
      name: 'crowdFundRecord',
      component: () => import('@/components/crowdFunding/crowdFundRecord.vue')
    }, //众筹记录
    {
      path: 'hub3d',
      name: 'hub3d',
      component: () => import('@/components/hub3d/index.vue')
    }, //hub3d
    {
      path: 'hub3drecord',
      name: 'hub3d',
      component: () => import('@/components/hub3d/record.vue')
    }, //hub3d记录
  ]
};
export const loginpage = { //登录
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import('@/components/login.vue')
};
export const registerpage = { //注册
  path: '/register',
  name: 'register',
  meta: {
    title: '注册'
  },
  component: () => import('@/components/register.vue')
};
export const forgetpwdpage = { //忘记密码
  path: '/forgetpwd',
  name: 'forgetpwd',
  meta: {
    title: '忘记密码'
  },
  component: () => import('@/components/forget.vue')
};

export const adminset = { //忘记密码
  path: '/adminset',
  name: 'adminset',
  meta: {
    title: '设置'
  },
  component: () => import('@/components/adminset.vue')
};

export const errorpage = { //error
  path: '/error',
  name: 'error',
  meta: {
    title: '浏览器版本低'
  },
  component: () => import('@/components/error.vue')
};
// export const page404 = {
//     path: '/error', 
//     name: 'error',
//     meta: {
//         title: '浏览器版本过低'
//     }, 
//     component: () => import('@/components/error.vue')
// };

// export const page403 = {
//     path: '/403',
//     meta: {
//         title: '403-权限不足'
//     },
//     name: 'error-403',
//     component: () => import('@//views/error-page/403.vue')
// };

// export const page500 = {
//     path: '/500',
//     meta: {
//         title: '500-服务端错误'
//     },
//     name: 'error-500',
//     component: () => import('@/views/error-page/500.vue')
// };

// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: () => import('@/views/form/article-publish/preview.vue')
// };
const routers = [
  otherRouter,
  loginpage,
  registerpage,
  forgetpwdpage,
  errorpage,
  adminset, //前台设置
];

// 所有上面定义的路由都要写在下面的routers里
export default routers;
