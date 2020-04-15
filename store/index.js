import Vue from 'vue';
import Vuex from 'vuex';
import baseUrl from '../common/config.js'
import httpApi from '../common/httpApi.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {}
	},
	mutations: {
		SET_DATA(state, provider) {
		
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		REMOVE_DATA(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
		        key: 'userInfo'  
		    })
		}
	},
	actions:{
		
		login({commit},userData){
			// 提交表单给后台进行验证是否正确
			// return new Promise((resolve,reject) => {
			// 	httpApi.request({
			// 		url: `${baseUrl}/user/login`,
			// 		method: 'POST',
			// 		data: userData,
			// 	}).then( res =>{
			// 		console.log(res)
			// 		commit('SET_DATA',res[1].data.data);
			// 		resolve(res[1].data)
			// 	}).catch( err => {
			// 		reject(err);
			// 	})	
			// })
			
			return new Promise((resolve,reject) => {
				httpApi.request({
					url: `${baseUrl}/user/login`,
					method: 'POST',
					data: userData,
					success(res){
						console.log(res)
								commit('SET_DATA',res.data.data);
								resolve(res)
					},
					fail(errr){
						reject(err);
					}
				})
			})
		},
		logout({commit},userToken){
			//	提交表单到后台
			return new Promise( (resolve,reject) => {
				httpApi.request({
					url: `${baseUrl}/user/logout/${userToken}`,
					method: 'POST',
					success(res){
						if(res.data.code == 2000){
							commit('REMOVE_DATA');
							resolve(res);
						}
					},
					fail(err){
						reject(err);
					}
				})
			})
		}
	}
})
export default store;