<template>
	<view class="content">
		 <view class="navBar">
		 	
			<view class="nav-item" v-for="(item,index) in navList" :key="index"
			:class="{active:tabCurrentIndex === index}"
			@click="clickTab(index)">
				{{ item.text }}
			</view>
		 </view>
		 <swiper class="swiper-box" :current="tabCurrentIndex" @change="changeTab">
		 	<swiper-item class="order-list" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
		 		<scroll-view 
				scroll-y="true" 
				class="list-scroll-content"
				@scrolltolower="loadMore"
				>
		 			<view class="order-item" v-for="(item,index) in tabItem.orderList" :key="index">
		 				<view class="order-item-hd b-b">
		 					<view class="time">
		 						{{ item.time }}
		 					</view>
		 					<view class="state">
		 						<text class="state-txt">{{ item.stateTip }}</text>
		 						<!-- <text class="del-btn" v-if="item.state === 5"></text> -->
		 					</view>
		 				</view>
		 				<view class="goods-box">
		 					<view class="goods-img">
		 						<image :src="item.goodsList[0].image" mode="">{{ item.goodsList.image }}</image>
		 					</view>
		 					<view class="goods-deat">
		 							<text class="tit clamp">{{ item.goodsList[0].title }}</text>
		 							<text class="des">{{ item.goodsList[0].attr }}</text>
		 							<text class="price">{{ item.goodsList[0].price }}</text>
		 					</view>
		 				</view>
		 				<view class="price-box">
		 					共
		 					<text class="num">7</text>
		 					件商品 实付款
		 					<text class="price">143.7</text>
		 				</view>
		 				<view class="action-box b-t">
		 					<button class="action-btn" v-show="item.state ===1 || item.state === 2">取消订单</button>
		 					<button class="action-btn pay" v-show="item.state === 1">立即支付</button>
		 					<button class="action-btn rec" v-show="item.state === 3">立即评价</button>
		 					<button class="action-btn post-sale-rec" v-show="item.state === 4">售后评价</button>
		 					<button class="action-btn post-sale-det" v-show="item.state === 4" >查看详情</button>
		 					<button class="action-btn del" v-show="item.state === 5">删除订单</button>
		 				</view>
		 			</view>
					<uni-load-more :status="tabItem.loadingType" :contentText="contentText"></uni-load-more>
				</scroll-view>
		 	</swiper-item>
		 </swiper>
	</view>
</template>

<script>
	import Json from '@/Json';
	import uniLoadMore  from '@/components/uni-load-more/uni-load-more.vue';
	
	var _self,
	page = 1,
	size = 8;
	
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待服务',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '售后',
						loadingType: 'more',
						orderList: []
					}
				],
				tabCurrentIndex:0,
				contentText: {
					contentdown: "上拉显示更多哦",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				moreLoadingType: 0
			}
		},
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 
			 */
			_self = this;
			// console.log("options",options);
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData()
			}
			// #endif
		},
		onPullDownRefresh() {
			this.loadData();
		},
		// onReachBottom(){
		// 	console.log("bottom")
		// 	this.loadData()
		// 	uni.showNavigationBarLoading()
		// },
		methods: {
			// 获取订单列表
			loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				
				setTimeout(()=>{
					let orderList = Json.orderList.filter(item=>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.state));
						//演示数据所以自己进行状态筛选
						if(state === 0){
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					console.log(orderList)
					orderList.forEach(item=>{
						navItem.orderList.push(item);
					})
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);
					
					//判断是否还有数据， 有改为 more， 没有改为noMore 
					navItem.loadingType = 'more';
					
				}, 600);	

			},
			loadMore(){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(_self.moreLoadingType !== 0 ){
					return false;
				}
				if(navItem.loadingType === 'loading'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				
				_self.moreLoadingType = 1;
				// uni.showNavigationBarLoading();
				// console.log("生命周期中的this",this);
				
				let orderList = [];
				setTimeout( () => {
					
					uni.request({
						url: "http://mengxuegu.com:7300/mock/5e7dba791c5f7f209577b51d/home/order/list/"+page+"/"+size,
						method: "post",
						success(res) {
							console.log(res)
							// console.log(this)
							let resList = res.data.data;
							orderList = resList.filter( item => {
								item = Object.assign(item, _self.orderStateExp(item.state));
								if(state === 0){
									return item;
								}
								return item.state === state;
							})
							// console.log(navItem.orderList);
							navItem.orderList = navItem.orderList.concat(orderList); // 使用concat方式
							// orderList.forEach( item => {
							// 	navItem.orderList.push(item)
							// })
							// console.log(navItem.orderList);
							 _self.$set( navItem,'loaded',true); // 新字段需要使用￥set
							// 判断是否还有数据， 有改为 more， 没有改为noMore 
							navItem.loadingType = 'more';
							_self.moreLoadingType = 0;
						}
					})
				},500)	
			},
			clickTab(index){
				this.tabCurrentIndex = index;
				console.log(this.tabCurrentIndex)
			},
			changeTab(e){ // current 改变时会触发 change 事件
				console.log(e.target.current);
				this.tabCurrentIndex = e.target.current; 
				this.loadData('tabChange');
			},
			orderStateExp(state){
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch(+state){
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待服务';
						break;
					case 3:
						stateTip = '待评价';
						break;
					case 4:
						stateTip = '售后';
						break;
					case 5:
						stateTip = '订单关闭';
						break;	
				}
				return {stateTip, stateTipColor};
			},
		}
	}
