// const request = require('./utils/request')

App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    // request('/test.action', 'get', {}, function (res) {
    //   console.log('test结果3', res)
    // })
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})