<template>
	<view class="content">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="header-placing"></view>
			<!-- 背景色区域 -->
			<!-- <view class="header-background" :style="{backgroundColor:headerBackground}"> -->
			<!-- </view> -->
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" 
			class="carousel" circular>
				<swiper-item v-for="(pic,index) in carouselList" :key="index"
				class="carousel-item">
					<image :src="pic.src" mode=""></image>
				</swiper-item>
				
			</swiper>
			
		</view>
		<!-- 分类 -->
		<view class="cata-section p-persent5">
			<view class="com-title">
				家具家电清洗
			</view>
			<view class="cata-section-content">
				<view class="cata-item" v-for="(item,index) in catalogList" :key="index">
					<image :src="item.image"></image>
					<text>{{ item.text }}</text>
				</view>
			</view>
			
		
			
		</view>
		<!-- 推荐服务 -->
		<view class="recom-service p-persent5">
			<view class="p-header">
				推荐服务
			</view>
			<view class="uni-list">
				<view class="uni-list-cell"  v-for="(item,index) in goodsList" 
				:key="index" @tap="openinfo" :data-newsid="item.post_id">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="item.image"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">
								<view class="list-goods-title">
									{{item.title}}
								</view>
								<view class="list-goods-desc">
									{{item.description}}
								</view>
							</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">
								<view class="list-goods-pri">
									<text class="list-goods-pri-txt">{{ item.price }}</text>元起
								</view>
								<view class="list-goods-sales">
									销量 {{ item.sales }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				catalogList: [],
				goodsList: [],
				headerBackground:'',
				carouselList:[],
				swiperLength:0
			}
		},
		onLoad() {
			// uni.request({
			// 	url: 'https://unidemo.dcloud.net.cn/api/news',
			// 	method: 'GET',
			// 	data:{},
			// 	success: res => {
			// 		console.log(res);
			// 		this.news = res.data;
			// 	},
			// 	fail: () => {
					
			// 	}
			// })
			this.loadData();
		},
		methods: {
			openinfo(e){
				let newsid = e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url:`../info/info?newsid=${newsid}`
				})
			},
			async loadData(){
				let carouselList = await this.$api.json('carouselList');
				this.carouselList = carouselList;
				this.headerBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				
				let catalogList = await this.$api.json('catalogList');
				this.catalogList = catalogList;
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			}
		}
	}
</script>

<style lang="scss">
	// 公共
	.com-title{
		font-size: 38upx;
		font-weight: 700;
		line-height: 92upx;
		height: 92upx;
		font-family: Arial, Helvetica, sans-serif;
		letter-spacing: 2upx;
	}
	.p-persent5{
		padding-left: 5%;
		padding-right: 5%;
	}
	
	
	.content{
		// padding-top: 10upx;
		padding-bottom: 10upx;
		width: 100%;
		/* flex-wrap: wrap; */
	}
	// 轮播图
	.carousel-section{
		.header-placing{
			height: 0;
			padding-top: 0;
		}
		
		.header-background{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
		.carousel{
			width: 100%;
			height: 350upx;
			.carousel-item{
				width: 100%;
				height: 100%;
				// padding: 0 28upx;
				overflow: hidden;
			}
			image {
				width: 100%;
				height: 100%;
				// border-radius: 10upx;
			}
		}
	}
	
	// 分类
	.cata-section{
		margin-top:80upx;
		.cata-section-content{
			width:630rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			min-height:380upx;
			.cata-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					width: 100upx;
					height: 100upx;
				}
				text{
					white-space: nowrap;
				}
			}
		}
	}
	
	
	/* 推荐服务 */
	.recom-service .p-header{
		font-size: 40rpx;
	}
	.uni-media-list{
		padding:22upx 0;
		border:0;
	}
	.uni-list::before{
		background-color: transparent;
	}
	.uni-list-cell::after{
		background-color: transparent;
	}
	.uni-media-list-logo{
		height:180upx;
		width:220upx;
		display: inline-block;
	}
	.uni-media-list-body{
		height: 190upx;
	}
	.uni-media-list-text-top{
		line-height: 2em;
	}
	.uni-media-list-text-bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list-goods-title{
		font-size: 36upx;
		
	}
	.list-goods-desc{
		line-height:34upx;
	}
	.list-goods-pri{
		color:#f50;
		font-family: Arial, Helvetica, sans-serif;
	}
	.list-goods-pri-txt{
		font-weight: 700;
		font-size: 44rpx;
		margin-right:4upx;
	}

	
</style>
