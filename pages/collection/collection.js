// pages/collection/collection.js
const http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '0',
    radio: '1',
    list:[]
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  changeActive(event) {
    if(event.target.id === '1'){
      let that = this;
      http.execute('favor/' + http.currentUser().userId + '/role', 'GET', '', res => {
        console.log(res);
        // that.data.list = res.data
        that.setData({
          list:res.data
        })
      })
    }else{
      let that = this;
      http.execute('favor/' + http.currentUser().userId + '/task', 'GET', '', res => {
        console.log(res);
        // that.data.list = res.data
        that.setData({
          list:res.data
        })
      })
    }
    this.setData({
      active: event.target.id
    })
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
    http.execute('favor/' + http.currentUser().userId + '/task', 'GET', '', res => {
      console.log(res);
      // that.data.list = res.data
      that.setData({
        list:res.data
      })
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
  onShareAppMessage: function (res) {
    if(res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.dataset.id)
      let url = encodeURIComponent('/pages/allTask/allTask?id=' + res.target.dataset.id);
      return {
        title: "我收藏的角儿",
        path:`pages/collection/collection?url=${url}`,
        imageUrl :'http://127.0.0.1:8888/cool.jpg'
      }
    }
  }
})