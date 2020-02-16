<style lang=less>
	@import '../../assets/public.less';
	@import '../../assets/reset.less';
	@import "./asset.less";
</style>
<template lang="html">
	<div class="assetWrap">
		<asidebar></asidebar>
		<div class="conTent">
			<h1 class="tit">{{$t("runFast.asset[0]")}}</h1>
			<!-- 资产列表 -->
			<ul>
				<li class="assetLi" v-for="(item,index) in assetsArr" :key="index">
					<div class="codeName">
						<div class="codeName_left">
							<!-- <img class="codeimg" :src='"../../assets/img/"+(item.name)+".png"' alt=""> -->
							<span class="code">{{item.name}}</span>
						</div>
						<div class="usdt">{{item.usable}}</div>
					</div>
					<div class="btns">
						<span @click="dialog('1',item.pid,item.name)">{{$t("runFast.asset[1]")}}</span>
						<span @click="dialog('2',item.pid,item.name,item.usable)">{{$t("runFast.asset[2]")}}</span>
						<span @click="operateFn(item.name)" class="btn">{{$t("runFast.asset[3]")}}</span>
					</div>
				</li>
			</ul>
		</div>
		<!-- 转入 -->
		<el-dialog :title="$t('asset.shift[0]')" :visible.sync="zhuanru" width="502px" class="dia">
			<p class="label">{{$t('asset.shift[1]')}}({{biName}})<span style="float: right">{{$t('asset.shift[2]')}}:{{fund}}</span></p>
			<el-input v-model="data.rotationNum"></el-input>
			<p class="label">{{$t('asset.shift[3]')}}</p>
			<el-input v-model="payment_password" :placeholder="$t('asset.shift[4]')" type="password"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="zhuanru = false" class="cancel">{{$t('asset.shift[5]')}}</el-button>
				<el-button type="primary" @click="shift" class="confirm">{{$t('asset.shift[6]')}}</el-button>
			</span>
		</el-dialog>
		<!-- 转出 -->
		<el-dialog :title="$t('asset.roll[0]')" :visible.sync="zhuanchu" width="502px" class="dia">
			<p class="label">{{$t('asset.roll[1]')}}({{biName}})<span style="float: right">{{$t('asset.roll[2]')}}:{{outMoney}}</span></p>
			<el-input v-model="data.rotationNum"></el-input>
			<p class="label">{{$t('asset.roll[3]')}}</p>
			<el-input v-model="payment_password" :placeholder="$t('asset.roll[4]')" type="password"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="zhuanchu = false" class="cancel">{{$t('asset.roll[5]')}}</el-button>
				<el-button type="primary" @click="roll" class="confirm">{{$t('asset.roll[6]')}}</el-button>
			</span>
		</el-dialog> 
		<!-- 账单流水 -->
		<el-dialog :title="$t('asset.record[0]')" :visible.sync="record" class="recordDia" @close="done">
			<div class="headerTop">
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels
					:range-separator="$t('runFast.asset[15]')" :start-placeholder="$t('runFast.asset[14]')"
					:end-placeholder="$t('runFast.asset[16]')">
				</el-date-picker>
				<el-button type="primary" @click="billList('1',codeName)">{{$t('runFast.asset[17]')}}</el-button>
			</div>
			<div class="recordlist">
				<div class="flexTitle">
					<div class="titleItem">{{$t('asset.record[1]')}}</div>
					<div class="titleItem">{{$t('asset.record[2]')}}</div>
					<div class="titleItem">{{$t('asset.record[3]')}}</div>
				</div>
				<div class="flexList" v-for="(i,k) in recordList" :key="k" v-if="recordStatus == 1">
					<div class="listItem">
						<h1>{{parseFloat(i.money) < 0 ? $t('asset.record[5]') : $t('asset.record[4]')}}</h1>
						<p>{{i.created_at}}</p>
					</div>
					<div class="listItem">
						<a :class="parseFloat(i.money) < 0 ? 'red' : 'blue'">{{parseFloat(i.money) < 0 ? parseFloat(i.money) : '+' + parseFloat(i.money)}}</a>
					</div>
					<div class="listItem">
						<a class="white">{{i.nmoney}}</a>
					</div>
				</div>
				<div  v-if="recordStatus == 0" class="placeholder">
					{{$t('asset.record[6]')}}
				</div>
			</div>
			<el-pagination background layout="prev, pager, next" :total="page.total"  @current-change="current_change" :page-size='page.size' :current-page.sync="page.current"></el-pagination>
		</el-dialog>
	</div>
