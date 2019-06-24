import { ActionTypes } from '@/store/actions';
import { fetchArtifactNames  } from '@/services/ArtifactService';

// mutation types
const FETCH_ARTIFACTS_LIST = 'FETCH_ARTIFACTS_LIST';
const SET_ARTIFACTS_LIST = 'SET_ARTIFACTS_LIST';

// initial state
const initialState = {
  isLoadingArtifactsList: false,
  artifactNames: [],
};

// getters
const getters = {};

// actions
const actions = {
  async [ActionTypes.FetchArtifacts]({ commit, dispatch }) {
    commit(FETCH_ARTIFACTS_LIST);
    const { data, errors } = await fetchArtifactNames();
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_ARTIFACTS_LIST, data);
  },
};

// mutations
const mutations = {
  [FETCH_ARTIFACTS_LIST](state) {
    state.isLoadingArtifactsList = true;
  },
  [SET_ARTIFACTS_LIST](state, list = []) {
    state.artifactNames = list;
    state.isLoadingArtifactsList = false;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
