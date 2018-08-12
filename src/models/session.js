import { login } from '../services/services';
export default {

  namespace: 'session',

  state: {
    user: null
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *login({ payload }, { call, put }) {  // eslint-disable-line
      const {err} = yield call(login, payload);
      if (!err) {
        window.location.href = '/admin/dashboard';
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
