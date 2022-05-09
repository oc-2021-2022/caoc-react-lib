import { CloseButton, ModalContainer, ModalContent, ModalShadow } from './styles';
import React, { useEffect } from 'react';

import { ReactPortal } from '../shared/libs/Portal';

export function Modal({ isOpen, handleClose, children }: any) {

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => event.key === "Escape" && handleClose()
    document.body.addEventListener('keydown', closeWithEscape)
    return () => {
      document.body.removeEventListener('keydown', closeWithEscape)
    }
  }, [handleClose]);

  if(!isOpen) return null

  return (
    <ReactPortal>
      <React.Fragment>
        <ModalShadow onClick={handleClose} />
        <ModalContainer>
          <CloseButton handleClick={handleClose} />
          <ModalContent>
            { children }
          </ModalContent>
        </ModalContainer>
      </React.Fragment>
    </ReactPortal>
  )
}
