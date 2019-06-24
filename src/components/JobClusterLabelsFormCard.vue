<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Labels</div>
    <div>
      <el-alert
        title="Labels are extra data about your Job Cluster or Job. You can add new Labels below."
        class="bottom-spacing"
        type="info"
        show-icon
      ></el-alert>
      <div v-for="(label, index) in labels" :key="label.name" :class="$style['cluster-label-item']">
        <JobClusterLabelsPair
          :label-key="label.name"
          :label-value="label.value"
          :form-prop-path="formPropPath + '.' + index + '.value'"
          @on-update-label="updatelabel"
          @on-delete-label="deleteLabel"
        />
      </div>
      <JobClusterLabelsAddPair :labels="labels" @on-add-new-label="addNewLabel"/>
    </div>
  </el-card>
</template>

<script>
import { Alert, Card } from 'element-ui';
import { JOB_LABELS } from '@/utils/constants';
import JobClusterLabelsPair from '@/components/JobClusterLabelsPair';
import JobClusterLabelsAddPair from '@/components/JobClusterLabelsAddPair';

export default {
  name: 'JobClusterLabelsFormCard',

  components: {
    [Card.name]: Card,
    [Alert.name]: Alert,
    JobClusterLabelsPair,
    JobClusterLabelsAddPair,
  },

  props: {
    labels: {
      type: Array,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    artifactFile: {
      type: String,
      default: null,
    },
    formPropPath: {
      type: String,
      required: true,
    },
  },

  created() {
    this.addRecommendedAndRequiredFields();
  },

  methods: {
    addRecommendedAndRequiredFields() {
      const labelsJson = JOB_LABELS;
      const currentLabels = this.labels;
      const newLabelsToAdd = [];
      const artifactFile = this.artifactFile || '';
      const artifactFileNoExtension = artifactFile.substring(
        0,
        artifactFile.lastIndexOf('.'),
      );
      const artifactVersion = artifactFileNoExtension.substring(
        artifactFileNoExtension.lastIndexOf('-') + 1,
      );

      if (!currentLabels.some(label => label.name === '_mantis.user')) {
        newLabelsToAdd.push({
          name: '_mantis.user',
          value: this.userName,
        });
      }

      if (!currentLabels.some(label => label.name === '_mantis.ownerEmail')) {
        newLabelsToAdd.push({
          name: '_mantis.ownerEmail',
          value: this.userEmail,
        });
      }

      if (!currentLabels.some(label => label.name === '_mantis.artifact')) {
        newLabelsToAdd.push({
          name: '_mantis.artifact',
          value: artifactFileNoExtension,
        });
      }

      if (!currentLabels.some(label => label.name === '_mantis.artifact.version')) {
        newLabelsToAdd.push({
          name: '_mantis.artifact.version',
          value: artifactVersion,
        });
      }

      // for each item in labelsJson that is recommended or required,
      // add it if it does not already exist in the arrayOfLabels
      const labelsAddedSoFar = [...this.labels, ...newLabelsToAdd];
      Object.keys(labelsJson).forEach(key => {
        if (labelsJson[key].recommended || labelsJson[key].required) {
          if (
            !labelsAddedSoFar.some(label => {
              return label.name === key;
            })
          ) {
            newLabelsToAdd.push({
              name: key,
              value: '',
            });
          }
        }
      });

      newLabelsToAdd.forEach((label) => {
        this.labels.push(label);
      });
    },
    addNewLabel({ label }) {
      this.labels.push(label);
    },
    updatelabel({ label }) {
      const index = this.labels.findIndex(
        item => item.name === label.name,
      );
      if (index >= 0) {
        this.labels[index].value = label.value;
      }
    },
    deleteLabel({ label }) {
      const index = this.labels.findIndex(
        item => item.name === label.name,
      );
      if (index >= 0) {
        this.labels.splice(index, 1);
      } else {
        console.debug('LabelsCard: Unable to find label to delete');
      }
    },
  },
};
</script>

<style lang="scss" module>
.cluster-label-item {
  margin: 0.5em 0;
}
</style>
