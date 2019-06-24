<template>
  <div :class="$style['job-item']" class="text-left">
    <StatusBadge :class="$style['status-badge']" :status="job.jobMetadata.state"/>

    <router-link tag="a" :to="`/jobs/${job.jobMetadata.jobId}`">
      <strong>{{ job.jobMetadata.jobId }}</strong>
    </router-link>

    <div>
      Version:
      <strong>{{ job.jobMetadata.version }}</strong>
    </div>

    <div>
      User:
      <strong>{{ job.jobMetadata.user }}</strong>
    </div>

    <div>
      Submitted:
      <strong>{{ formatDateLong(job.jobMetadata.submittedAt) }}</strong>
    </div>

    <el-button
      :disabled="isJobAcceptedOrLaunched"
      size="mini"
      type="danger"
      class="danger-text vertical-spacing-small"
      icon="el-icon-delete"
      plain
      @click="killJob(job)"
    >Kill Job</el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui';
import StatusBadge from '@/components/StatusBadge';
import { format } from 'date-fns';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';

export default {
  name: 'JobClusterJobListItem',

  components: {
    [Button.name]: Button,
    StatusBadge,
  },

  props: {
    job: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isJobAcceptedOrLaunched() {
      return this.job.state === 'Accepted' || this.job.state === 'Launched';
    },
  },

  methods: {
    formatDateLong(timestamp) {
      return format(timestamp, DETAILED_TIME_FORMAT);
    },
    killJob(job) {
      this.$emit('on-kill-job', { job });
    },
  },
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

.status-badge {
  float: right;
}
</style>
