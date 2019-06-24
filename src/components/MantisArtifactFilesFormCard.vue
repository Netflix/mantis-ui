<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Mantis Artifact Files</div>
    <div>
      <el-form-item label="Job Artifact File">{{ jarFileName }}</el-form-item>
      <el-form-item label="Job Metadata File">{{ jobPropertiesFileName }}</el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Card, FormItem } from 'element-ui';

export default {
  name: 'MantisArtifactFilesFormCard',

  components: {
    [Card.name]: Card,
    [FormItem.name]: FormItem,
  },

  props: {
    jarFileName: {
      type: String,
      required: true,
    },
    jobPropertiesFileName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
</style>
