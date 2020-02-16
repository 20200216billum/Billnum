<style lang="less">
	@import '../../../assets/public.less';
	@import './exchangeCoin.less';
	.bordershow{
		.el-input__inner{
			border-width:1px;
		}
	}
</style>

<template>
	<div class="exchangeCoin">
		<div class="wrap">
			<h3 class="exchange_title">{{$t('exchangeCoin.main1[0]')}}</h3>
			<!-- 兑换 -->
			<section class="exchangeCont">
				<p class="title">
					<span class="coin">{{$t('exchangeCoin.main2[0]')}}  {{$route.query.usable}} {{$route.query.pname}}</span>
					<!--兑换币种  -->
					<span class="tips">{{$t('exchangeCoin.main2[1]')}}</span>
					<!-- 持有资产可按照比例兑换为其他资产 -->
				</p>
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class='exchangeForm'>
					<el-form-item :label="$t('exchangeCoin.main3[0]')">
						<!--兑换资产  -->
						<el-select v-model="value" placeholder="" class='coinType' @change="ischange(value)">
							<el-option v-for="(v,index) in formLabelAlign" :label="v.ex_name" :value="v.ex_name" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<p class="canUse">
						<span>{{$t('exchangeCoin.main3[1]')}}：{{$route.query.usable}} </span>
						<!-- 可用 -->
						<span>{{$t('exchangeCoin.main3[2]')}}：{{$route.query.frost}} </span>
						<!-- 冻结 -->
					</p>
					<el-form-item :label="$t('exchangeCoin.main3[3]')">
						<!-- 兑换数量 -->
						<el-input v-model="sendData.num" type="number" class="bordershow"></el-input>
						<p class="ziChan">{{$t('exchangeCoin.main3[0]')}}：{{ $public.toLowFixed((sendData.num * ex_rate),6,0) }} {{value}}</p>
						<!-- 兑换资产 -->
					</el-form-item>
					<el-form-item class='clearfix'>
						<el-button type="primary" class='exchangeBtn' @click="exchangeBtn" :loading="loading">{{$t('exchangeCoin.main1[0]')}}</el-button>
						<!-- 兑换 -->
					</el-form-item>
					<el-form-item>
						<p class="tit">{{$t('exchangeCoin.main3[5]')}}：</p>
						<!--温馨提示  -->
						<!--<p class="tipsmsg">{{$t('exchangeCoin.main3[6]')}}：100 3D</p> 最小兑换数量为：100 3D-->
						<p class="tipsmsg">{{$t('exchangeCoin.main3[7]')}}</p>
						<!-- 请务必确认电脑及浏览器安全，防止信息呗篡改或泄露 -->
						<p class="tipsmsg">{{$t('exchangeCoin.main3[8]')}}</p>
						<!-- 如兑换过程遇到问题，请联系客服人员或邮件联系相关人员 -->
					</el-form-item>
				</el-form>
			</section>

			<div class="historyList">
				<h3 class="exchange_title">{{$t('exchangeCoin.main5[0]')}}</h3>
				
				<div class="listWarp">
				<template>
					<el-table :data="coinList" style="width: 100%">
						<el-table-column prop="addtime" :label="$t('exchangeCoin.main5[1]')" width="340">
							<template slot-scope="scope">
								<div>{{ $public.timestampToTime(scope.row.addtime) }}</div>
							</template>
							
						</el-table-column>
						<el-table-column prop="num" :label="$t('exchangeCoin.main5[2]')" width="340">
						</el-table-column>
						<el-table-column prop="exnum" :label="$t('exchangeCoin.main5[3]')" width="340">
						</el-table-column>
						<el-table-column prop="memo" :label="$t('exchangeCoin.main5[4]')">
						</el-table-column>
					</el-table>
				</template>
					
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				value: '',
				labelPosition: 'top',
				ex_rate: '', //汇率
				formLabelAlign: [],
				coinList:[],

				sendData: {
					num: '', //要兑换的数量
					ex_coin: '', //要兑换成的币种标识
					coin: '', //币种标识
				}
			}
		},
		methods: {
			//获得code数据
			getCodeInfo() {
				var _this = this;
				_this.$http.get(_this.$http.thisCoinList, {
						params: {
							coin: _this.sendData.coin
						}
					})
					.then((res) => {
						_this.formLabelAlign = res.data.data;
						_this.value = res.data.data[0].ex_name;
						_this.ex_rate = res.data.data[0].ex_rate;
						_this.sendData.ex_coin = res.data.data[0].ex_coin;
					});

			},
			//下拉列表发生变化时
			ischange(val) {
				for(var i = 0; i < this.formLabelAlign.length; i++) {
					if(val == this.formLabelAlign[i].ex_name) {
						this.ex_rate = this.formLabelAlign[i].ex_rate
						this.sendData.ex_coin = this.formLabelAlign[i].ex_coin
					}
				}
			},
			//点击兑换执行函数
			exchangeBtn() {
				var _this = this;
				if(!_this.$public.Ints(_this.sendData.num)) {
					_this.$public.msg(_this.$t('exchangeCoin.main4[0]'), 'warning', _this); //兑换数量要大于零
					return false;
				} else if(_this.sendData.num.toString().indexOf('.') != -1 && _this.sendData.num.toString().split(".")[1].length > 8){
					_this.$public.msg(_this.$t('exchangeCoin.main4[2]'), 'warning', _this); //最大兑换数量不能大于可用余额
					return false;
					
				} else if(Number(_this.sendData.num) > Number(_this.$route.query.usable)) {
					_this.$public.msg(_this.$t('exchangeCoin.main4[1]'), 'warning', _this); //最大兑换数量不能大于可用余额
					return false
				}
				_this.loading = true;
				_this.$confirm(_this.$t('header.tips[3]'), _this.$t('bibi.tisi[1]'), {
		          confirmButtonText: _this.$t('bibi.tisi[2]'),
		          cancelButtonText: _this.$t('bibi.tisi[3]'),
		          type: 'warning'
		        }).then(() => {
		          	_this.sendData.ex_coin=_this.sendData.ex_coin.toLowerCase();
					_this.sendData.coin=_this.sendData.coin.toLowerCase();
					_this.$http.post(_this.$http.exchange, _this.sendData).then(function(response) {
						if(response.data.status == "200") {
							_this.$public.msg(response.data.msg, 'success', _this);
							setTimeout(function() {
								_this.$public.go('MyAssets', 0, _this);
							}, 600)
						} else {
							_this.$public.msg(response.data.msg, 'warning', _this);
							_this.loading = false;
						}
					}).catch(function(error) {});
		        }).catch(() => {
		          _this.loading = false;
		          _this.$message({
		            type: 'info',
		            message: _this.$t('bibi.tisi[4]')
		          });          
		        });
			},
			//获得兑换列表
			getList() {
				var _this = this;
				_this.$http.post(_this.$http.ex_list, {}).then(function(response) {
					if(response.data.status == "200") {
						_this.coinList = response.data.data.list
					}
				}).catch(function(error) {});

			}
		},
		created: function() {
			window.scrollTo(0, 0); //回到顶部
			var _this = this;
			_this.sendData.coin = _this.$route.query.mark;
			_this.getCodeInfo();
			_this.getList();
		}
	}
</script>