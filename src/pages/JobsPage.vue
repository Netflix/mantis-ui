<template>
  <div class="full-height vertical layout flex">
    <h2>Mantis Jobs</h2>

    <el-card v-loading="isLoadingList">
      <div slot="header" class="clearfix">
        <el-row type="flex" :gutter="10">
          <el-col :span="24" class="layout horizontal center">
            <el-input
              v-model="jobIdSearchFilter"
              prefix-icon="el-icon-search"
              :class="$style['job-filter-input']"
              placeholder="Search by Job Id"
              clearable
              @input="throttledUpdateRouteWithFilters"
            />
            <el-input
              v-model="jobLabelSearchFilter"
              prefix-icon="el-icon-search"
              placeholder="Filter by Job Label"
              clearable
              @input="throttledUpdateRouteWithFilters"
            />
          </el-col>
          <el-col class="layout horizontal center-center">
            <strong>{{ numJobs }}</strong
            >&nbsp;jobs found -&nbsp; <strong>{{ totalResources.cpu }}</strong
            >&nbsp;CPUs,&nbsp; <strong>{{ totalResources.memory }}</strong
            >&nbsp;RAM
          </el-col>
          <el-col class="layout horizontal end-justified center">
            <el-dropdown trigger="hover" @command="handleActionMenuItemClick">
              <el-button type="primary" :disabled="!selectedJobs.length">
                Multi-Action Menu
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-delete" command="killJob"
                  >Kill Jobs</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          ref="jobTable"
          :class="$style['jobs-table']"
          :data="jobsList"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column
            property="jobId"
            label="Job Id"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link tag="a" :to="`/jobs/${scope.row.jobId}`">{{
                scope.row.jobId
              }}</router-link>
              <span v-if="isTransient(scope.row.type)">
                <font-awesome-icon icon="clock" />Transient
              </span>
              <SpecialLabels
                :labels="scope.row.labels"
                @on-tag-click="onTagClick"
              />
            </template>
          </el-table-column>
          <el-table-column property="name" label="Job Cluster" width="100">
            <template slot-scope="scope">
              <router-link
                tag="span"
                :to="`/clusters/${jobClusterFromJobId(scope.row.jobId)}`"
              >
                <el-link icon="el-icon-view" :underline="false" />
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="Stages" width="75">
            <template slot-scope="scope">{{ scope.row.numStages }}</template>
          </el-table-column>
          <el-table-column label="Workers" width="75">
            <template slot-scope="scope">{{ scope.row.numWorkers }}</template>
          </el-table-column>
          <el-table-column label="CPU / Memory">
            <template slot-scope="scope">
              <strong>{{ scope.row.totCPUs }}</strong> CPU /
              <strong>{{ scope.row.totMemory }}</strong> RAM
            </template>
          </el-table-column>
          <el-table-column label="Submitted At">
            <template slot-scope="scope">{{
              formatDateLong(scope.row.submittedAt)
            }}</template>
          </el-table-column>
          <el-table-column label="State">
            <template slot-scope="scope">
              <el-tag type="success" :disable-transitions="true">{{
                scope.row.state
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="top-spacing"
          layout="prev, pager, next, sizes, total"
          :page-sizes="[15, 25, 50, 100]"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="numJobs"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  Link,
  Pagination,
  Row,
  Table,
  TableColumn,
  Tag,
} from 'element-ui';
import store from '@/store';
import { ActionTypes } from '@/store/actions';
import { mapState } from 'vuex';
import debounce from 'lodash.debounce';
import { format } from 'date-fns';
import { getJobClusterIdFromJobId } from '@/utils/job';
import SpecialLabels from '@/components/SpecialLabels';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';

export default {
  name: 'JobsPage',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Link.name]: Link,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    SpecialLabels,
  },

  beforeRouteUpdate(to, from, next) {
    next();
    this.jobIdSearchFilter = this.$route.query.matching;
    this.jobLabelSearchFilter = this.$route.query.labels;
    this.fetchJobs();
  },

  data() {
    return {
      jobIdSearchFilter: this.$route.query.matching,
      jobLabelSearchFilter: this.$route.query.labels,
      selectedJobs: [],
    };
  },

  computed: {
    ...mapState({
      isLoadingList: state => state.jobs.isLoadingList,
      jobsList: state => state.jobs.list,
      numJobs: state => state.jobs.total,
      pageSize: state => state.jobs.pageSize,
      totalResources: state => state.jobs.totalResources,
      currentPage: state => state.jobs.pageNumber,
    }),
  },

  created() {
    this.fetchJobs();
  },

  methods: {
    handleActionMenuItemClick(command) {
      switch (command) {
        case 'killJob':
          this.$confirm(
            `This will kill the selected ${
              this.selectedJobs.length
            } jobs. Continue?`,
            'Kill Job(s)',
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning',
            },
          )
            .then(async () => {
              const jobIds = this.selectedJobs.map(job => job.jobId);
              const { errors } = await store.dispatch(ActionTypes.KillJobs, {
                jobIds,
              });
              store.dispatch(ActionTypes.FetchJobs);
              if (!errors) {
                this.$message.success('Kill jobs completed');
              }
            })
            .catch(() => {
              this.$message.info('Kill jobs cancelled');
            });
          break;
        default:
          console.debug('No action menu item matched.');
      }
    },
    handleSelectionChange(selectedJobs) {
      this.selectedJobs = selectedJobs;
    },
    handleSizeChange(size) {
      this.$router.push({ query: { pageSize: size } });
    },
    handleCurrentChange(pageNumber) {
      this.$router.push({
        query: { page: pageNumber, pageSize: this.pageSize },
      });
    },
    fetchJobs() {
      const searchText = this.jobIdSearchFilter;
      const labelFilterText = this.jobLabelSearchFilter;
      store.dispatch(ActionTypes.UpdateJobsTablePageSize, {
        size: parseInt(this.$route.query.pageSize) || 15,
      });
      store.dispatch(ActionTypes.UpdateJobsTablePageNumber, {
        pageNumber: parseInt(this.$route.query.page) || 1,
      });
      store.dispatch(ActionTypes.FetchJobs, {
        searchText,
        labelFilterText,
      });
    },
    updateRouteWithFilters() {
      const searchText = this.jobIdSearchFilter;
      const labelFilterText = this.jobLabelSearchFilter;
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
    formatDateLong(timestamp) {
      return timestamp ? format(timestamp, DETAILED_TIME_FORMAT) : '';
    },
    jobClusterFromJobId(jobId) {
      return getJobClusterIdFromJobId(jobId);
    },
    isTransient(jobType) {
      return jobType === 'Transient';
    },
    onTagClick({ tag }) {
      const filter = `${tag.labelName}=${tag.labelValue}`;
      this.jobLabelSearchFilter = filter;
      this.updateRouteWithFilters();
    },
  },
};
</script>

<style lang="scss" module>
.job-filter-input {
  margin-right: 1em;
}

.jobs-table {
  height: 60vh;
  overflow-y: scroll;
}
</style>
