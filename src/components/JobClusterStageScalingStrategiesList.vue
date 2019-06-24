<template>
  <div>
    <div class="flex layout horizontal wrap">
      <div v-for="(strategy, reason, index) in stage.scalingPolicy.strategies" :key="reason" :class="$style['strategy-item']">
        <i class="el-icon-delete" :class="$style['strategy-delete-icon']" @click="deleteStrategy(strategy)"></i>
        Strategy {{ index + 1 }}:
        <strong>{{ reason }}</strong>
        <br>Scale Down Below:
        <strong>{{ strategy.scaleDownBelowPct }}{{ isAutoScalePercentOrNot(strategy) }}</strong>
        / Scale Up Above:
        <strong>{{ strategy.scaleUpAbovePct }}{{ isAutoScalePercentOrNot(strategy) }}</strong><br>
        Rolling Count: <strong>{{strategy.rollingCount.count}}</strong> of <strong>{{strategy.rollingCount.of}}</strong><br>
      </div>
    </div>
    <div v-if="!Object.keys(stage.scalingPolicy.strategies).length">No strategies exist</div>
    <div :class="$style['vertical-spacing']">
      <el-form-item label="Add New Strategy:">
        <el-select v-model="newStrategy.reason" placeholder="Choose a strategy">
          <el-option v-for="item in scalingReasons" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Scale Down Below:">
        <el-input-number v-model="newStrategy.scaleDownBelowPct" :min="0" :max="inputMax(newStrategy)"/>
        {{ isAutoScalePercentOrNot(newStrategy) }}
      </el-form-item>
      <el-form-item label="Scale Up Above:">
        <el-input-number v-model="newStrategy.scaleUpAbovePct" :min="0" :max="inputMax(newStrategy)"/>
        {{ isAutoScalePercentOrNot(newStrategy) }}
      </el-form-item>
      <el-form-item label="Rolling Count:">
        <el-input-number v-model="newStrategy.rollingCount.count" :min="0"/>&nbsp;of
        <el-input-number v-model="newStrategy.rollingCount.of" :min="0"/>
      </el-form-item>
    </div>
    <div :class="$style['vertical-spacing']">
      <el-button
        type="primary"
        :class="$style['horizontal-spacing']"
        :disabled="!isAddEnabled"
        @click="addNewStrategy(newStrategy)"
      >Add Strategy</el-button>
    </div>
    <el-checkbox v-model="showHelp">Show Help</el-checkbox>
    <div v-if="showHelp">
      <br>
      <div>
        <u>Reasons to scale up or down:</u>
      </div>
      <div>
        <strong>DataDrop:</strong> scale up or down based on average data drop percentage across workers of this stage
      </div>
      <div>
        <strong>Memory:</strong> scale up or down based on average memory percentage used against memory asked, across workers of this stage
      </div>
      <div>
        <strong>Scale Down Below:</strong> - scale down when average percentage across workers dips below this value
      </div>
      <div>
        <strong>Scale Up Above:</strong> - scale up when average percentage across workers goes above this value
      </div>
      <div>
        <strong>Rolling Count:</strong> - scale up when average percentage across workers goes above this value
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox, FormItem, InputNumber, Option, Select } from 'element-ui';
import { autoScalePercentOrNot } from '@/utils/format-auto-scale';

export default {
  name: 'JobClusterStageScalingStrategiesList',

  components: {
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [InputNumber.name]: InputNumber,
    [Checkbox.name]: Checkbox,
    [FormItem.name]: FormItem,
  },

  props: {
    stage: {
      type: Object,
      required: true,
    },
    scalingReasons: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      showHelp: false,
      newStrategy: {
        reason: '',
        scaleDownBelowPct: undefined,
        scaleUpAbovePct: undefined,
        rollingCount: {
          count: 12,
          of: 20,
        },
      },
    };
  },

  computed: {
    isAddEnabled() {
      return (
        !!this.newStrategy.reason &&
        typeof this.newStrategy.scaleDownBelowPct !== 'undefined' &&
        typeof this.newStrategy.scaleUpAbovePct !== 'undefined' &&
        typeof this.newStrategy.rollingCount.count !== 'undefined' &&
        typeof this.newStrategy.rollingCount.of !== 'undefined'
      );
    },
  },

  methods: {
    resetPolicy() {
      this.newStrategy = {
        reason: '',
        scaleDownBelowPct: '',
        scaleUpAbovePct: '',
        rollingCount: {
          count: 12,
          of: 20,
        },
      };
    },
    addNewStrategy(newStrategy) {
      const strategy = {
        reason: newStrategy.reason,
        scaleDownBelowPct: newStrategy.scaleDownBelowPct,
        scaleUpAbovePct: newStrategy.scaleUpAbovePct,
        rollingCount: {
          count: newStrategy.rollingCount.count,
          of: newStrategy.rollingCount.of,
        },
      };

      this.stage.scalingPolicy.strategies[newStrategy.reason] = strategy;
      this.resetPolicy();
    },
    deleteStrategy(strategy) {
      const stage = this.stage;
      this.$delete(this.stage.scalingPolicy.strategies, strategy.reason);
    },
    inputMax(strategy) {
      return autoScalePercentOrNot(strategy.reason)
        ? 100
        : Infinity;
    },
    isAutoScalePercentOrNot(strategy) {
      return autoScalePercentOrNot(strategy.reason);
    },
  },
};
</script>

<style lang="scss" module>
.strategy-item {
  border: solid 1px var(--element-card-border-color);
  padding: 0.5em;
  margin: 0.5em;
  border-radius: var(--large-border-radius);
}
.horizontal-spacing {
  margin: 0 1em;
}
.vertical-spacing {
  margin: 1em 0;
}
.strategy-delete-icon {
  color: var(--element-danger-color);
  float: right;
  cursor: pointer;
}
</style>
