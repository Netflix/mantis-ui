<template>
  <el-card ref="job-output-card" shadow="hover" :class="$style['job-output-card']">
    <template slot="header">
      <el-row>
        <strong>Job Output</strong>
        <span :class="$style['job-output-controls']">
          <el-button
            v-if="!hasJobOutputStarted"
            type="primary"
            size="mini"
            @click="startJobOutput"
            >Start</el-button
          >
          <el-button v-else type="primary" size="mini" icon="el-icon-loading" @click="stopJobOutput"
            >Stop</el-button
          >
          <el-button size="mini" @click="clearJobOutput">Clear</el-button>
          <el-divider direction="vertical" />
          <span class>{{ rps }} records per second</span>
          <el-divider direction="vertical" />Sampling -
          <el-select
            v-model="samplingRate"
            :disabled="hasJobOutputStarted"
            size="mini"
            placeholder="Select Sampling Rate"
            @change="onSelectSamplingRate"
          >
            <el-option
              v-for="item in samplingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
      </el-row>

      <el-row :class="$style['job-output-meta-information']">
        <el-input
          v-model="jobOutputStreamingUrl"
          size="mini"
          :class="$style['job-output-url-input']"
        >
          <template slot="prepend">
            URL:
          </template>
          {{ jobOutputStreamingUrl }}
        </el-input>
      </el-row>
    </template>
    <div class="text-left flex layout horizontal" :class="$style['job-output-container']">
      <div :class="$style['job-output-list-column']" class="flex-2" @click="updateCurrentJobOutputMessagePreview($event)">
        <span v-for="(item, index) in jobOutputEvents" :key="item.timestamp" :class="`${$style['job-output-item']} ${$style['blue-fade-to-black']}`" :data-event-index="index">
          <strong>{{ formatDateLong(item.timestamp) }}</strong>
          -
          {{ item.message }}
        </span>
      </div>
      <div :class="$style['job-output-pretty-print-column']" class="flex">
        <el-button icon="el-icon-document-copy" :class="$style['output-copy-button']" size="mini" @click="copyToClipboard(currentJobOutputMessagePrettyPrinted)"></el-button>
        <pre>{{ currentJobOutputMessagePrettyPrinted }}</pre>
      </div>
    </div>
  </el-card>
</template>

<script>
import {
  Button,
  Card,
  Divider,
  Input,
  Option,
  Row,
  Select,
} from 'element-ui';
import { format } from 'date-fns';
import { streamingOutputUrl } from '@/services/JobsService';
import { DETAILED_TIME_FORMAT } from '@/utils/constants';
import { replaceQueryString } from '@/utils/querystring';
import CopyableMixin from '@/mixins/CopyableMixin';
import { setTimeout } from 'timers';

export default {
  name: 'JobOutputCard',

  components: {
    [Card.name]: Card,
    [Row.name]: Row,
    [Button.name]: Button,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Divider.name]: Divider,
  },

  mixins: [CopyableMixin],

  props: {
    jobId: {
      type: String,
      required: true,
    },
    jobOutputEvents: {
      type: Array,
      required: true,
    },
    currentJobOutputMessagePrettyPrinted: {
      type: String,
      required: true,
    },
    hasJobOutputStarted: {
      type: Boolean,
      required: true,
    },
    rps: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      samplingOptions: [
        {
          value: '',
          label: 'None',
        },
        {
          value: '10000',
          label: '0.01 rps',
        },
        {
          value: '100000',
          label: '0.1 rps',
        },
        {
          value: '4000',
          label: '0.25 rps',
        },
        {
          value: '2000',
          label: '0.25 rps',
        },
        {
          value: '1000',
          label: '1 rps',
        },
        {
          value: '500',
          label: '2 rps',
        },
        {
          value: '200',
          label: '5 rps',
        },
        {
          value: '100',
          label: '10 rps',
        },
        {
          value: '50',
          label: '20 rps',
        },
        {
          value: '20',
          label: '50 rps',
        },
        {
          value: '10',
          label: '100 rps',
        },
      ],
      samplingRate: '',
      jobOutputStreamingUrl: streamingOutputUrl(this.jobId, this.samplingRate),
    };
  },

  methods: {
    startJobOutput() {
      const jobOutputCardElement = this.$refs['job-output-card'].$el;
      this.$scrollTo(jobOutputCardElement);
      this.$emit('on-start-job-output', {
        jobOutputUrl: this.jobOutputStreamingUrl,
      });
    },

    stopJobOutput() {
      this.$emit('on-stop-job-output');
    },

    clearJobOutput() {
      this.$emit('on-clear-job-output');
    },

    formatDateLong(timestamp) {
      return format(timestamp, DETAILED_TIME_FORMAT);
    },

    onSelectSamplingRate(samplingRate) {
      const [ baseUrl = '', queryString ] = this.jobOutputStreamingUrl.split('?');
      const updatedQueryString = replaceQueryString(queryString, 'sampleMSec', samplingRate);
      this.jobOutputStreamingUrl = updatedQueryString ? `${baseUrl}?${updatedQueryString}` : baseUrl;
    },

    updateCurrentJobOutputMessagePreview(event) {
      let target = event.target;

      // Ignore clicks on the parent list div
      if (target.classList.contains(this.$style['job-output-list-column'])) {
        return;
      }

      // Find the span to highlight
      if (!target.classList.contains(this.$style['job-output-item'])) {
        target = target.parentElement;
      }
      target.classList.add(this.$style['server-event-selected']);

      // Add color highlight animation
      setTimeout(() => {
        target.classList.remove(this.$style['blue-fade-to-black']);
        target.classList.remove(this.$style['server-event-selected']);
      }, 1000);
      const item = this.jobOutputEvents[target.dataset.eventIndex];

      // Update pretty print preview with the selected item
      this.$emit('on-click-output-message', { item })
    },
  },
};
</script>

<style lang="scss" module>
.job-output-card {
  height: calc(100vh - 100px);
  > div:nth-child(2) {
    padding: 0;
  }
}

.job-output-controls {
  margin: 0 1em;
}

.job-output-meta-information {
  margin-top: 0.5em;
}

.job-output-container {
  font-size: var(--text-1);
}

.job-output-list-column {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin: 1em;
  height: calc(100vh - 220px);
  .job-output-item {
    cursor: pointer;
  }
}

.job-output-pretty-print-column {
  padding: 20px;
  border-left: solid 1px var(--element-card-border-color);
}

pre {
  margin: 0;
}

.output-copy-button {
  float: right;
}

@-webkit-keyframes blue-black-fade {
   0% {color: var(--element-brand-color);}
   100% {color: black;}
}

@keyframes blue-black-fade {
   0% {color: var(--element-brand-color);}
   100% {color: black;}
}

@-webkit-keyframes green-black-fade {
   0% {color: green;}
   100% {color: black;}
}

@keyframes green-black-fade {
   0% {color: green;}
   100% {color: black;}
}

.blue-fade-to-black {
  transform: translateZ(0);
  -webkit-animation: blue-black-fade 1s ease-in 1;
  animation: blue-black-fade 1s ease-in 1;
}

.server-event-selected {
  transform: translateZ(0);
  -webkit-animation: green-black-fade 2s ease-in 1;
  animation: green-black-fade 2s ease-in 1;
}
</style>
