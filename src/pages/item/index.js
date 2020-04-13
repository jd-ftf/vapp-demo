import MessageBox from '../../wot-design/messageBox/messageBox'

Page({
  confirm () {
    MessageBox.confirm({
      msg: '通过',
      title: '提示'
    }).then(action => {
      console.log(action)
    })
  }
})