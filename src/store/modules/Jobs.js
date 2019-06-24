import { fetchJobs } from '@/services/JobsService';
import { ActionTypes } from '@/store/actions';

// mutation types
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
const FETCH_ALL_JOBS = 'FETCH_ALL_JOBS';
const SET_JOBS_LIST = 'SET_JOBS_LIST';
const SET_TOTAL_RESOURCES = 'SET_TOTAL_RESOURCES';

// initial state
const initialState = {
  list: [],
  pageSize: 15,
  pageNumber: 1,
  isLoadingList: false,
  totalResources: {
    cpu: 0,
    memory: 0,
  },
  total: 0,
};

// getters
const getters = {};

// actions
const actions = {
  async [ActionTypes.FetchJobs](
    { commit, state, dispatch },
    { searchText, labelFilterText } = {},
  ) {
    const offset = state.pageSize * (state.pageNumber - 1);
    commit(FETCH_ALL_JOBS);
    const { data = {}, errors } = await fetchJobs(
      state.pageSize,
      offset,
      searchText,
      labelFilterText,
    );
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_JOBS_LIST, data);
    commit(SET_TOTAL_RESOURCES, data);
  },

  [ActionTypes.UpdateJobsTablePageSize]({ commit }, { size = 15 }) {
    commit(SET_PAGE_SIZE, size);
  },

  [ActionTypes.UpdateJobsTablePageNumber]({ commit }, { pageNumber = 1 }) {
    commit(SET_PAGE_NUMBER, pageNumber);
  },
};

// mutations
const mutations = {
  [FETCH_ALL_JOBS](state) {
    state.isLoadingList = true;
  },

  [SET_PAGE_SIZE](state, size) {
    state.pageSize = size;
  },

  [SET_PAGE_NUMBER](state, pageNumber) {
    state.pageNumber = pageNumber;
  },

  [SET_JOBS_LIST](state, { list = [], total = 0 }) {
    state.list = list;
    state.total = total;
    state.isLoadingList = false;
  },

  [SET_TOTAL_RESOURCES](state, { list = [] }) {
    let cpu = 0;
    let memory = 0;
    list.forEach(item => {
      cpu += item.totCPUs;
      memory = item.totMemory;
    });
    state.totalResources = {
      cpu,
      memory,
    };
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
