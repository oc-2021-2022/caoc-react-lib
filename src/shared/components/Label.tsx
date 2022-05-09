import React from 'react'

export function Label({ name }: { name: string | undefined }): JSX.Element {
  return <span className='label'>{ name }</span>
}
