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
  deps: any
} {
  const [useSort, useSearch, usePagination] = hooks
  const [dataRow, setDataRow] = useState([])

  const { sortData } = useSort ? useSort(tableHeaders, data) : []
  const { searchTherm, searchArray } = useSearch ? useSearch(data) : []

  const filteredData = useMemo(() => {
    if (searchArray && searchArray.length) {
      return searchArray
    }
    if (
      sortData &&
      sortData.length &&
      (JSON.stringify(sortData[0]) !== JSON.stringify(dataRow[0][0]) ||
        JSON.stringify(sortData[0]) !== JSON.stringify(dataRow[0]))
    ) {
      return sortData
    }
    return data
  }, [searchArray, sortData])

  const {
    matrix,
    goToPage,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    updateLimit,
    limit,
    limitArray
  } = usePagination ? usePagination(filteredData || data) : []

  const matrixDeps = matrix ? [limit, matrix[currentPage]] : []

  useEffect(() => {
    if (matrix && matrix.length) setDataRow(matrix)
    else setDataRow(filteredData)
  }, [filteredData, ...matrixDeps])

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
    deps: matrixDeps
  }
}
