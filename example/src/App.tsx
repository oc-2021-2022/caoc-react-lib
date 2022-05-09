import { ExampleComponent, Modal } from 'caoc-react-lib';
import React, { useState } from 'react';

const App = (): JSX.Element => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ExampleComponent text="Create React Library Example 😄 Michel" />

      <div>
        <p>Modal</p>
        <button onClick={() => setOpen(true)}>Open Modal</button>

        {open && (
          <Modal isOpen={open} handleClose={() => setOpen(false)} >
            <section>
              <h1>Hello</h1>
              <p>Lorem Ipsum</p>
              <button onClick={() => setOpen(false)}>close</button>
            </section>
          </Modal>
        )}
      </div>
    </>
  )
}



export default App
