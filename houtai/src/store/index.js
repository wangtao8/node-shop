import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
	state: {
		name: '',
		curtId: {}
	},
	getters: {

	},
	mutations: {
		valIsChange(state, newVal){
			state.name = newVal.name
		}
	},
	actions: {
		changesVal(context, newVal){
			// console.log('actionsNewVal:', newVal.kk)
			context.commit('valIsChange',{name: newVal.kk});
		}
	}
})
