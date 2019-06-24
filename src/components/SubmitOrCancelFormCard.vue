<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">{{ title }}</div>
    <div>
      <el-form-item label="Summary">
        <slot></slot>
      </el-form-item>
      <el-button type="success" :icon="submitIcon" @click="onSubmit">{{ submitText }}</el-button>
      <el-button @click="onClose">Cancel / Close</el-button>
    </div>
  </el-card>
</template>

<script>
import { Button, Card, FormItem } from 'element-ui';

export default {
  name: 'SubmitOrCancelFormCard',

  components: {
    [Card.name]: Card,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
    submitIcon: {
      type: String,
      required: true,
    },
  },

  methods: {
    onSubmit() {
      this.$emit('on-submit');
    },
    onClose() {
      this.$emit('on-close');
    },
  },
};
</script>

<style lang="scss" module>
</style>
