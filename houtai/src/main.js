// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 网络请求模块
import http from '../static/http.js';
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.prototype.$http = http;
Vue.config.productionTip = false

// 点击导航前调用
router.beforeEach((to, from, next) => {
  // ...
  console.log('目标路由对象to:', to.fullPath, '当前导航正要离开的路由from:', from.fullPath)
  //放行
	next()
	//中断当前的导航
//next(false)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
