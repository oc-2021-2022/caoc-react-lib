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
 * It takes in an array of columns and an array of data and returns an array of table headers and an
 * array of rows
 * @param {TDatatable}  - TDatatable
 * @returns An object with two properties: tableHeaders and rows.
 */
export function useTable({ data, columns }: TDatatable, ...hooks: any): any {
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
 * It takes in data, tableHeaders, and hooks, and returns dataRow, hooksFn, and deps
 * @param {any} data - any,
 * @param {DatatableHeaderGroups[]} tableHeaders - DatatableHeaderGroups[]
 * @param hooks - [useSort, usePagination, useSearch]
 * @returns An object with the following properties:
 */
function hookOrchestrator(
  data: any,
  tableHeaders: DatatableHeaderGroups[],
  hooks: any
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
