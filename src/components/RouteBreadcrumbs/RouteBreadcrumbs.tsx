import { Breadcrumbs } from '@mantine/core';
import { Link, useMatches } from 'react-location';

function RouteBreadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => match.route.meta?.breadcrumb)
    .map((match, index, filteredMatches) => {
      const breadcrumb =
        typeof match.route.meta?.breadcrumb === 'function'
          ? (match.route.meta.breadcrumb(match.params) as string)
          : (match.route.meta?.breadcrumb as string);
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
