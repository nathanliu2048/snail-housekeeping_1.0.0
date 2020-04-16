<template>
	<view class="content">
		<view class="iconfont icon-arrow-left back-btn"
		@click="navBack">
			
		</view>
		<view class="login-wrap">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input value="" placeholder="请输入手机号码" 
					@blur="checkMobile"/>
				</view>
				<view class="tip-item" >
					<text v-if="phoneTips.show">{{ phoneTips.text }}</text>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="text" value="" placeholder="请输入密码"
					@blur="checkPassword"
					class="password" 
					ref="password"/>
				</view>
				<view class="tip-item">
					<text v-show="passwordTips.show">{{ passwordTips.text }}</text>
				</view>
			</view>
			<view class="btn-area">
				<button type="default" @click="submitLogin">登录</button>
				
			</view>
			<view class="forget-section">忘记密码?</view>
			
		</view>
		<view class="register-section">
			还没有账号?<text @click="navTo('register')">马上注册</text>
		</view>
	</view>
</template>

<script>
	import baseUrl from '../../common/config.js';
	import { mapMutations } from 'vuex';
	import { mapActions } from 'vuex';
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
				telephoneNumber: 0,
				password:0
			}
		},
		methods: {
			...mapMutations(['SET_DATA']),// 将 `this.SET_DATA()` 映射为 `this.$store.commit('SET_DATA')`
			...mapActions(['login']), // 将 `this.login()` 映射为 `this.$store.dispatch('login')`
			navTo(url){
				uni.navigateTo({
					url: `../${url}/${url}`
				})
			},
			navBack(){
				uni.navigateBack();
			},
			checkMobile(e){
				let mobile;
				// #ifdef MP
				mobile = e.mp.detail.value;
				// #endif
				// #ifndef MP
				// mobile = this.$refs.telephone.inputValue;
				mobile = e.detail.value;
				// #endif
				this.telephoneNumber = mobile;
				
				// let exp = /^1[3456789]\d{9}$/; // 正确的手机号码格式 做测试暂不使用
				let exp = /\w/;
				this.phoneTips.show = (!RegExp(exp).test(mobile))?true:false;
			},
			checkPassword(e){
				let password;
				// #ifdef MP
				 password= e.mp.detail.value;
				// #endif
				// #ifndef MP
				 // password= this.$refs.password.inputValue;
				 password = e.detail.value;
				// #endif
				this.password = password;
				
				// let exp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/; // 8-18位的大小写字母与数字组合
				let exp = /\w/;
				this.passwordTips.show = (!RegExp(exp).test(password))?true:false;
			},
			async submitLogin(){ 
				if(this.passwordTips.show|| this.phoneTips.show){ //如果有其中一个警告文本出现，则未通过验证
					uni.showToast({
						title:'信息填写错误，请确认后重新输入',
						icon:'none'
					})
				}else{
					let _self = this;
					let phone;
					let password
					
					phone = this.telephoneNumber;
					password = this.password;
					 //uni-app 对部分 API 进行了 Promise 封装，返回数据的第一个参数是错误对象，第二个参数是返回数据。
					 // var [error, res] = await uni.request({
					 //        url: 'https://www.example.com/request'
					 //    });
					 
					 let res = await this.login({ phone, password})
					 	 uni.showToast({
					 	 	title: res.data.message,
					 	 	icon: res.data.code == 2000?'success':'none'
					 	 })
					 	 setTimeout( () =>{
					 	 	uni.navigateBack();
					 	 },2000)
				}
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding-top: 200upx;
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
		// padding-bottom: 40upx;
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
			margin-top: 70upx;
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
