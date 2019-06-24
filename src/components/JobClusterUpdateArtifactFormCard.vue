<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Mantis Artifact Version and Filename</div>
    <div>
      <el-form-item label="Last Artifact File">{{ formatFileNameFromPath(latestJar.url) }}</el-form-item>
      <el-form-item label="Last Version">{{ latestJar.version }}</el-form-item>
      <el-form-item label="New Artifact File" required></el-form-item>
      <el-form-item label="New Version"></el-form-item>
    </div>
  </el-card>
</template>

<script>
import formatFileNameFromPath from '@/utils/format-file-name-from-path';

export default {
  name: 'JobClusterUpdateArtifactFormCard',

  props: {
    latestJar: {
      type: Object,
      required: true,
    },
    // lastArtifactFileUrl: {
    //   type: String,
    //   required: true,
    // },
    // lastArtifactVersion: {
    //   type: String,
    //   required: true,
    // },
  },

  methods: {
    formatFileNameFromPath,
  },
};
</script>

<style lang="scss" module>
</style>
