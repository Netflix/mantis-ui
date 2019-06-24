<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix"><font-awesome-icon icon="clock" />&nbsp;Job Master</div>
    <div>
      <el-alert
        title="Must be enabled to allow manual / auto scaling."
        class="spacing-small"
        type="info"
        show-icon
      ></el-alert>
      <el-form-item label="Enable Job Master">
        <el-switch :value="isEnabled" @change="onToggle" />
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Alert, Card, FormItem, Switch } from 'element-ui';
import { format } from 'date-fns';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';

export default {
  name: 'EnableJobMasterFormCard',

  components: {
    [Card.name]: Card,
    [Alert.name]: Alert,
    [Switch.name]: Switch,
    [FormItem.name]: FormItem,
  },

  props: {
    isEnabled: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    onToggle(isEnabled) {
      this.$emit('on-toggle-job-master', isEnabled);
      this.$emit('update:isEnabled', isEnabled);
    },
  },
};
</script>

<style lang="scss" module>
</style>
