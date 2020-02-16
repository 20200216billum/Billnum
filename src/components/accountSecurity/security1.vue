<style lang=less>
	@import '../../assets/public.less';
	@import './security.less';
	@import './children/change_pwd.less';
</style>
<template>
	<div class="security_main">
		<div class="security_main_title">
			<h2>{{$t("security.name[0]")}}</h2>
		</div>
		<!--基本信息-->
		<div class="information jiben">
			<div class="information_header">
				<h2>{{$t("security.information[0]")}}</h2>
			</div>
			<div class="information_cont">
				<ul class="lis_warp">
					<li class="lis">
						<span class="name">{{$t("security.information[1]")}}:</span><!--账号-->
						<span class="num">{{ userData.phone ? phone : '------' }}</span>
					</li>
					<li class="lis">
						<span class="name">UID:</span>
						<span class="num">{{userData.account}}</span>
					</li>
					<li class="lis">
						<span class="name">{{$t("security.information[2]")}}:</span><!--登录密码-->
						<span class="num">******</span>
						<a href="javascript:;" class="modify" @click="change_router('changeopwd')">{{$t("security.information[4]")}}</a><!--修改-->
					</li>
					<li class="lis">
						<span class="name">{{$t("security.information[3]")}}:</span><!--资金密码-->
						<span class="num">{{userData.config.payment_password_set == 0 ? '------' : '******'}}</span>
						<a href="javascript:;" class="modify" @click="change_router('changetpwd2')" v-if="userData.config.payment_password_set == 0">{{$t("security.information[5]")}}</a>
						<a href="javascript:;" class="modify" @click="change_router('changetpwd2')" v-else>{{$t("security.information[4]")}}</a>
						<!--设置-->
						<!-- <a href="javascript:;" class="modify" @click="change_router('changetpwd')" v-if="!userData.tpwd">{{$t("security.information[5]")}}</a> -->
						<!-- 修改 -->
						<!-- <a href="javascript:;" class="modify" @click="change_router('changetpwd')" v-else>{{$t("security.information[4]")}}</a>   -->
					</li>
				</ul>
			</div>
		</div>

		<!--账户安全-->
		<div class="information middle span">
			<div class="information_header">
				<h2>{{$t("security.name[0]")}}</h2>
			</div>
			<div class="information_cont">
				<ul class="lis_warp">

					<!-- 安全等级 -->
					<!-- <li class="lis">
						<span class="name">{{$t("security.verify[1]")}}</span>
						<span class="num" v-if="userData.user_level == '1'">{{$t('security.leavel[0]')}} </span>
						<span class="num" v-if="userData.user_level == '2'">{{$t('security.leavel[1]')}}</span>
						<span class="num" v-if="userData.user_level == '3'">{{$t('security.leavel[2]')}}</span>
						<span class="num" v-else>------</span>
						<a href="javascript:;" class="modify modify2">{{$t("security.tip[2]")}}</a>
						<span class="textTip">({{$t("security.tip[3]")}})</span>
					</li> -->

					<!-- 邮箱 -->
					<!-- <li class="lis">
						<span class="name">{{$t("security.verify[2]")}}</span>
						<span class="num">{{ userData.email ? userData.email : "---" }}</span>
						<a href="javascript:;" class="modify modify2" v-if="userData.email">{{$t("security.tip[4]")}}</a>
						<a href="javascript:;" class="modify modify2" v-else @click="change_router('changeemail')">{{$t("security.tip[5]")}}</a>
						<span class="textTip">({{$t("security.verify[3]")}})</span>
					</li> -->

					<!-- 手机号 -->
					<li class="lis">
						<span class="name">{{$t("security.verify[5]")}}</span>
						<span class="num">{{ userData.phone ? phone : '------' }}</span>
						<a href="javascript:;" class="modify modify2" v-if="userData.phone">{{$t("security.tip[4]")}}</a>
						<a href="javascript:;" class="modify modify2" v-else @click="change_router('changemobile')">{{$t("security.tip[5]")}}</a>
						<span class="textTip">({{$t("security.verify[6]")}})</span>
					</li>

					<!-- 身份验证 -->
					<li class="lis">
						<span class="name">{{$t("security.verify[0]")}}</span>
						<span class="num" v-if="userData.authentication == '0'">{{$t('securityLa.shenfenYZ[0]')}}</span>
						<span class="num" v-if="userData.authentication == '1'">{{$t('securityLa.shenfenYZ[1]')}}</span>
						<span class="num" v-if="userData.authentication == '2'">{{$t('securityLa.shenfenYZ[2]')}}</span>
						<span class="num" v-if="userData.authentication == '3'">{{$t('securityLa.shenfenYZ[3]')}}</span>
						<!-- <a href="javascript:;" class="modify modify2" @click="personJump">{{$t("security.verify[6]")}}</a> -->
						<a href="javascript:;" class="modify modify2" @click="personJump"  v-if="userData.authentication == '0'">{{$t('securityLa.shenfenYZ[4]')}}</a>
						<a href="javascript:;" class="modify modify2" @click="personJump"  v-if="userData.authentication == '1'">{{$t('securityLa.shenfenYZ[1]')}}</a>
						<a href="javascript:;" class="modify modify2" @click="personJump"  v-if="userData.authentication == '2'">{{$t('securityLa.shenfenYZ[5]')}}</a>
						<a href="javascript:;" class="modify modify2" @click="personJump"  v-if="userData.authentication == '3'">{{$t('securityLa.shenfenYZ[3]')}}</a>
						<span class="textTip">({{$t("security.verify[8]")}})</span>
					</li>

					<!-- 手机验证 -->
					<li class="lis">
						<span class="name">{{$t("securityLa.shoujiYZ[0]")}}</span>
						<span class="num">{{userData.config.sms_verify == 0 ? $t("securityLa.shoujiYZ[1]") : $t("securityLa.shoujiYZ[2]")}}</span>
						<a href="javascript:;" class="modify modify2" @click="phoneOpen(userData.config.sms_verify)">{{userData.config.sms_verify == 0 ? $t("securityLa.shoujiYZ[3]") : $t("securityLa.shoujiYZ[4]")}}</a>
						<span class="textTip">{{$t("securityLa.shoujiYZ[5]")}}</span>
					</li>
					<!-- <li class="lis" v-else>
						<span class="name">{{$t("security.verify[9]")}}</span>
						<span class="num">{{userData.config.google_verify == 0 ? '未开启' : '已开启'}}</span>
						<a href="javascript:;" class="modify modify2" @click="change_router('googleverify')">{{$t("security.verify[4]")}}</a>
						<span class="textTip">({{$t("security.tip[10]")}})</span>
					</li> -->

					<!-- 谷歌验证 -->
					<li class="lis" v-if="userData.config.google_bind == 1">
						<span class="name">{{$t("security.verify[9]")}}</span>
						<span class="num">{{userData.config.google_verify == 0 ? $t("securityLa.googleYZ[0]") : $t("securityLa.googleYZ[1]")}}</span>
						<a href="javascript:;" class="modify modify2" @click="open(userData.config.google_verify)">{{userData.config.google_verify == 0 ? $t("securityLa.googleYZ[2]") : $t("securityLa.googleYZ[3]")}}</a>
						<span class="textTip">({{$t("security.tip[10]")}})</span>
					</li>
					<li class="lis" v-else>
						<span class="name">{{$t("security.verify[9]")}}</span>
						<span class="num">{{userData.config.google_verify == 0 ? $t("securityLa.googleYZ[0]") : $t("securityLa.googleYZ[1]")}}</span>
						<a href="javascript:;" class="modify modify2" @click="change_router('googleverify')">{{$t("security.verify[4]")}}</a>
						<span class="textTip">({{$t("security.tip[10]")}})</span>
					</li>

					<!-- 商家验证 -->
					<li class="lis">
						<span class="name">{{$t("security.tip[11]")}}</span>
						<span class="num" v-if="userData.is_shop == 1">{{$t("security.tip[6]")}}</span>
						<span class="num" v-if="userData.is_shop == 0">{{$t("security.tip[7]")}}</span>
						<span class="num" v-if="userData.is_shop == 2">{{$t("security.tips[4]")}}</span>
						<span class="num" v-if="userData.is_shop == 3">{{$t('securityLa.shangjia[0]')}}</span>
						<a href="javascript:;" class="modify modify2" @click="businessAttes(userData.is_shop)" v-if="userData.is_shop == '0'">{{$t("security.tip[14]")}}</a>
						<a href="javascript:;" class="modify modify2" @click="businessAttes(userData.is_shop)" v-if="userData.is_shop == '2'">{{ $t("security.tips[4]") }}</a> <!-- 正在审核 -->
						<a href="javascript:;" class="modify modify2" @click="businessAttes(userData.is_shop)" v-if="userData.is_shop == '3'">{{$t('securityLa.shangjia[1]')}}</a> <!-- 重新审核 -->
						<a href="javascript:;" class="modify modify2" @click="untyingBusinessAttes" v-if="userData.is_shop == '1'">{{$t("security.tip[13]")}}</a>
						<span class="textTip">({{$t("security.tip[12]")}})</span>
					</li>
				</ul>
			</div>
		</div>

		<!-- 支付方式 -->
		<div class="payment">
			<div class="payment_header">
				<h2>{{$t("security.paytype[0]")}}</h2>
				<p class="tishi">{{$t("security.paytype[1]")}}</p>
			</div>
			<div class="payment_cont">
				<div class="obox_null obox">
					<!-- <p>{{$t("security.paytype[2]")}}</p> -->
					<p class="add_pay" @click="add_pay(userData.config.payment_password_set)">{{$t("security.paytype[3]")}}</p>
				</div>
				<div class="obox_show obox" v-show="payMethod.length!=0">
					<ul class="lis_warp">
						<li class="lis" v-for="(v,k) in payMethod" v-if="v.id">
							<i v-if="v.type == 'wx'">
								<!-- <i class="icon iconfont icon-weixin wx"></i> -->
								<img src="../../assets/image/weixin-cw.png">
							</i>
							<i v-else-if="v.type == 'alipay'">
								<!-- <i class="icon iconfont icon-zhifubao alipay"></i> -->
								<img src="../../assets/image/zhifubao-icon.png">
							</i>
							<i v-else-if="v.type == 'backcard'">
								<!-- <i class="icon iconfont icon-yinhangka car"></i> -->
								<img src="../../assets/image/yinlian-icon.png">
							</i>
							<span class="type">{{v.tip}}</span>
							<span class="mobile">{{v.bank_car ? v.bank_car : v.number}}</span>
							<!-- <span class="name">{{v.name}}</span> -->
							<span class="eit" @click="edit(v.id,v.type,k)">{{$t('securityLa.zhifu[0]')}}</span>
							<!-- <span class="eit" @click="edit(v.id,v.type,k)" v-show="v.status == 1">修改</span> -->
							<!-- <span class="dis_eit" v-show="v.status == 0">修改</span> -->
							<el-switch v-model="v.status == 0 ? '1' : '0'" @change="changeSwitch(v.status , v.type)" active-value='0' inactive-value='1' :disabled="Switch[v.type]">
							</el-switch>
						</li>
					</ul>
					<!-- <div class="add_play"  @click="add_pay()" v-if="!payMethod.alipay.id && !payMethod.backcard.id && !payMethod.wx.id">
						<span>{{$t("security.paytype[3]")}}</span>
					</div> -->
				</div>
			</div>
		</div>
		<!-- 开启短信验证 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper duanxin" style="z-index: 2064;" :style="isPhone">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t('securityLa.shoujiYZ[6]')}}</span><!--添加支付方式-->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
						<i class="el-message-box__close el-icon-close" ></i>
					</button>
				</div>
				<div class="phone">
					<div>
						<p>{{$t('securityLa.shoujiYZ[7]')}}</p>
						<div class="getcode">
							<div class="input">
								<el-input v-model="openPhone.code" auto-complete="off" :placeholder="$t('securityLa.shoujiYZ[8]')"></el-input>
							</div>
							<div class="btn_code" @click="getCode()">
								<el-input type="button" :value="'| '+btnCode.time" :disabled='btnCode.disabled'></el-input>
							</div>
						</div>
						<div class="btnList">	
							<a href="javascript:;" class="quxiao" @click="close_moble">{{$t('securityLa.shoujiYZ[9]')}}</a>
							<a href="javascript:;" @click="submit('start')">{{$t('securityLa.shoujiYZ[10]')}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 关闭短信验证 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper duanxin" style="z-index: 2064;" :style="isPhone1">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t('securityLa.shoujiYZ[11]')}}</span><!--添加支付方式-->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
						<i class="el-message-box__close el-icon-close" ></i>
					</button>
				</div>
				<div class="phone">
					<div>
						<p>{{$t('securityLa.shoujiYZ[12]')}}</p>
						<div class="getcode">
							<div class="input">
								<el-input v-model="openPhone.code" auto-complete="off" :placeholder="$t('securityLa.shoujiYZ[13]')"></el-input>
							</div>
							<div class="btn_code" @click="getCode()">
								<el-input type="button" :value="'| '+btnCode.time" :disabled='btnCode.disabled'></el-input>
							</div>
						</div>
						<div class="btnList">	
							<a href="javascript:;" class="quxiao" @click="close_moble">{{$t('securityLa.shoujiYZ[14]')}}</a>
							<a href="javascript:;" @click="submit('stop')">{{$t('securityLa.shoujiYZ[15]')}}</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 开启谷歌验证 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="isGoogle"><!--提示-->
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t("security.log[0]")}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="hideGoogle">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<el-form label-position="top" :model="googleAttes" status-icon :rules="rulesGoogle" ref="googleAttes" label-width="100px" class="demo-ruleForm">
						<el-form-item :label='$t("security.log[2]")'>
							<el-input type="text" v-model="googleAttes.googleCode" auto-complete="off" :placeholder='$t("security.log[3]")'></el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button type="primary" class="btn_confirm" @click="confirmGoogle('start')">{{$t("security.log[6]")}}</el-button>
							<el-button type="primary" plain class="btn_cancel" @click="hideGoogle">{{$t("security.log[7]")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>

		<!-- 关闭谷歌验证 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="noGoogle"><!--提示-->
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t("security.log[1]")}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="hideGoogle">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<el-form label-position="top" :model="googleAttes2" status-icon :rules="rulesGoogle2" ref="googleAttes2" label-width="100px" class="demo-ruleForm">
						<el-form-item :label='$t("security.log[2]")'>
							<el-input type="text" v-model="googleAttes2.googleCode" auto-complete="off" :placeholder='$t("security.log[3]")'></el-input>
						</el-form-item>
						<el-form-item :label="$t('securityLa.googleYZ[4]')" style="margin-top:-10px;">
							<el-input type="text" v-model="googleAttes2.code" auto-complete="off" :placeholder='$t("security.log[5]")'></el-input>
							<span id="send" @click="getCode()" :disabled="btnCode.disabled">{{btnCode.time}}</span>
						</el-form-item>
						<el-form-item class="btns">
							<el-button type="primary" class="btn_confirm" @click="confirmGoogle('stop')">{{$t("security.log[6]")}}</el-button>
							<el-button type="primary" plain class="btn_cancel" @click="hideGoogle">{{$t("security.log[7]")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>

		<!-- 商家认证 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="isBuiness">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t("apply.shenqing[0]")}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="hideBuiness">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="content_text">
						<p class="content_text_title">{{$t("apply.shenqing[1]")}}</p>
						<p class="content_text_cont">{{$t("apply.shenqing[2]")}}</p>
					</div>
					<div class="content_text">
						<p class="content_text_title">{{$t("apply.shenqing[3]")}}</p>
						<p class="content_text_cont">{{$t("apply.shenqing[4]")}}</p>
					</div>
					<el-checkbox v-model="checked" name="type">同意冻结{{shopFee.fb_shop}}USDT为保证金</el-checkbox>
					<div class='btns'>
						<el-button type="primary" class="btn_confirm" :disabled="checked?false:true" @click="confirmBuiness">{{$t("apply.alse[0]")}}</el-button>
						<el-button type="primary" plain class="btn_cancel" @click="hideBuiness">{{$t("apply.alse[1]")}}</el-button>
					</div>
				</div>

			</div>
		</div>

		<!-- 添加支付方式 -->
		<div role="dialog" aria-modal="true" class="el-message-box__wrapper" style="z-index: 2064;" :style="isDisplay">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word" v-if="isshow">{{$t("security.paytype[5]")}}</span><!--添加支付方式-->
						<span class="el-message-box__word" v-if="!isshow">{{$t("security.paytype[6]")}}</span><!--修改支付方式-->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_moble()">
						<i class="el-message-box__close el-icon-close" ></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="el-message-box_paytype">{{$t("security.paytype[0]")}}</div>
					<el-select v-model="select_value" :placeholder="$t('securityLa.zhifu[1]')" @change='change(select_value)' :disabled='dis'>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<router-view/>
				</div>

			</div>
		</div>
		<div class="v-modal" tabindex="0" style="z-index: 2063;" :style="isDisplay"></div>
	</div>
</template>
<script>
	export default {
		data() {
			var codeRule = (rule, value, callback) => {
				if(!value) {
					return callback(new Error(this.$t("googleverify.list[6]")));
				} else {
					callback();
				}
			};
			var validatecode = (rule, value, callback) => {
				if(!value) {
					callback(new Error(this.$t("googleverify.list[7]")));
				} else {
					callback();
				}
			};

			return {
				options: [{
					value: 'backcard',
					label: this.$t("security.mode[0]"),//银行卡
				}, {
					value: 'wx',
					label: this.$t("security.mode[1]"),//微信
				}, {
					value: 'alipay',
					label: this.$t("security.mode[2]"),//支付宝
				}],
				select_value: 'backcard', //初始显示标志位
				dis:false,   //支付方式是否可改标志位
				activeName: 'first',
				isGoogle: "display: none",
				noGoogle: "display: none",
				isDisplay: 'display: none', 
				isPhone:'display:none',
				isPhone1:'display:none',
				openPhone:{
					key:'',
					code:'',
				},
				usdt: '',//保证金
				userData: {
					config:{
						payment_password_set:0
					}
				},//用户个人信息
				primarySenior: false,
				primarySenior2: false,
				zhanghu:'',
				shopFee:{fb_price:'',fb_shop:''},//成为商家的价格
				//Payment method 支付方式列表
				payMethod: {
				alipay: {},
				backcard: {},
				wx: {},
				},
				register_type:'',
				isshow:true,
				googleAttes: {
					googleCode: ''
				},
				googleAttes2: {
					googleCode: '',
					code: ''
				},
				rulesGoogle: {
					googleCode: [
						{ validator: codeRule, trigger: 'blur' }
					]
				},
				rulesGoogle2: {
					googleCode: [
						{ validator: codeRule, trigger: 'blur' }
					],
					code: [
						{ validator: validatecode, trigger: 'blur' }
					]
				},
				isBuiness: 'display:none',
				checked: false,
				btnCode: {
					time: this.$t('googleverify.list[5]'), //倒计时 获取验证码
					disabled: false
				},
				phone:'',
				Switch:[],
			};
		},
		methods: {
			personJump(){
				var _this = this;
				// alert(this.userData.status)
				if(this.userData.authentication == 0){
					this.change_router('/changePerson2')
				}
				if(this.userData.authentication == 1){
					_this.$public.msg(_this.$t('securityLa.shenfenYZ[1]'),'success',_this);
				}
				if(this.userData.authentication == 2){
					_this.$public.msg(_this.$t('securityLa.shenfenYZ[2]'),'success',_this);
				}
				if(this.userData.authentication == 3){
					this.change_router('/changePerson2')
				}
			},
 
			getData() {
				var _this = this;
				//个人中心数据
				_this.$http.get(_this.$http.details, {params:{}}).then(function(res) {
					_this.userData = res.data.data;
					// sessionStorage.clear() 
					// sessionStorage.userData = JSON.parse(res.data.data);
				}).catch(function(error) {});
			},
			//获得支付方式列表
			getPayList(){
				var _this = this;
				_this.$http.post(_this.$http.payList, {}).then(function(res) {
					if(res.data.code == "200") {
						_this.payMethod = res.data.data.status;
					} else {
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			//获取成为商家的价格
			getShop(){
				var _this = this;
				_this.$http.post(_this.$http.commonData, {}).then(function(res) {
				  if(res.data.code == '200') {
					_this.shopFee = res.data.data;
				 }
				})
			},
			//谷歌验证弹框
			open(val){
				var _this = this;
				if(val==0){
					_this.showGoogle();
				}else if(val==1){
					_this.closeGoogle();
				}
			},
			// 开启谷歌认证
			showGoogle() {
				var _this = this;
				_this.isGoogle = "display:block;"
				_this.googleAttes.googleCode = ''
			},
			// 关闭谷歌认证
			closeGoogle() {
				var _this = this;
				_this.noGoogle = "display:block;"
				_this.googleAttes.googleCode = ''
			},

			//短信验证弹框
			phoneOpen(val){
				var _this = this;
				if(val == '0 '){
					_this.isPhone = 'display:block'
					return ;
				}else if(val == '1'){
					_this.isPhone1 = 'display:block'
				}
			},
			//开启关闭短信验证
			submit(key){
				var _this = this;
				if(!_this.openPhone.code){
					_this.$public.msg(_this.$t('securityLa.shoujiYZ[8]'), 'warning', _this);
					return ;
				}
				_this.openPhone.key = key;
				_this.$http.post(_this.$http.smsVerifyStart,_this.openPhone).then(function(res) {
					if(res.data.code == '200') {
						if(key == 'stop'){
							_this.$public.msg(_this.$t('securityLa.googleYZ[5]'), 'success', _this);
						}else if(key == 'start'){
							_this.$public.msg(_this.$t('securityLa.googleYZ[6]'), 'success', _this);
						}
						_this.getData();
						_this.isDisplay = 'display:none';
						_this.isPhone = 'display:none';
						_this.isPhone1 = 'display:none';
						_this.openPhone.code = '',
						_this.btnCode.disabled = false;
					}else{
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
				})
			},
			// 隐藏谷歌认证
			hideGoogle() {
				var _this = this;
				_this.isGoogle = "display:none;"
				_this.noGoogle = "display:none;"
				_this.googleAttes.googleCode = ''
				_this.googleAttes2.googleCode=''
				_this.googleAttes2.code=''
			}, 
			confirmGoogle(val) {
				var _this = this;
					let data={
						key: val,
						google_code: _this.googleAttes.googleCode
					}
					if(_this.googleAttes.googleCode){
						data.google_code = _this.googleAttes.googleCode
					}else{
						data.google_code = _this.googleAttes2.googleCode
					}
					_this.$http.post(_this.$http.googleVerifyStart,data).then(function(res){
						if(res.data.code=='200'){
							_this.$public.msg(res.data.msg, 'success', _this);
							_this.getData();
						}else{
							_this.$public.msg(res.data.msg, 'error', _this);
							_this.getData();
						}
						_this.hideGoogle();
					})
			},
			getCode() {
				var _this = this;
				var mobile = _this.userData.phone;
				_this.btnCode.disabled = true;
					_this.type=1;
					_this.$http.post(_this.$http.sendSms, {
						phone: mobile,
						area_code:_this.userData.area_code,
					}).then(function(response) {
						if(response.data.code == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							_this.$public.setTime(_this); //倒计时函数封装
						} else {
							_this.btnCode.disabled = false;
							_this.$public.msg(response.data.msg, 'warning', _this);
						}
					}).catch(function(error) {});	
			},
			confirmGoogle2() {
				var _this = this;
				var mobile = sessionStorage.mobile;
				_this.$refs['googleAttes2'].validate((valid) => {
					if(valid) {
						let data={
							act: 0,
							dyGoodleCommand: _this.googleAttes2.googleCode,
							code: _this.googleAttes2.code,
							mobile: mobile
						}
						_this.$http.post(_this.$http.set_google_state,data).then(function(res){
							if(res.data.status=='200'){
								_this.$public.msg(res.data.msg, 'success', _this);
								_this.getData();
							}else{
								_this.$public.msg(res.data.msg, 'error', _this);
								_this.getData();
							}
							_this.hideGoogle();
						})
					}
				})
			},
			// 商家认证
			businessAttes(val) {
				var _this = this;
				if(_this.userData.authentication != 2){
					_this.$public.msg(_this.$t('securityLa.shangjia[4]'), 'warning', _this);
					return ;
				}
				if(val == 2){
					_this.$public.msg(_this.$t('securityLa.shangjia[5]'), 'warning', _this);
					return ;
				}
				if(val == 3){
					_this.$public.msg(_this.$t('securityLa.shangjia[6]'), 'warning', _this);
					return ;
				}
				if(val == 0){
					_this.isBuiness = "display:block";
					return ;
				}
			},
			confirmBuiness() {
				var _this = this;
				_this.$http.post(_this.$http.addShop,{}).then(function(res){
					if(res.data.code == "200") {
						_this.$public.msg(res.data.msg, 'success', _this);
						_this.getData();
					} else {
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
					_this.hideBuiness();
				})
			},
			hideBuiness() {
				var _this = this;
				_this.isBuiness = "display:none";
			},
			// 解绑商家认证
			untyingBusinessAttes() {
				var _this = this;
				this.$confirm(_this.$t("security.tips[0]"), _this.$t("security.tips[1]"), {
						confirmButtonText: _this.$t("security.tips[2]"),
						cancelButtonText: _this.$t("security.tips[3]"),
						type: 'warning'
					}).then(() => {
						this.$http.post(this.$http.delShop, {}).then(res => {
							if (res.data.code == "200") {
								this.$public.msg(res.data.msg, 'success', this);
								this.getData();
							} else {
								this.$public.msg(res.data.msg, 'warning', this);
							}
						}).catch(err => {})
					}).catch(() => {
				});
			},
			//点击修改密码路由跳转
			change_router(whitch) {
				var _this = this;
				if(whitch == 'changeopwd' && _this.userData.config.sms_verify == 0 && _this.userData.config.google_verify==0){
					_this.$public.msg(_this.$t('securityLa.googleYZ[7]'), 'warning', this);
					return ;
				}else if(whitch == 'changetpwd2' && _this.userData.config.sms_verify == 0 && _this.userData.config.google_verify==0){
					_this.$public.msg(_this.$t('securityLa.googleYZ[8]'), 'warning', this);
					return ;
				}
				_this.$router.push({
					path: whitch
				})
			},
			//添加支付方式执行函数
			add_pay(status) {
				var _this = this;
				if (status == 0) {
					_this.$public.msg(_this.$t('securityLa.googleYZ[9]'), 'warning', this);
					return
				} else {
					if(_this.userData.authentication == 0){
						_this.$public.msg(_this.$t('securityLa.shenfenYZ[6]'), 'warning', _this);
						return;
					}
					if(_this.userData.authentication == 1){
						_this.$public.msg(_this.$t('securityLa.shenfenYZ[7]'), 'warning', _this);
						return;
					}
					_this.dis = false;  //支付方式可修改
					_this.isshow=true;
					if(_this.userData.status == '1' || _this.userData.status == '4' ) {
						_this.$confirm(_this.$t("security.addpay[0]"), _this.$t("security.addpay[1]"), {//您还没有通过身份认证, 前往身份认证?
							confirmButtonText: _this.$t("security.addpay[2]"),
							cancelButtonText: _this.$t("security.addpay[3]"),
							type: 'warning'
						}).then(() => {
							_this.$public.go('changePerson1',10,_this);
						}).catch(() => {
							_this.$message({
								type: 'info',
								message: _this.$t("security.addpay[4]")
							});
						});
						return false;

					}else if(_this.userData.status =='2' ){ //待审核
						_this.$public.msg(_this.$t("security.addpay[5]"), 'warning', _this);
						return false;
					}
					if(_this.userData.tpwd == ''){ // 请先设置资金密码
						// _this.$public.confirm('请先设置资金密码', "changetpwd", _this);
						_this.$public.confirm(_this.$t("apply.judge[6]"), 'changetpwd2', _this);
						return false;
					}
					_this.select_value = 'backcard'; // 初始显示标志位			
					_this.isDisplay = 'display:block';
					_this.$router.push({
						name: 'backcard',
						query: {
							type: 'bankcard?name='+_this.userData.name
						}
					})
				}
			},
			//关闭弹框
			close_moble() {
				var _this = this;
				_this.isDisplay = 'display:none';
				_this.isPhone = 'display:none';
				_this.isPhone1 = 'display:none';
				_this.openPhone.code = '';
				_this.btnCode.disabled = false;
				_this.$router.push({
					path: '/security',
				})
			},
			//下拉框改变执行函数
			change(value) {
				var _this = this;
				_this.$router.push({
					path: value,
					query: {
						type: value
					}
				})
			},
			//开关执行函数
			changeSwitch(switch_value, type) {
				var _this = this;
				_this.Switch[type] = true;
				if(switch_value == 1){
					switch_value = 0
				}else if(switch_value == 0){
					switch_value = 1
				}
				_this.$http.post(_this.$http.setPayStatus, {
					type: type,
					val: switch_value
				}).then(function(response) {
					if(response.data.code == "200") {
						//						_this.$public.msg(response.data.msg, 'success', _this);
						_this.$public.msg(_this.$t("securityLa.tip[0]"), 'success', _this);
						_this.getPayList();
						_this.Switch[type] = false;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
						_this.Switch[type] = false;
					}	 
				}).catch(function(error) {});

			},
			changeGoogle(status){
				const _this=this;
				let data={
					act:status
				}
				_this.$http.post(_this.$http.set_google_state,data).then(function(res){
					if(res.data.status=='200'){
						_this.$public.msg(res.data.msg, 'success', _this);
						_this.getData();
					}else{
						_this.$public.msg(res.data.msg, 'error', _this);
						_this.getData();
					}
				})
			},
			//编辑执行函数
			edit(id, type, k) {
				var _this = this;
				_this.dis = true;  //支付方式不可修改
				_this.isshow=false;
				if(_this.payMethod[k].status == 0) {
					_this.$public.msg(_this.$t("security.edit[0]"), 'warning', _this);
					return false;
				}
				_this.isDisplay = 'display:block';
				if(type=='bankcard'){
					type='backcard';
				}
				_this.select_value = type;

				_this.$router.push({
					name: type,
					query: {
						type: type,
						id: id
					}
				})
			},
		},
		created: function() {
			var _this = this;
			// _this.getData();
			// _this.$public.scrollTop(); //返回但最顶部函数
			// _this.zhanghu=_this.$public.phoneEncryption(sessionStorage.getItem('mobile'));
			// _this.register_type	= sessionStorage.getItem('register_type');	
			// _this.close_moble();
			// _this.userData = JSON.parse(sessionStorage.userData);
		},
		mounted:function () {
			var _this = this;
			// _this.getData();
			// _this.phone = _this.$public.phoneEncryption(_this.userData.phone)
			// _this.getPayList();
			// _this.getShop();
		},
		watch: {
			'$route': function(route) {
				var _this = this;
				_this.getData();
				_this.userData.phone = _this.$public.phoneEncryption(_this.userData.phone)
				_this.getPayList();
				if(route.query.flat == 'ok') {
					_this.isDisplay = 'display:none';
				}
			},
		}

	};
</script>
<style lang="less" scoped>
	.index_main {
		background: #FFFFFF;
	}
	
	.el-message-box__wrapper {
		z-index: 1000 !important;
	}
	
	.el-message-box {
		width: 460px;
	}
	
	.v-modal {
		z-index: 999 !important;
	}
	.el-message-box__word{
		color: #6b79fb;
	}
	
	.el-select {
		left: 20px;
	}
</style>