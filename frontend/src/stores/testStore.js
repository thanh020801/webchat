import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const testStore = defineStore('testStore', {
	hello: 'thanhhhhhhh',
	state:() =>{
		return {
			hello: 'thanh'
		}
	}
})
