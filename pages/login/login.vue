<template>
	<view class="content">
		<view class="back-btn">
			
		</view>
		<view class="login-wrap">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="text" value="" placeholder="请输入手机号码"/>
				</view>
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="text" value="" placeholder="8-18位不含特殊字符的数字、字母组合"/>
				</view>
			</view>
			<view class="btn-area">
				<button type="default">登录</button>
				
			</view>
			<view class="forget-section">忘记密码?</view>
			
		</view>
		<view class="register-section">
			还没有账号?<text>马上注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		padding-top: 230upx;
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
		height: 40upx;
		width: 40upx;
		background-color: #ddd;
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
			top: -90upx;
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
				margin-bottom: 50upx;
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
		}
		.btn-area{
			margin-top: 70upx;
			button{
				width: 630upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 100upx;
				background: #fa436a;
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
		position: absolute;
		left: 0;
		// bottom: 50upx;
		bottom: 0;
		width: 100%;
		color: #606266;
	}
</style>
