import {
  CellValue,
  DatatableHeader,
  DatatableHeaderColumn,
  DatatableHeaderGroups,
  GenericColumn,
  TDatatable
} from './Type'
import { useEffect, useState } from 'react'

export function useTable({ data, columns }: TDatatable): {
  tableHeaders: DatatableHeaderGroups[]
  rows: CellValue[]
} {
  const [tableHeaders, setTableHeader] = useState<DatatableHeaderGroups[]>([])
  const [rows, setRows] = useState<CellValue[]>([])

  useEffect(() => {
    if (!tableHeaders.length) setTableHeader(generateHeader(columns))
    if (!rows.length && tableHeaders.length)
      setRows(generateCellGroups(data, tableHeaders))
    return () => {}
  }, [tableHeaders])
  console.log(rows)
  return {
    tableHeaders,
    rows
  }
}

function generateHeader(
  headers: GenericColumn[],
  parent?: string
): DatatableHeaderGroups[] {
  const columns: DatatableHeaderColumn[] = []
  return [
    {
      headers: headers.map((header: GenericColumn): DatatableHeader => {
        const headerGroups = generateHeaderGroups(header, parent)
        if (headerGroups.columns) columns.push(...headerGroups.columns)
        return headerGroups
      }),
      tableHeaderGroupsProps: () => ({
        key: 'table-header-main-groups'
      })
    },
    {
      headers: columns,
      tableHeaderGroupsProps: () => ({
        key: 'table-header-groups'
      })
    }
  ]
}

function generateHeaderGroups(
  header: GenericColumn,
  parent?: string
): DatatableHeader {
  const headerGroups: DatatableHeader = {
    title: '',
    parent,
    accessor: header.accessor,
    render: function (accessor: string): React.ReactNode {
      return header[accessor]
    },
    tableHeaderProps: () => {
      return {
        key: header.title.toLowerCase(),
        colSpan: headerGroups.columns?.length
      }
    }
  }

  headerGroups.title = header.title
  if (header.columns)
    headerGroups.columns = generateHeaderColumns(header.columns, header.title)

  return headerGroups
}

function generateHeaderColumns(columns: GenericColumn[], parent: string) {
  return columns.map((column: GenericColumn) =>
    generateHeaderGroups(column, parent)
  )
}

function generateCellGroups(
  data: any,
  headersGroup: DatatableHeaderGroups[]
): CellValue[] {
  const accessors = headersGroup
    .map(({ headers }: DatatableHeaderGroups) => headers)
    .flat()
    .map(({ accessor }: DatatableHeaderColumn) => accessor)
    .filter((accessor: string | undefined) => accessor !== undefined)

  const cells = data.map((item: any) => {
    // const values = {}
    return accessors.map((accessor: string) => {
      const [row, subrow] = accessor.split('.')
      // values[accessor] = item[row][subrow]
      return item[row][subrow]
    })
    // return values
  })
  return cells
}
