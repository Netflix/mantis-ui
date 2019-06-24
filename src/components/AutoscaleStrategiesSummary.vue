<template>
  <el-row>
    <el-col>Strategies:</el-col>
    <el-col>
      <div v-for="strategy in strategies" :key="strategy.reason">
        <strong>{{ strategy.reason }}</strong>
        ,
        Scale Down {{ autoScaleString(strategy.reason) }}:
        <strong>
          <font-awesome-icon icon="arrow-down"/>
          &lt;
          {{ strategy.scaleDownBelowPct
          }}{{ autoScalePercentOrNot(strategy.reason) }}
        </strong>
        , Scale Up {{ autoScaleString(strategy.reason) }}:
        <strong>
          <font-awesome-icon icon="arrow-down"/>
          &gt;
          {{ strategy.scaleUpAbovePct
          }}{{ autoScalePercentOrNot(strategy.reason) }}
        </strong>, Rolling Count:
        <strong>{{ strategy.rollingCount.count }}</strong> of
        <strong>{{ strategy.rollingCount.of }}</strong>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { Col, Row } from 'element-ui';
import {
  autoScalePercentOrNot,
  autoScaleString,
} from '@/utils/format-auto-scale';

export default {
  name: 'AutoscaleStrategiesSummary',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
  },

  props: {
    strategies: {
      type: Object,
      required: true,
    },
  },

  methods: {
    autoScaleString,
    autoScalePercentOrNot,
  },
};
</script>

<style lang="scss" module></style>
