<template>
  <el-input v-model="inputText" size="mini">
    <el-tooltip
      slot="append"
      content="Click to Copy to Clipboard"
      placement="top"
    >
      <el-button @click="copyToClipboard(inputText)">
        <font-awesome-icon icon="clipboard" />
      </el-button>
    </el-tooltip>
  </el-input>
</template>

<script>
import CopyableMixin from '@/mixins/CopyableMixin';
import { Button, Input, Tooltip } from 'element-ui';

export default {
  name: 'CopyableInput',

  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Tooltip.name]: Tooltip,
  },

  mixins: [CopyableMixin],

  props: {
    inputText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" module></style>
