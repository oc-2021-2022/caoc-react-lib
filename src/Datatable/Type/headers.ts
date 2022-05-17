import { HeaderGroupsProps, HeadersProps, SortColumnProps } from './props'

export type MainHeaderColumn = {
  title: string
  columns: HeaderColumn[]
}

export type HeaderColumn = {
  title: string
  accessor?: string
}

export type GenericColumn = {
  title: string
  accessor?: string
  columns?: HeaderColumn[]
}

export type DatatableHeaderColumn = {
  title: string
  parent: string | undefined
  accessor: string | undefined
  canSort: boolean
  isSorted: boolean
  render: (accessor: string) => React.ReactNode
  tableHeaderProps: (props: SortColumnProps) => HeadersProps
  sortColumnProps?: () => SortColumnProps
}

export type DatatableHeader = DatatableHeaderColumn & {
  columns?: DatatableHeaderColumn[]
}

export type DatatableHeaderGroups = {
  headers: DatatableHeader[]
  tableHeaderGroupsProps: () => HeaderGroupsProps
}

export type TDatatable = {
  columns: MainHeaderColumn[]
  data: any
}
