<template>
  <el-tag :type="tagType" size="small" :disable-transitions="true">
    {{ label || status }}
  </el-tag>
</template>

<script>
import { Tag } from 'element-ui';

export default {
  name: 'StatusBadge',

  components: {
    [Tag.name]: Tag,
  },

  props: {
    status: {
      type: String,
      required: true,
    },
    // Optional label that's displayed instead of the `status`
    label: {
      type: String,
      default: null,
    },
  },

  computed: {
    tagType() {
      const state = this.status;
      let type = '';
      switch (state) {
        case 'Launched':
          type = 'success';
          break;
        case 'Completed':
          type = 'default';
          break;
        case 'Accepted':
          type = 'warning';
          break;
        case 'Failed':
          type = 'danger';
          break;
        default:
          type = 'default';
          break;
      }
      return type;
    },
  },
};
</script>
