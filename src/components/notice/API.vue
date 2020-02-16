<style lang=less>
@import "../../assets/public.less";
@import "./api.less";
</style>
<template>
  <div class="api_wrapper">
    <el-menu
      :default-active="actives"
      :unique-opened="true"
      :router="false"
      @select="changeRouter"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>{{ $t('apiInfo.titles[0]') }}</span> <!-- 入门 -->
        </template>
          <el-menu-item index="Introduce">{{ $t('apiInfo.list[0]') }}</el-menu-item> <!-- API介绍 -->
          <el-menu-item index="InterfaceSpecification">{{ $t('apiInfo.list1[0]') }}</el-menu-item> <!-- API接口说明 -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>Rest API</span>
        </template>
          <el-menu-item index="ResetApi">Rest API</el-menu-item>
          <el-menu-item index="SampleCode">{{ $t('apiInfo.titles[1]') }}</el-menu-item> <!-- 示例代码 -->
          <el-menu-item index="AccessRestriction">{{ $t('apiInfo.titles[2]') }}</el-menu-item> <!-- 访问限制 -->
      </el-submenu>

      <!-- <el-menu-item index="Configure">
        <span slot="title">配置</span>
      </el-menu-item> -->

      <!-- <el-submenu index="4">
        <template slot="title">
          <span>登录</span>
        </template>
          <el-menu-item index="RegisterApi">注册</el-menu-item>
          <el-menu-item index="LoginApi">登录</el-menu-item>
          <el-menu-item index="MailboxCode">发送邮箱验证码</el-menu-item>
          <el-menu-item index="MessageCode">发送短信验证码</el-menu-item>
      </el-submenu> -->

      <el-submenu index="5">
        <template slot="title">
          <span>{{ $t('apiInfo.titles[3]') }}</span> <!-- 行情 -->
        </template>
          <el-menu-item index="AllTicker">{{ $t('apiInfo.titles[4]') }}</el-menu-item> <!-- 深度 -->
          <el-menu-item index="Ticker">{{ $t('apiInfo.titles[5]') }}</el-menu-item> <!-- 盘口 -->
          <el-menu-item index="RealTransaction">{{ $t('apiInfo.titles[6]') }}</el-menu-item> <!-- 实时成交 -->
          <el-menu-item index="RealPrice">{{ $t('apiInfo.titles[7]') }}</el-menu-item> <!-- 实时价格 -->
          <!-- <el-menu-item index="AppBanner">app banner</el-menu-item> -->
          <el-menu-item index="HomeMarketList">{{ $t('apiInfo.titles[8]') }}</el-menu-item> <!-- 首页行情列表 -->
          <el-menu-item index="KLine">{{ $t('apiInfo.titles[9]') }}</el-menu-item> <!-- K线 -->
      </el-submenu>

      <!-- <el-submenu index="6">
        <template slot="title">
          <span>我的</span>
        </template>
          <el-menu-item index="UserInfo">用户信息</el-menu-item>
          <el-menu-item index="ResetLoginPassword">重置登录密码</el-menu-item>
          <el-menu-item index="ReplacementFundCode">重置资金密码</el-menu-item>
          <el-menu-item index="ForgetPassword">忘记密码</el-menu-item>
          <el-menu-item index="BindMailbox">绑定邮箱</el-menu-item>
      </el-submenu> -->

      <!-- <el-submenu index="7">
        <template slot="title">
          <span>平台</span>
        </template>
          <el-menu-item index="AnnouncementList">公告列表</el-menu-item>
          <el-menu-item index="AnnouncementDetails">公告详情</el-menu-item>
      </el-submenu> -->

      <el-submenu index="8">
        <template slot="title">
          <span>{{ $t('apiInfo.titles1[0]') }}</span> <!-- 融资理财 -->
        </template>
          <el-menu-item index="AccountTransfer">{{ $t('apiInfo.titles1[1]') }}</el-menu-item> <!-- 交易、理财账户划转 -->
          <el-menu-item index="TransferRecord">{{ $t('apiInfo.titles1[2]') }}</el-menu-item> <!-- 划转记录 -->
          <el-menu-item index="MortgageInformation">{{ $t('apiInfo.titles1[3]') }}</el-menu-item> <!-- 获取抵押币信息 -->
          <el-menu-item index="BorrowedCurrency">{{ $t('apiInfo.titles1[4]') }}</el-menu-item> <!-- 获取借入币信息 -->
          <el-menu-item index="MortgageLoan">{{ $t('apiInfo.titles1[5]') }}</el-menu-item> <!-- 抵押借款 -->
          <el-menu-item index="Repayment">{{ $t('apiInfo.titles1[6]') }}</el-menu-item> <!-- 还款 -->
          <el-menu-item index="MortgageRecord">{{ $t('apiInfo.titles1[7]') }}</el-menu-item> <!-- 抵押记录 -->
          <el-menu-item index="CurrencyManagement">{{ $t('apiInfo.titles2[0]') }}</el-menu-item> <!-- 理财币种列表 -->
          <el-menu-item index="FinancialAccount">{{ $t('apiInfo.titles2[1]') }}</el-menu-item> <!-- 理财账户 -->
          <el-menu-item index="FinancialStatistics">{{ $t('apiInfo.titles2[2]') }}</el-menu-item> <!-- 理财统计 -->
          <el-menu-item index="FinancialStatement">{{ $t('apiInfo.titles2[3]') }}</el-menu-item> <!-- 理财挂单 -->
          <el-menu-item index="FinancialRedemption">{{ $t('apiInfo.titles2[4]') }}</el-menu-item> <!-- 理财赎回 -->
          <el-menu-item index="FinancialRecords">{{ $t('apiInfo.titles2[5]') }}</el-menu-item> <!-- 理财记录 -->
          <el-menu-item index="MarginCall">{{ $t('apiInfo.titles2[6]') }}</el-menu-item> <!-- 抵押借贷补仓 -->
          <el-menu-item index="LendingRules">{{ $t('apiInfo.titles2[7]') }}</el-menu-item> <!-- 抵押借贷规则 -->
          <el-menu-item index="RedemptionPopUp">{{ $t('apiInfo.titles2[8]') }}</el-menu-item> <!-- 借款、理财赎回弹窗 -->
          <el-menu-item index="ListMortgage">{{ $t('apiInfo.titles3[0]') }}</el-menu-item> <!-- 可抵押币种列表 -->
          <el-menu-item index="CreditRate">{{ $t('apiInfo.titles3[1]') }}</el-menu-item> <!-- 抵押借贷费率表 -->
          <el-menu-item index="MortgageloanReplenishment">{{ $t('apiInfo.titles3[2]') }}</el-menu-item> <!-- 抵押借款补仓页面 -->
          <el-menu-item index="LoanStatistics">{{ $t('apiInfo.titles3[3]') }}</el-menu-item> <!-- 抵押借贷统计 -->
          <el-menu-item index="DaysMortgage">{{ $t('apiInfo.titles3[4]') }}</el-menu-item> <!-- 抵押天数 -->
      </el-submenu>

      <el-submenu index="9">
        <template slot="title">
          <span>{{ $t('apiInfo.datalist7[0]') }}</span> <!-- 法币交易 -->
        </template>
          <el-menu-item index="HistoricalDetailsMerger">{{ $t('apiInfo.datalist7[1]') }}</el-menu-item> <!-- 历史明细—合并 -->
          <el-menu-item index="USDT-real-time">{{ $t('apiInfo.datalist7[2]') }}</el-menu-item> <!-- USDT实时余额 -->
          <el-menu-item index="Buy-sell-bills">{{ $t('apiInfo.datalist7[3]') }}</el-menu-item> <!-- 求购/出售 发单 -->
          <el-menu-item index="GetThePrice">{{ $t('apiInfo.datalist7[4]') }}</el-menu-item> <!-- 获取价格 -->
          <el-menu-item index="Buy-sell-widthdraw">{{ $t('apiInfo.datalist7[5]') }}</el-menu-item> <!-- 求购/售出 撤单 -->
          <el-menu-item index="MarkedPayment">{{ $t('apiInfo.datalist7[6]') }}</el-menu-item> <!-- 标记已付款 -->
          <el-menu-item index="ConfirmRelease">{{ $t('apiInfo.datalist7[7]') }}</el-menu-item> <!-- 确认放行 -->
          <el-menu-item index="RevokeMerchant">{{ $t('apiInfo.datalist7[8]') }}</el-menu-item> <!-- 撤销商家 -->
          <el-menu-item index="ListPaymentMethods">{{ $t('apiInfo.datalist7[9]') }}</el-menu-item> <!-- 支付方式列表 -->
          <el-menu-item index="SubmitAppeal">{{ $t('apiInfo.datalist7[10]') }}</el-menu-item> <!-- 提交申诉 -->
          <el-menu-item index="ViewListings">{{ $t('apiInfo.datalist7[11]') }}</el-menu-item> <!-- 查看商家信息 -->
          <el-menu-item index="Order">{{ $t('apiInfo.datalist10[0]') }}</el-menu-item> <!-- 下单 -->
          <el-menu-item index="CancelOrder">{{ $t('apiInfo.datalist10[1]') }}</el-menu-item> <!-- 取消订单 -->
          <el-menu-item index="BecomeBbusiness">{{ $t('apiInfo.datalist10[2]') }}</el-menu-item> <!-- 成为商家 -->
          <el-menu-item index="LegalCurrencyTrading">{{ $t('apiInfo.datalist10[3]') }}</el-menu-item> <!-- 法币交易大厅 -->
          <el-menu-item index="Buy-sell-list">{{ $t('apiInfo.datalist10[4]') }}</el-menu-item> <!-- 求购/售出 列表 -->
          <el-menu-item index="OrderDetails">{{ $t('apiInfo.datalist10[5]') }}</el-menu-item> <!-- 订单详情 -->
      </el-submenu>

      <el-submenu index="10">
        <template slot="title">
          <span>{{ $t('apiInfo.titles3[5]') }}</span> <!-- 币币交易 -->
        </template>
          <el-menu-item index="CurrencyAmount">{{ $t('apiInfo.titles3[6]') }}</el-menu-item> <!-- 获取我的币种金额 -->
          <el-menu-item index="CurrencyList">{{ $t('apiInfo.titles4[0]') }}</el-menu-item> <!-- 币种列表 -->
          <el-menu-item index="CurrencyDetails">{{ $t('apiInfo.titles4[1]') }}</el-menu-item> <!-- 币种详情 -->
          <el-menu-item index="RealData">{{ $t('apiInfo.titles4[2]') }}</el-menu-item> <!-- 实时数据 -->
          <el-menu-item index="DetailsEachCurrency">{{ $t('apiInfo.titles4[3]') }}</el-menu-item> <!-- 各币种详情 -->
          <el-menu-item index="CurrencyTrading">{{ $t('apiInfo.titles3[5]') }}</el-menu-item> <!-- 币币交易 -->
          <el-menu-item index="TransactionRecord">{{ $t('apiInfo.titles4[4]') }}</el-menu-item> <!-- 交易记录 -->
          <el-menu-item index="CurrencyInformation">{{ $t('apiInfo.titles4[5]') }}</el-menu-item> <!-- 币种信息接口 -->
          <el-menu-item index="CommissionWithdrawal">{{ $t('apiInfo.titles4[6]') }}</el-menu-item> <!-- 委托撤单 -->
      </el-submenu>

      <el-submenu index="11">
        <template slot="title">
          <span>{{ $t('apiInfo.titles4[7]') }}</span> <!-- 充/提币 -->
        </template>
          <el-menu-item index="RechargePage">{{ $t('apiInfo.titles4[8]') }}</el-menu-item> <!-- 充值页面 -->
          <el-menu-item index="FillingWithdrawalRecords">{{ $t('apiInfo.titles4[9]') }}</el-menu-item> <!-- 充币、提币记录 -->
          <el-menu-item index="WithdrawMoney">{{ $t('apiInfo.titles5[0]') }}</el-menu-item> <!-- 提币 -->
          <el-menu-item index="WithdrawalOfCurrency">{{ $t('apiInfo.titles5[1]') }}</el-menu-item> <!-- 提币撤销 -->
          <el-menu-item index="TicketAddressList">{{ $t('apiInfo.titles5[2]') }}</el-menu-item> <!-- 提币地址列表 -->
          <el-menu-item index="AddressAddDelete">{{ $t('apiInfo.titles5[3]') }}</el-menu-item> <!-- 提币地址添加删除 -->
          <el-menu-item index="ProcessingCurrency">{{ $t('apiInfo.titles5[4]') }}</el-menu-item> <!-- 提币手续费 -->
      </el-submenu>

      <el-menu-item index="ErrorCode">
        <span slot="title">{{ $t('apiInfo.titles5[5]') }}</span> <!-- 错误代码 -->
      </el-menu-item>

      <el-menu-item index="CommonProblem">
        <span slot="title">{{ $t('apiInfo.titles5[6]') }}</span> <!-- 常见问题 -->
      </el-menu-item>

    </el-menu>

    <div class="api_content">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        actives: 'Introduce'
    };
  },
  methods: {
    changeRouter(name) {
        this.$router.push({
            path: name
        });
    }
  },
  mounted() {
    this.actives = this.$route.name;
  }
};
</script>