<template>
	<view>
		<view class="user-container">
			<image class="bg" src="/static/temp/user-bg02.png"></image>
			<view class="user-info-section">
				<view class="avatar-box">
					<image :src="userInfo.avatar || '/static/missing-face.png'"  mode="" class="avatar"></image>
				</view>
				<view class="username-box">
					<!-- <text class="default" @click="login">登录/注册</text> -->
					<text class="username" @click="login">{{ userInfo.nickname || '游客'}}</text>
				</view>
			</view>
			<view class="vip-card-section">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<view class="enroll-btn">
					立即开通
				</view>
				<view class="tit">
					<text class="iconfont icon-vip1"></text>
					白金VIP
				</view>
				<text class="union-name">SnailShell</text>
				<text class="desc">积分加倍 专享价 会员日 更多福利</text>
			</view>
		</view>
		<view :style="{transition:coverTransition,transform:coverTransform}"
		class="cover-container" 
		@touchstart="coverTouchstart"
		@touchmove="coverTouchmove"
		@touchend="coverTouchend">
			<image src="/static/arc.png" mode="" class="arc"></image>
			<view class="integral-section">
				<view class="list-item">
					<text class="num">0.00</text>
					<text class="item-txt">余额</text>
				</view>
				<view class="list-item">
					<text class="num">0.00</text>
					<text class="item-txt">优惠券</text>
				</view>
				<view class="list-item">
					<text class="num">0.00</text>
					<text class="item-txt">积分</text>
				</view>
			</view>
			<view class="order-section">
				<view class="list-item">
					<text class="iconfont icon-order"></text>
					<text class="item-txt" 
					@click="navTo('../order/order?state=0')">全部订单</text>
				</view>
				<view class="list-item">
					<text class="iconfont icon-unpaided"></text>
					<text class="item-txt"
					@click="navTo('../order/order?state=1')">待付款</text>
				</view>
				<view class="list-item">
					<text class="iconfont icon-unserviced"></text>
					<text class="item-txt"
					@click="navTo('../order/order?state=2')">待服务</text>
				</view>
				<view class="list-item">
					<text class="iconfont icon-unevaluated"></text>
					<text class="item-txt"
					@click="navTo('../order/order?state=3')">待评价</text>
				</view>
				<view class="list-item">
					<text class="iconfont icon-postsale"></text>
					<text class="item-txt"
					@click="navTo('../order/order?state=4')">售后</text>
				</view>
			</view>
			<view class="extra-section">
				<view class="">
					<list-cell icon="icon-history" iconColor="#e07472" title="浏览历史"></list-cell>
					<list-cell icon="icon-address" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
					<list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></list-cell>
					<list-cell icon="icon-member" iconColor="#ee883b" title="会员" tips="您的会员还有3天过期"></list-cell>
					<list-cell icon="icon-service" iconColor="#54b4ef" title="客服中心"></list-cell>
					<list-cell icon="icon-setting" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/setting/setting')"></list-cell>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {
	    mapState 
	} from 'vuex'; 
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				
			}
		},
		onLoad(){}, 
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/setting/setting');
			}else if(index === 1){
				// #ifdef APP-PLUS
				// const pages = getCurrentPages();
				// const page = pages[pages.length - 1]; // 最后一个为当前页
				// console.log("page",page)
				// const currentWebview = page.$getAppWebview();
				// currentWebview.hideTitleNViewButtonRedDot({
				// 	index
				// });
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		components:{
			listCell
		},
		computed: {
			...mapState(['hasLogin','userInfo']),
			// 以上相当于以下，映射处理
			// userInfo(){
			// 	return this.$store.state.userInfo;
			// },
			// hasLogin(){
			// 	return this.$store.state.hasLogin;
			// }
		},
		methods: {
			/**
			 * 统一跳转接口,拦截未登录路由
			 * 
			 */
			navTo(url){
				if(!this.hasLogin){
					url =  '/pages/login/login'
				}
				uni.navigateTo({
					url
				})
				
			},
			swiTab(url){
				uni.switchTab({
					url
				})
			},
			login(){
				if(!this.hasLogin){
					this.navTo('../login/login');
				}
				
				// uni.login({
				//   provider: 'weixin',
				//   scopes: 'auth_user',
				//   success: function (loginRes) {
				//     console.log(loginRes.authResult);
				//   }
				// });
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
				// console.log("s-----",startY)
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				// console.log("distance******************",moveDistance)
				// console.log("startY",startY);
				// console.log("moveY",moveY);
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
			
		}
	}
</script>

<style lang="scss">
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	/*用户信息部分*/
	.user-container{
		height:520upx;
		padding: 100upx 30upx 0;
		position: relative;
		.bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.user-info-section{
			height:180upx;
			position: relative;
			display: flex;
			align-items: center;
			.username-box{
				margin-left: 10upx;
				.username,
				.default{
					font-size: 40upx;
				}
			}
			.avatar{
				width: 130upx;
				height:130upx;
				border: 4upx solid #fff;
				border-radius: 50%;
			}
			
		}
		.vip-card-section{
			height: 240upx;
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 10upx 24upx;
			background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
			color:#f7d680;
			border-radius: 16upx 16upx 0 0;
			.card-bg{
				position:absolute;
				top: 20upx;
				right: 0;
				width: 380upx;
				height: 260upx;
			}
			.enroll-btn{
				width: 132upx;
				height: 40upx;
				position: absolute;
				right: 20upx;
				top: 16upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #36343c;
				border-radius: 20px;
				background: linear-gradient(left, #f9e6af, #ffd465);
				// z-index: 1;
			}
			.tit{
				color: #f7d680;
				font-size: $font-base+2upx;
				margin-bottom: 28upx;
				.iconfont{
					color: #f6e5a3;
					margin-right: 16upx;
				}
			}
			.union-name{
				font-size: 36upx;
				line-height: 20px;
			}
			.desc{
				color: #d8cba9;
				margin-top: 10upx;
				font-size: $font-sm;
			}
		}
	}
	/*中下详情部分*/
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		// margin-top: -240upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			width: 100%;
			height: 36upx;
			position:absolute;
			left: 0;
			top: -34upx;
		}
		.integral-section{
			@extend %section;
			.list-item{
				@extend %flex-center;
				height: 140upx;
				font-size: $font-sm;
				color: #75787d;
				.num{
					font-size: 32upx;
					color: #303133;
				}
			}
		}
		.order-section{
			@extend %section;
			padding: 28upx 0;
			margin-top:20upx;
			.list-item{
				@extend %flex-center;
				font-size: $font-sm;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				color: $font-color-dark;
				.iconfont{
					font-size: 48upx;
					display: inline-block;
					height: 76upx;
					// margin-bottom: 18upx;
					color: $base-color;
				}
			}
		}
		
		.extra-section{
			padding: 15px 0 0;
			margin-top: 10px;
			background: #fff;
			border-radius: 5px;
		}
	}

</style>
