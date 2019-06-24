import {
  fetchJobArchivedWorkers,
  fetchJobDetails,
  killJobs,
  quickSubmitJob,
  resubmitWorker,
  scaleJobStage,
  streamJobOutput,
  streamJobStatus,
} from '@/services/JobsService';
import { ActionTypes } from '@/store/actions';

// mutation types
const FETCH_JOB_DETAILS = 'FETCH_JOB_DETAILS';
const FETCH_ARCHIVED_WORKERS_FOR_JOB = 'FETCH_ARCHIVED_WORKERS_FOR_JOB';
const FETCH_JOB_OUTPUT_EVENTS = 'FETCH_JOB_OUTPUT_EVENTS';
const FETCH_JOB_STATUS_EVENTS = 'FETCH_JOB_STATUS_EVENTS';
const SET_SELECTED_JOB = 'SET_SELECTED_JOB';
const SET_ARCHIVED_WORKERS_FOR_JOB = 'SET_ARCHIVED_WORKERS_FOR_JOB';
const SET_JOB_STATUS_EVENTS = 'SET_JOB_STATUS_EVENTS';
const SET_JOB_STATUS_SSE = 'SET_JOB_STATUS_SSE';
const SET_JOB_OUTPUT_EVENTS = 'SET_JOB_OUTPUT_EVENTS';
const SET_JOB_OUTPUT_ITEM_PRETTY_PRINTED = 'SET_JOB_OUTPUT_ITEM_PRETTY_PRINTED';
const SET_JOB_OUTPUT_SSE = 'SET_JOB_OUTPUT_SSE';
const CLEAR_JOB_OUTPUT_EVENTS = 'CLEAR_JOB_OUTPUT_EVENTS';
const STOP_JOB_OUTPUT_SSE = 'STOP_JOB_OUTPUT_SSE';
const UPDATE_RPS = 'UPDATE_RPS';
const RESET_JOB_DETAILS = 'RESET_JOB_DETAILS';

// initial state
const initialState = {
  selectedJob: null,
  archivedWorkers: [],
  isLoadingJobDetails: false,
  isFetchingArchivedWorkers: false,
  jobStatusEvents: [],
  jobOutputEvents: [],
  hasJobStatusStarted: false,
  hasJobOutputStarted: false,
  currentJobOutputMessagePrettyPrinted: '',
  rpsPrettyPrintThreshold: 50,
  jobOutputSse: null,
  jobStatusSse: null,
  maxJobOutputLength: 200,
  rps: 0,
};

// getters
const getters = {};

// actions
const actions = {
  async [ActionTypes.FetchJobDetails]({ commit, dispatch }, { jobId }) {
    commit(FETCH_JOB_DETAILS);
    const { data, errors } = await fetchJobDetails(jobId);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_SELECTED_JOB, data);
  },

  async [ActionTypes.FetchArchivedWorkersForJob](
    { commit, dispatch },
    { jobId },
  ) {
    commit(FETCH_ARCHIVED_WORKERS_FOR_JOB);
    const { data = {}, errors } = await fetchJobArchivedWorkers(jobId);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_ARCHIVED_WORKERS_FOR_JOB, data);
  },

  async [ActionTypes.ResubmitWorker]({ rootState }, { jobId, workerNumber }) {
    const userEmail = rootState.user.email;
    return resubmitWorker(jobId, workerNumber, userEmail);
  },

  async [ActionTypes.ScaleJobStage]({ rootState }, { jobId, stageNumber, numWorkers }) {
    const userEmail = rootState.user.email;
    return scaleJobStage(jobId, stageNumber, numWorkers, userEmail);
  },

  async [ActionTypes.KillJobs]({ dispatch, rootState }, { jobIds = [] }) {
    const userEmail = rootState.user.email;
    const { data, errors } = await killJobs(jobIds, userEmail);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },

  async [ActionTypes.QuickSubmitJob]({ dispatch }, { jobConfig }) {
    const { data, errors } = await quickSubmitJob(jobConfig);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return { data, errors };
  },

  [ActionTypes.StreamJobStatus]({ commit }, { jobId }) {
    const onOpen = () => {
      commit(FETCH_JOB_STATUS_EVENTS);
    };

    const onMessage = e => {
      let record = {};
      try {
        record = JSON.parse(e.data);
      } catch (e) {
        console.debug(`StreamJobStatus: Unable to parse record ${e} as json`);
      }
      const item = {
        timestamp: record ? record.status.timestamp : new Date().getTime(),
        message: record ? record.status.message : '',
        stageNum: record ? record.status.stageNum : 'N/A',
        state: record ? record.status.state : 'N/A',
      };
      commit(SET_JOB_STATUS_EVENTS, { item });
    };

    const sse = streamJobStatus(jobId, onOpen, onMessage);
    commit(SET_JOB_STATUS_SSE, { sse });
  },

  [ActionTypes.StreamJobOutput]({ commit }, { jobOutputUrl }) {
    const onOpen = () => {
      commit(FETCH_JOB_OUTPUT_EVENTS);
    };

    const onMessage = e => {
      const item = {
        timestamp: new Date().getTime(),
        message: e.data,
      };
      commit(SET_JOB_OUTPUT_EVENTS, { item });
      commit(UPDATE_RPS);
      commit(SET_JOB_OUTPUT_ITEM_PRETTY_PRINTED, { item });
    };
    const sse = streamJobOutput(jobOutputUrl, onOpen, onMessage);
    commit(SET_JOB_OUTPUT_SSE, { sse });
  },

  [ActionTypes.ClearJobOutput]({ commit }) {
    commit(CLEAR_JOB_OUTPUT_EVENTS);
  },

  [ActionTypes.StopJobOutputStream]({ commit }) {
    commit(STOP_JOB_OUTPUT_SSE);
  },

  [ActionTypes.ResetJobDetails]({ commit }) {
    commit(STOP_JOB_OUTPUT_SSE);
    commit(RESET_JOB_DETAILS);
  },

  [ActionTypes.UpdateCurrentJobOutputMessagePreview]({ commit }, { item }) {
    commit(SET_JOB_OUTPUT_ITEM_PRETTY_PRINTED, { item });
  },
};

