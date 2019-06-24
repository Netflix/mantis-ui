import { fetchJobClusters } from '@/services/JobClustersService';
import { ActionTypes } from '@/store/actions';

// mutation types
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
const FETCH_ALL_JOB_CLUSTERS = 'FETCH_ALL_JOBS';
const SET_JOB_CLUSTERS_LIST = 'SET_JOBS_LIST';

// initial state
const initialState = {
  list: [],
  pageSize: 15,
  pageNumber: 1,
  isLoadingList: false,
  total: 0,
};

// getters
const getters = {};

// actions
const actions = {
  async [ActionTypes.FetchJobClusters](
    { commit, state, dispatch },
    { searchText, labelFilterText } = {},
  ) {
    const offset = state.pageSize * (state.pageNumber - 1);
    commit(FETCH_ALL_JOB_CLUSTERS);
    const { data = {}, errors } = await fetchJobClusters(
      state.pageSize,
      offset,
      searchText,
      labelFilterText,
    );
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_JOB_CLUSTERS_LIST, data);
  },

  [ActionTypes.UpdateClusterTablePageSize]({ commit }, { size = 15 }) {
    commit(SET_PAGE_SIZE, size);
  },

  [ActionTypes.UpdateClusterTablePageNumber]({ commit }, { pageNumber = 1 }) {
    commit(SET_PAGE_NUMBER, pageNumber);
  },
};

// mutations
const mutations = {
  [FETCH_ALL_JOB_CLUSTERS](state) {
    state.isLoadingList = true;
  },

  [SET_PAGE_SIZE](state, size) {
    state.pageSize = size;
  },

  [SET_PAGE_NUMBER](state, pageNumber) {
    state.pageNumber = pageNumber;
  },

  [SET_JOB_CLUSTERS_LIST](state, { list = [], total = 0 }) {
    state.list = list;
    state.isLoadingList = false;
    state.total = total;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
