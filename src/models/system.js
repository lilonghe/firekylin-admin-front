import { login, fetchSystemSummary } from '../services/services';
export default {
  namespace: 'system',
  state: {
    summary: null,
    options: null
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetchSummary({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetchSystemSummary);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            summary: data
          }
        })
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
