import {
  DatatableHeader,
  DatatableHeaderColumn,
  DatatableHeaderGroups
} from '../Type'

export function headerGroupUtils(headerGroup: DatatableHeaderGroups[]) {
  return {
    getColumns: getColumns(headerGroup),
    getAccessors: getAccessors(headerGroup)
  }
}

function getColumns(headerGroup: DatatableHeaderGroups[]): DatatableHeader[] {
  return headerGroup
    .map(({ headers }: DatatableHeaderGroups): DatatableHeader[] => headers)
    .flat()
}

function getAccessors(
  headerGroup: DatatableHeaderGroups[]
): (string | undefined)[] {
  return getColumns(headerGroup)
    .map(({ accessor }: DatatableHeaderColumn) => accessor)
    .filter((accessor: string | undefined) => accessor !== undefined)
}
