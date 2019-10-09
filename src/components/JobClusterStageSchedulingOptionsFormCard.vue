<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      <span v-if="isMasterStage">Job Master - </span>Stage {{ stageNumber }} - Scheduling Information -
      <el-checkbox v-model="isEditable" border>Edit</el-checkbox>
    </div>
    <div v-if="!isEditable">
      <el-alert
        v-if="isMasterStage"
        title="Default settings are probably OK here."
        type="info"
        show-icon
      ></el-alert>
      <div :class="$style['stage-worker-widget']">
        # Workers: <strong>{{ stage.numberOfInstances }}</strong><br>
        CPUs: <strong>{{ stage.machineDefinition.cpuCores }}</strong>
        <el-divider direction="vertical" />
        <font-awesome-icon v-for="n in stage.machineDefinition.cpuCores" :key="n" :class="$style['lightning-bolt']" icon="bolt"/>
        <br>
        RAM: <strong>{{ stage.machineDefinition.memoryMB }} MB</strong><br>
        Disk: <strong>{{ stage.machineDefinition.diskMB }} MB</strong><br>
        Network: <strong>{{ stage.machineDefinition.networkMbps }} MB</strong>
      </div>
    </div>
    <div v-else>
      <el-form-item label="Number of workers">
        <span v-if="isMasterStage">{{ stage.numberOfInstances }}</span>
        <el-input-number v-else v-model="stage.numberOfInstances" :min="defaults.numWorkers.min" :max="defaults.numWorkers.max" />
      </el-form-item>

      <el-form-item label="CPU Core(s)">
        <el-input-number v-model="stage.machineDefinition.cpuCores" :min="defaults.cpuCores.min" :max="defaults.cpuCores.max" :step="0.1" />
      </el-form-item>

      <el-form-item label="Memory (MB)">
        <el-input-number v-model="stage.machineDefinition.memoryMB" :min="defaults.memoryMB.min" :max="defaults.memoryMB.max"  />
      </el-form-item>

      <el-form-item label="Disk (MB)">
        <el-input-number v-model="stage.machineDefinition.diskMB" :min="defaults.diskMB.min" :max="defaults.diskMB.max" />
      </el-form-item>

      <el-form-item label="Network (Mbps)">
        <el-input-number v-model="stage.machineDefinition.networkMbps" :min="defaults.networkMbps.min" :max="defaults.networkMbps.max" />
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import {
  Alert,
  Card,
  Checkbox,
  Divider,
  FormItem,
  InputNumber,
} from 'element-ui';

export default {
  name: 'JobClusterStageSchedulingOptionsFormCard',

  components: {
    [Card.name]: Card,
    [Alert.name]: Alert,
    [Checkbox.name]: Checkbox,
    [InputNumber.name]: InputNumber,
    [Divider.name]: Divider,
    [FormItem.name]: FormItem,
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
  },

  data() {
    return {
      isEditable: false,
      defaults: {
        numWorkers: {
          min: 1,
          max: 1000,
        },
        cpuCores: {
          min: 1,
          max: 8,
        },
        memoryMB: {
          min: 1,
          max: 28000,
        },
        diskMB: {
          min: 1,
          max: 20000,
        },
        networkMbps: {
          min: 1,
          max: 1024,
        },
      },
    }
  },

  computed: {
    isMasterStage() {
      return this.stageNumber === 0;
    },
  },
};
</script>

<style lang="scss" module>
.stage-worker-widget {
  width: fit-content;
  text-align:left;
  font-size: var(--text-1);
  border-radius: var(--large-border-radius);
  color: var(--element-success-color);
  border: 1px solid rgba(64,158,255,.2);
  border-color: rgba(103,194,58,.2);
  background-color: rgba(103,194,58,.1);
  padding: 0.5em;
  margin: 0.5em;
  line-height:1.3em;
}

.lightning-bolt {
  padding-right: 0.1em;
  color: var(--yellow-500);
}
</style>
