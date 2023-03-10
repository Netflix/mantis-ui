import { Badge } from '@mantine/core';

function EnvBadge({ env }: { env: string }) {
  const getTagColor = (env: string) => {
    switch (env) {
      case 'prod':
        return 'red';
      case 'test':
        return 'gray';
      default:
        return 'default';
    }
  };

  return (
    <Badge color={getTagColor(env)} variant="filled" radius={3}>
      {env.toUpperCase()}
    </Badge>
  );
}

export default EnvBadge;
