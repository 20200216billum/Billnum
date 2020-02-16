
<style lang="less">
	@import '../../assets/public.less';
	@import './crowdFunding.less';
</style>
<template>
	<div class="crowdMain">
		<div class="crowdFunding">
			<div class="banner" :class="{bannera:langchange}"></div>
			<ul class="cf_cont">
				<li class="cf_list" v-for="(item , index) in  listdata" :key="index">
					<div class="cont_left code_info">
						<!-- 未开始 -->
						<p class="tips tipsOk" v-if="item.state == '0'">{{$t('crowdFunding.main1[0]')}}</p>
						<!-- 抢筹中 -->
						<p class="tips" v-else-if="item.state == '1'">{{$t('crowdFunding.main1[1]')}}</p>
						<!-- 已结束 -->
						<p class="tips tipsOk" v-else-if="item.state == '2'">{{$t('crowdFunding.main1[2]')}}</p>
						<!-- 未开始 -->
						<p class="tips tipsOk" v-else>{{$t('crowdFunding.main1[0]')}}</p>
						<div class="le_msg">
							<h3 class="code_name">{{item.ptitle}}</h3>
							<p class="sum_num">{{$t('crowdFunding.main2[0]')}}：{{item.pnum}}</p> <!--发行总量-->
						</div>
						<div class="ri_msg">
							<p class="code_price">{{item.price}}USDT</p>
							<!-- <p class="sum_price"><i>&asymp;</i> 451.14CNY</p> -->
						</div>
						<div class="time_msg">
							<p class="time_start">{{$t('crowdFunding.main2[1]')}}：{{$public.timestampToTimeshian(item.start_time)}}</p>
							<!-- 开始日期 -->
							<p class="time_end">{{$t('crowdFunding.main2[2]')}}：{{$public.timestampToTimeshian(item.end_time)}}</p>
							<!-- 结束日期 -->
						</div>
					</div>
					<div class="cont_left progress_info">
						<p class="state" v-if="item.state == '0'">{{$t('crowdFunding.main1[0]')}}</p>
						<!-- 未开始 -->
						<p class="state" v-else-if="item.state == '1'">{{$t('crowdFunding.main1[1]')}}</p>
						<!-- 已抢筹 -->
						<p class="state" v-else-if="item.state == '2'">{{$t('crowdFunding.main1[2]')}}</p>
						<!-- 抢筹结束 -->
						<p class="state" v-else>{{$t('crowdFunding.main1[0]')}}</p>
						<!-- 未开始  -->
						<p class="number">{{item.ynum}}<i>USDT</i></p>
						<el-progress :percentage="Number(item.pre)"></el-progress>
						<p class="progress">
							<span class="prog">{{$t('crowdFunding.main2[3]')}} {{item.pre}}%</span>
							<!--当前进度  -->
							<span class='status' v-if="item.state == '0'">{{$t('crowdFunding.main1[0]')}}</span>
							<!-- 未开始 -->
							<span class='status' v-else-if="item.state == '1'">{{$t('crowdFunding.main1[1]')}}</span>
							<!-- 抢筹中 -->
							<span class='status' v-else-if="item.state == '2'">{{$t('crowdFunding.main1[2]')}}</span>
							<!-- 完成 -->
							<span class='status' v-else>{{$t('crowdFunding.main1[0]')}}</span>
							<!--未开始  -->
						</p>
					</div>
					<div class="cont_left crowd_info">
						<label class="numInp">
							<span>{{$t('crowdFunding.main2[4]')}}</span>
							<!-- 抢筹数量 -->
							<input type="Numder" name="" :placeholder="$t('crowdFunding.main2[5]')" v-model="InputData[index].quantity" disabled="disabled" v-if="item.state == '2' || item.state == '0'">
							<!-- 请输入抢筹数量 -->
							<input type="Numder" name="" :placeholder="$t('crowdFunding.main2[5]')" v-model="InputData[index].quantity" v-on:input="watchtNum(index)" v-else>
							<!-- 请输入抢筹数量 -->
						</label>
						<p class="crowdPrice" v-if="account">
							<span>{{InputData[index].jiag}} <i>USDT</i></span>
							<a href="javascript:void(0)"  class='crowdBtn' v-if="item.state == '0'">{{$t('crowdFunding.main1[0]')}}</a>
							<!-- 未开始 -->
							<a href="javascript:void(0)" class='crowdBtn' @click="QuantityDisplay(index)" v-else-if="item.state == '1'">{{$t('crowdFunding.main2[6]')}}</a>
							<!-- 我要抢筹 -->
							<a href="javascript:void(0)" class='crowdBtn' v-else-if="item.state == '2'">{{$t('crowdFunding.main1[2]')}}</a>
							<!-- 已完成 -->
							<a href="javascript:void(0)" class='crowdBtn' v-else>{{$t('crowdFunding.main1[0]')}}</a>
							<!-- 未开始 -->
						</p>
						<p class="crowdPrice" v-else>
							<span>{{InputData[index].jiag}} <i>USDT</i></span>
							<a href="javascript:void(0)" class='crowdBtn' @click="Reloggedin()">{{$t('crowdFunding.main2[7]')}}</a>
							<!-- 请登录 -->
						</p>
					</div>
				</li>
				<section class="Period_main" v-show="listdata.length != 0">
					<el-pagination background layout="prev, pager, next" :total="parseInt(isPage.isCount)" :page-size='isPage.isSize' @current-change="pageChange"></el-pagination>
				</section>
			</ul>
			
			<el-dialog :title="$t('crowdFunding.main3[0]')" :visible.sync="dialogVisible" width="30%">
				<!-- 提示 -->
				<el-form :label-position="labelPosition" label-width="140px" :model="formLabelAlign">
					<el-form-item :label="$t('crowdFunding.main3[1]')"><!-- 抢筹数量 -->
						<el-input v-model="formLabelAlign.number" disabled="disabled"></el-input>
					</el-form-item>
					<el-form-item :label="$t('crowdFunding.main3[2]')"><!-- 支付金额 -->
						<el-input v-model="formLabelAlign.cash" disabled="disabled" placeholder=" / USDT"></el-input>
					</el-form-item>
					<el-form-item :label="$t('crowdFunding.main3[3]')"><!-- 支付密码 -->
						<el-input v-model="formLabelAlign.pwd" type="password"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">{{$t('crowdFunding.main3[4]')}}</el-button><!-- 取 消 -->
					<el-button type="primary" @click="handleClose()">{{$t('crowdFunding.main3[5]')}}</el-button><!-- 确 定 -->
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				showText:false,
				dialogVisible: false,
				labelPosition:'left',
				account: false,
				formLabelAlign:{
					"id":"",
					"number":'',
					"cash":'',
					"pwd":''
				},
				listdata:[],
				InputData:[],
				isPage:{
					isCount:4,  //一共有几页
					isSize:7,  //默认显示几页
					p:1,  //当前页  
				},
				langchange:true,
			}
		},
		 methods: {
			handleClose(done) {//交易
				var _this = this;
				_this.dialogVisible = false;
				if (!_this.formLabelAlign.number) {
					_this.$message.error(_this.$t('crowdFunding.main4[0]'));
					// 错了哦，认筹数量不应该为空！
					return false;
				};
				if (isNaN(_this.formLabelAlign.number)) {
					_this.$message.error(_this.$t('crowdFunding.main4[1]'));
					//错了哦，认筹数量应该为数字！
					return false;
				};
				if (_this.formLabelAlign.number.toString().indexOf('.') != -1) {
					_this.$message.error(_this.$t('crowdFunding.main4[2]'));
					//错了哦，认筹数量应该为数字！
					return false;
				};
//				if (_this.formLabelAlign.number.split('.').length == 2) {
//					if(_this.formLabelAlign.number.split('.')[1].length > 0){
//						_this.$message.error(_this.$t('crowdFunding.main4[2]'));
//						//错了哦，认筹数量小数位后应该为小于四位！
//						return false;
//					};	
//				};
				if(!_this.$public.pwd(_this.formLabelAlign.pwd)) {
					_this.$message.error(_this.$t('crowdFunding.main4[3]'));
					//错了哦，密码格式错了哦！
					return false;
				};
				var dorec = {
					"id":_this.formLabelAlign.id,
					"num":_this.formLabelAlign.number,
					"tpwd":_this.$md5(_this.formLabelAlign.pwd),
				}
				_this.$http.post(_this.$http.dorec, dorec).then(function(response) {
					if(response.data.status == "200") {
						_this.$message({
				          	message: _this.$t('crowdFunding.main5[0]'),//恭喜你，认筹成功!
				          	type: 'success'
				        });
				       	_this.getdata();
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			getdata(typenum){//获取数据
				var _this = this;
				_this.InputData = [];
				let recindex = {
					size:_this.isPage.isSize,
					p:typenum
				};  
				$.post(_this.$http.recindex,recindex,function(result){
					if(result.status == 200){
						_this.listdata = result.data.list;
						_this.isPage.isCount = result.data.count;
						_this.isPage.isSize = result.data.size;
						_this.isPage.p = result.data.p;
						var listinput;
						for (var i = 0; i < result.data.list.length; i++) {
							listinput = {
								quantity:"",
								jiag:"0.0000",
							};
							_this.InputData.push(listinput);
						};
					}
				})
			},
			pageChange(i) {
				var _this = this;
				_this.getdata(i);
			},
			watchtNum(type){ //数量改变时改变交易额
				var _this = this;
				if (!isNaN(_this.InputData[Number(type)].quantity)) {
					_this.InputData[Number(type)].jiag =_this.$public.toLowFixed(_this.InputData[Number(type)].quantity * _this.listdata[Number(type)].price,4,0);
				};
			},
			QuantityDisplay(type){//点击显示框
				var _this = this;
				
				
				if (!_this.InputData[type].quantity) {
					_this.$message.error(_this.$t('crowdFunding.main4[0]'));
					// 错了哦，认筹数量不应该为空！
					return false;
				};
				if (isNaN(_this.InputData[type].quantity)) {
					_this.$message.error(_this.$t('crowdFunding.main4[1]'));
					//错了哦，认筹数量应该为数字！
					return false;
				};
				if (_this.InputData[type].quantity.toString().indexOf('.') != -1) {
					_this.$message.error(_this.$t('crowdFunding.main4[2]'));
					//错了哦，认筹数量应该为数字！
					return false;
				};
				_this.dialogVisible = true;
				_this.formLabelAlign.pwd = '';
				_this.formLabelAlign.id = _this.listdata[Number(type)].id;
				_this.formLabelAlign.number = _this.InputData[Number(type)].quantity;
				_this.formLabelAlign.cash = _this.InputData[Number(type)].jiag;
			},
			Reloggedin(){//重新登录
				var _this = this;
				
				_this.$confirm(_this.$t('crowdFunding.main6[0]'), _this.$t('crowdFunding.main6[1]'), {
		          	confirmButtonText: _this.$t('crowdFunding.main6[2]'),
		          	type: 'warning'
		        }).then(() => {
		          	_this.$public.go('login', 10, _this);
		        }).catch(() => {
          
		        });
		        //您还没有登录，请去登录 提示 确定

			},
		},
		created:function () {
			var _this = this;
			 _this.getdata('1');
			 if (sessionStorage.account) {
			 	_this.account = true;
			 }else {
			 	_this.account = false;
			 };
			 console.log(_this.$cookies.get('language'));
			 if(_this.$cookies.get('language') == 'English'){
			 	_this.langchange  = true;
			 }else {
			 	_this.langchange  = false;
			 }
		}
	}
</script>