</template>
<script>
	import asidebar from "./asidebar.vue";
	export default {
		data() {
			return {
				outMoney: '',//转出时可用余额
				zhuanru: false,
				zhuanchu:false,
				record:false,
				activeBtn: null,
				data:{
					formWalletType:'',//划转账户类型
					toWalletType:'',//接受账户类型
					rotationNum:'',//划转数量
					payment_password:'',//资金密码
					id:'',//币种id
				},
				payment_password:'',//资金密码未加密
				biName:'',//币种code
				property:'',//钱包资产
				fund:'',//当前币种可用量
				// startDate:'',//账单流水开始日期
				// endDate:'',//结束日期
				codeName:'',//当前选择币种
				value2: '',//时间
				recordList:[],//账单流水列表
				recordStatus:'',
				assetsArr: [//资产列表
				],
				page: {
					size:1,
					total: 0,
					current: 1
				},
			}
		},
		watch: {
		},
		methods: {
			//转入
			shift(){
				var _this = this;
				_this.data.	formWalletType = 1;
				_this.data.toWalletType = 4;
				_this.data.payment_password = _this.$md5(_this.payment_password)
				_this.$http.post(_this.$http.rotation,_this.data).then(function(res) {
				  if(res.data.code == '200') {
					  	_this.getUserData();
						_this.getAssets();
						_this.zhuanru = false;
						_this.zhuanchu = false;
						_this.record = false;
						_this.$public.msg(_this.$t('asset.tip[0]'),'success',_this)
				 }else{
					_this.$public.msg(res.data.msg,'warning',_this)
				 }
				})
			},
			//转出
			roll(){
				var _this = this;
				if (this.data.rotationNum == '') {
					_this.$public.msg(_this.$t('asset.tip[3]'),'warning',_this)
					return
				} else if (_this.payment_password == '') {
					_this.$public.msg(_this.$t('asset.tip[4]'),'warning',_this)
					return
				} else {
					_this.data.	formWalletType = 4;
					_this.data.toWalletType = 1;
					_this.data.payment_password = _this.$md5(_this.payment_password)
					_this.$http.post(_this.$http.rotation,_this.data).then(function(res) {
						if(res.data.code == '200') {
							_this.getUserData();
							_this.getAssets();
							_this.zhuanru = false;
							_this.zhuanchu = false;
							_this.record = false;
							_this.$public.msg(_this.$t('asset.tip[1]'),'success',_this)
						}else{
							_this.$public.msg(res.data.msg,'warning',_this)
						}
					})
				}
			},
			//打开转入转出弹框
			dialog(val,item,name,outMoney){
				var _this = this;
				_this.getAssets()
				_this.data = {
					formWalletType:'',//划转账户类型
					toWalletType:'',//接受账户类型
					rotationNum:'',//划转数量
					payment_password:'',//资金密码
					id:item,//币种
				};
				_this.payment_password = '';
				_this.biName = name;
				_this.outMoney = outMoney
				for(let i= 0;i<_this.property.length;i++){
					if(_this.property[i].pid == item){
						_this.fund = _this.$public.toLowFixed(_this.property[i].usable,4)
					}
				}
				if(val == 1){
					_this.zhuanru = true;
				}else if(val == 2){
					_this.zhuanchu = true;
				}
			},
			//账单流水弹框
			operateFn(val){
				var _this = this;
				_this.record = true;
				// _this.billList(1,val);
				_this.codeName = val;
			},
			//获取游戏账户资产
			getAssets(){
				var _this = this;
				_this.$http.get(_this.$http.getAssets,{params:{type:1}}).then(function(res) {
				  if(res.data.code == '200') {
					  _this.property = res.data.data.zichan;
				 }
				})
			},
			//获取账单流水
			billList(num,val){
				var _this = this;
				if(!_this.value2){
					_this.$public.msg(_this.$t('asset.tip[2]'),'warning',_this)
					return ;
				}
				_this.$http.post(_this.$http.billList,{
					start_time:_this.formatDate(_this.value2[0]),
					end_time:_this.formatDate(_this.value2[1]),
					money_type:val,
					page:num,
				}).then(function(res) {
				  if(res.data.code == '200') {
					_this.recordList = res.data.data.data;
					_this.page.size = res.data.data.per_page;
					_this.page.total = res.data.data.total;
					_this.recordStatus = 1;
				 }else{
					_this.$public.msg(res.data.msg,'warning',_this)
				 }
				})
			},
			//  将中国标准时间改为时间
			formatTen(num) {
				return num > 9 ? (num + "") : ("0" + num);
			},
			formatDate(date) {
				var _this = this;
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var second = date.getSeconds();
				return year + "-" + _this.formatTen(month) + "-" + _this.formatTen(day);
			},
			//获取钱包资产
			getUserData() {
				var _this = this;
				_this.$http.post(_this.$http.get_game_list, {})
					.then(function (res) {
						if(res.data.code == 200){
							_this.assetsArr = res.data.data
							for(let i = 0; i<_this.assetsArr.length; i++){
								_this.assetsArr[i].usable = _this.$public.toLowFixed(_this.assetsArr[i].usable,4);
							}
						}
					})
					.catch(function (error) { });
			},
			//切换页码
			current_change(i) {
				var _this = this;
				var item = Number(i);
				_this.billList(item,_this.codeName)
			},
			done(){
				var _this = this;
				_this.value2 = '';
				_this.recordStatus = 0;
				_this.page = {
					size:1,
					total: 0,
					current: 1
				};
			},
		},
		mounted: function () {
			var _this = this;
		},
		created: function () {
			var _this = this;
			_this.getUserData();
			_this.getAssets();
		},
		components: {
			asidebar: asidebar
		}
	};
</script>

<style scoped="scoped">

</style>