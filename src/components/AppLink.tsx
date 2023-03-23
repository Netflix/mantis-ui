import { Anchor } from '@mantine/core';
import type { ReactNode } from 'react';
import type { To } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AppLink({ item, to }: { item: ReactNode; to: To }) {
  return (
    <Anchor component={Link} to={to}>
      {item}
    </Anchor>
  );
}

export default AppLink;
