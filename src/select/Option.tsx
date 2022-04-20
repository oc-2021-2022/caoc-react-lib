import React from 'react'

export type OptionProps = {
  value?: string | number
  text: string
}


export function Option({ value, text }: OptionProps): JSX.Element {
  return <option value={value || text}>{ text }</option>
}

export function OptionList({ options }: { options?: OptionProps[] }): JSX.Element {
  return (
    <React.Fragment>
      { options?.map((option, index) => <Option key={index} text={option.text} value={option.value} />) || [] }
    </React.Fragment>
  )
}
