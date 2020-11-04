// pages/roleDetails/roleDetails.js
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData: {},
    disable: false,
    userid: -1,
    applyList: [],
    sex:'man',
  },
  confirmDone(e){
    let roleid = e.currentTarget.dataset.roleid;
    let userid = http.currentUser().userId;
    http.execute('role/' + roleid + '/finishedBy/' + userid, 'GET', '', sucess => {
      wx.showToast({
        title: '征用已结束',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            console.log('延时1秒后跳转', new Date());
            wx.navigateBack({
              delta: 1,
            })
          }, 1000) //延迟时间
        }
      })
    }, fail => {})
  },
  toUserDetail: function (e) {
    var userid = e.currentTarget.dataset.userid;
    console.log('toUserDetail', userid)
    wx.navigateTo({
      'url': '/pages/myInfo/myInfo?userid=' + userid
    })
  },
  applyRole(e) {
    console.log('applyRole', e);
    let that = this;
    let user = http.currentUser();
    if (typeof user == 'undefined') {
      console.log('请登录在申请角色');
      wx.showToast({
        title: '请登录',
      })
    } else {
      var roleid = e.currentTarget.dataset.roleid;
      http.execute('role/' + roleid + '/applyBy/' + user.userId, 'GET', '', res => {
        console.log('申请角色成功，等待对方确认');
        wx.showToast({
          title: '申请角色成功，等待对方确认',
          duration: 1000
        });
        that.data.disable = true;
        that.setData(that.data);
      }), fail => {}
    }
  },
  formSubmit: function (e) {
    var that = this;
    console.log('提交角色信息：', e.detail.value)
    var role = e.detail.value
    if (isNaN(role.age)) {
      wx.showToast({
        title: '[年龄]请输整数',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (isNaN(role.height)) {
      wx.showToast({
        title: '[身高]请输整数',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (isNaN(role.weight)) {
      wx.showToast({
        title: '[体重]请输整数',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (isNaN(role.fee)) {
      wx.showToast({
        title: '[演出费]请输数字',
        icon: 'none',
        duration: 2000
      })
      return
    }
    e.detail.value.sex = that.data.sex;
    http.execute('role/add', 'POST', e.detail.value,
      res => {
        console.log("发布角色成功：", res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000);
          }
        })
      },
      err => {})
  },
  confirmApply: function (e) {
    let roleid = e.currentTarget.dataset.roleid;
    let userid = e.currentTarget.dataset.userid;
    http.execute('role/' + roleid + '/acceptBy/' + userid, 'GET', '', sucess => {
      console.log('currentTime', new Date())
      if(sucess.ret === 200){
        wx.showToast({
          title: '确认成功',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              console.log('延时1秒后跳转', new Date());
              wx.navigateBack({
                delta: 1,
              })
            }, 1000) //延迟时间
          }
        })
      }else{
        wx.showToast({
          title: sucess.data,
          duration: 2000,
        })
      }
    }, fail => {});
  },
  onLoad: function (options) {
    let that = this;
    let query = options.query;
    if (typeof query != 'undefined' && query) {
      let queryData = JSON.parse(query);
      let ids = queryData.applyPersons;
      that.data.sex = queryData.sex;
      that.data.disable = true;
      if (typeof ids != 'undefined' && ids) {
        that.data.applyList = ids.split(',');
      }
      that.data.queryData = queryData;
    }
      that.data.userid = http.currentUser().userId;
      that.setData(that.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {},

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

})