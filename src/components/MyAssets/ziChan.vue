<style lang=less>
	@import '../../assets/public.less';
	@import './ziChan.less';
</style>
<template lang="html">
	<div class="zi_chan_wrapper">
		<HeaDer></HeaDer>
		<div class="zi_chan_container">
			<div class="clearfix">
				<div class="top_left" :class="isLeft ? 'left_right_on' : ''" @click="toggleTop(0)">
					<div class="clearfix top_top">
						<span>{{ $t('ziChan.list1[0]') }}</span> <!-- 交易账户 -->
						<span>{{ $public.toLowFixed(zc_total.ttl_money,4,0) }} USDT</span>
					</div>
					<div class="top_content">
						<ul class="t_c_ul">
							<li>
								<p class="t_c_name">{{ $t('ziChan.list1[2]') }}</p> <!-- 可用 -->
								<p class="t_c_num">{{ $public.toLowFixed(zc_total.ttl_usable,4,0) }} USDT</p>
							</li>
							<li>
								<p class="t_c_name">{{ $t('ziChan.list1[3]') }}</p> <!-- 冻结 -->
								<p class="t_c_num">{{ $public.toLowFixed(zc_total.ttl_frost,4,0) }} USDT</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="top_right right_box" :class="isLeft ? '' : 'left_right_on'" @click="toggleTop(1)">
					<div class="clearfix top_top">
						<span>{{ $t('ziChan.list1[1]') }}</span> <!-- 理财账户 -->
						<span>{{ $public.toLowFixed(lc_total.ttl_money,4,0) }} USDT</span>
					</div>
					<div class="top_content">
						<ul class="t_c_ul">
							<li>
								<p class="t_c_name">{{ $t('ziChan.list1[2]') }}</p> 
								<p class="t_c_num">{{ $public.toLowFixed(lc_total.ttl_usable,4,0) }} USDT</p>
							</li>
							<li>
								<p class="t_c_name">{{ $t('ziChan.list1[3]') }}</p>
								<p class="t_c_num">{{ $public.toLowFixed(lc_total.ttl_frost,4,0) }} USDT</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			<el-header class="top" style="height:90px;">
				<el-card class="box-card">
					<div class="title">
						<p>{{ $t('ziChan.list1[4]') }}</p> <!-- 资产划转 -->
						<p>{{ $t('ziChan.list1[5]') }}</p> <!-- 一键划转资产管理更方便 -->
					</div>
					<div class="top_header_right">
						<div class="transaction" v-if="isLeft"> <!-- financial -->
							<span class="transfer_name">{{ $t('ziChan.list1[6]') }}</span> <!-- 交易账户 -->
							<el-input class="transfer_input" v-model="transferForm.num" :placeholder="$t('ziChan.list1[7]')"></el-input> <!-- 请输入划转数量 -->
							<el-select v-model="transferForm.code" popper-class="asset_transfer" :placeholder="$t('ziChan.list[4]')"> <!-- 请选择 -->
								<el-option
									v-for="item in codeArr"
									:key="item.pid"
									:label="item.mark"
									:value="item.mark">
								</el-option>
							</el-select>
						</div>
						<!-- <img src="../../assets/image/qiehuan-icon.png" class="qiehuan" @click="toggleTransfer"> -->
						<div class="transaction" v-else>
							<span class="transfer_name">{{ $t('ziChan.list1[1]') }}</span> <!-- 理财账户 -->
							<el-input class="transfer_input" v-model="transferForm.num" :placeholder="$t('ziChan.list1[7]')"></el-input>
							<el-select v-model="transferForm.code2" popper-class="asset_transfer" :placeholder="$t('ziChan.list[4]')">
								<el-option
									v-for="item in codeArr2"
									:key="item.pid"
									:label="item.mark"
									:value="item.mark">
								</el-option>
							</el-select>
						</div>
						<el-button type="primary" class="transfer" @click="oneKeyStroke">{{ $t('ziChan.list1[8]') }}</el-button> <!-- 一键划转 -->
					</div>
				</el-card>
			</el-header>
			<el-card class="box-card zi_chan_content">
				<div class="right_title" v-if="isLeft">
					<span>{{ $t('ziChan.list1[0]') }}</span>
				</div>
				<div class="right_title" v-else>
					<span>{{ $t('ziChan.list1[1]') }}</span>
				</div>
				<!-- 交易账户表格 -->
				<el-table :data="requestData" style="width: 100%" v-loading="loading" v-show="isLeft">
					<el-table-column prop="pname" :label='$t("ziChan.list[0]")' width="180"><!-- 币种 -->
						<!-- <template slot-scope="scope">
							<img :src="$http.bases+scope.row.img" alt="" />
					        <span style="">{{ scope.row.pname }}</span>
				        </template> -->
					</el-table-column>
					<el-table-column prop="usable" :label='$t("ziChan.list[1]")' width="180"><!-- 可用 -->
						<template slot-scope="scope">
					        <span class="listColor" v-if="scope.row.pname == 'USDT'">
								{{ $public.toLowFixed(scope.row.usable,4,0) }}</span>
					        <span class="listColor" v-else>{{ $public.toLowFixed(scope.row.usable,8,0) }}</span>
				        </template>
					</el-table-column>
					<el-table-column prop="frost" :label='$t("ziChan.list[2]")'><!-- 冻结 -->
						<template slot-scope="scope">
					        <span class="listColor" v-if="scope.row.pname == 'USDT'">
								{{ $public.toLowFixed(scope.row.frost,4,0) }}</span>
					        <span class="listColor" v-else>{{ $public.toLowFixed(scope.row.frost,8,0) }}</span>
				        </template>
					</el-table-column>
					<el-table-column :label='$t("ziChan.list[3]")'><!-- 操作 -->
						<template slot-scope="scope">
							<span>
								<el-button @click="handleClick(scope.row,'/chongBit')" v-show="scope.row.is_act == 1 ? true : false" plain size="small" class="listButton">{{$t("ziChan.canten[0]")}}</el-button><!-- 充值 -->
								<el-button @click="handleClick(scope.row,'/tiBit')" v-show="scope.row.is_act == 1 ? true : false" plain size="small" class="listButton">{{$t("ziChan.canten[1]")}}</el-button><!-- 提币 -->
							</span>
							
							<el-button @click="handleClick(scope.row,'/moneyRecord')" type="" plain size="small" class="listButton">{{$t("ziChan.canten[2]")}}</el-button><!-- 账单明细 -->
							<!-- 兑换 -->
							<!-- <span>
								<el-button @click="handleClick(scope.row,'/exchangeCoin')" type="" plain size="small" :disabled="scope.row.exchange=='0'?true:false" :class="scope.row.exchange=='0'?'':'listButton'">{{$t("ziChan.canten[3]")}}</el-button>
							</span> -->
						</template>
					</el-table-column>
				</el-table>
				<!-- 理财账户表格 -->
				<el-table :data="requestData2" style="width: 100%" v-loading="loadingTrans" v-show="!isLeft">
					<el-table-column prop="mark" :label='$t("ziChan.list[0]")' width="180"><!-- 币种 -->
						<!-- <template slot-scope="scope">
							<img :src="$http.bases+scope.row.img" alt="" />
					        <span style="">{{ scope.row.mark }}</span>
				        </template> -->
					</el-table-column>
					<el-table-column prop="usable" :label='$t("ziChan.list[1]")' width="180"><!-- 可用 -->
						<template slot-scope="scope">
					        <span class="listColor" v-if="scope.row.mark == 'USDT'">{{ $public.toLowFixed(scope.row.usable,4,0) }}</span>
					        <span class="listColor" v-else>{{ $public.toLowFixed(scope.row.usable,8,0) }}</span>
				        </template>
					</el-table-column>
					<el-table-column prop="frost" :label='$t("ziChan.list[2]")'><!-- 冻结 -->
						<template slot-scope="scope">
					        <span class="listColor" v-if="scope.row.mark == 'USDT'">{{ $public.toLowFixed(scope.row.frost,4,0) }}</span>
					        <span class="listColor" v-else>{{ $public.toLowFixed(scope.row.frost,8,0)}}</span>
				        </template>
					</el-table-column>
					<el-table-column :label='$t("ziChan.list[3]")'><!-- 操作 -->
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row,'/moneyRecord2')" type="" plain size="small" class="listButton">{{$t("ziChan.canten[2]")}}</el-button><!-- 账单明细 -->
						</template>
					</el-table-column>
				</el-table>

				<div class="pagination" v-if="requestData.length && isLeft">
					<el-pagination layout="prev, pager, next" :prev-text="$t('ziChan.page[2]')"  :next-text="$t('ziChan.page[3]')" :total="page.total" :current-page.sync="page.current" :page-count="5" @current-change="changePage"></el-pagination>
				</div>
				
			</el-card>
		</div>
		<FooTer></FooTer>

		<!-- 输入资金密码 -->
		<div role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2064;" v-if="isHuazhua"><!--提示-->
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{$t("security.name[1]")}}</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="hideTpwd">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<el-form label-position="top" :model="tpwdForm" status-icon :rules="rulesTpwdForm" ref="tpwdForm" label-width="100px" class="demo-ruleForm">
						<el-form-item :label='$t("security.name[1]")' prop="tpwd">
							<el-input type="password" v-model="tpwdForm.tpwd" auto-complete="off" :placeholder='$t("security.name[1]")'></el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button type="primary" class="btn_confirm" @click="intTpwd">{{$t("security.log[6]")}}</el-button>
							<el-button type="primary" plain class="btn_cancel" @click="hideTpwd">{{$t("security.log[7]")}}</el-button>
						</el-form-item>
					</el-form>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var validatetpwd = (rule, value, callback) => {
				if(!this.$public.pwd(value)) {
					callback(new Error(this.$t("changetpwd.validateopwd")));//请输入有效的密码
				} else {
					callback();
				}
			};
			
			return {
				isLeft: true,
				zc_total: {},
				lc_total: {},
				requestData: [], // 资产列表数据
				requestData2: [], // 理财列表数据
				prevBool: false,
				nextBool: true,
				pageNum: 1, // 当前页数
				totalPage: null, // 总页数
				loading:true,
				loadingTrans: false,
				transferForm: {
					num: '',
					code: '',
					code2: ''
				},
				codeArr: [],
				codeArr2: [],
				page: {
					current: 1,
					size: 10,
					total: 0
				},
				isHuazhua: false,
				tpwdForm: {
					tpwd: ''
				},
				rulesTpwdForm: {
					tpwd: [
						{ validator: validatetpwd, trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			// 用户信息
			getData() {
				this.$http.post(this.$http.user_info, {}).then(res => {
					if(res.data.status == "200") {
						this.zc_total = res.data.data.zc_total;
						this.lc_total = res.data.data.lc_total;
					}
				})
			},
			// 币种列表
			postCurrencyList() {
				this.$http.post(this.$http.currencyList, {}).then(res => {
					this.codeArr = res.data.data.zc;
					this.codeArr2 = res.data.data.lc;
				}).catch(err => {})
			},
			// 输入资金密码后划转
			intTpwd() {
				var tpwd = sessionStorage.getItem("tpwd");
				this.$refs.tpwdForm.validate((valid) => { 
					if (valid) {
						let data = {
							type: this.isLeft ? 1 : 2,
							code: this.isLeft ? this.transferForm.code : this.transferForm.code2,
							tpwd: this.$md5(this.tpwdForm.tpwd),
							num: this.transferForm.num
						};
						this.$http.post(this.$http.zichanTransfer, data).then(res => {
							if (res.data.status == 200) {
								this.$public.msg(res.data.msg, 'success', this);
								this.getData();
								if (this.isLeft) {
									this.requestPublic();
								} else {
									this.requestPublic2();
								}
							} else {
								this.$public.msg(res.data.msg, 'warning', this);
							}
							this.hideTpwd();
						}).catch(err => {})
					} else {
						return 
					}
				})
				
			},
			// 关闭资金密码
			hideTpwd() {
				this.isHuazhua = false;
			},
			// 一键划转
			oneKeyStroke() {
				if (!this.transferForm.num) {
					this.$public.msg(this.$t('ziChan.list2[0]'), 'error', this); // 划转数量不能为空
					return
				}
				if (this.isLeft && !this.transferForm.code) {
					this.$public.msg(this.$t('ziChan.list2[1]'), 'error', this); // 币种类型不能为空
					return
				}
				if (!this.isLeft && !this.transferForm.code2) {
					this.$public.msg(this.$t('ziChan.list2[1]'), 'error', this); // 币种类型不能为空
					return
				}

				this.isHuazhua = true;
			},
			toggleTop(index) {
				if (index == 0) {
					this.isLeft = true;
					this.requestPublic();
					this.postCurrencyList();
					// $(".financial").css({
					// 	left: '0',
					// 	right: 'auto'
					// });
					// $(".transaction").css({
					// 	left: 'auto',
					// 	right: '170px'
					// });
				} else {
					this.isLeft = false;
					this.requestPublic2();
					// $(".financial").css({
					// 	left: 'auto',
					// 	right: '170px'
					// });
					// $(".transaction").css({
					// 	left: '0',
					// 	right: 'auto'
					// });
				}
				this.getData();
			},
			toggleTransfer() {
				if ($(".financial").css("left") == "0px") {
					$(".financial").css({
						left: 'auto',
						right: '170px'
					});
					$(".transaction").css({
						left: '0',
						right: 'auto'
					});
					this.isLeft = false;
					this.requestPublic2();
				} else {
					$(".financial").css({
						left: '0',
						right: 'auto'
					})
					$(".transaction").css({
						left: 'auto',
						right: '170px'
					})
					this.isLeft = true;
					this.requestPublic();
				}
				this.getData();
			},
			// 资产列表数据请求
			requestPublic: function() {
				var _this = this;
				let data = {
					p: _this.page.current,
					size: _this.page.size
				};
				_this.$http.post(_this.$http.ziChan, data).then((res) => {
					if (res.data.data.res.asset.length) {
						_this.requestData = res.data.data.res.asset;
						_this.page.current = Number(res.data.data.p);
						_this.page.total = Number(res.data.data.count);
					}
					_this.loading = false;
				}).catch(err => {
					_this.loading = false;
				})
			},
			// 理财列表数据请求
			requestPublic2: function() {
				var _this = this;
				_this.$http.post(_this.$http.liCai, {}).then((res) => {
					if (res.data.data.asset.length) {
						_this.requestData2 = res.data.data.asset;
					}
					_this.loadingTrans = false;
				}).catch(err => {
					_this.loadingTrans = false;
				})
			},
			// 资产列表 分页改变
			changePage(i){
				this.page.current = i;
				this.requestPublic();
			},

			// 上一页、下一页
			prevClick: function(page) {
				var _this = this;
				_this.pageNum--;

				if(_this.pageNum <= 1) {
					_this.prevBool = false;
					_this.nextBool = true;
					_this.requestPublic();
					return;
				} else {
					_this.nextBool = true;
					_this.requestPublic();
				}
			},
			nextClick: function(page) {
				var _this = this;
				_this.pageNum++;
				if(_this.pageNum >= _this.totalPage) {
					_this.requestPublic();
					_this.prevBool = true;
					_this.nextBool = false;
				} else {
					_this.prevBool = true;
					_this.requestPublic();
				}
			},
			// 点击交易事件
			handleClick: function(row,url) {
				// 本行信息
				var _this = this;
				if(url == '/moneyRecord'){
					//交易记录
					_this.$router.push({ path: url, query:{pid:row.pid}});
				}else{
					_this.$router.push({ path: url, query:{pid:row.pid,pname:row.pname,mark:row.mark,usable:row.usable,frost:row.frost,type:row.coin_type}});					
				}
			},
		},
		created: function() {
			var _this = this;
			window.scrollTo(0, 0); //回到顶部
			_this.getData();
			_this.postCurrencyList();
			_this.requestPublic();
		},
	}
</script>