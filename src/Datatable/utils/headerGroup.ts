import {
  DatatableHeader,
  DatatableHeaderColumn,
  DatatableHeaderGroups
} from '../Type'

/**
 * It takes a headerGroup and returns an object with two functions: getColumns and getAccessors
 * @param {DatatableHeaderGroups[]} headerGroup - DatatableHeaderGroups[]
 * @returns An object with two functions.
 */
export function headerGroupUtils(headerGroup: DatatableHeaderGroups[]) {
  return {
    getColumns: getColumns(headerGroup),
    getAccessors: getAccessors(headerGroup)
  }
}

/**
 * `getColumns` takes an array of `DatatableHeaderGroups` and returns an array of `DatatableHeaders`
 * @param {DatatableHeaderGroups[]} headerGroup - DatatableHeaderGroups[]
 * @returns An array of DatatableHeader[]
 */
function getColumns(headerGroup: DatatableHeaderGroups[]): DatatableHeader[] {
  return headerGroup
    .map(({ headers }: DatatableHeaderGroups): DatatableHeader[] => headers)
    .flat()
}

/**
 * It takes a header group, gets the columns, maps the accessors, filters out the undefined accessors,
 * and returns the result
 * @param {DatatableHeaderGroups[]} headerGroup - DatatableHeaderGroups[]
 * @returns An array of strings.
 */
function getAccessors(
  headerGroup: DatatableHeaderGroups[]
): (string | undefined)[] {
  return getColumns(headerGroup)
    .map(({ accessor }: DatatableHeaderColumn) => accessor)
    .filter((accessor: string | undefined) => accessor !== undefined)
}
