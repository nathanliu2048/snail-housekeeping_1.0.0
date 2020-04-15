<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input type="text" value="" class="input" v-model="addressData.name"/>
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input type="text" value="" class="input" v-model="addressData.mobile"/>
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{ addressData.addressName }}
			</text>
			<text class="iconfont icon-map"></text>
		</view>
		<view class="row b-b">
			<text class="tit">门牌号</text>
			<input type="text" value="" class="input" v-model="addressData.area"/>
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.default" color="#fa436a" @change="switchChange"/>
		</view>
		<button type="default" class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				manageType:'',
				addressData: {
					name: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					area: '',
					default: false
				}
			}
		},
		onLoad(options){
			console.log("options===",options);
			let title = '新增收货地址';
			if(options.type == 'edit'){
				title = '编辑收货地址';
				this.addressData = JSON.parse(options.data);
			}
			this.manageType = options.type;
			uni.setNavigationBarTitle({
				title
			})
			
		},
		methods:{
			switchChange(e){
				console.log(e.detail.value)
				this.addressData.default = e.detail.value;
			},
			chooseLocation(){
				uni.chooseLocation({
					success: (data) => {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
						console.log("name",name);
					}
				})
			},
			confirm(){
				let data = this.addressData;
				let mobileExp = /^1[3456789]\d{9}$/;
				if(!data.name){
					this.$utils.msg('请填写姓名');
					return;
				}
				if(!mobileExp.test(data.mobile)){
					this.$utils.msg("请输入手机号码");
					return;
				}
				if(!data.address){
					this.$utils.msg('请在地图上选择所在位置');
					return;
				}
				if(!data.area){
					this.$utils.msg('请填写门牌信息');
					return;
				}
				this.$utils.prePage().refreshList(data,this.manageType);
				this.$utils.msg(`${this.manageType == 'edit'?'修改':'新增'}成功`);
				setTimeout(()=>{
					uni.navigateBack();
				}, 800)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
		padding-top: 16upx;
	}
	.row{
		background-color: #fff;
		position: relative;
		display: flex;
		padding: 0 30upx;
		height: 110upx;
		align-items: center;
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-map{
			font-size: 36upx;
			color: $font-color-light;
		}
		
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
			
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		font-size: $font-lg;
	}
</style>
