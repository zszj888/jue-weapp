Component({
  data: {
    selected: 0,
    color: "#8a8a8a",
    selectedColor: "#FDBD2F",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/tabBar/role-home-default.png",
      selectedIconPath: "/images/tabBar/role-home-selected.png",
      text: "角色大厅"
    }, {
      pagePath: "/pages/task/task",
      iconPath: "/images/tabBar/task-home-default.png",
      selectedIconPath: "/images/tabBar/task-home-selected.png",
      text: "任务大厅"
    },{
      pagePath: "/pages/my/my",
      iconPath: "/images/tabBar/my-home-default.png",
      selectedIconPath: "/images/tabBar/my-home-selected.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('tabbar,data.index',data.index,'->',data.path)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})