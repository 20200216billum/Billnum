<style lang=less>
	@import '../../../assets/public.less';
	@import '../security.less';

</style>
<template>
	<div class="back_card_main">
		<el-form :model="addForm" label-position="left" status-icon  ref="getData" label-width="80px" class="demo-ruleForm">
			<el-form-item :label='$t("wx.list[0]")'><!-- 姓名 -->
				<el-input type="text" v-model="userData.name" auto-complete="off" :disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item :label='$t("wx.list[1]")'><!-- 微信账号 -->
				<el-input type="text" v-model="addForm.wx" auto-complete="off" :placeholder='$t("wx.tip[0]")'></el-input>
			</el-form-item>
			<el-form-item label='二维码'>
				<div class="zhengmian right">
					<input type="file" name="" id="chooseImage1" accept=".jpg,.jpeg,.png" >
					<img v-if="addForm.wx_img" :src="addForm.wx_img" class="avatar">
				</div>
			</el-form-item>
			<!-- <el-form-item :label='$t("wx.list[2]")' prop="">二维码 -->
				<!-- <div class="erweima"> -->
					<!-- <img v-if="urlImg && getData.wx_img" :src="urlImg"> -->
					<!-- <p class="imgUp" v-else>{{$t("wx.list[3]")}}</p>请上传您的微信收款二维码( *.jpg/*.png*.jpeg )图片大小在2M内 -->
				<!-- </div> -->
				<!-- <div class="img_warp">
					<el-popover placement="right" width="320" trigger="hover">
						<img v-if="urlImg" :src="urlImg" width="320">
						<i slot="reference">
							<img v-if="urlImg" :src="urlImg">
						</i>
					</el-popover>
				</div> -->
			<!-- </el-form-item> -->
			<el-form-item :label='$t("wx.list[4]")'><!-- 资金密码 -->
				<el-input type="password" v-model="addForm.payment_password" auto-complete="off" :placeholder='$t("wx.tip[1]")'></el-input>
			</el-form-item>
		</el-form>
		<div class="el-message-box__btns">
			<button  class="el-button el-button--default el-button--small el-button--primary " @click="submitForm()">
				<span>{{$t("wx.list[5]")}}</span><!-- 确认添加 -->
			</button>
			<button  class="el-button el-button--default el-button--small el-button--primary " @click="cancel()">
				<span>{{$t("wx.list[6]")}}</span><!-- 取消 -->
			</button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			var _this = this;
			return {
				userData:{},
				addForm:{
					act:'add',
					type:'wx',
					payment_password:'',
					wx:'',
					wx_img:'',
				},
			};
		},

		methods: {
			cancel () {
				this.$public.go('/security?flat=ok',10,this); 
			},
			//请求个人信息
			userInfo(){
				var _this = this;
				_this.$http.get(_this.$http.details,{params:{}}).then(function(res) {
					if(res.data.code == '200') {
						sessionStorage.userData = JSON.stringify(res.data.data);
						_this.userData = res.data.data
					}
				})
			},
			//添加微信支付方式
			submitForm(){
				var _this = this;
				if(!_this.addForm.payment_password){
					_this.$public.msg('请输入您的资金密码', 'warning', _this);
					return ;
				}
				if(!_this.addForm.wx){
					_this.$public.msg('请输入您的微信账号', 'warning', _this);
					return ;
				}
				if(!_this.addForm.wx_img){
					_this.$public.msg('请选择您的二维码图片', 'warning', _this);
					return ;
				}
				_this.addForm.payment_password = _this.$md5(_this.addForm.payment_password);

				_this.$http.post(_this.$http.payAdd, _this.addForm).then(function(res) {
				  if(res.data.code == '200') {
					_this.$public.go('/security?flat=ok',10,_this); 
					_this.userInfo();
					_this.$public.msg('添加成功', 'success', _this);
				 }else{
					_this.$public.msg(res.data.msg, 'warning', _this);
				 }
				})

			},

			// init() {
			// 	var _this = this;
			// 	_this.uploadImg();
			// 	_this.getData.type = _this.$route.query.type //类型
			// 	_this.getData.id = _this.$route.query.id //类
			// 	if(_this.$route.query.id == undefined) {
			// 		_this.getData.act = 'add';
			// 		_this.getData.name = sessionStorage.name;
			// 	} else {
			// 		_this.getData.act = 'edit';
			// 		_this.getEdit();
			// 	}
			// }
				//判断支付方式添加或修改
			add(){
				var _this = this;
				if(!_this.$route.query.id){
					_this.addForm.act = 'add';
				}else{
					_this.addForm.act = 'edit'
					//获取支付方式详情
					_this.$http.post(_this.$http.payEdit, {
						id:_this.$route.query.id,
						type:_this.$route.query.type
					}).then(function(res) {
						if(res.data.code == '200') {
							_this.addForm.wx = res.data.data.wx;
							_this.addForm.wx_img = _this.$http.basess + res.data.data.wx_img;
						}else{
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
					})
				}
			},
		},
		create:function(){
			var _this = this;
		},
		mounted: function() {
			var _this = this;
			_this.add();
			_this.userData = JSON.parse(sessionStorage.userData);

			$('#chooseImage1').on('change',function(e){
				// 检查是否是图片
				var filePath = $(this).val(),
				fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();//获取文件后缀名
				//检查后缀名
				if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
						showError('文件格式必须为：png/jpg/jpeg');//showError是另外写的一个显示错误信息的function
						return;  
				}

				//获取并记录图片的base64编码
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]); // 读出 base64
				reader.onloadend = function () {
						// 图片的 base64 格式, 可以直接当成 img 的 src 属性值   
						_this.addForm.wx_img    = reader.result

					var dataURL = reader.result;//base64
					// 显示图片
					$('#showImg').attr('src',dataURL);
				};
			});
		},
	}
</script>