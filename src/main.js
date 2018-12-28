// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/styles/reset.css' 
// 引入echarts
import echarts from 'echarts'


import VueRouter from 'vue-router';
import routes from './router/menurouter';

import store from './store/index'

Vue.prototype.$echarts = echarts




Vue.use(Element)
Vue.use(VueRouter);
Vue.config.productionTip = false

Vue.prototype.$axios=axios

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
