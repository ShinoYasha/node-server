# node-server
## 用node实现了静态服务器
首先定义了几个路由放在routes中，为/weather,/hello/world,/goodye。
而在静态文件sample文件夹中放了一个test.html
程序执行createServer()方法，调用routePath()
routePath()方法首先对路由进行处理，然后在对应的routes中搜寻有没有设置好的路由，如果存在，则在调用相应的方法，实现动态路由访问。
如果不在routes中，则方法交给staticRoute()处理，如果是无后缀域名则自动跳转至/test.html下，而有域名则将域名与绝对路径拼接，拼接后寻找静态文件，找到静态文件则输出静态文件，未找到则输出error页面。