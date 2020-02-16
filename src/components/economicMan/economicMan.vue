<style lang="less">
	@import '../../assets/public.less';
	@import './economicMan.less';
</style>
<template>
	<div id="econmicMan">
		<el-tabs :tab-position="tabPosition" type="border-card" style="height: 680px;" @tab-click='tabChange'>
			<div class="title">
				<!--<div class="headerWarp">
					<span>当前位置:</span>
					<span>经纪人 > </span>
					<span>{{myLinkName}}</span>
				</div>-->
				<div class="timeWarp" v-show="myLinkName =='佣金明细'"><!-- 佣金明细 -->
					<div class="block">
						<el-date-picker @change="timeOk" v-model="value5" type="datetimerange" :picker-options="timeData" :range-separator='$t("economicMan.list[1]")' :start-placeholder='$t("economicMan.list[2]")' :end-placeholder='$t("economicMan.list[3]")' align="right" value-format="timestamp">>
						</el-date-picker><!-- 至   开始日期  结束日期 -->
					</div>
				</div>
			</div>
			<el-tab-pane :label='$t("economicMan.Mykehu[0]")'><!-- 我的客户 -->
				<h2 class="titleAll">{{$t("economicMan.Mykehu[1]")}} {{allNum.count}}</h2><!-- 累计开户 -->
				<el-table :data="myCustomer" style="width: 100%" v-loading="loading">
					<el-table-column prop="realname" :label='$t("economicMan.Mykehu[2]")' width="180"><!-- 姓名 -->
					</el-table-column>
					<el-table-column prop="account" :label='$t("economicMan.Mykehu[3]")' width="180"><!-- 手机号 -->
					</el-table-column>
					<el-table-column prop="wallone" :label='$t("economicMan.Mykehu[4]")' width="360"><!-- 余额 -->
					</el-table-column>
					<el-table-column prop="reg_time" :label='$t("economicMan.Mykehu[5]")'><!-- 注册时间 -->
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<!--<el-tab-pane label="佣金明细">
				<h2 class="minxiAll">
					<span>今日收益 {{allNum.wallfour}} </span> &nbsp;&nbsp;
					<span>累计收益 {{allNum.wallthree}}</span>
				</h2>
				
				<el-table :data="commission" style="width: 100%" v-loading="loading">
					<el-table-column prop="username_down" label="姓名" width="150">
					</el-table-column>
					<el-table-column prop="mobile" label="手机号" width="180">
					</el-table-column>
					<el-table-column prop="fee" label="手续费" width="180">
					</el-table-column>
					<el-table-column prop="fee_yongjin" label="佣金" width="250">
					</el-table-column>
					<el-table-column prop="add_time" label="交易时间">
					</el-table-column>
				</el-table>
			</el-tab-pane>-->
			<el-tab-pane :label='$t("economicMan.tuiguang")'><!-- 我要推广 -->
				<InviteFriends></InviteFriends>
			</el-tab-pane>
		</el-tabs>
		<!--<div class="freeGo">
			<router-link to="/invitefriends">
				我的邀请码
			</router-link>
		</div>-->		
		<div class="pageWarp" v-show="myLinkName !='我要推广' && page.count != 0"><!-- 我要推广 -->
			<el-pagination background layout="prev, pager, next" :total="Number(page.count)" :page-size="Number(page.p)" @current-change="changePage"></el-pagination>
		</div>
	</div>
</template>
<script>
	import Invitefriends from "./invite_friends.vue"; 
	export default {
		
		data() {
			return {
				page:{
					p:8,  //每页显示条数
					count:0 //总条数
				},
				allNum:{
					count:"--" , //总客户
			        wallthree:"--" , //累计收益
			        wallfour:"--"   //今日收益
				},
				tabPosition: 'left',
				myLinkName: this.$t("economicMan.myLinkName"), //头部切换  我的客户
				timeData: {
					shortcuts: [{
						text: this.$t("economicMan.text[0]"), //最近一周
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t("economicMan.text[1]"),//最近一个月
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t("economicMan.text[2]"),//最近三个月
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
				value5: '',
				//我的客户 数据
				myCustomer: [],
				//佣金明细 数据
				commission: [],
				loading: false,
				sendData:{
					act:'customer',  
					p:1,
					size:8,
					start_time:'',
					end_time:''
				},

			};
		},
		methods: {
			//选项卡切换执行函数
			tabChange(val) {
				this.myLinkName = val.label;
				if(val.label == this.$t("economicMan.tabChange[0]")){//我的客户
					this.sendData.act = 'customer'
					this.getDataList(this.sendData);
				}else if(val.label == this.$t("economicMan.tabChange[1]")){//佣金明细
					this.sendData.act = 'commission_info'
					this.getDataList(this.sendData);
				}				
			},
			//点击日期插件确定执行函数
			timeOk(val) {
				this.sendData.start_time = Math.ceil(val[0]/1000);  //开始时间 
				this.sendData.end_time =Math.ceil(val[1]/1000);  //结束时间
				this.sendData.act = 'commission_info'
				this.getDataList(this.sendData);
			},
			//分页改变
			changePage(i){
				this.sendData.p= i
				if(this.myLinkName == this.$t("economicMan.changePage[0]")){//我的客户
					this.sendData.act = 'customer'
				}else if(this.myLinkName == this.$t("economicMan.changePage[1]")){//佣金明细
					this.sendData.act = 'commission_info'
				}
				this.getDataList(this.sendData);
				
				
			},
			getDataList(data) {
				var _this = this;
				_this.$http.post(_this.$http.bk_list, data).then(function(response) {
					if(response.data.status == "200") {
						//我的客户数据
						if(data.act == 'customer'){
							for(var i = 0; i<response.data.data.res.length; i++){
								response.data.data.res[i].reg_time = _this.$public.timestampToTime(response.data.data.res[i].reg_time);
//								if(!response.data.data.res[i].realname)
								response.data.data.res[i].realname = response.data.data.res[i].realname == null?_this.$t("economicMan.getDataList"):response.data.data.res[i].realname//暂未实名认证
							}
							_this.myCustomer = response.data.data.res;
						}else if(data.act == 'commission_info'){
							for(var i = 0; i<response.data.data.res.length; i++){
								response.data.data.res[i].add_time = _this.$public.timestampToTime(response.data.data.res[i].add_time);
								response.data.data.res[i].username_down = response.data.data.res[i].username_down == null?_this.$t("economicMan.getDataList"):response.data.data.res[i].username_down//暂未实名认证
							}
							_this.commission = response.data.data.res;							
						}else{
							_this.commission = [];
							_this.myCustomer = [];
						}
						//佣金明细数据
						_this.page.count= response.data.data.count;
						_this.page.size= response.data.data.size;
						
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			getAllNum(){
				var _this = this;
				_this.$http.post(_this.$http.bk_info, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.allNum = response.data.data;
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			}
		},
		created: function() {
			this.getDataList(this.sendData);
			this.getAllNum();
		},
		
		components:{
			"InviteFriends":Invitefriends,
		}
	};
</script>