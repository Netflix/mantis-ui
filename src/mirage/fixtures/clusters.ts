export default [
  {
    name: 'sample-test',
    jars: [
      {
        url: 'http://functions-mantis-trigger-kafka-thin-1.1.zip',
        uploadedAt: 1668628994625,
        version: '1.1',
        schedulingInfo: {
          stages: {
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 1,
                memoryMB: 1024,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: null,
              scalable: false,
            },
          },
        },
      },
      {
        url: 'http://functions-mantis-trigger-kafka-thin-1.1.zip',
        uploadedAt: 1668629341837,
        version: '2021-11-18T20:21:01.783956Z',
        schedulingInfo: {
          stages: {
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 1,
                memoryMB: 1024,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: null,
              scalable: false,
            },
          },
        },
      },
    ],
    sla: {
      min: 0,
      max: 0,
      cronSpec: null,
      cronPolicy: null,
    },
    parameters: [],
    owner: {
      name: 'Developer A',
      teamName: '',
      description: '',
      contactEmail: 'userA@company.com',
      repo: 'some repo',
    },
    lastJobCount: 0,
    disabled: false,
    isReadyForJobMaster: false,
    migrationConfig: {
      strategy: 'PERCENTAGE',
      configString: '{"percentToMove":25,"intervalMs":60000}',
    },
    labels: [
      {
        name: '_mantis.user',
        value: 'MantisUI',
      },
      {
        name: '_mantis.ownerEmail',
        value: 'devA@company.com',
      },
      {
        name: '_mantis.artifact',
        value: 'functions-mantis-trigger-kafka-thin',
      },
      {
        name: '_mantis.artifact.version',
        value: '1',
      },
      {
        name: '_mantis.jobType',
        value: '',
      },
      {
        name: '_mantis.criticality',
        value: '',
      },
      {
        name: '_mantis.pandora.org.id',
        value: '3596',
      },
    ],
    cronActive: false,
    latestVersion: '2022-11-16T20:09:01.783956Z',
  },
  {
    name: 'UserA-TestConsumer1',
    jars: [
      {
        url: 'http://authdatqlab1-source-job-connector-sample-spring-boot-thin-0.0.1-rc1.zip',
        uploadedAt: 1668583679221,
        version: '0.0.1 2022-11-15 23:26:56',
        schedulingInfo: {
          stages: {
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 1,
                memoryMB: 1024,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: null,
              scalable: true,
            },
          },
        },
      },
      {
        url: 'http://authdatqlab1-source-job-connector-sample-spring-boot-thin-0.0.1-rc1.zip',
        uploadedAt: 1668585816366,
        version: '2022-11-16T08:03:36.312366Z',
        schedulingInfo: {
          stages: {
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 1,
                memoryMB: 1024,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: null,
              scalable: true,
            },
          },
        },
      },
      {
        url: 'http://authdatqlab1-source-job-connector-sample-spring-boot-thin-0.0.1-rc1.zip',
        uploadedAt: 1671260325461,
        version: '0.0.1 2022-12-16 22:58:26',
        schedulingInfo: {
          stages: {
            '0': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 2,
                memoryMB: 4096,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: null,
              softConstraints: null,
              scalingPolicy: null,
              scalable: false,
            },
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 2,
                memoryMB: 4096,
                networkMbps: 128,
                diskMB: 4096,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: {
                stage: 1,
                min: 1,
                max: 1,
                increment: 1,
                decrement: 1,
                coolDownSecs: 600,
                strategies: {
                  ClutchRps: {
                    reason: 'ClutchRps',
                    scaleDownBelowPct: 0,
                    scaleUpAbovePct: 0,
                    rollingCount: {
                      count: 0,
                      of: 0,
                    },
                  },
                },
                enabled: true,
              },
              scalable: true,
            },
          },
        },
      },
      {
        url: 'http://authdatqlab1-source-job-connector-sample-spring-boot-thin-0.0.1-rc1.zip',
        uploadedAt: 1671260578831,
        version: '2022-12-17T07:02:58.771470Z',
        schedulingInfo: {
          stages: {
            '0': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 2,
                memoryMB: 4096,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: null,
              softConstraints: null,
              scalingPolicy: null,
              scalable: false,
            },
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 2,
                memoryMB: 4096,
                networkMbps: 128,
                diskMB: 4096,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: {
                stage: 1,
                min: 1,
                max: 1,
                increment: 1,
                decrement: 1,
                coolDownSecs: 600,
                strategies: {
                  ClutchRps: {
                    reason: 'ClutchRps',
                    scaleDownBelowPct: 0,
                    scaleUpAbovePct: 0,
                    rollingCount: {
                      count: 0,
                      of: 0,
                    },
                  },
                },
                enabled: true,
              },
              scalable: true,
            },
          },
        },
      },
    ],
    sla: {
      min: 0,
      max: 0,
      cronSpec: null,
      cronPolicy: null,
    },
    parameters: [
      {
        name: 'criterion',
        value: 'select * from stream SAMPLE {"strategy":"RANDOM", "threshold":1000}',
      },
      {
        name: 'sourceJobName',
        value: 'SharedMrePublishEventSource',
      },
    ],
    owner: {
      name: 'User B',
      teamName: '',
      description: '',
      contactEmail: 'bob@random.com',
      repo: 'some other repo',
    },
    lastJobCount: 1,
    disabled: false,
    isReadyForJobMaster: true,
    migrationConfig: {
      strategy: 'PERCENTAGE',
      configString: '{"percentToMove":25,"intervalMs":60000}',
    },
    labels: [
      {
        name: '_mantis.criticality',
        value: 'low',
      },
      {
        name: '_mantis.artifact',
        value: 'authdatqlab1-source-job-connector-sample-spring-boot-thin-0.0.1',
      },
      {
        name: '_mantis.resourceCluster',
        value: 'mantisrc_sbn1',
      },
      {
        name: '_mantis.jobType',
        value: 'aggregator',
      },
      {
        name: '_mantis.pandora.org.id',
        value: '4939',
      },
      {
        name: '_mantis.user',
        value: 'MantisAdmin',
      },
      {
        name: '_mantis.ownerEmail',
        value: 'bob@random.com',
      },
      {
        name: '_mantis.artifact.version',
        value: 'rc1',
      },
    ],
    cronActive: false,
    latestVersion: '2022-12-17T07:02:58.771470Z',
  },
  {
    name: 'FakeDataGenerator-Ads',
    jars: [
      {
        url: 'http://fake-data-generator-kafka-sample-spring-boot-thin-0.0.1-dev202208171318.zip',
        uploadedAt: 1660771239300,
        version: '0.0.1 2022-08-17 13:41:57',
        schedulingInfo: {
          stages: {
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 1,
                memoryMB: 8000,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: null,
              scalable: false,
            },
          },
        },
      },
      {
        url: 'http://fake-data-generator-kafka-sample-spring-boot-thin-0.0.1-dev202208171318.zip',
        uploadedAt: 1665632775376,
        version: '2022-10-13T03:46:15.252227Z',
        schedulingInfo: {
          stages: {
            '1': {
              numberOfInstances: 1,
              machineDefinition: {
                cpuCores: 1,
                memoryMB: 8000,
                networkMbps: 128,
                diskMB: 1024,
                numPorts: 1,
              },
              hardConstraints: [],
              softConstraints: [],
              scalingPolicy: null,
              scalable: false,
            },
          },
        },
      },
    ],
    sla: {
      min: 0,
      max: 0,
      cronSpec: null,
      cronPolicy: null,
    },
    parameters: [],
    owner: {
      name: 'User C',
      teamName: 'Client Delivery',
      description: 'FakeDataGenerator',
      contactEmail: 'userA@email.com',
      repo: 'random repo',
    },
    lastJobCount: 0,
    disabled: false,
    isReadyForJobMaster: false,
    migrationConfig: {
      strategy: 'PERCENTAGE',
      configString: '{"percentToMove":25,"intervalMs":60000}',
    },
    labels: [
      {
        name: '_mantis.user',
        value: 'DummyUser',
      },
      {
        name: '_mantis.ownerEmail',
        value: 'userA@email.com',
      },
      {
        name: '_mantis.artifact',
        value: 'fake-data-generator-kafka-sample-spring-boot-thin-0.0.1',
      },
      {
        name: '_mantis.artifact.version',
        value: 'dev202208171318',
      },
      {
        name: '_mantis.jobType',
        value: 'source',
      },
      {
        name: '_mantis.criticality',
        value: 'low',
      },
      {
        name: '_mantis.pandora.org.id',
        value: '217',
      },
    ],
    cronActive: false,
    latestVersion: '2022-10-13T03:46:15.252227Z',
  },
];
