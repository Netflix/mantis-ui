<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Owner Information</div>
    <div>
      <el-form-item label="Contact Name" prop="owner.name">
        <el-input v-model="owner.name" :maxlength="inputMaxLength"/>
      </el-form-item>
      <el-form-item label="Contact Email" prop="owner.contactEmail">
        <el-input v-model="owner.contactEmail" :maxlength="inputMaxLength"/>
      </el-form-item>
      <el-form-item label="Team Name">
        <el-input v-model="owner.teamName" :maxlength="inputMaxLength"/>
      </el-form-item>
      <el-form-item label="Repo">
        <el-input v-model="owner.repo" :maxlength="inputMaxLength"/>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="owner.description" :maxlength="inputMaxLength"/>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Card, FormItem, Input } from 'element-ui';

export default {
  name: 'JobClusterOwnerFormCard',

  components: {
    [Card.name]: Card,
    [Input.name]: Input,
    [FormItem.name]: FormItem,
  },

  props: {
    owner: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      inputMaxLength: 100,
    };
  }
};
</script>

<style lang="scss" module>
</style>
