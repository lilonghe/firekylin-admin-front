import { fetchSystemSummary, updateOptions } from '../services/services';
import { message } from 'antd';

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
    *updateOptions({payload}, {call, put, select}) {
      const { err } = yield call(updateOptions, payload);
      if (!err) {
        message.success('更新成功');
        const { options } = yield select(state => state.system);
        yield put({
          type: 'save',
          payload: {
            options: {...options, ...payload}
          }
        })
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
