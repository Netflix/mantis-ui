import { Badge } from '@mantine/core';

import type { Version } from '@/types/cluster';

function JobVersionBadge({ versions }: { versions: Version[] }) {
  const badges =
    Array.isArray(versions) &&
    versions.map((item) => (
      <Badge
        key={`${item.env}:${item.region}:${item.version}`}
        color={item.env === 'prod' ? 'red' : 'gray'}
        variant={item.disabled ? 'light' : 'filled'}
        radius={3}
      >
        <span className={item.disabled ? 'text-neutral-500' : ''}>
          v{item.version} in {item.env} / {item.region} {item.disabled && '(disabled)'}
        </span>
      </Badge>
    ));

  return <span className="my-2 flex flex-wrap gap-1">{badges}</span>;
}

export default JobVersionBadge;
