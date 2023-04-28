import { Badge, Button, Card, Text } from '@mantine/core';
import { format } from 'date-fns';
import { MdSettings } from 'react-icons/md';

import { useAuth } from '@/hooks/useAuth';
import type { Cluster } from '@/types/cluster';

function ClusterConfigCard({ cluster }: { cluster: Cluster }) {
  const { user } = useAuth();
  const jar = cluster.jars[cluster.jars.length - 1];

  const stageValues = Object.values(jar.schedulingInfo.stages);
  const formattedDateAndTime = jar.uploadedAt ? format(jar.uploadedAt, 'MMM d yyyy, hh:ss a') : '';

  const { strategy, configString } = cluster.migrationConfig;
  const decodeConfigString = () => {
    let decodedString = '';
    switch (strategy) {
      case 'PERCENTAGE':
        try {
          const configObject = JSON.parse(configString) as {
            intervalMs: number;
            percentToMove: number;
          };
          decodedString = `Migrate ${configObject.percentToMove}% of workers every ${configObject.intervalMs} ms`;
        } catch (error) {
          decodedString = `Error while parsing Migration Strategy Configuration JSON`;
        }
        break;
    }
    return decodedString;
  };

  return (
    <Card withBorder p={8} className="bg-slate-100 hover:bg-slate-50">
      <Text px="sm" color="blue" className="mb-2 bg-gray-200">
        Latest Version: <strong>{cluster.latestVersion}</strong>
      </Text>
      <Text>
        Artifact: <strong>{jar.url}</strong> <br />
        Updated at: <strong>{formattedDateAndTime}</strong> <br />
        {stageValues.map((stage, index) => {
          const { machineDefinition, numberOfInstances } = stage;
          const { cpuCores, memoryMB, diskMB, networkMbps } = machineDefinition;
          return (
            <Text key={index} className="my-1">
              Stage <strong>{index + 1}</strong>:{' '}
              <Badge radius={3}>
                CPU: <strong>{cpuCores}</strong> - RAM: <strong>{memoryMB} MB</strong> - Disk:{' '}
                <strong>{diskMB} MB</strong> - Net: <strong>{networkMbps} Mbps</strong>
              </Badge>{' '}
              x <strong>{numberOfInstances}</strong>
            </Text>
          );
        })}
      </Text>

      <Text px="sm" color="blue" className="my-2 bg-gray-200">
        Job Cluster Migration Strategy
      </Text>
      <Text>
        Strategy: <strong>{strategy}</strong> <br />
        Updated at: <strong>{decodeConfigString()}</strong> <br />
      </Text>

      {user && (
        <Button compact color="green" leftIcon={<MdSettings />} className="m-auto mt-2">
          Submit version {cluster.latestVersion}
        </Button>
      )}
    </Card>
  );
}

export default ClusterConfigCard;
