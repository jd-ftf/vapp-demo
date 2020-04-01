import VueComponent from '../common/component'
/**
 * 注意点：
 * 1. 需要控制的位置： 12个
 * 2. 每一个位置改变都需要控制：
 * popLeft(弹出坐标x)/ popTop(弹出坐标Y)/ arrowStyle(三角形位置以及尖角朝向)
 * 尖角朝向class控制，弹出框用js控制
 */
VueComponent({
  externalClasses: [
    'custom-arrow',
    'custom-pop'
  ],
  data: {
    popStyle: '',
    arrowClass: 'wd-tooltip__arrow',
    lineColor: 'rgba(255, 255, 255, .5)'
  },
  props: {
    effect: {
      type: String,
      value: 'dark',
      observer (newVal) {
        if (newVal !== 'light' && newVal !== 'dark') {
          this.setData({ effect: 'dark' })
          console.warn('must \'dark\' or \'light\'')
        }
        this.setData({
          lineColor: newVal === 'dark' ? 'rgba(255, 255, 255, .5)' : '#ebeef5'
        })
      }
    },
    visibleArrow: {
      type: Boolean,
      value: true
    },
    // 显示内容 String || Array
    content: {
      type: null,
      observer (newVal) {
        const { mode } = this.data
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newVal === null || newVal === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // 手风琴状态下 value 类型只能为 string
        if (mode === 'normal' && typeof newVal !== 'string') {
          throw Error('The value type must be a string type in normal mode')
        } else if (mode === 'menu' && this.checkType(newVal) !== 'Array') {
          throw Error('The value type must be a Array type in menu mode')
        }
      }
    },
    placement: {
      type: String,
      value: 'bottom'
    },
    useContentSlot: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      observer (newValue) {
        newValue && this.control()
        this.$emit(`${newValue === true ? 'show' : 'hide'}`)
      }
    },
    // menu || normal
    mode: {
      type: String,
      value: 'normal'
    }
  },
  mounted () {
    this.setData({
      lineColor: this.data.effect === 'dark' ? 'rgba(255, 255, 255, .5)' : '#ebeef5'
    })
    this.getRect('.wd-tooltip__target').then(rect => {
      if (!rect) return
      this.left = rect.left
      this.bottom = rect.bottom
      this.width = rect.width
      this.height = rect.height
      this.top = rect.top
    })
  },
  methods: {
    toggle (event) {
      if (this.data.disabled) return
      const { show } = this.data
      this.setData({ show: !show })
    },
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    control () {
      const { placement, visibleArrow } = this.data
      const contentWidth = 10
      // 上下位（纵轴）对应的距离左边的距离
      const verticalX = this.width / 2
      // 上下位（纵轴）对应的距离底部的距离
      const verticalY = contentWidth + this.height
      // 左右位（横轴）对应的距离左边的距离
      const horizontalX = this.width + contentWidth
      // 左右位（横轴）对应的距离底部的距离
      const horizontalY = this.height / 2

      const placements = new Map([
        // 上
        ['top', `left: ${verticalX}px; bottom: ${verticalY}px; transform: translateX(-50%);`],
        ['top-start', `left:${0}; bottom: ${verticalY}px;`],
        ['top-end', `right: ${0}; bottom: ${verticalY}px;`],
        // 下
        ['bottom', `left: ${verticalX}px; top: ${verticalY}px; transform: translateX(-50%);`],
        ['bottom-start', `left:${0}; top: ${verticalY}px;`],
        ['bottom-end', `right: ${0}; top: ${verticalY}px;`],
        // 左
        ['left', `right: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`],
        ['left-start', `right: ${horizontalX}px; top: ${0};`],
        ['left-end', `right: ${horizontalX}px; bottom: ${3}px;`],
        // 右
        ['right', `left: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`],
        ['right-start', `left: ${horizontalX}px; top: ${0};`],
        ['right-end', `left: ${horizontalX}px; bottom: ${3}px;`]
      ])

      this.setData({
        popStyle: placements.get(placement),
        arrowClass: visibleArrow && `wd-tooltip__arrow-${placement}`
      })
    },
    menuClick (event) {
      this.setData({ show: false })
      this.$emit('menu-click', event.currentTarget.dataset)
    }
  }
})