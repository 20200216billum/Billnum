<style lang=less>
	@import '../../../assets/public.less';
	@import './chongBit.less';

	.EOSTIT {
		padding-top: 20px;
	}

	.EOSright {
		width: 50% !important;
	}

	#EOSInput {
		height: 60px;
		background: #2B2B2B;
		color: #fff;
		width: 30%;
		border: none;
		outline: none;
		font-size: 16px;
		padding-left: 10px;
		border-radius: 4px;
	}
</style>
<template>
	<div class="chong_bit_wrapper">
		<div class="chong_bit_container">
			<h4>{{$t('Gic.addCoin[6]')}}</h4>
			<div class="chong_bit_body">
				<!-- 二维码 -->
				<div class="body_code">
					<p>{{$t('Gic.chongbit[0]')}}</p>
					<img :src="requestData.qrcode" alt="">
				</div>
				<!-- 充币地址 -->

				<div class="address">
					<p>{{$t('Gic.chongbit[1]')}}</p>
					<input class="left" :value="requestData.address" id="addInput" readonly
						:placeholder='$t("chongBit.list[14]")' />

					<!-- <p class="right">
						<span @click="copy('addInput')">{{$t("chongBit.list[3]")}}</span>
						<span type="text" @click="open5">{{$t("chongBit.list[4]")}}</span>
					</p> -->
				</div>
				<p class="public_font seeRecord">
					{{$t('Gic.chongbit[2]')}}
					<a @click="seeRecord" style="cursor: pointer;">{{$t('Gic.chongbit[3]')}}</a>
					{{$t('Gic.chongbit[4]')}}
				</p>
				<!-- 温馨提示 -->
				<div class="Tips">
					<p class="public_font1">{{$t('Gic.chongbit[5]')}}:</p>
					<ul class="list">
						<li>{{$t('Gic.chongbit[6]')}}</li>
						<!-- 请勿向上述地址充值任何非{{pname}}资产，否则资产将不可找回! -->
						<li>{{$t('Gic.chongbit[7]')}}</li>
						<!-- 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。 -->
						<li>{{$t('Gic.chongbit[8]')}}</li>
						<!-- 您的充值地址不会经常改变，可以重复充值,如有更改，我们会尽量通过网站公告或邮件通知您。 -->
						<li>{{$t('Gic.chongbit[9]')}}</li>
						<!-- 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。 -->
					</ul>
				</div>





			</div>

		</div>
	</div>
</template>
<script>
	// import Header from "../../header/heaer.vue";
	// import Footer from "../../footer/footer.vue";
	export default {
		data() {
			return {
				requestData: {},
				pid: '', //页面传值
				pname: '',
				coin_type: '',
				codeList: [],
				code: ""
			}
		},
		watch: {
			// 'pid'(n, o) {
			// 	this.getAdress(n)
			// }
		},
		methods: {
			//获取充币地址信息
			getAdress(pid) {
				this.$http.post(this.$http.walletRecharge, { type: pid }).then((r) => {
					if (r.data.code == 200) {
						this.requestData = r.data.data
					} else {
						this.public.msg(r.data.msg, 'error', this)
					}
				})
			},
			changeCodeType(val) {
				this.code = val
			},
			seeRecord() {
				var _this = this;
				_this.$router.push({
					path: '/moneyRecord',
					query: {
						pid: _this.pid
					}
				});
			},
			getRechargeType() {
				this.$http.get(this.$http.getRechargeType, {}).then((r) => {
					if (r.data.code == 200) {
						this.codeList = r.data.data
						this.$route.query.id ? false : this.code = this.codeList[0]
					} else {
						this.$public.msg(r.data.msg, 'error', this)
					}
				})
			},

			copy: function (para) { // 复制函数
				var _this = this;
				var ele = document.getElementById(para);
				ele.select();
				document.execCommand("Copy");
				_this.$public.msg(_this.$t("chongBit.tips[0]"), 'success', _this); //复制成功
			},
			addFocus: function (para) {
				var _this = this;
				var ele = document.getElementById(para);
				ele.setAttribute('disabled', 'disabled');
			},
			addOut: function (para) {
				var _this = this;
				var ele = document.getElementById(para);
				ele.removeAttribute('disabled');
			},
			open5: function () { // 提示二维码函数
				var _this = this;
				var urls = this.$http.bases;
				this.$alert('<div class="cbCodeDiv"><img class="codeImg" src="' + this.requestData.qrcode + '" alt="" /></div>', _this.$t("chongBit.tips[1]"), { //二维码
					dangerouslyUseHTMLString: true,
					callback: action => { }
				});
			}
		},
		created: function () {
			var _this = this;
			_this.pid = _this.$route.query.id;
			_this.getAdress(_this.pid);
			$(".chong_bit_block .chong_toggle").click(() => {
				$(this).addClass("on").siblings().removeClass("on");
			})
			// this.code = this.$route.query.id
			// console.log(this.$route.query.id)
		},

	}
</script>