<template>
  <div>
    <div>
      <el-form-item label="Min/Max">
        <el-input-number v-model="stage.scalingPolicy.min"></el-input-number>
        <el-divider direction="vertical"></el-divider>
        <el-input-number v-model="stage.scalingPolicy.max"></el-input-number>
      </el-form-item>
      <el-form-item label="Increment/Decrement">
        <el-input-number v-model="stage.scalingPolicy.increment"></el-input-number>
        <el-divider direction="vertical"></el-divider>
        <el-input-number v-model="stage.scalingPolicy.decrement"></el-input-number>
      </el-form-item>
      <el-form-item label="Cooldown">
        <el-input-number v-model="stage.scalingPolicy.coolDownSecs"></el-input-number>
      </el-form-item>
    </div>
    <el-checkbox v-model="showHelp">Show Help</el-checkbox>
    <div v-if="showHelp">
      <div>
        <strong>min / max</strong> - minimum/maximum # of workers to run for this stage
      </div>
      <div>
        <strong>increment / decrement</strong> - # of workers to increment/decrement at a time when scaling up
      </div>
      <div>
        <strong>cooldown</strong> - # of seconds to wait since previous scale up/down before auto scaling again
      </div>
    </div>
  </div>
</template>

<script>
import { Checkbox, Divider, FormItem, InputNumber } from 'element-ui';

export default {
  name: 'JobClusterStageScalingBasicOptions',

  components: {
    [Checkbox.name]: Checkbox,
    [Divider.name]: Divider,
    [InputNumber.name]: InputNumber,
    [FormItem.name]: FormItem,
  },

  props: {
    stage: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showHelp: false,
    };
  },
};
</script>

<style lang="scss" module>
</style>
