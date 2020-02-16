<style lang=less >
	@import '../../assets/public.less';
	@import './index.less';
</style>
<template>
	<main class="main_content">
		<section class="main_content_header">
			<ul class="banner_header_box">
				<li class="banner_header_list">
					<i class="icon_bannerheader1"></i>
					<span>{{$public.sectotime(getdata.time)}}</span>
				</li>
				<li class="banner_header_list">
					<i class="icon_bannerheader2"></i>
					<span>{{getdata.user_seed}}</span>
				</li>
				<li class="banner_header_list">
					<i class="icon_bannerheader3"></i>
					<span>{{getdata.airborne}}%({{getdata.airborne_money}}ETH)</span>
				</li>
				<li class="banner_header_list">
					<i class="icon_round4" @click="Projectilecilck('3')"></i>
				</li>
			</ul>
		</section>
		<section class="banner">
			<!-- 还没有开奖那 -->
			<div class="banner_one" v-if="theprizetype">
				<h2 class=" banner_header">{{$t("hub3d.header1[0]")}}</h2><!-- 上一局游戏结束 -->
				<h2 class="banner_Jackpot">
					<span class=" alllastmay ">
						{{Winnerdata.money}}
					</span>
					<i class="icon_eth0"></i>
				</h2>
				<h3 class="banner_tishi">
					<span class="">{{$t("hub3d.header1[1]")}}</span><!-- 被 -->
					<span class="lastpeople">{{Winnerdata.user}}</span>
					<span class="">{{$t("hub3d.header1[2]")}}</span><!-- 卷走！ -->
				</h3>
				<h4 class="banner_footer sendeth" @click="Clickbuy('1',true)">
					<i class="icon_Nut1"></i>
					<span>x1</span>
					<p class="footer_text">{{getdata.msg}}</p><!-- 最后一个能量，我知道你想要它 -->
				</h4>
			</div>
			<!-- 开奖了 -->
			<div class="banner_two" v-else>
				<h2 class=" banner_tishi">{{$t("hub3d.header2[0]")}}</h2><!-- 已经有人比你先梭哈了 -->
				<h2 class=" banner_header">{{$t("hub3d.header2[1]")}}</h2><!-- 目前超级金池为 -->
				<h3 class="banner_Jackpot">
					<span>
						<span id="tpot">{{getdata.pond_money}}</span>
						<i class="icon_eth0" style="position: relative; top: 32px;"></i>
					</span>
				</h3>
				<h3>
					<span id="downTime">{{$public.sectotime(getdata.time)}}</span>
				</h3>
				<h4 class="banner_footer sendeth" @click="Clickbuy('1',true)">
					<i class="icon_Nut1"></i>
					<span>x1</span>
					<p class="footer_text">{{getdata.msg}}</p><!-- 最后一个能量，我知道你想要它 -->
				</h4>
			</div>
		</section>
		<section class="content">
			<section class="content_main">
				<div class="information_content">
					<!-- 购买的选择 -->
					<section class="information_header">
						<ul class="information_header_box">
							<li class="header_list" :class="{list_dianji: information =='1'}" @click="informationcilck('1')">{{$t("hub3d.informationheader[0]")}}</li><!-- 购买 -->
							<li class="header_list" :class="{list_dianji: information =='2'}"  @click="informationcilck('2')">{{$t("hub3d.informationheader[1]")}}</li><!-- 金库 -->
							<!-- <li class="header_list " typeface_ch="推荐奖励" typeface_en="Vanity &amp; Referrals">推荐奖励</li> -->
						</ul>
					</section>
					<ul class="information_box">
						<!-- 购买显示 -->
						<li class="information_one" v-if="information =='1'">
							<section class="one_main">
								<h2 class="one_header">{{$t("hub3d.informationone[0]")}}</h2><!-- 新一轮游戏 -->
								<h2 class="one_header_one">
									<span class="">{{$t("hub3d.informationone[1]")}}</span><!-- 购买 -->
									<span class="">{{$t("hub3d.informationone[2]")}}</span><!-- 或更多，有 -->
									<span id="airt">{{getdata.airborne}}%</span>
									<span class="">{{$t("hub3d.informationone[3]")}}</span><!-- 的机会立即获取 -->
									<span id="airp">{{getdata.airborne_money}}</span>
									<span class="">{{$t("hub3d.informationone[4]")}}</span><!-- 空投！ -->
								</h2>
								<div class="input">
									<div class="input_heaer">
										<i class="icon_Nut0"></i>
									</div>
									<input type="number" name="number" class="input_inp" id="keyNum" v-model="formLabelAlign.num">
									<div class="input_footer">
										{{$t("hub3d.informationone[9]")}}@
										<span id="price">{{ $public.toLowFixed(getdata.price*formLabelAlign.num,6.0) }}</span> ETH
									</div>
								</div>
								<input type="hidden" id="priceOne" value="0.000109">
								<ul class="purchase">
									<li class="item" @click="addandsubtract('1')">+1 {{$t("hub3d.informationone[9]")}}</li>
									<li class="item" @click="addandsubtract('2')">+2 {{$t("hub3d.informationone[9]")}}</li>
									<li class="" @click="addandsubtract('5')">+5</li>
									<li class="" @click="addandsubtract('10')">+10</li>
									<li class="" @click="addandsubtract('100')">+100</li>
									<li class="" @click="addandsubtract('1000')">+1000</li>
								</ul>
								<div class="button_box">
									<button class="button_guo dian" @click="Clickbuy('1')">
										<i class="icon_eth3"></i>
										<span class="">{{$t("hub3d.informationone[5]")}}</span><!-- 发送ETH -->
									</button>
									<button class="button_jin" @click="Clickbuy('2')">
										<i class="icon_round0"></i>
										<span class="">{{$t("hub3d.informationone[6]")}}</span><!-- 使用金库 -->
									</button>
								</div>
								<p class="one_header_one">{{$t("hub3d.informationone[7]")}}</p><!-- 发送ETH，或使用您的金库中的收入！ -->
								<div class="footWarp">
									<i class="icon_round4 chooseT" @click="Projectilecilck('1')"></i>
									<h2 class="one_header">{{$t("hub3d.informationone[8]")}}</h2><!-- 选择一个团队 -->
									<ul class="team_box">
										<li class="list_one" @click="Selectionteam('1')" :class="{list_one_dian: formLabelAlign.team =='1'}">
											<img src="./../../assets/image/hub3d/twhale.png">
											<p class="name">{{$t("hub3d.informationoneteam[0]")}}</p><!-- 超人 -->
											<p class="type">{{$t("hub3d.informationoneteam[1]")}}</p><!-- 以他人的贪婪为食 -->
											<p class="conner">{{$t("hub3d.informationoneteam[2]")}}</p><!-- ++更多ETH进入奖池 -->
										</li>
										<li class="list_one" @click="Selectionteam('2')" :class="{list_one_dian: formLabelAlign.team =='2'}">
											<img src="./../../assets/image/hub3d/tbear.png">
											<p class="name">{{$t("hub3d.informationoneteam[9]")}}</p><!-- 神奇女侠 -->
											<p class="type">{{$t("hub3d.informationoneteam[10]")}}</p><!-- 独立站立。独自战斗 -->
											<p class="conner">{{$t("hub3d.informationoneteam[11]")}}</p><!-- ++最大化的ETH进入当前游戏 -->
										</li>
										<li class="list_one" @click="Selectionteam('3')" :class="{list_one_dian: formLabelAlign.team =='3'}">
											<img src="./../../assets/image/hub3d/tsnek.png">
											<p class="name">{{$t("hub3d.informationoneteam[3]")}}</p><!-- 蝙蝠侠 -->
											<p class="type">{{$t("hub3d.informationoneteam[4]")}}</p><!-- 涓涓细流 -->
											<p class="conner">{{$t("hub3d.informationoneteam[5]")}}</p><!-- ++大部分红利 -->
										</li>
										<li class="list_one" @click="Selectionteam('4')" :class="{list_one_dian: formLabelAlign.team =='4'}">
											<img src="./../../assets/image/hub3d/tbull.png">
											<p class="name">{{$t("hub3d.informationoneteam[6]")}}</p><!-- 海王 -->
											<p class="type">{{$t("hub3d.informationoneteam[7]")}}</p><!-- 向上突破，永不停滞 -->
											<p class="conner">{{$t("hub3d.informationoneteam[8]")}}</p><!-- ++均衡分配 -->
										</li>
									</ul>
								</div>
							</section>
						</li>
						<!-- 金库 -->
						<li class="information_two" v-else-if="information =='2'">
							<section class="two_main">
								<h2 class="two_header">{{$t("hub3d.informationtwo[0]")}}</h2><!-- 金库资产 -->
								<i class="icon_round4 vault" @click="Projectilecilck('2')"></i>
								<ul class="two_box">
									<li class="two_list">
										<p class="two_text">{{$t("hub3d.informationtwo[1]")}}</p><!-- 锁定部分 -->
										<p class="two_text_conner">
											<span id="locketh">{{getdata.lock_money}}</span> ETH
										</p>
									</li>
									<li class="two_list">
										<p class="two_text">{{$t("hub3d.informationtwo[2]")}}</p><!-- 能量分红 -->
										<p class="two_text_conner">
											<span id="genh">
											{{getdata.seed_reward}}	
											</span> ETH
										</p>
									</li>
									<li class="two_list1">
										<h2 class="">
											<p class="two_text">{{$t("hub3d.informationtwo[4]")}}</p><!-- 暂时总收入 -->
											<p class="two_text_conner">
												<span id="tincome">{{getdata.user_all_money}}</span>
												ETH
											</p>
										</h2>
										<h3 class="two_list1_footer">≈ 
											<span id="youAllCny">{{ Math.floor((getdata.user_all_money * getdata.huilv)*1000)/1000 }}</span>
										CNY</h3>
									</li>
									<li class="two_list2">
										<button class="Putforward" @click="Clickbuy('3')">
											<i class="icon_round3"></i>
											<span class="">{{$t("hub3d.informationtwo[5]")}}</span><!-- 提现 -->
										</button>
									</li>
								</ul>
							</section>
						</li>
					</ul>
				</div>
				<!-- 团队 -->
				<div class="team">
					<section class="team_header">
						<ul class="team_header_box">
							<li class="header_list" :class="{list_dianji: iteam =='1'}" @click="iteamcilck('1')">{{$t("hub3d.teamheader[0]")}}</li><!-- 回合 -->
							<li class="header_list" :class="{list_dianji: iteam =='2'}" @click="iteamcilck('2')">{{$t("hub3d.teamheader[1]")}}</li><!-- 团队 -->
							<li class="header_list" :class="{list_dianji: iteam =='3'}" @click="iteamcilck('3')">{{$t("hub3d.teamheader[2]")}}</li><!-- 统计 -->
							<!-- <li class="haeder_list right">
								<router-link to="hub3drecord">{{$t("hub3d.teamheader[3]")}}</router-link>
							</li> -->
						</ul>
					</section>
					<ul class="team_box">
						<!-- 购买显示 -->
						<li class="iteam_one" v-if="iteam =='1'">
							<section class="one_main">
								<div class="hander_team">
									<span class="">{{$t("hub3d.iteamone[0]")}}</span><!-- 回合# -->
									<span>{{getdata.game_num}}</span>
								</div>
								<p class="one_header_one">
									<span class="">{{$t("hub3d.iteamone[1]")}}</span><!-- 距离游戏结束还有 -->
									<span id="downTime2">{{$public.sectotime(getdata.time)}}</span>
								</p>
								<ul class="one_box">
									<li class="one_list">
										<h2 class="list_header">
											<p class="one_text">{{$t("hub3d.iteamone[2]")}}</p><!-- 超级奖池 -->
											<p class="one_conner">
												<span class="number canyuAll">{{getdata.all_money}}</span>
												<i class="icon_eth1"></i>
											</p>
										</h2>
										<h3> ≈ <span id="canyuAllCny">
											{{ $public.toLowFixed(getdata.pond_money * getdata.huilv,2,0) }}</span> CNY</h3>
									</li>
									<li class="one_list">
										<h2 class="list_header">
											<p class="one_text">{{$t("hub3d.iteamone[3]")}}</p><!-- 我的能量 -->
											<p class="one_conner">
												<span id="myKey">{{getdata.user_seed}}</span>
												<i class="icon_Nut2"></i>
											</p>
										</h2>
										<h3>
											<span class="">{{$t("hub3d.iteamone[4]")}}</span><!-- 玩家共购买 -->
											<span class="keysAll">{{getdata.seed}}</span>
											<span class="">{{$t("hub3d.iteamone[5]")}}</span><!-- 个能量 -->
										</h3>
									</li>
										
									<li class="one_list">
										<h2 class="list_header">
											<p class="one_text">{{$t("hub3d.iteamone[6]")}}</p><!-- 我的收入 -->
											<p class="one_conner">
												<span class="tincome">{{getdata.user_all_money}}</span>
												<i class="icon_eth2"></i>
											</p>
										</h2>
										<h3> ≈ <span id="tincomeCny">{{ $public.toLowFixed(Math.floor((getdata.user_all_money * getdata.huilv)*1000)/1000,2,0) }}</span> CNY</h3>
									</li>
								</ul>
							</section>
						</li>
						<!-- 团队 -->
						<li class="iteam_two" v-else-if="iteam =='2'">
							<section class="two_main">
								<h2 class="two_header">{{$t("hub3d.iteamtwo[0]")}}</h2><!-- 加入团队 -->
								<ul class="two_box">
									<li class="two_list">
										<img src="./../../assets/image/hub3d/twhale.png">
										<p class="text">{{$t("hub3d.iteamtwo[1]")}}</p><!-- 超人 -->
										<p class="number">
											<span id="seth">{{getdata.team_one}}</span> ETH
										</p>
										<p class="number" style="padding-top: 5px;">
											{{ $public.toLowFixed((getdata.team_one/getdata.all_money) * 100,2,0) }}%</p>
									</li>
									<li class="two_list">
										<img src="./../../assets/image/hub3d/tbear.png">
										<p class="text">{{$t("hub3d.iteamtwo[4]")}}</p><!-- 神奇女侠 -->
										<p class="number">
											<span id="xeth">{{getdata.team_two}}</span> ETH
										<p class="number" style="padding-top: 5px;">
											{{ $public.toLowFixed((getdata.team_two/getdata.all_money) * 100,2,0) }}%</p>
											
										</p>
									</li>
									<li class="two_list">
										<img src="./../../assets/image/hub3d/tsnek.png">
										<p class="text">{{$t("hub3d.iteamtwo[2]")}}</p><!-- 蝙蝠侠 -->
										<p class="number">
											<span id="jeth">{{getdata.team_three}}</span> ETH
										<p class="number" style="padding-top: 5px;">
											{{ $public.toLowFixed((getdata.team_three/getdata.all_money) * 100,2,0) }}%</p>
											
										</p>
									</li>
									<li class="two_list">
										<img src="./../../assets/image/hub3d/tbull.png">
										<p class="text">{{$t("hub3d.iteamtwo[3]")}}</p><!-- 海王 -->
										<p class="number">
											<span id="neth">{{getdata.team_four}}</span> ETH
										<p class="number" style="padding-top: 5px;">
											{{ $public.toLowFixed((getdata.team_four/getdata.all_money) * 100,2,0) }}%</p>
											
										</p>
									</li>
								</ul>
							</section>
						</li>
						<!-- 统计 -->
						<li class="iteam_three" v-else-if="iteam =='3'">
							<section class="three_main">
								<div class="iteam_three_header">
									<span class="">{{$t("hub3d.iteamthree[0]")}}</span><!-- 回合统计# -->
									<span class="tongji">{{getdata.game_num}}</span>
									<span class="">{{$t("hub3d.iteamthree[1]")}}</span><!-- (当前) -->

								</div>
								<p class="three_header_three">											
									<span class="">{{$t("hub3d.iteamthree[2]")}}</span><!-- 距离游戏结束还有 -->
									<span id="downTime4">{{$public.sectotime(getdata.time)}}</span>
								</p>
								<ul class="three_box">
									<li class="three_list">
										<h2 class="list_header">
											<p class="three_text">{{$t("hub3d.iteamthree[3]")}}</p><!-- 参与总额: -->
											<p class="three_conner">
												<span class="number" id="tinvested">{{getdata.all_money}}</span>
												<i class="icon_eth1"></i>
											</p>
										</h2>
										<h3>≈ <span id="tinvestedCny">{{ $public.toLowFixed(getdata.all_money * getdata.huilv,2,0) }}</span> CNY</h3>
									</li>
									<li class="three_list">
										<h2 class="list_header">
											<p class="three_text">{{$t("hub3d.iteamthree[4]")}}</p><!-- 分红奖励: -->
											<p class="three_conner">
												<span id="winh">{{getdata.seed_reward}}</span>
												<i class="icon_eth2"></i>
											</p>
										</h2>
										<h3>≈ <span id="winhCny">{{ $public.toLowFixed(Math.floor((getdata.seed_reward * getdata.huilv)*1000)/1000,2,0) }}</span> CNY</h3>
									</li>
									<li class="three_list">
										<h2 class="list_header">
											<p class="three_text">{{$t("hub3d.tuijian")}}</p><!-- 推荐收益 -->
											<p class="three_conner">
												<span id="tjsy">{{getdata.rec_reward}}</span>
												<i class="icon_eth2"></i>
											</p>
										</h2>
										<h3>
											<span class=""> ≈ {{$public.toLowFixed(getdata.rec_reward * getdata.huilv,2,0)}} CNY</span><!-- 个能量 -->
										</h3>
									</li>
									
									
									<li class="three_list">
										<h2 class="list_header">
											<p class="three_text">{{$t("hub3d.iteamthree[5]")}}</p><!-- 购买时间: -->
											<p class="three_conner">
												<span id="keys">{{getdata.all_time}}</span> {{$t("hub3d.iteamthree[6]")}}<!-- 年 -->
												<i class="icon_eth2"></i>
											</p>
										</h2>
										<h3>
											<span id="maioAll">≈ {{getdata.has_time}}</span>
											<span class="">{{$t("hub3d.iteamthree[7]")}}</span><!-- 秒 -->
										</h3>
									</li>
								</ul>
							</section>
						</li>
					</ul>
				</div>
			</section>
		</section>
		<section class="Projectile" v-if="Projectile != '0'">
			<!-- 团队 -->
			<section class="team"  v-if="Projectile == '1'">
				<div class="Projectile_box" v-for="(item,index) in Noticedata" :key="index" v-if="item.flag == 'team'">
					<h2 class="team_header">
						<p class="team_header_text">{{item.title}}</p>
						<span class="icon_guanbi" @click="Projectilecilck('0')">x</span>
					</h2>
					<ul class="team_box">
						<li class="team_list">
							<p class="info" v-html="item.content">
							</p>
						</li>
					</ul>
				</div>
			</section>
			<!-- 金库 -->
			<section class="team"  v-if="Projectile == '2'">
				<div class="Projectile_box" v-for="(item,index) in Noticedata" :key="index" v-if="item.flag == 'gold'">
					<h2 class="team_header">
						<p class="team_header_text">{{item.title}}</p>
						<span class="icon_guanbi" @click="Projectilecilck('0')">x</span>
					</h2>
					<ul class="team_box">
						<li class="team_list">
							<p class="info" v-html="item.content">
								<!--{{item.content}}-->
							</p>
						</li>
					</ul>
				</div>
			</section>
			<!-- 空投 -->
			<section class="team"  v-if="Projectile == '3'">
				<div class="Projectile_box" v-for="(item,index) in Noticedata" :key="index" v-if="item.flag == 'airboren'">
					<h2 class="team_header">
						<p class="team_header_text">{{item.title}}</p>
						<span class="icon_guanbi" @click="Projectilecilck('0')">x</span>
					</h2>
					<ul class="team_box">
						<li class="team_list">
							<p class="info" v-html="item.content">
								<!--{{item.content}}-->
							</p>
						</li>
					</ul>
				</div>
			</section>
		</section>
		<el-dialog :title="$t('crowdFunding.main3[0]')" :visible.sync="dialogVisible" width="30%">
			<!-- 提示 -->
			<el-form label-position="left" label-width="80px" :model="formLabelAlign">
				<el-form-item :label="$t('crowdFunding.main3[3]')"><!-- 支付密码 -->
					<el-input v-model="formLabelAlign.pwd" type="password" @keyup.enter.native="handleClose()"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false;formLabelAlign.pwd = ''">{{$t('crowdFunding.main3[4]')}}</el-button><!-- 取 消 -->
				<el-button type="primary" :loading="loadingtrue" @click="handleClose()">{{$t('crowdFunding.main3[5]')}}</el-button><!-- 确 定 -->
			</span>
		</el-dialog>
	</main>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				getdata:[],//初始化数据
				information:"1",//左边的显示
				iteam:"1",//右边的显示
				Projectile:"0",//弹框显示第几个
				MainData:"",//推送变量
				countdown:'',//倒计时
				dialogVisible:false,//弹框显示
				purchasetype:"1",//那种方式购买
				loadingtrue:false,//按钮提交
				theprizetype:false,//header中奖状态切换
				formLabelAlign:{
					num:"1",
					team:"1",
					pwd:"",
				},//购买信息
				Noticedata:'',//公告
				Winnerdata:"",//中奖人信息
			};
		},
		watch: {
			'formLabelAlign.num':function(val,oval){
				var _this = this;
				if(!val){
					_this.formLabelAlign.num = "1";
				};
				if(val.toString().split('.').length != 1){
					_this.formLabelAlign.num = val.split('.')[0];
				};
			}
		},
		methods: {
			requestPublic(){
				var _this = this;
				_this.$http.get(_this.$http.dataList, {params: {}}).then((res) => {
					if(res.status == "200"){
						_this.getdata = res.data.data;
						_this.MainDatapush();
						_this.Countdown();
					}
				});
				_this.$http.get(_this.$http.getArticle, {params: {}}).then((res) => {
					if(res.status == "200"){
						_this.Noticedata = res.data.data;
					}
				});
			},
			informationcilck(type){
				var _this = this;
				switch (type) {
					case '1':
						_this.information = 1;
						break;
					case '2':
						_this.information = 2;
						break;
					default:
						// statements_def
						break;
				}
			},
			iteamcilck(type){
				var _this = this;
				switch (type) {
					case '1':
						_this.iteam = 1;
						break;
					case '2':
						_this.iteam = 2;
						break;
					case '3':
						_this.iteam = 3;
						break;
					default:
						// statements_def
						break;
				}
			},
			Projectilecilck(type){
				var _this = this;
				switch (type) {
					case '1':
						_this.Projectile = 1;
						break;
					case '2':
						_this.Projectile = 2;
						break;
					case '3':
						_this.Projectile = 3;
						break;
					default:
						_this.Projectile = 0;
						break;
				};
			},
			MainDatapush() {//推送数据
				var connet = this,account,token;
				// 首先判断是否 支持 WebSocket
				if('WebSocket' in window) {
					connet.MainData = new WebSocket(connet.$http.Fm3dwsurl);
				} else if('MozWebSocket' in window) {
					connet.MainData = new MozWebSocket(connet.$http.Fm3dwsurl);
				} else {
					connet.MainData = new SockJS(connet.$http.Fm3dwsurl);
				}
				// 打开时
				connet.MainData.onopen = function(evnt) {
					if(sessionStorage.account){
						account =  sessionStorage.account;
						token = sessionStorage.token;
					};
					var msg = {
						"token":token,
						"account":account,
					};
					// 发送消息
					connet.MainData.send(JSON.stringify(msg));
				};
				// 处理消息时
				connet.MainData.onmessage = function(evnt) {
					var datanum = JSON.parse(evnt.data);
					for (var i in datanum.data) {
						if(i != 'time'){
							connet.getdata[i] = datanum.data[i];
						}else {
							if(datanum.type == '2'){
								connet.getdata[i] = 0;
								connet.theprizetype = true;
								
								if(connet.Winnerdata){
									if(connet.Winnerdata.game_num != datanum.data.game_num){
										connet.Detailsoftheprize();
									};
								}else {
									connet.Detailsoftheprize();
								}
								
								
							}else {
								connet.theprizetype = false;
								connet.getdata[i] = datanum.data[i];
								if(connet.countdown){
									clearInterval(connet.countdown);
									connet.Countdown();
								};
							};
						};
					};
				};
				connet.MainData.onerror = function(evnt) {
				};
				connet.MainData.onclose = function(evnt) {
				};
			},
			Detailsoftheprize(){//中奖详情
				var _this = this;
				var gameHasOver = {
					game_num:_this.getdata.game_num-1,
				};
				_this.$http.post(_this.$http.gameHasOver, gameHasOver).then((res) => {
					if(res.status == "200"){
						_this.Winnerdata = res.data.data;
					}
				});
			},
			Countdown(){//倒计时
				var _this = this;
				_this.countdown = window.setInterval(function () {
					_this.getdata.time--;
					if(_this.getdata.time < 1){
						clearInterval(_this.countdown);
					};
				},1000);
			},
			Clickbuy(type,One){//点击购买
				var _this = this;
				if(!sessionStorage.account || !sessionStorage.token) { //没有登录
					_this.$public.confirm(_this.$t('frenchcurrency.tishi2[0]'), 'login', _this);
					return false;
				};
				_this.$http.post(_this.$http.user_info, {}).then(function(response) {
					if(response.data.status == "200") {
						if(response.data.data.tpwd == false) {//您还没有设置资金密码，是否前往设置
							_this.$public.confirm(_this.$t("apply.judge[1]"), 'security', _this);
							return false;
						};
						_this.purchasetype = type;
						_this.dialogVisible = true;
						_this.formLabelAlign.pwd  = '';
						if(One){
							_this.formLabelAlign.num = "1";
						};
					} else if(response.data.status == "0") {
						_this.$public.confirm(_this.$t("apply.getData"), 'login', _this);
					}
				}).catch(function(error) {});
			},
			handleClose(){//购买
				var _this = this,_url,_urldata;
				switch (_this.purchasetype) {
					case "1":
						_url = _this.$http.buySeed;
						break;
					case "2":
						_url = _this.$http.rewardBuySeed;
						break;
					case "3":
						_url = _this.$http.rewardToAccount;
						break;
					default:
						
						break;
				};
				if(!_this.$public.pwd(_this.formLabelAlign.pwd)){
					_this.$public.msg(_this.$t("Verification.Password[0]"), 'warning', _this);//请输入有效的密码
					return false;
				};
				_urldata = {
					pwd: _this.$md5(_this.formLabelAlign.pwd)
				};
				if(_this.purchasetype != "3"){
					if(!_this.formLabelAlign.num){
						_this.$public.msg(_this.$t('hub3d.Tips[0]'), 'warning', _this);
						return false;
					};
					if(isNaN(_this.formLabelAlign.num)){
						_this.$public.msg(_this.$t('hub3d.Tips[1]'), 'warning', _this);
						return false;
					};
					if(_this.formLabelAlign.num.toString().split('.').length != 1){
						_this.$public.msg(_this.$t('hub3d.Tips[2]'), 'warning', _this);
						return false;
					};
					_urldata.num = _this.formLabelAlign.num;
					_urldata.team = _this.formLabelAlign.team;
				};
				_this.loadingtrue = true;
				_this.$http.post(_url,_urldata).then((res) => {
					_this.loadingtrue = false;
					_this.formLabelAlign.pwd = "";
					_this.dialogVisible = false;
					if(res.data.status == "200") {
						_this.$message({
				          	message: _this.$t('hub3d.Tips[2]'),
				          	type: 'success'
				        });
					}else {
						_this.$message({
				          	message: res.data.msg,
				          	type: 'warning'
				        });
					};
				});
			},
			addandsubtract(type){//数量加减
				var _this = this;
				_this.formLabelAlign.num =  Number(_this.formLabelAlign.num) + Number(type);
			},
			Selectionteam(type){
				var _this = this;
				_this.formLabelAlign.team =  Number(type);
			}
		},
		// 路由改变时
		beforeRouteLeave(to, from, next) {
			var _this = this;
			clearInterval(_this.countdown);
			next();
		},
		created: function() {
			var _this = this;
			_this.requestPublic();
		},
	}
</script>