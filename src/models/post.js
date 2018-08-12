import { fetchLastPost } from '../services/services';
export default {
  namespace: 'post',
  state: {
    lastest: []
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetchLatest({ payload }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetchLastPost);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            lastest: data
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
