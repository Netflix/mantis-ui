<template>
  <span>
    <el-tag
      v-for="tag in specialTags"
      :key="tag.name"
      :disable-transitions="true"
      :type="tag.labelType"
      size="mini"
      :class="$style['job-tag']"
      @click="onTagClick(tag)"
    >
      <font-awesome-icon :icon="tag.icon" />
      {{ tag.name }}
    </el-tag>
  </span>
</template>

<script>
import { Tag } from 'element-ui';
export default {
  name: 'SpecialLabels',

  components: {
    [Tag.name]: Tag,
  },

  props: {
    labels: {
      type: Array,
      required: true,
    },
  },

  computed: {
    specialTags: function() {
      const specialTags = [];
      const labels = this.labels;
      const isSourceJob = labels.some(label => {
        return label.name === '_mantis.jobType' && label.value === 'source';
      });

      if (isSourceJob) {
        specialTags.push({
          labelType: 'info',
          icon: 'sitemap',
          name: 'Source Job',
          labelName: '_mantis.jobType',
          labelValue: 'source',
        });
      }

      const isCriticalityMedium = labels.some(label => {
        return label.name === '_mantis.criticality' && label.value === 'medium';
      });
      if (isCriticalityMedium) {
        specialTags.push({
          labelType: 'warning',
          icon: 'rocket',
          name: 'Crit: Medium',
          labelName: '_mantis.criticality',
          labelValue: 'medium',
        });
      }

      const isCriticalityHigh = labels.some(label => {
        return label.name === '_mantis.criticality' && label.value === 'high';
      });
      if (isCriticalityHigh) {
        specialTags.push({
          labelType: 'danger',
          icon: 'rocket',
          name: 'Crit: High',
          labelName: '_mantis.criticality',
          labelValue: 'high',
        });
      }

      return specialTags;
    },
  },

  methods: {
    onTagClick(tag) {
      this.$emit('on-tag-click', { tag });
    },
  },
};
</script>

<style lang="scss" module>
.job-tag {
  margin: 0 0.2em;
  cursor: pointer;
}
</style>
