<template>
	<view class="content">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="1000">
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<view class="swiper-item">
						<view class="img-wrap">
							<image :src="item.src" mode=""></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="pic-desc">
			<rich-text :nodes="desc"></rich-text>
		</view>
		<view class="page-btn">
			<button type="default" class="buy-btn" @click="buy">立即预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					{
						src: '/static/temp/service01.png'
					},
					{
						src: 'https://img2.4009515151.com/2020/02/27/0226fy0pwdsyyd1.jpg'
					},
					{
						src: 'https://img2.4009515151.com/2020/02/27/uaverysvo7l1wr7a.jpg'
					},
					{
						src: '/static/temp/service04.png'
					}
				],
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://img2.4009515151.com/2019/09/20/w3we302n1ffkwdkf.jpg" />
						<img style="width:100%;display:block;" src="https://img2.4009515151.com/2019/07/17/0wrwluppcbc48055.png" />
						<img style="width:100%;display:block;" src="https://img2.4009515151.com/2019/07/17/hwd8falzd1acx8l.png" />
						<img style="width:100%;display:block;" src="https://img2.4009515151.com/2019/07/17/5ppss5pr01fz19yi.png" />
						<img style="width:100%;display:block;" src="https://img2.4009515151.com/2019/07/17/8r1ugvrzg1zmxx6w.png" />
						<img style="width:100%;display:block;" src="https://img2.4009515151.com/2019/07/17/mnnpogwgvfzegqig.png" />
					</div>
				`
			}
		},
		methods: {
			buy(){
				uni.navigateTo({
					url: "/pages/order/createOrder"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
		padding-bottom: 160upx;
	}
	.content{
		// position: relative;
	}
	.carousel{
		background-color: #fff;
		position: relative;
		height: 722upx;
		swiper{
			height: 100%;
		}
		.swiper-item{
			height: 750upx;
			.img-wrap{
				width: 100%;
				height: 100%;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	.pic-desc{
		margin-top: 20upx;
		background-color: #fff;
	}
	
	.page-btn{
		position:fixed;
		left: 30upx;
		bottom: 30upx;		
		// z-index: 99;
		background-color: #fff;
		
		.buy-btn{
			width: 690upx;
			height: 100upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			// background: linear-gradient(to right, #f17777, #fa436a, #F56C6C);
			background: linear-gradient(left, #f17e64, #f96d4d, #f36848);// to right, #f17e64, #f96d4d, #f36848
			
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			border-radius: 16upx;
		}
	}
</style>
