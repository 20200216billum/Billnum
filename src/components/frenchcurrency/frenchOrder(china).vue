<style lang=less>
	@import '../../assets/public.less';
	@import './frenchOrder.less';
</style>
<template lang="html">
	<section class="frenchOrder">
		<div class="frenchOrder_mian" style="height: 650px;">
			<div class="frenchOrder_header_text">交易订单</div>
			<div class="frenchcurrency_header">
				<h2 class="order_hao">订单：{{order.order_num}}</h2>
				<h1 class="order_tishi" v-if="order.type == '1'">您向
					<span v-if="order.oop_name">{{order.oop_name}}</span>
					<span v-else="order.oop_mobile">{{order.oop_mobile}}</span>
					出售{{order.total_num}}USDT
				</h1>
				<h1 class="order_tishi" v-else>您向
					<span v-if="order.oop_name">{{order.oop_name}}</span>
					<span v-else="order.oop_mobile">{{order.oop_mobile}}</span>
					购买{{order.total_num}}USDT
				</h1>
				<h3 class="order_dan">单价:{{order.price}}CNY/USDT</h3>
				<h4 class="order_zong">总价:<span>{{order.total_price}}CNY</span></h4>
				<!--<h4 class="order_zong" v-show="order.notes">备注: {{order.notes}}</h4>-->				
			</div>
			<ul class="Payment_method">
				<li class="" v-for='item in order.pay_list'>
					<i class="iconfont icon-weixin" v-if='item.type == "wx"'></i>
					<i class="iconfont icon-zhifubao" v-else-if='item.type == "alipay"'></i>
					<i class="iconfont icon-yinhangka" v-else-if='item.type == "backcard"'></i>
					<span>{{item.tip}}</span>
					<p>{{item.name}}</p>
					<p>{{item.number}}</p>
					<p>{{item.bank}}</p>
					<p>{{item.branch}}</p>
					<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
						<img :src="item.img" width="220">
						<i slot="reference" class="iconfont icon-erweima"></i>
					</el-popover>
				</li>
			</ul>
			<!-- 出售订单 -->
			<div class="Payment_results" v-if="order.type == '1'">
				<h1 class="results_header" v-if="order.status=='1'">等待对方支付，{{order.oop_name}} 将于 <span class="time">{{countdowntime}}</span><span>内完成支付,付款参考号:({{order.refer}})</span></h1>

				<div class="results_main" v-if="order.status=='1'">
					<div class="results_btn one">等待对方支付</div>
					<!--<div class="results_text">
						<i class="el-icon-warning"></i> 付款成功后,请点击按钮告知对方
					</div>-->
				</div>
				<h1 class="results_header" v-if="order.status=='2'">对方已支付,付款参考号:({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='2'">
					<div class="results_btn one" @click="YesGet()">到账无误确认放行</div>
					<span class="payTime">{{payTime}}</span>
				</div>
				<h1 class="results_header" v-if="order.status=='3'">已完成,订单参考号:({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='3'">
					<div class="falr">
						<i class="el-icon-success"></i>
					</div>
					<!--<span class="ok">开始交易吧！</span>-->
				</div>
				<h1 class="results_header" v-if="order.status=='4'">申诉中，申诉口令：{{order.command}},付款参考号:({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='4'">
					<div class="there">
						<i class="el-icon-warning"></i>
					</div>
				</div>
				<div class="results_main" v-else-if="order.status=='5'">
					<div class="results_btn">订单已取消</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> 订单已取消，请重新下单
					</div>
				</div>
			</div>
			<!-- 购买订单 -->
			<div class="Payment_results" v-else>
				<h1 class="results_header" v-if="order.status=='1'">待支付，请于  <span class="time">{{countdowntime}}</span><span>内向{{order.oop_name}}支付{{order.num}},付款参考号:({{order.refer}})</span></h1>
				<div class="results_main" v-if="order.status=='1'">
					<div class="results_btn one" @click="signorder()">标记已付款</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> 付款成功后，请点击按钮告知对方
					</div>
				</div>
				<h1 class="results_header" v-if="order.status=='2'">已支付，付款参考号:({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='2'">
					<!--<div class="results_btn one" @click="YesGet()">等待对方放币</div>-->
					<div class="results_btn two">等待对方放币</div>
					<span class="payTime">{{payTime}}</span>
				</div>
				<h1 class="results_header" v-if="order.status=='3'">已完成,付款参考号:({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='3'">
					<div class="falr">
						<i class="el-icon-success"></i>
					</div>
					<!--<span class="ok">开始交易吧！</span>-->
				</div>
				<h1 class="results_header" v-if="order.status=='4'">申诉中，申诉口令：{{order.command}},付款参考号:({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='4'">
					<div class="there">
						<i class="el-icon-warning"></i>
					</div>
				</div>
				<div class="results_main" v-else-if="order.status=='5'">
					<div class="results_btn">订单已取消</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> 订单已取消，请重新下单
					</div>
				</div>
			</div>
			<ul class="Agreement_mian">
				<li v-for="item in Agreement" v-show="order.type==2">{{item.text}}</li>
				<li v-for="item in Agreement2" v-show="order.type== 1">{{item.text}}</li>

			</ul>
			<div class="Cancellation">
				<span @click="Cancellation()" v-show="order.status == 1">取消订单</span>
				<span @click="Submissioncomplaint()" v-show="Number(order.status) == 2 &&  order.type == '1' ">提交申诉</span> 
			</div>
		</div>
		<!-- 弹出框 -->
		<el-dialog title="订单申诉" width="30%" :visible.sync="dialogTableVisible">
			<div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="申诉类型">
						<el-select v-model="form.ss_type" placeholder="请选择类型">
							<!--<el-option label="对方未放行" value="对方未放行"></el-option>-->
							<el-option label="买家已确认,未打款" value="买家已确认,未打款"></el-option>
							<el-option label="其他" value="其他"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="申诉理由">
						<el-input type="textarea" v-model="form.ss_reason"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取 消</el-button>
				<el-button type="primary" @click="Submission()">确 定</el-button>
			</div>
		</el-dialog>
		<!--交易弹窗-->
		<div tabindex="-1" role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2088;" v-show="shows">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>提示</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn"  @click="shows = false">
						<i class="el-message-box__close el-icon-close" @click="shows = false"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<!---->
					<div class="el-message-box__message">
						<p>请输入资金密码</p>
					</div>
					<div class="el-message-box__input" style="">
						<div class="el-input">
							<input type="password" autocomplete="off" placeholder="" class="el-input__inner" v-model="tpwd">
						</div>
						<div class="el-message-box__errormsg" style="visibility: hidden;"></div>
					</div>
				</div>
				<div class="el-message-box__btns"><button type="button" class="el-button el-button--default el-button--small" @click="shows = false">
					<span>取消</span>
				</button>
					<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="overOrder()">
					<span> 确定</span>
				</button>
				</div>
			</div>
		</div>
		<div class="v-modal" tabindex="0" style="z-index: 200;" v-show="shows"></div>

	</section>
</template>
<script>
	export default {
		data() {
			return {  
				Agreement: [{
					text: "1、您的汇款将直接进入卖方账户,交易过程中卖方出售的数字资产由平台托管保护。",
				}, {
					text: "2、请在规定时间内完成付款,并务必点击我已付款,卖方确认收款后,系统会将数字资产划转到您的账户。",
				}, {
					text: "3、如果买方当日取消订单达3次,将会被限制当日的买入功能",
				}],
				Agreement2: [{
					text: "1、您所出售的数字资金，已交由平台托管冻结，请在确定收到对方付款后，点击“确认放行”支付数字资产。",
				}, {
					text: "2、请不要相信任何催促放币的理由，确认收到款项后再释放数字资产，避免造成损失。",
				}, {
					text: "3、在收到短信后，请务必登录网上银行或手机银行确认款项是否入账，避免因收到诈骗短信错误释放数字资产。",
				}],
				order: {},
				TimeData: null,
				countdown: null,
				countdowntime: null,
				qr_time: null, //确认支付倒计时
				payTime: null, //渲染到页面的倒计时
				setIntervaltime: null,
				dialogTableVisible: false,
				shows: false,
				tpwd: '', //资金密码
				form: {
					ss_type: "买家已确认,未打款",
					ss_reason: "",
				},
				set: null, //交易倒计时定时器
				payedSet: null, //待放行倒计时
			}
		},
		methods: {
			// 取消订单
			Cancellation() {
				var connet = this;
				connet.$confirm('此操作将永久取消订单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(connet.order.status != 1){
						connet.$public.msg('您已不可取消该订单', 'warning', connet);
						return false
					}					
					connet.Cancellationdata();
				}).catch(() => {
					connet.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			// 取消订单数据
			Cancellationdata() {
				var connet = this;
				var re_order = {
					order_num: connet.order.order_num,
				};
				connet.$http.post(connet.$http.re_order, re_order).then(function(response) {
					if(response.data.status == "0") {
//						connet.huqushuju();
						connet.getDataSet();
						connet.$message({
							type: 'success',
							message: "已成功取消订单"
						});
						connet.$router.push({
							path: '/frenchcurrency'
						});
					} else {
						connet.$message({
							type: 'info',
							type: 'success',
							message: response.data.msg
						});
					}
				}).catch(function(error) {});
			},
			// 获取订单信息
			huqushuju() {
				var connet = this;
				var hu = JSON.parse(unescape(window.sessionStorage.order));
				connet.CountDown(hu.data.order_num);
			},
			// 标记已付款
			signorder() {
				var connet = this;
				connet.$confirm('请您确定已向卖方付款，<span style="color:red">恶意点击将被冻结账户</span>', '确定支付', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true,
				}).then(() => {
					var setOrderStatus = {
						order_no: connet.order.order_num,
					}
					connet.$http.post(connet.$http.setOrderStatus, setOrderStatus).then(function(response) {
						if(response.data.status == "200") {
							connet.getDataSet();
							connet.$message({
								type: 'success',
								message: "已成功标记为已付款"
							});
						} else {
							connet.$message({
								type: 'info',
								message: response.data.msg
							});
						}
					}).catch(function(error) {});

				}).catch(() => {
					connet.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			// 倒计时（刷新数据接口）
			CountDown(order_num) {
				var connet = this;
				connet.order_order_num = order_num; //订单号
				var myData = new Date();
//				clearInterval(connet.setIntervaltime);
				connet.getDataSet();				
				connet.setIntervaltime = window.setInterval(function() {
					connet.getDataSet();					
				}, 5000)

			},
			//请求数据接口

			getDataSet() {
				var connet = this;
				var orderDetaildata = {
					order_num: connet.order_order_num,
				};
				connet.$http.post(connet.$http.orderDetail, orderDetaildata).then(function(response) {
					if(response.data.status == "200") {
						connet.order = response.data.data;
						connet.TimeData = response.data.data.add_time;
						connet.countdown = response.data.data.down_time; //订单倒计时
						connet.qr_time = response.data.data.qr_time; //确定支付倒计时
						//						status = response.data.data.status;						
						connet.chusouSet(response.data.data.status, response.data.data.down_time);
						//状态是2 定时器走起来
						if(response.data.data.status == 2) {
							connet.payed()
						} else {
							//当是这个状态时 把这个定时器干掉
							clearInterval(connet.payedSet);
						}
					}
				}).catch(function(error) {});
			},
			//待出售倒计时
			chusouSet(status, time) {
				//需要两个参数（此时订单的状态，当前剩余时间）
				//倒计时 执行函数
				var connet = this;
				var shijian;
				connet.set = window.setInterval(function() {
					switch(status) {
						case "1":
							shijian = time / 60;
							connet.countdowntime = (parseInt(shijian)) + "分" + (time % 60) + "秒 ";
							break;
						case "2":
							break;
						default:
							window.clearInterval(connet.setIntervaltime);
							break;
					}
					time = time <= 0 ? 0 : --time;
					if(time == 0) {
						connet.countdowntime = '系统处理中...';
						clearInterval(connet.set);
					}

				}, 1000)
			},
			//待支付倒计时
			payed() {
				var _this = this;
				//关闭交易倒计时 执行这个倒计时时说明交易倒计时已不存在
				window.clearInterval(_this.set);				
				//为了防止意外多起定时器 先把自己给干掉
				window.clearInterval(_this.payedSet);
				_this.payedSet = setInterval(function() {					
					var shi = _this.qr_time / 60;
					_this.payTime = (parseInt(shi)) + "分" + (_this.qr_time % 60) + "秒 后系统将自动确认";
					_this.qr_time--;
					if(_this.qr_time < 0) {
						_this.qr_time = 0;
						_this.payTime = '系统处理中...';
						clearInterval(_this.payedSet);
					}
				}, 1000)

			},
			//结束订单
			overOrder() {
				var _this = this;
				if(!_this.$public.pwd(_this.tpwd)) {
					_this.$public.msg('资金密码格式有误，请重新输入', 'warning', _this);
					return false;
				}
				//请求接口
				_this.$http.post(_this.$http.confirm, {
					order_no: _this.order.order_num,
					tpwd: _this.tpwd
				}).then(function(response) {
					if(response.data.status == "200") {
						_this.getDataSet();
						_this.$public.msg(response.data.msg, 'success', _this);
						_this.shows = false;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});

			},
			//对方已付款请确认放币 点击事件
			YesGet() {
				var _this = this;
				_this.tpwd = '';
				_this.shows = true;
			},
			// 申诉点击弹框
			Submissioncomplaint() {
				var connet = this;
				connet.form.ss_reason = '';
				connet.dialogTableVisible = true;

			},
			// 申诉提交
			Submission() {
				var connet = this;
				var ss_reason = connet.form.ss_reason.replace(/\s/g, "");
				if(!ss_reason) {
					connet.$public.msg('申诉原因不能为空', 'warning', connet);
					return false;
				}
				connet.dialogTableVisible = false;
				var post_allege = {
					order_num: connet.order.order_num,
					refer: connet.order.refer,
					ss_type: connet.form.ss_type,
					ss_reason: connet.form.ss_reason,
					shop_account: connet.order.oop_account,
					status:connet.order.status
				};
				connet.$http.post(connet.$http.post_allege, post_allege).then(function(response) {
					if(response.data.status == "200") {
						connet.getDataSet();
						connet.$message({
							type: 'success',
							message: "提交申诉成功,等待客服介入"
						});
					} else {
						connet.$message({
							type: 'info',
							message: response.data.msg
						});
					}
				}).catch(function(error) {});
			},
			//干掉定时器
			offTime() {
				var connet = this;
				clearInterval(connet.setIntervaltime);
				clearInterval(connet.set);
				clearInterval(connet.payedSet);
			}
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {
			next()
		},
		created: function() {
			var connet = this;
			connet.huqushuju();
		}

	}
</script>