<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">Migration Strategy</div>
    <div>
      <el-alert
        title="When the Mantis platform is updated, active Mantis jobs are incrementally moved from the old cluster to the new cluster.
              This option controls how quickly your job workers will move during a Mantis upgrade.
              If you are unsure, you can leave this at the default."
        class="spacing-small"
        type="info"
        show-icon
      ></el-alert>
      <el-form-item label="Migration Strategy">
        <el-select
          v-model="migrationConfig.strategy"
          placeholder
          @change="updateMigrationConfigString"
        >
          <el-option
            v-for="option in MIGRATION_STRATEGIES"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div v-if="migrationConfig.strategy === MIGRATION_STRATEGIES[0].value">
        <el-form-item label="Percent To Move (%)">
          <el-input-number
            v-model="migrationPercentToMove"
            :min="1"
            :max="100"
            @change="updateMigrationConfigString"
          />
        </el-form-item>
        <el-form-item label="Interval (milliseconds)">
          <el-input-number v-model="intervalMs" :min="1000" @change="updateMigrationConfigString"/>
        </el-form-item>
      </div>
    </div>
  </el-card>
</template>

<script>
import { Alert, Card, FormItem, InputNumber, Option, Select } from 'element-ui';
import { MIGRATION_STRATEGIES } from '@/utils/constants';
export default {
  name: 'JobClusterMigrationStrategyFormCard',

  components: {
    [Card.name]: Card,
    [Alert.name]: Alert,
    [InputNumber.name]: InputNumber,
    [Select.name]: Select,
    [Option.name]: Option,
    [FormItem.name]: FormItem,
  },

  props: {
    migrationConfig: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      MIGRATION_STRATEGIES,
      migrationPercentToMove: 25,
      intervalMs: 60000,
    };
  },

  created() {
    if (this.migrationConfig.configString) {
      try {
        const configObject = JSON.parse(this.migrationConfig.configString);
        this.migrationPercentToMove = configObject.percentToMove || 25;
        this.intervalMs = configObject.intervalMs || 60000;
      } catch {
        console.debug(
          'JobClusterMigrationStrategyFormCard: Unable to parse migration config string',
        );
      }
    }
  },

  methods: {
    updateMigrationConfigString() {
      if (this.migrationConfig.strategy === MIGRATION_STRATEGIES[0].value) {
        const configObject = {
          percentToMove: this.migrationPercentToMove,
          intervalMs: this.intervalMs,
        };
        this.migrationConfig.configString = JSON.stringify(configObject);
      } else {
        this.migrationConfig.configString = '';
      }
    },
  },
};
</script>

<style lang="scss" module>
</style>
