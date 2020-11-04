// pages/publishTask/publishTask.js
const http = require('../../utils/http.js');
const {
  formatTime
} = require('../../utils/util.js');
const timeformater = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateTimeMinuteArray: null,
    dateTimeMinute: null,
    dateTimeMinuteArray1: null,
    dateTimeMinute1: null,
    startYear: 2020,
    endYear: 2022,
    createById: '',
    tasktime: timeformater.formatTime(new Date()),
    validatetime: timeformater.formatTime(new Date())
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    http.execute('task/add', 'POST', e.detail.value,
      res => {
        console.log("保存任务信息成功：", res);
        if (res.ret === 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }, 1000);
            }
          })
        } else if (res.ret === 500) {
          wx.showToast({
            title: '任务名称重复了',
            icon: 'none',
            duration: 2000
          })
        }
      },
      err => {});
  },
  changeDateTimeMinute: function (e) {
    var that = this;
    console.log('changeDateTimeMinute: ' + e.detail.value);
    var selected = e.detail.value;
    var year = (that.data.dateTimeMinuteArray)[0][selected[0]];
    var month = (that.data.dateTimeMinuteArray)[1][selected[1]];
    var day = (that.data.dateTimeMinuteArray)[2][selected[2]];
    var hour = (that.data.dateTimeMinuteArray)[3][selected[3]];
    var min = (that.data.dateTimeMinuteArray)[4][selected[4]];
    console.log(year + '年' + month + '月');
    that.data.tasktime = year + '-' + month + '-' + day + ' ' + hour + ':' + min;
    that.setData(
      that.data
    );
  },
  changeDateTimeMinuteValid: function (e) {
    console.log('changeDateTimeMinuteValid: ' + e.detail.value);
    var that = this;
    var selected = e.detail.value;
    var year = (that.data.dateTimeMinuteArray)[0][selected[0]];
    var month = (that.data.dateTimeMinuteArray)[1][selected[1]];
    var day = (that.data.dateTimeMinuteArray)[2][selected[2]];
    var hour = (that.data.dateTimeMinuteArray)[3][selected[3]];
    var min = (that.data.dateTimeMinuteArray)[4][selected[4]];
    console.log(year + '年' + month + '月');
    that.data.validatetime = year + '-' + month + '-' + day + ' ' + hour + ':' + min;
    that.setData(
      that.data
    );
  },
  // changeDateTimeMinuteVaild(e) {
  //   var arr = this.data.dateTimeMinute1,
  //     dateArr = this.data.dateTimeMinuteArray1;
  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = timeformater.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  //   this.setData({
  //     dateTimeMinuteArray1: dateArr,
  //     dateTimeMinute1: arr
  //   });
  // },
  changeDateTimeMinuteColumn(e) {
    var arr = this.data.dateTimeMinute,
      dateArr = this.data.dateTimeMinuteArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = timeformater.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeMinuteArray: dateArr,
      dateTimeMinute: arr
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let user = http.currentUser();
        console.log('publishTask获取缓存用户', user.userId)
        that.data.createById = user.userId;
        
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj2 = timeformater.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    obj2.dateTimeArray.pop();
    obj2.dateTime.pop();
    console.log('onload obj2' + obj2.dateTime)
    that.data.dateTimeMinute= obj2.dateTime;
    that.data.dateTimeMinuteArray= obj2.dateTimeArray;
    that.setData(that.data);
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