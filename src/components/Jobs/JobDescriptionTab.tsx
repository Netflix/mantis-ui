import { Card, Divider, Group, Text } from '@mantine/core';

import type { Job, WorkerMetadata } from '@/types/job';
import { getUtcFromEpoch } from '@/utils/string';

type props = {
  jobData: { job: Job };
};

function JobDescriptionTab({ jobData }: props) {
  const workers = jobData.job.workerMetadataList.map((workerMeta: WorkerMetadata) => (
    <Card bg="gray.1" withBorder padding={0} radius="md" key={workerMeta.workerIndex}>
      <Group position="apart" m={10}>
        <Text>{workerMeta.jobId}</Text>
        <Text>
          CPU: <b> 2 </b> Ram: <b> 4000 MB </b> Disk: <b>100 MB</b> Network: <b>128 MBPS</b>
        </Text>
      </Group>
      <Divider m={0} />
      <Group position="left" m={10}>
        <Text className={'font-bold'}>Worker Details -</Text>
        <Text>
          Worker index: {workerMeta.workerIndex} Worker Number: {workerMeta.workerNumber}
        </Text>
      </Group>
      <Divider m={0} />
      <div className={'grid grid-cols-[39%_2%_60%]'}>
        <div className={'m-5  grid grid-cols-[25%_75%] justify-items-start gap-y-3'}>
          <Text fw={700} c="dimmed">
            Accepted:
          </Text>
          <Text>{getUtcFromEpoch(workerMeta.acceptedAt)}</Text>

          <Text fw={700} c="dimmed">
            Launched:
          </Text>
          <Text>{getUtcFromEpoch(workerMeta.launchedAt)}</Text>

          <Text fw={700} c="dimmed">
            Starting:
          </Text>
          <Text>{getUtcFromEpoch(workerMeta.startingAt)}</Text>

          <Text fw={700} c="dimmed">
            Started:
          </Text>
          <Text>{getUtcFromEpoch(workerMeta.startedAt)}</Text>

          <Text fw={700} c="dimmed">
            Completed:
          </Text>
          <Text>{getUtcFromEpoch(workerMeta.completedAt)}</Text>
          <Divider m={0} />
        </div>

        <Divider orientation="vertical" />

        <div className={'m-5 grid  grid-cols-[20%_80%] content-start justify-items-start gap-y-3'}>
          <Text fw={700} c="dimmed">
            HostName:
          </Text>
          <Text>{workerMeta.slave}</Text>

          <Text fw={700} c="dimmed">
            Metric Port:
          </Text>
          <Text>{workerMeta.metricsPort}</Text>

          <Text fw={700} c="dimmed">
            Debug Port:
          </Text>
          <Text>{workerMeta.debugPort}</Text>

          <Text fw={700} c="dimmed">
            Console Port:
          </Text>
          <Text>{workerMeta.consolePort}</Text>
          <Divider m={0} />
        </div>
      </div>
    </Card>
  ));

  return <div className={'my-2 flex flex-col gap-y-4 p-2'}>{workers}</div>;
}

export default JobDescriptionTab;