</script>

<style lang="scss">
	
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	// 页面上拉的方案css
	// .swiper-box{
	// 	height: calc(100vh - 80upx); //需要手动指定高度，否则不显示
	// }
	// .order-list{
	// 	height: 100%;
	// 	overflow-y: auto;
	// }
	
	.navBar{
		display: flex;
		justify-content: space-around;
		color: #333;
		height: 80upx;
		padding: 0 10upx;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06); //水平阴影位置，垂直阴影位置，模糊距离 
		.nav-item{
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30upx;
			color: #333;
			position: relative;
			&.active{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;;
				}
			}
			
		}
		
	}
	.swiper-box{
		.order-list{
			display: flex;
			flex-direction: column;
			.order-item{
				// display: flex;
				// justify-content: space-around;
				padding-left: 30upx;
				background-color: #fff;
				margin-top: 16upx;	
				.order-item-hd{
					height: 80upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;
					padding-right: 30upx;
					.time{
						font-size: 28upx;
						color: #666;
					}
					.state{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.state-txt{
							color: $base-color;
							font-size: 28upx;
						}
						// .del-btn{
						// 	display: inline-block;
						// 	width: 26upx;
						// 	height: 30upx;
						// 	background-color: $font-color-light;
						// 	// font-size: $font-lg;
						// 	// color: $font-color-light;
						// 	margin-left:40upx;
						// 	// padding: 10upx 0 10upx 36upx;
						// 	position: relative;
						// 	&:after{
						// 		content: '';
						// 		position: absolute;
						// 		left: -20upx;
						// 		top: 50%;
						// 		border-left: 1px solid $border-color-dark;
						// 		transform: translateY(-50%);
						// 		width: 0;
						// 		height: 30upx;
						// 	}
						// }
					}
				}
				.goods-box{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.goods-img{
						image{
							display: block;
							width: 120upx;
							height: 120upx;
						}
					}
					.goods-deat{
						flex: 1;
						display: flex;
						flex-direction: column;
						padding: 0 30upx 0 24upx;
						overflow: hidden;
						.tit{
							font-size: 30upx;
							color: #303133;
							line-height: 1;
						}
						.des{
							color: #909399;;
							font-size: 26upx;
							padding: 10upx 12upx;
						}
						.price{
							font-size: 30upx;
							color: #303133;
							&:before{
								content: '￥';
								font-size: 24upx;
								margin:0 2upx 0 8upx ;
							}
						}
						
					}
				}
				.price-box{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					padding: 20upx 30upx;
					font-size: 26upx;
					color: #909399;
					.num {
						margin: 0 8upx;
						color: $font-color-dark;
					}
					.price{
						color: $font-color-dark;
						font-size: $font-lg;
						&:before{
							content: '￥';
							font-size: $font-sm;
							margin: 0 2upx 0 8upx;
							
						}
					}
				}
				.action-box{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					height: 100upx;
					position: relative;
					padding-right: 30upx;
					
				}
				.action-btn{
					// display: flex;
					width: 160upx;
					height: 60upx;
					margin: 0; // 不写这句justify-content 会失效
					margin-left: 24upx;
					line-height: 60upx;
					font-size: 26upx;
					// margin-left: 24upx;
					background: #fff;
					border-radius: 200upx;
					&:after{
						border-radius: 200upx;
					}
					&.rec,
					&.pay,
					&.post-sale-det{
						background: #fff9f9;
						color: $base-color;
						&:after{
							border-color: #f7bcc8;
						}
					}
					&.post-sale-rec,
					&.del{
						color: $font-color-dark;
					}
					
				}
			}
		}
	}
</style>
