import { Tag } from 'antd';
import { LabelTag } from '@/utils/job';

function TagRenderer({
  value: labels,
  getTagColor,
}: {
  value: LabelTag[];
  getTagColor: (type: string) => string;
}) {
  return (
    <>
      {Array.isArray(labels) &&
        labels.map((label) => {
          return (
            <Tag key={label.labelName} color={getTagColor(label.labelType)}>
              {label.name.toUpperCase()}
            </Tag>
          );
        })}
    </>
  );
}

export default TagRenderer;
