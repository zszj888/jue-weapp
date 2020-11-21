const http = require("../../utils/http");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    task: {},
    disable: false,
    applyList: [],
    currentUserId: null,
  },
  confirmTask(e) {
    let taskid = e.currentTarget.dataset.taskid;
    let userid = http.currentUser().userId;
    http.execute('task/' + taskid + '/finishedBy/' + userid, 'GET', '', sucess => {
      wx.showToast({
        title: '已确认',
        duration: 1000,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            console.log('延时1秒后跳转', new Date());
            wx.navigateTo({
              url: '/pages/allTask/allTask',
            })
          }, 1000) //延迟时间
        }
      })
    }, fail => {})
  },
  confirmPay(e) {
    //todo 小程序支付
    var that = this;
    let taskid = e.currentTarget.dataset.taskid;
    let userid = e.currentTarget.dataset.userid;
    http.execute('task/' + taskid + '/acceptBy/' + userid, 'GET', '', suc => {
      console.log('currentTime', new Date())
      if (suc.ret === 200) {
        wx.requestPayment({
          nonceStr: suc.data.WxNonceStr,
          package: suc.data.package,
          paySign: suc.data.paySign,
          timeStamp: suc.data.timeStamp,
          signType:'MD5',
          success(res) {
            console.log('success', res);
            wx.showToast({
              title: '支付成功，请耐心等待对方确认',
              duration: 2000
            });
            //支付成功跳转到哪里？？？？
          },
          fail(res) {
            console.log('fail', res)
          }
        })
        that.data.disable = true;
        that.setData(that.data);
      }else{
        wx.showToast({
          title: suc.msg,
          duration: 2000
        });
      }
    }, fail => {});
  },
  applyTask(e) {
    console.log('applyTask', e);
    let that = this;
    let user = http.currentUser();
    if (typeof user == 'undefined') {
      console.log('请登录在申请参与');
      wx.showToast({
        title: '请登录',
      })
    } else {
      let taskid = e.currentTarget.dataset.taskid;
      http.execute('task/' + taskid + '/applyBy/' + user.userId, 'GET', '', res => {
        console.log('申请成功');
        wx.showToast({
          title: '申请成功',
          duration: 1000
        });
        that.data.disable = true;
        that.setData(that.data);
      }), fail => {}
    }
  },

  onLoad: function (options) {
    let that = this;
    let task = JSON.parse(options.task);
    console.log('showExt', task.showExt)
    let ids = task.applyPersons;
    if (typeof ids != 'undefined' && ids) {
      that.data.applyList = ids.split(',');
    }
    that.data.task = task;
    that.data.currentUserId = http.currentUser().userId;
    that.setData(that.data);
  },
  toUserDetail: function (e) {
    var userid = e.currentTarget.dataset.userid;
    console.log('toUserDetail', userid)
    wx.navigateTo({
      'url': '/pages/myInfo/myInfo?userid=' + userid
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