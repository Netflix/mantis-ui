<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix"><font-awesome-icon icon="clock" />&nbsp;SLA Options</div>
    <div>
      <el-form-item label="SLA Min/Max" :prop="formPropPath" :rules="slaRule">
        <el-input-number v-model="sla.min" :min="0" :max="slaUpperLimit"/>
        <el-divider direction="vertical">/</el-divider>
        <el-input-number v-model="sla.max" :min="0" :max="slaUpperLimit"/>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="Show Cron options">
        <el-switch :value="cronActive" @change="onToggleCronActive" />
      </el-form-item>

      <div v-if="cronActive">
        <el-form-item label="Cron Spec" :prop="`${formPropPath}.cronSpec`" :rules="cronSpecRule">
          <el-tooltip
            effect="dark"
            content="Seconds (0-59) Minutes (0-59) Hours (0-23) Day of month (1-31) Month (1-12) Day of week (1-7) Year (1970-2099)"
          >
            <el-input
              v-model="sla.cronSpec"
              placeholder="0 0 0 0 0 ?"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Cron Policy">
          <el-select v-model="sla.cronPolicy">
            <el-option
              v-for="option in CRON_POLICY_OPTIONS"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item v-if="showForceEnableControls" label="Force Enable">
        <el-switch :value="shouldForceEnable" @change="onToggleForceEnable" />
        &nbsp;
        <el-tag type="info">Force Enable if the job cluster is disabled</el-tag>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import {
  Card,
  Divider,
  FormItem,
  Input,
  InputNumber,
  Option,
  Select,
  Switch,
  Tag,
  Tooltip,
} from 'element-ui';
import { CRON_POLICY_OPTIONS } from '@/utils/constants';

export default {
  name: 'ClusterSlaOptionsFormCard',

  components: {
    [Card.name]: Card,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Switch.name]: Switch,
    [Tag.name]: Tag,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tooltip.name]: Tooltip,
    [Divider.name]: Divider,
    [FormItem.name]: FormItem,
  },

  props: {
    sla: {
      type: Object,
      required: true,
    },
    cronActive: {
      type: Boolean,
      required: false,
    },
    formPropPath: {
      type: String,
      required: true,
    },
    showForceEnableControls: {
      type: Boolean,
      required: true,
    },
    shouldForceEnable: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    const validateSla = (rule, { min, max }, callback) => {
      if (min > max) {
        callback(
          new Error(
            `SLA min of ${min} can not be greater than SLA max of ${max}`,
          ),
        );
      } else {
        callback();
      }
    };

    return {
      slaUpperLimit: 1000,
      CRON_POLICY_OPTIONS,
      cronSpecRule: {
        required: true,
        message: 'Cron spec required',
        trigger: 'blur',
      },
      slaRule: {
        validator: validateSla,
        trigger: 'change'
      },
    };
  },

  methods: {
    onToggleCronActive(cronActive) {
      if (cronActive) {
        this.sla.cronPolicy = CRON_POLICY_OPTIONS[0].value;
        this.sla.cronSpec = null;
      } else {
        this.sla.cronPolicy = null;
        this.sla.cronSpec = null;
      }
      this.$emit('update:cronActive', cronActive);
    },
    onToggleForceEnable(shouldForceEnable) {
      this.$emit('update:shouldForceEnable', shouldForceEnable);
    },
  }
};
</script>

<style lang="scss" module>
</style>
