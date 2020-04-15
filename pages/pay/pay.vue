<template>
	<view class="content">
		<view class="price-section">
			<text>支付金额</text>
			<text class="price">{{ account }}</text>
		</view>
		<view class="pay-type-list">
			<view class="list-row b-b" @click="changePayType(1)">
				<text class="iconfont icon-wxpay"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" :checked="payType === 1" color="#f96d4d" /><text></text>
				</label>

			</view>
			<view class="list-row b-b" @click="changePayType(2)">
				<text class="iconfont icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
					
				</view>
				<label class="radio">
					<radio value="" :checked="payType === 2" color="#f96d4d" /><text></text>
				</label>
			
			</view>
			<view class="list-row b-b" @click="changePayType(3)">
				<text class="iconfont icon-balance"></text>
				<view class="con">
					<text class="tit">余额支付</text>
					<text>可用余额 ￥192.00</text>
				</view>
				<label class="radio">
					<radio value="" :checked="payType === 3" color="#f96d4d" /><text></text>
				</label>
			
			</view>
		</view>
		<button class="s-pay-btn" @click="toPaySuccess">立即支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: 1,
				account: 0
			}
		},
		onLoad(option) {
			this.account = option.account;
		},
		methods: {
			changePayType(type){
				this.payType = type;
			},
			async toPaySuccess(){
				uni.redirectTo({
					url: '/pages/pay/paySuccess'
				})
			}
		}
	}
</script>

<style lang="scss">
	.price-section{
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #909399;
		font-size: 28upx;
		.price{
			color: #303133;
			font-size: 50upx;
			&:before{
				content: '￥';
				fon-size: 40upx;
			}
		}
	}
	.pay-type-list{
		margin-top: 20upx;
		background-color: #fff;
		padding: 0 60upx;
		.list-row{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			position:relative;
			.con{
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: $font-sm;
				color: $font-color-light;
				.tit{
					font-size: $font-lg;
					color: $font-color-dark;
					margin-bottom: -8upx;
				}
			}
			.iconfont{
				width: 120upx;
			}
			.icon-wxpay{
				color: #36cb59;
				font-size: 58upx;
			}
			.icon-alipay {
				color: #01aaef;
				font-size: 70upx;
			}
			.icon-balance{
				color: #fe8e2e;
				font-size: 70upx;
			}
		}
	}
</style>
