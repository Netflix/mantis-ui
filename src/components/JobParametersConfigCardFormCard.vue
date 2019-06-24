<template>
  <el-card shadow="hover" :body-style="bodyStyle">
    <div slot="header" class="clearfix">
      <font-awesome-icon icon="sliders-h"/>
      &nbsp;{{ title }} -
      <el-checkbox :value="shouldOverride" border :disabled="disableOverrideToggle" @change="onToggleOverride">Override Defaults</el-checkbox>
    </div>
    <div v-if="shouldOverride">
      <div v-if="filteredParams.length">
        <el-form-item
          v-for="parameter in filteredParams"
          :key="parameter.key"
          label-width="200px"
          :prop="`${formPropPath}.${parameter.index}.override`"
          :rules="calculateRule(parameter)"
        >
          <div slot="label">
            <el-tooltip class="item" effect="dark" :content="parameter.key">
              <el-tag
                type="info"
                :disable-transitions="true"
                class="top-spacing"
                :class="$style['parameter-label']"
              >{{ parameter.key }}</el-tag>
            </el-tooltip>
            <div v-if="parameter.value.required" :class="$style['parameter-label-required']">
              <i class="el-icon-warning"></i> required
            </div>
          </div>
          <div :class="$style['parameter-config']">
            <span v-if="parameter.value.parameterType === 'Boolean'">
              <el-select v-model="parameter.override" placeholder>
                <el-option label="True" value="true"/>
                <el-option label="False" value="false"/>
              </el-select>
              <br>
            </span>
            <span v-else>
              <el-input v-model="parameter.override" type="textarea" :rows="1" autosize></el-input>
            </span>
            Parameter name:
            <strong>{{ parameter.key }}</strong>
            <br>
            <span v-if="parameter.value.description">
              Description:
              <strong class="primary-text">{{ parameter.value.description }}</strong>
              <br>
            </span>
            Default Value:
            <strong>{{ parameter.value.defaultValue }}</strong>
            <br>Parameter Type:
            <strong>{{ parameter.value.parameterType }}</strong>
            <br>Validator Description:
            <strong>{{ parameter.value.validatorDescription }}</strong>
          </div>
        </el-form-item>
      </div>
      <div v-else>No parameters available to override.</div>
    </div>
    <div v-else-if="filteredDefaultParams.length">
      Default Parameters will be used:
      <div class="spacing-small">
        <div
          v-for="parameter in filteredDefaultParams"
          :key="parameter.key"
          class="vertical-spacing-small"
        >
          <strong>{{ parameter.key }}</strong>
          :
          {{ parameter.value }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import {
  Card,
  Checkbox,
  FormItem,
  Input,
  Option,
  Select,
  Tag,
  Tooltip,
} from 'element-ui';
import { isSystemParameter } from '@/utils/parameters';

export default {
  name: 'JobParametersConfigCardFormCard',

  components: {
    [Card.name]: Card,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tooltip.name]: Tooltip,
    [Checkbox.name]: Checkbox,
    [Tag.name]: Tag,
    [FormItem.name]: FormItem,
  },

  props: {
    showSystemParams: {
      type: Boolean,
      required: true,
    },
    parameters: {
      type: Array,
      required: true,
    },
    formPropPath: {
      type: String,
      required: true,
    },
    shouldOverride: {
      type: Boolean,
      required: true,
    },
    defaultParameters: {
      type: Array,
      default: null,
    },
    disableOverrideToggle: {
      type: Boolean,
      value: false,
    },
  },

  computed: {
    bodyStyle() {
      if (this.shouldOverride || this.filteredDefaultParams.length) {
        return {
          padding: '20px',
          height: 'auto',
        };
      }
      return {
        padding: '0',
        height: '0',
      };
    },
    title() {
      if (this.showSystemParams) {
        return 'System Parameters';
      }
      return 'Parameters';
    },
    filteredParams() {
      if (this.showSystemParams) {
        return this.parameters.filter(
          parameter => isSystemParameter(parameter),
        );
      }
      return this.parameters.filter(
        parameter => !isSystemParameter(parameter),
      );
    },
    filteredDefaultParams() {
      if (!this.defaultParameters) return [];

      if (this.showSystemParams) {
        return this.defaultParameters.filter(
          parameter => isSystemParameter(parameter),
        );
      }
      return this.defaultParameters.filter(
        parameter => !isSystemParameter(parameter),
      );
    },
  },

  methods: {
    onToggleOverride(shouldOverride) {
      this.$emit('update:shouldOverride', shouldOverride);
    },
    calculateRule(parameter) {
      const messagePrefix = isSystemParameter(parameter)
        ? 'System Property'
        : 'Job Property';
      const rule = {
        required: parameter.value.required ? true : false,
        message: `${messagePrefix} '${parameter.key}' is required`,
        trigger: 'change',
      };
      return rule;
    },
  },
};
</script>

<style lang="scss" module>
.parameter-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 190px;
}

.parameter-label-required {
  background: var(--element-danger-color);
  padding: 0 1em;
  color: white;
  border-radius: var(--large-border-radius);
}

.parameter-config {
  border: solid 1px var(--element-card-border-color);
  padding: 1em;
}
</style>
