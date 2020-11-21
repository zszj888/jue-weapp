// pages/serviceAgreement/serviceAgreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myList: [{
        name: '常见问题',
        path: '/pages/contract1/normalquestion',
        // icon: '../../images/publish-icon.png'
      },
      // {
      //   name: '售后规则',
      //   path: '/pages/allTask/allTask',
      //   icon: '../../images/task-icon.png'
      // },
      // {
      //   name: '用户注册协议',
      //   path: '/pages/roleDetails/roleDetails',
      //   icon: '../../images/roleApply-icon.png'
      // },
      {
        name: '商户用户注册协议',
        path: '/pages/contract2/merchant',
        // icon: '../../images/task-icon.png'
      },
      // {
      //   name: '商家开店协议',
      //   path: '/pages/wallet/wallet',
      //   icon: '../../images/wallet-icon.png'
      // },
      {
        name: '退货说明',
        path: '/pages/contract3/tuihuoshuoming',
        // icon: '../../images/un-collection.png'
      },
      // {
      //   name: '退款说明',
      //   path: '/pages/myMessage/myMessage',
      //   icon: '../../images/message-icon.png'
      // },
      {
        name: '售后服务',
        path: '/pages/contract4/shouhoufuwu',
        // icon: '../../images/onlineServe-icon.png'
      },
      // {
      //   name: '投诉及建议',
      //   path: '/pages/agentApply/agentApply',
      //   icon: '../../images/agentApply-icon.png'
      // },
      {
        name: '联系我们',
        path: '/pages/contract5/contactus',
        // icon: '../../images/serviceAgreement-icon.png'
      },
      // {
      //   name: '合作',
      //   path: '/pages/serviceAgreement/serviceAgreement',
      //   icon: '../../images/serviceAgreement-icon.png'
      // }

    ]
  },
  toPages(e) {
    var path = e.currentTarget.dataset.item.path;
    // var menuFunc = {
    //   'task': '/pages/allTask/allTask', // 全部任务
    //   'wallet': '/pages/wallet/wallet', // 钱包
    //   'publishTask': '/pages/publishTask/publishTask', //发布任务
    //   'collection': '/pages/collection/collection', // 我的收藏
    //   'myMessage': '/pages/myMessage/myMessage', // 消息通知
    //   'onlineServe': '/pages/onlineServe/onlineServe', // 在线客服
    //   'roleApply': '/pages/roleApply/roleApply', // 角色申请
    //   'agentApply': '/pages/agentApply/agentApply', // 经纪人申请
    //   'serviceAgreement': '/pages/serviceAgreement/serviceAgreement' // 平台协议
    // }
    // 有授权就跳转，没有就提示授权
    console.log('导航到')
    wx.navigateTo({
      url: path,
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