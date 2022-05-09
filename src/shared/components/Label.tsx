import React from 'react'

/**
 * It takes a name property and returns a span element with the name as the text
 * @param  - JSX.Element - This is the return type of the function.
 * @returns A React component that renders a span with the className 'label' and the name prop as the
 * text.
 */
export function Label({ name }: { name: string | undefined }): JSX.Element {
  return <span className='label'>{name}</span>
}
