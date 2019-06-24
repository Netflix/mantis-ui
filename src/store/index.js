import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/User';
import job from '@/store/modules/Job';
import jobs from '@/store/modules/Jobs';
import jobCluster from '@/store/modules/JobCluster';
import jobClusters from '@/store/modules/JobClusters';
import metadata from '@/store/modules/Metadata';
import artifact from '@/store/modules/Artifact';
import artifacts from '@/store/modules/Artifacts';

Vue.use(Vuex);
const isDebug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    job,
    jobs,
    jobCluster,
    jobClusters,
    metadata,
    artifact,
    artifacts,
  },
  strict: isDebug,
});
