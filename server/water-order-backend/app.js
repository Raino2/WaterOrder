var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');

//导入路由
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var shopRouter = require('./routes/shop');
var adminRouter = require('./routes/admin');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //当允许携带cookies此处的白名单不能写’*’
  res.header(
    'Access-Control-Allow-Headers',
    'content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'
  ); //允许的请求头
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
  // res.header('Access-Control-Allow-Credentials', true); //允许携带cookies
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//配置解析普通表单post请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

//路由使用
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/shop', shopRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
