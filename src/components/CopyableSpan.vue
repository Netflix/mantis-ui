<template>
  <el-tooltip
    class="item"
    effect="dark"
    placement="right"
    content="Click to Copy to Clipboard"
  >
    <span :class="$style['text-span']" @click="copyToClipboard(message)">{{ message }}</span>
  </el-tooltip>
</template>

<script>
import CopyableMixin from '@/mixins/CopyableMixin';
import { Tooltip } from 'element-ui';

export default {
  name: 'CopyableSpan',

  components: {
    [Tooltip.name]: Tooltip,
  },

  mixins: [CopyableMixin],

  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.text-span {
  cursor: pointer;
}
</style>
