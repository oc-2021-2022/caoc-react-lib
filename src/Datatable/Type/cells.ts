import { CellProps, RowProps } from './props'

export type CellValue = {
  [keyof: string]: string | boolean | [] | object | number
}

export type Cells = {
  render: () => React.ReactNode
  getCellProps: () => CellProps
}

export type Row = {
  cells: Cells
  values: CellValue | string[]
  getRowProps: () => RowProps
}
