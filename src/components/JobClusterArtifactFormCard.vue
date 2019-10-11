<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Mantis Artifact Version and Filename</div>
    <div>
      <div v-if="latestArtifact">
        <el-form-item label="Last Artifact File">{{ formatFileNameFromPath(latestArtifact.url) }}</el-form-item>
        <el-form-item label="Last Version">{{ latestArtifact.version }}</el-form-item>
      </div>
      <el-form-item label="Artifact File" required>
        <span v-if="isLoadingJobArtifacts">
          <i class="el-icon-loading"></i> Loading Artifacts From S3...
        </span>
        <div v-else>
          <el-select
            :value="artifactName"
            placeholder="Please select an artifact"
            class="stretch-x"
            filterable
            @change="onArtifactSelect"
          >
            <el-option
              v-for="option in availableJobArtifacts"
              :key="option"
              :label="option"
              :value="option"
            ></el-option>
          </el-select>
          <el-button
            v-if="latestArtifact"
            class="top-spacing-small"
            type="primary"
            size="mini"
            @click="autoSelectTheLastArtifactFile"
          >Auto-select the Last Artifact File</el-button>
        </div>
      </el-form-item>
      <el-form-item label="Version" required>
        <el-input :value="version" @input="onVersionInput"/>
      </el-form-item>
      <el-form-item label="Upload File">
        <el-switch v-model="showUploadControls"/>
      </el-form-item>
      <el-form-item v-if="showUploadControls" v-loading="isUploadingJobArtifact">
        <el-upload
          drag
          action="none"
          accept=".json, .zip"
          :file-list="fileList"
          :http-request="uploadFile"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drop both json and zip file here or
            <em>click to upload them individually</em>
          </div>
        </el-upload>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import {
  Button,
  Card,
  FormItem,
  Input,
  Option,
  Select,
  Switch,
  Upload } from 'element-ui';
import formatFileNameFromPath from '@/utils/format-file-name-from-path';

export default {
  name: 'JobClusterArtifactFormCard',

  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    [Input.name]: Input,
    [Switch.name]: Switch,
    [Select.name]: Select,
    [Option.name]: Option,
    [Upload.name]: Upload,
    [FormItem.name]: FormItem,
  },

  props: {
    artifactName: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    availableJobArtifacts: {
      type: Array,
      required: true,
    },
    isLoadingJobArtifacts: {
      type: Boolean,
      required: true,
    },
    isUploadingJobArtifact: {
      type: Boolean,
      required: true,
    },
    latestArtifact: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      fileList: [],
      showUploadControls: false,
    };
  },

  methods: {
    onArtifactSelect(artifactName) {
      this.$emit('update:artifactName', artifactName);
      this.$emit('on-artifact-select', artifactName);
    },
    autoSelectTheLastArtifactFile() {
      this.onArtifactSelect(formatFileNameFromPath(this.latestArtifact.url));
    },
    onVersionInput(version) {
      this.$emit('update:version', version);
    },
    uploadFile({ file }) {
      this.$emit('on-upload-file', { file });
    },
    formatFileNameFromPath,
  },
};
</script>

<style lang="scss" module>
</style>
