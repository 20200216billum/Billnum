<style lang="less">
	@import '../../assets/public.less';
	@import './promotion1.less';
	.pageWarp{
		width:950px;
		margin:0 auto;
	}
	.el-pagination{
		    text-align: center;
	}
</style>
<template>
	<div class="promotion">
		<div class="friendBackImg"> 
			<div class="extension"> 
				<p>{{ $t("promotion.list1[0]") }}</p> <!-- 推广拿好礼 -->
				<p>{{ $t("promotion.list1[1]") }}</p> <!-- 扩大团队更有惊喜连连 -->
			</div>
		</div>
		<!-- <div class="friendBackImg" v-if="!isshow"></div>
		<div class="friendBackImg1" v-if="isshow"></div> -->
		<div id="econmicMan">
			<div class="promotion_wrapper">
				<div class="pw_box">
					<ul class="pw_top clearfix">
						<li @click="changeTab(0)">
							<img src="../../assets/image/wdhy-icon.png">
							<div class="pw_name_num">
								<p>{{ $t("promotion.list1[2]") }}</p> <!-- 我的好友 -->
								<p class="pw_num">{{ userData.ttl }}</p>
							</div>
							<img src="../../assets/image/jiantou-2.png" class="jiantou">
						</lI>
						<li  @click="changeTab(1)">
							<img src="../../assets/image/hdyj-icon.png">
							<div class="pw_name_num">
								<p>{{ $t("promotion.list1[3]") }}</p> <!-- 获得的佣金 -->
								<p class="pw_num">{{ $public.toLowFixed(userData.total_sum,4,0)}}</p>
							</div>
							<img src="../../assets/image/jiantou-2.png" class="jiantou">
						</li>
					</ul>
					<ul class="pw_bottom">
						<li class="pw_bot_left">
							<img :src="linkObj.qrc">
							<div>
								<p class="p_b_l_name">{{ $t("promotion.list1[4]") }}</p> <!-- 推广二维码 -->
								<p>{{ $t("promotion.list1[5]") }}</p> <!-- 复制二维码邀请好友获得更多奖励 -->
							</div>
						</li>
						<li class="pw_bot_right">
							<p class="invitation">{{ $t("promotion.list1[6]") }}</p> <!-- 邀请链接 -->
							<!-- <p>jkhdsvcsadnips</p> -->
							<el-input id="link" v-model="linkObj.url"/>
							<p class="copy_invitation" @click="copy('link')">{{ $t("promotion.list1[7]") }}</p> <!-- 复制链接 -->
						</li>
					</ul>
				</div>

				<div class="tab_table">
					<p class="friend" :class="isLeft ? 'on' : ''" @click="changeTab(0)">{{ $t("promotion.list1[2]") }}</p> <!-- 我的好友 -->
					<p class="commission" :class="isLeft ? '' : 'on'" @click="changeTab(1)">{{ $t("promotion.list1[8]") }}</p> <!-- 获得佣金 -->
				</div>

				<!-- 我的好友 -->
				<div class="table_custom" v-if="isLeft">
					<el-table :data="tableData" cell-class-name="cell_custom" header-row-class-name="header_custom" style="width: 100%">
						<el-table-column prop="realname" :label='$t("promotion.list[4]")' width="300"></el-table-column> <!-- 姓名 -->
						<el-table-column prop="mobile" :label='$t("promotion.list[5]")' width="300">
							<template slot-scope="scope">
								<span v-if="scope.row.mobile">{{ scope.row.mobile }}</span>
								<span v-else>{{ scope.row.mail }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="reg_time" :label='$t("promotion.list[6]")'  align="right"> <!-- 注册时间 -->
							<template slot-scope="scope">
								<span>{{ $public.timestampToTime(scope.row.reg_time) }}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- 获得佣金 -->
				<div class="table_custom" v-else>
					<el-table :data="tableData2" cell-class-name="cell_custom" header-row-class-name="header_custom" style="width: 100%">
						<el-table-column prop="realname" :label='$t("promotion.list[4]")' width="300"></el-table-column>
						<el-table-column prop="price" :label='$t("promotion.list[7]")' width="300"> <!-- 数量 -->
							<template slot-scope="scope">
								<span>{{ $public.toLowFixed(scope.row.price,4,0)}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="addtime" :label='$t("promotion.list[8]")' align="right"> <!-- 时间 -->
							<template slot-scope="scope">
								<span>{{ $public.timestampToTime(scope.row.addtime) }}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>

			<div class="pagination" v-if="pageObj.total != 0" style="margin:40px; 0">
				<el-pagination background layout="prev, pager, next" :prev-text="$t('ziChan.page[2]')" :next-text="$t('ziChan.page[3]')" :total="pageObj.total" :current-page.sync="pageObj.current" :page-count="5" @current-change="changePage2"></el-pagination>
			</div>

			<!-- <div class="title">
				<span>{{$t("promotion.changePage[2]")}}</span>
			</div>
			<InviteFriends></InviteFriends> -->
			<!-- 我要推广 -->
			<!-- <div class="pageWarp" v-show="myLinkName !='我要推广' && page.count != 0">
				<el-pagination background layout="prev, pager, next" :total="Number(page.count)" :page-size="Number(page.p)" @current-change="changePage"></el-pagination>
			</div> -->
		</div>
	</div>
</template>
<script>
	import Invitefriends from "../economicMan/invite_friends.vue"; 
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
				myLinkName: this.$t("promotion.myLinkName"), //头部切换  我的客户
				timeData: {
					shortcuts: [{
						text: this.$t("promotion.text[0]"), //最近一周
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t("promotion.text[1]"),//最近一个月
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: this.$t("promotion.text[2]"),//最近三个月
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
				isLeft: true,
				pageObj: {
					current: 1,
					size: 10,
					total: 0
				},
				userData: {
					ttl: 0,
					total_sum: 0
				},
				linkObj: {
					qrc: '',
					url: ''
				},
				tableData: [],
				tableData2: [],
			};
		},
		methods: {
			//复制信息
			copy(whitch) {
				var _this = this;
				var ele = document.getElementById(whitch);
				ele.select();
				document.execCommand("Copy");
				_this.$public.msg(_this.$t("inviteFriends.tips"), 'success', _this);//复制成功
			},
			// 推广二维码
			postLink() {
				this.$http.post(this.$http.link, {}).then(res => {
					if (res.data.status == "200") {
						this.linkObj = res.data.data;
					} else {
						this.$public.msg(res.data.msg, 'error', this);
					}
				}).catch(err => {})
			},
			changeTab(index) {
				this.pageObj.current = 1;
				this.pageObj.total = 0;
				if (index == 0) {
					this.isLeft = true;
					this.getMyFriend();
				} else {
					this.isLeft = false;
					this.getCommission();
				}
			},
			// 我的好友
			getMyFriend() {
				let data = {
					p: this.pageObj.current,
					size: this.pageObj.size
				};
				this.$http.get(this.$http.myFriend, {
					params: data
				}).then(res => {
					if (res.data.status == "200") {
						this.userData.ttl = res.data.data.ttl;
						this.userData.total_sum = res.data.data.total_sum;
						if (res.data.data && res.data.data.list.length) {
							this.tableData = res.data.data.list;
							this.pageObj.current = Number(res.data.data.p);
							this.pageObj.total = Number(res.data.data.count);
						}
					} else {
						this.userData = {
							ttl: 0,
							total_sum: 0
						};
						this.tableData = [];
						this.pageObj.current = 1;
						this.pageObj.total = 0;
						this.$public.msg(res.data.msg, 'error', this);
					}
				}).catch(err => {})
			},
			// 获得佣金
			getCommission() {
				let data = {
					p: this.pageObj.current,
					size: this.pageObj.size
				};
				this.$http.get(this.$http.commission, {
					params: data
				}).then(res => {
					if (res.data.status == "200") {
						if (res.data.data && res.data.data.res.length) {
							this.tableData2 = res.data.data.res;
							this.pageObj.current = Number(res.data.data.p);
							this.pageObj.total = Number(res.data.data.count);
						}
					} else {
						this.tableData2 = [];
						this.pageObj.current = 1;
						this.pageObj.total = 0;
						this.$public.msg(res.data.msg, 'error', this);
					}
				}).catch(err => {})
			},
			changePage2(i) {
				this.pageObj.current = i;
				if (isLeft) {
					this.getMyFriend();
				} else {
					this.getCommission();
				}
			},

			/************************************* 老 **************************************** */
			//选项卡切换执行函数
			tabChange(val) {
				this.myLinkName = val.label;
				if(val.label == this.$t("promotion.tabChange[0]")){//我的客户
					this.sendData.act = 'customer'
					this.getDataList(this.sendData);
				}else if(val.label == this.$t("promotion.tabChange[1]")){//佣金明细
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
				if(this.myLinkName == this.$t("promotion.changePage[0]")){//我的客户
					this.sendData.act = 'customer'
				}else if(this.myLinkName == this.$t("promotion.changePage[1]")){//佣金明细
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
								response.data.data.res[i].realname = response.data.data.res[i].realname == null?_this.$t("promotion.getDataList"):response.data.data.res[i].realname//暂未实名认证
							}
							_this.myCustomer = response.data.data.res;
						}else if(data.act == 'commission_info'){
							for(var i = 0; i<response.data.data.res.length; i++){
								response.data.data.res[i].add_time = _this.$public.timestampToTime(response.data.data.res[i].add_time);
								response.data.data.res[i].username_down = response.data.data.res[i].username_down == null?_this.$t("promotion.getDataList"):response.data.data.res[i].username_down//暂未实名认证
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
		created() {
			// this.getDataList(this.sendData);
			// this.getAllNum();
			this.isshow = this.$cookies.get('language') == 'Chinese' ? true : false;
			this.postLink();
			this.getMyFriend();
		},
		components:{
			"InviteFriends":Invitefriends,
		}
	};
</script>