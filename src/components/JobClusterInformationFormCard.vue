<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Job Cluster Basic Information</div>
    <div>
      <el-form-item label="Job Cluster Name">{{ clusterId }}</el-form-item>

      <el-form-item label="Job Cluster Version">
        <el-select
          :value="clusterVersion"
          placeholder="Please select an artifact version"
          class="stretch-x"
          filterable
          @change="onJobClusterVersionSelect"
        >
          <el-option
            v-for="option in availableJobArtifactVersions"
            :key="option"
            :label="option"
            :value="option"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Card, FormItem, Option, Select } from 'element-ui';

export default {
  name: 'JobClusterInformationFormCard',

  components: {
    [Card.name]: Card,
    [Select.name]: Select,
    [Option.name]: Option,
    [FormItem.name]: FormItem,
  },

  props: {
    clusterId: {
      type: String,
      required: true,
    },
    clusterVersion: {
      type: String,
      required: true,
    },
    availableJobArtifactVersions: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onJobClusterVersionSelect(version) {
      this.$emit('on-job-cluster-version-select', version);
    },
  },
};
</script>

<style lang="scss" module>
</style>
