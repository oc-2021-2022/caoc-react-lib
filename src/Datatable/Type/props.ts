type DefaultProps = {
  key: string
  class?: string
}

export type HeaderGroupsProps = DefaultProps & {}

export type HeadersProps = DefaultProps & {
  colSpan: number | undefined
}

export type SortColumnProps = {
  pointer: string
  onClick: () => void
}

export type RowProps = DefaultProps & {}
export type CellProps = DefaultProps & {}
