<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/jobs' }">Jobs</el-breadcrumb-item>
        <el-breadcrumb-item>Job Detail</el-breadcrumb-item>
      </el-breadcrumb>
    <h2 class="primary-text">
      <span>{{ jobId }}</span>
    </h2>
    <el-row class="text-right">
      <el-button
        type="danger"
        size="mini"
        :class="$style['kill-job-button']"
        icon="el-icon-delete-solid"
        @click="killJob(jobId)"
      >Kill Job</el-button>
    </el-row>
    <el-row v-loading="isLoading" type="flex" :gutter="gutter" :class="$style.panel">
      <el-col>
        <JobSummaryCard v-if="selectedJob" :job="selectedJob"/>
        <JobClusterCard
          v-if="selectedJobCluster"
          class="top-spacing"
          :job-cluster="selectedJobCluster"
        />
      </el-col>
      <el-col>
        <JobStatusOutputCard
          v-if="selectedJob"
          :job="selectedJob"
          :job-status-events="jobStatusEvents"
        />
      </el-col>
    </el-row>
    <div v-if="selectedJob">
      <el-row
        v-for="stage in selectedJob.stageMetadataList"
        :key="stage.stageNum"
        type="flex"
        :gutter="gutter"
        :class="$style.panel"
      >
        <el-col>
          <JobStageDetailCard
            :mesos-base-url="mesosBaseUrl"
            :stage-metadata="stage"
            :worker-metadata-list="selectedJob.workerMetadataList"
            :archived-worker-list="archivedWorkerList"
            @on-resubmit-worker="resubmitWorker"
            @on-scale-stage="scaleStage"
          />
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" :gutter="gutter" :class="$style.panel">
      <el-col>
        <JobOutputCard
          :job-id="jobId"
          :job-output-events="jobOutputEvents"
          :current-job-output-message-pretty-printed="currentJobOutputMessagePrettyPrinted"
          :has-job-output-started="hasJobOutputStarted"
          :rps="rps"
          @on-start-job-output="startJobOutput"
          @on-stop-job-output="stopJobOutput"
          @on-clear-job-output="clearJobOutput"
          @on-click-output-message="updateCurrentJobOutputMessagePreview"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from 'element-ui';
import store from '@/store';
import { mapActions, mapState } from 'vuex';
import { ActionTypes } from '@/store/actions';
import JobSummaryCard from '@/components/JobSummaryCard.vue';
import JobStatusOutputCard from '@/components/JobStatusOutputCard.vue';
import JobClusterCard from '@/components/JobClusterCard.vue';
import JobStageDetailCard from '@/components/JobStageDetailCard.vue';
import JobOutputCard from '@/components/JobOutputCard.vue';
import { getJobClusterIdFromJobId } from '@/utils/job';
import { clearInterval, setInterval } from 'timers';

export default {
  name: 'JobDetailPage',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    JobClusterCard,
    JobSummaryCard,
    JobStatusOutputCard,
    JobStageDetailCard,
    JobOutputCard,
  },

  data() {
    return {
      gutter: 10,
      jobId: this.$route.params.jobId,
      fetchJobDetailsInterval: null,
      pollingInterval: 10000,
    };
  },

  computed: {
    isLoading() {
      return this.isLoadingJobDetails || this.isLoadingJobClusterDetails;
    },
    ...mapState({
      isLoadingJobDetails: state => state.job.isLoadingJobDetails,
      selectedJob: state => state.job.selectedJob,
      archivedWorkerList: state => state.job.archivedWorkers,
      isLoadingJobClusterDetails: state =>
        state.jobCluster.isLoadingJobClusterDetails,
      selectedJobCluster: state => state.jobCluster.selectedJobCluster,
      jobOutputEvents: state => state.job.jobOutputEvents,
      currentJobOutputMessagePrettyPrinted: state =>
        state.job.currentJobOutputMessagePrettyPrinted,
      hasJobOutputStarted: state => state.job.hasJobOutputStarted,
      rps: state => state.job.rps,
      jobStatusEvents: state => state.job.jobStatusEvents,
      mesosBaseUrl: state => state.metadata.mesosUrl,
    }),
  },

  created() {
    store.dispatch(ActionTypes.FetchJobDetails, {
      jobId: this.jobId,
    });
    this.fetchJobDetailsInterval = setInterval(() => {
      store.dispatch(ActionTypes.FetchJobDetails, {
        jobId: this.jobId,
      });
    }, this.pollingInterval);

    store.dispatch(ActionTypes.FetchArchivedWorkersForJob, {
      jobId: this.jobId,
    });

    const clusterId = getJobClusterIdFromJobId(this.jobId);
    store.dispatch(ActionTypes.FetchJobClusterDetails, {
      clusterId,
    });

    store.dispatch(ActionTypes.StreamJobStatus, {
      jobId: this.jobId,
    });
  },

  beforeDestroy: function() {
    store.dispatch(ActionTypes.ResetJobDetails);
    clearInterval(this.fetchJobDetailsInterval);
  },

  methods: {
    async killJob(jobId) {
      this.$confirm(`This will kill the job ${jobId}. Continue?`, 'Kill Job', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(async () => {
        const { errors } = await store.dispatch(ActionTypes.KillJobs, {
          jobIds: [jobId],
        });
        if (!errors) {
          const clusterId = getJobClusterIdFromJobId(jobId);
          this.$router.push({ path: `/clusters/${clusterId}` }, () => {
            this.$message.success(`Kill job ${jobId} completed`);
          });
        }
      });
    },
    async scaleStage({ jobId, stageNumber, numWorkers }) {
      const response = await store.dispatch(ActionTypes.ScaleJobStage, {
        jobId,
        stageNumber,
        numWorkers,
      });

      if (!response.errors) {
        store.dispatch(ActionTypes.FetchJobDetails, {
          jobId,
        });
        this.$message.success(
          `Scaling stage ${stageNumber} for job ${jobId} to ${numWorkers} workers completed`,
        );
      } else {
        const error = response.errors[0];
        this.$message.error(
          `Scaling stage ${stageNumber} for job ${jobId} to ${numWorkers} workers failed due to: ${
            error.message
          }`,
        );
      }
    },
    resubmitWorker({ jobId, workerNumber }) {
      this.$confirm(
        `This will resubmit worker number ${workerNumber}. Continue?`,
        'Resubmit Worker',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          const response = await store.dispatch(ActionTypes.ResubmitWorker, {
            jobId,
            workerNumber,
          });

          if (!response.errors) {
            this.$message.success(
              `Resubmit worker ${workerNumber} for job ${jobId} completed`,
            );
          } else {
            const error = response.errors[0];
            this.$message.error(
              `Resubmit worker ${workerNumber} for job ${jobId} failed due to: ${
                error.message
              }`,
            );
          }
        })
        .catch(() => {
          this.$message.info(`Resubmit worker ${workerNumber} for job ${jobId} cancelled`);
        });
    },
    ...mapActions({
      startJobOutput: ActionTypes.StreamJobOutput,
      stopJobOutput: ActionTypes.StopJobOutputStream,
      clearJobOutput: ActionTypes.ClearJobOutput,
      updateCurrentJobOutputMessagePreview:
        ActionTypes.UpdateCurrentJobOutputMessagePreview,
    }),
  },
};
</script>

<style lang="scss" module>
.panel {
  margin: 1em;
}
.kill-job-button {
  float: right;
}
</style>
