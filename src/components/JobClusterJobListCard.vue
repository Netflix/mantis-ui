<template>
  <el-card shadow="hover">
    <template slot="header">
      <div>Jobs</div>
    </template>
    <div v-if="activeJobs.length">
      <div v-for="activeJob in activeJobs" :key="activeJob.jobId" class="spacing-small">
        <JobClusterJobListItem :job="activeJob" @on-kill-job="killJob" />
      </div>
    </div>
    <div v-else>No active jobs</div>

    <el-button
      v-if="showArchivedJobsMode"
      type="info"
      size="mini"
      class="vertical-spacing-small"
      @click="toggleArchivedJobsMode"
    >Hide archived jobs</el-button>
    <el-button
      v-if="!showArchivedJobsMode && nonActiveJobs.length"
      size="mini"
      type="info"
      class="vertical-spacing-small"
      @click="toggleArchivedJobsMode"
    >Show {{ nonActiveJobs.length }} archived jobs</el-button>
    <div v-if="showArchivedJobsMode">
      <div v-for="nonActiveJob in nonActiveJobs" :key="nonActiveJob.jobId" class="spacing-small">
          <JobClusterJobListItem :job="nonActiveJob" @on-kill-job="killJob" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { Button, Card } from 'element-ui';
import JobClusterJobListItem from '@/components/JobClusterJobListItem';

export default {
  name: 'JobClusterJobListCard',

  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    JobClusterJobListItem,
  },

  props: {
    activeJobs: {
      type: Array,
      required: true,
    },
    nonActiveJobs: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      showArchivedJobsMode: false,
    };
  },

  methods: {
    toggleArchivedJobsMode() {
      this.showArchivedJobsMode = !this.showArchivedJobsMode;
    },
    killJob({ job }) {
      this.$emit('on-kill-job', { job });
    },
  }
};
</script>

<style lang="scss" module>
.job-item {
  border-radius: var(--large-border-radius);
  border: 1px solid var(--element-card-border-color);
  font-size: 0.9em;
  padding: 0.5em;
  background-color: var(--neutral-050);
}

.job-item:hover {
  background-color: var(--blue-100);
}
</style>
