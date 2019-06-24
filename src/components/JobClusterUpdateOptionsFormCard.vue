<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Job Cluster Update Options</div>
    <div>
      <el-form-item label="Job Cluster Name">{{ clusterId }}</el-form-item>
      <el-form-item label="Update Type">
        <el-radio-group v-model="localUpdateType" @change="onSelect">
          <el-radio :label="JOB_CLUSTER_UPDATE_TYPES.STANDARD"></el-radio>
          <el-radio :label="JOB_CLUSTER_UPDATE_TYPES.QUICK_ARTIFACT"></el-radio>
          <el-radio :label="JOB_CLUSTER_UPDATE_TYPES.QUICK_SLA"></el-radio>
          <el-radio :label="JOB_CLUSTER_UPDATE_TYPES.QUICK_MIGRATION_STRATEGY"></el-radio>
          <el-radio :label="JOB_CLUSTER_UPDATE_TYPES.QUICK_LABEL"></el-radio>
        </el-radio-group>
        <el-alert
          v-if="title"
          class="top-spacing"
          :title="title"
          type="info"
          :closable="false"
          show-icon
        ></el-alert>
      </el-form-item>
      <el-form-item
        v-if="localUpdateType === JOB_CLUSTER_UPDATE_TYPES.QUICK_ARTIFACT"
        label="Quick Update Options"
      >
        <el-checkbox
          v-model="localShouldAutomaticallySubmit"
          @change="onCheck"
        >Automatically submit job after Quick Artifact update</el-checkbox>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import {
  Alert,
  Card,
  Checkbox,
  FormItem,
  Radio,
  RadioGroup,
} from 'element-ui';
import { JOB_CLUSTER_UPDATE_TYPES } from '@/utils/constants';
export default {
  name: 'JobClusterUpdateOptionsFormCard',

  components: {
    [Card.name]: Card,
    [Alert.name]: Alert,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Checkbox.name]: Checkbox,
    [FormItem.name]: FormItem,
  },

  props: {
    clusterId: {
      type: String,
      required: true,
    },
    updateType: {
      type: String,
      required: true,
    },
    shouldAutomaticallySubmit: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      JOB_CLUSTER_UPDATE_TYPES,
      localUpdateType: this.updateType,
      localShouldAutomaticallySubmit: this.shouldAutomaticallySubmit,
    };
  },

  computed: {
    title() {
      let title = '';
      switch (this.updateType) {
        case JOB_CLUSTER_UPDATE_TYPES.STANDARD:
          title =
            'Standard is the default behavior and shows you all available options.';
          break;
        case JOB_CLUSTER_UPDATE_TYPES.QUICK_ARTIFACT:
          title =
            'Quickly update a Job Cluster artifact file and version without touching any other options.';
          break;
        case JOB_CLUSTER_UPDATE_TYPES.QUICK_SLA:
          title =
            "Quickly update a Job Cluster's SLA Options without touching any other options. The Job Cluster version remains the same.";
          break;
        case JOB_CLUSTER_UPDATE_TYPES.QUICK_MIGRATION_STRATEGY:
          title =
            "Quickly update a Job Cluster's Migration Strategy without touching any other options. The Job Cluster version remains the same.";
          break;
        case JOB_CLUSTER_UPDATE_TYPES.QUICK_LABEL:
          title =
            "Quickly update a Job Cluster's Labels without touching any other options. The Job Cluster version remains the same.";
          break;
        default:
          console.debug(
            'JobClusterUpdateOptionsFormCard: Update type not matched',
          );
      }
      return title;
    },
  },

  methods: {
    onSelect(updateType) {
      this.$emit('update:updateType', updateType);
      this.$emit('on-change-update-type', updateType);
    },
    onCheck(shouldAutomaticallySubmit) {
      this.$emit('update:shouldAutomaticallySubmit', shouldAutomaticallySubmit);
    },
  },
};
</script>

<style lang="scss" module>
</style>
