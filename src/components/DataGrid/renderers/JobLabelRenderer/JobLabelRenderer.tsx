import { Badge } from '@mantine/core';

import { LabelTag } from '@/utils/job';

function TagRenderer({
  value: labels,
  getTagColor,
}: {
  value: LabelTag[];
  getTagColor: (type: string) => string;
}) {
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

export default TagRenderer;
