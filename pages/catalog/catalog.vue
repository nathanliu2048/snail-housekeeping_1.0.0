<template>
	<view class="content">
		<scroll-view scroll-y="true" class="left-aside">
			<view v-for="(item) in fList" :key='item.id' class="f-item b-b" 
			:class="{active: item.id === currentId}"
			@click="clickTab(item)">
				{{ item.name }}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="right-aside" :scroll-top="tabScrollTop">
			<view v-for="(item) in sList" :key="item.id" class="s-list" :id="'main'+item.id">
				<text class="s-item">{{ item.name }}</text>
				<view class="t-list">
					<view class="t-item" v-for="(titem) in tList" :key="titem.id" v-show="titem.pid === item.id">
						<image :src="titem.picture" mode=""></image>
						<text class="">{{ titem.name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				fList: [],
				sList: [],
				tList: []
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData(){
				let list = await this.$api.json('cateList');
				list.forEach( item => {
					if(!item.pid){ //没有pid为一级目录
						this.fList.push(item);
					}else if(!item.picture){
						this.sList.push(item);
					}else{
						this.tList.push(item);
					}
				})
			},
			clickTab(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				this.currentId = item.id;
				let index = this.sList.findIndex( sitem => {
					sitem.pid === item.id;
				})
				this.tabScrollTop = this.sList[index].top;
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.sList.forEach( item => {
					let view = uni.createSelectorQuery().select('#main-' + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
					this.sizeCalcState = true;
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content{
		height: 100%;
		background-color: #f8f8f8;
	}
	.content{
		display: flex;
	}
	.left-aside{
		flex-shrink: 0; // flex-grow、flex-shrink、flex-basis默认是0，1，auto
		width: 200upx;
		height: 100%;
		background-color: #fff;
		.f-item{
			height: 100upx;
			width: 100%;
			font-size: 28upx;
			line-height: 100upx;
			text-align: center;
			color:#333; 
			position: relative;
			// display: flex;
			// justify-content: center;
			// align-items: center;
			&.active{
				color: $base-color;
				background-color: #f8f8f8;
				&:before{
					content: '';
					position: absolute;
					top: 50%;
					left:0;
					transform: translateY(-50%);
					height: 36upx;
					width: 8upx;
					background-color: $base-color;
					border-radius: 0 4px 4px 0;
					opacity: .8;
				}
			}
		}
	}
	.right-aside{
		flex: 1;
		.s-list{
			.s-item{
				height: 70upx;
				display: flex;
				// justify-content: center;
				align-items: center;
				padding-top: 8upx;
				font-size: 28upx;
				color: $font-color-dark;
			}
			.t-list{
				width: 100%;
				background-color: #fff;
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-around;
				padding-top:12upx;
				.t-item{
					display: flex;
					flex-direction: column;
					// margin-right:30upx;
					width: 176upx;
					font-size: 26upx;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
					padding-bottom: 20upx;
					image{
						width:140upx;
						height: 140upx;
					}
				}
			}
		}
	}
	
</style>
