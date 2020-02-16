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
				<div class="imgUP">
					<div class="imgUP1">
						<div class="left">
							<!-- 正面照片 -->
							{{$t('Gic.securityChangePerson2[2]')}}
						</div>
						<div class="zhengmian right">
							<input type="file" name="" id="chooseImage1" accept=".jpg,.jpeg,.png">
							<img v-if="userForm.front_img" :src="userForm.front_img" class="avatar" style="position: relative">
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
							<img v-if="userForm.back_img" :src="userForm.back_img" class="avatar">
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
							<img v-if="userForm.handheld_img" :src="userForm.handheld_img" class="avatar">
							<!-- 请上传手持身份证件照片 -->
							<p>{{$t('Gic.securityChangePerson2[7]')}}</p>
						</div>
					</div>
				</div>
				<!-- 请确保上传图片无水印无污渍，身份信息清晰，请勿进行PS处理 -->
				<h3 class="buttontoptips">{{$t('Gic.securityChangePerson2[8]')}}</h3>
				<el-button type="primary" @click="submit">{{$t('Gic.securityChangeopwd[7]')}}</el-button>
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
				_this.$http.post(_this.$http.advancedCertification, _this.userForm).then(function(res) {
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
						_this.userForm.front_img    = reader.result

					var dataURL = reader.result;//base64
					// 显示图片
					$('#showImg').attr('src',dataURL);
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
						_this.userForm.back_img    = reader.result

					var dataURL = reader.result;//base64
					// 显示图片
					$('#showImg').attr('src',dataURL);
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
						_this.userForm.handheld_img    = reader.result

					var dataURL = reader.result;//base64
					// 显示图片
					$('#showImg').attr('src',dataURL);
				};
			});
		}
	}
</script>

<style scoped="scoped">

</style>