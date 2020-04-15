<template>
	<view class="content b-t">
		<view class="list b-b"
		v-for="(item,index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text class="default-tag" v-if="item.default">默认</text>
					<text class="address">{{item.address}} {{item.addressName}} {{item.area}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{ item.name }}</text>
					<text>{{ item.mobile }}</text>
				</view>
			</view>
			<text class="iconfont icon-edit" @click.stop="addAddress('edit',item)"></text>
		</view>
		<view class="add-btn">
			<button type="default" @click="addAddress('add')">新增地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				addressList: [
					{
						name: '李辰',
						mobile: '13611111111',
						addressName: '满一路',
						address: '上海市长宁区',
						area: 'A栋402',
						default: true
					},{
						name: '许仙',
						mobile: '13344558765',
						addressName: '华联花园30-1',
						address: '河北省石家庄市桥西区',
						area: '302',
						default: false,
					}
				]
			}
		},
		onLoad(options) {
			console.log(options.source)
			this.source = options.source;
		},
		methods: {
			checkAddress(item){
				if(this.source == 1){
					this.$utils.prePage().addressData = item;
					uni.navigateBack();
				}
			},
			addAddress(type, item){
				console.log("跳转")
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				console.log(data, type);
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.default-tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		// margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-edit{
		font-size: 40upx;
	}
	.add-btn{
		
		button{
			width: 690upx;
			height: 80upx;
			position: fixed;
			left: 30upx;
			right: 30upx;
			bottom: 16upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
			color: #fff;
			background-color: $base-color;
			border-radius: 10upx;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);	
		}
	}
</style>
