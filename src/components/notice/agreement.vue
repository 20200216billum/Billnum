<style lang=less>
	@import '../../assets/public.less';
	@import './agreement.less';
	.el-card__body{
		padding: 20px 40px;
	}
</style>

<template lang="html">
	<div class="agreement_text_wrapper">		
		<div class="agreement_text_container">
			<el-card class="box-card">
				<div class="title">{{$t('agreement.list[0]')}}</div>
				<div class="titleContent">{{$t('agreement.list[1]')}}</div>
			</el-card>
			<!-- <el-header class="top">
				<el-card class="box-card">
					<div class="title" v-if="$cookies.get('language') == 'Chinese'">{{ routerData.name_cn }}</div>
					<div class="title" v-else>{{ routerData.name_en }}</div>
				</el-card>
			</el-header> -->
			<!-- <div class="img" v-if="$cookies.get('language') == 'Chinese'">
				<img src="../../assets/image/yhxy.jpg" v-show="routerData.type=='reg_agree'"/>用户协议
				<img src="../../assets/image/ystk.jpg" v-show="routerData.type=='trans_agree'"/>隐私条款
				<img src="../../assets/image/yhxy.jpg" v-show="routerData.type=='jygz'"/>交易规则
				<img src="../../assets/image/aboutus.jpg" v-show="routerData.type=='faq'"/>关于我们
				<img src="../../assets/image/aboutus.jpg" v-show="routerData.type=='fxq'"/>关于反洗钱
			</div> -->
			<!-- <div class="img" v-else>
				<img src="../../assets/image/yhxy1.jpg" v-show="routerData.type=='reg_agree'"/>用户协议
				<img src="../../assets/image/ystk1.jpg" v-show="routerData.type=='trans_agree'"/>隐私条款
				<img src="../../assets/image/yhxy1.jpg" v-show="routerData.type=='jygz'"/>交易规则
				<img src="../../assets/image/aboutus1.jpg" v-show="routerData.type=='faq'"/>关于我们
				<img src="../../assets/image/aboutus1.jpg" v-show="routerData.type=='fxq'"/>关于反洗钱
			</div> -->
			<el-card class="box-card agreement_text_content">
				<div class="content_title">
					<!-- 用户协议 -->
					<div :class="{'selectTitle': routerData.type == 'reg_agree'}" @click="selectTitle('reg_agree')">{{$t('agreement.list[2]')}}</div>
					<!-- 隐私条款 -->
					<div :class="{'selectTitle': routerData.type == 'trans_agree'}" @click="selectTitle('trans_agree')">{{$t('agreement.list[3]')}}</div>
					<!-- 交易规则 -->
					<div :class="{'selectTitle': routerData.type == 'jygz'}" @click="selectTitle('jygz')">{{$t('agreement.list[4]')}}</div>
					<!-- 关于我们 -->
					<div :class="{'selectTitle': routerData.type == 'faq'}" @click="selectTitle('faq')">{{$t('agreement.list[5]')}}</div>
					<!-- 关于反洗钱 -->
					<div :class="{'selectTitle': routerData.type == 'fxq'}" @click="selectTitle('fxq')">{{$t('agreement.list[6]')}}</div>
					<!-- 问题反馈 -->
					<div :class="{'selectTitle': routerData.type == 'wtfk'}" @click="selectTitle('wtfk')">问题反馈</div>
				</div>
				<div class="content" v-show="!isshow" v-html="requestData"></div>
				<div class="content" v-if="request= 1">
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			routerData:{},
			requestData:'数据加载中...',
			isshow:null,
			request:'',
		}
	},
	methods: {
			// 协议数据请求
			requestPublic: function() {
				var _this = this;
				// if(_this.routerData.type == 'fxq'){
				// 	_this.isshow = 'fxq'
				// 	return false;
				// }else if(_this.routerData.type == 'jygz'){
				// 	_this.isshow = 'jygz'
				// 	return false;
				// }
				let types=_this.$cookies.get('language') == 'Chinese'?'zh':'en';
				let _data={
					key:'aboutuscn' ,
				}
				_this.$http.get(_this.$http.aboutuscn, {params:{}}).then((res) => {
					if(res.data.code=='200'){
						if(_this.routerData.type == 'reg_agree'){
							_this.requestData = res.data.data.reg_agree;
						}if(_this.routerData.type == 'trans_agree'){
							_this.requestData = res.data.data.trans_agree;
						}if(_this.routerData.type == 'jygz'){
							_this.requestData = res.data.data.trade_agree;
						}if(_this.routerData.type == 'fxq'){
							_this.requestData = res.data.data.aml;
						}if(_this.routerData.type == 'faq'){
							_this.requestData = res.data.data.faq;
						}if(_this.routerData.type == 'wtfk'){
							_this.request = 1;
						}
					}
				});
			},
			// 选择内容
			selectTitle: function (type) {
				var _this = this;
				_this.routerData.type = type;
				_this.requestPublic();
			}
		},
		created: function() {
			var _this = this;
			_this.routerData = _this.$route.query;
			_this.requestPublic();
			window.scrollTo(0,0);  //回到顶部
		},
		watch: {
			'$route.query.type': function () {
				var _this = this;
				window.scrollTo(0,0);  //回到顶部
				_this.routerData = _this.$route.query;
				_this.requestPublic();
			}
		}
		
	}
	</script>
	