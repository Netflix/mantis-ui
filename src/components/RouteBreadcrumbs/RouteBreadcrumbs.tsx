import { Breadcrumb } from 'antd';
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
      return (
        <Breadcrumb.Item key={match.pathname}>
          {isLast ? breadcrumb : <Link to={match.pathname}>{breadcrumb}</Link>}
        </Breadcrumb.Item>
      );
    });

  return <Breadcrumb separator=">">{crumbs}</Breadcrumb>;
}

export default RouteBreadcrumbs;
