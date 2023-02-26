import { Anchor } from '@mantine/core';
import { Link } from 'react-location';

function LinkRenderer({
  value,
  data,
  getTo,
}: {
  value: string;
  data: unknown;
  getTo: (data: unknown) => string | number | null;
}) {
  return (
    <Anchor component={Link} to={getTo(data)}>
      {value}
    </Anchor>
  );
}

export default LinkRenderer;
