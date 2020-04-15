<template>
	<view class="content">
		<view class="iconfont icon-arrow-left back-btn"
		@click="navBack">
			
		</view>
		<view class="login-wrap">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎加入！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" value="" placeholder="请输入手机号码" 
					ref="telephone"
					@blur="checkMobile"/>
				</view>
				<view class="tip-item" >
					<text v-if="phoneTips.show">{{ phoneTips.text }}</text>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="text" value="" placeholder="8-18位不含特殊字符的数字、字母组合"
					@blur="checkPassword"
					class="password" 
					ref="password"/>
				</view>
				<view class="tip-item">
					<text v-show="passwordTips.show">{{ passwordTips.text }}</text>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="text" value="" placeholder="请再次输入密码"
					@blur="checkPasswordAgain"
					ref="passwordAgain"/>
				</view>
				<view class="tip-item">
					<text v-show="passwordAgainTips.show">{{ passwordAgainTips.text }}</text>
				</view>
			</view>
			<view class="btn-area">
				<button @click="submitRegister">注册</button>
				
			</view>
			<view class="forget-section">忘记密码?</view>
			
		</view>
		<view class="register-section">
			已有账号?<text @click="navTo('login')">马上登录</text>
		</view>
	</view>
</template>

<script>
	import baseUrl from '../../common/config.js';
	export default {
		data() {
			return {
				phoneTips: {
					text: '手机号码格式有误',
					show: false
				},
				passwordTips:{
					text: '密码必须是8-18位的大小写字母与数字组合',
					show: false,
				},
				passwordAgainTips:{
					text: '两次密码输入不一致',
					show: false
				}
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url: `../${url}/${url}`
				})
			},
			navBack(){
				uni.navigateBack();
			},
			checkMobile(){
				// console.log(e.detail.value);
				let data = this.$refs.telephone.inputValue;
				let exp = /^1[3456789]\d{9}$/;
				// if(!RegExp(exp).test(data)){
				// 	this.phoneTips.show = true;
				// }else{
				// 	this.phoneTips.show = false;
				// }
				this.phoneTips.show = (!RegExp(exp).test(data))?true:false;
				return RegExp(exp).test(data);
			},
			checkPassword(){
				let firstP = this.$refs.password.inputValue;
				let secondP = this.$refs.passwordAgain.inputValue;
				let exp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
				// let exp =  /^(?![0-9]+$)(?![a-zA-Z]+$)(?!(^[0-9a-zA-z])+$)[0-9A-Za-z]{8}$/
				// if(!RegExp(exp).test(data)){
				// 	this.passwordTips.show = true;
				// }else{
				// 	this.passwordTips.show = false;
				// }
				this.passwordTips.show = (!RegExp(exp).test(firstP))?true:false;
				if(secondP !== ''){
					this.checkPasswordAgain();
				}
				return RegExp(exp).test(firstP);
			},
			checkPasswordAgain(){
				let firstP = this.$refs.password.inputValue;
				let secondP = this.$refs.passwordAgain.inputValue;
				this.passwordAgainTips.show = (firstP !== secondP)?true:false;
				if(firstP !== secondP){
					this.passwordAgainTips.show = true;
					return false;
				}else{
					this.passwordAgainTips.show = false;
					return true;
				}
			},
			async submitRegister(){
				if(!this.checkMobile() || !this.checkPassword() || !this.checkPasswordAgain()){
					uni.showToast({
						title:'信息填写错误，请确认后重新输入',
						icon:'none'
					})
				}else{
					let _self = this;
					let phone = this.$refs.telephone.inputValue;
					let password = this.$refs.password.inputValue;
					let result = await this.$api.request({
						url: `${baseUrl}/user/register`,
						method: 'POST',
						data: {
							phone,
							password
						}
					}).then( res => {
						// uni.showToast({
						// 	title: res[1].data.message,
						// 	icon: res[1].data.code == 2000?'success':'none'
						// })
						if(res[1].data.code == 2000){
							// uni.switchTab({
							// 	url: '/pages/personal/personal'
							// })
							uni.navigateTo({
								url: "/pages/register/regSuccess"
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.content{
		padding-top: 160upx;
		position: relative;
		background-color: #fff;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.back-btn{
		position: absolute;
		left: 40upx;
		top: 20upx;
		font-size: 52upx;
	}
	.login-wrap{
		position: relative;
		.left-top-sign{
			font-size: 120upx;
			color: #f8f8f8;
			position: relative;
			left: -16upx;
		}
		.welcome{
			position: relative;
			left: 50upx;
			top: -124upx;
			color: #555;
			font-size: 46upx;
			text-shadow: 2upx 0 2upx rgba(0,0,0,0.3);
		}
		.input-content{
			padding: 0 60upx;
			.input-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-radius: 8upx;
				// margin-bottom: 30upx;
				padding: 0 30upx;
				background-color: #f8f6fc;
				height: 120upx;
				&:last-child{
					margin-bottom: 0;
				}
				.tit{					
					height: 50upx;
					line-height: 56upx;
					color: #606266;
					font-size: 26upx;
				}
				input{
					height: 60upx;
					color:#666;
					font-size: 26upx;
				}
			}
			.tip-item{
				height:62upx;
				line-height: 62upx;
				font-size: 24upx;
				color: #f15000;
			}
		}
		.btn-area{
			margin-top: 10upx;
			button{
				width: 630upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 100upx;
				background: $base-color;
				color: #fff;
				font-size: 16px;
			}
		}
		.forget-section{
			font-size: 26upx;
			text-align:center;
			margin-top: 40upx;
			color: #4399fc
		}
	}
	.register-section{
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 50upx;
		text-align: center;
		color: #606266;
	}
</style>
