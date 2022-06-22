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
  const deps = []

  const { useSort, useSearch, usePagination } = hooks.reduce(
    (a: any, v: any) => ({ ...a, [v.name]: v }),
    {}
  )
  const [dataRow, setDataRow] = useState<any[]>([])

  const search = useSearch ? useSearch(data) : {}

  const sort = useSort
    ? useSort(tableHeaders, search?.searchArray || data, [search?.searchArray])
    : {}
  const paginate = usePagination
    ? usePagination(search?.searchArray || data, [
        search?.searchArray,
        sort?.sortData
      ])
    : []

  if (search.searchArray) deps.push(search.searchArray)
  if (sort.sortData) deps.push(sort.sortData)
  if (paginate.matrix && paginate.limit && paginate.current)
    deps.push(paginate.limit, paginate.matrix[paginate.current])

  useEffect(() => {
    if (paginate.matrix) setDataRow(paginate?.matrix)
    else setDataRow(search?.searchArray || data)
  }, [data, ...deps])

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
    deps
  }
}
