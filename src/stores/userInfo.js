import { defineStore } from 'pinia'

export const userInfo = defineStore('userInfo', {
  state: () => {
    return {
      userInformation: {}
    }
  },
  actions: {
    updataUserInfo(data) {
      this.userInformation = data
    }
  },
  getters: () => {}
})
