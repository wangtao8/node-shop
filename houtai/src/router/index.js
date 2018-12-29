import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//按需加载
const Login = r => require.ensure([], () => r(require('../components/login')), 'login');
const Index = r => require.ensure([], () => r(require('../components/index')), 'index');
const Home = r => require.ensure([], () => r(require('../components/home')), 'home');
const goodsList = r => require.ensure([], () => r(require('../components/goodslist')), 'goodslist');
const goodsInfo = r => require.ensure([], () => r(require('../components/goodsinfo')), 'goodsinfo');
const Vue3 = r => require.ensure([], () => r(require('../components/vue3')), 'vue3');
const Vue4 = r => require.ensure([], () => r(require('../components/vue4')), 'vue4');
const Jisuan = r => require.ensure([], () => r(require('../components/jisuan')), 'jisuan');
const NotFoundComponent = r => require.ensure([], () => r(require('../components/notfoundcomponent')), 'notfoundcomponent');
//import Login from '@/components/login'
//import Index from '@/components/index'
//import Home from '@/components/home'
//import Vue2 from '@/components/vue2'
//import Vue3 from '@/components/vue3'
//import Vue4 from '@/components/vue4'

export default new Router({
	mode: 'history',
	routes: [{
		path: '*',
		component: NotFoundComponent
	},{
		path: '/',
		component: Login
	}, {
		path: '/index',
		component: Index,
		children: [{
			path: '/',
			component: Home
		}, {
			path: '/goodslist',
			component: goodsList
		}, {
			path: '/goodsinfo',
			component: goodsInfo
		}, {
			path: '/vue3',
			component: Vue3
		}, {
			path: '/vue4',
			component: Vue4
		}, {
			path: '/jisuan',
			component: Jisuan
		}]
	}]
})
// const routes = 

// export default new Router({
// 	routes,
// 	strict: process.env.NODE_ENV !== 'production',
// })