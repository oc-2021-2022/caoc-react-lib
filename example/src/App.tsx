import {
  DatatableHeader,
  DatatableHeaderGroups
} from '../../src/Datatable/Type/headers'
import {
  Modal,
  usePagination,
  useSearch,
  useSort,
  useTable
} from 'caoc-react-lib'
import React, { useMemo, useState } from 'react'

import { employees } from './data/employees'

const App = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const columns = useMemo(
    () => [
      {
        title: 'Employees',
        columns: [
          {
            title: 'First Name',
            accessor: 'firstName'
          },
          {
            title: 'lastName',
            accessor: 'lastName'
          },
          {
            title: 'Birthdate',
            accessor: 'dateOfBirth'
          },
          {
            title: 'Start Date',
            accessor: 'startDate'
          },
          {
            title: 'Departement',
            accessor: 'department'
          },
          {
            title: 'Street',
            accessor: 'street'
          },
          {
            title: 'City',
            accessor: 'city'
          },
          {
            title: 'State',
            accessor: 'state'
          },
          {
            title: 'Zip Code',
            accessor: 'zipCode'
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
    limitArray,
    handleSearch
  } = useTable({ columns, data: employees }, useSort, useSearch, usePagination)

  return (
    <>
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
            <input type='text' onChange={handleSearch} />
          </div>
        </div>
        <div>
          <button onClick={goToPreviousPage} disabled={currentPage <= 0}>
            previous
          </button>
          page {currentPage + 1} of {matrix.length}
          <button
            onClick={goToNextPage}
            disabled={currentPage >= matrix.length - 1}
          >
            next
          </button>
          <select
            onChange={({ target }) => updateLimit(parseInt(target.value))}
            value={limit}
          >
            {limitArray.map((l: number) => (
              <option key={`limit_select_${l}`} value={l}>
                {l}
              </option>
            ))}
          </select>
          <div>
            go to
            <select
              id=''
              onChange={({ target }) => goToPage(parseInt(target.value))}
            >
              {Array(matrix.length)
                .fill('')
                .map((_, i) => (
                  <option
                    selected={currentPage === i}
                    key={`select_page_${i}`}
                    value={i}
                  >
                    {i + 1}
                  </option>
                ))}
            </select>
            page
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
                    <span>
                      {column.canSort
                        ? column.isSorted
                          ? column.sortOrder > 0
                            ? '🔼'
                            : '🔽'
                          : '🔼🔽'
                        : ''}
                    </span>
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
