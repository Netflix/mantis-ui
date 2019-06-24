<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      Stage {{ stageNumber }} - Optional Job Constraints
    </div>
    <div>
      <el-form-item label="Unique Host">
        <el-select v-model="uniqueHost" @change="onUpdateConstraint('UniqueHost', $event)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        &nbsp;
        <el-tag type="info">Launch each worker of a stage on unique hosts</el-tag>
      </el-form-item>
      <el-form-item label="Exclusive Host">
        <el-select v-model="exclusiveHost" @change="onUpdateConstraint('ExclusiveHost', $event)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        &nbsp;
        <el-tag type="info">Launch worker on a host unto itself</el-tag>
      </el-form-item>
    </div>
  </el-card>
</template>

<script>
import { Card, FormItem, Option, Select, Tag } from 'element-ui';

export default {
  name: 'OptionalJobConstraintsFormCard',

  components: {
    [Card.name]: Card,
    [Select.name]: Select,
    [Option.name]: Option,
    [Tag.name]: Tag,
    [FormItem.name]: FormItem,
  },

  props: {
    stageNumber: {
      type: Number,
      required: true,
    },
    stage: {
      type: Object,
      required: true,
    },
  },

  data() {
    const options = [
      {
        label: 'not needed',
        value: null,
      },
      {
        label: 'soft (best effort)',
        value: 'soft',
      },
      {
        label: 'hard (required)',
        value: 'hard',
      },
    ];

    return {
      options,
      uniqueHost: null,
      exclusiveHost: null,
    };
  },

  created() {
  },

  methods: {
    onUpdateConstraint(key, constraint) {
      const softConstraints = this.stage.softConstraints;
      const hardConstraints = this.stage.hardConstraints;

      const addConstraint = (constraintsList, key) => {
        if (!constraintsList.includes(key)) {
          constraintsList.push(key);
        }
      };

      const removeConstraint = (constraintsList, key) => {
        const index = constraintsList.findIndex(item => item === key);
        if (index >= 0) {
          constraintsList.splice(index, 1);
        }
      };

      if (constraint === 'soft') {
        addConstraint(softConstraints, key);
        removeConstraint(hardConstraints, key);
      } else if (constraint === 'hard') {
        addConstraint(hardConstraints, key);
        removeConstraint(softConstraints, key);
      } else {
        removeConstraint(softConstraints, key);
        removeConstraint(hardConstraints, key);
      }
    }
  }
};
</script>

<style lang="scss" module>
</style>
