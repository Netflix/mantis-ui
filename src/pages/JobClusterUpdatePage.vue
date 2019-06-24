<template>
  <div class="cluster-create">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clusters' }">Clusters</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/clusters/${clusterId}` }">Cluster Detail</el-breadcrumb-item>
      <el-breadcrumb-item>Update Cluster</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>Update a Job Cluster</h1>
    <h4>
      Update
      <span class="primary-text">{{ clusterId }}</span>
    </h4>
    <el-form
      ref="updateClusterForm"
      v-loading="isLoading"
      status-icon
      :model="form"
      :label-width="formLabelWidth"
      size="mini"
      class="text-left"
    >
      <JobClusterUpdateOptionsFormCard
        :class="$style['box-card']"
        :cluster-id="clusterId"
        :update-type.sync="form.updateType"
        :should-automatically-submit.sync="form.shouldAutomaticallySubmit"
        @on-change-update-type="onChangeUpdateType"
      />

      <div v-if="formReady">
        <div v-if="form.updateType === JOB_CLUSTER_UPDATE_TYPES.STANDARD">
          <JobClusterArtifactFormCard
            :class="$style['box-card']"
            :latest-artifact="form.latestArtifact"
            :is-loading-job-artifacts="isLoadingArtifactsList"
            :available-job-artifacts="availableArtifacts"
            :artifact-name.sync="form.jobDefinition.jobJarFileLocation"
            :version.sync="form.jobDefinition.version"
            @on-artifact-select="onArtifactSelect"
            @on-upload-file="uploadJobArtifact"
          />

          <div
            v-if="form.jobDefinition.jobJarFileLocation && form.jobDefinition.schedulingInfo.stages"
          >
            <JobClusterOwnerFormCard :class="$style['box-card']" :owner="form.owner"/>

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
              :default-parameters="form.defaultParameters"
              form-prop-path="availableParameters"
              :should-override.sync="form.shouldOverrideJobParameters"
            />

            <JobParametersConfigCardFormCard
              :class="$style['box-card']"
              :show-system-params="true"
              :parameters="form.availableParameters"
              :default-parameters="form.defaultParameters"
              form-prop-path="availableParameters"
              :should-override.sync="form.shouldOverrideSystemParameters"
            />
          </div>
        </div>
        <div v-else-if="form.updateType === JOB_CLUSTER_UPDATE_TYPES.QUICK_ARTIFACT">
          <JobClusterArtifactFormCard
            :class="$style['box-card']"
            :latest-artifact="form.latestArtifact"
            :is-loading-job-artifacts="isLoadingArtifactsList"
            :available-job-artifacts="availableArtifacts"
            :artifact-name.sync="form.jobDefinition.jobJarFileLocation"
            :version.sync="form.jobDefinition.version"
            @on-artifact-select="onArtifactSelect"
            @on-upload-file="uploadJobArtifact"
          />
        </div>
        <div v-else-if="form.updateType === JOB_CLUSTER_UPDATE_TYPES.QUICK_SLA">
          <JobClusterSlaOptionsFormCard
            :class="$style['box-card']"
            :sla="form.jobDefinition.sla"
            :cron-active.sync="form.jobDefinition.cronActive"
            :show-force-enable-controls="true"
            :should-force-enable.sync="form.shouldForceEnable"
            form-prop-path="jobDefinition.sla"
          />
        </div>
        <div v-else-if="form.updateType === JOB_CLUSTER_UPDATE_TYPES.QUICK_MIGRATION_STRATEGY">
          <JobClusterMigrationStrategyFormCard
            :class="$style['box-card']"
            :migration-config="form.jobDefinition.migrationConfig"
          />
        </div>
        <div v-else-if="form.updateType === JOB_CLUSTER_UPDATE_TYPES.QUICK_LABEL">
          <JobClusterLabelsFormCard
            :class="$style['box-card']"
            form-prop-path="jobDefinition.labels"
            :labels="form.jobDefinition.labels"
            :user-name="form.owner.name"
            :user-email="form.owner.contactEmail"
            :artifact-file="form.jobDefinition.jobJarFileLocation"
          />
        </div>

        <SubmitOrCancelFormCard
          v-if="allowSubmit"
          title="Update or Cancel"
          :class="$style['box-card']"
          submit-text="Update Job Cluster"
          submit-icon="el-icon-edit"
          @on-submit="onSubmit"
          @on-close="onClose"
        >
          <el-tag type="primary" size="large">
            You are performing a
            <strong>{{ form.updateType}} Update</strong> on
            Job Cluster
            <strong>{{ clusterId }}</strong>
          </el-tag>
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
import JobClusterOwnerFormCard from '@/components/JobClusterOwnerFormCard';
import JobClusterUpdateOptionsFormCard from '@/components/JobClusterUpdateOptionsFormCard';
import JobClusterArtifactFormCard from '@/components/JobClusterArtifactFormCard';
import JobClusterLabelsFormCard from '@/components/JobClusterLabelsFormCard';
import JobParametersConfigCardFormCard from '@/components/JobParametersConfigCardFormCard';
import SubmitOrCancelFormCard from '@/components/SubmitOrCancelFormCard';
import JobClusterSlaOptionsFormCard from '@/components/JobClusterSlaOptionsFormCard';
import EnableJobMasterFormCard from '@/components/EnableJobMasterFormCard';
import store from '@/store';
import { mapState } from 'vuex';
import { ActionTypes } from '@/store/actions';
import {
  BASIC_TIME_FORMAT,
  DEFAULT_MASTER_CONFIGURATION,
  DEFAULT_MIGRATION_CONFIG_STRING,
  DEFAULT_WORKER_CONFIGURATION,
  JOB_CLUSTER_UPDATE_TYPES,
  MIGRATION_STRATEGIES,
} from '@/utils/constants';
import { format } from 'date-fns';
import { getScalingReasons } from '@/utils/scaling-reasons';
import { transformFormToClusterPayload } from '@/utils/job-cluster';

