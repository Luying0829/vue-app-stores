import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { allDatasApi } from '../request/api'

export const useSearchStore = defineStore('search', {
	state: () => {
		const searchDatas = reactive([])
		const searchAllIds = reactive([])
		
		return { searchDatas, searchAllIds }
	},
	getters: {
		totalSearch (state): number {
			return state.searchDatas.length
		},
		totalId (state): number {
			let Arr = []
			state.searchDatas.forEach(item => {
				console.log(item, 'item=====')
				// if(item.done) {
				// 	num++
				// }
			})
			return num
		}
	},
	actions: {
		// 获取本地所有搜索数据
		async getAllTodoListData() {
			const res = await allDatasApi()
			// console.log('limit-100', res)
			this.searchDatas = res
		}
	}
})