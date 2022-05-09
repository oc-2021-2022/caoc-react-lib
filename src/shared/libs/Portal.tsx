import { useLayoutEffect, useState } from 'react'

import ReactDom from 'react-dom'

export function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper'
}: {
  children: JSX.Element
  wrapperId?: string
}) {
  const [wrapperElement, setWrapperElement] = useState<Element>()
  useLayoutEffect(() => {
    let systemCreated = false
    let element = document.getElementById(wrapperId)

    if (!element) {
      systemCreated = true
      element = createWrapperAppendToBody(wrapperId)
    }

    setWrapperElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (!wrapperElement) return null

  return ReactDom.createPortal(children, wrapperElement as Element)
}

function createWrapperAppendToBody(wrapperId: string) {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', wrapperId)
  document.body.appendChild(wrapper)
  return wrapper
}
