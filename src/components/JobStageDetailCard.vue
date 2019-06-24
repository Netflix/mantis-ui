<template>
  <div>
    <el-card ref="job-stage-detail-card" shadow="hover" :class="$style['stage-card']">
      <template slot="header">
        <strong v-if="stageMetadata.stageNum > 0">Stage {{ stageMetadata.stageNum }}</strong>
        <strong v-else>Job Master</strong>
        -
        <span>
          <strong>{{ stageMetadata.numWorkers }}</strong>
          {{ pluralize(stageMetadata.numWorkers, 'worker', 'workers - each') }}
          having
          <strong>{{ stageMetadata.machineDefinition.cpuCores }}</strong>
          CPU
          {{
          pluralize(stageMetadata.machineDefinition.cpuCores, 'Core', 'Cores')
          }}
          <span
            v-for="n in stageMetadata.machineDefinition.cpuCores"
            :key="n"
            :class="$style['lightning-bolt']"
          >
            <font-awesome-icon icon="bolt"/>
          </span>
          ,
          <strong>{{ stageMetadata.machineDefinition.memoryMB }} MB</strong>
          RAM,
          <strong>{{ stageMetadata.machineDefinition.diskMB }} MB</strong> disk,
          <strong>{{ stageMetadata.machineDefinition.diskMB }} MB</strong> disk,
          <strong>{{ stageMetadata.machineDefinition.networkMbps }} Mbps</strong>
          network
          <span v-if="stageMetadata.softConstraints.length">
            - Soft Constraints:
            <span
              v-for="constraint in stageMetadata.softConstraints"
              :key="constraint"
            >{{ constraint }}</span>
          </span>
          <span v-if="stageMetadata.hardConstraints.length">
            - Hard Constraints:
            <span
              v-for="constraint in stageMetadata.hardConstraints"
              :key="constraint"
            >{{ constraint }}</span>
          </span>
        </span>
      </template>

      <div v-if="isManualOrAutoScale" class="text-left" :class="$style['scaling-block']">
        <div
          v-if="
            stageMetadata.scalingPolicy && stageMetadata.scalingPolicy.enabled
          "
        >
          <el-tag size="mini" :disable-transitions="true" class="vertical-spacing-small">
            <font-awesome-icon icon="cog"/>
            <font-awesome-icon icon="arrows-alt-h"/>
            <font-awesome-icon icon="cog"/>
            <font-awesome-icon icon="cog"/>&nbsp;Autoscale Enabled
          </el-tag>

          <AutoscaleSettingsSummary
            v-if="stageMetadata.scalingPolicy"
            :scaling-policy="stageMetadata.scalingPolicy"
          />

          <AutoscaleStrategiesSummary
            v-if="stageMetadata.scalingPolicy && stageMetadata.scalingPolicy.strategies"
            :strategies="stageMetadata.scalingPolicy.strategies"
          />
        </div>
        <div v-else :class="$style['manual-scalable-tag']">
          <el-tag v-if="stageMetadata.scalable" size="mini" :disable-transitions="true">
            <font-awesome-icon icon="cog"/>
            <font-awesome-icon icon="arrows-alt-h"/>
            <font-awesome-icon icon="cog"/>
            <font-awesome-icon icon="cog"/>&nbsp;Manual Scale Enabled
          </el-tag>
        </div>

        <div v-if="stageMetadata.scalable" class="flex layout horizontal center vertical-spacing-small">
          Manual Scale to &nbsp;
          <el-input-number v-model="numWorkersForStage" :min="1" :max="100" size="mini" clearable/>
          <el-button
            type="primary"
            size="mini"
            :class="$style['manual-scale-button']"
            @click="scaleStage(stageMetadata.jobId, stageMetadata.stageNum, numWorkersForStage)"
          >Change number of workers</el-button>
        </div>
      </div>

      <div :class="$style['stage-workers-container']" class="text-left">
        <JobDetailStageWorkers
          :class="$style['stage-workers-list']"
          type="active"
          :workers="sortedWorkersForStage"
          :selected-worker="selectedWorker"
          @update-selected-worker="updateSelectedWorker"
        />
        <el-checkbox
          v-if="archivedWorkersForStage.length"
          v-model="showArchivedWorkers"
          :class="$style['archived-worker-checkbox']"
        >
          Show
          <strong>{{ archivedWorkersForStage.length }}</strong> archived workers
        </el-checkbox>
        <JobDetailStageWorkers
          v-if="showArchivedWorkers"
          :class="$style['stage-workers-list']"
          type="archived"
          :workers="archivedWorkersForStage"
          :selected-worker="selectedWorker"
          @update-selected-worker="updateSelectedWorker"
        />

        <div v-if="selectedWorker">
          <el-divider/>
          <JobWorkerDetailCard
            :worker="selectedWorker"
            :mesos-base-url="mesosBaseUrl"
            @on-resubmit-worker="onResubmitWorker"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Input,
  InputNumber,
  Tag,
} from 'element-ui';
import { pluralize } from '@/utils/pluralize';
import {
  autoScalePercentOrNot,
  autoScaleString,
} from '@/utils/format-auto-scale';
import JobDetailStageWorkers from '@/components/JobDetailStageWorkers';
import JobWorkerDetailCard from '@/components/JobWorkerDetailCard';
import AutoscaleSettingsSummary from '@/components/AutoscaleSettingsSummary';
import AutoscaleStrategiesSummary from '@/components/AutoscaleStrategiesSummary';

