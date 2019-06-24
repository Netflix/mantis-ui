import {
  fetchArtifactProperties,
  uploadArtifact,
} from '@/services/ArtifactService';
import { ActionTypes } from '@/store/actions';

// mutation types
const FETCH_ARTIFACT_JSON = 'FETCH_ARTIFACT_JSON';
const SET_SELECTED_ARTIFACT = 'SET_SELECTED_ARTIFACT';
const SET_SELECTED_ARTIFACT_PROPERTIES = 'SET_SELECTED_ARTIFACT_PROPERTIES';

// initial state
const initialState = {
  selectedArtifact: null,
  isLoadingArtifactProperties: false,
  selectedArtifactPropertiesJson: null,
};

// getters
const getters = {};

// actions
const actions = {
  async [ActionTypes.FetchJobArtifact]({ commit, dispatch }, { artifactName }) {
    commit(FETCH_ARTIFACT_JSON);
    const { data, errors } = await fetchArtifactProperties(artifactName);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    commit(SET_SELECTED_ARTIFACT_PROPERTIES, data);
    commit(SET_SELECTED_ARTIFACT, { artifactName });
  },
  async [ActionTypes.UploadArtifact]({}, { file }) {
    const { data, errors } = await uploadArtifact(file);
    if (errors) {
      dispatch(ActionTypes.AddGlobalErrors, errors);
    }
    return data;
  },
};

// mutations
const mutations = {
  [FETCH_ARTIFACT_JSON](state) {
    state.isLoadingArtifactProperties = true;
  },
  [SET_SELECTED_ARTIFACT](state, { artifactName }) {
    state.selectedArtifact = artifactName;
  },
  [SET_SELECTED_ARTIFACT_PROPERTIES](state, artifactPropertiesJson) {
    state.selectedArtifactPropertiesJson = artifactPropertiesJson;
    state.isLoadingArtifactProperties = false;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
