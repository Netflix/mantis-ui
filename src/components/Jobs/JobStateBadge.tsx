import { Badge } from '@mantine/core';

function JobStateBadge({ state }: { state: string }) {
  const getTagColor = (state: string) => {
    switch (state) {
      case 'Launched':
        return 'lime';
      case 'Accepted':
        return 'gray';
      case 'Killed':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <Badge color={getTagColor(state)} variant="filled" radius={3}>
      {state.toUpperCase()}
    </Badge>
  );
}

export default JobStateBadge;
