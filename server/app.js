const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');

const passport = require('./passport');
const proxys = require('./routes/proxys');
const users = require('./routes/users');
const config = require('./config');
const history = require('connect-history-api-fallback');
const compression = require('compression');

const app = express();

// 使用gzip压缩
app.use(compression());
// 配置日志
require('./logger')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 加载配置
config(app);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('express-session')({ secret: 'Gi6zDvtS5!AC4hV13Wv@H9kl5^@ItBl0', resave: true, saveUninitialized: true }));
// 设置passport
passport(app);
// 设置路由
app.use('/api', proxys(app));
app.use('/users', users(app));


// 配合前端使用history
app.use(history());
app.use(express.static(path.join(__dirname, './public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
