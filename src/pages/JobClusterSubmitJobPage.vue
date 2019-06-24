<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/clusters' }">Clusters</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/clusters/${clusterId}` }">Cluster Detail</el-breadcrumb-item>
      <el-breadcrumb-item>Cluster Job Submit</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>Submit a Job</h1>
    <h4>
      Submit
      <span class="primary-text">{{ clusterId }} {{ form.version }}</span>
    </h4>

    <el-form
      ref="submitJobForm"
      v-loading="isLoading"
      status-icon
      :model="form"
      :rules="rules"
      :label-width="formLabelWidth"
      size="mini"
      class="text-left"
    >
      <JobClusterInformationFormCard
        :class="$style['box-card']"
        :cluster-id="clusterId"
        :cluster-version="form.version"
        :available-job-artifact-versions="availableJobArtifactVersions"
        @on-job-cluster-version-select="onJobClusterVersionSelect"
      />

      <QuickSubmitFormCard
        v-if="form.isQuickSubmitSupported"
        :class="$style['box-card']"
        :is-enabled.sync="quickSubmitEnabled"
      />

      <MantisArtifactFilesFormCard
        v-if="formReady"
        :class="$style['box-card']"
        :jar-file-name="form.jobJarFileName"
        :job-properties-file-name="form.jobPropertiesFileName"
      />

      <div v-if="!quickSubmitEnabled && formReady">
        <JobClusterJobInformationFormCard
          v-if="selectedArtifactPropertiesJson"
          :class="$style['box-card']"
          :job-properties="selectedArtifactPropertiesJson"
        />

        <JobClusterLabelsFormCard
          :class="$style['box-card']"
          form-prop-path="labels"
          :labels="form.labels"
          :user-name="form.name"
          :user-email="form.user"
        />

        <JobSlaOptionsFormCard
          :class="$style['box-card']"
          :min-sla="form.sla.min"
          :max-sla="form.sla.max"
          :min-runtime-secs.sync="form.jobSla.minRuntimeSecs"
          :runtime-limit-secs.sync="form.jobSla.runtimeLimitSecs"
          :is-transient-job.sync="form.isTransientJob"
          :user-provided-type.sync="form.jobSla.userProvidedType"
          @on-toggle-transient-job="onToggleTranscientJob"
        />

        <EnableJobMasterFormCard
          v-if="form.schedulingInfo.stages[0]"
          :class="$style['box-card']"
          :is-enabled.sync="form.enableJobMaster"
        />

        <JobClusterStageSchedulingOptionsFormCard
          v-if="form.enableJobMaster"
          :class="$style['box-card']"
          :stage-number="0"
          :stage="form.schedulingInfo.stages[0]"
        />

        <div v-for="(stage, index) in form.schedulingInfo.stages" :key="index">
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
            <OptionalJobConstraintsFormCard
              :class="$style['box-card']"
              :stage-number="parseInt(index)"
              :stage="stage"
            />
          </div>
        </div>
      </div>

      <JobParametersConfigCardFormCard
        :class="$style['box-card']"
        :show-system-params="false"
        :parameters="form.availableParameters"
        :default-parameters="form.defaultParameters"
        form-prop-path="availableParameters"
        :should-override.sync="form.shouldOverrideJobParameters"
        :disable-override-toggle="form.forceEnableJobParameters"
      />

      <JobParametersConfigCardFormCard
        :class="$style['box-card']"
        :show-system-params="true"
        :parameters="form.availableParameters"
        :default-parameters="form.defaultParameters"
        form-prop-path="availableParameters"
        :should-override.sync="form.shouldOverrideSystemParameters"
        :disable-override-toggle="form.forceEnableSystemParameters"
      />

      <SubmitOrCancelFormCard
        title="Submit or Cancel"
        :class="$style['box-card']"
        submit-text="Submit to Mantis"
        submit-icon="el-icon-s-tools"
        @on-submit="onSubmit"
        @on-close="onClose"
      >
        <el-tag type="primary" size="large">
          You are performing a
          <strong>Quick Submit</strong>
          on Job Cluster
          <strong>{{ clusterId }}</strong>,
          <strong>version {{ form.version }}</strong>
        </el-tag>
      </SubmitOrCancelFormCard>
    </el-form>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem, Form, Tag } from 'element-ui';
