// pages/myInfo/myInfo.js
const http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    http.execute('user/addUserInfo', 'POST', e.detail.value,
      res => {
        console.log("保存用户信息成功：", res);
      },
      err => {})
  },
  // 获取用户信息
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx.getStorage({
      key: 'currentUser',
      success(res) {
        console.log('同步获取本地缓存当前用户',res.data)
        http.execute('user/' + res.data.userId, 'GET', "",
          res1 => {
            console.log('查询用户成功', res1);
            that.setData({
              user: res1.data
            })
          },
          err => {})
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})