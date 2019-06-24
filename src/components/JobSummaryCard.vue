<template>
  <el-card shadow="hover" class="form-card">
    <template slot="header">
      <strong>Job Summary</strong>
    </template>
    <div :class="$style['detail-card-body']">
      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Id</el-col>
        <el-col :span="valueSpan" class="text-left">
          <strong>{{ job.jobMetadata.jobId }}</strong>
        </el-col>
      </el-row>

      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Labels</el-col>
        <el-col :span="valueSpan" class="text-left">
          <span v-for="tag in job.jobMetadata.labels" :key="tag.name" class="job-tag">
            <el-tag type="info" size="small" class="job-label" :disable-transitions="true" @click="onTagClick(tag)">{{ tag.name }} : {{ tag.value }}</el-tag>
          </span>
        </el-col>
      </el-row>

      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Submitted By</el-col>
        <el-col :span="valueSpan" class="text-left">{{ job.jobMetadata.user }}</el-col>
      </el-row>

      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Artifact File</el-col>
        <el-col :span="valueSpan" class="text-left">{{ formatFileNameFromPath(job.jobMetadata.jarUrl) }}</el-col>
      </el-row>

      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Meta</el-col>
        <el-col :span="valueSpan" class="text-left">
          <strong>{{ job.jobMetadata.numStages }}</strong>
          Stage,
          {{ job.jobMetadata.sla.durationType }},
          {{ job.jobMetadata.sla.slaType }},
          <strong>{{ totalCpus }}</strong> CPUs
          <br>Min-Runtime:
          <strong>{{ job.jobMetadata.sla.minRuntimeSecs }}</strong>s, Runtime-Limit:
          <strong>{{ job.jobMetadata.sla.runtimeLimitSecs }}</strong>s, Subscription-Timeout:
          <strong>{{ job.jobMetadata.subscriptionTimeoutSecs }}</strong>s
        </el-col>
      </el-row>

      <el-row
        v-if="job.jobMetadata.parameters.length"
        type="flex"
        :gutter="gutter"
        class="card-item"
      >
        <el-col :span="labelSpan" class="text-right label">Parameters</el-col>
        <el-col :span="valueSpan" class="text-left">
          <div
            v-for="param in job.jobMetadata.parameters"
            :key="param.name"
            :class="$style['parameter-item']"
          >
            <strong>{{ param.name }}</strong>
            :
            {{ param.value }}
          </div>
        </el-col>
      </el-row>

      <el-row
        v-if="job.jobMetadata.sla.userProvidedType"
        type="flex"
        :gutter="gutter"
        class="card-item"
      >
        <el-col :span="labelSpan" class="text-right label">User Provided</el-col>
        <el-col :span="valueSpan" class="text-left">{{ job.jobMetadata.sla.userProvidedType }}</el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { Card, Col, Row, Tag } from 'element-ui';
import formatFileNameFromPath from '@/utils/format-file-name-from-path';

export default {
  name: 'JobSummaryCard',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
  },

  props: {
    job: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      labelSpan: 5,
      valueSpan: 19,
      gutter: 10,
    };
  },

  computed: {
    totalCpus() {
      const stages = this.job.stageMetadataList;
      let cpus = 0;
      stages.forEach(stage => {
        cpus = cpus + stage.machineDefinition.cpuCores;
      });
      return cpus;
    },
  },

  methods: {
    formatFileNameFromPath,
    onTagClick(tag) {
      const filter = `${tag.name}=${tag.value}`;
      this.$router.push({ path: '/jobs', query: { labels: filter || undefined } });
    },
  },
};
</script>

<style lang="scss" module>
.parameter-item {
  padding: 0.5em 0;
  border-bottom: 1px solid var(--element-card-border-color);
  &:first-child {
    padding-top: 0;
  }
}
</style>
