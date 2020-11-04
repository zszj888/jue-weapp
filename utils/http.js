var baseUrl = 'https://www.13cyw.com/'
// var baseUrl = 'http://127.0.0.1:8888/'
function execute(url, method, data, success, f) {
  console.log(data);
  wx.request({
    url: baseUrl + url,
    header: {
      'content-type': 'application/json',
    },
    method: method,
    data: data,
    success:res=>{
      success(res.data);
    }
  });
}
function fetchTaskList(type,tag,that){
  var user = currentUser()
  let url = 'user/' + user.userId +tag ;
  execute(url, 'GET', {
      type: type
    },
    res1 => {
      console.log('获得列表', res1);
      if(res1.ret == 200){
        that.data.list = res1.data;
        that.setData({
          list: that.data.list
        })
      }
    },
    err => {})
}
function currentUser() {
  try {
    var value = wx.getStorageSync('currentUser')
    if (value) {
      console.log('当前用户',value)
      return value;
    }
  } catch (e) {
    console.log('获取当前用户异常',e)
  }
}
module.exports = {
  execute: execute,
  currentUser: currentUser,
  fetchTaskList:fetchTaskList
}