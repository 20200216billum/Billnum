<template lang="html">
	<div class="Sellout">
		<el-form ref="form" label-position="left" :model="form" size="small" label-width="110px">
			<!-- 价格和类型 -->
			<el-form-item :label="$t('coincoin.transaction[8]')">
		    	<el-input v-model="form.Price" type="number" v-if="!ModifyState"></el-input>
		    	<el-input :placeholder="$t('coincoin.transaction1[0]')" :disabled='true' v-else></el-input>
		  	</el-form-item>
		  	<!-- 购买数量 -->
		  	<el-form-item  v-if="!ModifyState" :label="$t('coincoin.transaction[17]')">
		  		<el-input v-model="form.numberF" size="small" :placeholder="$t('coincoin.transaction1[2]')+maximumF">
		    		<template slot="append">{{Data.Typedata}}</template>
		    	</el-input>
		    	<div class="number">
		    		<el-slider v-model="form.numF"  :min="0" :max="Number(maximumF)" :step="1" :show-tooltip="false"></el-slider>
		    		<span class="numberSmall">0</span>
		    		<span class="numberLarge">{{maximumF}}</span>
		    	</div>
		  	</el-form-item>
		  	<el-form-item v-else :label="$t('coincoin.transaction[17]')">
		  		<el-input v-model="form.numberM" type="number" size="small" :placeholder="$t('coincoin.transaction1[2]')+maximumM">
		    		<template slot="append">{{Data.Typedata}}</template>
		    	</el-input>
		    	<div class="number">
		    		<el-slider v-model="form.numM" :min="0" :max="Number(maximumM)" :step="0.00000001" :show-tooltip="false"></el-slider>
		    		<span class="numberSmall">0</span>
		    		<span class="numberLarge">{{maximumM}}</span>
		    	</div>
		  	</el-form-item>


		  	<!-- 交易量 -->
		  	<div class="el-form-item" v-if="!ModifyState">
		  		<p class="jiaoyi">{{$t('coincoin.transaction[3]')}}:<span>{{form.turnoverF}} USDT</span></p>
		  		<p class="keyong">{{$t('canuse[0]')}}:<span>{{blackfigureF}} {{Data.Typedata}}</span></p>
		  	</div>
		  	<div class="el-form-item" v-else>
		  		<p class="jiaoyi" v-if="form.turnoverM">{{$t('coincoin.transaction[3]')}}:<span>{{form.turnoverM}} {{Data.Typedata}}</span></p>
		  		<p class="jiaoyi" v-else>{{$t('coincoin.transaction[3]')}}:<span>0 {{Data.Typedata}}</span></p>
		  		<p class="keyong">{{$t('canuse[0]')}}:<span>{{blackfigureM}} {{Data.Typedata}}</span></p>
		  	</div>

		  	<!-- 交易 -->
		  	<div class="el-form-item" v-if='Loginstate'>
		  		<div v-if="Data.CodeData.split('/')[1] == 'USDT'">
		  			<div v-if="Data.DalanceData == '0'">
		  				<!--余额不足-->
		  				<el-button type="danger" size="small"  @click="Notsufficientfunds">{{$t('coincoin.transaction1[6]')}}</el-button>		  				
		  			</div>
		  			<div v-else>
		  				<el-button type="danger" size="small" :loading="loadingsellout" @click="onSubmit">{{$t('coincoin.transaction[9]')}}</el-button>
		  			</div>
		  		</div>
		    	<div v-else>
		    		<el-button type="danger" size="small">{{$t('coincoin.transaction1[8]')}}</el-button>
		    	</div>
		  	</div>
		  	<div class="el-form-item" v-else>
		    	<el-button type="danger" size="small" v-if="Data.CodeData.split('/')[1] == 'USDT'"  @click="Loginprompt">{{$t('coincoin.transaction1[7]')}}</el-button>
		    	<el-button type="danger" size="small" v-else>{{$t('coincoin.transaction1[8]')}}</el-button>
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
				}else {
					_this.form.Price = "0"
				};
			},
			'form.numberF':function(val,oval){
				var _this = this;
				if(val){
					_this.form.numF = Number(val);
					
					_this.form.turnoverF =_this.$public.toLowFixed(_this.$Mathjs.multiply(_this.form.numberF, _this.form.Price),4,0);
				}else {
					_this.form.numF = 0;
					_this.form.turnoverF = 0;
				}
			},
			'form.numF':function(val,oval){ //市价滑杆数量
				var _this = this;
				_this.form.numberF = Number(val);
			},
			'form.numberM':function(val,oval){
				var _this = this;
				if(val){
					_this.form.numM = Number(val);
					_this.form.turnoverM =_this.$public.toLowFixed(_this.form.numberM,8,0);
				}else {
					_this.form.numM = 0;
					_this.form.turnoverM = 0;
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
				_this.form.Price = _this.Data.PriceData;
				_this.maximumM = _this.Data.DalanceData;
				_this.maximumF = _this.Data.DalanceData;
			},
			'form.Price':function(val,oval){
				var _this = this;
				if(_this.$public.parnt.test(val)){
					// _this.form.turnoverF = _this.$public.Multiplication(_this.$public.Multiplication(_this.form.numberF, _this.form.Price),_this.$public.Addition(1,_this.Data.dealFee1/100)).toFixed('4');
					
						_this.form.turnoverF =_this.$public.toLowFixed(_this.$Mathjs.multiply(_this.form.numberF, _this.form.Price),4,0);
					
					
				};
			},
		},
		methods: {
			onSubmit:function(){//订单
				var _this = this,entrustNum,billPriceType;
				_this.loadingsellout = true;
				if(!_this.ModifyState){
					if(!_this.$public.parnt.test(_this.form.Price)){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[11]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					if(!_this.$public.Eightbits(_this.form.numberF)){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[12]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					if(_this.form.numberF > _this.maximumF){
						_this.$message({
				          	showClose: true,
				          	message: _this.$t('coincoin.Order[13]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					entrustNum = _this.form.numberF;
					billPriceType = "2";
				}else {
					if(!_this.$public.Eightbits(_this.form.numberM)){
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
				          	message: _this.$t('coincoin.Order[13]'),
				          	type: 'error'
				        });
				        _this.loadingsellout = false;
				        return false;
					};
					entrustNum = _this.form.numberM;
					billPriceType = "1";
				};
				var addBill = {
					stockCode:_this.Data.CodeData,//代码
					billPriceType:billPriceType,//1市价 2限价
					entrustNum:entrustNum,//委托数量
					entrustPrice:_this.form.Price,//委托价
					tradeType:"2",//买卖方向:1:买入，2:卖出
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
		created: function() {
			var _this = this;
			_this.getUserData();
		},
		components: {}
	}
</script>