import { DatatableHeaderGroups, Row, TDatatable } from '../Type'
import { generateHeader, generateRowGroups } from '../Datatable'
import { useEffect, useMemo, useState } from 'react'

import { usePagination } from './usePagination'
import { useSearch } from './useSearch'
import { useSort } from './useSort'

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
  hooksFn: any
  deps: any
} {
  // const hooksObj = hooks.reduce(
  //   (acc: any, val: any) => ({ ...acc, [val.name]: val }),
  //   {}
  // )
  const [dataRow, setDataRow] = useState<any[]>(data)

  const mSearch = hooks.find((h) => h === useSearch) ? useSearch(data) : null

  const tempData = useMemo(
    () => (mSearch?.searchArray?.length ? mSearch?.searchArray : data),
    [mSearch?.searchArray]
  )

  const sort = hooks.find((h) => h === useSort)
    ? useSort(tableHeaders, tempData)
    : null

  const paginate = hooks.find((h) => h === usePagination)
    ? usePagination(tempData, [sort?.sortData, tempData])
    : null

  useEffect(() => {
    if (paginate?.matrix) setDataRow(paginate?.matrix)
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
      handleSearch: mSearch?.handleSearch
    },
    deps: []
  }
}
