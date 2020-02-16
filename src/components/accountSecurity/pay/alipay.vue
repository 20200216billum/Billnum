<style lang=less>
	@import '../../../assets/public.less';
	@import '../security.less';
</style>
<template>
	<div class="back_card_main">
		<el-form :model="addForm" label-position="left" status-icon label-width="80px" class="demo-ruleForm">
			<el-form-item :label='$t("alipay.list[0]")'><!-- 姓名 -->
				<el-input type="text" v-model="userData.name" auto-complete="off" :disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label='支付宝'><!-- 支付宝账号 -->
				<el-input type="text" v-model="addForm.alipay" auto-complete="off" :placeholder='$t("alipay.tip[0]")'></el-input>
			</el-form-item>

			<el-form-item label='二维码'>
				<div class="zhengmian right">
					<input type="file" name="" id="chooseImage1" accept=".jpg,.jpeg,.png" style="display:inline-block;width: 300px;height: 115px;position: relative;opacity: 0;">
					<img v-if="addForm.ali_img" :src="addForm.ali_img" class="avatar">
				</div>
			</el-form-item>

			<el-form-item :label='$t("alipay.list[4]")'><!-- 资金密码 -->
				<el-input type="password" v-model="addForm.payment_password" auto-complete="off" :placeholder='$t("alipay.tip[1]")'></el-input>
			</el-form-item>
		</el-form>
		<div class="el-message-box__btns">
			<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="submitForm()">
				<span>{{$t("alipay.list[5]")}}</span><!-- 确认添加 -->
			</button>
			<button type="button" class="el-button el-button--default el-button--small el-button--primary " @click="cancel()">
				<span>{{$t("alipay.list[6]")}}</span><!-- 取消 -->
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
					type:'alipay',
					payment_password:'',
					alipay:'',
					ali_img:'',
				},
			}
		},
		methods: {
			submitForm() {
				var _this = this;
				if(!_this.addForm.alipay) {
					_this.$public.msg(_this.$t("alipay.alipay"), 'warning', _this);//支付宝账号不能为空
					return false
				} else if(!_this.addForm.ali_img) {
					_this.$public.msg('请上传有效图片', 'warning', _this);//请上传有效图片
					return false
				} else if(!_this.$public.pwd(_this.addForm.payment_password)) {
					_this.$public.msg(_this.$t("alipay.submitForm[2]"), 'warning', _this);//资金密码格式有误
					return false
				}
				//请求接口
				_this.addForm.payment_password = _this.$md5(_this.addForm.payment_password);
				_this.$http.post(_this.$http.payAdd, _this.addForm).then(function(res) {
					if(res.data.code == '200') {
						_this.$public.go('/security?flat=ok',10,_this); 
						if(_this.addForm.act == 'add'){
						_this.$public.msg('添加成功', 'success', _this);
						}else{
							_this.$public.msg('修改成功', 'success', _this);
						}
					}else{
						_this.$public.msg(res.data.msg, 'warning', _this);
					}
				}).catch(function(error) {});
			},
			cancel () {
				this.$public.go('/security?flat=ok',10,this); 
			},
			create:function(){
				var _this = this;
				_this.userData = sessionStorage.userData;
			},
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
							_this.addForm.alipay = res.data.data.alipay;
							_this.addForm.ali_img = _this.$http.basess + res.data.data.ali_img;
						}else{
							_this.$public.msg(res.data.msg, 'warning', _this);
						}
					})





				}
			},
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
						_this.addForm.ali_img    = reader.result

					var dataURL = reader.result;//base64
					// 显示图片
					$('#showImg').attr('src',dataURL);
				};
			});
		},
	}
</script>