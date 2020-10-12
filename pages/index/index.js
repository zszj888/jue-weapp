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
      {
        img:'https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg',
        imgList:['https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg','https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg'],
        name:'Time',
        sex:0,
        skill: "舞蹈，钢琴",
        age:24,
        weight:'48kg',
        height:'168cm',
        showInfo:'演出信息描述',
        videoUrl:'',
        collection:false
      }
      // {
      //   img:'https://img.youmaiyy.com/ym/20200612/by02yozm790k599611591959288.jpg',
      //   imgList:['https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg','https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg'],
      //   name:'nick',
      //   sex:1,
      //   skill: "舞蹈，钢琴",
      //   age:24,
      //   weight:'48kg',
      //   height:'175cm',
      //   showInfo:'演出信息描述',
      //   videoUrl:'',
      //   collection:false
      // },
      // {
      //   img:'https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg',
      //   imgList:['https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg','https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg'],
      //   name:'mina',
      //   sex:1,
      //   skill: "舞蹈，钢琴",
      //   age:24,
      //   weight:'48kg',
      //   height:'160cm',
      //   showInfo:'演出信息描述',
      //   videoUrl:'',
      //   collection:false
      // },
      // {
      //   img:'https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg',
      //   imgList:['https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg','https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg'],
      //   name:'Time',
      //   sex:0,
      //   skill: "舞蹈，钢琴",
      //   age:24,
      //   weight:'48kg',
      //   height:'158cm',
      //   showInfo:'演出信息描述',
      //   videoUrl:'',
      //   collection:false
      // },
      // {
      //   img:'https://img.youmaiyy.com/ym/20200612/by02yozm790k599611591959288.jpg',
      //   imgList:['https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg','https://img.youmaiyy.com/ym/20200612/23ue1hhvp3jj432381591976995.jpg'],
      //   name:'nick',
      //   sex:1,
      //   skill: "舞蹈，钢琴",
      //   age:24,
      //   weight:'48kg',
      //   height:'163cm',
      //   showInfo:'演出信息描述',
      //   videoUrl:'',
      //   collection:false
      // },
      // {
      //   img:'https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg',
      //   imgList:['https://img1.daofengdj.com//uploads/avatar/20200528/3lvaegywk150x4bzofbdaja9smh2k9qs.jpg'],
      //   name:'mina',
      //   sex:1,
      //   skill: "舞蹈，钢琴",
      //   age:24,
      //   weight:'48kg',
      //   height:'168cm',
      //   showInfo:'演出信息描述',
      //   videoUrl:'',
      //   collection:false
      // }
    ]
  },
   onClose() {
    this.setData({ close: false });
  },
  onInput(e){
    this.data.keyword = e.detail.value;
  },
  search(){
    var params = {name:this.data.keyword,skill:''};
    http.execute('role/list/'+http.currentUser().userId,'GET',params,res=>{
      this.data.roleList = res.data;
      this.setData(this.data);
    })
  },
  onLoad: function() {
    wx.getSystemInfo({
      success: res =>{
        let scrollH = res.windowHeight;
        this.setData({
          scrollH: 0.7 * scrollH
          });
        }
    });
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
        }
      }
    })
    
  },

  onGetUserInfo: function(e) {
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
  // 滚动到底部
  lower(e) {
    console.log('滚动到底部了') 
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
    wx.navigateTo({
      'url': '/pages/roleDetails/roleDetails?queryData=' + JSON.stringify(data)
    })
  },
  onShow(){
    var params = {name:this.data.keyword,skill:''};
    http.execute('role/list/'+http.currentUser().userId,'GET',params,res=>{
      this.data.roleList = res.data;
      this.setData(this.data);
    })
  }
})
