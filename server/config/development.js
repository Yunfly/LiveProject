module.exports = {
  passport: {
    clientID: 'Y9ZCS510WFT',
    clientSecret: 'GSLIOLUn123GGnn123gEd1224dsgag',
    callbackURL: 'http://localhost:9083/auth/callback',
    authorizationURL: 'http://localhost:9081/oauth/authorize',
    tokenURL: 'http://test.yun9.com:9081/oauth/token',
    verifyURL: 'http://test.yun9.com:9081/token/verify',
    newVerifyURL: 'http://test.yun9.com:8761/api/oauth/token/verify'
  },
  proxyURL: 'http://120.79.55.87:8761',
  proxyRobotURL: 'https://oapi.dingtalk.com', // 钉钉机器人
};
