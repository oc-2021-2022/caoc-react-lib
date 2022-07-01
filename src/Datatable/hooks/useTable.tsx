import {
  DatatableHeaderGroups,
  Pagination,
  Row,
  Search,
  TDatatable
} from '../Type'
import { generateHeader, generateRowGroups } from '../Datatable'
import { useEffect, useMemo, useState } from 'react'

/**
 * It takes in data and columns, and returns a tableHeaders, rows, and hooksFn
 * @param {TDatatable}  - TDatatable - the props that are passed to the datatable component
 * @param {Function[]} hooks - Array of hooks that will be used to manipulate the data.
 */
export function useTable(
  { data, columns }: TDatatable,
  ...hooks: Function[]
): any {
  const tableHeaders = useMemo<DatatableHeaderGroups[]>(
    () => generateHeader(columns),
    [columns]
  )

  const { dataRow, hooksFn, deps } = hookOrchestrator(data, tableHeaders, hooks)

  const rows = useMemo<Row[]>(() => {
    return generateRowGroups(
      Array.isArray(dataRow[0]) ? dataRow[hooksFn.currentPage] : dataRow,
      tableHeaders
    )
  }, [dataRow, deps])

  return {
    tableHeaders,
    rows,
    ...hooksFn
  }
}

/**
 * It takes in data, table headers, and hooks, and returns a dataRow, hooksFn, and deps
 * @param {any} data - any - the data you want to manipulate
 * @param {DatatableHeaderGroups[]} tableHeaders - DatatableHeaderGroups[]
 * @param {Function[]} hooks - Function[]
 * @TODO: Big Refacto needed
 */
function hookOrchestrator(
  data: any,
  tableHeaders: DatatableHeaderGroups[],
  hooks: Function[]
): {
  dataRow: any[]
  hooksFn: Pagination & Omit<Search, 'searchArray'>
  deps: any
} {
  const { useSort, useSearch, usePagination } = hooks.reduce(
    (acc: any, val: any) => ({ ...acc, [val.name]: val }),
    {}
  )
  const [dataRow, setDataRow] = useState<any[]>(data)

  const search = useSearch ? useSearch(data) : {}

  const tempData = useMemo(
    () => (search?.searchArray?.length ? search.searchArray : data),
    [search?.searchArray]
  )

  const sort = useSort ? useSort(tableHeaders, tempData) : {}

  const paginate = usePagination
    ? usePagination(tempData, [sort?.sortData, tempData])
    : {}

  useEffect(() => {
    if (paginate.matrix) setDataRow(paginate.matrix)
    else setDataRow(tempData)
  }, [tempData, paginate?.matrix])

  return {
    dataRow,
    hooksFn: {
      matrix: paginate?.matrix,
      goToPage: paginate?.goToPage,
      currentPage: paginate?.currentPage,
      goToNextPage: paginate?.goToNextPage,
      goToPreviousPage: paginate?.goToPreviousPage,
      updateLimit: paginate?.updateLimit,
      limit: paginate?.limit,
      limitArray: paginate?.limitArray,
      handleSearch: search?.handleSearch
    },
    deps: []
  }
}
