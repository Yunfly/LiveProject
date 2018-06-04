import axios from 'axios';
import { notification } from 'antd';
import store from '../index';

axios.interceptors.request.use(
  config => {
    const state = store.getState();
    let { token } = state.user
    token = token || sessionStorage.token
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    } else if (config.method === 'post') {
      config.data = {
        ...config.data,
        token,
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

const codeMessage = {
  100000: 'API 地址错误，找不到请求的 API',
  100001: '发生了致命错误（一般为服务器或代码问题），会存入日志供分析',
  100002: 'token 不能为空',
  100003: 'token 格式错误',
  100004: 'token 签名错误',
  100005: 'token 信息非法',
  100006: 'token 已过期',
  100007: '用户已被封禁',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    const { data: result } = response;
    if (result.code === 0) {
      result.success = true;
      return result;
    } else {
      const errortext = codeMessage[result.status] || result.msg;
      if (response.config.headers['X-Show-Notification'] !== false) {
        notification.error({
          message: `${errortext}`,
          description: result.msg,
        });
      }
      const error = new Error(errortext);
      error.name = result.status;
      error.response = response;
      throw error;
    }
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
  }

  return axios.request({
    url,
    method: options && options.method ? options.method : 'get',
    data: (options && options.body) || {},
    timeout: 15000,
    baseURL: 'http://zb-admin.runger.net',
    ...newOptions,
  })
    .then(checkStatus)
    .catch((error) => {
      const { response } = error
      if ('stack' in error && 'message' in error) {
        const { message } = error;
        if (~message.indexOf('timeout')) {
          notification.error({
            message: `请求错误: ${url}`,
            description: '很抱歉您的请求已经超时了，请稍后再试！',
          });
        }
      }
      const result = { success: false, ...response.data };
      return result;
    });
}
