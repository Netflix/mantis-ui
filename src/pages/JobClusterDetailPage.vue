<template>
  <div v-loading="isLoading">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clusters' }">Clusters</el-breadcrumb-item>
      <el-breadcrumb-item>Cluster Detail</el-breadcrumb-item>
    </el-breadcrumb>
    <h2 class="primary-text">{{ clusterId }}</h2>
    <strong>{{ activeJobs.length }}</strong>
    active {{ pluralize(activeJobs.length, 'job', 'jobs') }}
    <el-row v-if="selectedJobCluster">
      <el-col class="text-left" :span="12">
        <div>
          Latest Job Cluster version is:
          <strong>{{ selectedJobCluster.latestVersion }}</strong>
        </div>
        <div>
          Latest running Job version is:
          <strong>{{ latestActiveJobVersion }}</strong>
        </div>
      </el-col>
      <el-col class="text-right" :span="12">
        <div>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-s-tools"
            @click="submitLatestJobVersion"
          >Submit latest version {{ selectedJobCluster.latestVersion }}</el-button>
          <el-button type="primary" size="mini" @click="updateCluster">Update Cluster</el-button>
        </div>
        <div class="top-spacing-small">
          <el-button
            v-if="selectedJobCluster.disabled"
            size="mini"
            plain
            icon="el-icon-open"
            type="success"
            @click="enableCluster"
          >Enable Cluster</el-button>
          <el-button
            v-else
            size="mini"
            plain
            icon="el-icon-turn-off"
            type="warning"
            @click="disableCluster"
          >Disable Cluster</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteCluster">
            Delete Cluster
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="selectedJobCluster" class="layout vertical center">
      <el-card shadow="hover" :class="$style['box-card']">
        <template slot="header">
          <div>Job Cluster Details</div>
        </template>
        <div class="text-left">
          <div class="vertical-spacing-small">
            Job Cluster is
            <span v-if="selectedJobCluster.disabled" class="danger-text">Disabled</span>
            <span v-else class="success-text">Enabled</span>
          </div>
          <div class="vertical-spacing-small">
            SLA min/max:
            <strong>{{ selectedJobCluster.sla.min }}</strong>/
            <strong>{{ selectedJobCluster.sla.max }}</strong>
          </div>
          <div v-if="selectedJobCluster.sla.cronSpec" class="vertical-spacing-small">
            Cron Spec:
            <strong>{{ selectedJobCluster.sla.cronSpec }}</strong>
          </div>
          <div v-if="selectedJobCluster.sla.cronPolicy" class="vertical-spacing-small">
            Cron Policy:
            <strong>{{ selectedJobCluster.sla.cronPolicy }}</strong>
          </div>
          <div class="vertical-spacing-small">
            <span v-for="tag in selectedJobCluster.labels" :key="tag.name" class="job-tag">
              <el-tag
                type="info"
                size="small"
                class="job-label"
                :disable-transitions="true"
                @click="onTagClick(tag)"
              >{{ tag.name }} : {{ tag.value }}</el-tag>
            </span>
          </div>
          <div class="vertical-spacing-small">
            <span class="primary-text">Owner name:</span>
            {{ selectedJobCluster.owner.name || 'N/A' }}
          </div>
          <div class="vertical-spacing-small">
            <span class="primary-text">Owner email:</span>
            {{ selectedJobCluster.owner.contactEmail || 'N/A' }}
          </div>
          <div v-if="selectedJobCluster.owner.teamName" class="vertical-spacing-small">
            <span class="primary-text">Team name:</span>
            {{ selectedJobCluster.owner.teamName }}
          </div>
          <div v-if="selectedJobCluster.owner.repo" class="vertical-spacing-small">
            <span class="primary-text">Repo:</span>
            {{ selectedJobCluster.owner.repo }}
          </div>
          <div v-if="selectedJobCluster.owner.description" class="vertical-spacing-small">
            <span class="primary-text">Description:</span>
            {{ selectedJobCluster.owner.description }}
          </div>

          <JobClusterConfigDetail
            v-if="latestJar"
            :cluster-id="clusterId"
            :job-cluster="selectedJobCluster"
            :jar="latestJar"
          />
          <div v-else>No active job cluster version</div>

          <el-button
            v-if="showPreviousVersionsMode"
            type="info"
            size="mini"
            class="vertical-spacing-small"
            @click="togglePreviousVersionMode"
          >Hide previous Job Cluster versions</el-button>
          <el-button
            v-if="!showPreviousVersionsMode && previousJars.length"
            size="mini"
            type="info"
            class="vertical-spacing-small"
            @click="togglePreviousVersionMode"
          >Show {{ previousJars.length }} previous Job Cluster versions</el-button>
          <div v-if="showPreviousVersionsMode">
            <div>
              Previous
              <strong>{{previousJars.length}}</strong> Job Cluster versions:
            </div>

            <div v-for="jar in previousJars" :key="jar.uploadedAt" class="spacing-small">
              <JobClusterConfigDetail :cluster-id="clusterId" :jar="jar"/>
            </div>
          </div>
        </div>
      </el-card>

      <JobClusterJobListCard :class="$style['box-card']" :active-jobs="activeJobs" :non-active-jobs="nonActiveJobs" @on-kill-job="killJob" />
    </el-row>
  </div>
