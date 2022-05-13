import { ExampleComponent, Modal, useTable } from 'caoc-react-lib'
import React, { useMemo, useState } from 'react'

import data from './data/shows'

const App = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const columns = useMemo(
    () => [
      {
        title: 'TV Show',
        columns: [
          {
            title: 'Name',
            accessor: 'show.name'
          },
          {
            title: 'Type',
            accessor: 'show.type'
          }
        ]
      },
      {
        title: 'Type',
        columns: [
          {
            title: 'Language',
            accessor: 'show.language'
          },
          {
            title: 'Genre(s)',
            accessor: 'show.genres'
          },
          {
            title: 'Runtime',
            accessor: 'show.runtime'
          },
          {
            title: 'Status',
            accessor: 'show.status'
          }
        ]
      }
    ],
    []
  )
  const { tableHeaders } = useTable({ columns, data })
  console.log(tableHeaders)
  return (
    <>
      <ExampleComponent text='Create React Library Example 😄 Michel' />

      <div>
        <p>Modal</p>
        <button onClick={() => setOpen(true)}>Open Modal</button>

        {open && (
          <Modal isOpen={open} handleClose={() => setOpen(false)}>
            <section>
              <h1>Hello</h1>
              <p>Lorem Ipsum</p>
              <button onClick={() => setOpen(false)}>close</button>
            </section>
          </Modal>
        )}
      </div>

      <div>
        <p>Datatable</p>
        <table>
          <thead>
            {tableHeaders.map((headerGroups) => (
              <tr>
                {headerGroups.headers.map((columns) => (
                  <th {...columns.tableHeaderProps()}>
                    {columns.render('title')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </>
  )
}

export default App
