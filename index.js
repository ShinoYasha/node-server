var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')


var routes = {
  '/weather': function(req, res) {
    var pathObj = url.parse(req.url, true)
    var ret
    if(pathObj.query.city == 'shanghai'){
      ret = {
        city: '上海',
        weather: '晴天'
      }
    }else {
      ret = {
        city: pathObj.query.city,
        weather: '未知'
      }
    }
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); 
    res.end(JSON.stringify(ret))
  },
  '/hello/world': function(req, res) {
    res.end('hello/world')
  },
  '/goodbye': function(req, res) {
    res.end('goodbye')
  }
}

function staticRoute(staticPath, req, res) {
  var objPath = url.parse(req.url, true)// 将url解析，/index？t= 解析成/index
  console.log(objPath)
  if(objPath.pathname === '/'){
    objPath.pathname += 'test.html'//如果url为空直接跳转首页index.html
  }
  var filePath = path.join(staticPath, objPath.pathname)
  fs.readFile(filePath, 'binary', function(err, fileContent) {
    if(err){
      res.writeHead(404, 'not 111found')
      res.end('<h1>Not Found</h1>')
    }else{
      console.log(1234567)
      res.writeHead(200, 'ok')
      res.write(fileContent, 'binary')
      res.end()
    }
  })
}
function routePath(req, res){
  var pathObj = url.parse(req.url, true)
  console.log(pathObj.pathname)
  var rou = routes[pathObj.pathname] // 在路由中搜对应的url
  if(rou) {
      rou(req, res)
      console.log(1234567)
  }else {
    staticRoute(path.resolve(__dirname, 'sample'), req, res)
  }
}

function parseBody(body){
  console.log(body)
  var obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}

var server = http.createServer(function (req, res) {
  routePath(req, res)
})



server.listen(9000)
