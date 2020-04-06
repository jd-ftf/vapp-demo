const request = require('../../utils/request')

Page({
  data: {
    swiper: [
      'https://img30.360buyimg.com/popXue/jfs/t1/33198/10/12030/268559/5ce7cc9fE1ce41ce7/8e87f20e4c0921de.jpg',
      'https://img30.360buyimg.com/popXue/jfs/t1/50345/6/1100/276789/5ceddedbE88081452/c7cbf2a916e95c89.jpg',
      'http://img30.360buyimg.com/popXue/jfs/t1/84548/16/579/175470/5cec8a91E5204c180/448fb602fab4f9e1.jpg',
      'http://img30.360buyimg.com/popXue/jfs/t1/53645/13/1208/168686/5cef2e9dEc4f71846/6650554817be5e76.jpg'
    ],
    grid: [
      {
        page: '/pages/search/index?value=1',
        icon: 'picture',
        text: '类型1'
      }, {
        page: '/pages/search/index?value=2',
        icon: 'picture',
        text: '类型2'
      }, {
        page: '/pages/search/index?value=3',
        icon: 'picture',
        text: '类型3'
      }, {
        page: '/pages/search/index?value=4',
        icon: 'picture',
        text: '类型4'
      }, {
        page: '/pages/search/index?value=5',
        icon: 'picture',
        text: '类型5'
      }, {
        page: '/pages/search/index?value=6',
        icon: 'picture',
        text: '类型6'
      }, {
        page: '/pages/search/index?value=7',
        icon: 'picture',
        text: '类型7'
      }, {
        page: '/pages/search/index?value=8',
        icon: 'picture',
        text: '类型8'
      }
    ]
  },
  onLoad () {
    request({
      url: '/api/index.action',
      success ({ data }) {
        console.log(data)
      }
    })
  }
})