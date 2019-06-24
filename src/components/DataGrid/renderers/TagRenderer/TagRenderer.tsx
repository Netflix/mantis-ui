import { Tag } from 'antd';

function TagRenderer({
  value,
  getTagColor,
}: {
  value: string;
  getTagColor: (value: string) => string;
}) {
  return <Tag color={getTagColor(value)}>{value.toUpperCase()}</Tag>;
}

export default TagRenderer;
