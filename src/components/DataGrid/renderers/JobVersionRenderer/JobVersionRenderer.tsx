import { Version } from '@/types/cluster';
import { Tag } from 'antd';

function JobVersionRenderer({ value: versions }: { value: Version[] }) {
  const prodColor = getComputedStyle(document.documentElement).getPropertyValue('--prod-color');
  const testColor = getComputedStyle(document.documentElement).getPropertyValue('--test-color');

  return (
    Array.isArray(versions) &&
    versions.map((item) => (
      <Tag
        key={`${item.env}:${item.region}:${item.version}`}
        color={item.disabled ? '#EBEBE4' : item.env === 'prod' ? prodColor : testColor}
      >
        <span className={item.disabled ? 'text-neutral-400' : ''}>
          v{item.version} in {item.env} / {item.region} {item.disabled && '(disabled)'}
        </span>
      </Tag>
    ))
  );
}

export default JobVersionRenderer;
