import {
  DatatableHeader,
  DatatableHeaderGroups
} from '../../src/Datatable/Type/headers'
import {
  ExampleComponent,
  Modal,
  usePagination,
  useSearch,
  useSort,
  useTable
} from 'caoc-react-lib'
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
  const {
    tableHeaders,
    rows,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    matrix,
    goToPage,
    updateLimit,
    limit,
    searchTherm
  } = useTable({ columns, data }, useSort, usePagination, useSearch)

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

      <div style={{ margin: '1rem' }}>
        <p>Datatable</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <p>Search: </p>
          <div>
            <input type='text' onChange={searchTherm} />
          </div>
        </div>
        <table
          style={{
            border: '3px solid black',
            borderSpacing: '0'
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
        <div>
          <button onClick={goToPreviousPage}>previous</button>
          {Array(matrix.length)
            .fill('')
            .map((_, i) => (
              <button
                key={`navigate_button_${i}`}
                onClick={() => goToPage(i)}
                disabled={currentPage === i}
              >
                {i + 1}
              </button>
            ))}
          <button onClick={goToNextPage}>next</button>
          <select
            onChange={({ target }) => updateLimit(parseInt(target.value))}
            value={limit}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='10'>10</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default App
