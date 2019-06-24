import {
  createJobCluster,
  deleteJobCluster,
  disableJobCluster,
  enableJobCluster,
  fetchJobClusterDetails,
  fetchJobsForCluster,
  submitJobForCluster,
  updateJobClusterQuickArtifact,
  updateJobClusterQuickLabel,
  updateJobClusterQuickMigrationStrategy,
  updateJobClusterQuickSla,
  updateJobClusterStandard,
} from '@/services/JobClustersService';
import { ActionTypes } from '@/store/actions';

// mutation types
const FETCH_JOB_CLUSTER_DETAILS = 'FETCH_JOB_CLUSTER_DETAILS';
const SET_SELECTED_JOB_CLUSTER = 'SET_SELECTED_JOB_CLUSTER';
const FETCH_JOB_CLUSTER_JOBS = 'FETCH_JOB_CLUSTER_JOBS';
const SET_JOBS_FOR_SELECTED_JOB_CLUSTER = 'SET_JOBS_FOR_SELECTED_JOB_CLUSTER';

// initial state
const initialState = {
  selectedJobCluster: null,
  jobsForSelectedJobCluster: [],
  isLoadingJobClusterDetails: false,
  isLoadingJobClusterJobs: false,
};

// getters
const getters = {};

// actions
const actions = {
  async [ActionTypes.CreateJobCluster]({ dispatch }, { jobCluster }) {
    const { data, errors } = await createJobCluster(jobCluster);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
  async [ActionTypes.UpdateJobClusterStandard]({ dispatch }, { clusterId, jobCluster }) {
    const { data, errors } = await updateJobClusterStandard(clusterId, jobCluster);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
  async [ActionTypes.UpdateJobClusterQuickArtifact]({ rootState, dispatch }, { clusterId, artifactConfig }) {
    const userEmail = rootState.user.email;
    const { data, errors } = await updateJobClusterQuickArtifact(clusterId, artifactConfig, userEmail);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
  async [ActionTypes.UpdateJobClusterQuickSla]({ rootState, dispatch }, { clusterId, slaConfig }) {
    const userEmail = rootState.user.email;
    const { data, errors } = await updateJobClusterQuickSla(clusterId, slaConfig, userEmail);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
  async [ActionTypes.UpdateJobClusterQuickMigrationStrategy]({ rootState, dispatch }, { clusterId, migrationConfig }) {
    const userEmail = rootState.user.email;
    const { data, errors } = await updateJobClusterQuickMigrationStrategy(clusterId, migrationConfig, userEmail);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
  async [ActionTypes.UpdateJobClusterQuickLabel]({ rootState, dispatch }, { clusterId, labels }) {
    const userEmail = rootState.user.email;
    const { data, errors } = await updateJobClusterQuickLabel(clusterId, labels, userEmail);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
  async [ActionTypes.FetchJobClusterDetails](
    { commit, dispatch },
    { clusterId },
  ) {
    commit(FETCH_JOB_CLUSTER_DETAILS);
    const { data, errors } = await fetchJobClusterDetails(clusterId);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_SELECTED_JOB_CLUSTER, data);
  },
  async [ActionTypes.FetchJobClusterJobs]({ commit, dispatch }, { clusterId }) {
    commit(FETCH_JOB_CLUSTER_JOBS);
    const { data, errors } = await fetchJobsForCluster(clusterId);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_JOBS_FOR_SELECTED_JOB_CLUSTER, data);
  },
  async [ActionTypes.EnableJobCluster]({ rootState }, { clusterId }) {
    const userEmail = rootState.user.email;
    return enableJobCluster(clusterId, userEmail);
  },
  async [ActionTypes.DisableJobCluster]({ rootState }, { clusterId }) {
    const userEmail = rootState.user.email;
    return disableJobCluster(clusterId, userEmail);
  },
  async [ActionTypes.DeleteJobCluster]({ rootState }, { clusterId }) {
    const userEmail = rootState.user.email;
    return deleteJobCluster(clusterId, userEmail);
  },
  async [ActionTypes.SubmitJobForCluster]({ dispatch }, { clusterId, jobConfig }) {
    const { data, errors } = await submitJobForCluster(clusterId, jobConfig);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },
};

// mutations
const mutations = {
  [FETCH_JOB_CLUSTER_DETAILS](state) {
    state.isLoadingJobClusterDetails = true;
  },

  [FETCH_JOB_CLUSTER_JOBS](state) {
    state.isLoadingJobClusterJobs = true;
  },

  [SET_SELECTED_JOB_CLUSTER](state, jobCluster) {
    state.selectedJobCluster = jobCluster;
    state.isLoadingJobClusterDetails = false;
  },

  [SET_JOBS_FOR_SELECTED_JOB_CLUSTER](state, { list }) {
    state.jobsForSelectedJobCluster = list;
    state.isLoadingJobClusterJobs = false;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
