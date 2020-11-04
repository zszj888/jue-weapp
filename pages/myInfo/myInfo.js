// pages/myInfo/myInfo.js
const http = require('../../utils/http.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    openid: '',
    birthday: '',
    disable: false,
    sex: '',
    nick_name:'',
    btnDisabled:false,
  },
  radioChange: function (e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    that.setData({
      sex: e.detail.value
    });
  },
  changeDate: function (e) {
    console.log('birthday', e.detail);
    this.setData({birthday:e.detail.value});
  },
  formSubmit: function (e) {
    var that = this;
    that.setData({btnDisabled:true});
    e.detail.value.sex = that.data.sex;
    e.detail.value.birthda_day = that.data.birthday;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    http.execute('user/addUserInfo', 'POST', e.detail.value,
      res => {
        console.log("保存用户信息成功：", res);
        that.setData({btnDisabled:false});
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      err => {})
  },
  // 获取用户信息
  onLoad: function (options) {
    var that = this;
    let userid = options.userid;
    if (typeof userid != 'undefined' && userid) {
      http.execute('user/' + userid, 'GET', "",
        res1 => {
          console.log('查询用户成功', res1);
          that.data.user = res1.data;
          that.data.disable =  http.currentUser().userId != userid;
          that.data.birthday=res1.data.birthda_day,
          that.data.sex = res1.data.sex;
          that.setData(that.data)
        },
        err => {})
    } else {
      var user = http.currentUser();
      http.execute('user/' + user.userId, 'GET', "",
        res1 => {
          console.log('查询用户成功', res1);
          that.setData({
            disable : false,
            user: res1.data,
            openid: user.openid,
            birthday: res1.data.birthda_day,
            sex: res1.data.sex,
          })
        },
        err => {})
    }
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