import { Anchor, Badge, Card, Text } from '@mantine/core';
import { format } from 'date-fns';
import { MdFileDownload } from 'react-icons/md';

import type { Job } from '@/types/job';
import type { Label } from '@/types/machine';
import { getJobStateBadgeColor } from '@/utils/job';

type props = {
  jobData: { job: Job };
};

function JobOverviewTab({ jobData }: props) {
  return (
    <Card my={15} withBorder padding="lg" radius="md">
      <div className={'absolute right-0 top-0 m-5'}>
        <Badge
          variant="light"
          color={getJobStateBadgeColor(jobData.job.jobMetadata.state)}
          py={15}
          radius="md"
        >
          {jobData.job.jobMetadata.state}
        </Badge>
      </div>
      <div className={'grid  grid-cols-[15%_85%] gap-y-3'}>
        <Text fw={700} c="dimmed">
          Job Id
        </Text>
        <Text>{jobData.job.jobMetadata.jobId}</Text>

        <Text fw={700} c="dimmed">
          Job Label
        </Text>
        <div className={' flex flex-row flex-wrap gap-2'}>
          {jobData.job.jobMetadata.labels.map((label: Label) => (
            <Badge
              color={'gray.6'}
              key={label.name}
              variant="filled"
              className="group py-3"
              radius="md"
            >
              {label.name}
              <div className="data-popper-arrow invisible absolute -mt-16 rounded-md bg-gray-700 p-2 text-center group-hover:visible">
                {label.value}
              </div>
            </Badge>
          ))}
        </div>

        <Text fw={700} c="dimmed">
          Resource Cluster
        </Text>
        <div>
          <Badge color="dark.1" variant="filled" className="py-3" radius="sm">
            {/*Change unknown to dynamic when JSON schema from is defined later*/}
            <p className="text-slate-50">Unknown</p>
          </Badge>
        </div>

        <Text fw={700} c="dimmed">
          Submitted At
        </Text>
        <Text>{format(jobData.job.jobMetadata.submittedAt, 'yyyy-MM-dd, HH:mm:ss')}</Text>

        <Text fw={700} c="dimmed">
          Submitted By
        </Text>
        <Text>{jobData.job.jobMetadata.user}</Text>

        <Text fw={700} c="dimmed">
          Artifact File
        </Text>
        <Anchor href={jobData.job.jobMetadata.jarUrl}>
          <div className={'flex flex-row items-center'}>
            Download Artifact {<MdFileDownload className={'text-2xl'} />}
          </div>
        </Anchor>

        <Text fw={700} c="dimmed">
          Job Meta
        </Text>
        <Text>
          Stage : <b>{jobData.job.jobMetadata.numStages}</b> , Perpetual, Min-Runtime :{' '}
          <b>{jobData.job.jobMetadata.sla.minRuntimeSecs}</b> , Runtime :{' '}
          <b>{jobData.job.jobMetadata.sla.runtimeLimitSecs}</b> Sla-Type :{' '}
          <b>{jobData.job.jobMetadata.sla.slaType}</b>
        </Text>
      </div>
    </Card>
  );
}

export default JobOverviewTab;
