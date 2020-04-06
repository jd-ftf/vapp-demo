const Mock = require('mockjs')

module.exports = query => {
  const { text, productionType, productionMsgType, pageNo, pageSize } = query

  let list = []

  for (let i = 0, len = pageNo == 2 ? 4: pageSize; i < len; i++) {
    list.push({
      id: pageSize * pageNo + i,
      name: `${text}商品${pageSize * pageNo + i + 1}`,
      img: 'https://passport.jd.com/new/misc/skin/df/i/no-img_mid_.jpg'
    })
  }

  return {
    code: 0,
    data: {
      list
    }
  }
}