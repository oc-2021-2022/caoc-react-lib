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
  hooks: [any, any, any]
): {
  dataRow: any[]
  hooksFn: Pagination & Omit<Search, 'searchArray'>
  deps: any[]
} {
  const [useSort, usePagination, useSearch] = hooks

  const [dataRow, setDataRow] = useState(data)
  const { searchTherm, searchArray } = useSearch ? useSearch(data) : []
  const { sortData } = useSort ? useSort(tableHeaders, data) : []
  const {
    matrix,
    goToPage,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    updateLimit,
    limit,
    limitArray
  } = usePagination ? usePagination(data) : []

  /*
    Try to find another way for this s...
  */
  useEffect(() => {
    setDataRow(searchArray)
  }, [searchArray])

  useEffect(() => {
    setDataRow(sortData)
  }, [sortData])

  useEffect(() => {
    if (matrix.length) {
      setDataRow(matrix)
    }
  }, [matrix])

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
      searchTherm
    },
    deps: [matrix[currentPage]]
  }
}
