import { OptionList, OptionProps } from './Option'

import { Label } from '../shared/'
import React from 'react'

export type SelectProps = {
  name?: string
  label?: string
  required?: boolean
  children?: React.ReactNode
  options?: OptionProps[] | undefined,
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ name, required, label, children, options, handleChange }: SelectProps): JSX.Element => {
  return (
    <React.Fragment>
      {label ? <Label name={name}/> : null}
      <select onChange={ handleChange } name={name} id={label || ''} required={required}>
        {
          (children || null) ||
          (<OptionList options={options} /> || null)
        }
      </select>
    </React.Fragment>
  )
}
