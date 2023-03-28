import { Anchor } from '@mantine/core';
import type { ReactNode } from 'react';
import type { To } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AppLink({ className = '', item, to }: { className?: string; item: ReactNode; to: To }) {
  return (
    <Anchor className={className} component={Link} to={to}>
      {item}
    </Anchor>
  );
}

export default AppLink;
