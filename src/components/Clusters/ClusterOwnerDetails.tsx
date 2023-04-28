import { Text } from '@mantine/core';

import type { Owner } from '@/types/cluster';

function ClusterOwnerDetails({ owner }: { owner: Owner }) {
  return (
    <Text>
      <span className="text-sky-600">Owner name:</span> {owner.name}
      <br />
      <span className="text-sky-600">Owner email:</span> {owner.contactEmail}
      <br />
      <span className="text-sky-600">Team name:</span> {owner.teamName}
      <br />
      <span className="text-sky-600">Repo:</span> {owner.repo}
      <br />
      <span className="text-sky-600">Description:</span> {owner.description}
    </Text>
  );
}

export default ClusterOwnerDetails;