export default {
  name: 'JobStageDetailCard',

  components: {
    [Card.name]: Card,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Tag.name]: Tag,
    [Checkbox.name]: Checkbox,
    JobDetailStageWorkers,
    JobWorkerDetailCard,
    AutoscaleSettingsSummary,
    AutoscaleStrategiesSummary,
  },

  props: {
    stageMetadata: {
      type: Object,
      required: true,
    },
    workerMetadataList: {
      type: Array,
      required: true,
    },
    archivedWorkerList: {
      type: Array,
      required: true,
    },
    mesosBaseUrl: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedWorker: null,
      showArchivedWorkers: false,
      numWorkersForStage: this.stageMetadata.numWorkers,
    };
  },

  computed: {
    isManualOrAutoScale() {
      return (
        this.stageMetadata.scalable ||
        (this.stageMetadata.scalingPolicy &&
          this.stageMetadata.scalingPolicy.enabled)
      );
    },
    sortedWorkersForStage() {
      const workerList = this.workerMetadataList;
      const index = this.stageMetadata.stageNum;
      return workerList
        .filter(worker => {
          return worker.stageNum === index;
        })
        .sort((a, b) => {
          if (a.workerIndex > b.workerIndex) {
            return 1;
          }
          if (a.workerIndex < b.workerIndex) {
            return -1;
          }
          if (a.workerNumber > b.workerNumber) {
            return 1;
          }
          if (a.workerNumber < b.workerNumber) {
            return -1;
          }
          return 0;
        });
    },
    archivedWorkersForStage() {
      const archivedWorkerList = this.archivedWorkerList;
      const index = this.stageMetadata.stageNum;
      return archivedWorkerList.filter(worker => worker.stageNum === index);
    },
  },

  methods: {
    pluralize,
    autoScaleString,
    autoScalePercentOrNot,
    onResubmitWorker({ jobId, workerNumber }) {
      this.$emit('on-resubmit-worker', { jobId, workerNumber });
    },
    updateSelectedWorker(worker) {
      const jobStageDetailCard = this.$refs['job-stage-detail-card'].$el;
      this.$scrollTo(jobStageDetailCard, 500, {
        offset: -10,
      });
      if (this.selectedWorker !== worker) {
        this.selectedWorker = worker;
      } else {
        this.selectedWorker = null;
      }
    },
    async scaleStage(jobId, stageNumber, numWorkers) {
      this.$emit('on-scale-stage', {
        jobId,
        stageNumber,
        numWorkers,
      });
    },
  },
};
</script>

<style lang="scss" module>
.stage-card {
  > div:nth-child(2) {
    padding: 0;
  }
}

.scaling-block {
  padding: 0.5em 1em 0.5em 1em;
  border-bottom: solid 1px var(--element-card-border-color);
}

.lightning-bolt {
  padding: 0.1em;
  svg {
    color: var(--yellow-500);
  }
}

.manual-scale-button {
  margin: 0 1em;
}

.stage-workers-container {
  padding: 1em;
}

.archived-worker-checkbox {
  padding: 0.5em;
}

.manual-scalable-tag {
  margin-bottom: 0.5em;
}
</style>
