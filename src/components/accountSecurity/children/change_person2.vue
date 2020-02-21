<style lang=less>
	@import '../../../assets/public.less';
	@import './change_person2.less';
</style>
<template>
	<div class="senior_main change_person2">
		<div class="senior_main_title">
			<!-- 高级认证 -->
			<!-- 请务必填写您本人的真实姓名与证件信息 -->
			<h2 class="title">{{$t('Gic.securityChangePerson2[0]')}}<span>{{$t('Gic.securityChangePerson2[1]')}}</span></h2>
		</div>
		<div class="form">
			<el-form label-position="left">
				<div class="imgs_box">
					<div class="imgUP">
						<div class="imgUP1">
							<div class="left">
								<!-- 正面照片 -->
								{{$t('Gic.securityChangePerson2[2]')}}
							</div>
							<div class="zhengmian right">
								<input type="file" name="" id="chooseImage1" accept=".jpg,.jpeg,.png">
								<img v-if="userForm.front_img" :src="showimg1" class="avatar" style="position: relative">
								<!-- 请上传身份证正面照片 -->
								<p>{{$t('Gic.securityChangePerson2[3]')}}</p>
							</div>
						</div>
					</div>
					<div class="imgUP">
						<div class="imgUP1">
							<div class="left">
								<!-- 背面照片 -->
								{{$t('Gic.securityChangePerson2[4]')}}
							</div>
							<div class="beimian right">
								<input type="file" name="" id="chooseImage2" accept=".jpg,.jpeg,.png">
								<img v-if="userForm.back_img" :src="showimg2" class="avatar">
								<!-- 请上传身份证背面照片 -->
								<p>{{$t('Gic.securityChangePerson2[5]')}}</p>
							</div>
						</div>
					</div>
					<div class="imgUP">
						<div class="imgUP1">
							<div class="left">
								<!-- 手持证件照 -->
								{{$t('Gic.securityChangePerson2[6]')}}
							</div>
							<div class="shouchi right">
								<input type="file" name="" id="chooseImage3" accept=".jpg,.jpeg,.png">
								<img v-if="userForm.handheld_img" :src="showimg3" class="avatar">
								<!-- 请上传手持身份证件照片 -->
								<p>{{$t('Gic.securityChangePerson2[7]')}}</p>
							</div>
						</div>
					</div>
				</div>
				<el-button type="primary" @click="submit">{{$t('Gic.securityChangeopwd[7]')}}</el-button>
				<div class="tips">
					<p class="title">提醒：</p>
					<p class="buttontoptips">请确保上传图片无水印无污渍，身份信息清晰，请勿进行PS处理需要您本人单手持您的证件，另一只手持一张有您手写的ID和当天日期的白纸，确保身份证和白纸在您胸前，不遮挡您的胸部，并且身份证和白纸上的信息清晰可见</p>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userData:{},
				username:'',
				usercard:'',
				imageUrl1: '',
				imageUrl2:'',
				userForm:{
					// name:'',
					// card_id:'',
					front_img:'',
					back_img:'',
					handheld_img:'',
				},
				showimg1: "",
				showimg2: "",
				showimg3: "",
			};
		},
		methods: {
			submit(){
				var _this = this;
				if(!_this.userForm.front_img){
					_this.$public.msg(_this.$t('Gic.securityChangePerson2[3]'), 'warning', _this);
					return ;
				}
				if(!_this.userForm.back_img){
					_this.$public.msg(_this.$t('Gic.securityChangePerson2[5]'), 'warning', _this);
					return ;
				}
				if(!_this.userForm.handheld_img){
					_this.$public.msg(_this.$t('Gic.securityChangePerson2[7]'), 'warning', _this);
					return ;
				}

				var formData = new FormData();
				formData.append("front_img", _this.userForm.front_img)
				formData.append("back_img", _this.userForm.back_img)
				formData.append("handheld_img", _this.userForm.handheld_img)

				_this.$http.post(_this.$http.advancedCertification, formData, {
					headers: { "Content-Type": "multipart/form-data" }
				}).then(function(res) {
				  if(res.data.code == '200') {
					  	_this.$public.msg(_this.$t('Gic.securityChangeopwd[9]'), 'success', _this);
						_this.$router.go(-1); //返回上一层
					}else{
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
				})
			},
		},
		mounted: function() {
			var _this = this;
			_this.userData = sessionStorage.userData;

			$('#chooseImage1').on('change',function(e){
				// 检查是否是图片
				var filePath = $(this).val(),
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();//获取文件后缀名
				//检查后缀名
				if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
						// 文件格式必须为：png/jpg/jpeg
						showError(_this.$t('Gic.securityChangePerson2[9]'));//showError是另外写的一个显示错误信息的function
						return;  
				}

				//获取并记录图片的base64编码
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]); // 读出 base64
				reader.onloadend = function () {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值   
					// _this.userForm.front_img = reader.result
					_this.userForm.front_img = e.target.files[0]
					_this.showimg1 = reader.result
				};
			});
			$('#chooseImage2').on('change',function(e){
				// 检查是否是图片
				var filePath = $(this).val(),
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();//获取文件后缀名
				//检查后缀名
				if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
						showError(_this.$t('Gic.securityChangePerson2[9]'));//showError是另外写的一个显示错误信息的function
						return;  
				}

				//获取并记录图片的base64编码
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]); // 读出 base64
				reader.onloadend = function () {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值   
					// _this.userForm.back_img    = reader.result
					_this.userForm.back_img = e.target.files[0]
					_this.showimg2 = reader.result
				};
			});
			$('#chooseImage3').on('change',function(e){
				// 检查是否是图片
				var filePath = $(this).val(),
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();//获取文件后缀名
				//检查后缀名
				if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
						showError(_this.$t('Gic.securityChangePerson2[9]'));//showError是另外写的一个显示错误信息的function
						return;  
				}

				//获取并记录图片的base64编码
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]); // 读出 base64
				reader.onloadend = function () {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值   
					// _this.userForm.handheld_img    = reader.result
					_this.userForm.handheld_img = e.target.files[0]
					_this.showimg3 = reader.result
				};
			});
		}
	}
</script>