<template>
  <div :class="$style['job-cluster-config-detail-box']">
    <div
      v-if="jobCluster"
      class="primary-text"
      :class="$style['job-cluster-config-detail-box-header']"
    >
      Latest Version:
      <strong>{{ jobCluster.latestVersion }}</strong>
    </div>
    <div class="spacing-small">
      <span v-if="!jobCluster">
        Version:
        <strong>{{ jar.version }}</strong>
        <br>
      </span>
      <span>
        Artifact:
        <strong>{{ formatFileNameFromPath(jar.url) }}</strong>
        <br>
      </span>
      <span>
        Updated at:
        <strong>{{ formatDateLong(jar.uploadedAt) }}</strong>
        <br>
      </span>
    </div>

    <JobClusterStageDetail
      v-for="(stage, stageNumber) in jar.schedulingInfo.stages"
      :key="stageNumber"
      class="spacing-small"
      :stage-number="stageNumber"
      :stage="stage"
    />

    <div v-if="jobCluster">
      <div
        class="primary-text"
        :class="$style['job-cluster-config-detail-box-header']"
      >Job Cluster Migration Strategy</div>
      <div class="spacing-small">
        <span>
          Strategy:
          <strong>{{ jobCluster.migrationConfig.strategy }}</strong>
          <br>
        </span>
        <span>
          Updated at:
          <strong>{{ migrationStrategyConfigString }}</strong>
          <br>
        </span>
      </div>
    </div>

    <div v-if="jobCluster && jobCluster.parameters.length">
      <div
        v-if="jobCluster && jobCluster.parameters.length"
        class="primary-text"
        :class="$style['job-cluster-config-detail-box-header']"
      >
        Job Cluster
        <strong>{{ jar.version }}</strong> Default Parameters
      </div>
      <div class="spacing-small">
        <div
          v-for="parameter in jobCluster.parameters"
          :key="parameter.name"
          class="vertical-spacing-small"
        >
          <strong>{{ parameter.name }}</strong>
          :
          {{ parameter.value }}
        </div>
      </div>
    </div>
    <el-button
      type="success"
      class="spacing-small"
      icon="el-icon-s-tools"
      size="mini"
      @click="submitVersion(jar)"
    >Submit version {{ jar.version }}</el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui';
import formatFileNameFromPath from '@/utils/format-file-name-from-path';
import { format } from 'date-fns';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';
import JobClusterStageDetail from '@/components/JobClusterStageDetail';
export default {
  name: 'JobClusterConfigDetail',

  components: {
    [Button.name]: Button,
    JobClusterStageDetail,
  },

  props: {
    clusterId: {
      type: String,
      required: true,
    },
    jar: {
      type: Object,
      required: true,
    },
    jobCluster: {
      type: Object,
      default: null,
    },
  },

  computed: {
    migrationStrategyConfigString() {
      let returnString = '';
      const strategy = this.jobCluster.migrationConfig.strategy;
      switch (strategy) {
        case 'PERCENTAGE':
          const configString = this.jobCluster.migrationConfig.configString;
          try {
            const configObject = JSON.parse(configString.replace(/\\"/g, '"'));
            returnString = `Migrate ${
              configObject.percentToMove
            }% of workers every ${configObject.intervalMs} ms`;
          } catch (e) {
            returnString = 'Error parsing Migration Strategy JSON';
          }
          break;
      }
      return returnString;
    },
  },

  methods: {
    formatFileNameFromPath,
    formatDateLong(timestamp) {
      return timestamp ? format(timestamp, DETAILED_TIME_FORMAT) : '';
    },
    submitVersion(jar) {
      this.$router.push({
        path: `/clusters/${this.clusterId}/submit`,
        query: { clusterVersion: this.jar.version },
      });
    },
  },
};
</script>

<style lang="scss" module>
.job-cluster-config-detail-box {
  border-radius: var(--large-border-radius);
  border: 1px solid var(--element-card-border-color);
  font-size: 0.9em;
  padding: 0.5em;
  background-color: var(--neutral-050);
}

.job-cluster-config-detail-box:hover {
  background-color: var(--blue-100);
}

.job-cluster-config-detail-box-header {
  background-color: var(--neutral-100);
  padding: 0.5em;
  border-radius: var(--large-border-radius);
}
</style>
