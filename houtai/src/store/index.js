import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
	state: {
		name: '',
		curtId: 0
	},
	getters: {

	},
	mutations: {
		valIsChange(state, newVal){
			state.name = newVal.name
		},
		idChange(state){
			state.curtId++
		}
	},
	actions: {
		changesVal({commit}, newVal){
			// console.log('actionsNewVal:', newVal)
			commit('valIsChange',{name: newVal.kk});
		},
		changeId({commit}){
			commit('idChange')
		}
	}
})
