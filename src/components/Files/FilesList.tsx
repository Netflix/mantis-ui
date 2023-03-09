import { useMemo } from 'react';

import DataGrid from '@/components/DataGrid/DataGrid';
import DateTimeRenderer from '@/components/DataGrid/renderers/DateTimeRenderer/DateTimeRenderer';
import { useArtifacts } from '@/hooks/useArtifacts';
import formatFileSize from '@/utils/file';

function FilesList() {
  const columnDefs = useMemo(
    () => [
      {
        field: 'key',
        valueFormatter: ({ value }: { value: string }) => value?.split('/')?.pop() ?? '',
        flex: 2,
      },
      {
        field: 'size',
        valueFormatter: ({ value }: { value: number }) => {
          return formatFileSize(value);
        },
      },
      {
        field: 'lastModified',
        cellRenderer: 'DateTimeRenderer',
        filter: false,
      },
    ],
    [],
  );
  const components = useMemo(
    () => ({
      DateTimeRenderer,
    }),
    [],
  );
  const { data = [] } = useArtifacts();

  return (
    <div className="flex flex-col h-full">
      <DataGrid
        columnDefs={columnDefs}
        rowData={data}
        recordTypes="Artifacts"
        components={components}
      />
    </div>
  );
}

export default FilesList;
