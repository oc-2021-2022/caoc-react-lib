import { DatatableHeader, DatatableHeaderGroups } from '../Type'
import { useCallback, useState } from 'react'

import { headerGroupUtils } from '../utils/headerGroup'

let sortOrder = 1

export function useFilter(headers: DatatableHeaderGroups[], data: any) {
  const [sortData, setSortData] = useState<any>([])

  const handleClick = useCallback((column: DatatableHeader) => {
    const dataSorted = [...sortByHeader(column, data)]
    setSortData(dataSorted)
  }, [])

  addSortPropsToHeaderColumn(headers, handleClick)

  return {
    sortData
  }
}

function addSortPropsToHeaderColumn(
  headerGroup: DatatableHeaderGroups[],
  handleClick: any
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
