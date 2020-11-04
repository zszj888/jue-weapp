const http = require('../../utils/http')
const app = getApp();
Page({
  data: {
    show: false
  },
  onLoad() {
    var current = http.currentUser()
    console.log('onLoad - current',current)
    if(typeof current != 'undefined'){
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  closeShow() {
    this.setData({
      show: false
    })
  },
  bindGetUserInfo(e) {
    var that = this
    if (e.detail.userInfo) {
      that.setData({show:false});
      console.log('bindGetUserInfo1',e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo;
      console.log('bindGetUserInfo5',app.globalData.userInfo)
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      console.log('bindGetUserInfo6',app.globalData.userInfo)
      that.setData({
        show: true
      })
    }
  },
})