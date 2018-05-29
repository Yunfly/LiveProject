/**
 * passport
 */
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const Auth = require('./auth');
const Token = require('./token');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  const auth = Auth(app);
  const token = Token(app);

  // 帐号密码登录
  passport.use('accountLogin', new LocalStategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, done) => {
    try {
      const tokenInfo = await auth.authAccountUser({ username, password });
      const user = { ...tokenInfo };
      const userInfo = await token.verifyToken({ token: user.access_token });
      user.user = userInfo.userInfo;
      done(null, user);
    } catch (e) { // eslint-disable-next-line
      done(null, false, { message: e.response && e.response.data.message || e.message });
    }
  }));

  passport.serializeUser((user, done) => {
    app.logger.debug('serializeUser');
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    app.logger.debug('deserializeUser');
    // 查询用户信息
    done(null, user);
  });
};
