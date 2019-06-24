<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Job Cluster Submit Options</div>
    <div>
      <el-alert
        v-if="isEnabled"
        title="Quick Submit will submit a copy of the most recently submitted job in that region"
        class="spacing-small"
        type="info"
        show-icon
      ></el-alert>
      <el-alert
        v-else
        title="Standard Submit is the default behavior with all options"
        class="spacing-small"
        type="info"
        show-icon
      ></el-alert>
      <el-form-item label="Submit Type">
        <el-switch
          :value="isEnabled"
          active-text="Quick Submit"
          inactive-text="Standard Submit"
          @change="onToggle"
        ></el-switch>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Alert, Card, FormItem, Switch } from 'element-ui';

export default {
  name: 'QuickSubmitFormCard',

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
      this.$emit('update:isEnabled', isEnabled);
    },
  }
};
</script>

<style lang="scss" module>
</style>
