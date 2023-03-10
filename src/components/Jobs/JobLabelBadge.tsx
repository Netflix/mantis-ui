import { Badge } from '@mantine/core';

import { LabelTag } from '@/utils/job';

function JobLabelBadge({ labels }: { labels: LabelTag[] }) {
  const getTagColor = (type: string) => {
    switch (type) {
      case 'danger':
        return 'red';
      case 'warning':
        return 'yellow';
      default:
        return 'blue';
    }
  };
  return (
    <span className="flex flex-wrap gap-1 my-2">
      {Array.isArray(labels) &&
        labels.map((label) => {
          return (
            <Badge
              key={label.labelName}
              color={getTagColor(label.labelType)}
              variant="filled"
              radius={3}
            >
              {label.name.toUpperCase()}
            </Badge>
          );
        })}
    </span>
  );
}

export default JobLabelBadge;
