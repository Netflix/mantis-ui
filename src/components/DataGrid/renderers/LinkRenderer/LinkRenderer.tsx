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
  return <Link to={getTo(data)}>{value}</Link>;
}

export default LinkRenderer;
