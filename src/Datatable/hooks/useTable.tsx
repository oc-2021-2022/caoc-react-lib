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
  hooks: Function[]
): {
  dataRow: any[]
  hooksFn: Pagination & Omit<Search, 'searchArray'>
  deps: any
} {
  const [useSort, useSearch, usePagination] = hooks

  const dataDeps = []
  const [dataRow, setDataRow] = useState<any[]>([])

  const search = useSearch(data)
  const sort = useSort(tableHeaders, search?.searchArray || data, [
    search?.searchArray
  ])

  if (search.searchArray) {
    dataDeps.push(search.searchArray, sort.sortData)
  }

  const {
    matrix,
    goToPage,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    updateLimit,
    limit,
    limitArray
  } = usePagination
    ? usePagination(search?.searchArray.length ? search.searchArray : data)
    : []

  if (matrix) {
    dataDeps.push(limit, matrix[currentPage])
  }

  useEffect(() => {
    if (matrix && matrix.length) setDataRow(matrix)
    else setDataRow(search?.searchArray || data)
  }, [data, ...dataDeps])

  return {
    dataRow,
    hooksFn: {
      matrix,
      goToPage,
      currentPage,
      goToNextPage,
      goToPreviousPage,
      updateLimit,
      limit,
      limitArray,
      handleSearch: search?.handleSearch
    },
    deps: dataDeps
  }
}
