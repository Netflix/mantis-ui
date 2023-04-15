import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { format } from 'date-fns';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { useAuth } from '@/hooks/useAuth';
import { useKillJobMutation } from '@/hooks/useClusters';
import type { CompactJob } from '@/types/job';
import { killJobModal } from '@/utils/modals';

import JobStateBadge from '../Jobs/JobStateBadge';

function ClusterJobsCard({
  activeJobs,
  clusterName,
}: {
  activeJobs: CompactJob[];
  clusterName: string;
}) {
  const { user } = useAuth();
  const email = user?.email ? user.email : '';

  function formatDateAndTime(job: CompactJob) {
    return format(job.submittedAt, 'MMM d yyyy, hh:ss a');
  }

  const { mutate } = useKillJobMutation(clusterName);

  return (
    <Stack spacing="sm">
      {activeJobs.map((item, index) => (
        <Card withBorder key={index} p="sm" radius="md" className="bg-slate-100 hover:bg-slate-50">
          <Group position="apart">
            <Text color="blue" weight="bold">
              <strong>{item.jobId}</strong>
            </Text>
            <JobStateBadge state={item.state} />
          </Group>

          <Text inline>
            User: <strong>{item.user}</strong>
          </Text>
          <Text inline>
            Submitted: <strong>{formatDateAndTime(item)}</strong>
          </Text>

          {user && (
            <Button
              color="red"
              compact
              leftIcon={<RiDeleteBin5Line />}
              variant="light"
              className="my-2 ml-auto"
              onClick={() =>
                killJobModal(item, clusterName, () => mutate({ jobs: [item], userEmail: email }))
              }
            >
              Kill Job
            </Button>
          )}
        </Card>
      ))}
    </Stack>
  );
}

export default ClusterJobsCard;
