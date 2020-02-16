<template > 
	<div class="Purchase">
		<el-form ref="form" label-position="left" :model="form" size="small" label-width="110px">
			<!-- 价格和类型 -->
			<el-form-item :label="$t('coincoin.transaction[1]')">
				<el-input v-model="form.Price" type="number" v-if="!ModifyState"></el-input>
		    	<el-input :placeholder="$t('coincoin.transaction1[0]')" :disabled='true' v-else></el-input>
		  	</el-form-item>
		  	<!-- 购买数量 -->
		  	<el-form-item v-if="!ModifyState" :label="$t('coincoin.transaction[16]')">
		  		<el-input v-model="form.numberF"  size="small" :placeholder="$t('coincoin.transaction1[1]')+maximumF">
		    		<template slot="append">USDT</template>
		    	</el-input> 
		    	<div class="number">
		    		<el-slider v-model="form.numF"  :min="0" :max="Number(maximumF)" :step="1" :show-tooltip="false"></el-slider>
		    		<span class="numberSmall">0</span>
		    		<span class="numberLarge">{{maximumF}}</span>
		    	</div>
		  	</el-form-item>
		  	<el-form-item v-else :label="$t('coincoin.transaction[16]')">
		  		<el-input v-model="form.numberM" size="small" :placeholder="$t('coincoin.transaction1[1]')+maximumM">
		    		<template slot="append">USDT</template>
		    	</el-input>
		    	<div class="number">
		    		<el-slider v-model="form.numM" :min="0" :max="Number(maximumM)" :step="1" :show-tooltip="false"></el-slider>
		    		<span class="numberSmall">0</span>
		    		<span class="numberLarge">{{maximumM}}</span>
		    	</div>
		  	</el-form-item>
		  	<!-- 交易量 -->
		  	<div class="el-form-item" v-if="!ModifyState">
		  		<p class="jiaoyi">{{$t('coincoin.transaction[3]')}}:<span>{{form.turnoverF}} USDT</span></p>
		  		<p class="keyong">{{$t('canuse[0]')}}:<span>{{blackfigureF}} USDT</span></p>
		  	</div>
		  	<div class="el-form-item" v-else>
		  		<!--交易额-->
		  		<p class="jiaoyi" v-if="form.turnoverM">{{$t('coincoin.transaction[3]')}}:<span>{{form.turnoverM}} USDT</span></p>
		  		<p class="jiaoyi" v-else>{{$t('coincoin.transaction[3]')}}:<span>0 USDT</span></p>
		  		<!--可用余额-->
		  		<p class="keyong">{{$t('canuse[0]')}}:<span>{{blackfigureM}} USDT</span></p>
		  	</div>
		  	<!-- 交易 -->
		  	<div class="el-form-item" v-if='Loginstate'>
		  		<div v-if="Data.CodeData.split('/')[1] == 'USDT'">
		  			<div v-if="Data.DalanceData == '0'">
		  				<!--余额不足-->
		  				<el-button type="success" size="small"  @click="Notsufficientfunds">{{$t('coincoin.transaction1[6]')}}</el-button>
		  			</div>
		  			<div v-else>
		  				<el-button type="success" size="small" :loading="loadingsellout" @click="onSubmit">{{$t('coincoin.transaction[6]')}}</el-button>
		  			</div>
		  		</div>
		    	<div v-else>
		    		<el-button type="success" size="small">{{$t('coincoin.transaction1[8]')}}</el-button>
		    	</div>
		  	</div>
		  	<div class="el-form-item" v-else>
		    	<el-button type="success" size="small" v-if="Data.CodeData.split('/')[1] == 'USDT'" :loading="loadingsellout" @click="Loginprompt">{{$t('coincoin.transaction1[7]')}}</el-button>
		    	<el-button type="success" size="small" v-else>{{$t('coincoin.transaction1[8]')}}</el-button>
		  	</div>
		</el-form>
	</div>
