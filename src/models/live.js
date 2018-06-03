import * as liveApi from 'services/live'

export default {
  namespace: 'live',

  state: {
    liveroomList: [],
    totalElements: 0,
    liveRoomInfo:{}
  },

  effects: {
    *fetchLiveInfo({ payload }, { call,put }) {
      const response =  yield call(liveApi.fetchLiveInfo, payload)
      if(response.success){
        yield put({
          type: 'updateState',
          payload: {
            liveRoomInfo: response.data
          }
        })
      }
    },
    *fetchLiveList({ payload }, { call, put }) {
      const response = yield call(liveApi.fetchLiveList, payload)
      if (response.success) {
        yield put({
          type: 'updateState',
          payload: {
            liveroomList: response.data.list,
            totalElements: response.data.total_record
          }
        })
      }
    }
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

  },
};
