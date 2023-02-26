import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridApi } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { LoadingOverlay } from '@mantine/core';
import { memo, useCallback, useRef, useState } from 'react';

import style from './DataGrid.module.css';

interface DataGridProps extends AgGridReactProps {
  recordTypes?: string;
  showFooter?: boolean;
  loading?: boolean;
}

function DataGrid({
  rowData = [],
  columnDefs = [],
  headerHeight = 40,
  recordTypes = 'records',
  showFooter = true,
  loading = false,
  modules = [ClientSideRowModelModule],
  components = {},
  rowSelection = undefined,
  rowMultiSelectWithClick = false,
  onSelectionChanged,
}: DataGridProps) {
  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    minWidth: 50,
    filterParams: {
      newRowsAction: 'keep',
    },
  };
  const totalCount = rowData?.length;
  const gridApi = useRef<null | GridApi>(null);
  const [isFiltered, setFiltered] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);

  const footer = showFooter ? (
    <div className={`${style.footer} flex flex-row items-center pl-4`}>
      {isFiltered ? (
        <>
          <strong>Showing:</strong>&nbsp;{filteredCount} of {totalCount}
        </>
      ) : (
        <>
          <strong>Total:</strong>&nbsp;{totalCount}
        </>
      )}{' '}
      {recordTypes}
    </div>
  ) : null;

  const onGridReady = useCallback(
    ({ api }: { api: GridApi }) => {
      gridApi.current = api;
    },
    [gridApi],
  );

  const onFilterChanged = useCallback(() => {
    if (gridApi?.current) {
      setFiltered(Object.keys(gridApi.current.getFilterModel()).length > 0);
      setFilteredCount(gridApi.current.getDisplayedRowCount());
    }
  }, [gridApi]);

  return (
    <>
      <LoadingOverlay visible={loading} />
      <AgGridReact
        className="ag-theme-alpine"
        columnDefs={columnDefs}
        rowData={rowData}
        headerHeight={headerHeight}
        defaultColDef={defaultColDef}
        modules={modules}
        animateRows={true}
        rowSelection={rowSelection}
        rowMultiSelectWithClick={rowMultiSelectWithClick}
        enableCellTextSelection={true}
        onFilterChanged={onFilterChanged}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        components={components}
      />
      {footer}
    </>
  );
}

export default memo(DataGrid);
