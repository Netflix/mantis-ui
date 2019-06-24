<template>
  <div>
    <div>
      <span>
        Stage
        <strong>{{ stageNumber }}</strong>:&nbsp;
      </span>
      <span>
        <el-tag type="primary" :disable-transitions="true">
          CPUs:
          <strong>{{ stage.machineDefinition.cpuCores }}</strong>&nbsp;
          <font-awesome-icon
            v-for="n in stage.machineDefinition.cpuCores"
            :key="n"
            :class="$style['lightning-bolt']"
            icon="bolt"
          />&nbsp;RAM:
          <strong>{{ stage.machineDefinition.memoryMB }} MB</strong> -
          Disk:
          <strong>{{ stage.machineDefinition.diskMB }} MB</strong> -
          Net:
          <strong>{{ stage.machineDefinition.networkMbps }} Mbps</strong>
        </el-tag>
        <span>
          &nbsp;x
          <strong>{{ stage.numberOfInstances}}</strong>
        </span>
      </span>
    </div>
    <div v-if="stage.scalable" class="vertical-spacing-small">
      <span>
        <el-tag  v-if="stage.scalable" size="mini" :disable-transitions="true">
          <font-awesome-icon icon="cog"/>
          <font-awesome-icon icon="arrows-alt-h"/>
          <font-awesome-icon icon="cog"/>
          <font-awesome-icon icon="cog"/>&nbsp;Manual Scale Enabled
        </el-tag>
        <el-tag v-if="stage.scalingPolicy" size="mini" :disable-transitions="true" class="horizontal-spacing-small">
          <font-awesome-icon icon="cog"/>
          <font-awesome-icon icon="arrows-alt-h"/>
          <font-awesome-icon icon="cog"/>
          <font-awesome-icon icon="cog"/>&nbsp;Autoscale Enabled
        </el-tag>
      </span>
    </div>

    <AutoscaleSettingsSummary v-if="stage.scalingPolicy" :scaling-policy="stage.scalingPolicy"/>

    <AutoscaleStrategiesSummary
      v-if="stage.scalingPolicy && stage.scalingPolicy.strategies"
      :strategies="stage.scalingPolicy.strategies"
    />

    <div
      v-for="hardConstraint in stage.hardConstraints"
      :key="hardConstraint"
    >Hard Constraint: {{hardConstraint}}</div>

    <div
      v-for="softConstraint in stage.softConstraints"
      :key="softConstraint"
    >Soft Constraint: {{softConstraint}}</div>
  </div>
</template>

<script>
import { Tag } from 'element-ui';
import AutoscaleSettingsSummary from '@/components/AutoscaleSettingsSummary';
import AutoscaleStrategiesSummary from '@/components/AutoscaleStrategiesSummary';

export default {
  name: 'JobClusterStageDetail',

  components: {
    [Tag.name]: Tag,
    AutoscaleSettingsSummary,
    AutoscaleStrategiesSummary,
  },

  props: {
    stageNumber: {
      type: String,
      required: true,
    },
    stage: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.lightning-bolt {
  padding-right: 0.1em;
  color: var(--yellow-500);
}
</style>
