import { Button, Card, CardSection, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RiDeleteBin5Line, RiSettings4Line, RiToggleFill, RiToggleLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useClusterDetails, useJobsOnCluster } from '@/hooks/useClusters';
import { pluralize } from '@/utils/string';

import ClusterConfigCard from './ClusterConfigCard';
import ClusterJobsCard from './ClusterJobsCard';
import ClusterLabelBadge from './ClusterLabelBadge';
import ClusterOwnerDetails from './ClusterOwnerDetails';

function ClusterDetail() {
  const navigate = useNavigate();
  const { clusterId: clusterName = '' } = useParams();
  if (!clusterName) navigate('/404', { replace: true });

  const { data: cluster = null } = useClusterDetails(clusterName);
  const [enabled, setEnabled] = useState(!cluster?.disabled);
  const { user } = useAuth();

  const { data: clusterJobs = [], isFetched } = useJobsOnCluster(clusterName);

  const activeJobs = clusterJobs?.filter(
    (job) => job.state === 'Accepted' || job.state === 'Launched',
  );

  return (
    <>
      <Helmet>
        <title>Mantis - Cluster Details</title>
      </Helmet>
      <div className="flex h-full flex-col">
        <Text className="text-center">
          <strong>{activeJobs.length}</strong> active {pluralize(activeJobs.length, 'job')}
        </Text>

        <Group position="apart" spacing="xs" className="my-1">
          <Text className="text-left">
            Latest Job Cluster version is: <strong>{cluster?.latestVersion}</strong>
          </Text>

          {user && (
            <>
              <Button compact color="green" leftIcon={<RiSettings4Line />} className="ml-auto">
                Submit latest version {cluster?.latestVersion}
              </Button>
              <Button compact>Update Cluster</Button>
            </>
          )}
        </Group>
        <Group position="apart" spacing="xs" className="my-1">
          <Text className="text-left">
            Last running Job version is: <strong>#</strong>
          </Text>
          {user && (
            <>
              {enabled ? (
                <Button
                  compact
                  color="yellow"
                  leftIcon={<RiToggleFill />}
                  variant="outline"
                  className="ml-auto"
                  onClick={() => setEnabled(false)}
                >
                  Disable Cluster
                </Button>
              ) : (
                <Button
                  compact
                  color="green"
                  leftIcon={<RiToggleLine />}
                  variant="outline"
                  className="ml-auto"
                  onClick={() => setEnabled(true)}
                >
                  Enable Cluster
                </Button>
              )}

              <Button compact color="red" leftIcon={<RiDeleteBin5Line />}>
                Delete Cluster
              </Button>
            </>
          )}
        </Group>

        <Card withBorder radius="md" className="mx-auto w-1/2 text-sm hover:shadow-lg">
          <Card.Section withBorder inheritPadding py="xs" className="bg-slate-100 text-slate-700">
            <Text size="md">Job Cluster Details</Text>
          </Card.Section>
          <CardSection inheritPadding py="md">
            <Text>
              Job Cluster is{' '}
              {enabled ? (
                <span className="text-green-600">Enabled</span>
              ) : (
                <span className="text-red-600">Disabled</span>
              )}
            </Text>
            <Text>
              SLA min/max: <strong>{cluster?.sla.min}</strong>/ <strong>{cluster?.sla.max}</strong>
            </Text>

            {cluster?.labels && <ClusterLabelBadge labels={cluster?.labels} />}

            {cluster?.owner && <ClusterOwnerDetails owner={cluster?.owner} />}
          </CardSection>

          {cluster && <ClusterConfigCard cluster={cluster} />}
        </Card>

        <Card withBorder radius="md" className="mx-auto my-8 w-1/2 text-sm hover:shadow-lg">
          <Card.Section
            withBorder
            inheritPadding
            py="xs"
            my="md"
            className="bg-slate-100 text-slate-700"
          >
            <Text size="md">Jobs</Text>
          </Card.Section>

          {activeJobs.length && isFetched ? (
            <ClusterJobsCard activeJobs={activeJobs} clusterName={clusterName} />
          ) : (
            <Text align="center">No active jobs</Text>
          )}
        </Card>
      </div>
    </>
  );
}

export default ClusterDetail;
