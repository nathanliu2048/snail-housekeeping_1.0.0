<template>
	<view class="content">
		<view class="list-cell b-b mt-8" @click="navTo('个人资料')">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more iconfont icon-arrow-right"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('实名认证')">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more iconfont icon-arrow-right"></text>
		</view>
		<view class="list-cell mt-8">
			<text class="cell-tit">消息推送</text>
			<switch checked @change="switchChange" />
		</view>
		<view class="list-cell mt-8 b-b"  @click="navTo('清除缓存')">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more iconfont icon-arrow-right"></text>
		</view>
		<view class="list-cell"  @click="navTo('蜗牛家政')">
			<text class="cell-tit" >关于蜗牛家政</text>
			<text class="cell-tip">当前版本 1.0.0</text>
			<text class="cell-more iconfont icon-arrow-right"></text>
		</view>
		<view class="list-cell logout-btn"  @click="submitLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import baseUrl from '../../common/config.js';
	import { mapMutations } from 'vuex';
	import { mapActions } from 'vuex';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
			
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			...mapMutations(['REMOVE_DATA']),
			...mapActions(['logout']),
			navTo(url){
				uni.showToast({
					title: `跳转到${url}`,
					icon: 'none'
				})
			},
			switchChange(e){
				let switchState = e.detail.value? '打开':'关闭'
				uni.showToast({
					title: `${switchState}了开关`,
					icon: 'none'
				})
			},
			submitLogout(){
				let _self = this;
				uni.showModal({
					content: '确定要退出登录吗',
					success(e) {
						if(e.confirm){
							_self.toLogout();
						}
					}
				})
			},
			async toLogout(){
				if(this.hasLogin){
					let res = await this.logout(this.userInfo.token);
					 uni.showToast({
						title: res.data.message,
						icon: res.data.code == 2000?'success':'none'
					 })
					setTimeout( () => {
						uni.navigateBack();
					},500)
				}else{
					uni.showToast({
						title: '您还没登录呢',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $page-color-base;
	}
	.list-cell{
		// overflow: hidden;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20upx 30upx;
		line-height: 60upx;
		position: relative;
		&.logout-btn{
			margin-top: 40upx;
			
			.cell-tit{
				text-align: center;	
				color: $uni-color-primary;
				// margin-right:0;
			}
		}
		&.mt-8{
			margin-top: 16upx;
		}
		&.b-b:after{
			left: 30upx;
		}
		.cell-more{
			color: $font-color-light;
			margin-left: 10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			margin-right: 10upx;
			color: $font-color-dark;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
	}
</style>
