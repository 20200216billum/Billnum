<style lang="less">
	@import '../../assets/public.less';
	@import './invite_friends.less';
</style>
<template>
	<div class="invite_friends_main">
		<!--<div class="big_ad">
			<img src="../../../assets/image/banner-1.jpg" />
		</div>-->
		<div class="cont_friends_warp">
			<div class="main_style">
				<!--<div class="header_public_style">
					<div class="title">
						<h2> 我的分享方式</h2>
					</div>
				</div>-->
				<div class="cont_public_style">
					<!-- <div class="tj_porter tj">
						<h3>{{$t("inviteFriends.list[0]")}}</h3>专属二维码海报
						<div class="btn" @click="choose_pro">{{$t("inviteFriends.list[1]")}}</div>选择你的专属海报
					</div> -->
					<div class="tj_code tj">
						<h3>{{$t("inviteFriends.list[2]")}}</h3><!-- 专属邀请码 -->
						<div class="btn">
							<!--<span class="mycode">igig55</span>-->
							<input type="text" :value="userData.account" class="mycode" id="code" />
							<span class="copy" @click="copy('code')">{{$t("inviteFriends.list[3]")}}</span><!-- 复制邀请码 -->
						</div>
					</div>
					<div class="tj_link tj">
						<h3>{{$t("inviteFriends.list[4]")}}</h3><!-- 专属注册链接 -->
						<div class="btn">
							<!--<span class="mylink">igikdshgssssssssssssssbffigikdsshgbf</span>-->
							<input type="text" :value="userData.link" class="mylink" id="link" />
							<span class="copy" @click="copy('link')">{{$t("inviteFriends.list[5]")}}</span><!-- 复制链接分享 -->
						</div>
					</div>

				</div>
				<!--<div class="share">
					<iframe :src="iframeurl" width="220px" height="90px"></iframe>
				</div>-->
			</div>
			<div class="ads" style="display: none;"></div>
			<div class="statistical">
				<div class="people statistical">
					<h2>{{$t("inviteFriends.yaoqing[0]")}}&nbsp;&nbsp;&nbsp;{{userData.tg_td_num}}</h2><!-- 邀请人数 -->
					<p>
						{{$t("inviteFriends.yaoqing[1]")}}<!-- 邀请总人数 -->
						<span class="num">{{userData.tg_sum}}</span>
					</p>
				</div>
				<div class="commission statistical" style="display: none;">
					<h2>{{$t("inviteFriends.yaoqing[2]")}}</h2>获得返佣
					<p>
						USDT
						<span class="num">10000</span>
					</p>  

				</div>
				<div class="all statistical" style="display: none;">
					<p class="span_warp">
						<span>{{$t("inviteFriends.yaoqing[3]")}}</span>点卡数
						<span class="num">0.002452211</span>
					</p>
				</div>
			</div>
			<div class="record" style="display: none;">
				<div class="main_style">
					<div class="header_public_style">
						<div class="title">
							<h2 :style="changeColor.color1" @click="jilu(1)"> {{$t("inviteFriends.yaoqing[4]")}}</h2><!-- 邀请记录 -->
							<h2 :style="changeColor.color2" @click="jilu(2)">{{$t("inviteFriends.yaoqing[5]")}}</h2><!-- 返佣记录 -->
						</div>
					</div>
					<div class="cont">
						<p style="text-align: center; margin-top: 30px;">{{$t("inviteFriends.yaoqing[6]")}}</p><!-- 这里是数据 -->
					</div>
				</div>
			</div>
			<div class="rules" style="display: none;">
				<div class="rules_style">
					<div class="rules_public_style">
						<div class="title">
							<h2>{{$t("inviteFriends.yaoqing[8]")}}</h2><!-- 活动细则 -->
						</div>
						<div class="lis_warp">
							<ul>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>
								<li class="lis">1.65468414647874</li>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--弹框-->
		<div tabindex="-1" role="dialog" aria-modal="true" aria-label="HTML 片段" class="el-message-box__wrapper model_warp" :style="isDiplay" style="z-index: 2065;">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span>{{$t("inviteFriends.down[0]")}}</span><!-- 下载发给好友 -->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="close_model">
						<i class="el-message-box__close el-icon-close" @click="close_model"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="el-message-box__message">
						<img :src="userData.updownImg" alt="专属海报" /><!-- 专属海报 -->
					</div>
					<div class="el-message-box__input" style="display: none;">
						<div class="el-input">
							<input type="text" autocomplete="off" placeholder="" class="el-input__inner">
						</div>
						<div class="el-message-box__errormsg" style="visibility: hidden;"></div>
					</div>
				</div>
				<div class="el-message-box__btns">
					<button type="button" class="el-button el-button--default el-button--small el-button--primary ">
						<span>
							<a href="javascript:;" @click="downloadImg()" id="downLoad">{{$t("inviteFriends.down[1]")}}</a><!-- 下载海报 -->
						</span>
					</button>
					
					<p class="tishi">{{$t("inviteFriends.down[2]")}}</p><!-- 如点击下载无效，请单击鼠标右键图片另存为到本地 -->
				</div>
			</div>
		</div>
		<div class="v-modal" tabindex="0" style="z-index: 2064;" :style="isDiplay"></div>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				isDiplay: 'display:none', //控制显示model影响
				iframeurl: './static/share/share.html',
				changeColor: {
					color1: 'color:#409EFF',
					color2: 'color:##606266'
				},
				userData: {
					updownImg: '',
					account: '', //邀请码
					link: '', //邀请链接
					tg_sum:'',//总人数
					tg_td_num:''//今日邀请总人数
				}
			}
		},
		methods: {
			//数据请求
			getData() {
				
				var _this = this;
				_this.$http.post(_this.$http.link,{}).then(function(response) {
					if(response.data.status == "200") {	
						_this.userData.updownImg = response.data.data.qrc;
						_this.userData.link = response.data.data.url;
						sessionStorage.linkUrl = response.data.data.url;
						_this.userData.account = response.data.data.tgno;
						_this.userData.tg_sum=response.data.data.tg_sum;
						_this.userData.tg_td_num=response.data.data.tg_td_num;
					} else {}
				}).catch(function(error) {});
			},
			//点击专属海报按钮
			choose_pro() {
				var _this = this;
				_this.isDiplay = 'display:block'
			},
			//关闭弹框
			close_model() {
				var _this = this;
				_this.isDiplay = 'display:none'
			},
			//tab切换
			jilu(i) {
				var _this = this;
				if(i == 1) {
					_this.changeColor = {
						color1: 'color:#409EFF',
						color2: 'color:#606266'
					}
				} else {
					_this.changeColor = {
						color2: 'color:#409EFF',
						color1: 'color:#606266'
					}
				}
			},
			//复制信息
			copy(whitch) {
				var _this = this;
				var ele = document.getElementById(whitch);
				ele.select();
				document.execCommand("Copy");
				_this.$public.msg(_this.$t("inviteFriends.tips"), 'success', _this);//复制成功

			},
			//下载壁纸到桌面
			downloadImg() {
				this.oDownLoad(this.userData.updownImg);
				//判断浏览器类型

			},
			oDownLoad(url) {
				var _this = this;
				var odownLoad = document.getElementById("downLoad");
				_this.myBrowser();
				if(_this.myBrowser() === "IE" || _this.myBrowser() === "Edge") {
					//IE
					odownLoad.href = "#";
					var oImg = document.createElement("img");
					oImg.src = url;
					oImg.id = "downImg";
					var odown = document.getElementById("down");
					odown.appendChild(oImg);
					SaveAs5(document.getElementById('downImg').src)
				} else {
					//!IE
					odownLoad.href = url;
					odownLoad.download = "";
				}
			},
			SaveAs5(imgURL) {
				var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
				for(; oPop.document.readyState != "complete";) {
					if(oPop.document.readyState == "complete") break;
				}
				oPop.document.execCommand("SaveAs");
				oPop.close();
			},
			myBrowser() {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
				var isOpera = userAgent.indexOf("Opera") > -1;
				if(isOpera) {
					return "Opera"
				}; //判断是否Opera浏览器
				if(userAgent.indexOf("Firefox") > -1) {
					return "FF";
				} //判断是否Firefox浏览器
				if(userAgent.indexOf("Chrome") > -1) {
					return "Chrome";
				}
				if(userAgent.indexOf("Safari") > -1) {
					return "Safari";
				} //判断是否Safari浏览器
				if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
					return "IE";
				}; //判断是否IE浏览器
				if(userAgent.indexOf("Trident") > -1) {
					return "Edge";
				} //判断是否Edge浏览器
			}
		},
		mounted: function() {
			this.getData();

		},
	}
</script>

<style scoped="scoped">
.tishi{
	color: #909399;
	font-size: 12px;
	text-align: center;
	margin-top: 12px;
}
</style>