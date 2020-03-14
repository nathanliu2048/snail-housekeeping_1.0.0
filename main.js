import Vue from 'vue'
import App from './App'
// import Json from './Json.js'
import httpApi from './common/httpApi.js'


// const json = type => {
// 	//模拟异步请求数据
// 	return new Promise( resolve => {
// 		setTimeout( () => {
// 			resolve(Json[type])
// 		},500)
// 	})
// }

Vue.prototype.$api = httpApi;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
