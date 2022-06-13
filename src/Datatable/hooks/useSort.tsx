import { DatatableHeader, DatatableHeaderGroups } from '../Type'
import { useCallback, useState } from 'react'

import { headerGroupUtils } from '../utils/headerGroup'

// @TODO: Move this another place
let sortOrder = 1

/**
 * It adds a `onClick` prop to each header column, and when the header column is clicked, it sorts the
 * data by that column
 * @param {DatatableHeaderGroups[]} headers - DatatableHeaderGroups[]
 * @param {any} data - The data that you want to sort.
 * @returns An object with a sortData property.
 */
export function useSort(headers: DatatableHeaderGroups[], data: any) {
  const [sortData, setSortData] = useState<any>(data)

  const handleClick = useCallback((column: DatatableHeader) => {
    const dataSorted = [...sortByHeader(column, data)]
    setSortData(dataSorted)
  }, [])

  addSortPropsToHeaderColumn(headers, handleClick)

  return {
    sortData
  }
}

/**
 * It adds a `style` and `onClick` prop to the `sortColumnProps` of each column that can be sorted
 * @param {DatatableHeaderGroups[]} headerGroup - DatatableHeaderGroups[] - This is the header group
 * that you want to add the sort props to.
 * @param handleClick - (column: DatatableHeader) => void
 */
function addSortPropsToHeaderColumn(
  headerGroup: DatatableHeaderGroups[],
  handleClick: (column: DatatableHeader) => void
): void {
  headerGroupUtils(headerGroup).getColumns.map((column: DatatableHeader) => {
    if (column.canSort) {
      Object.assign(column.sortColumnProps, {
        style: {
          ...column.tableHeaderProps().style,
          cursor: 'pointer'
        },
        onClick: () => handleClick(column)
      })
    }
  })
}

/**
 * Sort the data by the column header, and then flip the sort order
 * @param {DatatableHeader} column - DatatableHeader - The column header that was clicked
 * @param {any} data - The data that you want to sort.
 * @returns The sorted data
 */
function sortByHeader(column: DatatableHeader, data: any) {
  const [key, subkey] = (column.accessor as string).split('.')
  const sortedData = data.sort((a: any, b: any) => {
    if (a[key][subkey] > b[key][subkey]) {
      return 1 * sortOrder
    }
    if (a[key][subkey] < b[key][subkey]) {
      return -1 * sortOrder
    }
    return 0
  })
  sortOrder = sortOrder < 0 ? Math.abs(sortOrder) : -Math.abs(sortOrder)
  return sortedData
}