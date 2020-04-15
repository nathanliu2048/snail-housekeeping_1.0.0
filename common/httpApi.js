import Json from '../Json.js';

// let baseUrl = 'http://mengxuegu.com:7300/mock/5e7dba791c5f7f209577b51d/home';
export default{
	json(type){
		//模拟异步请求数据
		return new Promise( resolve => {
			setTimeout( () => {
				resolve(Json[type])
			},500)
		})
	},
	request(reqObject){
		return uni.request(reqObject);
	}
}