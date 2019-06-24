import DataGrid from '@/components/DataGrid/DataGrid';
import DateTimeRenderer from '@/components/DataGrid/renderers/DateTimeRenderer/DateTimeRenderer';
import formatFileSize from '@/utils/file';
import { useArtifacts } from '@/hooks/useArtifacts';
import { useMemo } from 'react';

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
  const frameworkComponents = useMemo(
    () => ({
      DateTimeRenderer,
    }),
    [],
  );
  const { data = [] } = useArtifacts();

  return (
    <div className="m-4 flex flex-col h-full">
      <DataGrid
        columnDefs={columnDefs}
        rowData={data}
        recordTypes="Artifacts"
        frameworkComponents={frameworkComponents}
      />
    </div>
  );
}

export default FilesList;
