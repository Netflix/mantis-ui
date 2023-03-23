import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import type { TypeDataGridProps, TypeDataSource } from '@inovua/reactdatagrid-community/types';

interface DataGridProps extends Partial<TypeDataGridProps> {
  dataSource: TypeDataSource;
  recordTypes: string;
}

const filterTypes = Object.assign({}, ReactDataGrid.defaultProps.filterTypes, {
  region: {
    name: 'region',
    operators: [
      {
        name: 'includes',
        fn: ({ value, filterValue }: { filterValue: string[]; value: string[] }) => {
          if (!filterValue) {
            return true;
          }
          return filterValue.every((filter) => value.includes(filter));
        },
      },
    ],
  },
});

function DataGrid({ columns = [], dataSource, recordTypes, ...others }: DataGridProps) {
  const gridStyle = { minHeight: 550, width: '100%' };
  const defaultColDef = {
    defaultFlex: 1,
  };
  const columnsWithDefaults = columns.map((column) => ({
    ...defaultColDef,
    ...column,
  }));

  return (
    <div className="flex h-full flex-col">
      <ReactDataGrid
        columns={columnsWithDefaults}
        dataSource={dataSource}
        showCellBorders={'horizontal'}
        style={gridStyle}
        filterTypes={filterTypes}
        {...others}
      />
      {Array.isArray(dataSource) && (
        <div className="border-1 border-t-0 border-solid border-[#E5E8EB] p-2 text-sm text-[#555e68]">
          <strong>Total:</strong> {dataSource.length} {recordTypes}
        </div>
      )}
    </div>
  );
}

export default DataGrid;
