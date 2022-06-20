# caoc-react-lib

Library for Modal and headless UI datatable

[![NPM](https://img.shields.io/npm/v/caoc-react-lib.svg)](https://www.npmjs.com/package/caoc-react-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save caoc-react-lib
```

## Usage
### **Modal**

A modal box that will use ReactDOM.createPortal to display it.

```tsx
import  { Modal } from 'caoc-react-lib'
import React, {useState} from 'React'
const App = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <h1>My Beautiful Page</h1>
      <button onClick={() => setOpenModal(true)}>Open Modal</button>
      <Modal>
        I'm Modal box
        <button onClick={() => setOpenModal(false)}>close me</button>
      </Modal>
    </>
  )
}
```

### **Datatable**

`useTable` generate a headless datatable with a list of columns with accessors and a list of corresponding data.

```tsx
import React, { useMemo } from 'React'
import  {
  usePagination,
  useSearch,
  useSort,
  useTable } from 'caoc-react-lib'
const App = () => {
  const data = [
    {
      firstName: 'Hortense',
      lastName: 'Olson',
      dateOfBirth: '1958-10-09T03:14:24.203Z',
      startDate: '2022-02-04T22:35:58.891Z',
      department: 'District Identity Producer',
      street: '01593 Rosamond Spring',
      city: 'Wilson',
      state: 'Director',
      zipCode: '64172-9528'
    }
    //...
  ]
  const columns = useMemo(
    () => [
      {
        title: 'Peoples',
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
        ]
      }
    ],
    []
  )

  const {
    tableHeaders,
    rows,
  } = useTable({ columns, data })
  return (
    <table>
      <thead>
        {tableHeaders.map((headerGroups: DatatableHeaderGroups) => (
          <tr {...headerGroups.tableHeaderGroupsProps()}>
            {headerGroups.headers.map((column: DatatableHeader) => (
              <th {...column.tableHeaderProps(column.sortColumnProps)}>
                {column.render('title')}
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
  )
}
```
#### **Hooks**
There are 3 hooks available: useSort, useSearch, usePagination.

You can use them at the same time or only the one you need.
You can add hooks inside `useTable` like this

```ts
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
    searchTherm
  } = useTable({columns, data}, useSort, useSearch, usePagination)
```
#### UseSort

`useSort` will allow you to sort your data ascending and descending, it adds an event click on the header of your table if it can be sorted.


```tsx
import React, { useMemo } from 'React'
import  {
  useSort,
  useTable } from 'caoc-react-lib'
const App = () => {
  const data = [/*...some data */]
  const columns = useMemo(
    () => [/*...some column */]],
    []
  )

  const {
    tableHeaders,
    rows,
  } = useTable({ columns, data: employees }, useSort)
  return (
    <table>
      <thead>
        {tableHeaders.map((headerGroups: DatatableHeaderGroups) => (
          <tr {...headerGroups.tableHeaderGroupsProps()}>
            {headerGroups.headers.map((column: DatatableHeader) => (
              <th {...column.tableHeaderProps(column.sortColumnProps)}>
                {column.render('title')}
              </th>
              <span>{column.canSort ? '🔼🔽' : ''}</span>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {/* ... */}
      </tbody>
    </table>
  )
}
```

#### useSearch

`useSearch` will allow you to perform a keyword search in all your data.
You need create your search input and add `searchTherm` method in event change of input.

```tsx
import React, { useMemo } from 'React'
import  {
  useSearch,
  useTable } from 'caoc-react-lib'
const App = () => {
  const data = [/*...some data */]
  const columns = useMemo(
    () => [/*...some column */]],
    []
  )

  const {
    tableHeaders,
    rows,
    searchTherm
  } = useTable({ columns, data: employees }, useSearch)
  return (
    <>
      <input type='text' onChange={searchTherm} />
      <table>
        <thead>
          {tableHeaders.map((headerGroups: DatatableHeaderGroups) => (
            <tr {...headerGroups.tableHeaderGroupsProps()}>
              {headerGroups.headers.map((column: DatatableHeader) => (
                <th {...column.tableHeaderProps(column.sortColumnProps)}>
                  {column.render('title')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* ... */}
        </tbody>
      </table>
    </>
  )
}
```

#### usePagination

`usePagination` will allow you to limit the data displayed by your datatable.
Several features will accompany this hook:
  - goToNextPage: go to next page
  - goToPreviousPage: go to previous page
  - currentPage: get current page number
  - matrix: array of pages
  - goToPage: go to specific page
  - updateLimit: update the limit of data displayed in the table
  - limit: data display limit
  - limitArray: list of limit you can choose

```tsx
import React, { useMemo } from 'React'
import  {
  useSearch,
  useTable } from 'caoc-react-lib'
const App = () => {
  const data = [/*...some data */]
  const columns = useMemo(
    () => [/*...some column */]],
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
    limitArray
  } = useTable({ columns, data: employees }, usePagination)
  return (
    <>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage <= 0}>
          previous
        </button>
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
      </div>
      <table>
        <thead>
          {tableHeaders.map((headerGroups: DatatableHeaderGroups) => (
            <tr {...headerGroups.tableHeaderGroupsProps()}>
              {headerGroups.headers.map((column: DatatableHeader) => (
                <th {...column.tableHeaderProps(column.sortColumnProps)}>
                  {column.render('title')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* ... */}
        </tbody>
      </table>
    </>
  )
}
```
## License

MIT © [AllanCerveaux](https://github.com/AllanCerveaux)
