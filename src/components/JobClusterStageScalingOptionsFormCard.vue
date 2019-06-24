<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      <font-awesome-icon icon="cog"/>
      <font-awesome-icon icon="arrows-alt-h"/>
      <font-awesome-icon icon="cog"/>
      <font-awesome-icon icon="cog"/>
      -
      Stage {{ stageNumber }} - Autoscale
    </div>
    <div>
      <el-radio-group v-model="stageScalingPolicy">
        <el-radio label="noScaling">Disable Scaling</el-radio>
        <el-radio label="manualScaling">Enable Manual Scaling</el-radio>
        <el-radio label="autoScaling">Enable Auto Scale</el-radio>
      </el-radio-group>
      <div v-if="stageScalingPolicy === 'autoScaling'" class="spacing">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="Basic Options" name="basic">
            <JobClusterStageScalingBasicOptions :stage="stage"/>
          </el-collapse-item>
          <el-collapse-item title="Strategies" name="listStrategies">
            <JobClusterStageScalingStrategiesList :stage="stage" :scaling-reasons="scalingReasons"/>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </el-card>
</template>

<script>
import { Card, Collapse, CollapseItem, Radio, RadioGroup } from 'element-ui';
import JobClusterStageScalingBasicOptions from '@/components/JobClusterStageScalingBasicOptions';
import JobClusterStageScalingStrategiesList from '@/components/JobClusterStageScalingStrategiesList';
import { DEFAULT_SCALING_POLICY } from '@/utils/constants';
export default {
  name: 'JobClusterStageScalingOptionsFormCard',

  components: {
    [Card.name]: Card,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    JobClusterStageScalingBasicOptions,
    JobClusterStageScalingStrategiesList,
  },

  props: {
    stageNumber: {
      type: Number,
      required: true,
    },
    stage: {
      type: Object,
      required: true,
    },
    scalingReasons: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      activeNames: ['basic', 'listStrategies'],
      showBasicHelp: false,
      showStrategiesHelp: false,
      cachedScalingPolicy: null,
    };
  },

  computed: {
    stageScalingPolicy: {
      get() {
        if (this.stage.scalable && !this.stage.scalingPolicy) {
          return 'manualScaling';
        } else if (
          this.stage.scalable &&
          this.stage.scalingPolicy &&
          this.stage.scalingPolicy.enabled
        ) {
          return 'autoScaling';
        }
        return 'noScaling';
      },
      set(scalingType) {
        const clearScalingPolicyAndUpdateCache = () => {
          this.cachedScalingPolicy = this.stage.scalingPolicy
            ? this.stage.scalingPolicy
            : this.cachedScalingPolicy;
          this.stage.scalingPolicy = null;
        };

        switch (scalingType) {
          case 'noScaling':
            this.stage.scalable = false;
            clearScalingPolicyAndUpdateCache();
            break;
          case 'manualScaling':
            this.stage.scalable = true;
            clearScalingPolicyAndUpdateCache();
            break;
          case 'autoScaling':
            this.stage.scalable = true;
            this.stage.scalingPolicy = this.cachedScalingPolicy
              ? this.cachedScalingPolicy
              : DEFAULT_SCALING_POLICY();
            this.stage.scalingPolicy.enabled = true;
            break;
          default:
            console.debug(
              'JobClusterStageScalingOptionsCard: Scaling type not matched',
            );
        }
      },
    },
  },
};
</script>

<style lang="scss" module>
</style>
