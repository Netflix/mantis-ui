<template>
  <div :class="$style['worker-badge']">
    <el-tooltip
      class="item"
      effect="dark"
      placement="top-start"
      :content="`${worker.workerIndex}-${worker.workerNumber}: ${worker.state}`"
    >
      <el-tag
        :type="tagType"
        :disable-transitions="true"
        size="small"
        :class="isSelected ? $style['selected'] : ''"
        @click="handleClick(worker)"
      >
        {{ worker.workerIndex }} #{{ worker.workerNumber }}
      </el-tag>
    </el-tooltip>
  </div>
</template>

<script>
import { Tag, Tooltip } from 'element-ui';

export default {
  name: 'WorkerBadge',

  components: {
    [Tag.name]: Tag,
    [Tooltip.name]: Tooltip,
  },

  props: {
    worker: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      value: false,
    },
  },

  data() {
    return {};
  },

  computed: {
    tagType() {
      const state = this.worker.state;
      let type = '';
      switch (state) {
        case 'Started':
          type = 'success';
          break;
        case 'StartInitiated':
          type = 'warning';
          break;
        case 'Launched':
          type = 'warning';
          break;
        case 'Accepted':
          type = 'warning';
          break;
        case 'Failed':
          type = 'danger';
          break;
        case 'Completed':
          type = 'info';
          break;
        default:
          type = 'default';
          break;
      }
      return type;
    },
  },

  created() {},

  methods: {
    handleClick(worker) {
      this.$emit('on-worker-click', worker);
    },
  },
};
</script>

<style lang="scss" module>
.worker-badge {
  cursor: pointer;
}

.selected {
  border: 2px solid var(--neutral-400);
  box-shadow: 0 2px 4px var(--neutral-400), 0 0 6px var(--neutral-400);
}
</style>
