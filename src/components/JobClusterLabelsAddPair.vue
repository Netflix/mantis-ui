<template>
  <div>
    <el-divider></el-divider>
    <el-row class="layout horizontal center" :gutter="10">
      <el-col :span="6">
        <el-select v-model="labelKey" class="stretch-x" size="mini" placeholder="Select a new label to add">
          <el-option
            v-for="item in labelsNotYetAdded"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-if="shouldRenderSelectBox" v-model="labelValue" size="mini" class="stretch-x" placeholder="Select label value">
          <el-option
            v-for="item in labelValueOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-input v-else v-model="labelValue" size="mini" placeholder="Input label value"></el-input>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" type="primary" :disabled="!labelKey || !labelValue" @click="addNewLabel">Add New Label</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Button, Col, Divider, Input, Option, Row, Select } from 'element-ui';
import { JOB_LABELS } from '@/utils/constants';

export default {
  name: 'JobClusterLabelsAddPair',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Divider.name]: Divider,
  },

  props: {
    labels: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      labelKey: '',
      labelValue: '',
    };
  },

  computed: {
    labelsNotYetAdded() {
      return Object.keys(JOB_LABELS)
      .filter(key => !this.labels.some(label => label.name === key))
      .map(key => {
        return {
          name: key,
          value: '',
        };
      });
    },
    shouldRenderSelectBox() {
      const label = JOB_LABELS[this.labelKey];
      if (label && label.defaultOptions) {
        return true;
      }
      return false;
    },
    labelValueOptions() {
      const label = JOB_LABELS[this.labelKey];
      if (label && label.defaultOptions) {
        return label.defaultOptions;
      }
      return [];
    },
  },

  methods: {
    addNewLabel() {
      const label = {
        name: this.labelKey,
        value: this.labelValue,
      };
      this.reset();
      this.$emit('on-add-new-label', { label });
    },
    reset() {
      this.labelKey = '';
      this.labelValue = '';
    },
  },
};
</script>

<style lang="scss" module>
</style>
