<template>
  <div class="flex layout horizontal" :class="$style['worker-list']">
    <WorkerBadge
      v-for="worker in workers"
      :key="worker.workerNumber"
      :class="$style['worker']"
      :worker="worker"
      :is-selected="worker === selectedWorker"
      @on-worker-click="onWorkerClick"
    />
    <span v-if="!workers.length">No {{ type }} workers</span>
  </div>
</template>

<script>
import WorkerBadge from '@/components/WorkerBadge';

export default {
  name: 'JobDetailStageWorkers',

  components: {
    WorkerBadge,
  },

  props: {
    type: {
      type: String,
      required: true,
    },
    workers: {
      type: Array,
      required: true,
    },
    selectedWorker: {
      type: Object,
      default: null,
    },
  },

  methods: {
    onWorkerClick(worker) {
      this.$emit('update-selected-worker', worker);
    },
  },
};
</script>

<style lang="scss" module>
.worker-list {
  flex-flow: row wrap;
  .worker {
    margin: 0.25em;
  }
}
</style>
