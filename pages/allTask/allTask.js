// pages/allTask/allTask.js
const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    radio: '1',
    list:[]
  },
  onChange(event) {
    console.log(event.detail.name)
  },
  radioChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  add(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
        console.log('同步获取本地缓存',res.data)
        let url = 'user/'+res.data.userId+'/task';
        http.execute(url, 'GET', "",
          res1 => {
            console.log('查询用户任务列表', res1);
            that.data.list=res1.data;
            that.setData({
              list:that.data.list 
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

  },
  toDetails(e){
    var taskObj = e.currentTarget.dataset.item;
    console.log('toDetail',taskObj)
    wx.navigateTo({
      'url': '/pages/taskDtails/taskDtails?task=' + JSON.stringify(taskObj)
    })
  }
})