export const DETAILED_TIME_FORMAT = 'MMM d yyyy, hh:mm:ss a';
export const DETAILED_TIME_FORMAT_WITH_TIME_ZONE = 'MMM d yyyy, hh:mm:ss a (zz)';
export const BASIC_TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

export const JOB_LABELS = {
  '_mantis.user': {
    recommended: false,
    required: true,
    description: '',
  },
  '_mantis.ownerEmail': {
    recommended: false,
    required: true,
    description: 'Owner email',
  },
  '_mantis.artifact': {
    recommended: false,
    required: false,
    description: 'Artifact name without version and zip suffix',
  },
  '_mantis.artifact.version': {
    recommended: false,
    required: true,
    description: 'Version of the artifact',
  },
  '_mantis.jobType': {
    recommended: true,
    required: false,
    description: 'What category this job falls into',
    defaultOptions: [
      {
        name: 'source',
        description: 'Source Job',
      },
      {
        name: 'aggregator',
        description: 'Purpose of this job is to aggregate data',
      },
      {
        name: 'metric',
        description: 'Purpose of this job is to publish atlas metrics',
      },
      {
        name: 'alerter',
        description: 'Purpose of this job is to generate alerts',
      },
      {
        name: 'persistor',
        description:
          'Purpose of this job is to persist data to an external store',
      },
      {
        name: 'sessionizer',
        description: 'Purpose of this job is to sessionize incoming data',
      },
      {
        name: 'search',
        description:
          'Purpose of this job is to search for events that match given criterion',
      },
      {
        name: 'dashboard',
        description: 'Purpose of this job is to power a dashboard',
      },
      {
        name: 'other',
        description: 'custom category',
      },
    ],
  },
  '_mantis.criticality': {
    recommended: true,
    required: false,
    description: 'How critical this job is',
    defaultOptions: [
      {
        name: 'low',
        description: '',
      },
      {
        name: 'medium',
        description:
          'The owner team will be emailed in case of issues with the job',
      },
      {
        name: 'high',
        description:
          'The owner team will be emailed in case of issues with the job',
      },
      {
        name: 'critical',
        description:
          'The owner team will be paged in case if issues with this job',
      },
    ],
  },
  '_mantis.dataOrigin': {
    recommended: false,
    required: false,
    description: "Where this job receives it's source data",
    defaultOptions: [
      {
        name: 'kafka',
        description: 'This job directly reads from a kafka topic',
      },
      {
        name: 's3',
        description: 'This job directly reads from a s3 bucket',
      },
      {
        name: 'sqs',
        description: 'This job directly reads from a sqs queue',
      },
      {
        name: 'mre',
        description: 'This job reads data from Mantis Realtime Events',
      },
      {
        name: 'lwc',
        description:
          'This job reads data from LWC service provided by the Insight Engineering team',
      },
      {
        name: '<job cluster name>',
        description: 'Reads data from this mantis job cluster',
      },
      {
        name: 'none',
        description: 'Self generates data',
      },
      {
        name: 'other',
        description: 'From other non standard source',
      },
    ],
  },
  '_mantis.dataOrigin.kafka.topics': {
    recommended: false,
    required: false,
    description: '',
  },
  '_mantis.dataOrigin.mre.app': {
    recommended: false,
    required: false,
    description: 'The microservice from which data is read. ((Applicable only if dataOrigin is mre)',
  },
  '_mantis.dataType': {
    recommended: false,
    required: false,
    description: 'The type of data processed by this job',
    defaultOptions: [
      {
        name: 'req-res',
        description: 'Request-Response events',
      },
      {
        name: 'servo',
        description: 'Servo Metric data',
      },
      {
        name: 'logblob',
        description: 'LogBlob events',
      },
      {
        name: 'atlas',
        description: 'Atlas metric data',
      },
      {
        name: 'custom',
        description: 'Custom data',
      },
    ],
  },
  '_mantis.duration': {
    recommended: false,
    required: false,
    description:
      'Short: Temporary job. Long: This job is long running or runs forever',
    defaultOptions: [
      {
        name: 'short',
        description: 'Has a finite run duration',
      },
      {
        name: 'long',
        description: 'This job is never terminated by Mantis',
      },
    ],
  },
};

export const CRON_POLICY_OPTIONS = [
  {
    label: 'Keep Existing',
    value: 'KEEP_EXISTING',
  },
  {
    label: 'Keep New',
    value: 'KEEP_NEW',
  },
];

export const MIGRATION_STRATEGIES = [
  {
    label: 'Percentage',
    value: 'PERCENTAGE',
  },
  {
    label: 'One worker at a time',
    value: 'ONE_WORKER',
  },
];

export const DEFAULT_MIGRATION_CONFIG_STRING = '{"percentToMove":25,"intervalMs":60000}';

export function DEFAULT_MASTER_CONFIGURATION() {
  return {
    numberOfInstances: '1',
    machineDefinition: {
      cpuCores: '1',
      memoryMB: '256',
      diskMB: '1024',
      networkMbps: '128',
    },
    softConstraints: [],
    hardConstraints: [],
  };
}

export function DEFAULT_WORKER_CONFIGURATION() {
  return {
    numberOfInstances: '1',
    machineDefinition: {
      cpuCores: '1',
      memoryMB: '256',
      diskMB: '1024',
      networkMbps: '128',
    },
    softConstraints: [],
    hardConstraints: [],
    scalable: false,
    scalingPolicy: null,
  };
}

export function DEFAULT_SCALING_POLICY() {
  return {
    min: '1',
    max: '1',
    increment: '1',
    decrement: '1',
    coolDownSecs: '600',
    strategies: {},
    enabled: false,
  };
};

export const JOB_CLUSTER_UPDATE_TYPES = {
  STANDARD: 'Standard',
  QUICK_ARTIFACT: 'Quick Artifact',
  QUICK_SLA: 'Quick SLA',
  QUICK_MIGRATION_STRATEGY: 'Quick Migration Strategy',
  QUICK_LABEL: 'Quick Label',
};

