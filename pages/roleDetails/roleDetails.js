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
    sex: 'man',
    video: [],
    fileList: [],
    maxCountPic: 0,
    maxCountVideo: 0,
    tabList: ['演员', '主播', '网红', '配音', '特型', '其它'],
    tag: '请选择一个标签',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      tag: this.data.tabList[e.detail.value]
    })
  },
  afterReadVideo(event) {
    console.log(event.detail);
    var that = this;
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://www.13cyw.com/wx/upload', // 仅为示例，非真实的接口地址
      // url: 'http://127.0.0.1:8888/wx/upload',
      filePath: file.path,
      name: 'file',
      formData: {
        userId: that.data.userid
      },
      success(res) {
        // 上传完成需要更新 fileList
        console.log('视频上传完成', res)
        const
          video = that.data.video;
        video.push({
          ...file,
          url: JSON.parse(res.data).data
        });
        that.setData({
          video: video
        });
      },
    });
  },
  afterReadPic(event) {
    console.log(event.detail);
    var that = this;
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://www.13cyw.com/wx/upload', // 仅为示例，非真实的接口地址
      // url: 'http://127.0.0.1:8888/wx/upload',
      filePath: file.path,
      name: 'file',
      formData: {
        userId: that.data.userid
      },
      success(res) {
        // 上传完成需要更新 fileList
        console.log('图片上传完成', res)
        const
          fileList = that.data.fileList;
        fileList.push({
          ...file,
          url: JSON.parse(res.data).data
        });
        that.setData({
          fileList: fileList
        });
      },
    });
  },
  confirmDone(e) {
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
        console.log('申请角色成功，等待对方确认', res);
        if (res.ret === 200) {
          wx.requestPayment({
            nonceStr: res.data.WxNonceStr,
            package: res.data.package,
            paySign: res.data.paySign,
            timeStamp: res.data.timeStamp,
            signType:'MD5',
            success(res) {
              console.log('success', res);
              wx.showToast({
                title: '申请角色成功，等待对方确认',
                duration: 2000
              });
              //todo 支付成功后跳转到哪里？？？
            },
            fail(res) {
              console.log('fail', res)
            }
          })
          that.data.disable = true;
          that.setData(that.data);
        }else{
          wx.showToast({
            title: res.msg,
            duration: 2000
          });
        }
      }), fail => {}
    }
  },
  changeTab(e) {
    this.setData({
      currentTabIndex: e.target.dataset.index,
      tag: e.target.dataset.item
    })
  },

  formSubmit: function (e) {
    var that = this;
    console.log('提交角色信息：', e.detail.value)
    var role = e.detail.value;
    var re = /[\u4e00-\u9fa5]/;
    if (!role.name) {
      wx.showToast({
        title: '[姓名]必填',
        icon: 'none',
        duration: 2000
      })
      return
    }
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
    if (that.data.tag == '请选择一个标签') {
      wx.showToast({
        title: '请选择一个标签',
        icon: 'none',
        duration: 2000
      })
      return
    }
    e.detail.value.skill = that.data.tag + ' ' + e.detail.value.skill;
    e.detail.value.sex = that.data.sex;
    e.detail.value.imgUrl = that.data.fileList.map(function (f) {
      return f.url;
    }).toString();
    e.detail.value.video_url = that.data.video.map(function (f) {
      return f.url;
    }).toString();
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
      if (sucess.ret === 200) {
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
      } else {
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
      if (queryData.imgUrl) {
        that.data.fileList = queryData.imgUrl.split(',').map(function (url) {
          return {
            url: url
          }
        });
        that.data.maxCountPic = that.data.fileList.length;
      }
      if (queryData.video_url) {
        that.data.video = queryData.video_url.split(',').map(function (url) {
          return {
            url: url
          }
        });
        that.data.maxCountVideo = that.data.video.length;
      }
      that.data.queryData = queryData;
    }
    that.data.userid = http.currentUser().userId;
    console.log('角色详情页面userid', that.data.userid)
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