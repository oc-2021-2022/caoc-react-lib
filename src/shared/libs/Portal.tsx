import { useLayoutEffect, useState } from 'react'

import ReactDom from 'react-dom'

/**
 * Portal is an object with a children property that is a JSX.Element and an optional wrapperId
 * property that is a string.
 * @property children - The children of the portal.
 * @property {string} wrapperId - The id of the element that will be used as the portal wrapper.
 */
type Portal = {
  children: JSX.Element
  wrapperId?: string
}

/**
 * It creates a portal wrapper element if it doesn't exist, and then returns a React portal
 * @param {Portal}  - `children` - The children to render in the portal.
 * @returns A React Portal
 */
export function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper'
}: Portal): React.ReactPortal | null {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>()
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

/**
 * Create a div element, set its id attribute to the value of the wrapperId parameter, append the div
 * to the body, and return the div.
 * @param {string} wrapperId - The id of the wrapper element.
 * @returns A function that takes a string and returns a HTMLElement
 */
function createWrapperAppendToBody(wrapperId: string): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', wrapperId)
  document.body.appendChild(wrapper)
  return wrapper
}
