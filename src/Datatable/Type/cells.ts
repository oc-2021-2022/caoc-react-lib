import { CellProps, RowProps } from './props'

export type CellValue = {
  [keyof: string]: string | boolean | [] | object | number
}

export type Cells = {
  value: string
  render: () => React.ReactNode
  getCellProps: () => CellProps
}

export type Row = {
  cells: Cells
  values: any
  getRowProps: () => RowProps
}
