<template>
	<view class="content">
		<view class="input-form">
			<navigator class="form-item b-b"  url="/pages/address/address?source=1" >
				<text class="iconfont icon-map"></text>
				<view class="input location">
					<view class="address-section">
						<text class="address">{{addressData.address}} {{addressData.addressName}} {{addressData.area}}</text>
						<view class="bot">
							<text class="name">{{addressData.name}}</text>
							<text class="mobile">{{addressData.mobile}}</text>
						</view>
					</view>
				</view>
				
				<!-- <text class="input location" @click="chooseLocation"> {{ address }}</text> -->
				<text class="iconfont icon-arrow-right"></text>
			</navigator>
			<view class="form-item b-b" @click="toggleMask('show','date')">
				<text class="iconfont icon-history"></text>
				<view class="input"><text class="tit">服务时间：</text> {{month}} 月 {{day}} 日 {{hour}} 时 </view>
				<text class="iconfont icon-arrow-right"></text>
			</view>
<!-- 			<view class="form-item b-b" >
				<text class="iconfont icon-history"></text>
				<view class="input picker-wrap">
					<view class="list-cell-left">
						服务日期
					</view>
					<view class="list-cell-db">
						<picker mode="date" :value="date" 
						:start="startDate" :end="endDate"
						@change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
						
					</view>
					
				</view>
				<text class="iconfont icon-arrow-right"></text>
			</view> -->
			<!-- <view class="form-item b-b">
				<text class="iconfont icon-mobile"></text>
				<input type="text" value="" placeholder="请输入联系人电话" class="input"/>
				<text class="iconfont icon-arrow-right"></text>
			</view> -->
			<view class="form-item b-b">
				<text class="iconfont icon-sandy-clock"></text>
				<view class="scandy-clock input">
					<text class="tit">服务时长：</text>
					<text class="decrease" @click="changeClock('decrease')">-</text>
					<input type="text" class="howlong" v-model="serviceClock"/>
					<text class="add" @click="changeClock('add')">+</text>
				</view>
			</view>
			<view class="form-item b-b">
				<text class="iconfont icon-sandy-clock"></text>
				<view class="scandy-clock input">
					<text class="tit">服务面积(10平方起)：</text>
					
					<input type="text" class="input area-input" v-model="serviceArea"/>
					<text class="square">平米</text>
					
				</view>
			</view>
			<view class="form-item b-b m-b-10">
				<text class="iconfont icon-remark"></text>
				<input type="text" value="" placeholder="请填写个性需求" class="input"/>
				<!-- <text class="iconfont icon-arrow-right"></text> -->
			</view>
			<view class="form-item b-b">
				<text class="input">卡</text>
				<text>用卡享优惠，立即购买</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="form-item m-b-10" @click="toggleMask('show','coupon')">
				<text class="input">优惠券</text>
				<text class="coupon-account">{{ disCount.text }}</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			
		</view>
		<!-- 金额明细 -->
		<view class="input-form amount-list">
			<view class="form-item b-b">
				<text class="input">服务金额</text>
				<view class="service-price">
					<text>￥</text>
					<text>{{ calTotalAmount }}</text>
				</view>		
			</view>
			<view class="form-item b-b">
				<text class="input">优惠金额</text>
				<view class="preferential-price">
					<text>-￥</text>
					<text class="service-price"> {{ useCoupon?"0":disCount.account }}</text>
				</view>
			</view>
			
		</view>
		
		<!-- 日期选择蒙层 -->
		<view class="mask-date" 
		:class="dateMaskState===0?'none':dateMaskState===1?'show':''"
		@click="toggleMask('','date')">
			<view class="mask-date-content" @click.stop.prevent="stopPrevent">
				 <picker-view class="picker-view" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				    
				     <picker-view-column>
				         <view class="item" v-for="(item,index) in months" :key="index">{{item}} 月</view>
				     </picker-view-column>
				     <picker-view-column>
				         <view class="item" v-for="(item,index) in days" :key="index">{{item}} 日</view>
				     </picker-view-column>
					 <picker-view-column>
					     <view class="item" v-for="(item,index) in hours" :key="index">{{hour}} 时</view>
					 </picker-view-column>
				 </picker-view>
			</view>
		</view>
		
		<!-- 优惠券选择蒙层 -->
		<view class="mask-date" 
		:class="couponMaskState===0?'none':couponMaskState===1?'show':''"
		@click="toggleMask('','coupon')">
			<view class="mask-date-content" @click.stop.prevent="stopPrevent">
				 <view class="coupon-item" v-for="(item,index) in couponList" :key="index" @click.stop.prevent="selectCoupon(index)">
				 	<view class="content">
				 		<view class="left">
				 			<text class="title">{{ item.title }}</text>
							<text class="expiration">有效期至2019-06-30</text>
				 		</view>
						<view class="right">
							<text class="price">{{ item.price }}</text>
							<text class="threshold">满30可用</text>
						</view>
						<view class="circle l"></view>
						<view class="circle r"></view>
				 	</view>
					<view class="tips">
						限新用户使用哦
					</view>
				 </view>
				 <label class="coupon-radio " @click="changeUseCoupon">
					 <text class="tit">不使用优惠券</text>
				 	<radio value=""  color="#f96d4d" :checked="useCoupon"/><text></text>
				 </label>
			</view>
		</view>
		
		<!-- 按钮 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{ realPayment }}</text>
			</view>
			<text class="btn" @click="toPay">去结算</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			const currentDate = this.getDate({
				format: true
			})
			const date = new Date()
			        // const years = []
			        // const year = date.getFullYear()
					
			        const months = []
			        const month = date.getMonth() + 1
			        const days = []
			        const day = date.getDate()
					const hours = []
					const hour = date.getHours()
					const second = []
					const seconds = date.getSeconds()
			        // for (let i = 1990; i <= date.getFullYear(); i++) {
			        //     years.push(i)
			        // }
			        for (let i = month; i <= 12; i++) {
						// console.log(i)
			            months.push(i)
			        }
			        for (let i = day + 1; i <= 31; i++) {
			            days.push(i)
			        }
					for (let i = 8; i <= 20; i++) {
					    hours.push(i + ':00')
						hours.push(i + ':30')
					}
			return {
				address:'请选择地址',
				dateMaskState: 0 , //日期选择面板显示状态，
				couponMaskState: 0, // 优惠券选择面板显示状态
				date: currentDate,
				// time: '12:01years,
				months,
				month,
				days,
				day,
				hours,
				hour,
				seconds,
				second,
				value: [month - 1, day - 1, hour -1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				index: 0,
				arrayIndex:[0,0],
				array: [["12","11","10"],["12","11","10"]],
				addressData: {
					name: '白鹿',
					mobile: '13599999999',
					addressName: '德新花园',
					address: '广东省深圳市南山区',
					area: '3-802',
					default: false,
				},
				serviceClock: 1,
				serviceArea: 10,
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 25,
					},
					{
						title: '劳动节限时优惠券',
						price: 15,
					},
					{
						title: '春日清洁优惠券',
						price: 10,
					}
				],
				// discountNum: 0,
				disCount:{
					account: 0,
					text:'请选择优惠券'
				},
				useCoupon: false,
				
			}
		},
		computed:{
			// startDate(){
			// 	return this.getDate('start');
			// },
			// endDate(){
			// 	return this.getDate('end');
			// },
			calTotalAmount(){
				return this.serviceClock * this.serviceArea *  17;
			},
			realPayment(){
				let discount = this.useCoupon?"0":this.disCount.account;
				return this.serviceClock * this.serviceArea *  17 - discount;
			}
		},
		methods:{
			chooseLocation(){
				uni.chooseLocation({
					success: (data) => {
						
						this.address = data.name;
						console.log("name",name);
					}
				})
			},
			toggleMask(display,type){
				let timer = display === 'show'? 10 : 300;
				let state = display === 'show' ? 1 : 0;
				if(type === 'date'){
					this.dateMaskState = 2;
					setTimeout( () => {
						this.dateMaskState = state;
					},timer)
				}else{
					this.couponMaskState = 2;
					setTimeout( () => {
						this.couponMaskState = state;
					},timer)
				}
				
			},
			bindChange: function (e) {
			            const val = e.detail.value
			            // this.year = this.years[val[0]]
			            this.month = this.months[val[0]]
			            this.day = this.days[val[1]]
						this.hour = this.hours[val[2]]
			},
			// bindPickerChange(e){
			// 	// console.log('picker发送选择改变，携带值为', e.target.value);
			// 	// this.index = e.target.value
			// },
			// bindDateChange(e){
			// 	this.date = e.target.value;
			// },
			// timeChange(e) {
			// 	this.time = e.target.value;
			// },
			stopPrevent(){},
			getDate(type){
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				
				if(type === 'start'){
					year = year - 60;
				}else if(type === 'end'){
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`
			},
			changeClock(type){
				if(type === 'decrease'){
					if(this.serviceClock <= 1){
						uni.showToast({
							title: '不能再减少了哦',
							icon: 'none'
						})
					}else{
						this.serviceClock--; 
					}
				}else{
					this.serviceClock++;
				}
			},
			selectCoupon(index){
				this.disCount.account = this.couponList[index].price;
				this.disCount.text = `${this.couponList[index].title}${this.couponList[index].price}元` ;
				this.toggleMask('','coupon');
			},
			changeUseCoupon(){
				this.useCoupon = !this.useCoupon;
				this.toggleMask('','coupon');
			},
			toPay(){
				uni.redirectTo({
					url: `/pages/pay/pay?account=${this.realPayment}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}
	.m-b-10{
		margin-bottom: 20upx;
	}
	.input-form{
		display: flex;
		flex-direction: column;
		.form-item{
			display: flex;
			align-items: center;
			padding: 20upx 20upx;
			position: relative;
			background-color: #fff;
			.iconfont{
				margin-left: 20upx;
				font-size: 40upx;
				color: $base-color
			}
			.input{
				flex: 1;
				font-size: 32upx;
				color: #808080;
				.tit{
					margin-right: 20upx;
				}
				&.location{
					cursor: pointer;
					.bot{
						.name{
							margin-right: 20upx;
						}
					}
					.address-section{
						margin-left: 20upx;
					}
				}
				&.scandy-clock{
					display: flex;
					align-items: center;
					.howlong{
						width: 60upx;	
						text-align: center;
					}
					.decrease,.add{
						background-color: $base-color;
						color: #fff;
						font-size: 34upx;
						font-weight: 700;
					}
					.decrease{
						padding: 0 20upx;
						
					}
					.add{
						padding: 0 15upx;
					}
				}
				&.picker-wrap{
					display: flex;
					align-items: center;
					.list-cell-db{
						display: flex;
						height: 78upx;
						picker{
							height: 100%;
						}
					}
				}
				&.area-input{
					border-bottom: 1px solid #ccc;
					text-align: center;
				}
			}
			.square{
				display: inline-block;
				width: 220upx;
				margin-left: 20upx;
			}
		}
	}
	.input-form.amount-list{
		.preferential-price{
			color: $base-color;
		}
	}
	
	// 日期选择面板
	.mask-date{
		display: flex;
		align-items: flex-end;
		// justify-content: center;
		position: fixed;
		width: 100%;
		bottom: 0;
		top: var(--window-top);
		left: 0;
		background: rgba(0,0,0,0);
		z-index:995;
		transition: .3s;
		.mask-date-content{
			
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			
			background: #f3f3f3;
			transition: .3s;
			overflow-y: scroll;
			transform: translateY(100%);
			text-align: center;
			vertical-align: middle;
			
			// 官方组件
			.picker-view{
				height: 120upx;
				min-height:40vh;
				.item{
					line-height: 100upx;
					height: 100upx;
				}
			}
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			.mask-date-content{
				transform: translateY(0);
			}
		}
	}
	
	// 优惠券面板，与日期选择面板的公共样式不再重写
	.mask-date{
		.mask-date-content{
			.coupon-item{
				background-color: #fff;
				margin: 20upx 24upx;
				display: flex;
				flex-direction: column;
				.content{
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;
					height: 120upx;
					padding: 14upx 30upx;
					&:after{
						position: absolute;
						left: 0;
						bottom: 0;
						content: '';
						width: 100%;
						height: 0;
						border-bottom: 1px dashed #f3f3f3;
						transform: scaleY(50%);
					}
					.left{
						height: 100upx;
						display: flex;
						align-items: flex-start;
						justify-content: center;
						flex-direction: column;
						.title{
							font-size: 32upx;
							color: $font-color-dark;
						}
						.expiration{
							color: $font-color-light;
							font-size: 24upx;
						}
					}
					.right{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size: 26upx;
						color: $font-color-base;
						height: 100upx;
						.price{
							color: $base-color;
							font-size: 44upx;
							margin-bottom: -12upx;
							&:before{
								content: '￥';
								font-size: 34upx;
							}
						}
						
					}
					.circle{
						position: absolute;
						left: -6upx;
						bottom: -10upx;
						width: 20upx;
						height: 20upx;
						background: #f3f3f3;
						border-radius: 100px;
						&.r{
							right: -6upx;
							left: auto;
						}
					}
				}
				.tips{
					text-align: left;
					font-size: 24upx;
					color: $font-color-light;
					line-height: 60upx;
					padding-left: 30upx;
				}
			}
			.coupon-radio{
				margin: 20upx 30upx;
				background-color: #fff;
				padding: 10upx 30upx;
				flex-direction: row;
				justify-content: space-between;
				display: flex;
				.tit{
					flex: 1;	
					text-align: left;
				}
			}
		}
		
	}
	
	// 按钮
	.footer{
		width: 100%;
		height: 90upx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size:30upx;
		background-color: #fff;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0,0,0,.1);
		.price-content{
			padding-left: 30upx;
			.price{
				font-size: 36upx;
				color: $base-color;
			}
			.price-tip{
				color: $base-color;
				margin-left: 8upx;
			}
		}
		.btn{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background: linear-gradient(to right, #f17e64, #f96d4d, #f36848);
			
		}
	}
</style>
