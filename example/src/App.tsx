import {
  DatatableHeader,
  DatatableHeaderGroups
} from '../../src/Datatable/Type/headers'
import { ExampleComponent, Modal, useFilter, useTable } from 'caoc-react-lib'
import React, { useMemo, useState } from 'react'

import data from './data/shows'

const App = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [number, setNumber] = useState(0)
  const multiply = (a: number, b: number) => a * b
  const result = useMemo(() => multiply(number, 2), [number])
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
  const { tableHeaders, rows } = useTable({ columns, data }, useFilter)
  console.log('rows', rows)
  return (
    <>
      <ExampleComponent text='Create React Library Example 😄 Michel' />

      <div>
        <h2>Memo</h2>
        {result}
        <button onClick={() => setNumber(number + 1)}>multiply</button>
      </div>

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
        <table
          style={{
            border: '3px solid black',
            borderSpacing: '0',
            margin: '1rem'
          }}
        >
          <thead>
            {tableHeaders.map((headerGroups: DatatableHeaderGroups) => (
              <tr {...headerGroups.tableHeaderGroupsProps()}>
                {headerGroups.headers.map((column: DatatableHeader) => (
                  <th {...column.tableHeaderProps(column.sortColumnProps)}>
                    {column.render('title')}
                    <span>{column.canSort ? '🔼🔽' : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows?.map((row: any) => (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: '1px solid black',
                      margin: '0',
                      padding: '0.5rem'
                    }}
                  >
                    {cell.render()}
                  </td>
                ))}
              </tr>
            )) || []}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
