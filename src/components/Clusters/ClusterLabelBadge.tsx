import { Button } from '@mantine/core';

import type { Label } from '@/types/machine';

function ClusterLabelBadge({ labels }: { labels: Label[] }) {
  return (
    <span className="my-2 flex flex-wrap gap-1">
      {Array.isArray(labels) &&
        labels.map((label) => {
          return (
            <Button compact key={label.name} color="gray" variant="light" radius={3}>
              {label.name} : {label.value}
            </Button>
          );
        })}
    </span>
  );
}

export default ClusterLabelBadge;
