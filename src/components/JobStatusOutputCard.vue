<template>
  <el-card shadow="hover" :class="$style['detail-card']">
    <template slot="header" class="flex layout horizontal">
      <strong
        >Job Status Output (newest on top) -
        {{ jobStatusEvents.length }} messages</strong
      >
      <strong class="self-end">
        Job State:
        <StatusBadge :status="job.jobMetadata.state" />
      </strong>
    </template>
    <div
      v-if="jobStatusEvents"
      :class="$style['detail-card-body']"
      class="text-left"
    >
      <div
        v-for="(item, index) in jobStatusEvents"
        :key="`status-item-${index}`"
      >
        <strong>{{ formatDateLong(item.timestamp) }}</strong>
        - {{ item.message }} {{ item.stageNum }} {{ item.state }}
      </div>
    </div>
  </el-card>
</template>

<script>
import { Card } from 'element-ui';
import StatusBadge from '@/components/StatusBadge';
import { format } from 'date-fns';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';

export default {
  name: 'JobStatusOutputCard',

  components: {
    [Card.name]: Card,
    StatusBadge,
  },

  props: {
    job: {
      type: Object,
      required: true,
    },
    jobStatusEvents: {
      type: Array,
      required: true,
    },
  },

  methods: {
    formatDateLong(timestamp) {
      return timestamp ? format(timestamp, DETAILED_TIME_FORMAT) : '';
    },
  },
};
</script>

<style lang="scss" module>
.detail-card {
  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.detail-card-body {
  max-height: 50vh;
  overflow: auto;
}
</style>
