/**
 * DefaultProps is an object with a key property of type string and an optional class property of type
 * string.
 * @property {string} key - The key is a unique identifier for the component.
 * @property {string} class - This is the class name that will be applied to the component.
 */
type DefaultProps = {
  key: string
  class?: string
  style?: {
    [keyof: string]: string | number | boolean
  }
}

export type HeaderGroupsProps = DefaultProps & {}

/**
 * `HeadersProps` is an object with a `colSpan` property that is either a number or undefined.
 * @property {number | undefined} colSpan - The number of columns that the header spans.
 */
export type HeadersProps = DefaultProps & {
  colSpan: number | undefined
}

/**
 * `SortColumnProps` is an object with a `style` property that is an object with any number of
 * properties, and an optional `onClick` property that is either null or a function that returns
 * nothing.
 * @property style - This is the style object that will be applied to the column header.
 * @property {null | (() => void)} onClick - This is a function that will be called when the user
 * clicks on the column header.
 */
export type SortColumnProps = {
  style?: {
    [keyof: string]: string | number | boolean
  }
  onClick?: null | (() => void)
}

export type RowProps = DefaultProps & {}
export type CellProps = DefaultProps & {}
