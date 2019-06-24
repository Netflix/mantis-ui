<template>
  <el-card shadow="hover" class="form-card">
    <template slot="header">
      <strong>Job Cluster</strong>
    </template>
    <div>
      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Cluster</el-col>
        <el-col :span="valueSpan" class="text-left">
          <el-tooltip
            class="item"
            effect="dark"
            placement="top-start"
            content="Click to view the Job Cluster"
          >
            <router-link tag="a" :to="`/clusters/${jobCluster.name}`">
              <strong>{{ jobCluster.name }}</strong>
            </router-link>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Cluster Labels</el-col>
        <el-col :span="valueSpan" class="text-left">
          <span v-for="tag in jobCluster.labels" :key="tag.name" class="job-tag">
            <el-tag
              type="info"
              size="small"
              class="job-label"
              :disable-transitions="true"
              @click="onTagClick(tag)"
            >{{ tag.name }} : {{ tag.value }}</el-tag>
          </span>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Cluster Owner</el-col>
        <el-col :span="valueSpan" class="text-left">
          <div v-if="jobCluster.owner.name">
            <span :class="$style['cluster-owner-label']">Name:</span>
            {{ jobCluster.owner.name }}
          </div>
          <div v-if="jobCluster.owner.teamName">
            <span :class="$style['cluster-owner-label']">Team:</span>
            {{ jobCluster.owner.teamName }}
          </div>
          <div v-if="jobCluster.owner.contactEmail">
            <span :class="$style['cluster-owner-label']">Email:</span>
            {{ jobCluster.owner.contactEmail }}
          </div>
          <div v-if="jobCluster.owner.repo">
            <span :class="$style['cluster-owner-label']">Repo:</span>
            {{ jobCluster.owner.repo }}
          </div>
          <div v-if="jobCluster.owner.description">
            <span :class="$style['cluster-owner-label']">Description:</span>
            {{ jobCluster.owner.description }}
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Cluster SLA</el-col>
        <el-col :span="valueSpan" class="text-left">
          <div>
            min:
            <strong>{{ jobCluster.sla.min }}</strong> max:
            <strong>{{ jobCluster.sla.max }}</strong>
            <span
              v-if="jobCluster.sla.min > 0"
              class="success-text"
            >(Job will be replaced if killed)</span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="jobCluster.sla.cronSpec" type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Cron Spec</el-col>
        <el-col :span="valueSpan" class="text-left" :class="$style['value']">
          <strong>{{ jobCluster.sla.cronSpec }}</strong>
        </el-col>
      </el-row>
      <el-row v-if="jobCluster.sla.cronPolicy" type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Cron Policy</el-col>
        <el-col :span="valueSpan" class="text-left" :class="$style['value']">
          <strong>{{ jobCluster.sla.cronPolicy }}</strong>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="gutter" class="card-item">
        <el-col :span="labelSpan" class="text-right label">Job Cluster Status</el-col>
        <el-col :span="valueSpan" class="text-left" :class="$style['value']">
          <el-tag v-if="jobCluster.disabled" type="danger" :disable-transitions="true">Disabled</el-tag>
          <el-tag v-else type="success" :disable-transitions="true">Enabled</el-tag>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { Card, Col, Row, Tag, Tooltip } from 'element-ui';

export default {
  name: 'JobClusterCard',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Tooltip.name]: Tooltip,
  },

  props: {
    jobCluster: {
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

  methods: {
    onTagClick(tag) {
      const filter = `${tag.name}=${tag.value}`;
      this.$router.push({
        path: '/clusters',
        query: { labels: filter || undefined },
      });
    },
  },
};
</script>

<style lang="scss" module>
.cluster-owner-label {
  color: var(--neutral-300);
}
</style>