</template>
<script>
	export default {
		props:['Data','ModifyState'],
		data() {
			return {
				activeName:'first',
				form:{
					Price:"", //价格
					numberM:"", //市价输入框数量
					numberF:"", //限价输入框数量
					num:['1'], //滑杆数量
					stoploss:['1'],  //止损点位
					stopwin:['1'], //止盈点位
					turnoverM:"",   //市价交易额
					turnoverF:"",   //限价交易额
					billPriceType:'1',//交易类型
				},
				maximumM:0,  //市价交易最大数量
				maximumF:0,  //限价交易最大数量
				loadingsellout:false, //防止重复提交
				Loginstate:false,//登录状态
				blackfigureM:null,//市价余额
				blackfigureF:null,//限价余额
				options:[{
					value: '1',
          			label: this.$t('coincoin.transaction1[3]')
				},{
					value: '2',
          			label: this.$t('coincoin.transaction1[4]')
				}]
			}
		},
		watch: {
			'Data.PriceData':function(val,oval){
				var _this = this;
				if (val) {
					_this.form.Price = val;
					if(_this.Data.DalanceData){
						_this.maximumM = parseInt(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Addition(1,_this.Data.dealFee1/100),4)));

						_this.maximumF =  _this.$public.toLowFixed(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Multiplication(_this.form.Price,_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0)), 4,0);
					};
				}else {
					_this.form.Price = "0"
				}
			},
			'form.numberF':function(val,oval){
				var _this = this;
				if(_this.$public.parnt.test(val)){
					_this.form.numF = Number(val);
					_this.form.turnoverF = _this.$public.toLowFixed(_this.$public.Multiplication(_this.$public.Multiplication(_this.form.numberF, _this.form.Price),_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0);

				}else {
					_this.form.numF = 0;
					_this.form.turnover = 0; 
					
				}
			},
			'form.numF':function(val,oval){ //市价滑杆数量
				var _this = this;
				_this.form.numberF = Number(val);
			},
			'form.numberM':function(val,oval){
				var _this = this;
				if(_this.$public.parnt.test(val)){
					_this.form.numM = Number(val);
					_this.form.turnoverM = _this.$public.toLowFixed(_this.$public.Multiplication(_this.form.numberM,_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0);
				}else {
					_this.form.numberM = 0;
					_this.form.turnover = 0;
				}
			},
			'form.numM':function(val,oval){ //市价滑杆数量
				var _this = this;
				_this.form.numberM = Number(val);
			},
			'Data.DalanceData':function(){
				var _this = this;

				_this.blackfigureM = _this.Data.DalanceData;
				_this.blackfigureF = _this.Data.DalanceData;

				_this.maximumM = parseInt(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Addition(1,_this.Data.dealFee1/100),4,0)));


				_this.maximumF = _this.$public.toLowFixed(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Multiplication(_this.form.Price,_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0)),4,0);
			},
			'form.Price':function(val,oval){
				var _this = this;
				if(val){
					_this.maximumF = _this.$public.toLowFixed(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Multiplication(_this.form.Price,_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0)),4,0);


					_this.form.turnoverF = _this.$public.toLowFixed(_this.$public.Multiplication(_this.$public.Multiplication(_this.form.numberF, _this.form.Price),_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0);
				};
			},
			'Data.dealFee1':function(val,oval){
				var _this = this;
				if(val){
					_this.form.Price = _this.Data.PriceData;
					if (_this.Data.DalanceData) {
						_this.maximumF = _this.$public.toLowFixed(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Multiplication(_this.form.Price,_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0)),4,0);
						_this.maximumM = parseInt(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Addition(1,_this.Data.dealFee1/100),4,0)));
					};
				};
			},
		},
		methods: {
			Pricechange:function(val){ //价格改变
				var _this = this;
				if(_this.$public.parnt.test(val)){
					if(!_this.ModifyState){
						_this.maximumF = parseInt(_this.$public.toLowFixed(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Multiplication(_this.form.Price,_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0)),4,0));


						_this.form.turnoverF = _this.$public.toLowFixed(_this.$public.Multiplication(_this.$public.Multiplication(_this.form.number, _this.form.Price),_this.$public.Addition(1,_this.Data.dealFee1/100)),4,0);

					}else {
						_this.maximumM = parseInt(_this.$public.Division(_this.Data.DalanceData,_this.$public.toLowFixed(_this.$public.Addition(1,_this.Data.dealFee1/100),4,0)));
						_this.form.turnoverM = _this.form.number;
					};
				};
			},
			onSubmit:function(){ //提交订单
				var _this = this,entrustNum,billPriceType;
				_this.loadingsellout = true;

				if(sessionStorage.smrz!='true'){
					_this.$public.confirm('您还没有设置实名认证，请先实名认证', 'security', _this);
			        return false;
				}if(sessionStorage.tpw==''){
					_this.$public.confirm('您还没有设置资金密码，请先设置资金密码', 'security', _this);
			        return false;
				}
				if(_this.ModifyState){
					if(!_this.$public.parnt.test(_this.form.numberM)){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[12]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					
					if(_this.form.numberM > _this.maximumM){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[14]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					entrustNum = _this.form.numberM;
					billPriceType = "1";
				}else {
					if(!_this.$public.parnt.test(_this.form.Price)){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[11]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					if(!_this.$public.parnt.test(_this.form.numberF)){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[12]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					
					if(Number(_this.form.numberF) > Number(_this.maximumF) ){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[14]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					entrustNum = _this.form.numberF;
					billPriceType = "2";
				};
				var addBill = {
					stockCode:_this.Data.CodeData,//代码
					billPriceType:billPriceType,//1市价 2限价
					entrustNum:entrustNum,//委托数量
					entrustPrice:_this.form.Price,//委托价
					tradeType:"1",//买卖方向:1:买入，2:卖出
				};
				_this.$http.post(_this.$http.addBill,addBill).then((res) => {
					_this.loadingsellout = false;
					if(res.data.code == "0") {
						_this.$message({
				          	message: _this.$t('coincoin.Order[15]'),
				          	type: 'success'
				        });
				        _this.$emit('modifyfun');
					}else {
						_this.$message({
				          	message: res.data.msg,
				          	type: 'warning'
				        });
					};
				});
			},
			Loginprompt:function(){//未登录提示
				var _this = this;
				_this.$public.confirm(_this.$t('frenchcurrency.tishi2[0]'), 'login', _this);
			},
			Notsufficientfunds:function(){ //余额不足提示
				var _this = this;
				_this.$public.confirm(_this.$t('coincoin.transaction1[6]'), 'MyAssets', _this);
			},
			getUserData() { //获取个人信息
				var _this = this;
				if(!sessionStorage.account) {
					_this.Loginstate = false;
					return false;
				};
				_this.Loginstate = true;
				_this.$http.get(_this.$http.getUserInfo, {
					params: {
						id: JSON.parse(unescape(sessionStorage.getItem('account'))).id,
						sessionId:sessionStorage.getItem('sessionId'),
					}
				}).then(function(response) {
					if(response.data.code == "0") {
						sessionStorage.account = escape(JSON.stringify(response.data.data));
						
					};
				}).catch(function(error) {});
			},
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {

		},
		mounted:function(){
			var _this = this;
			_this.form.Price = _this.Data.PriceData;
		},
		created: function() {
			var _this = this;
			_this.getUserData();
		},
		components: {}
	}
</script>