import React from 'react'

export function Label({ name }: { name: string | undefined }): JSX.Element {
  return <label htmlFor={name}>{ name }</label>
}
