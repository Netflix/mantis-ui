<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">SLA Options</div>
    <div>
      <el-form-item label="SLA Min / Max">
        <strong>{{ minSla }}</strong> /
        <strong>{{ maxSla }}</strong>
        &nbsp;
        <el-tag type="info">Min/Max number of instances of this job to keep running</el-tag>
      </el-form-item>

      <el-form-item label="Min Runtime">
        <el-input-number :value="minRuntimeSecs" :min="0" @change="$emit('update:minRuntimeSecs', $event)" />&nbsp;
        <el-tag type="info">Minimum number of seconds for this job to run. 0 is disabled</el-tag>
      </el-form-item>

      <el-form-item label="Max Runtime">
        <el-input-number :value="runtimeLimitSecs" :min="0" @change="$emit('update:runtimeLimitSecs', $event)"/>&nbsp;
        <el-tag type="info">Job will be auto-killed after this number of seconds. 0 is disabled</el-tag>
      </el-form-item>

      <el-form-item label="Transient Job">
        <el-switch :value="isTransientJob" @change="onToggleTranscientJob"></el-switch>&nbsp;
        <el-tag type="info">Job will complete after 5 minutes without an active subscription</el-tag>
      </el-form-item>

      <el-form-item label="User Provided Type">
        <el-input
          :class="$style['user-provided-type-input']"
          :value="userProvidedType"
          @input="$emit('update:userProvidedType', $event)"
        />&nbsp;
        <el-tag type="info">Takes an escaped JSON such as {\"unique\":\"abc\"}</el-tag>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import {
  Card,
  FormItem,
  Input,
  InputNumber,
  Switch,
  Tag,
} from 'element-ui';

export default {
  name: 'JobSlaOptionsFormCard',

  components: {
    [Card.name]: Card,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Switch.name]: Switch,
    [Tag.name]: Tag,
    [FormItem.name]: FormItem,
  },

  props: {
    minSla: {
      type: Number,
      required: true,
    },
    maxSla: {
      type: Number,
      required: true,
    },
    minRuntimeSecs: {
      type: Number,
      required: true,
    },
    runtimeLimitSecs: {
      type: Number,
      required: true,
    },
    isTransientJob: {
      type: Boolean,
      required: true,
    },
    userProvidedType: {
      type: String,
      required: true,
    },
  },

  methods: {
    onToggleTranscientJob(isTransientJob) {
      this.$emit('on-toggle-transient-job', isTransientJob);
      this.$emit('update:isTransientJob', isTransientJob);
    },
  },
};
</script>

<style lang="scss" module>
.user-provided-type-input {
  width: 200px;
}
</style>
