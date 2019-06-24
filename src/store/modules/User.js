import { isEmpty } from '@/utils/string';
import { ActionTypes } from '@/store/actions';
import { setUserEmail, setUserName } from '@/utils/local-storage';

// mutation types
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// initial state
const initialState = {
  name: '',
  email: '',
};

// getters
const getters = {
  loggedIn: state => {
    return !isEmpty(state.name) && !isEmpty(state.email);
  },
};

// actions
const actions = {
  [ActionTypes.LoginUser]({ commit }, { name, email }) {
    setUserName(name);
    setUserEmail(email);
    commit(LOGIN_USER, { name, email });
  },
  [ActionTypes.LogoutUser]({ commit }) {
    setUserName('');
    setUserEmail('');
    commit(LOGOUT_USER);
  },
};

// mutations
const mutations = {
  [LOGIN_USER](state, { name, email }) {
    state.name = name;
    state.email = email;
  },
  [LOGOUT_USER](state) {
    state.name = '';
    state.email = '';
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
