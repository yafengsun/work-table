/*
 * @Author: your name
 * @Date: 2020-10-29 15:40:47
 * @LastEditTime: 2020-10-29 16:55:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /work-table/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
//根url
axios.defaults.baseURL = 'http://114.116.239.118:8081/jobs'
// 把axios赋值给Vue的原型对象上
Vue.prototype.$axios = axios;
Vue.use(axios);
new Vue({
  render: h => h(App),
}).$mount('#app')
