import * as userApi from 'services/user'

export default {
  namespace: 'user',

  state: {
    currentUser: {},
    token:undefined,
  },

  effects: {
    *fetchUserInfo({ payload }, { call, put }) {
      const { token } = sessionStorage
      if (token === 'undefined' || !token) return
      const response = yield call(userApi.fetchUserInfo, { token })
      if (response.success) {
        yield put({
          type: "updateState",
          payload: {
            currentUser: response.data,
            token
          }
        })
      }
    },
    *userSignUp({ payload }, { call }) {
      console.log({ payload })
      const response = yield call(userApi.userSignup, payload)
      return response
    },

    *fetchSmsCode({ payload }, { call }) {
      console.log({ payload })
      yield call(userApi.fetchSmsCode, payload)
    },
    *userLogin({ payload }, { call, put }) {
      console.log({ payload })
      const response = yield call(userApi.userLogin, payload)
      if (response.success) {
        sessionStorage.token = response.data.token
        yield put({
          type: "updateState",
          payload: {
            currentUser: response.data,
            token:response.data.token
          }
        })
      }
      return response
    },
    *userInfoModify({ payload }, { call }) {
      yield call(userApi.userInfoModify, payload)
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      dispatch({
        type: "fetchUserInfo"
      })
    },
  },
};
