<template>
	<view class="content">
		<view class="title">
			{{ title }}
		</view>
		<view class="art-content">
			<rich-text class="richText" :nodes="strings"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				strings:''
			}
		},
		onLoad(e) {
			console.log(e)
			uni.request({
				url: `https://unidemo.dcloud.net.cn/api/news/36kr/${e.newsid}`,
				method: 'GET',
				data: {},
				success: (res) => {
					
					console.log(res)
					this.title = res.data.title;
					this.strings = res.data.content;
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	/* .content{
		padding: 10upx 4%;
		width: 92%;
		flex-wrap: wrap;
	}
	.title{
		font-size: 38upx;
		font-weight: 700;
		line-height: 2em;
	}
	.art-content{
		line-height: 2em;
	} */
</style>
