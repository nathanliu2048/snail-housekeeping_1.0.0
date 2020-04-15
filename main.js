import Vue from 'vue'
import App from './App'
// import Json from './Json.js'
import store from './store'
import httpApi from './common/httpApi.js';
import { msg, prePage } from './common/util.js';



Vue.prototype.$api = httpApi;
Vue.prototype.$utils = { msg, prePage };


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
