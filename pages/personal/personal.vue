<template>
	<view class="container">
		<!--header-->
		<view class="box-header">
			<image class="bg"  src="../../static/user-bg.jpg" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

	.container{
		.box-header{
			height: 520upx;
			padding: 100upx 30upx 0;
			position:relative;
			.bg{
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				filter: blur(1px);
				opacity: .7;
			}
		}
		
	}
	
</style>
