import { DatatableHeaderGroups, Row, TDatatable } from '../Type'
import { generateHeader, generateRowGroups } from '../Datatable'

import { useMemo } from 'react'

/**
 * It takes in an array of columns and an array of data and returns an array of table headers and an
 * array of rows
 * @param {TDatatable}  - TDatatable
 * @returns An object with two properties: tableHeaders and rows.
 */
export function useTable({ data, columns }: TDatatable, ...hooks: any): any {
  const [useSort, usePagination] = hooks

  const tableHeaders = useMemo<DatatableHeaderGroups[]>(
    () => generateHeader(columns),
    [columns]
  )

  const { sortData } = useSort ? useSort(tableHeaders, data) : []

  const {
    matrix,
    goToPage,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    updateLimit,
    limit
  } = usePagination ? usePagination(sortData || data) : []

  const rows = useMemo<Row[]>(() => {
    return generateRowGroups(matrix[currentPage] || data, tableHeaders)
  }, [sortData, matrix[currentPage]])

  return {
    tableHeaders,
    rows,
    matrix,
    goToNextPage,
    currentPage,
    goToPreviousPage,
    goToPage,
    updateLimit,
    limit
  }
}
