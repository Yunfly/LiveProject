import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

// 用户信息
export async function fetchUserInfo(body) {
  return request('/api/v1/user/info', {
    method: "POST",
    body,
  });
}

// 用户登录
export async function userLogin(body) {
  return request('/api/v1/user/login', {
    method: "POST",
    body,
    headers: { 'X-Show-Notification': false }, //配置此项可绕开接口提示弹窗
  });
}

// 信息修改
export async function userInfoModify(body) {
  return request('/api/v1/user/modify', {
    method: "POST",
    body,
  });
}

// 刷新 Token
export async function dispatchRefresh_token(body) {
  return request('/api/v1/user/refresh_token', {
    method: "POST",
    body,
  });
}

// 用户注册
export async function userSignup(body) {
  return request('/api/v1/user/signup', {
    method: "POST",
    body,
  });
}

// 实名认证
export async function userVerify(body) {
  return request('/api/v1/user/verify', {
    method: "POST",
    body,
  });
}

// 发送短信验证码
export async function fetchSmsCode(body) {
  return request('/api/v1/system/smscode', {
    method: "POST",
    body,
  });
}

// 上传文件
export async function dispatchFsUpload(body) {
  return request('/api/v1/system/upload', {
    method: "POST",
    body,
  });
}