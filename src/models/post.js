import { fetchLastPost, fetchListPost } from '../services/services';
export default {
  namespace: 'post',
  state: {
    lastest: [],
    list: [],
    count: 0,
    totalPages: 0,
    pageNum: 1,
    pageSize: 0,
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
    *fetchList({ payload: { page } }, { call, put }) {  // eslint-disable-line
      const { data } = yield call(fetchListPost, { page });
      if (data) {
        yield put({
          type: 'save',
          payload: {
            list: data.data,
            count: data.count,
            totalPages: data.totalPages,
            pageSize: data.pageSize,
            pageNum: page
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
