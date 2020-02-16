<style lang=less>
	@import '../../assets/public.less';
	@import './frenchOrder.less';
	.nots{
		color: red;
		margin-left: 50px;
		padding-bottom: 5px;
	}
	
	
</style>
<template lang="html">
	<section class="frenchOrder">
		<div class="frenchOrder_mian">
		
			<div class="frenchcurrency_header">

				<h1 class="order_tishi" v-if="order.type == 1">{{$t("frenchorder.direction[0]")}}
					<span> {{order.oop_name}}</span>
					<span class="col">{{$t("frenchorder.direction[1]")}}</span>  {{order.total_num}}USDT
				</h1>

				<h1 class="order_tishi" v-else>{{$t("frenchorder.direction[0]")}}
					<span>{{order.oop_name}}</span>
					<span class="col">	{{$t("frenchorder.direction[2]")}}</span>{{order.total_num}}USDT
				</h1>

				<div class="order_two">
						<h2 class="order_hao">{{$t("frenchorder.title[1]")}}：{{order.order_num}}</h2>
						<h6 v-if="order.status=='1'">{{$t("frenchorder.list1[0]")}}</h6>			<!--待付款 -->
						<h6 v-if="order.status=='2' && order.type == 2">{{$t("frenchorder.list1[1]")}}</h6>		<!--已付款 -->
						<h6 v-if="order.status=='2' && order.type == 1">{{$t("frenchorder.list1[2]")}}</h6>		     <!--代放币 -->
						<h6 v-if="order.status=='3'">{{$t("frenchorder.list1[3]")}}</h6>    <!--已完成 -->
						<h6 v-if="order.status=='4'">{{$t("frenchorder.list1[4]")}}</h6>    <!--申诉中 -->
						<h6 v-if="order.status=='5'">{{$t("frenchorder.list1[5]")}}</h6>		<!--取消 -->
				</div>

				<div class="order_info">
						<h3 class="order_dan">{{$t("frenchorder.title[2]")}}：{{order.price}}CNY</h3>
						<h3 class="order_dan">{{$t("frenchorder.title[5]")}}：{{order.total_num}}USDT</h3>
						<h4 class="order_zong">{{$t("frenchorder.title[3]")}}：<span>{{order.total_price}}CNY</span></h4>
						<!-- 备注 -->
						<h3 class="order_notes">{{$t('sell.list[7]')}}：<span>{{order.notes}}</span></h3>
				</div>
						
			</div>
			<div v-if="order.type == 2">
				<div class="contact">
					<!-- 联系方式 -->
					<h2>{{$t("frenchorder.list1[6]")}}：</h2>
					<!-- 联系人 -->
					<p>{{$t('sell.list[13]')}}：{{order.oop_name}}</p>
					<!-- 手机号： -->
					<p v-if="order.oop_mobile">{{$t("security.verify[5]")}}：{{order.oop_mobile}} </p>
					<p v-else>{{$t("frenchorder.list1[6]")}}：{{order.oop_mail}} </p>
				</div>
				<!-- 1未确认待付款 2已付款 3已确认完成 4 申诉中 5取消  6冻结 -->
				<!-- <ul class="Payment_method" v-if="order.status == '1' || order.status == '2' "> -->
				<ul class="Payment_method" v-if="order.status == '1' || order.status == '2' ">
					<h2>{{$t("frenchorder.title[7]")}}:</h2>
					<li class="" v-for='item in order.pay_list'>
						<div v-if='item.type == "wx"'>
								<i class="iconfont icon-weixin"></i>
								<span>{{item.tip}}</span>
								<p>{{item.name}}</p>
								<p>{{item.number}}</p>
							<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
								<img :src="item.img" width="220">
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover>
						</div>
						<div v-if='item.type == "alipay"'>
								<i class="iconfont icon-zhifubao"></i>
								<span>{{item.tip}}</span>
								<p>{{item.name}}</p>
								<p>{{item.number}}</p>
							<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
								<img :src="item.img" width="220">
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover>
						</div>
						<div v-if='item.type == "backcard"'>
								<i class="icon iconfont icon-yinhangka car"></i>
								<span>{{item.tip}}</span>
								<p>{{item.name}}</p>
								<p>{{item.bank_car}}</p>
								<p>{{item.number}}</p>
								<p>{{item.bank}}</p>
								<p>{{item.branch}}</p>
							<!-- <el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
								<img :src="item.img" width="220">
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover> -->
						</div>
							<!-- 选择付款方式 -->
							<!-- <el-radio-group v-model="radio">
									<el-radio :label="1" v-if='item.type == "wx"'>
										<i class="iconfont icon-weixin"></i>
										<span>{{item.tip}}</span>
										<p>{{item.name}}</p>
										<p>{{item.number}}</p>
									</el-radio>
									<el-radio :label="2" v-else-if='item.type == "alipay"'>
											<i class="iconfont icon-zhifubao"></i>
											<span>{{item.tip}}</span>
											<p>{{item.name}}</p>
											<p>{{item.number}}</p>
									</el-radio>
									<el-radio :label="3" v-else-if='item.type == "backcard"'>
											<i class="icon iconfont icon-yinhangka car"></i>
											<span>{{item.tip}}</span>
											<p>{{item.name}}</p>
											<p>{{item.number}}</p>
											<p>{{item.bank}}</p>
											<p>{{item.branch}}</p>
									</el-radio>
							</el-radio-group> -->

					</li>
				</ul>
				<ul class="Payment_method" v-else-if="order.status == '5'">
					<p>{{$t("frenchorder.title[6]")}}:</p>
					<li class="" v-for='item in order.pay_list'>
							<i class="iconfont icon-weixin" v-if="item.type == 'wx'"></i>
							<i class="iconfont icon-zhifubao" v-if="item.type == 'alipay'"></i>
							<i class="icon iconfont icon-yinhangka car" v-if="item.type == 'backcard'"></i>
							<span>{{item.tip}}</span>
							<p>{{item.name}}</p>
							<p>{{item.bank_car}}</p>
							<p>{{item.number}}</p>
							<p>{{item.bank}}</p>
							<p>{{item.branch}}</p>
							<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
								<img v-show="item.ali_img" :src="item.img" width="220">
								<img v-show="item.wx_img" :src="item.img" width="220">
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover>
					</li>
				</ul>
				<!-- <ul class="Payment_method" v-else>
					<p>{{$t("frenchorder.title[7]")}}:</p>
					<li class="">
						<i class="iconfont icon-weixin" v-if='orderPayment.type == "wx"'></i>
						<i class="iconfont icon-zhifubao" v-else-if='orderPayment.type == "alipay"'></i>
						<i class="iconfont icon-yinhangka" v-else-if='orderPayment.type == "backcard"' ></i>
						<span>{{orderPayment.tip}}</span>
						<p>{{orderPayment.name}}</p>
						<p>{{orderPayment.number}}</p>
						<p>{{orderPayment.bank}}</p>
						<p>{{orderPayment.branch}}</p>
						<el-popover placement="right" width="220" trigger="hover" v-if='orderPayment.img'>
							<img :src="orderPayment.img" width="220">
							<i slot="reference" class="iconfont icon-erweima"></i>
						</el-popover>
					</li>
				</!-->
			</div>
			<!-- 出售订单联系方式 -->
			<div v-if="order.type == 1">
				<div class="contact">
					<!-- 联系方式 -->
					<h2>{{$t("frenchorder.list1[6]")}}：</h2>
					<!-- 联系人 -->
					<p>{{$t('sell.list[13]')}}：{{order.oop_name}}</p>
					<!-- 手机号 -->
					<p v-if="order.oop_mobile">{{$t("security.verify[5]")}}：{{order.oop_mobile}} </p>
					<p v-else>{{$t("frenchorder.list1[6]")}}：{{order.oop_mail}} </p>
				</div>
				<ul class="Payment_method" v-if="order.status == '2'">
					<p>{{$t("frenchorder.title[6]")}}:</p>
					<li class="" v-for='item in order.pay_list'>
							<i class="iconfont icon-weixin" v-if="item.type == 'wx'"></i>
							<i class="iconfont icon-zhifubao" v-if="item.type == 'alipay'"></i>
							<i class="icon iconfont icon-yinhangka car" v-if="item.type == 'backcard'"></i>
							<span>{{item.tip}}</span>
							<p>{{item.name}}</p>
							<p>{{item.bank_car}}</p>
							<p>{{item.number}}</p>
							<p>{{item.bank}}</p>
							<p>{{item.branch}}</p>
							<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
								<img :src="item.img" width="220">
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover>
					</li>
						<!-- <p>{{$t("frenchorder.title[6]")}}:</p>
						<li class="">
							<i class="iconfont icon-weixin" v-if='orderPayment.type == "wx"'></i>
							<i class="iconfont icon-zhifubao" v-else-if='orderPayment.type == "alipay"'></i>
							<i class="iconfont icon-yinhangka" v-else-if='orderPayment.type == "backcard"' ></i>
							<span>{{orderPayment.tip}}</span>
							<p>{{orderPayment.name}}</p>
							<p>{{orderPayment.number}}</p>
							<p>{{orderPayment.bank}}</p>
							<p>{{orderPayment.branch}}</p>
							<el-popover placement="right" width="220" trigger="hover" v-if='orderPayment.img'>
								<img :src="orderPayment.img" width="220">
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover>
						</li> -->
				</ul>
				<ul class="Payment_method" v-else>
					<p>{{$t("frenchorder.title[6]")}}:</p>
					<li class="" v-for='item in order.pay_list'>
							<i class="iconfont icon-weixin" v-if="item.type == 'wx'"></i>
							<i class="iconfont icon-zhifubao" v-if="item.type == 'alipay'"></i>
							<i class="icon iconfont icon-yinhangka car" v-if="item.type == 'backcard'"></i>
							<span>{{item.tip}}</span>
							<p>{{item.name}}</p>
							<p>{{item.bank_car}}</p>
							<p>{{item.number}}</p>
							<p>{{item.bank}}</p>
							<p>{{item.branch}}</p>
							<el-popover placement="right" width="220" trigger="hover" v-if='item.img'>
								<img :src="item.img" width="220" v-if="item.type=='alipay'">
								<img :src="item.img" width="220" v-else>
								<i slot="reference" class="iconfont icon-erweima"></i>
							</el-popover>
					</li>
				</ul>
			</div>

			<!-- 出售订单 -->
			<div class="Payment_results" v-if="order.type == 1">
				<!--等待对方支付-->
				<h1 class="results_header" v-if="order.status=='1'">{{$t("frenchorder.time[0]")}}，{{order.oop_name}} {{$t("frenchorder.time[1]")}} <span class="time">{{countdowntime}}</span><span>{{$t("frenchorder.time[2]")}},{{$t("frenchorder.time[3]")}}:({{order.refer}})</span></h1>
				<div class="results_main" v-if="order.status=='1'">
					<div class="results_btn one">{{$t("frenchorder.time[4]")}}</div>
				</div>

				<!--对方已支付,付款参考号-->
				<h1 class="results_header" v-if="order.status=='2'">{{$t("frenchorder.todoSell[0]")}}:({{order.refer}})</h1>
				<div class="results_text" v-if="order.status=='2'">
						<i class="el-icon-warning"></i> {{$t("frenchorder.list1[7]")}} {{payTime}}{{$t("frenchorder.list1[8]")}}
						<p>{{$t("frenchorder.list1[9]")}}</p>
					</div>
				<div class="results_main" v-if="order.status=='2'">
					<div class="results_btn one" @click="YesGet()">{{$t("frenchorder.list1[10]")}}</div>
					<div class="results_btn two" @click="Submissioncomplaint()">{{$t("frenchorder.list1[11]")}}</div>
				</div>

				<!--已完成,订单参考号-->
				<h1 class="results_header" v-if="order.status=='3'">{{$t("frenchorder.todoSell[2]")}}:({{order.refer}})</h1>

				<!--付款参考号-->
				<h1 class="results_header" v-if="order.status=='4'">{{$t("frenchorder.todoSell[3]")}}：{{order.command}},{{$t("frenchorder.todoSell[4]")}}:({{order.refer}})</h1>

				<div class="results_main" v-else-if="order.status=='5'">
					<div class="results_btn">{{$t("frenchorder.cancel[0]")}}</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> {{$t("frenchorder.cancel[1]")}}
					</div>
				</div>
			</div>
			<!-- 购买订单 -->
			<div class="Payment_results" v-if="order.type == 2">
																			<!-- 待支付，请于 -->
				<h1 class="results_header" v-if="order.status=='1'">{{$t("frenchorder.todoBuy[0]")}} <span class="time">{{countdowntime}}</span><span>{{$t("frenchorder.todoBuy[1]")}} {{order.oop_name}}{{$t("frenchorder.todoBuy[2]")}} {{order.num}}，</span> <p>{{$t("frenchorder.todoBuy[3]")}} :({{order.refer}})</p></h1>
				<!-- 提示 -->
				<div class="results_text" v-if="order.status=='1'">
					<!-- <i class="el-icon-warning"></i> {{$t("frenchorder.todoBuy[5]")}}  -->
					<i style="transform:scale(1.5);color:#6185E5;" class="el-icon-warning"></i><span style="color:#8E94A3;">
                            &nbsp;
                            &nbsp;
							<!-- 付款成功后，请点击 -->
							{{$t('frenchorder.tips[0]')}}
							<!-- 标记已付款 -->
                            <span style="color:#6185E5;">“{{$t('frenchorder.tips[1]')}}”</span>
							<!-- 告知对方确定付款之后再标记已付款，否则将会被冻结账号 -->
							{{$t('frenchorder.tips[2]')}}
							
                        </span>
				</div>
				<!-- 标记已付款 -->
				<div class="results_main" v-if="order.status=='1'">
					<div class="results_btn one" @click="signorder()">{{$t("frenchorder.todoBuy[4]")}} </div>
					<div class="results_btn two" @click="Cancellation()">{{$t("frenchorder.complaint[4]")}}</div>
				</div>
				
				<h1 class="results_header" v-if="order.status=='2'">{{$t("frenchorder.todoBuy[6]")}} :({{order.refer}})</h1>
				<div class="results_main" v-if="order.status=='2'">
					<div class="results_btn two">{{$t("frenchorder.todoBuy[7]")}} </div>
					<span class="payTime">{{payTime}}</span>
				</div>


				<h1 class="results_header" v-if="order.status=='3'">{{$t("frenchorder.todoBuy[8]")}} :({{order.refer}})</h1>
				<!-- <div class="results_main" v-if="order.status=='3'">
				</div> -->

				<h1 class="results_header" v-if="order.status=='4'">{{$t("frenchorder.complaint[0]")}}：{{order.command}},{{$t("frenchorder.complaint[1]")}}:({{order.refer}})</h1>
				<!-- <div class="results_main" v-if="order.status=='4'">
				</div> -->

				<div class="results_main" v-if="order.status=='5'">
					<div class="results_btn">{{$t("frenchorder.complaint[2]")}}</div>
					<div class="results_text">
						<i class="el-icon-warning"></i> {{$t("frenchorder.complaint[3]")}}
					</div>
				</div>
			</div>
			
			<ul class="Agreement_mian">
				<p class="p_1">{{$t('frenchorder.mob2[7]')}}</p>
				<li v-for="item in Agreement" v-show="order.type==2">{{item.text}}</li>
				<li v-for="item in Agreement2" v-show="order.type== 1">{{item.text}}</li>
			</ul>
			
		</div>
		<!-- 弹出框 申诉 -->
		<el-dialog :title="$t('frenchorder.mob1[0]')" width="420px" :visible.sync="dialogTableVisible">
			<div>
				<el-form ref="form" :model="form" label-width="80px">
					<!-- <el-form-item :label="'申诉类型'">
						<el-select v-model="form.ss_type" placeholder="请选择">
							<el-option
							:label="form.ss_type"
							:value="form.ss_type">
							</el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item :label="$t('frenchorder.mob1[5]')">
						<el-input type="textarea" v-model="form.ss_reason" :placeholder="$t('frenchorder.mob1[8]')"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">{{$t('frenchorder.mob1[6]')}}</el-button>
				<el-button type="primary" @click="Submission()">{{$t('frenchorder.mob1[7]')}}</el-button>
			</div>
		</el-dialog>
		<!--交易弹窗-->
		<el-dialog :title="$t('frenchorder.mob2[4]')" width="30%" :visible.sync="shows">
			<div>
				<el-form ref="form" :model="form" label-width="80px">
					
					<el-form-item :label="$t('frenchorder.mob2[5]')">
						<el-input type="password" v-model="tpwd" :placeholder="$t('frenchorder.mob2[6]')"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="shows = false">{{$t('frenchorder.mob2[2]')}}</el-button>
				<el-button type="primary" @click="overOrder()">{{$t('frenchorder.mob2[3]')}}</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	export default {
		data() {
			return {  
				Agreement: this.$t('frenchorder.Agreement'),
				Agreement2: this.$t('frenchorder.Agreement2'),
				order: {
					type:'',
				},// 订单详情
				orderPayment: '',//支付方式
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
				email:'',
				radio: 1,
				pay_list:[],
			}
		},
		methods: {
			// 取消订单
			Cancellation() {
				var connet = this;
				connet.$confirm(connet.$t('frenchorder.jsmob1[0]'), connet.$t('frenchorder.jsmob1[1]'), {
					confirmButtonText: connet.$t('frenchorder.jsmob1[2]'),
					cancelButtonText: connet.$t('frenchorder.jsmob1[3]'),
					type: 'warning'
				}).then(() => {
					if(connet.order.status != 1){
						connet.$public.msg(connet.$t('frenchorder.jsmob1[4]'), 'warning', connet);
						return false
					}					
					connet.Cancellationdata();
				}).catch(() => {
					connet.$message({
						type: 'info',
						message: connet.$t('frenchorder.jsmob1[5]')
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
					if(response.data.code == "200") {
//						connet.huqushuju();
						connet.getDataSet();
						connet.$message({
							type: 'success',
							message: connet.$t('frenchorder.jsmob1[6]')
						});
						connet.$router.push({
							path: '/frenchcurrency'
						});
						this.offTime()
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
				var hu = JSON.parse(unescape(sessionStorage.order));
				connet.CountDown(hu.order_num);
			},
			// 标记已付款
			signorder() {
				var connet = this;
				connet.$confirm(connet.$t('frenchorder.jsmob2[0]') + '<span style="color:red">'+connet.$t('frenchorder.jsmob2[1]')+'</span>', connet.$t('frenchorder.jsmob2[2]'), {
					confirmButtonText: connet.$t('frenchorder.jsmob1[2]'),
					cancelButtonText: connet.$t('frenchorder.jsmob1[3]'),
					type: 'warning',
					dangerouslyUseHTMLString: true,
				}).then(() => {
					var setOrderStatus = {
						order_num: connet.order.order_num,
						// ptype: connet.radio
					}
					connet.$http.post(connet.$http.setOrderStatus, setOrderStatus).then(function(response) {
						if(response.data.code == "200") {
							connet.getDataSet();
							connet.$message({
								type: 'success',
								message: connet.$t('frenchorder.jsmob2[3]'),
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
						message: connet.$t('frenchorder.jsmob1[5]'),
					});
				});
			},
			//勾选支付方式
			changeAct(i){
				var _this = this;

			},
			// 倒计时（刷新数据接口）
			CountDown(order_num) {
				var connet = this;
				connet.order_order_num = order_num; //订单号
				var myData = new Date();
//				clearInterval(connet.setIntervaltime);
				connet.getDataSet();				
				connet.setIntervaltime = setInterval(function() {
					connet.getDataSet();					
				}, 5000)

			},
			//请求数据接口
			getDataSet() {
				var connet = this;
				var orderDetaildata = {
					order_num: connet.order_order_num,
				};
				connet.$http.get(connet.$http.orderDetail, {params:orderDetaildata}).then(function(response) {
					if(response.data.code == "200") {
						connet.order = response.data.data;						
						if(response.data.data.pay_type){
							connet.orderPayment = response.data.data.pay_type;
						}
						connet.TimeData = response.data.data.add_time;
						connet.countdown = response.data.data.down_time; //订单倒计时
						connet.qr_time = response.data.data.qr_time; //确定支付倒计时
						//						status = response.data.data.code;						
						connet.chusouSet(response.data.data.status, response.data.data.down_time);
						//状态是2 定时器走起来
						if(response.data.data.status == 2) {
							connet.payed();
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
				connet.set = setInterval(function() {
					switch(status) {
						case 1:
							shijian = time / 60;
							connet.countdowntime = (parseInt(shijian))+ connet.$t('frenchorder.jsmob3[0]') +(time % 60)+ connet.$t('frenchorder.jsmob3[1]');
							break;
						case 2:
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							clearInterval(connet.setIntervaltime);
							break;
					}
					time = time <= 0 ? 0 : --time;
					if(time == 0) {
						connet.countdowntime = connet.$t('frenchorder.jsmob2[4]')+'...';
						clearInterval(connet.set);
					}

				}, 1000)
			},
			//待支付倒计时
			payed() {
				var _this = this;
				//关闭交易倒计时 执行这个倒计时时说明交易倒计时已不存在
				clearInterval(_this.set);				
				//为了防止意外多起定时器 先把自己给干掉
				clearInterval(_this.payedSet);
				_this.payedSet = setInterval(function() {			
					var shi = _this.qr_time / 60;
					_this.payTime = (parseInt(shi))+_this.$t('frenchorder.jsmob3[0]')+(_this.qr_time % 60)+_this.$t('frenchorder.jsmob3[2]');
					_this.qr_time--;
					if(_this.qr_time <= 0) {
						_this.qr_time = 0;
						_this.payTime = _this.$t('frenchorder.jsmob2[4]')+'...';
						clearInterval(_this.payedSet);
					}
				}, 1000)
			},
			//结束订单
			overOrder() {
				var _this = this;
				if(!_this.$public.pwd(_this.tpwd)) {
					_this.$public.msg(_this.$t('frenchorder.jsmob3[3]'), 'warning', _this);
					return false;
				}
				//请求接口
				_this.$http.post(_this.$http.confirm, {
					order_num: _this.order.order_num,
					payment_password: _this.$md5(_this.tpwd)
				}).then(function(response) {
					if(response.data.code == "200") {
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
					connet.$public.msg(connet.$t('frenchorder.jsmob3[4]'), 'warning', connet);
					return false;
				}
				connet.dialogTableVisible = false;
				var post_allege = {
					order_num: connet.order.order_num,
					refer: connet.order.refer,
					// shop_account: connet.order.oop_account,
					// status:connet.order.status,
					// ss_type: connet.form.ss_type,
					ss_reason: connet.form.ss_reason,
					// ss_type: connet.form.ss_type,
				};
				connet.$http.post(connet.$http.post_allege, post_allege).then(function(response) {
					if(response.data.code == "200") {
						connet.getDataSet();
						connet.$message({
							type: 'success',
							message: connet.$t('frenchorder.jsmob3[5]')
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
			this.offTime()
			next()
		},
		created: function() {
			var connet = this;
			connet.huqushuju();
			// connet.requestData();
		},
		destroyed(){
			this.offTime()
		},

	}
</script>