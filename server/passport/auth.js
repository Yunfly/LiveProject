const axios = require('axios');

const authAccountUser = (params) => {
  return axios.post(params.tokenURL, {
    client_id: params.clientID,
    client_secret: params.clientSecret,
    grant_type: 'password',
    username: params.username,
    password: params.password,
    scope: 'SCOPE',
  }).then((response) => {
    return response.data;
  });
};

module.exports = (app) => {
  const passportConfig = app.getConfig().passport;

  return {
    authAccountUser: (params) => {
      if (params.username && params.password) {
        return authAccountUser({
          ...passportConfig,
          username: params.username,
          password: params.password,
        });
      } else {
        return Promise.reject(new Error('用户名和密码是必需要的参数'));
      }
    },
  };
};
