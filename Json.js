/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		avatar: 'http://b-ssl.duitang.com/uploads/item/201511/21/20151121171107_zMZcy.jpeg'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		id:'c01',
		src: "/static/temp/banner1.png",
		background: "#f96d4d", 
	},
	{
		id:'c02',
		src: "/static/temp/banner2.png",
		background: "rgb(205, 215, 218)",
	},
	{
		id:'c03',
		src: "/static/temp/banner3.png",
		background: "rgb(183, 73, 69)",
	}
]
/* 分类 */
const catalogList = [{
		id:'ca01',
		image:'/static/temp/c3.png',
		text:'大扫除'
	},
	{
		id:'ca02',
		image:'/static/temp/c5.png',
		text:'母婴护理'
	},
	{
		id:'ca03',
		image:'/static/temp/c6.png',
		text:'厨房清洗'
	},
	{
		id:'c04',
		image:'/static/temp/c7.png',
		text:'家电清洗'
	}
	
]
/* 商品列表 */
const goodsList = [{
		id:'g01',
		image:"/static/temp/service01.png",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "日常保洁",
		description:'提供家庭室内表面清洁服务',
		price: 179,
		sales: 61,
	},
	{
		id:'g02',
		image:"/static/temp/service02.png",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		description:'提供家庭室内表面清洁服务',
		title: "家具保养",
		price: 78,
		sales: 16,
	},
	{
		id:'g03',
		image:"/static/temp/service03.png",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "卫生间清洁",
		description:'提供家庭室内表面清洁服务',
		price: 422,
		sales: 137,
	}, {
		id:'g04',
		image:"/static/temp/service04.png",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "油烟机清洗",
		description:'提供家庭室内表面清洁服务',
		price: 179,
		sales: 95,
	},
]

//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [
	{
		time: '2019-04-06 11:37',
		state: 4,
		goodsList: [{
			title: '日常保洁',
			price: 179.5,
			image: '/static/temp/service01.png',
			number: 1,
			attr: '100平米'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 5,
		goodsList: [{
			title: '家具养护',
			price: 69,
			image: '/static/temp/service02.png',
			number: 1,
			attr: '2米'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '卫生间清洁',
			price: 69,
			image: '/static/temp/service03.png',
			number: 1,
			attr: '10平米'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 2,
		goodsList: [{
			title: '厨房清洁',
			price: 69,
			image: '/static/temp/service04.png',
			number: 1,
			attr: '5平米'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 3,
		goodsList: [{
			title: '育婴月嫂',
			price: 4999,
			image: '/static/temp/service05.png',
			number: 1,
			attr: '1个月'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 3,
		goodsList: [{
			title: '育婴月嫂',
			price: 4999,
			image: '/static/temp/service05.png',
			number: 1,
			attr: '1个月'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 3,
		goodsList: [{
			title: '育婴月嫂',
			price: 4999,
			image: '/static/temp/service05.png',
			number: 1,
			attr: '1个月'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 3,
		goodsList: [{
			title: '育婴月嫂',
			price: 4999,
			image: '/static/temp/service05.png',
			number: 1,
			attr: '1个月'
		}]
	},
	

]
const cateList = [{
		id: 1,
		name: '日常保洁'
	},
	{
		id: 2,
		name: '家电清洗'
	},
	{
		id: 3,
		name: '月嫂保姆'
	},
	{
		id: 4,
		name: '专项清洁'
	},
	{
		id: 5,
		pid: 1,
		name: '日常保洁'
	},
	{
		id: 8,
		pid: 5,
		name: '严选保洁',
		picture: '/static/temp/service01.png'
	},
	{
		id: 9,
		pid: 5,
		name: '消杀',
		picture: 'https://img2.4009515151.com/2020/02/27/0226fy0pwdsyyd1.jpg'
	},
	{
		id: 10,
		pid: 5,
		name: '大扫除',
		picture: '/static/temp/service03.png'
	},
	{
		id: 11,
		pid: 5,
		name: '新居开荒',
		picture: '/static/temp/service04.png'
	},
	{
		id: 12,
		pid: 5,
		name: '除尘除螨',
		picture: '/static/temp/notice01.png'
	},
	{
		id: 17,
		pid: 2,
		name: '家电清洗',
	},
	{
		id: 19,
		pid: 17,
		name: '冰箱清洗',
		picture: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2355806532/O1CN01xr63Ge1y7hgK8cIcS_!!0-item_pic.jpg_360x360Q90.jpg_.webp'
	},
	{
		id: 20,
		pid: 17,
		name: '油烟机清洗',
		picture: 'https://img12.360buyimg.com/n7/jfs/t1/104772/32/8691/183117/5e071ebeE2633fccf/72bdb236eb3b9479.jpg'
	},
	{
		id: 21,
		pid: 17,
		name: '空调清洗',
		picture: 'https://img12.360buyimg.com/n7/jfs/t1/110508/11/11851/80306/5e90509aE02b83d29/9e4d56944e5f5e23.jpg'
	},
	{
		id: 22,
		pid: 17,
		name: '吊灯清洗',
		picture: 'https://img10.360buyimg.com/n7/jfs/t1/45772/14/13221/161862/5da03d74Eee011074/8a318dc427f801ff.jpg'
	},
	{
		id: 23,
		pid: 17,
		name: '洗衣机清洗',
		picture: 'https://img13.360buyimg.com/n7/jfs/t1/101852/2/17573/25044/5e8763e0Eb9b7e946/8b70189421122aa1.jpg'
	},
	{
		id: 24,
		pid: 17,
		name: '风扇清洗',
		picture: 'https://img14.360buyimg.com/n7/jfs/t1/89254/35/16583/305110/5e7c6040Ebf70f681/5bb473ba16d1bce2.jpg'
	},
	{
		id: 25,
		pid: 3,
		name: '月嫂保姆'
	},
	{
		id: 27,
		pid: 25,
		name: '月嫂',
		picture: '/static/temp/service05.png'
	},
	{
		id: 28,
		pid: 25,
		name: '育婴师',
		picture: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=23544084,464477170&fm=26&gp=0.jpg'
	},
	{
		id: 29,
		pid: 25,
		name: '钟点保姆',
		picture: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2327158959,1860229427&fm=26&gp=0.jpg'
	},
	{
		id: 30,
		pid: 25,
		name: '长期保姆',
		picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2046825713,1563722569&fm=26&gp=0.jpg'
	},
	{
		id: 39,
		pid: 4,
		name: '专项清洁',
	},
	{
		id: 43,
		pid: 39,
		name: '厨房清洁',
		picture: '/static/temp/service04.png'
	},
	{
		id: 44,
		pid: 39,
		name: '卫生间清洁',
		picture: '/static/temp/service07.png'
	},
	{
		id: 45,
		pid: 39,
		name: '家具养护',
		picture: '/static/temp/service02.png'
	},
	{
		id: 46,
		pid: 39,
		name: '地板养护',
		picture: '/static/temp/service03.png'
	},
]

export default {
	carouselList,
	catalogList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	cateList
}
