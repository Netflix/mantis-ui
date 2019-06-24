<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Job Cluster Name</div>
    <div>
      <el-form-item label="Job Cluster Name" :prop="formPropPath" :rules="rules">
        <el-input
          :value="clusterId"
          :maxlength="inputMaxLength"
          autofocus
          @input="$emit('update:clusterId', $event)"
        />
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Card, FormItem, Input } from 'element-ui';

export default {
  name: 'JobClusterIdFormCard',

  components: {
    [Card.name]: Card,
    [Input.name]: Input,
    [FormItem.name]: FormItem,
  },

  props: {
    clusterId: {
      type: String,
      required: true,
    },
    formPropPath: {
      type: String,
      default: null,
    },
  },

  data() {
    const validateJobClusterId = (rule, value, callback) => {
      const pattern = /^[A-Za-z]+[A-Za-z0-9+-_=:;]*/;
      if (!pattern.test(value)) {
        callback(
          new Error(`Cluster name must this regular expression ${pattern}`),
        );
      } else {
        callback();
      }
    };

    return {
      inputMaxLength: 100,
      rules: [
        {
          required: true,
          message: 'Please input a cluster name',
          trigger: 'blur',
        },
        {
          validator: validateJobClusterId,
          trigger: 'blur',
        },
      ],
    };
  },
};
</script>

<style lang="scss" module>
</style>
