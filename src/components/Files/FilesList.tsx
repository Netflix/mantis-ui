import DataGrid from '@/components/DataGrid';
import DateTime from '@/components/DateTime';
import { useArtifacts } from '@/hooks/useArtifacts';
import formatFileSize from '@/utils/file';

function FilesList() {
  const filterValue = [{ name: 'key', operator: 'contains', type: 'string', value: null }];
  const columns = [
    {
      name: 'key',
      header: 'File Name',
      render: ({ value }: { value: string }) => value?.split('/')?.pop() ?? '',
      defaultFlex: 2,
    },
    {
      name: 'size',
      header: 'Size',
      render: ({ value }: { value: number }) => formatFileSize(value),
    },
    {
      name: 'lastModified',
      header: 'Last Modified',
      render: ({ value }: { value: number }) => <DateTime date={value} />,
    },
  ];
  const { data = [], isLoading } = useArtifacts();

  return (
    <DataGrid
      columns={columns}
      dataSource={data}
      defaultFilterValue={filterValue}
      loading={isLoading}
      defaultSortInfo={{ name: 'key', dir: 1 }}
      recordTypes="Artifacts"
    />
  );
}

export default FilesList;
