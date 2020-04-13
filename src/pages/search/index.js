const request = require('../../utils/request')

Page({
  data: {
    searchText: '',
    productionType: '0',
    productionMsgType: 'a',
    productionTypeOption: [
      { text: '全部订单', value: '0' },
      { text: '已完成', value: '1' },
      { text: '已取消', value: '2' }
    ],
    productionMsgTypeOption: [
      { text: '综合', value: 'a' },
      { text: '下单时间', value: 'b' },
      { text: '申请日期', value: 'c' }
    ],
    list: [],
    pageNo: 0,
    pageSize: 15,
    loadmoreState: 'loading'
  },
  inputSearch ({ detail }) {
    this.setData({
      searchText: detail
    })
    this.search(true)
  },
  search (reset) {
    reset && this.setData({
      pageNo: 0
    })
    const { searchText, productionType, productionMsgType, pageNo, pageSize, list } = this.data
    const self = this
    request({
      url: '/api/search.action',
      data: {
        text: searchText,
        productionType,
        productionMsgType,
        pageNo,
        pageSize
      },
      success (data) {
        data = data.data
        if (data.code === 0) {
          self.setData({
            list: reset ? data.data.list : list.concat(data.data.list),
            pageNo: pageNo + 1,
            loadmoreState: data.data.list.length < pageSize ? 'finished' : 'loading'
          })
        } else {
          self.setData({
            loadmoreState: 'error'
          })
        }
      },
      error () {
        self.setData({
          loadmoreState: 'error'
        })
      }
    })
  },
  chooseProductionType ({ detail }) {
    this.setData({
      productionType: detail
    })
    this.search(true)
  },
  chooseProductionMsgType ({ detail }) {
    this.setData({
      productionMsgType: detail
    })
    this.search(true)
  },
  onReachBottom () {
    if (this.data.loadmoreState === 'loading') {
      this.search()
    }
  },
  gotoItem ({ target }) {
    jd.navigateTo({
      url: `/pages/item/index?id=${target.dataset.id}`
    })
  },
  onLoad (query) {
    this.setData({
      searchText: query.value || ''
    })
    this.search()
  }
})