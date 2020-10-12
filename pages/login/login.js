const http = require('../../utils/http')
const app = getApp();
Page({
  data: {
    show: false
  },
  onLoad() {
    var current = http.currentUser()
    console.log('onLoad - current',current)
    if(typeof(current)!='undefined'){
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
      var that = this;
      //用户已经授权过
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            //使用 code 换取 openid 和 session_key 等信息
            //发起网络请求
            http.execute('wx/finishLogin', 'GET', {
                code: res.code
              },
              res => {
                console.log('登录成功，缓存当前用户并跳转到index' + res);
                wx.setStorageSync('currentUser', res);
                wx.switchTab({
                  url: '/pages/index/index'
                })
              },
              err => {})
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
      app.globalData.userInfo = e.detail.userInfo;
      console.log('app.globalData.userInfo',app.globalData.userInfo)
    } else {
      that.setData({
        show: true
      })
    }
  },
})