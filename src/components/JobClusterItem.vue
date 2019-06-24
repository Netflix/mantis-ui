<template>
  <div
    v-if="cluster"
    class="flex layout horizontal justified center"
    :class="$style['job-cluster-item']"
  >
    <div>
      <router-link tag="a" :to="`/clusters/${cluster.name}`">
        {{ cluster.name }}
      </router-link>
      <SpecialLabels :labels="cluster.labels" @on-tag-click="onTagClick" />
    </div>
    <div>
      <el-tag
        v-if="cluster.disabled"
        :disable-transitions="true"
        type="danger"
        size="mini"
        :class="$style['job-tag']"
      >
        v<strong>{{ cluster.latestVersion }}</strong> (Disabled)
      </el-tag>
      <el-tag v-else type="info" size="mini" :class="$style['job-tag']" :disable-transitions="true">
        v<strong>{{ cluster.latestVersion }}</strong>
      </el-tag>
    </div>
  </div>
</template>

<script>
import { Tag } from 'element-ui';
import SpecialLabels from '@/components/SpecialLabels';

export default {
  name: 'JobClusterItem',

  components: {
    [Tag.name]: Tag,
    SpecialLabels,
  },

  props: {
    cluster: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onTagClick({ tag }) {
      this.$emit('on-tag-click', { tag });
    },
  }
};
</script>

<style lang="scss" module>
a {
  margin-right: 10px;
}

.job-cluster-item {
  padding: 0.5em;
  border-radius: var(--large-border-radius);
  &:hover {
    background-color: var(--neutral-100);
  }
}
</style>
