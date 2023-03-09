import { Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';

function LinkRenderer({
  value,
  data,
  getTo,
}: {
  value: string;
  data: unknown;
  getTo: (data: unknown) => string;
}) {
  return (
    <Anchor component={Link} to={getTo(data)}>
      {value}
    </Anchor>
  );
}

export default LinkRenderer;
