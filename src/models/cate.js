import { fetchListCate } from '../services/services';
export default {
  namespace: 'cate',
  state: {
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetchList({ payload: { page } }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetchListCate, { page });
      if (data) {
        yield put({
          type: 'save',
          payload: {
            list: data
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
