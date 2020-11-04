// pages/allTask/allTask.js
const http = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    radio: '1',
    list: []
  },
  onChange(event) {
    console.log('role tab changed:', event.detail.name)
    switch (event.detail.name) {
      case 0:
        http.fetchTaskList(0, '/role', this);
        break;
      case 1:
        http.fetchTaskList(1, '/role', this);
        break;
      case 2:
        http.fetchTaskList(2, '/role', this);
        break;
        case 3:
        http.fetchTaskList(3, '/role', this);
        break;
        case 4:
        http.fetchTaskList(4, '/role', this);
        break;
    }
  },
  radioChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  add(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.fetchTaskList(0, '/role', this);
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

  },
  toDetails(e) {
    var taskObj = e.currentTarget.dataset.item;
    taskObj.showExt = true;
    console.log('toDetail', taskObj)
    wx.navigateTo({
      'url': '/pages/roleDetails/roleDetails?query=' + JSON.stringify(taskObj)
    })
  }
})