<template>
  <div class="cluster-create">
    <h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/clusters' }">Clusters</el-breadcrumb-item>
        <el-breadcrumb-item>Create Cluster</el-breadcrumb-item>
      </el-breadcrumb>Cluster Create Page
    </h2>
    <el-form
      ref="createClusterForm"
      status-icon
      :model="form"
      :label-width="formLabelWidth"
      size="mini"
      class="text-left"
    >
      <JobClusterIdFormCard
        :class="$style['box-card']"
        :cluster-id.sync="form.jobDefinition.name"
        form-prop-path="jobDefinition.name"
      />

      <JobClusterOwnerFormCard :class="$style['box-card']" :owner="form.owner"/>

      <JobClusterArtifactFormCard
        :class="$style['box-card']"
        :is-loading-job-artifacts="isLoadingArtifactsList"
        :available-job-artifacts="availableArtifacts"
        :artifact-name.sync="form.jobDefinition.jobJarFileLocation"
        :version.sync="form.jobDefinition.version"
        @on-artifact-select="onArtifactSelect"
        @on-upload-file="uploadJobArtifact"
      />

      <div v-if="form.jobDefinition.jobJarFileLocation">
        <JobClusterLabelsFormCard
          :class="$style['box-card']"
          form-prop-path="jobDefinition.labels"
          :labels="form.jobDefinition.labels"
          :user-name="form.owner.name"
          :user-email="form.owner.contactEmail"
          :artifact-file="form.jobDefinition.jobJarFileLocation"
        />

        <JobClusterSlaOptionsFormCard
          :class="$style['box-card']"
          :sla="form.jobDefinition.sla"
          :cron-active.sync="form.jobDefinition.cronActive"
          :show-force-enable-controls="false"
          :support-force-enabled="false"
          form-prop-path="jobDefinition.sla"
        />

        <EnableJobMasterFormCard
          :class="$style['box-card']"
          :is-enabled.sync="form.enableJobMaster"
          @on-toggle-job-master="onToggleJobMaster"
        />

        <JobClusterStageSchedulingOptionsFormCard
          v-if="form.enableJobMaster"
          :class="$style['box-card']"
          :stage-number="0"
          :stage="form.jobDefinition.schedulingInfo.stages[0]"
        />

        <div v-for="(stage, index) in form.jobDefinition.schedulingInfo.stages" :key="index">
          <div v-if="parseInt(index) !== 0">
            <JobClusterStageSchedulingOptionsFormCard
              :class="$style['box-card']"
              :stage-number="parseInt(index)"
              :stage="stage"
            />
            <JobClusterStageScalingOptionsFormCard
              :class="$style['box-card']"
              :stage-number="parseInt(index)"
              :stage="stage"
              :scaling-reasons="scalingReasons"
            />
          </div>
        </div>

        <JobClusterMigrationStrategyFormCard
          :class="$style['box-card']"
          :migration-config="form.jobDefinition.migrationConfig"
        />

        <JobParametersConfigCardFormCard
          :class="$style['box-card']"
          :show-system-params="false"
          :parameters="form.availableParameters"
          form-prop-path="availableParameters"
          :should-override.sync="form.shouldOverrideJobParameters"
        />

        <JobParametersConfigCardFormCard
          :class="$style['box-card']"
          :show-system-params="true"
          :parameters="form.availableParameters"
          form-prop-path="availableParameters"
          :should-override.sync="form.shouldOverrideSystemParameters"
        />

        <SubmitOrCancelFormCard
          title="Setup or Cancel"
          :class="$style['box-card']"
          submit-text="Create a Job Cluster"
          submit-icon="el-icon-circle-plus"
          @on-submit="onSubmit"
          @on-close="onClose"
        >
          <el-tag v-if="form.jobDefinition.name" type="primary" size="large">
            You are creating a Job Cluster named
            <strong>{{ form.jobDefinition.name }}</strong>
          </el-tag>
          <span v-else class="danger-text">Please enter a Job Cluster Name above</span>
        </SubmitOrCancelFormCard>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem, Form, Tag } from 'element-ui';
import JobClusterStageSchedulingOptionsFormCard from '@/components/JobClusterStageSchedulingOptionsFormCard';
import JobClusterStageScalingOptionsFormCard from '@/components/JobClusterStageScalingOptionsFormCard';
import JobClusterMigrationStrategyFormCard from '@/components/JobClusterMigrationStrategyFormCard';
import JobParametersConfigCardFormCard from '@/components/JobParametersConfigCardFormCard';
import JobClusterSlaOptionsFormCard from '@/components/JobClusterSlaOptionsFormCard';
import JobClusterOwnerFormCard from '@/components/JobClusterOwnerFormCard';
import JobClusterArtifactFormCard from '@/components/JobClusterArtifactFormCard';
import JobClusterLabelsFormCard from '@/components/JobClusterLabelsFormCard';
import EnableJobMasterFormCard from '@/components/EnableJobMasterFormCard';
import SubmitOrCancelFormCard from '@/components/SubmitOrCancelFormCard';
import JobClusterIdFormCard from '@/components/JobClusterIdFormCard';
import store from '@/store';
import { mapState } from 'vuex';
import { ActionTypes } from '@/store/actions';
import { getScalingReasons } from '@/utils/scaling-reasons';
import {
  BASIC_TIME_FORMAT,
  DEFAULT_MASTER_CONFIGURATION,
  DEFAULT_MIGRATION_CONFIG_STRING,
  DEFAULT_WORKER_CONFIGURATION,
  MIGRATION_STRATEGIES,
} from '@/utils/constants';
import { format } from 'date-fns';
import { transformFormToClusterPayload } from '@/utils/job-cluster';

