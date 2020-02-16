<!--高级认证-->
<!--
	身份认证和高级认证的css在identity.less
-->
<style lang=less>
	@import '../../../assets/public.less';
	@import '../identity.less';
</style>
<template>
	<div class="senior_main">
		<div class="senior_main_title">
			<h2 class="title" @click="go_back">{{$t("senior.list[0]")}}</h2><!-- 身份认证 -->
			<!-- <span>></span> -->
			<!-- <h2>{{$t("senior.list[1]")}}</h2> --><!-- 高级认证 -->
			<span class="indentify_notice">
				<i class="el-icon-info"></i>
				{{$t("senior.list[17]")}}
			</span>
		</div>
		<!-- <div class="senior_info">
			<div class="senior_info_header">
				<h2>{{$t("senior.list[2]")}}</h2>个人身份高级认证
			</div>
		</div> -->
		<div class="senior_cont">
			<el-form label-position="left" :model="getData" status-icon ref="getData" label-width="100px" class="demo-ruleForm">
				<el-form-item :label='$t("senior.list[15]")' prop="realname"><!-- 姓名 -->
					<el-input v-model.idcardword="getData.realname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item :label='$t("senior.list[16]")' prop="idcard"><!-- 身份证号 -->
					<el-input type="idcardword" v-model="getData.idcard" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<ul class="lis_warp">
				<li class="lis">
					<div class="title carId">
						<h2>{{$t("senior.list[3]")}}</h2><!-- 身份证正面照： -->
					</div>
					<div class="img carId">
						<img :src="urlcardimg1" v-show="getData.cardimg1"/>
						<p class="upload upload1" v-show="!getData.cardimg1">
							<!-- <i class="el-icon-upload2"></i>{{$t("senior.list[4]")}} -->
							<!-- <img class="upload upload1" src="../../../assets/image/upload.png"  v-show="!getData.cardimg1"/> -->
						</p><!-- 上传图片 -->
					</div>
					<div class="info carId">
						<span>{{$t("senior.list[5]")}}</span><!-- 必须能看清证件号和姓名，支持jpg/png/jpeg 大小不要超过2M -->
					</div>
				</li>
				<li class="lis">
					<div class="title carId">
						<h2>{{$t("senior.list[6]")}}</h2><!-- 身份证背面照： -->
					</div>
					<div class="img carId">
						<img :src="urlcardimg2" v-show="getData.cardimg2"/>
						<p class="upload upload2"  v-show="!getData.cardimg2">
							<!-- <img src="../../../assets/image/upload.png"  v-show="!getData.cardimg2"/> -->
							<!-- <i class="el-icon-upload2"></i>{{$t("senior.list[7]")}} -->
						</p><!-- 上传图片 -->
					</div>
					<div class="info carId">
						<span>{{$t("senior.list[18]")}}</span><!-- 必须能看清发证机关和有效日期，支持jpg/png/jpeg大小不要超过2M -->
					</div>
				</li>
				<li class="lis shouchiImg">
					<div class="title carId">
						<h2>{{$t("senior.list[8]")}}</h2><!-- 手持身份证照： -->
					</div>
					<div class="img carId">
						<img :src="urlcardimg3" v-show="getData.cardimg3"/>
						<p class="upload upload3" v-show="!getData.cardimg3">
							<!-- <img src="../../../assets/image/upload.png"  v-show="!getData.cardimg3"/> -->
							<!-- <i class="el-icon-upload2"></i>{{$t("senior.list[9]")}} -->
						</p><!-- 上传图片 -->
					</div>
					<div class="info carId">
						<!-- <span>{{$t("senior.list[10]")}}</span> --><!-- 请提供一张您手持证件照的照片 -->
						<ul class="info_lis_warp">
							<li>{{$t("senior.list[10]")}}</li><!-- 面部清晰可见,无遮挡,无妆容 -->
							<li>{{$t("senior.list[11]")}}</li><!-- 面部清晰可见,无遮挡,无妆容 -->
							<li>{{$t("senior.list[12]")}}</li><!-- 完整露出双手双臂 -->
							<li>{{$t("senior.list[13]")}}</li><!-- 证件照片及证件号清晰可见 -->
						</ul>
					</div>
				</li>
			</ul>
			<div class="btn_warp" @click="submit()">
				<el-button type="primary" :loading='isloading'>{{$t("senior.list[14]")}}</el-button><!-- 提交审核 -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isloading: false,
				getData: {
					cardimg1: '',
					cardimg2: '',
					cardimg3: '',
					realname: '',
					idcard: '',
				},
				urlcardimg1: 'src/assets/image/passport-home.png',
				urlcardimg2: 'src/assets/image/passport-home.png',
				urlcardimg3: 'src/assets/image/holding-passport.png'
			};
		},
		methods: {
			//点击提交按钮执行事件
			submit() {
				var _this = this;
				for(var key in _this.getData) {
					if(_this.getData[key] == '') {
						_this.$public.msg(_this.$t("senior.submit"), 'warning', _this);//请上传三张有效图片
						return false;
					}
				}
				_this.isloading = true;
				_this.$http.post(_this.$http.set_renzheng, _this.getData).then(function(response) {
					if(response.data.status == "200") {
						_this.isloading = false;
						_this.$public.msg(response.data.msg, 'success', _this);
						setTimeout(function() {
							_this.$router.go(-1); //返回上一层
						}, 10)
					} else {
						_this.$public.msg(response.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			go_back() {
				var _this = this;
				_this.$router.push({
					path: 'authentication'
				}); //返回上一层
			},
			//图片预览执行函数
			uploadcardimg1() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".upload1", // 选择文件的按钮。可选
					// 只允许选择图片文件。 
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/jpg,image/jpeg,image/png'
					},
					thumb: {
						type: 'image/jpg,jpeg,png'
					},
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: true,
					fileNumLimit: 8, //限制上传个数
					fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
				});
				// 上传成功
				conent.uploader.on('uploadSuccess', function(file, data) {

					conent.getData.cardimg1 = '/' + data.url;
					conent.urlcardimg1 = conent.$http.bases + data.url;
				});

			},
			uploadcardimg2() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".upload2", // 选择文件的按钮。可选
					// 只允许选择图片文件。 
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/jpg,image/jpeg,image/png'
					},
					thumb: {
						type: 'image/jpg,jpeg,png'
					},
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: true,
					fileNumLimit: 8, //限制上传个数
					fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
				});
				// 上传成功
				conent.uploader.on('uploadSuccess', function(file, data) {

					conent.getData.cardimg2 = '/' + data.url;
					conent.urlcardimg2 = conent.$http.bases + data.url;
				});

			},
			uploadcardimg3() {
				var conent = this;
				conent.uploader = WebUploader.create({
					auto: true, // 选完文件后，是否自动上传 
					swf: '../../../static/upload_img/Uploader.swf', // swf文件路径 
					server: conent.$http.upload, // 文件接收服务端 
					pick: ".upload3", // 选择文件的按钮。可选
					// 只允许选择图片文件。 
					accept: {
						title: 'Images',
						extensions: 'jpg,jpeg,png',
						mimeTypes: 'image/jpg,image/jpeg,image/png'
					},
					thumb: {
						type: 'image/jpg,jpeg,png'
					},
					// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
					resize: false,
					fileNumLimit: 8, //限制上传个数
					fileSingleSizeLimit: 2048000 //限制单个上传图片的大小
				});
				// 上传成功
				conent.uploader.on('uploadSuccess', function(file, data) {

					conent.getData.cardimg3 = '/' + data.url;
					conent.urlcardimg3 = conent.$http.bases + data.url;
				});
			},
		},
		mounted: function() {
			var _this = this;
			_this.uploadcardimg1();
			_this.uploadcardimg2();
			_this.uploadcardimg3();

		}
	}
</script>

<style scoped="scoped">

</style>