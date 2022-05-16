import { HeaderGroupsProps, HeadersProps } from './props'

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
  render: (accessor: string) => React.ReactNode
  tableHeaderProps: () => HeadersProps
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
