Component({
  data: {
    style: 'margin: 10px 0;',
    message: 'wot design'
  },
  methods: {
    click (e, x = 3) {
      /* eslint-disable */
      const envs = {
        // @if NODE_ENV = 'development'
        env: '开发测试环境',
        // @endif
        // @if NODE_ENV = 'production'
        env: '正式环境',
        // @endif
        // @if NODE_ENV = 'uat'
        env: '客户验收测试环境'
        // @endif
      }
      const plats = {
        // @if PLATFORM='jd'
        plat: 'jd',
        // @endif
        // @if PLATFORM='wx'
        plat: 'wx'
        // @endif
      }
      /* eslint-disable */
      console.log(envs, plats)
      jd.test = 1
      let input = [1, 2, 3, 4, 5]
      input = input.map(item => item + x)
      console.log('babel转换', input)
    }
  }
})