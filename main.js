import Vue from 'vue'
import App from './App'
// import Json from './Json.js'
import httpApi from './common/httpApi.js'



Vue.prototype.$api = httpApi;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
