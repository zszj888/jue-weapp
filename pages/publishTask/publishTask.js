// pages/publishTask/publishTask.js
const http = require('../../utils/http.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    createById:''
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
      http.execute('task/add', 'POST', e.detail.value,
      res => {
        console.log("保存任务信息成功：", res);
        if (res.ret === 200){
          wx.showToast({
            title: '发布成功',
            icon:'success',
            duration:2000,
            success:function(){
              setTimeout(function(){
              wx.switchTab({
                url: '/pages/my/my',
              })
            },1000);
            }
          })        
        }else if(res.ret === 500){
          wx.showToast({
            title:'任务名称重复了',
            icon:'none',
            duration:2000
          })
        }
      },
      err => {});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'currentUser',
      success(res) {
        console.log('publishTask获取缓存用户',res.data.userId)
            that.setData({
              createById: res.data.userId
            })
      }
    })
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