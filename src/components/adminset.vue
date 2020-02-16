<template lang="html">
	<div id="adminset">
		
		<div class="pws">
			<span>请输入设置密码：</span>
			<input type="text" v-model="pwd"/>
			<button @click="trues">确定</button>
		</div>
		
		<div class="adminset" v-show="isshow">
			<input type="text"  placeholder="请输入功能代号" v-model="code"/>
			<button @click="okEnd">确定</button>
			
		</div>
	</div>
	
	
</template>
<script>
	//import  from "";
	export default {
		data() {
			return {
				isshow:false,
				pwd:'',
				code:''
				
			}
		},
		methods: {
			trues(){
				if(this.pwd != 'sskj'){
					alert('密码错误')
					return ;
				}
				this.isshow = true;
				
			},
			okEnd(){
				if(this.code == '0001'){
					//开启f12
					sessionStorage.abc = true;
					setTimeout(function(){
						window.location.href = "/#/home";
					},500)
				}
			}
			
		},
		created: function() {},
		mounted:function(){},
		components: {}
	}
</script>

<style type="text/css" lang="less">
	#adminset{
		width: 500px;
		margin: 200px auto;
		.adminset{
			width: 400px;
			height: 300px;
			margin: 50px auto;
			padding-top: 100px;
			box-shadow: 1px 2px 5px #666;
			text-align: center;
			
		}
		input{
			height: 30px;
			border: 1px solid red;
			padding: 0 10px;
			border-radius: 5px;
			
		}
		button{
			height: 30px;
			width: 48px;
			border-radius: 5px;
		}
	}
	
</style>