import Axios from 'axios'; //引入axios
import qs from 'qs';	//引入axios数据处理
import VueCookies from 'vue-cookies';  //引入cookies插件
import Public from './public.js' //加载公用js方法文件
// Axios.defaults.timeout = 10000;
//Axios.defaults.headers.post['Content-Type'] = '';   //配置请求头
// axios.defaults.baseURL = 'http://spsj.xn62x.cn';   //配置接口地址
// axios.defaults.baseURL = 'http://192.168.1.100';   //配置接口地址
//Axios.defaults.headers.common['token'] = token;
//Axios.defaults.headers.common['account'] = account;

// 添加一个响应拦截器
Axios.interceptors.request.use((config) => {
	let account =  sessionStorage.account;
  let token = sessionStorage.token;
  let locale = ''
  // let locale = VueCookies.get('language') =='Chinese' ? 'zh-CN' : 'en'
  if(VueCookies.get('language') == 'Chinese'){
    locale = 'zh'
  }else if(VueCookies.get('language') == 'English'){
    locale = 'en'
  }else{
    locale = 'ft'
  }
  
  if (token) {
    config.headers['token'] = token;
    config.headers['Authorization'] = 'Bearer' + ' ' + token;
  }
	
  config.headers['Accept'] =  'application/json';
  config.headers['Lang'] =  locale;
  config.headers['From'] =  'pc';
  

  //在发送请求之前做某件事
  // 判断是否登录
  	// let cur_id = "cur_id",
    // 	  sign = "sign";
   //  if (!cur_id||!sign) {
   //    localStorage.clear();
   //    window.location.href = "index.html";
   //  };
   if (config.url == Axios.applicationCoin){
    config.headers['Accept'] =  'application/x-www-form-urlencoded';
   }else{
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
        // config.data = config.data+"&account=" + account;
    }
   }
    if(config.method  === 'get'){
      // config.params.account = account;
    }
    return config;
},(error) =>{
     _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

// 添加返回信息验证
Axios.interceptors.response.use(function (response) {
  if(response.data.code =='401'){
    sessionStorage.clear()
    // alert('请登录')
    window.location.href = "/#/login";
    return ;
  }
    if(response.data.code =='505' || response.data.code =='404'){
    	if(!sessionStorage.account){
    		return false;
    	}
      sessionStorage.clear();
    	window.location.href = "/login";
    };
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

let secondlogin = "https://www.00886gf.com/"; 
let basess = 'http://lacoin.oss-cn-hongkong.aliyuncs.com';
// let second = "http://www.mobidiex.com";
let second = process.env.NODE_ENV === 'production' ? 'https://' + window.location.host : '/apid';

// let second = "http://"+ 'api.gicgold.in';

// let Mainwsurl = "ws://"+window.location.host+":7272"; 
let Mainwsurl = "ws://www.mobidiex.com:7272"; 
// let Secondwsurl = "ws://"+window.location.host;
let Secondwsurl = "ws://www.mobidiex.com";
// 接口地址
Axios.onLine = secondlogin;
Axios.basess = `${basess}/`;
Axios.bases = `${second}/`;
// Axios.getNewInfo = `${second}/sexp/stock/getNewInfo`; 
Axios.get_area = `${second}/api/user/areacode`;  //获取区号
Axios.login_record = `${second}/api/user/loginHistory`;  //登录日志
Axios.download_link = `${second}/api/software/downloadLink`;  //下载地址
Axios.my_reward = `${second}/api/user/myreward`;  //我的奖励
Axios.recommend_info = `${second}/api/user/recommendInfo`;  //我的推广
Axios.my_team = `${second}/api/user/recommends`;  //我的团队
Axios.commission_etails = `${second}/api/user/commissionDetails`;  // 获得佣金
Axios.send_sms = `${second}/api/user/sendSms`;  //短信验证码  1注册 2 重置 3 安全验证 4 支付密码设置 5 提币 mobile ,type
Axios.send_email = `${second}/api/user/sendEmail`;  //邮箱验证码  1注册 2 重置 3 安全验证 4 支付密码设置 5 提币 mobile ,type
Axios.register = `${second}/Home/Qbw/register`;  //注册
Axios.addOptional = `${second}/api/addOptional`;  //添加自选
Axios.optionalList = `${second}/api/optionalList`;  //自选列表
Axios.optionalDel = `${second}//api/optionalDel`;  //删除自选


// Axios.user_login = `${secondlogin}/home/qbw/user_login`; //登录  mobile	opwd	verify
Axios.user_login = `${second}/Home/Qbw/user_login`; //登录  mobile	opwd	verify
Axios.auth_code = `${second}/home/qbw/auth_code`; //图片验证码
// Axios.auth_code = `${secondlogin}/home/qbw/auth_code`; //图片验证码
Axios.reset_opwd = `${second}/home/qbw/reset_opwd`; //重置登录密码   y_opwd opwd  opwd1

Axios.link = `${second}/Home/Qbw/link`;  //推广海报  account 

Axios.helpCenter = `${second}/home/qbw/FAQ`;  //帮助中心
Axios.articleList = `${second}/home/qbw/get_more`;  // 文章列表
Axios.articleDetails = `${second}/home/qbw/get_detail`;  // 文章详情
Axios.sellRequest = `${second}/home/qbw/u_msg`;  // 提交请求
Axios.searchData = `${second}/home/qbw/search`;  // 搜索
Axios.ziChan = `${second}/Home/Qbw/get_asset`;  // 资产列表
Axios.liCai = `${second}/Home/borrow/borrow_asset`;  // 理财列表
Axios.currencyList = `${second}/home/qbw/account_list`;  // 币种列表
Axios.zichanTransfer = `${second}/Home/Borrow/transfer`;  // 资产划转
Axios.transferRecord = `${second}/Home/Borrow/get_transfer_record`;  // 划转记录
Axios.caiWu = `${second}/home/qbw/caiwu`;  // 财务记录
Axios.moneyDeal = `${second}/api/recharge/index`;  // 充币提币-type,cash/recharge,默认recharge
Axios.rotationList = `${second}/api/asset/rotationList`;  // 划转记录
Axios.addrList = `${second}/home/qbw/AddrList`;  // 提币地址列表
Axios.deltAddre = `${second}/api/applyWithdraw/deleteWithdrawAddress`;  // 添加、删除提币地址
Axios.addAddre = `${second}/api/applyWithdraw/createWithdrawAddress`;  // 添加、删除提币地址
Axios.goPay = `${second}/home/Order/chongzhi`;  // 账户充值 
Axios.goBit = `${second}/Home/Order/ti_bi`;  // 账户提币
// Axios.weiTuo = `${second}/home/order/weituo`;  // 委托
Axios.zixunList = `${second}/home/qbw/zixun`;  // BFEX资讯列表
Axios.zixunDetails = `${second}/home/qbw/zixun_detail`;  // BFEX资讯详情
Axios.fbOrder = `${second}/home/qbw/getFbMx`;  // 法币交易->订单
Axios.get_lever = `${second}/home/api/get_lever`;  // 杠杆交易获取杠杆信息
Axios.getFbMx_pmma = `${second}/home/qbw/getFbMx_pmma`;  // 法币交易->购买
Axios.getFbMx_sell = `${second}/home/qbw/getFbMx_sell`;  // 法币交易->出售
// Axios.bbOrder = `${second}/index.php/Home/Trade/tranlist`;  // 币币交易->订单
Axios.dealCancel = `${second}/api/BbTrade/cancel`;  // 币币交易->撤单
Axios.getPro = `${second}/index.php/Home/Trade/get_pro`;  // 获取币种信息
Axios.agreeMent = `${second}/home/qbw/agree`;  // 获取协议信息(协议、条款、说明)
Axios.create_order = `${second}/api/FbTrade/createOrder`;  // 法币交易下单
Axios.orderDetail = `${second}/api/FbTrade/orderDetail`;  // 法币订单买方详细
Axios.MyorderDetail = `${second}/home/qbw/MyorderDetail`;  // 法币订单卖方详细
Axios.getMx = `${second}/api/FbTrade/getMx`;  // 法币 明细
Axios.setOrderStatus = `${second}/api/FbTrade/setOrderStatus`;  // 标记已付款
Axios.post_allege = `${second}/api/FbTrade/postaAllege`;  // 提交申诉
Axios.re_order = `${second}/api/FbTrade/revOrder`;  // 法币取消订单
Axios.add_order = `${second}/index.php/Home/Order/add_order`;  // 杠杆交易下单
Axios.cancellations = `${second}/index.php/Home/Order/cancellations`;  // 杠杆交易-订单-委托撤销
Axios.pingcang = `${second}/index.php/Home/Order/pingcang`;  // 杠杆交易-订单-手动平仓
Axios.chengjiao = `${second}/index.php/Home/Order/chengjiao`;  // 杠杆交易-订单-成交记录
Axios.weituo = `${second}/index.php/Home/Order/weituo`;  // 杠杆交易-订单-委托记录
Axios.chicang = `${second}/index.php/Home/Order/chicang`;  // 杠杆交易-订单-持仓记录  
Axios.publicData = `${second}/home/qbw/serviceData`;  // footer邮箱地址
Axios.set_poit = `${second}/Home/Order/set_poit`;  //设置止盈止损
Axios.transfer = `${second}/Home/Users/Transfer`;  //站内转账
Axios.get_balance = `${second}/Home/Users/get_balance`;  //查看余额
Axios.Record_Transfer = `${second}/Home/Users/Record_Transfer`; //转账流水
Axios.all_ping = `${second}/Home/Order/all_ping`;
Axios.tongji = `${second}/Home/Order/tongji`;  //订单信息统计

//Fbtrans
Axios.user_info = `${second}/api/user/details`;  //账户安全 基本信息
Axios.xiugai_pwd = `${second}/Home/qbw/xiugai_pwd`;  //修改登录密码 account	oldpwd	opwd	opwd1
Axios.binding_email = `${second}/api/user/emailBind`;  //绑定邮箱
Axios.binding_mobile = `${second}/api/user/phoneBind`;  //设置手机号
Axios.reset_tpwd = `${second}/home/qbw/reset_tpwd`;  //修改资金密码
Axios.user_aq = `${second}/home/qbw/user_aq`;   //登录历史安全历史接口

Axios.SecondwsUrl = `${Secondwsurl}:7272/`;   //创新区长链接
// Axios.MainwsUrl = "ws://www.mobidiex.com:7272";  //主要数据推送


// Axios.MainwsUrl = "ws://"+"113.52.135.113"+":7272";  //主要数据推送
// Axios.SecondSalewsUrl = "ws://"+"113.52.135.113"+":7273";   //买卖价格推送(hub)http://www.bituneex.com
// Axios.RealTime = "ws://"+"113.52.135.113"+":7275";   //买卖价格推送(hub)
// 7272实时价格  7273盘口  7274深度图  7275实时成交
Axios.MainwsUrl = process.env.NODE_ENV === 'production' ? "wss://"+ 'gicgold.in/' + 'wss': "wss://"+"www.billumpro.com/wss";

Axios.SecondSalewsUrl = process.env.NODE_ENV === 'production' ? "ws://"+window.location.host+":7273" : "ws://"+"www.billumpro.com"+":7273";
Axios.RealTime = process.env.NODE_ENV === 'production' ? "ws://"+window.location.host+":7275" : "ws://"+"www.billumpro.com"+":7275";


// Axios.MainwsUrl = "ws://"+window.location.host+":7272";  //主要数据推送
// Axios.RealTime = "ws://"+window.location.host+":7275";  //买卖价格推送(hub)
// Axios.SecondSalewsUrl = "ws://"+window.location.host+":7273";   //买卖价格推送(hub)


// Axios.SecondSalewsUrl = "ws://www.mobidiex.com:7273";   //买卖价格推送(hub)
// Axios.Fm3dwsurl = "ws://7.comhub.vip";   //Fm3d长链接

Axios.getNewInfo = `${second}/api/getPro`;   //五大币API
Axios.crowd = `${second}/home/api/crowd`;   //创新币种API
Axios.trading = `${second}/api/FbTrade/trading`;   //出售/购买广告
Axios.get_info = `${second}/home/qbw/get_info`;   //币种信息
// Axios.tranlist = `${second}/api/BbTrade/tranList`;   //币币交易记录
Axios.tranlistDetail = `${second}/api/BbTrade/tranLists`;   //币币交易记录 交易明细
Axios.bbtran = `${second}/api/BbTrade/trans`;   //币币交易


Axios.pay_list = `${second}/api/FbTrade/payList`;   //支付方式列表
Axios.pay_edit = `${second}/home/qbw/pay_edit`;   //支付方式编辑页数据
Axios.pay_add = `${second}/home/qbw/pay_add`;   //添加/编辑提交 支付方式
Axios.set_pay_status = `${second}/home/qbw/set_pay_status`;   //改变支付方式状态
Axios.upload = `${second}/upload.php`;   //图片上传
Axios.set_sm = `${second}/home/qbw/set_sm`;   //设置实名初级
Axios.set_img = `${second}/home/qbw/set_img`;   //高级认证

Axios.add_shop = `${second}/api/FbTrade/addShop`;   //成为商家
Axios.pmma = `${second}/api/FbTrade/pmmaOrder`;   //求购/出售 发单
Axios.pmmaList = `${second}/api/FbTrade/pmmaList`;   //求购/售出 列表
Axios.pmmaRev = `${second}/api/FbTrade/pmmaRev`;   //求购/售出 撤单
Axios.cat_shopinfo = `${second}/home/Fbtrans/cat_shopinfo`; //查看商家信息
Axios.agree = `${second}/home/Ajax/get_web_agree`;  //用户协议
Axios.confirm = `${second}/api/FbTrade/confirm`; //确认放行
Axios.del_shop = `${second}/api/FbTrade/delShop` ;  //取消商家
Axios.bk_list = `${second}/home/Broker/bk_list` ;  //经纪人信息
Axios.bk_applay = `${second}/Home/Broker/bk_apply`; //经纪人申请
Axios.bk_info = `${second}/Home/Broker/bk_info`; //经纪人申请
Axios.get_price = `${second}/Home/Fbtrans/get_price`; //获得价格
Axios.re_asset = `${second}/Home/qbw/re_asset`; //个人流水
Axios.transrecord = `${second}/Home/lend/get_transrecord`; //理财记录
Axios.get_tb = `${second}/Home/api/get_tb`; // 提币限制条件
Axios.getMast = `${second}/api/getMast`; // 提币限制条件

//基金接口
Axios.index = `${second}/home/Fund/index`;  //头部数据
Axios.fundlist = `${second}/home/Fund/fundlist`; //主页及分红页面
Axios.bflist = `${second}/home/Fund/bflist`; // 资金明细
Axios.mininglist = `${second}/home/Fund/mininglist`; // 挖矿明细

// 众筹
Axios.recindex = `${second}/Home/Recognize/recindex`; // 众筹列表
Axios.dorec = `${second}/Home/Recognize/dorec`; // 认筹提交
Axios.reclist = `${second}/Home/Recognize/reclist`; // 众筹列表

Axios.transform = `${second}/home/Fund/transform`; // 余额划转
//底部信息接口
Axios.public_data = `${second}/home/qbw/serviceData`;
Axios.agree = `${second}/home/Ajax/get_web_agree`;  //用户协议
Axios.createGoogleCommand = `${second}/home/google/createGoogleCommand`;//开启谷歌身份验证
Axios.checkGoogleCommand = `${second}/home/google/checkGoogleCommand`;//绑定谷歌验证
Axios.set_google_state = `${second}/home/google/set_google_state`;//设置谷歌开关
Axios.check_google_code = `${second}/home/google/check_google_code`;//登录谷歌验证
Axios.RealTimeDeal = `${second}/api/RealTimeDeal`;//币币实时成交

Axios.yaoqing = `${second}/home/ajax/yaoqing`;//默认邀请码


//币种兑换接口

Axios.thisCoinList = `${second}/home/exchange/thisCoinList`;  //查询交易单据状态接口
Axios.exchange = `${second}/home/exchange/exchange`;  //兑换
Axios.ex_list = `${second}/home/Exchange/ex_list`;//兑换列表

Axios.video = `${second}/Home/qbw/video`; //新手指导
Axios.bps = `${second}/Home/ajax/bookData`; //白皮书

// fm3d
Axios.dataList = `${second}/fm3d/Public/dataList`; // 全部数据
Axios.rewardToAccount = `${second}/fm3d/Trans/rewardToAccount`; // 提现
Axios.rewardBuySeed = `${second}/fm3d/Trans/rewardBuySeed`; // 分红购买
Axios.buySeed = `${second}/fm3d/Trans/buySeed`; // 购买种子
Axios.transList = `${second}/fm3d/Trans/transList`; // 交易列表 
Axios.getArticle = `${second}/fm3d/public/getArticle`; // fm3d公告列表 
Axios.gameHasOver = `${second}/fm3d/public/gameHasOver`; // 查询结束游戏的详情

//弹屏
Axios.public_alert = `${second}/home/api/public_data`; // 查询结束游戏的详情

// 新接口
Axios.set_renzheng = `${second}/home/qbw/set_renzheng`;   //实名认证
Axios.find_opwd = `${second}/Home/Qbw/find_opwd`; //忘记登录密码   mobile opwd  opwd1 code
Axios.ggList = `${second}/api/resource/article`; //公告列表 page size
Axios.ggDetail = `${second}/api/resource/articleDetail`; //公告详情 page size
Axios.zxList = `${second}/api/resource/blocksMsg`; //资讯列表
Axios.zxDetail = `${second}/api/resource/msgDetail`; //公告详情 id
Axios.getBanner = `${second}/Home/Sign/bannerfind`; //首页轮播图
Axios.lend_coin_list = `${second}/Home/lend/lend_coin_list`; // 理财币种
Axios.lend_blend = `${second}/Home/lend/blend`; // 理财统计
Axios.myFriend = `${second}/Home/qbw/my_down`; // 我的推广-我的好友
Axios.commission = `${second}/Home/qbw/tjreward_list`; // 我的推广-获得佣金
Axios.moneyAddres = `${second}/api/applyWithdraw/getWithdrawAddress`; // 提币钱包地址列表
Axios.zichanTB = `${second}/api/applyWithdraw/applyWithdraw`; // 资产提币
Axios.zichanTBService = `${second}/home/users/get_sxfee`; // 资产提币手续费
Axios.mortgageRecord = `${second}/Home/Borrow/get_transrecord`; // 抵押记录
Axios.coinsList = `${second}/home/qbw/coins_list`; // 可抵押币种列表
Axios.mortgageLoan = `${second}/Home/Borrow/borrow_add`; // 抵押借款
Axios.mortgageInfo = `${second}/Home/borrow/mortgage_info`; // 获取抵押币信息
Axios.borrowedInfo = `${second}/Home/borrow/borrow_info`; // 获取借入币信息
Axios.financialStatement = `${second}/Home/lend/lend_add`; // 理财挂单
Axios.financialBack= `${second}/Home/lend/pay_back`; // 理财赎回
Axios.financialBackBreak= `${second}/home/borrow/bpayback`; // 理财赎回违约金弹窗
Axios.mortgageLending= `${second}/home/borrow/get_borrow_rate`; // 抵押借贷费率表
Axios.rechargePay= `${second}/api/recharge/create`; // 充值
Axios.borrowPayBack= `${second}/Home/Borrow/payback`; // 还款
Axios.borrowRule= `${second}/home/borrow/get_borrow_rule`; // 抵押借贷规则
Axios.tibiWithdraw= `${second}/Home/Users/cancle_tibi`; // 提币撤销
Axios.mortgageRate= `${second}/home/borrow/get_fine_rate`; // 抵押借款违约金率
Axios.mortgageRate= `${second}/home/borrow/get_fine_rate`; // 抵押借款违约金率
Axios.addSecret= `${second}/home/api/secret_add`; // 创建秘钥
Axios.deleteSecret= `${second}/home/api/secret_del`; // 删除秘钥
Axios.secretList= `${second}/Home/api/secret_list`; // 秘钥列表
Axios.modifySecret= `${second}/home/api/secret_edit`; // 修改秘钥
Axios.secretInfo= `${second}/home/api/secret_detail`; // 秘钥详情
Axios.bucangAvailable= `${second}/home/borrow/bcover`; // 抵押借款补仓页面
Axios.mortgageLoanCover= `${second}/home/borrow/cover`; // 抵押借贷补仓
Axios.product= `${second}/api/resource/product`; // 获取提币币种列表


Axios.getAssets= `${second}/api/asset/assetInfo`; // 用户账户资产

Axios.getRotationWallet= `${second}/api/asset/getRotationWallet`; // 根据划转钱包类型得到允划转的钱包类型 
Axios.rotationWalltCoinList= `${second}/api/asset/rotationWalltCoinList`; // 根据划转钱包和选择的接收钱包 得到允许划转的币种列表
Axios.getWalltUsable= `${second}/api/asset/getWalltUsable`; // 根据划转钱包 币种 得到可用余额
Axios.rotation= `${second}/api/asset/rotation`; // 立即划转

Axios.getRechargeType= `${second}/api/recharge/getRechargeType`; // 充币类型
// Axios.checkBalance= `${second}/api/applyWithdraw/checkBalance`; // 余额
//登录注册

Axios.register = `${second}/api/user/register`  //注册
Axios.agreementcn = `${second}/api/softwrae/content?key=agreementcn` //注册协议
Axios.forgetPassword = `${second}/api/user/forgetPassword`  //忘记密码
Axios.sendSms = `${second}/api/user/sendSms` //验证码
Axios.details = `${second}/api/user/details` //获取用户信息
Axios.smsVerifyStart = `${second}/api/user/smsVerifyStart`  //开启关闭短信验证码
Axios.verifyPassword = `${second}/api/user/verifyPassword` //验证原密码是否正确
//安全中心
Axios.createPaymentPassword = `${second}/api/user/createPaymentPassword` //设置资金密码
Axios.create = `${second}/api/authentication/create` //身份认证
Axios.payAdd = `${second}/api/FbTrade/payAdd`  //添加支付方式
Axios.payList = `${second}/api/FbTrade/payList`  //获取支付方式列表
Axios.setPayStatus = `${second}/api/FbTrade/setPayStatus`  //支付方式开启关闭
Axios.commonData = `${second}/api/FbTrade/commonData` //公共数据
Axios.payEdit = `${second}/api/FbTrade/payEdit` //支付方式详情

Axios.createGoogleSecret = `${second}/api/user/createGoogleSecret` //获取谷歌秘钥
Axios.authenticatorBind = `${second}/api/user/authenticatorBind`  //绑定谷歌验证
Axios.googleVerifyStart = `${second}/api/user/googleVerifyStart`  //开启关闭谷歌验证
Axios.resetPassword = `${second}/api/user/resetPassword`//修改资金密码和登录密码
Axios.addShop = `${second}/api/FbTrade/addShop` //申请成为商家
Axios.delShop = `${second}/api/FbTrade/delShop`  //撤销商家认证

//超级平台数据
Axios.upgradeSuperUser = `${second}/api/upgrade/upgradeSuperUser`  //升级超级平台
Axios.info = `${second}/api/superUser/info`  //首页信息
Axios.dividendLog = `${second}/api/superUser/dividendLog`  //分红纪录
//福利区数据
Axios.welfareInfo = `${second}/api/participate/welfareInfo`  //首页信息
Axios.fuli = `${second}/api/participate/create`  //参与福利区
Axios.participateLog = `${second}/api/participate/participateLog` //参与纪录
Axios.fenhongLog = `${second}/api/participate/dividendLog` //分红记录
// Axios.assetInfo = `${second}/api/asset/assetInfo`  //获取可用usdt数量
//邀请返佣
Axios.registerLink = `${second}/api/user/registerLink`
Axios.promotionzt = `${second}/api/user/promotionzt` //直推,
Axios.promotionjt = `${second}/api/user/promotionjt` //间推
Axios.rewardLog = `${second}/api/rewardLog` //佣金
//空投区
Axios.kongtou = `${second}/api/kongtou/index`   //首页数据
Axios.billInfo = `${second}/api/kongtou/billInfo`  //列表数据
Axios.getCommunityRewardLogs = `${second}/api/kongtou/getCommunityRewardLogs`   //?code=SOP&page=1获取社区业绩
//帮助中心
Axios.aboutuscn = `${second}/api/softwrae/content`  //帮助中心数据
Axios.feedbackType = `${second}/api/resource/feedbackType` //获取问题类型列表
Axios.feedback = `${second}/api/resource/feedback` //发送问题反馈

let secrurl = "ws://www.18vt.net:6262";
// let secrurl = "ws://47.244.227.15:6262";
let runApi = 'http://www.ptmex.com';
 // 跑得快
Axios.secrurl = `${secrurl}/`;//推送
// Axios.secrurl2 = `${secrurl2}/`;//推送
Axios.order_escape_post = `${second}/api/Game/order_escape_post`;//手动逃跑
Axios.introduce = `${second}/api/Game/introduce`;//常见问题
Axios.record = `${second}/api/Game/record`;//战绩 
// Axios.currency = `${runApi}/home/Game/currency`;//币种信息
Axios.currency = `${second}/api/Game/currency`;//币种信息
// Axios.rotation = `${second}/api/asset/rotation` //跑得快划转 
Axios.billList = `${second}/api/Game/bill`  //账单流水

Axios.lottery = `${second}/api/Game/lottery`;//开奖历史
Axios.myquiz = `${second}/api/Game/myquiz`;//我的竞猜
Axios.leaderboard = `${second}/api/Game/leaderboard`;    //排行榜
Axios.Banker_pool = `${second}/api/Game/Banker_pool`;//庄家奖池—主页
Axios.bank_op_post = `${second}/api/Game/bank_op_post`;//庄家奖池—注入、提取
Axios.banker_history = `${second}/api/Game/banker_history`;//庄家奖池—历史
Axios.order_add_post = `${second}/api/Game/order_add_post`;//游戏下注
Axios.supply = `${runApi}/home/Game/supply`;   //游戏账户转入资金
Axios.obtain = `${runApi}/home/Game/obtain`;   //游戏账户转出资金
Axios.bill = `${runApi}/home/Game/bill`;   //游戏账户转出资金
Axios.common_data = `${second}/api/Game/common_data`;//基础公共数据
Axios.verification_hash = `${second}/api/Game/verification_hash`;//验证hash
Axios.get_game_list = `${second}/api/Game/get_game_list`;//币种资产列表

// 商城
Axios.cateList = `${second}/api/mallproduct/cateList`;//分类+轮播 
Axios.productList = `${second}/api/mallproduct/productList`;//分类下商品
Axios.orderAll = `${second}/api/mallorder/orderAll`;//订单列表
Axios.hotGoodsList = `${second}/api/mallproduct/hotGoodsList`//热门商品
Axios.goodsInfo = `${second}/api/mallproduct/goodsInfo` //商品详情?product_id=4
Axios.goodsSearch = `${second}/api/mallproduct/goodsSearch`//搜索商品  ?key_words=测试
Axios.shouhuo = `${second}/api/address/index` //获取收货地址
Axios.getDefaultAddress = `${second}/api/address/getDefaultAddress` //获取默认收货地址
Axios.add = `${second}/api/address/add` //添加收货地址
Axios.edit = `${second}/api/address/edit` //修改收货地址
Axios.orderReceive = `${second}/api/mallorder/orderReceive` //确认收货
Axios.orderGet = `${second}/api/mallorder/orderGet` //确认收货
Axios.orderInfo = `${second}/api/mallorder/orderInfo` //确认收货
Axios.setDefault = `${second}/api/address/setDefault` //设为默认
Axios.delAddress = `${second}/api/address/delAddress`  //删除收货地址
Axios.addressInfo = `${second}/api/address/addressInfo` //获取请收货地址?address_id=12
Axios.createLA = `${second}/api/mallorder/create` //创建订单
Axios.orderDelete = `${second}/api/mallorder/orderDelete` //订单删除
Axios.cancelOrder = `${second}/api/mallorder/cancelOrder` //订单取消
Axios.handlePay = `${second}/api/mallorder/handlePay`//订单支付

// 上币
Axios.applicationCoin = `${second}/api/applicationCoin`//上币

// GIC
Axios.slides = `${second}/api/software/slides`  //获取轮播
Axios.systemPosts = `${second}/api/software/systemPosts`  //获取公告
Axios.postsInfo = `${second}/api/software/postsInfo`  //公告详情
Axios.systemAgree = `${second}/api/software/systemAgree`  //获取协议


Axios.sendEmail = `${second}/api/user/sendEmail`  //获取邮箱验证码
Axios.gicregister = `${second}/api/user/register`  //注册
Axios.loginPre = `${second}/api/user/loginPre`   //登录前接口
Axios.login = `${second}/api/user/login`   //登录
Axios.logout= `${second}/api/user/logout`; // 退出登录


// 资产
Axios.assetInfo = `${second}/api/user/assetInfo`  //资产信息
Axios.asset_list = `${second}/api/user/assetlist`  // 充币提币币种列表
Axios.walletRecharge = `${second}/api/recharge/walletRecharge`  //用户钱包充值
Axios.createWithdrawAddress = `${second}/api/withdraw/createWithdrawAddress`  //添加提币地址
Axios.getWithdrawAddress= `${second}/api/withdraw/getWithdrawAddress`; // 提币地址列表
Axios.deleteWithdrawAddress= `${second}/api/withdraw/deleteWithdrawAddress`; // 删除提币地址

Axios.applyWithdraw= `${second}/api/withdraw/applyWithdraw`; // 用户提币

Axios.recharge_index= `${second}/api/recharge/index`; // 充币明细
Axios.withdrawLog= `${second}/api/withdraw/withdrawLog`; // 提币明细
Axios.userMoneyLog= `${second}/api/user/userMoneyLog`; // 资金明细

Axios.software_con= `${second}/api/software/content`; // 获取邮箱

Axios.checkBalance= `${second}/api/withdraw/checkBalance`; // 提币手续费

Axios.getDepth= `${second}/api/getDepth`; // 盘口数据

// GIC -币币交易
Axios.tranList= `${second}/api/BbTrade/tranList`; // 交易记录
Axios.getCodeBalance = `${second}/api/BbTrade/getCodeBalance`;   //获取个人币种资产
Axios.cancel_order = `${second}/api/BbTrade/cancel`;   //撤单
Axios.BbTrade_list = `${second}/api/BbTrade/getPro`;   //获取筛选列表

// GIC -ldfadd
Axios.primaryCertification = `${second}/api/authentication/primaryCertification`  //初级认证
Axios.advancedCertification = `${second}/api/authentication/advancedCertification`  //高级认证


Axios.resetPaymentPassword = `${second}/api/user/resetPaymentPassword`;   //修改资金密码

export default Axios;

// Fbtrans
/*
 * 复制专用
 _this.$http.post(_this.$http.user_info, {}).then(function(response) {
				if(response.data.status == "200") {
				} else {
					_this.$public.msg(response.data.msg, 'warning', _this);
				}
			}).catch(function(error) {});
 * 
 * 
 * 
 * 
 * */