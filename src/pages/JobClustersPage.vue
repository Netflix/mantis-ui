<template>
  <div class="full-height vertical layout flex">
    <h2>Mantis Job Clusters</h2>

    <el-card v-loading="isLoadingList">
      <div slot="header" class="clearfix">
        <el-row type="flex" :gutter="10">
          <el-col :span="24" class="layout horizontal center">
            <el-input
              v-model="clusterIdSearchFilter"
              prefix-icon="el-icon-search"
              :class="$style['job-cluster-filter-input']"
              placeholder="Search by Cluster Name"
              clearable
              @input="throttledUpdateRouteWithFilters"
            />
            <el-input
              v-model="clusterLabelSearchFilter"
              prefix-icon="el-icon-search"
              placeholder="Filter by Job Label"
              clearable
              @input="throttledUpdateRouteWithFilters"
            />
          </el-col>
          <el-col class="layout horizontal center-center">
            <strong>{{ totalNumberJobClusters }}</strong
            >&nbsp;Job Clusters
          </el-col>
          <el-col class="text-right">
            <router-link to="/clusters/create">
              <el-button type="success" plain>
                Create a New Job Cluster
              </el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <div v-if="jobClustersList.length" :class="$style['job-cluster-table']">
        <div v-for="cluster in jobClustersList" :key="cluster.name">
          <JobClusterItem :cluster="cluster" @on-tag-click="onTagClick" />
          <div :class="$style['job-cluster-table-row-line']" />
        </div>
      </div>
      <div v-else>
        No Data
      </div>
      <el-pagination
        background
        class="top-spacing"
        layout="prev, pager, next, sizes, total"
        :page-sizes="[15, 25, 50, 100]"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalNumberJobClusters"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { Button, Card, Col, Input, Pagination, Row } from 'element-ui';
import store from '@/store';
import { mapState } from 'vuex';
import debounce from 'lodash.debounce';
import JobClusterItem from '@/components/JobClusterItem.vue';
import { ActionTypes } from '@/store/actions';

export default {
  name: 'JobClustersPage',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    JobClusterItem,
  },

  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchJobClusters();
  },

  data() {
    return {
      clusterIdSearchFilter: this.$route.query.matching,
      clusterLabelSearchFilter: this.$route.query.labels,
    };
  },

  computed: {
    ...mapState({
      isLoadingList: state => state.jobClusters.isLoadingList,
      jobClustersList: state => state.jobClusters.list,
      pageSize: state => state.jobClusters.pageSize,
      totalNumberJobClusters: state => state.jobClusters.total,
      currentPage: state => state.jobClusters.pageNumber,
    }),
  },

  created() {
    this.fetchJobClusters();
  },

  methods: {
    handleSizeChange(size) {
      this.$router.push({ query: { pageSize: size } });
    },
    handleCurrentChange(pageNumber) {
      this.$router.push({
        query: { page: pageNumber, pageSize: this.pageSize },
      });
    },
    onTagClick({ tag }) {
      const filter = `${tag.labelName}=${tag.labelValue}`;
      this.clusterLabelSearchFilter = filter;
      this.updateRouteWithFilters();
    },
    calculateOffset(pageNumber) {
      return this.pageSize * (pageNumber - 1);
    },
    fetchJobClusters() {
      const searchText = this.clusterIdSearchFilter;
      const labelFilterText = this.clusterLabelSearchFilter;
      store.dispatch(ActionTypes.UpdateClusterTablePageSize, {
        size: parseInt(this.$route.query.pageSize) || 15,
      });
      store.dispatch(ActionTypes.UpdateClusterTablePageNumber, {
        pageNumber: parseInt(this.$route.query.page) || 1,
      });
      store.dispatch(ActionTypes.FetchJobClusters, {
        searchText,
        labelFilterText,
      });
    },
    updateRouteWithFilters() {
      const searchText = this.clusterIdSearchFilter;
      const labelFilterText = this.clusterLabelSearchFilter;
      this.$router.push({
        query: {
          matching: searchText || undefined,
          labels: labelFilterText || undefined,
        },
      });
    },
    throttledUpdateRouteWithFilters: debounce(function() {
      this.updateRouteWithFilters();
    }, 500),
  },
};
</script>

<style lang="scss" module>
a {
  margin-right: 10px;
}
.job-cluster-item {
  padding: 0.5em;
  border-radius: var(--large-border-radius);
  &:hover {
    background-color: #dfe8f1;
  }

  .job-tag {
    margin: 0 0.2em;
  }
}

.job-cluster-table {
  max-height: 60vh;
  overflow-y: scroll;
}

.job-cluster-table-row-line {
  margin-top: 3px;
  margin-bottom: 3px;
  border-bottom: 1px solid #f1f1f1;
}

.job-cluster-filter-input {
  margin-right: 1em;
}
</style>
