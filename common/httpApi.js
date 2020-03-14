import Json from '../Json.js';


export default{
	json(type){
		//模拟异步请求数据
		return new Promise( resolve => {
			setTimeout( () => {
				resolve(Json[type])
			},500)
		})
	}
}