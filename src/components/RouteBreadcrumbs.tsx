import { Breadcrumbs } from '@mantine/core';
import { Link, useMatches } from 'react-router-dom';

import { RouteHandle } from '@/components/Router/routes';

function RouteBreadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => {
      const handle = match.handle as RouteHandle;
      return !!handle?.breadcrumb;
    })
    .map((match, index, filteredMatches) => {
      const handle = match.handle as RouteHandle;
      const breadcrumb =
        typeof handle?.breadcrumb === 'function'
          ? handle.breadcrumb(match.params)
          : (handle?.breadcrumb as string);
      const isLast = index === filteredMatches.length - 1;
      return isLast ? (
        <span key={match.pathname}>{breadcrumb}</span>
      ) : (
        <Link key={match.pathname} to={match.pathname}>
          {breadcrumb}
        </Link>
      );
    });

  return <Breadcrumbs separator=">">{crumbs}</Breadcrumbs>;
}

export default RouteBreadcrumbs;
