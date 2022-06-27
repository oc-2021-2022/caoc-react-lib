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
 * It renders a modal that can be closed by clicking outside of it or by pressing the escape key
 * @param {TModal}  - TModal
 * @returns A React.Fragment
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
        <div
          className='modal-shadow'
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            backgroundColor: 'black',
            opacity: '0.7',
            zIndex: 4
          }}
          onClick={handleClose}
        />
        <section
          className='modal-container'
          style={{
            position: 'absolute',
            top: 'calc(50% - 250px)',
            left: 'calc(50% - 250px)',
            bottom: 0,
            right: 0,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            maxWidth: '100%',
            height: 'fit-content',
            maxHeight: '100%',
            backgroundColor: 'white',
            boxShadow: '-5px 5px 5px 0px rgba(0, 0, 0, 0.75)',
            padding: '1em',
            borderRadius: '.5em'
          }}
        >
          <span
            className='modal-button--close'
            style={{
              position: 'absolute',
              right: '-10px',
              top: '-10px',
              backgroundColor: '#000',
              borderRadius: '100%',
              width: '26px',
              height: '26px',
              textAlign: 'center',
              color: '#FFF',
              fontSize: '1.5em',
              lineHeight: '20px',
              cursor: 'pointer'
            }}
            onClick={handleClose}
          >
            &times;
          </span>
          <div
            className='modal-content'
            style={{
              overflow: 'auto',
              padding: '0px 2em'
            }}
          >
            {children}
          </div>
        </section>
      </React.Fragment>
    </ReactPortal>
  )
}
