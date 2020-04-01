// 使用 http 本地服务器时，编译器报错：不合法域名，可关闭开发者工具不合法域名菜单检测进行开发
const host = 'http://localhost:3050'

// 简单封装，开发者可根据需要修改
const request = ({
  url,
  method,
  data,
  success,
  fail
}) => {
  // 同wx.request
  jd.request({
    url: host + url,
    method,
    data,
    success,
    fail
  })
}
module.exports = request