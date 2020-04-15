<template>
	<view>
		<view class="notice-item">
			<text class="time">11:00</text>
			<view class="content">
				<text class="tit">特殊时期，服务加持，折扣更大！</text>
				<view class="img-wrap">
					<image src="/static/temp/notice01.png" mode=""></image>
				</view>
				<text class="introduce">
					除了戴口罩，你还要注意地板清洁！每当我们外出风尘仆仆回家时，脚上身上也许带回了病菌，因此，地板的清洁也十分重要。
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="iconfont icon-arrow-right"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">昨天 09:00</text>
			<view class="content">
				<text class="tit">新生儿/产妇，给你最极致的照顾</text>
				<view class="img-wrap">
					<image src="/static/temp/notice02.png" mode=""></image>
					<view class="cover">
						活动结束
					</view>
				</view>
				<text class="introduce">
					除了戴口罩，你还要注意地板清洁！每当我们外出风尘仆仆回家时，脚上身上也许带回了病菌，因此，地板的清洁也十分重要。
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="iconfont icon-arrow-right"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">2020-03-26 12:30</text>
			<view class="content">
				<text class="tit">家电清洗，专业专注，限时半价！</text>
				<view class="img-wrap">
					<image src="/static/temp/notice03.png"  mode=""></image>
					<view class="cover">
						活动结束
					</view>
				</view>
				<text class="introduce">
					除了戴口罩，你还要注意地板清洁！每当我们外出风尘仆仆回家时，脚上身上也许带回了病菌，因此，地板的清洁也十分重要。
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="iconfont icon-arrow-right"></text>
				</view>
			</view>
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
	page {
		background-color: #f7f7f7;
		padding: 0 20upx 30upx;
	}
	.notice-item {
		.time{
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #7d7d7d;
			padding-top: 10upx;
		}
		.content{
			background-color: #fff;
			padding: 0 24upx;
			border-radius: 4upx;
		}
		.tit {
			display: flex;
			align-items: center;
			height: 90upx;
			font-size: 32upx;
			color: #303133;
		}
		.img-wrap{
			position: relative;
			width: 100%;
			height: 260upx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 6upx;
			}
			.cover{
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #fff;
				background-color: rgba(0,0,0,.5);
			}
		}
		.introduce{
			display: inline-block;
			padding: 16upx 0;
			font-size: 28upx;
			color: #606266;
			line-height: 38upx;
		}
		.bot{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			font-size: 24upx;
			color: #707070;
			position: relative;
		}
	}
</style>
