<template>
  <el-row
    class="layout horizontal center"
    :gutter="10"
  >
    <el-col :span="6">
      <el-input size="mini" :value="labelKey" readonly></el-input>
    </el-col>
    <el-col :span="6">
      <el-form-item v-if="shouldSelectOptions" label-width="0" :rules="inputRule" :prop="formPropPath" :class="$style['label-value-item']">
        <el-select
          v-model="localLabelValue"
          size="mini"
          class="stretch-x"
          placeholder
          @change="onChangeLabel(labelKey, localLabelValue)"
        >
          <el-option
            v-for="item in jobLabelsJson[labelKey].defaultOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-else label-width="0" :rules="inputRule" :prop="formPropPath" :class="$style['label-value-item']">
        <el-input v-model="localLabelValue" size="mini" @change="onChangeLabel(labelKey, localLabelValue)"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <i
        v-if="!isRequiredLabel"
        class="el-icon-delete spacing-small"
        :class="$style['delete-icon']"
        @click="deleteLabel(labelKey, localLabelValue)"
      ></i>
      <el-tag
        v-if="jobLabelsJson[labelKey].recommended"
        type="warning"
        class="spacing-small"
      >Recommended</el-tag>
      <el-tag v-if="isRequiredLabel" type="danger" class="spacing-small">Required</el-tag>
      <span class="spacing-small">{{ jobLabelsJson[labelKey].description }}</span>
    </el-col>
  </el-row>
</template>

<script>
import { Col, FormItem, Input, Option, Row, Select, Tag } from 'element-ui';
import { JOB_LABELS } from '@/utils/constants';

export default {
  name: 'JobClusterLabelsPair',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    [FormItem.name]: FormItem,
  },

  props: {
    labelKey: {
      type: String,
      required: true,
    },
    labelValue: {
      type: String,
      required: true,
    },
    formPropPath: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      jobLabelsJson: JOB_LABELS,
      localLabelValue: this.labelValue,
    };
  },

  computed: {
    shouldSelectOptions() {
      return JOB_LABELS[this.labelKey].defaultOptions;
    },
    isRequiredLabel() {
      return JOB_LABELS[this.labelKey].required;
    },
    inputRule() {
      return {
        required: this.isRequiredLabel,
        message: 'label value required',
        trigger: this.shouldSelectOptions ? 'change' : 'blur',
      };
    },
  },

  methods: {
    deleteLabel(labelKey, labelValue) {
      const label = {
        name: labelKey,
        value: labelValue,
      };
      this.$emit('on-delete-label', { label });
    },
    onChangeLabel(labelKey, labelValue) {
      const label = {
        name: labelKey,
        value: labelValue,
      };
      this.$emit('on-update-label', { label });
    },
  },
};
</script>

<style lang="scss" module>
.delete-icon {
  color: var(--red-500);
  cursor: pointer;
}
.label-value-item {
  margin-bottom: 0 !important;
}
</style>