import store from '@/store';
import { mapState } from 'vuex';
import { ActionTypes } from '@/store/actions';
import JobClusterLabelsFormCard from '@/components/JobClusterLabelsFormCard';
import JobParametersConfigCardFormCard from '@/components/JobParametersConfigCardFormCard';
import EnableJobMasterFormCard from '@/components/EnableJobMasterFormCard';
import QuickSubmitFormCard from '@/components/QuickSubmitFormCard';
import JobClusterStageScalingOptionsFormCard from '@/components/JobClusterStageScalingOptionsFormCard';
import JobClusterStageSchedulingOptionsFormCard from '@/components/JobClusterStageSchedulingOptionsFormCard';
import MantisArtifactFilesFormCard from '@/components/MantisArtifactFilesFormCard';
import JobClusterJobInformationFormCard from '@/components/JobClusterJobInformationFormCard';
import JobClusterInformationFormCard from '@/components/JobClusterInformationFormCard';
import OptionalJobConstraintsFormCard from '@/components/OptionalJobConstraintsFormCard';
import JobSlaOptionsFormCard from '@/components/JobSlaOptionsFormCard';
import SubmitOrCancelFormCard from '@/components/SubmitOrCancelFormCard';
import { DEFAULT_SCALING_POLICY } from '@/utils/constants';
import { getScalingReasons } from '@/utils/scaling-reasons';
import formatFileNameFromPath from '@/utils/format-file-name-from-path';
import { isSystemParameter, parseParameters } from '@/utils/parameters';
export default {
  name: 'JobClusterSubmitJobPage',

  components: {
    [Form.name]: Form,
    [Tag.name]: Tag,
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
    JobClusterLabelsFormCard,
    JobClusterStageScalingOptionsFormCard,
    JobClusterStageSchedulingOptionsFormCard,
    JobParametersConfigCardFormCard,
    JobSlaOptionsFormCard,
    EnableJobMasterFormCard,
    MantisArtifactFilesFormCard,
    JobClusterInformationFormCard,
    JobClusterJobInformationFormCard,
    OptionalJobConstraintsFormCard,
    SubmitOrCancelFormCard,
    QuickSubmitFormCard,
  },

  data() {
    return {
      clusterId: this.$route.params.clusterId,
      quickSubmitEnabled: false,
      inputMaxLength: 100,
      formLabelWidth: '150px',
      formReady: false,
      availableJobArtifactVersions: [],
      form: {
        isQuickSubmitSupported: false,
        enableJobMaster: false,
        name: this.$store.state.user.name,
        user: this.$store.state.user.email,
        jobJarFileLocation: '',
        version: this.$route.query.clusterVersion,
        isTransientJob: false,
        jobSla: {
          durationType: 'Perpetual',
          runtimeLimitSecs: 0,
          minRuntimeSecs: 0,
          userProvidedType: '',
        },
        schedulingInfo: {},
        labels: [],
        availableParameters: [],
        defaultParameters: [],
        shouldOverrideJobParameters: false,
        forceEnableJobParameters: false,
        shouldOverrideSystemParameters: false,
        forceEnableSystemParameters: false,
        isReadyForJobMaster: false,
      },
      rules: {},
    };
  },

  computed: {
    ...mapState({
      isLoading: state =>
        state.jobCluster.isLoadingJobClusterDetails ||
        state.jobCluster.isLoadingJobClusterJobs ||
        state.artifact.isLoadingArtifactProperties,
      selectedJobCluster: state => state.jobCluster.selectedJobCluster,
      labels: state => {
        return state.jobCluster.selectedJobCluster
          ? state.jobCluster.selectedJobCluster.labels
          : [];
      },
      scalingReasons: state => {
        const configs = state.metadata.masterConfigs;
        return getScalingReasons(configs);
      },
      selectedArtifactPropertiesJson: state => {
        return state.artifact.selectedArtifactPropertiesJson;
      },
    }),
  },

  watch: {
    async selectedJobCluster(cluster) {
      const jar = cluster.jars.find(jar => jar.version === this.form.version);
      const allVersions = cluster.jars.map(jar => jar.version);
      if (jar) {
        const schedulingInfoCopy = JSON.parse(
          JSON.stringify(jar.schedulingInfo),
        );
        const baseResource = jar.url.replace(/(^\w+:|^)\/\//, '');
        this.form.jobJarFileName = formatFileNameFromPath(jar.url);
        this.form.jobPropertiesFileName = this.form.jobJarFileName.replace(
          /\.(jar|zip)/,
          '.json',
        );
        await store.dispatch(ActionTypes.FetchJobArtifact, {
          artifactName: this.form.jobPropertiesFileName,
        });

        const defaultParameters = cluster.parameters.map(
          (parameter, index) => {
            return {
              key: parameter.name,
              index,
              value: parameter.value,
              override: '',
            };
          },
        );
        this.form.defaultParameters = defaultParameters;

        const selectedArtifactPropertiesJson = this
          .selectedArtifactPropertiesJson;
        if (selectedArtifactPropertiesJson) {
          const parameterInfo =
            selectedArtifactPropertiesJson.jobInfo.parameterInfo;
          const parameters = Object.keys(parameterInfo).map((key, index) => {
            return {
              key,
              index,
              value: parameterInfo[key],
              override: '',
            };
          });
          const defaultJobParams = defaultParameters.filter(
            parameter => !isSystemParameter(parameter),
          );
          const defaultSystemParams = defaultParameters.filter(parameter =>
            isSystemParameter(parameter),
          );

          if (!defaultJobParams.length) {
            const jobParams = parameters.filter(
              parameter => !isSystemParameter(parameter),
            );
            if (jobParams.some(parameter => parameter.value.required)) {
              this.form.shouldOverrideJobParameters = true;
              this.form.forceEnableJobParameters = true;
            }
          }

          if (!defaultSystemParams.length) {
            const systemParameters = parameters.filter(
              parameter => isSystemParameter(parameter),
            );
            if (systemParameters.some(parameter => parameter.value.required)) {
              this.form.shouldOverrideSystemParameters = true;
              this.form.forceEnableSystemParameters = true;
            }
          }
          this.form.availableParameters = parameters;
        }

        Object.keys(schedulingInfoCopy.stages).forEach(stageKey => {
          if (stageKey !== 0) {
            const stage = schedulingInfoCopy.stages[stageKey];
            stage.scalingPolicy =
              stage.scalingPolicy || DEFAULT_SCALING_POLICY();
            stage.softConstraints = stage.softConstraints || [];
            stage.hardConstraints = stage.hardConstraints || [];
          }
        });
        this.form.schedulingInfo = schedulingInfoCopy;

        if (schedulingInfoCopy.stages[0] && cluster.isReadyForJobMaster) {
          this.form.enableJobMaster = true;
        }
      }

      this.availableJobArtifactVersions = allVersions;
      this.form.isQuickSubmitSupported =
        cluster.lastJobCount > 0 ? true : false;

      const labelsCopy = JSON.parse(JSON.stringify(cluster.labels));
      this.form.labels = labelsCopy;
      this.form.sla = {
        min: cluster.sla.min,
        max: cluster.sla.max,
      };


      this.formReady = true;
    },
  },

  created() {
    store.dispatch(ActionTypes.FetchMasterConfigs);

    store.dispatch(ActionTypes.FetchJobClusterDetails, {
      clusterId: this.clusterId,
    });
  },

  methods: {
    onJobClusterVersionSelect(version) {
      this.form.version = version;
      const jars = this.selectedJobCluster.jars;
      const artifact = jars.find(jar => jar.version === version);

      if (artifact) {
        const artifactName = artifact.url.replace(/(^\w+:|^)\/\//, '');
        this.form.jobJarFileName = formatFileNameFromPath(artifactName);
        this.form.jobPropertiesFileName = this.form.jobJarFileName.replace(
          /\.(jar|zip)/,
          '.json',
        );
        store.dispatch(ActionTypes.FetchJobArtifact, { artifactName });
      }
    },
    onSubmit() {
      const submitJobForm = this.$refs['submitJobForm'];
      submitJobForm.validate(async (valid, invalidObject) => {
        if (valid) {
          const clusterId = this.clusterId;
          const responseHandler = (data, errors) => {
            if (!errors) {
              const jobId = data.jobId.id;
              this.$router.push({ path: `/jobs/${jobId}` }, () => {
                this.$message.success(`Successfully submited job ${jobId}`);
                this.$scrollTo(submitJobForm.$el, {
                  offset: -200,
                });
              });
            } else {
              this.$scrollTo(submitJobForm.$el, {
                offset: -200,
              });
            }
          };

          if (this.quickSubmitEnabled) {
            const basicJobConfig = {
              name: clusterId,
              user: this.form.user,
              jobSla: this.form.jobSla,
            };
            const { data = {}, errors } = await store.dispatch(
              ActionTypes.QuickSubmitJob,
              { jobConfig: basicJobConfig },
            );
            responseHandler(data, errors);
          } else {
            const parameters = parseParameters(
              this.form.availableParameters,
              this.form.defaultParameters,
              this.form.shouldOverrideJobParameters,
              this.form.shouldOverrideSystemParameters,
            );
            const fileName = this.form.jobJarFileName;
            const jobConfig = {
              name: clusterId,
              user: this.form.user,
              version: this.form.version,
              jobSla: this.form.jobSla,
              schedulingInfo: this.form.schedulingInfo,
              parameters,
              isReadyForJobMaster:
                this.form.enableJobMaster &&
                this.selectedJobCluster.isReadyForJobMaster
                  ? true
                  : false,
            };
            const { data = {}, errors } = await store.dispatch(
              ActionTypes.SubmitJobForCluster,
              { clusterId, jobConfig },
            );
            responseHandler(data, errors);
          }
        } else {
          const firstErrorField = invalidObject[Object.keys(invalidObject)[0]];
          if (firstErrorField.length) {
            this.$message.error(
              `Unable to submit job due to error: ${
                firstErrorField[0].message
              }`,
            );
          } else {
            this.$message.error(
              `Unable to submit job. Check form above for errors.`,
            );
          }
          return false;
        }
      });
    },
    onClose() {
      this.$router.push(`/clusters/${this.clusterId}`);
    },
    onToggleTranscientJob(isTransientJob) {
      if (isTransientJob) {
        this.form.jobSla.durationType = 'Transient';
      } else {
        this.form.jobSla.durationType = 'Perpetual';
      }
    },
  },
};
</script>

<style lang="scss" module>
.box-card {
  margin: 1em;
}
</style>
