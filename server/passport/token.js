const axios = require('axios');

const verifyToken = async (params) => {
  const response = await axios.post(params.newVerifyURL, {
    token: params.token
  })
  return response.data && response.data.body
};

module.exports = (app) => {
  const passportConfig = app.getConfig().passport;

  return {
    verifyToken: (params) => {
      if (!params.token) return Promise.reject(new Error('token不能为空'));
      return verifyToken({
        ...passportConfig,
        token: params.token,
      });
    },
  };
};
