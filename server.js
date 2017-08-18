var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
var server = require('http').createServer(app);
//指定静态文件的位置
app.use('/', express.static(__dirname + '/public')); 


//监听端口号
var serverPort = process.env.PORT || 8888;

server.listen(serverPort);


var options = {
        target: 'https://workbench.developerforce.com', // 目标主机
        changeOrigin: true,               // 需要虚拟主机站点
    };
var exampleProxy = proxy(options);  //开启代理功能，并加载配置
app.use('/', exampleProxy);//对地址为’/‘的请求全部转发


//app.use(express.static(path.join(__dirname, 'public')));





//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
