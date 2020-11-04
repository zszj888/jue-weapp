//index.js
const app = getApp()
const http = require('../../utils/http')
Page({
  data: {
    scrollH: 0,
    roleList: [],
    keyword:''
  },
  search(){
    var params = {name:this.data.keyword,skill:this.data.keyword};
    http.execute('task/list/'+http.currentUser().userId,'GET',params,res=>{
      this.data.roleList = res.data;
      this.setData(this.data);
    })
  },
  // onInput(e){
  //   this.data.keyword = e.detail.value;
  // },
  onShow() { 
    wx.getSystemInfo({
      success: res => {
        let scrollH = res.windowHeight;
        this.setData({
          scrollH: 0.7 * scrollH
        });
      }
    });
    var that  = this;
    var params = {
      name: that.data.keyword
    };
    var currentUser = http.currentUser();
    var userId = -1;
    if (typeof currentUser != 'undefined') {
      userId = currentUser.userId;
    }
    http.execute('task/list/' + userId, 'GET', params, res => {
      console.log('任务大厅:',res.data)
      that.data.roleList = res.data;
      that.setData(that.data);
    });},
  onLoad: function () {
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },
  // onGetUserInfo: function (e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },
  // 上传图片
//   doUpload: function () {
//     // 选择图片
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {

//         wx.showLoading({
//           title: '上传中',
//         })

//         const filePath = res.tempFilePaths[0]

//         // 上传图片
//         const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
//         wx.cloud.uploadFile({
//           cloudPath,
//           filePath,
//           success: res => {
//             console.log('[上传文件] 成功：', res)

//             app.globalData.fileID = res.fileID
//             app.globalData.cloudPath = cloudPath
//             app.globalData.imagePath = filePath

//             wx.navigateTo({
//               url: '../storageConsole/storageConsole'
//             })
//           },
//           fail: e => {
//             console.error('[上传文件] 失败：', e)
//             wx.showToast({
//               icon: 'none',
//               title: '上传失败',
//             })
//           },
//           complete: () => {
//             wx.hideLoading()
//           }
//         })

//       },
//       fail: e => {
//         console.error(e)
//       }
//     })
//   },
//   // 滚动到底部
//   lower(e) {
//     console.log('滚动到底部了')
//   },
  // 收藏/取消收藏
  collectionUser(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var flag = that.data.roleList[index].collection;
    that.data.roleList[index].collection = !that.data.roleList[index].collection
    that.setData({
      roleList: that.data.roleList
    })
    var taskId = e.currentTarget.dataset.id;
    console.log('收藏与否:',flag)
    flag?
    http.execute('favor/'+http.currentUser().userId+'/t/'+taskId,'DELETE','',res=>{}):
    http.execute('favor/'+http.currentUser().userId+'/t/'+taskId,'POST','',res=>{});
  },
  toDetails(e) {
    var task = e.currentTarget.dataset.item;
    task.showExt = false;
    wx.navigateTo({
      'url': '/pages/taskDtails/taskDtails?task=' + JSON.stringify(task)
    })
  }
})