export default {
  name: 'JobClusterCreatePage',

  components: {
    [Form.name]: Form,
    [Tag.name]: Tag,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    JobClusterUpdateOptionsFormCard,
    JobClusterArtifactFormCard,
    JobClusterOwnerFormCard,
    JobClusterLabelsFormCard,
    JobClusterSlaOptionsFormCard,
    JobClusterMigrationStrategyFormCard,
    EnableJobMasterFormCard,
    JobClusterStageSchedulingOptionsFormCard,
    JobClusterStageScalingOptionsFormCard,
    JobParametersConfigCardFormCard,
    SubmitOrCancelFormCard,
  },

  data() {
    const calculateUpdateType = () => {
      const updateType = this.$route.query.updateType;

      return (
        Object.values(JOB_CLUSTER_UPDATE_TYPES).find(type => {
          return type.replace(/\s/g, '') === updateType;
        }) || JOB_CLUSTER_UPDATE_TYPES.STANDARD
      );
    };

    return {
      clusterId: this.$route.params.clusterId,
      inputMaxLength: 100,
      formLabelWidth: '150px',
      formReady: false,
      JOB_CLUSTER_UPDATE_TYPES,
      form: {
        latestArtifact: null,
        shouldAutomaticallySubmit: true,
        shouldForceEnable: false,
        availableParameters: [],
        defaultParameters: [],
        enableJobMaster: false,
        shouldOverrideJobParameters: false,
        shouldOverrideSystemParameters: false,
        updateType: calculateUpdateType(),
        jobDefinition: {
          name: this.$route.params.clusterId,
          user: this.$store.state.user.email,
          jobJarFileLocation: '',
          version: '',
          sla: {},
          parameters: [],
          labels: [],
          migrationConfig: {},
          cronActive: false,
          schedulingInfo: {
            stages: null,
          },
        },
        owner: {},
      },
    };
  },

  computed: {
    ...mapState({
      isLoading: state => state.jobCluster.isLoadingJobClusterDetails,
      selectedJobCluster: state => state.jobCluster.selectedJobCluster,
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
    allowSubmit() {
      if (
        this.form.updateType === JOB_CLUSTER_UPDATE_TYPES.STANDARD ||
        this.form.updateType === JOB_CLUSTER_UPDATE_TYPES.QUICK_ARTIFACT
      ) {
        return !!this.form.jobDefinition.jobJarFileLocation;
      }
      return true;
    },
  },

  watch: {
    async selectedJobCluster(cluster) {
      const latestArtifact = cluster.jars[cluster.jars.length - 1];
      this.form.latestArtifact = latestArtifact;
      this.form.owner = JSON.parse(JSON.stringify(cluster.owner));
      this.form.jobDefinition.labels = JSON.parse(
        JSON.stringify(cluster.labels),
      );
      this.form.jobDefinition.sla = JSON.parse(JSON.stringify(cluster.sla));
      this.form.jobDefinition.migrationConfig = JSON.parse(
        JSON.stringify(cluster.migrationConfig),
      );
      this.form.enableJobMaster =
        cluster.isReadyForJobMaster &&
        !!latestArtifact.schedulingInfo.stages[0];

      this.form.jobDefinition.cronActive = cluster.cronActive;
      this.form.defaultParameters = cluster.parameters.map(
        (parameter, index) => {
          return {
            key: parameter.name,
            index,
            value: parameter.value,
            override: '',
          };
        },
      );
      this.formReady = true;
    },
  },

  created() {
    store.dispatch(ActionTypes.FetchMasterConfigs);
    store.dispatch(ActionTypes.FetchJobClusterDetails, {
      clusterId: this.clusterId,
    });
    store.dispatch(ActionTypes.FetchArtifacts);
  },

  methods: {
    async onArtifactSelect(artifactName) {
      await store.dispatch(ActionTypes.FetchJobArtifact, { artifactName });
      const selectedArtifactJson = this.selectedArtifactPropertiesJson;
      const latestJobClusterArtifact = this.form.latestArtifact;
      this.form.jobDefinition.version = `${
        selectedArtifactJson.version
      } ${format(new Date(), BASIC_TIME_FORMAT)}`;

      const stageInfo = {};

      // Stage 0
      if (this.form.enableJobMaster) {
        stageInfo[0] = latestJobClusterArtifact.schedulingInfo.stages[0];
      }

      // Stages 1-n
      if (selectedArtifactJson.jobInfo) {
        // If number of stages of artifact json is same as number of stages of latest job cluster artifact not including job master
        const jobMasterCount = this.form.enableJobMaster ? 1 : 0;
        if (
          Object.keys(selectedArtifactJson.jobInfo.stages).length ===
          Object.keys(latestJobClusterArtifact.schedulingInfo.stages).length - jobMasterCount
        ) {
          Object.entries(latestJobClusterArtifact.schedulingInfo.stages).forEach(
            ([stageNum, stage]) => {
              if (stageNum !== 0) {
                stageInfo[parseInt(stageNum)] = stage;
              }
            },
          );
        } else {
          // Start from stach and display the default stage info.
          Object.entries(selectedArtifactJson.jobInfo.stages).forEach(
            ([stageNum, stage]) => DEFAULT_WORKER_CONFIGURATION(),
          );
        }
      }

      this.form.jobDefinition.schedulingInfo = {
        stages: JSON.parse(JSON.stringify(stageInfo)),
      };
      const parameterInfo = selectedArtifactJson.jobInfo
        ? selectedArtifactJson.jobInfo.parameterInfo
        : {};

      const parameters = Object.keys(parameterInfo).map((key, index) => {
        return {
          key,
          index,
          value: parameterInfo[key],
          isSystemParameter: key.toLowerCase().indexOf('mantis') === 0,
          override: '',
        };
      });
      this.form.availableParameters = parameters;
    },
    async uploadJobArtifact({ file }) {
      await store.dispatch(ActionTypes.UploadArtifact, { file });
      store.dispatch(ActionTypes.FetchArtifacts);
    },
    onChangeUpdateType(updateType) {
      const updateTypeWithSpaces = updateType.replace(/\s/g, '');
      this.$router.push({ query: { updateType: updateTypeWithSpaces } });
    },
    onToggleJobMaster(shouldEnableJobMaster) {
      if (shouldEnableJobMaster) {
        this.form.jobDefinition.schedulingInfo.stages[0] = DEFAULT_MASTER_CONFIGURATION();
      } else {
        this.$delete(this.form.jobDefinition.schedulingInfo.stages, 0);
      }
    },
    onSubmit() {
      const updateClusterForm = this.$refs['updateClusterForm'];
      const clusterId = this.clusterId;
      updateClusterForm.validate(async (valid, invalidObject) => {
        if (valid) {
          const updateType = this.form.updateType;
          let response = null;
          switch (updateType) {
            case JOB_CLUSTER_UPDATE_TYPES.STANDARD:
              const jobCluster = transformFormToClusterPayload(
                this.form.jobDefinition,
                this.form.owner,
                this.form.availableParameters,
                this.form.defaultParameters,
                this.form.shouldOverrideJobParameters,
                this.form.shouldOverrideSystemParameters,
              );
              response = await store.dispatch(
                ActionTypes.UpdateJobClusterStandard,
                { clusterId, jobCluster },
              );
              break;
            case JOB_CLUSTER_UPDATE_TYPES.QUICK_ARTIFACT:
              const artifactConfig = {
                version: this.form.jobDefinition.version,
                url: `http://${this.form.jobDefinition.jobJarFileLocation}`,
                skipsubmit: !this.form.shouldAutomaticallySubmit,
              };
              response = await store.dispatch(
                ActionTypes.UpdateJobClusterQuickArtifact,
                { clusterId, artifactConfig },
              );
              break;
            case JOB_CLUSTER_UPDATE_TYPES.QUICK_SLA:
              const slaConfig = {
                min: this.form.jobDefinition.sla.min,
                max: this.form.jobDefinition.sla.max,
                cronspec: this.form.jobDefinition.sla.cronSpec,
                cronpolicy: this.form.jobDefinition.sla.cronPolicy,
                forceenable: this.form.shouldForceEnable,
              };
              response = await store.dispatch(
                ActionTypes.UpdateJobClusterQuickSla,
                { clusterId, slaConfig },
              );
              break;
            case JOB_CLUSTER_UPDATE_TYPES.QUICK_MIGRATION_STRATEGY:
              const migrationConfig = {
                migrationConfig: this.form.jobDefinition.migrationConfig,
              };
              response = await store.dispatch(
                ActionTypes.UpdateJobClusterQuickMigrationStrategy,
                { clusterId, migrationConfig },
              );
              break;
            case JOB_CLUSTER_UPDATE_TYPES.QUICK_LABEL:
              const labels = this.form.jobDefinition.labels;
              response = await store.dispatch(
                ActionTypes.UpdateJobClusterQuickLabel,
                { clusterId, labels },
              );
              break;
            default:
              console.debug(
                'JobClusterUpdatePage: Update type not matched to submit',
              );
          }
          if (response && !response.errors) {
            this.$router.push({ path: `/clusters/${clusterId}` }, () => {
              this.$message.success(
                `Successfully updated job cluster ${clusterId}`,
              );
            });
          } else {
            this.$scrollTo(updateClusterForm.$el, {
              offset: -200,
            });
          }
        } else {
          const firstErrorField = invalidObject[Object.keys(invalidObject)[0]];
          if (firstErrorField.length) {
            this.$message.error(
              `Unable to update job cluster due to error: ${
                firstErrorField[0].message
              }`,
            );
          } else {
            this.$message.error(
              `Unable to update job cluster. Check form above for errors.`,
            );
          }
          return false;
        }
      });
    },
    onClose() {
      this.$router.push(`/clusters/${this.clusterId}`);
    },
  },
};
</script>

<style lang="scss" module>
.box-card {
  margin: 1em;
}
</style>
