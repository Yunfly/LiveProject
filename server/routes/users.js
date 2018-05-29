const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();
const Token = require('../passport/token')

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
module.exports = (app) => {
  const token = Token(app)
  router.get('/current', (req, res) => {
    if (!req.session.passport || !req.session.passport.user) {
      res.send({
        status: 401,
        message: '用户未登录',
      });
      return;
    }
    const { user, insts } = req.session.passport.user.user;
    res.send({
      status: 200,
      data: {
        user,
        insts,
        currentUserInst: req.session.currentUserInst || '',
      },
    });
  });

  router.post('/login', jsonParser, (req, res, next) => {
    passport.authenticate('accountLogin', (err, user, info) => {
      const data = {
        type: 'account',
      };
      if (!user || err) {
        data.success = false;
        data.message = info.message || info;
        return res.send({ status: 200, data }).end();
      }
      req.login(user, (error) => {
        if (error) {
          data.success = false;
          data.message = '登录失败';
        } else {
          data.success = true;
          data.user = user.user;
        }
        res.send({ status: 200, data }).end();
      });
    })(req, res, next);
  });

  router.get('/logout', urlencodedParser, (req, res) => {
    req.logout();
    req.session.currentUserInst = undefined
    res.send({ status: 200 }).end();
  });

  router.post('/insts', jsonParser, (req, res) => {
    try {
      const { instid } = req.body
      const { insts, userInst } = req.user.user;
      const { role } = userInst.find(x => x.inst === instid)
      req.session.currentUserInst = Object.assign(insts.find(x => x.id === instid), { role })
      res.send({ status: 200, currentAuthority: role }).end();
    } catch (e) {
      res.send({ status: 401, message: e.message }).end();
    }
  });
  router.get('/insts', (req, res) => {
    try {
      const { insts } = req.user.user;
      res.send({ status: 200, body: { insts } }).end();
    } catch (e) {
      res.send({ status: 401, message: '无法获取机构信息' }).end();
    }
  });

  router.get('/redirect', urlencodedParser, async (req, res) => {
    const { instId, token: access_token } = req.query
    try {


      //  获取用户信息，讲信息存于/覆盖 session.passport
      const data = await token.verifyToken({ token: access_token })
      req.session.passport = {
        user: {
          user: data.userInfo,
          access_token
        },
      }
      try {
        if (instId) {
          const { insts, userInst } = data.userInfo;
          const { role } = userInst.find(x => x.inst === instId)
          req.session.currentUserInst = Object.assign(insts.find(x => x.id === instId), { role })
        } else {
          req.session.currentUserInst = ''
        }
      } catch (e) {
        res.send({ status: 400, message: `instId not fount. ${req.query.instId}` }).end();
      }

      // TODO: /users/redirect?token={token}&instId={instId}
      res.redirect('/app')
    } catch (e) {
      res.redirect('/user/login')
      // res.send({ status: 400, message: `access_token not fount. ${req.query.token}` }).end();
    }
  });

  return router;
}