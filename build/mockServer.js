const express = require('express')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const app = express()

app.get('/mock/img/:name', (req, res) => {
  let fileName = req.params.name

  var options = {
    root: path.join(__dirname, '../mock/img/'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile(fileName, options)
})

app.use('/*', (req, res) => {
  let paramsName = req.params[0]
  if (paramsName.includes('.')) {
    paramsName = paramsName.split('.')[0]
  }
  let mockFile = path.join(__dirname, '../mock/', paramsName)
  if (fs.existsSync(mockFile + '.js')) {
    mockFile = mockFile + '.js'
    let result = {}
    try {
      const mockJs = require(mockFile)
      result = typeof mockJs === 'function'
        ? mockJs(req.query)
        : mockJs
    } catch (e) {
      result = {
        errorFile: `/mock/${paramsName}.js`,
        errorName: e.name,
        errorMsg: e.message
      }
    }
    delete require.cache[require.resolve(mockFile)]

    res.json(result)
  } else if (fs.existsSync(mockFile + '.json')) {
    mockFile = mockFile + '.json'
    const result = JSON.parse(fs.readFileSync(mockFile))

    res.json(result)
  } else {
    res.json({
      errorFile: `/mock/${paramsName}`,
      errorName: 'Not found',
      errorMsg: 'JS file or json file not found'
    })
  }
})

app.listen(3050, () => {
  console.log(chalk.green('Mock 服务器已开启'))
})