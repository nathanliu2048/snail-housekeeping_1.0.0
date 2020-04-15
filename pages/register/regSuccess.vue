<template>
	<view class="content">
			<text class="iconfont icon-ok"></text>
			<text class="tips">注册成功</text>
		<view class="btn-area">
			<navigator class="s-pay-btn" url="/pages/login/login" open-type="redirect">使用注册账号登录</navigator>
			<navigator class="s-normal-btn" url="/pages/index/index" open-type="switchTab">返回首页</navigator>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.icon-ok{
		margin-top: 100upx;
		font-size: 160upx;
		color: $base-color;
	}
	.tips{
		color: $font-color-dark;
		font-size: 38upx;
		margin-top: -60upx;
	}
	.btn-area{
		padding-top: 100upx;
	}
</style>
