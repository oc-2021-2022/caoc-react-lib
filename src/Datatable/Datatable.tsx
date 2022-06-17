import {
  DatatableHeader,
  DatatableHeaderColumn,
  DatatableHeaderGroups,
  GenericColumn,
  Row
} from './Type'

import { headerGroupUtils } from './utils/headerGroup'

export function generateHeader(
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

export function generateHeaderGroups(
  header: GenericColumn,
  parent?: string,
  canSort: boolean = false
): DatatableHeader {
  const headerGroups: DatatableHeader = {
    title: '',
    parent,
    accessor: header.accessor,
    canSort: canSort,
    isSorted: false,
    render: () => {
      return header.title
    },
    tableHeaderProps: (props) => ({
      key: header.title.toLowerCase(),
      colSpan: headerGroups.columns?.length,
      style: {
        border: '1px solid black',
        margin: '0',
        padding: '0.5rem'
      },
      ...props
    }),
    sortColumnProps: {}
  }

  headerGroups.title = header.title
  if (header.columns)
    headerGroups.columns = header.columns.map((column: GenericColumn) =>
      generateHeaderGroups(column, header.title, true)
    )

  return headerGroups
}

export function generateRowGroups(
  data: any,
  headersGroup: DatatableHeaderGroups[]
): Row[] {
  const accessors = headerGroupUtils(headersGroup).getAccessors

  const rows: Row[] = data.map((item: any, index: number) => {
    const result = {
      values: {},
      getRowProps: () => ({
        key: `rows-${index}`
      })
    }

    // eslint-disable-next-line dot-notation
    result['cells'] = accessors.map((accessor: string) => {
      const [row, subrow] = accessor.split('.')
      const value = row && subrow ? item[row][subrow] : item[row]
      const render = () => {
        return value
      }

      const getCellProps = () => ({
        key: `row-${index}-${value}`
      })
      return {
        value,
        render,
        getCellProps
      }
    })

    result.values = accessors.map((accessor: string) => {
      const values = {}
      const [row, subrow] = accessor.split('.')
      values[accessor] = row && subrow ? item[row][subrow] : item[row]
      return values
    })

    return result
  })

  return rows
}
