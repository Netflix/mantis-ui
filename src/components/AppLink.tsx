import { Anchor } from '@mantine/core';
import { ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

function AppLink({ item, to }: { item: ReactNode; to: To }) {
  return (
    <Anchor component={Link} to={to}>
      {item}
    </Anchor>
  );
}

export default AppLink;
