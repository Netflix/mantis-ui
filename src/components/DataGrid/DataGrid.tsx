import style from './DataGrid.module.css';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridApi } from '@ag-grid-community/core';
import { memo, useCallback, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';

interface DataGridProps extends AgGridReactProps {
  recordTypes?: string;
  showFooter?: boolean;
  loading?: boolean;
}

const icons = Object.freeze({
  sortAscending: renderToStaticMarkup(<CaretUpOutlined />),
  sortDescending: renderToStaticMarkup(<CaretDownOutlined />),
});

function NoRowsOverlay() {
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
}

function DataGrid({
  rowData = [],
  columnDefs = [],
  headerHeight = 40,
  recordTypes = 'records',
  showFooter = true,
  loading = false,
  modules = [ClientSideRowModelModule],
  frameworkComponents = {},
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
    <Spin
      tip={`Loading ${recordTypes}...`}
      spinning={loading}
      wrapperClassName="flex flex-col h-full"
    >
      <AgGridReact
        className="ag-theme-alpine"
        columnDefs={columnDefs}
        rowData={rowData}
        headerHeight={headerHeight}
        defaultColDef={defaultColDef}
        icons={icons}
        modules={modules}
        animateRows={true}
        reactUi={true}
        rowSelection={rowSelection}
        rowMultiSelectWithClick={rowMultiSelectWithClick}
        suppressCellSelection={true}
        enableCellTextSelection={true}
        onFilterChanged={onFilterChanged}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        frameworkComponents={
          { noRowsOverlay: NoRowsOverlay, ...frameworkComponents } as {
            [p: string]: { new (): unknown };
          }
        }
        noRowsOverlayComponent={'noRowsOverlay'}
      />
      {footer}
    </Spin>
  );
}

export default memo(DataGrid);
