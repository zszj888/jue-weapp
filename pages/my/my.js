//index.js
const http = require('../../utils/http')
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    myList: [{
        name: '全部任务',
        path: '/pages/allTask/allTask',
        icon: '../../images/task-icon.png'
      },
      {
        name: '钱包',
        path: '/pages/wallet/wallet',
        icon: '../../images/wallet-icon.png'
      },
      {
        name: '发布任务',
        path: '/pages/publishTask/publishTask',
        icon: '../../images/publish-icon.png'
      },
      {
        name: '我的收藏',
        path: '/pages/collection/collection',
        icon: '../../images/un-collection.png'
      },
      {
        name: '消息通知',
        path: '/pages/myMessage/myMessage',
        icon: '../../images/message-icon.png'
      },
      {
        name: '在线客服',
        path: '/pages/onlineServe/onlineServe',
        icon: '../../images/onlineServe-icon.png'
      },
      {
        name: '角色申请',
        path: '/pages/roleApply/roleApply',
        icon: '../../images/roleApply-icon.png'
      },
      {
        name: '经纪人申请',
        path: '/pages/agentApply/agentApply',
        icon: '../../images/agentApply-icon.png'
      },
      {
        name: '平台服务协议',
        path: '/pages/serviceAgreement/serviceAgreement',
        icon: '../../images/serviceAgreement-icon.png'
      }
    ]
  },

  onLoad: function () {
    this.getUserInfo();
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  toPages(e) {
    // console.log(e)
    var path = e.currentTarget.dataset.item.path;
    var menuFunc = {
      'task': 'pages/allTask/allTask', // 全部任务
      'wallet': 'pages/wallet/wallet', // 钱包
      'publishTask': 'pages/publishTask/publishTask', //发布任务
      'collection': 'pages/collection/collection', // 我的收藏
      'myMessage': 'pages/myMessage/myMessage', // 消息通知
      'onlineServe': 'pages/onlineServe/onlineServe', // 在线客服
      'roleApply': 'pages/roleApply/roleApply', // 角色申请
      'agentApply': 'pages/agentApply/agentApply', // 经纪人申请
      'serviceAgreement': 'pages/serviceAgreement/serviceAgreement' // 平台协议
    }
    // 有授权就跳转，没有就提示授权
    if (this.data.userInfo.nickName) {
      wx.navigateTo({
        'url': path
      })
    } else {
      console.log(22)
      wx.showModal({
        title: '提示',
        content: '请先完善个人信息',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '/pages/myInfo/myInfo',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  login() {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          http.execute('wx/finishLogin', 'GET', {
              code: res.code
            },
            res => {
              console.log(res);
              wx.setStorage({
                data: res,
                key: 'currentUser',
              })
            },
            err => {
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserInfo() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
          // 授权玩调用登录接口
          this.login();
        }
      }
    })
  }
})