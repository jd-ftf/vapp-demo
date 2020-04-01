Page({
  data: {
    userInfo: {}
  },
  bindGetUserInfo ({ detail }) {
    this.setData({
      userInfo: detail.userInfo
    })
  },
  onLoad () {
    let self = this
    jd.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          jd.getUserInfo({
            success: function({ userInfo }) {
              console.log(userInfo)
              self.setData({
                userInfo: userInfo
              })
            }
          })
        }
      }
    })
  }
})