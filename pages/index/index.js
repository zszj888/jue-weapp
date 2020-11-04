//index.js
const http = require('../../utils/http');
const app = getApp()
Page({
  data: {
    keyword:'',
    tag:'',
    show: true,
    scrollH: 0, 
    currentTabIndex:0,// 当前的tab下标
    tabList:['演员', '主播', '网红', '配音演员', '特型演员'],
    roleList:[
    ]
  },
  //  onClose() {
  //   this.setData({ close: false });
  // },
  // onInput(e){
  //   this.data.keyword = e.detail.value;
  // },
  search(){
    var params = {name:this.data.keyword,skill:''};
    http.execute('role/list/'+http.currentUser().userId,'GET',params,res=>{
      this.data.roleList = res.data;
      this.setData(this.data);
    })
  },
  onLoad: function() {
    
    // 获取用户信息
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

  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },
  // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },
  // 滚动到底部
  lower(e) {
    console.log('滚动到底部了',e) 
  },
  // 收藏/取消收藏
  collectionUser(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var flag = that.data.roleList[index].collection;
    that.data.roleList[index].collection = !that.data.roleList[index].collection
    that.setData({
      roleList: that.data.roleList
    })
    var roleId = e.currentTarget.dataset.id;
    console.log('col:',flag)
    flag?
    http.execute('favor/'+http.currentUser().userId+'/'+roleId,'DELETE','',res=>{}):
    http.execute('favor/'+http.currentUser().userId+'/'+roleId,'POST','',res=>{});
  },
  changeTab(e){
    this.setData({
      currentTabIndex: e.target.dataset.index,
      tag:e.target.dataset.item
    })
    var params = {name:this.data.keyword,skill:e.target.dataset.item};
    http.execute('role/list/'+http.currentUser().userId,'GET',params,res=>{
      this.data.roleList = res.data;
      this.setData(this.data);
    })
  },
  // 跳转详情页面
  toDetails(e) {
    var data = e.currentTarget.dataset.item;
    data.showExt = false
    wx.navigateTo({
      'url': '/pages/roleDetails/roleDetails?query=' + JSON.stringify(data)
    })
  },
  onShow(){
    var that = this;
    wx.getSystemInfo({
      success: res =>{
        let scrollH = res.windowHeight;
        that.setData({
          scrollH: 0.7 * scrollH
          });
        }
    });
    wx.login({
      success(res) {
        if (res.code) {
          console.log('onShow1',res.code)
          http.execute('wx/finishLogin', 'GET', {
              code: res.code
            },
            res1 => {
              console.log('onShow2' + res1);
              wx.setStorageSync('currentUser', res1);
              var params = {name:that.data.keyword,skill:''};
              http.execute('role/list/'+res1.userId,'GET',params,res2=>{
                console.log('角色大厅:',res2.data)
                that.data.roleList = res2.data;
                that.setData(that.data);
              });
            },
            err => {})
        } 
      }
    })
  
   
  }
})