export default {
  name: 'JobClusterCreatePage',

  components: {
    [Form.name]: Form,
    [Tag.name]: Tag,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    JobClusterIdFormCard,
    JobClusterStageSchedulingOptionsFormCard,
    JobClusterStageScalingOptionsFormCard,
    JobClusterMigrationStrategyFormCard,
    JobParametersConfigCardFormCard,
    JobClusterLabelsFormCard,
    JobClusterSlaOptionsFormCard,
    JobClusterOwnerFormCard,
    JobClusterArtifactFormCard,
    EnableJobMasterFormCard,
    SubmitOrCancelFormCard,
  },

  data() {
    return {
      inputMaxLength: 100,
      formLabelWidth: '150px',
      form: {
        availableParameters: [],
        enableJobMaster: false,
        shouldOverrideJobParameters: false,
        shouldOverrideSystemParameters: false,
        jobDefinition: {
          name: '',
          user: this.$store.state.user.email,
          jobJarFileLocation: '',
          version: '',
          sla: {
            min: 0,
            max: 0,
            cronSpec: null,
            cronPolicy: null,
          },
          parameters: [],
          labels: [],
          migrationConfig: {
            strategy: MIGRATION_STRATEGIES[0].value,
            configString: DEFAULT_MIGRATION_CONFIG_STRING,
          },
          cronActive: false,
          schedulingInfo: {
            stages: null,
          },
        },
        owner: {
          name: this.$store.state.user.name,
          contactEmail: this.$store.state.user.email,
          teamName: '',
          description: '',
          repo: '',
        },
      },
    };
  },

  computed: {
    ...mapState({
      scalingReasons: state => {
        const configs = state.metadata.masterConfigs;
        return getScalingReasons(configs);
      },
      availableArtifacts: state => {
        return state.artifacts.artifactNames.filter(name => {
          return /\.(jar|zip)$/.test(name);
        });
      },
      isLoadingArtifactsList: state => {
        return state.artifacts.isLoadingArtifactsList;
      },
      selectedArtifactPropertiesJson: state => {
        return state.artifact.selectedArtifactPropertiesJson;
      },
    }),
  },

  created() {
    store.dispatch(ActionTypes.FetchMasterConfigs);
    store.dispatch(ActionTypes.FetchArtifacts);
  },

  methods: {
    onToggleJobMaster(shouldEnableJobMaster) {
      if (shouldEnableJobMaster) {
        this.form.jobDefinition.schedulingInfo.stages[0] = DEFAULT_MASTER_CONFIGURATION();
      } else {
        this.$delete(this.form.jobDefinition.schedulingInfo.stages, 0);
      }
    },
    async onArtifactSelect(artifactName) {
      await store.dispatch(ActionTypes.FetchJobArtifact, { artifactName });
      const selectedJar = this.selectedArtifactPropertiesJson;
      this.form.jobDefinition.version = `${selectedJar.version} ${format(
        new Date(),
        BASIC_TIME_FORMAT,
      )}`;

      // Stages 1-n
      const stageInfo = {};
      if (selectedJar.jobInfo) {
        Object.keys(selectedJar.jobInfo.stages).forEach(stage => {
          stageInfo[parseInt(stage) + 1] = DEFAULT_WORKER_CONFIGURATION();
        });
      }

      this.form.jobDefinition.schedulingInfo = {
        stages: stageInfo,
      };
      const parameterInfo = selectedJar.jobInfo
        ? selectedJar.jobInfo.parameterInfo
        : {};

      const parameters = Object.keys(parameterInfo).map((key, index) => {
        return {
          key,
          index,
          value: parameterInfo[key],
          override: '',
        };
      });
      this.form.availableParameters = parameters;
    },
    async uploadJobArtifact({ file }) {
      await store.dispatch(ActionTypes.UploadArtifact, { file });
      store.dispatch(ActionTypes.FetchArtifacts);
    },
    onSubmit() {
      const createClusterForm = this.$refs['createClusterForm'];
      createClusterForm.validate(async (valid, invalidObject) => {
        if (valid) {
          const jobCluster = transformFormToClusterPayload(
            this.form.jobDefinition,
            this.form.owner,
            this.form.availableParameters,
            [],
            this.form.shouldOverrideJobParameters,
            this.form.shouldOverrideSystemParameters,
          );
          const clusterId = jobCluster.jobDefinition.name;
          const { errors } = await store.dispatch(
            ActionTypes.CreateJobCluster,
            { jobCluster },
          );
          if (!errors) {
            this.$router.push({ path: `/clusters/${clusterId}` }, () => {
              this.$message.success(
                `Successfully created job cluster ${clusterId}`,
              );
            });
          } else {
            this.$scrollTo(createClusterForm.$el, {
              offset: -200,
            });
          }
        } else {
          const firstErrorField = invalidObject[Object.keys(invalidObject)[0]];
          if (firstErrorField.length) {
            this.$message.error(
              `Unable to create new job cluster due to error: ${
                firstErrorField[0].message
              }`,
            );
          } else {
            this.$message.error(
              `Unable to create new job cluster. Check form above for errors.`,
            );
          }
          return false;
        }
      });
    },
    onClose() {
      this.$router.push('/clusters');
    },
  },
};
</script>

<style lang="scss" module>
.box-card {
  margin: 1em;
}
</style>
