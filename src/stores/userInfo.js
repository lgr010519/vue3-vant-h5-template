import { defineStore } from 'pinia'

export const userInfo = defineStore('userInfo', {
  state: () => {
    return {
      userInformation: {}
    }
  },
  actions: {
    updateUserInfo(data) {
      this.userInformation = data
    }
  },
  getters: () => {}
})