</template>

<script>
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Row,
  Tag,
} from 'element-ui';
import formatFileNameFromPath from '@/utils/format-file-name-from-path';
import { format } from 'date-fns';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';
import store from '@/store';
import { mapState } from 'vuex';
import { ActionTypes } from '@/store/actions';
import { pluralize } from '@/utils/pluralize';
import JobClusterConfigDetail from '@/components/JobClusterConfigDetail';
import JobClusterJobListCard from '@/components/JobClusterJobListCard';

export default {
  name: 'JobClusterDetailPage',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    JobClusterConfigDetail,
    JobClusterJobListCard,
  },

  data() {
    return {
      clusterId: this.$route.params.clusterId,
      showPreviousVersionsMode: false,
    };
  },

  computed: {
    ...mapState({
      isLoading: state => {
        return (
          state.jobCluster.isLoadingJobClusterDetails ||
          state.jobCluster.isLoadingJobClusterJobs
        );
      },
      selectedJobCluster: state => state.jobCluster.selectedJobCluster,
      activeJobs: state => {
        const jobs = state.jobCluster.jobsForSelectedJobCluster;
        return jobs.filter(job => {
          const metadata = job.jobMetadata;
          return metadata.state === 'Launched' || metadata.state === 'Accepted';
        });
      },
      nonActiveJobs: state => {
        const jobs = state.jobCluster.jobsForSelectedJobCluster;
        return jobs.filter(job => {
          const metadata = job.jobMetadata;
          return metadata.state !== 'Launched' && metadata.state !== 'Accepted';
        });
      },
      latestActiveJobVersion: state => {
        const jobs = state.jobCluster.jobsForSelectedJobCluster;
        const latestJob = jobs[jobs.length - 1];
        let version = 'Unknown';
        if (latestJob && latestJob.version) {
          version = format(parseInt(latestJob.version), DETAILED_TIME_FORMAT);
        }
        return version;
      },
    }),
    latestJar() {
      const jars = this.selectedJobCluster.jars;
      if (jars && jars.length) {
        return jars[jars.length - 1];
      }
      return null;
    },
    previousJars() {
      const jars = this.selectedJobCluster.jars;
      if (jars && jars.length) {
        return jars.slice(0, -1).reverse();
      }
      return [];
    },
  },

  created() {
    this.refresh();
  },

  methods: {
    pluralize,
    formatFileNameFromPath,
    submitLatestJobVersion() {
      this.$router.push({ path: `/clusters/${this.clusterId}/submit`, query: { clusterVersion: this.selectedJobCluster.latestVersion }, });
    },
    refresh() {
      store.dispatch(ActionTypes.FetchJobClusterDetails, {
        clusterId: this.clusterId,
      });

      store.dispatch(ActionTypes.FetchJobClusterJobs, {
        clusterId: this.clusterId,
      });
    },
    enableCluster() {
      this.$confirm(
        `This will enable cluster ${this.clusterId}. Continue?`,
        'Enable Cluster',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          const response = await store.dispatch(ActionTypes.EnableJobCluster, {
            clusterId: this.clusterId,
          });

          if (!response.errors) {
            store.dispatch(ActionTypes.FetchJobClusterDetails, {
              clusterId: this.clusterId,
            });
            this.$message.success(
              `Enable cluster ${this.clusterId} completed`,
            );
          } else {
            const error = response.errors[0];
            this.$message.error(
              `Enable cluster ${this.clusterId} failed due to: ${
                error.message
              }`,
            );
          }
        })
        .catch(e => {
          this.$message.info(`Enable cluster ${this.clusterId} cancelled`);
        });
    },
    disableCluster() {
      this.$confirm(
        `This will disable cluster ${this.clusterId}. Continue?`,
        'Disable Cluster',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          const response = await store.dispatch(ActionTypes.DisableJobCluster, {
            clusterId: this.clusterId,
          });

          if (!response.errors) {
            store.dispatch(ActionTypes.FetchJobClusterDetails, {
              clusterId: this.clusterId,
            });
            this.$message.success(
              `Disable cluster ${this.clusterId} completed`,
            );
          } else {
            const error = response.errors[0];
            this.$message.error(
              `Disable cluster ${this.clusterId} failed due to: ${
                error.message
              }`,
            );
          }
        })
        .catch(e => {
          this.$message.info(`Disable cluster ${this.clusterId} cancelled`);
        });
    },
    deleteCluster() {
      if (this.activeJobs.length) {
        this.$message.error(
          'You must kill all running jobs before deleting a job cluster.',
        );
        return;
      }
      this.$confirm(
        `This will delete cluster ${this.clusterId}. Continue?`,
        'Delete Cluster',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(async () => {
          const response = await store.dispatch(ActionTypes.DeleteJobCluster, {
            clusterId: this.clusterId,
          });

          if (!response.errors) {
            this.$router.push({ path: '/clusters' }, () => {
              this.$message.success(
                `Delete cluster ${this.clusterId} completed`,
              );
            });
          } else {
            const error = response.errors[0];
            this.$message.error(
              `Delete cluster ${this.clusterId} failed due to: ${
                error.message
              }`,
            );
          }
        })
        .catch(e => {
          this.$message.info(`Delete cluster ${this.clusterId} cancelled`);
        });
    },
    updateCluster() {
      this.$router.push({ path: `/clusters/${this.clusterId}/update` });
    },
    onTagClick(tag) {
      const filter = `${tag.name}=${tag.value}`;
      this.$router.push({
        path: '/clusters',
        query: { labels: filter || undefined },
      });
    },
    togglePreviousVersionMode() {
      this.showPreviousVersionsMode = !this.showPreviousVersionsMode;
    },
    killJob({ job }) {
      const jobId = job.jobMetadata.jobId;
      this.$confirm(`This will kill the job ${jobId}. Continue?`, 'Kill Job', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(async () => {
        const { errors } = await store.dispatch(ActionTypes.KillJobs, {
          jobIds: [jobId],
        });
        if (!errors) {
          this.refresh();
          this.$message.success(`Kill job ${jobId} completed`);
        }
      }).catch(() => {
        this.$message.info(`Kill job ${jobId} cancelled`);
      });
    },
  },
};
</script>

<style lang="scss" module>
.box-card {
  margin: 1em 0;
  width: 50%;
}
</style>