// mutations
const mutations = {
  [FETCH_JOB_DETAILS](state) {
    state.isLoadingJobDetails = true;
  },

  [FETCH_ARCHIVED_WORKERS_FOR_JOB](state) {
    state.isFetchingArchivedWorkers = true;
  },

  [SET_SELECTED_JOB](state, job) {
    state.selectedJob = job;
    state.isLoadingJobDetails = false;
  },

  [SET_ARCHIVED_WORKERS_FOR_JOB](state, { list = [] }) {
    state.archivedWorkers = list;
    state.isFetchingArchivedWorkers = false;
  },

  [FETCH_JOB_STATUS_EVENTS](state) {
    state.hasJobStatusStarted = true;
  },

  [SET_JOB_STATUS_EVENTS](state, { item }) {
    state.jobStatusEvents = [item, ...state.jobStatusEvents];
  },

  [SET_JOB_STATUS_SSE](state, { sse }) {
    state.jobStatusSse = sse;
  },

  [FETCH_JOB_OUTPUT_EVENTS](state) {
    state.hasJobOutputStarted = true;
  },

  [SET_JOB_OUTPUT_EVENTS](state, { item }) {
    const events = state.jobOutputEvents;
    const tail = ([, ...xs]) => xs;

    if (events.length > state.maxJobOutputLength) {
      state.jobOutputEvents = [item, ...tail(events)];
    } else {
      state.jobOutputEvents = [item, ...state.jobOutputEvents];
    }
  },

  [SET_JOB_OUTPUT_ITEM_PRETTY_PRINTED](state, { item }) {
    if (state.rps !== 'Infinity' && state.rps >= state.rpsPrettyPrintThreshold) {
      return;
    }

    try {
      const obj = JSON.parse(item.message);
      state.currentJobOutputMessagePrettyPrinted = JSON.stringify(obj, undefined, 2);
    } catch (e) {
      console.debug(`Error: Unable to pretty print job output message due to ${e}`);
      state.currentJobOutputMessagePrettyPrinted = 'Unable to pretty print job output message.'
    }
  },

  [UPDATE_RPS](state) {
    const events = state.jobOutputEvents;
    const diff = Math.abs(events[0].timestamp - events[events.length - 1].timestamp);
    const rps = (events.length / (diff / 1000)).toFixed(2);
    state.rps = new Number(rps);
  },

  [SET_JOB_OUTPUT_SSE](state, { sse }) {
    state.jobOutputSse = sse;
  },

  [CLEAR_JOB_OUTPUT_EVENTS](state) {
    state.jobOutputEvents = [];
  },

  [STOP_JOB_OUTPUT_SSE](state) {
    const sse = state.jobOutputSse;
    if (sse) {
      sse.close();
    }
    state.rps = 0;
    state.jobOutputSse = null;
    state.hasJobOutputStarted = false;
  },

  [RESET_JOB_DETAILS](state) {
    state.jobStatusSse = null;
    state.selectedJob = null;
    state.archivedWorkers = [];
    state.jobStatusEvents = [];
    state.jobOutputEvents = [];
    state.currentJobOutputMessagePrettyPrinted = '';
    state.rps = 0;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
