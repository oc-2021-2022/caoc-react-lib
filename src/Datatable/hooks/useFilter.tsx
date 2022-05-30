import { DatatableHeader, DatatableHeaderGroups } from '../Type'
import { useCallback, useState } from 'react'

import { headerGroupUtils } from '../utils/headerGroup'

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
      return 1
    }
    if (a[key][subkey] < b[key][subkey]) {
      return -1
    }
    return 0
  })
  return sortedData
}
