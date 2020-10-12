// var baseUrl = 'https://www.13cyw.com/'
var baseUrl = 'http://127.0.0.1:8888/'

function execute(url, method, data, success, fail) {
  console.log(data);
  wx.request({
    url: baseUrl + url,
    header: {
      'content-type': 'application/json',
    },
    method: method,
    data: data,
    success(res) {
      console.log()
      success(res.data);
    },
    fail(res) {
      fail(res);
    }
  });
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
  currentUser: currentUser
}