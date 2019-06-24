<template>
  <el-card shadow="none" :class="$style['stage-detail']">
    <template slot="header">
      <strong>Worker Details</strong> - Worker Index:
      <strong>{{ worker.workerIndex }}</strong> - Worker Number:
      <strong>{{ worker.workerNumber }}</strong>
    </template>
    <div class="layout flex horizontal justified">
      <div class="flex-1">
        <strong v-if="worker.acceptedAt">Accepted:</strong>
        {{ formatDateLong(worker.acceptedAt) }}<br />
        <strong v-if="worker.launchedAt">Launched:</strong>
        {{ formatDateLong(worker.launchedAt) }}<br />
        <strong v-if="worker.startingAt">Starting:</strong>
        {{ formatDateLong(worker.startingAt) }}<br />
        <strong v-if="worker.startedAt">Started:</strong>
        {{ formatDateLong(worker.startedAt) }}<br />
        <strong v-if="worker.completedAt">Completed:</strong>
        {{ formatDateLong(worker.completedAt) }}<br />
      </div>
      <div class="flex-3" :class="$style['worker-info']">
        <strong>Worker Hostname: </strong
        ><CopyableSpan :message="worker.slave" /><br />
        <strong>Worker Metrics URL: </strong
        ><CopyableSpan
          :message="`${worker.slave}:${worker.metricsPort}`"
        /><br />
        <strong>Worker Debug URL: </strong
        ><CopyableSpan :message="`${worker.slave}:${worker.debugPort}`" /><br />
        <strong>Worker Console URL: </strong
        ><CopyableSpan
          :message="`${worker.slave}:${worker.consolePort}`"
        /><br />
        <span v-for="port in worker.ports" :key="port">
          <strong>Worker Sink URL: </strong
          ><CopyableSpan :message="`${worker.slave}:${port}`" /><br />
        </span>
        <strong>Worker Slave ID: </strong
        ><CopyableSpan :message="worker.slaveID" /><br />
        <strong>Worker Logs: </strong>
        <CopyableInput
          :input-text="logFilePath"
          :class="$style['log-file-input']"
        />
        <br />
        <el-button
          v-if="mesosConsoleLink"
          class="end-justified"
          @click="openMesosConsole"
        >
          <div class="layout horizontal center">
            <img
              alt="Mantis Logo"
              src="../assets/images/mesos-logo-icon.png"
              :class="$style['mantis-logo']"
            />
            &nbsp;&nbsp;
            <span>Mesos Console</span>
          </div>
        </el-button>
      </div>
      <div class="flex-1 text-center">
        Resubmit: {{ worker.totalResubmitCount }}<br />
        <el-button
          type="danger"
          :class="$style['resubmit-worker']"
          @click="resubmitWorker"
        >
          Resubmit Worker
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { Button, Card } from 'element-ui';
import CopyableSpan from '@/components/CopyableSpan';
import CopyableInput from '@/components/CopyableInput';
import { format } from 'date-fns';

export default {
  name: 'JobWorkerDetailCard',

  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    CopyableSpan,
    CopyableInput,
  },

  props: {
    worker: {
      type: Object,
      required: true,
    },
    mesosBaseUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    logFilePath() {
      if (!this.worker) {
        return '';
      }
      return `/mnt/data/mesos/slaves/${
        this.worker.slaveID
      }/frameworks/MantisFramework/executors/${this.worker.jobId}-worker-${
        this.worker.workerIndex
      }-${this.worker.workerNumber}`;
    },
    mesosConsoleLink() {
      if (this.mesosBaseUrl !== 'null' && this.mesosBaseUrl) {
        return `${this.mesosBaseUrl}/#/slaves/${
          this.worker.slaveID
        }/frameworks/MantisFramework/`;
      }
      return '';
    },
  },

  methods: {
    formatDateLong(timestamp) {
      return format(timestamp, 'MMM D YYYY, hh:mm:ss A (ZZ)');
    },
    openMesosConsole() {
      window.open(this.mesosConsoleLink, '_blank');
    },
    resubmitWorker() {
      const jobId = this.worker.jobId;
      const workerNumber = this.worker.workerNumber;
      this.$emit('on-resubmit-worker', {
        jobId,
        workerNumber,
      });
    },
  },
};
</script>

<style lang="scss" module>
.stage-detail {
  > div:nth-child(1) {
    background: var(--neutral-400);
    color: white;
  }
}

.log-file-input {
  width: 80%;
}

.resubmit-worker {
  margin: 1em;
}

.worker-info {
  border-left: 1px solid var(--element-card-border-color);
  padding-left: 1em;
  border-right: 1px solid var(--element-card-border-color);
}

.worker-info > * {
  margin: 0.25em 0;
}

.mantis-logo {
  height: 20px;
}
</style>
