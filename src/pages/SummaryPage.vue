<template>
  <div class="full-height vertical layout flex">
    <el-card :class="$style['summary-card']">
      <div slot="header" class="text-center">
        <el-row type="flex">
          <el-col>
            <img
              :class="$style['mantis-logo']"
              alt="Mantis Logo"
              src="../assets/images/mantis-logo-full-transparent.png"
            />
          </el-col>
          <el-col>
            <div>{{ summary.totalJobs }}</div>
            Job Clusters
          </el-col>
          <el-col>
            <div>{{ summary.workers }}</div>
            Workers
          </el-col>
          <el-col>
            <div>{{ summary.activeJobs }}</div>
            <a href="/summary?sortby=JOB_COUNT" class="active">Active Jobs</a>
          </el-col>
          <el-col>
            <div>{{ summary.totalCPUs }}</div>
            <a href="/summary?sortby=JOB_COUNT" class="active">CPUs</a>
          </el-col>
          <el-col>
            <div>{{ summary.totalMemory }}</div>
            <a href="/summary?sortby=JOB_COUNT" class="active">RAM</a>
          </el-col>
        </el-row>
      </div>
      <div :class="$style['job-list']">
        <ResourceBar :class="$style['job-item']" width="20%" />
        <ResourceBar :class="$style['job-item']" width="80%" />
        <ResourceBar :class="$style['job-item']" width="50%" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card, Col, Row } from 'element-ui';
import ResourceBar from '@/components/ResourceBar.vue';
import formatFileSize from '@/utils/format-file-size';
export default {
  name: 'SummaryPage',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    ResourceBar,
  },

  data() {
    return {
      jobClusterList: [],
      isLoadingList: false,
      summary: {
        totalCPUs: 5,
        totalMemory: formatFileSize(52372122312213),
        activeJobs: 19,
        workers: 9,
        totalJobs: 25,
      },
    };
  },

  created() {},
};
</script>

<style lang="scss" module>
.job-list {
  .job-item {
    margin: 0.5em 0;
  }
}

.mantis-logo {
  max-height: 3em;
}
</style>
