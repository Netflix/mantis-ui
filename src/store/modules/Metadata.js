import { ActionTypes } from '@/store/actions';
import { fetchMasterConfigs } from '@/services/MasterService';
import { setMantisMasters, setMesosUrl } from '@/utils/local-storage';

// mutation types
const SET_MANTIS_MASTERS = 'SET_MANTIS_MASTERS';
const ADD_GLOBAL_ERRORS = 'ADD_GLOBAL_ERROR';
const SET_MESOS_URL = 'SET_MESOS_URL';
const SET_MANTIS_MASTER_CONFIGS = 'SET_MANTIS_MASTER_CONFIGS';

// initial state
const initialState = {
  mantisMasters: [],
  globalErrors: [],
  mesosUrl: '',
  masterConfigs: [],
};

// getters
const getters = {};

// actions
const actions = {
  [ActionTypes.SetMantisMasters]({ commit }, mantisMasters = []) {
    setMantisMasters(mantisMasters);
    commit(SET_MANTIS_MASTERS, mantisMasters);
  },
  [ActionTypes.SetMesosUrl]({ commit }, mesosUrl) {
    setMesosUrl(mesosUrl);
    commit(SET_MESOS_URL, mesosUrl);
  },
  [ActionTypes.AddGlobalErrors]({ commit }, errors = []) {
    commit(ADD_GLOBAL_ERRORS, errors);
  },
  async [ActionTypes.FetchMasterConfigs]({ commit, dispatch }) {
    const { data = {}, errors } = await fetchMasterConfigs();
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_MANTIS_MASTER_CONFIGS, data);
  },
};

// mutations
const mutations = {
  [SET_MANTIS_MASTERS](state, mantisMasters) {
    state.mantisMasters = mantisMasters;
  },
  [ADD_GLOBAL_ERRORS](state, errors) {
    state.globalErrors = [...state.globalErrors, ...errors];
  },
  [SET_MESOS_URL](state, mesosUrl) {
    state.mesosUrl = mesosUrl;
  },
  [SET_MANTIS_MASTER_CONFIGS](state, list) {
    state.masterConfigs = list;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
