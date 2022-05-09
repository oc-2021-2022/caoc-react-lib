import {
  CloseButton,
  ModalContainer,
  ModalContent,
  ModalShadow
} from './styles'
import React, { useEffect } from 'react'

import { ReactPortal } from '../shared/libs/Portal'

/**
 * TModal is an object with three properties: isOpen, handleClose, and children. isOpen is a boolean,
 * handleClose is a function that returns nothing, and children is a JSX.Element.
 * @property {boolean} isOpen - boolean - This is a boolean that determines whether the modal is open
 * or not.
 * @property handleClose - This is a function that will close the modal.
 * @property children - The content of the modal
 */
type TModal = {
  isOpen: boolean
  handleClose: () => void
  children: JSX.Element
}

/**
 * It renders a modal if isOpen is true, otherwise it renders null
 * @param {TModal}  - isOpen - a boolean that determines whether the modal is open or not
 * @returns A modal component that is rendered in a portal.
 */
export function Modal({
  isOpen,
  handleClose,
  children
}: TModal): JSX.Element | null {
  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) =>
      event.key === 'Escape' && handleClose()
    document.body.addEventListener('keydown', closeWithEscape)
    return () => {
      document.body.removeEventListener('keydown', closeWithEscape)
    }
  }, [handleClose])

  if (!isOpen) return null

  return (
    <ReactPortal>
      <React.Fragment>
        <ModalShadow onClick={handleClose} />
        <ModalContainer>
          <CloseButton handleClick={handleClose} />
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      </React.Fragment>
    </ReactPortal>
  )
}
