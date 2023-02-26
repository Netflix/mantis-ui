import { Badge } from '@mantine/core';

function TagRenderer({
  value,
  getTagColor,
}: {
  value: string;
  getTagColor: (value: string) => string;
}) {
  return (
    <Badge color={getTagColor(value)} variant="filled" radius={3}>
      {value.toUpperCase()}
    </Badge>
  );
}

export default TagRenderer;
