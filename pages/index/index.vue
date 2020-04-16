<template>
	<view class="content">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="header-placing"></view>
			<!-- 背景色区域 -->
			<view class="header-background" :style="{backgroundColor:headerBackground}">
			</view>
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" 
			class="carousel" circular>
				<swiper-item v-for="(pic,index) in carouselList" :key="index"
				class="carousel-item" @click="navToDetailPage(pic)">
					<image :src="pic.src" mode=""></image>
				</swiper-item>
				
			</swiper>
			
		</view>
		<!-- 分类 -->
		<view class="cata-section p-persent5">
			<view class="com-title">
				清洗消杀养护
			</view>
			<view class="cata-section-content">
				<view class="cata-item" v-for="(item,index) in catalogList" :key="index"  @click="navToDetailPage(item)">
					<image :src="item.image"></image>
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>
		<!-- 广告位 -->
		<view class="ad-section1" @click="navToDetailPage({id:'ad01'})">
			<image src="/static/temp/ad1.png" ></image>
			<!-- <image src="/static/temp/ad1.jpg" mode="scaleToFill"></image> -->
		</view>
		
		<!-- 秒杀 -->
		<view class="flashsale-section">
			<view class="tit-wrap">
				<view class="tit">
					<text class="tit-txt">限时秒杀</text>
					<text class="tit-remainder">本场结束剩余</text>
				</view>
				<view class="sub-tit">
					<view class="next-time">
						下一场 18:00 开始
					</view>
					<view class="time">
						<text class="hour">00</text>:
						<text class="minu">00</text>:
						<text class="secon">00</text>
					</view>
				</view>
			</view>

			<view class="content">
				<view class="cell" v-for="(item, index) in goodsList" :key="index"  @click="navToDetailPage(item)">
					<view class="old-price">
						¥{{ item.price }}
					</view>
					<view class="pic">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="price">
						秒杀价<text class="currency">¥</text><text>{{ item.price }}</text>
					</view>
					<view class="tit">
						{{ item.title }}
					</view>
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
				:key="index" :data-newsid="item.post_id"  @click="navToDetailPage(item)">
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
			this.loadData();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e){
			if(e.index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url:`/pages/notice/notice`
				})
			}else if(e.index === 0){
				uni.showToast({
					title: "点击扫一扫",
					icon: "none"
				})
			}
		},
		// #endif
		methods: {
			// openinfo(e){
			// 	let newsid = e.currentTarget.dataset.newsid;
			// 	uni.navigateTo({
			// 		url:`../info/info?newsid=${newsid}`
			// 	})
			// },
			async loadData(){
				let carouselList = await this.$api.json('carouselList');
				this.carouselList = carouselList;
				this.headerBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				
				let catalogList = await this.$api.json('catalogList');
				this.catalogList = catalogList;
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			navToDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	// 公共
	%title{
		font-size: 32upx;
		color: #333;
		font-weight: 700;
	}
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
			padding-top: 88upx;
			box-sizing: content-box;
			// background-color: rgb(203, 87, 60);249, 109, 77
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
			padding-top: 20upx;
			.carousel-item{
				width: 100%;
				height: 100%;
				padding: 0 28upx;
				overflow: hidden;
			}
			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
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
			// min-height:380upx;
			min-height: 180upx;
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
	
	// ad
	.ad-section1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	
	/* 秒杀 */
	 .flashsale-section{
		 margin-top: 20upx;
		 padding: 0 40upx;
		 .tit-wrap{
			 display: flex;
			 flex-direction: column;
			 // align-items: center;
			 .tit{
				 display: flex;
				 justify-content: space-between;
				 align-items: center;
				 .tit-txt{
					 @extend %title;
				 }
				 .tit-remainder{
					 display: inline-block;
					 width:200upx;
					 text-align: center;
					 color: #999;
					 font-size:26upx;
				 }
			 }
			 .sub-tit{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.next-time{
					 font-size: 26upx;
					 color: #999;
				 }
				.time{
					text{
							 display: inline-block;
							 width:60upx;
							 height:40upx;
							 line-height: 40upx;
							 font-size: 24upx;
							 text-align: center;
							 background: #3F536E;
							 color: #fff;
							 border-radius: 10upx;
							 margin-right: 6upx;
									 
					 }
				.minu,.secon{
					margin-left:4upx;
					}
				} 
			 }
		 }
		 
		 .content{
			 display: flex;
			 flex-wrap: wrap;
			 justify-content: space-around;
			 padding: 0 20upx;
			 margin-top: 60upx;
			 
			 .cell{
				 flex-basis: 40%;
				 display: flex;
				 flex-direction: column;
				 align-items: center;
				 position: relative;
				 margin-right: 20upx;
				 margin-bottom: 40upx;
				 view{
					 line-height: 1.6; 
				 }
				 image{
					 width: 160upx;
					 height: 160upx;
				 }
				 .old-price{
					 position: absolute;
					 right: 0upx;
					 top: -35upx;
					 z-index:2;
					 width: 74upx;
					 height: 70upx;
					 padding: 0 4upx;
					 font-size: 24upx;
					 line-height: 70upx;
					 color: #fff;
					 border-radius: 50%;
					 background-color: #f04844;
					 text-align: center;
					 text-decoration: line-through;
				 }
				 .price{ 
					 color: #f04844;
					 .currency{
						 margin-left: 10upx;
					 }
				 }
				 .tit{
					 font-size: 26upx;
					 color: #333;
				 }
			 }
		 }
	 }
	
	/* 推荐服务 */
	.recom-service .p-header{
		@extend %title;
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
		font-size: 32upx;
		
	}
	.list-goods-desc{
		line-height:34upx;
		font-size: 24upx;
	}
	.list-goods-pri{
		color:#f50;
		font-family: Arial, Helvetica, sans-serif;
	}
	.list-goods-pri-txt{
		// font-weight: 700;
		font-size: 40rpx;
		margin-right:4upx;
	}

	
</style>
