import {
  DatatableHeader,
  DatatableHeaderColumn,
  DatatableHeaderGroups,
  GenericColumn,
  Row
} from './Type'

import { headerGroupUtils } from './utils/headerGroup'

/**
 * It takes a list of columns and returns a list of header groups
 * @param {GenericColumn[]} headers - GenericColumn[]
 * @param {string} [parent] - The parent column name. This is used to generate the header groups.
 * @returns An array of objects with the following properties:
 *   - headers: an array of objects with the following properties:
 *     - key: a string
 *     - label: a string
 *     - props: an object with the following properties:
 *       - key: a string
 *       - className: a string
 *       - style: an object with the following properties:
 *         - width
 */
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

/**
 * It takes a header object, and returns a header object with the same properties, but with the
 * addition of a `columns` property, which is an array of header objects
 * @param {GenericColumn} header - GenericColumn - This is the header object that we're going to be
 * generating the header groups for.
 * @param {string} [parent] - This is the parent header of the current header.
 * @param {boolean} [canSort=false] - boolean = false
 * @returns An array of objects with the following properties:
 *   title: string
 *   parent: string
 *   accessor: string
 *   canSort: boolean
 *   isSorted: boolean
 *   render: function
 *   tableHeaderProps: function
 *   sortColumnProps: object
 */
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

/**
 * It takes an array of objects and an array of headers and returns an array of rows
 * @param {any} data - any,
 * @param {DatatableHeaderGroups[]} headersGroup - DatatableHeaderGroups[]
 * @returns An array of objects.
 */
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
