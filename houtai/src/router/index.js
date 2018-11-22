import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//按需加载
const Login = r => require.ensure([], () => r(require('@/components/Login')), 'Login');
const Index = r => require.ensure([], () => r(require('@/components/Index')), 'Index');
const Home = r => require.ensure([], () => r(require('@/components/Home')), 'Home');
const goodsList = r => require.ensure([], () => r(require('@/components/goodsList')), 'goodsList');
const goodsInfo = r => require.ensure([], () => r(require('@/components/goodsInfo')), 'goodsInfo');
const Vue3 = r => require.ensure([], () => r(require('@/components/Vue3')), 'Vue3');
const Vue4 = r => require.ensure([], () => r(require('@/components/Vue4')), 'Vue4');
//import Login from '@/components/login'
//import Index from '@/components/index'
//import Home from '@/components/home'
//import Vue2 from '@/components/vue2'
//import Vue3 from '@/components/vue3'
//import Vue4 from '@/components/vue4'

const routes = [{
				path: '/',
				component: Login
			}, {
				path: '/index',
				component: Index,
				children: [{
					path: '/',
					component: Home
				}, {
					path: '/goodsList',
					component: goodsList
				}, {
					path: '/goodsInfo',
					component: goodsInfo
				}, {
					path: '/vue3',
					component: Vue3
				}, {
					path: '/vue4',
					component: Vue4
				}]
			}]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})