<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      Job Cluster Job Information
    </div>
    <div>
      <el-form-item label="Job Name">
        {{ jobProperties.jobInfo.name }}
      </el-form-item>
      <el-form-item label="Job Description">
        {{ jobProperties.jobInfo.description }}
      </el-form-item>
      <el-form-item label="Number of Stages">
        {{ jobProperties.jobInfo.numberOfStages }}
      </el-form-item>
      <el-form-item v-if="jobProperties.sourceInfo" label="Job Source Info">
        {{ jobProperties.jobInfo.sourceInfo }}
      </el-form-item>
      <el-form-item v-if="jobProperties.sinkInfo" label="Job Sink Info">
        {{ jobProperties.jobInfo.sinkInfo }}
      </el-form-item>
      <el-form-item label="Project">
        {{ jobProperties.project }}
      </el-form-item>
      <el-form-item label="Timestamp">
        {{ formatDateLong(jobProperties.timestamp) }}
      </el-form-item>
      <el-form-item label="Version">
        {{ jobProperties.version }}
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Card, FormItem } from 'element-ui';
import { format } from 'date-fns';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';
export default {
  name: 'JobClusterJobInformationFormCard',

  components: {
    [Card.name]: Card,
    [FormItem.name]: FormItem,
  },

  props: {
    jobProperties: {
      type: Object,
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
</style>
