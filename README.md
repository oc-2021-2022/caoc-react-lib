# caoc-react-lib

Library for Modal and headless UI datatable.
This library is in `Work In Progress`, code or methods may change at any time.

[![NPM](https://img.shields.io/npm/v/caoc-react-lib.svg)](https://www.npmjs.com/package/caoc-react-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save caoc-react-lib
```

## Usage
### **Modal**

A modal is a component where you can add text or html inside.
It uses the [ReactDom.createPortal](https://reactjs.org/docs/portals.html) to display the one above the other components

> Modal create automaticaly portal to display him.

```tsx
import  { Modal } from 'caoc-react-lib'
import React, {useState} from 'React'

const App = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <h1>My Beautiful Page</h1>
      <button onClick={() => setOpenModal(true)}>Open Modal</button>
      {
       /**
        * @prop isOpen - a boolean that determines whether the modal is open or not
        * @prop handleClose - This is a function that will close the modal with close button on modal or escape key
        */
      }
      <Modal isOpen={open} handleClose={() => setOpen(false)}>
        I'm Modal box
        <button onClick={() => setOpenModal(false)}>close me</button>
      </Modal>
    </>
  )
}
```

### **Datatable**

`useTable` is a main hook to generate headless datatable.
To use it, pass it two default options :
 - `columns` is array of title and accesors of data
 - `data` is our array of data

> `useTable` displays whatever data you pass to it - if you have 1000 data it will display them all.
> I have not yet implemented the lazy load of data.
> But you can use [`usePagination`](#usepagination) right now.

Exemple :
```tsx
import React, { useMemo } from 'React'
import  { useTable } from 'caoc-react-lib'
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
You can add hooks inside `useTable` like this.

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

`useSort` is hook to implement row sorting.
To use it, add hook inside [`useTable`](#datatable).
This hook add click event on each sortable table header and sort `ASC|DESC` corresponding column.

Exemple :
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

`useSearch` is hook to implement search.
To use it, add hook inside [`useTable`](#datatable).
Create element or component (can type inside BTW) and add `searchTherm` method in event listening.

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

`usePagination` is hook to implement pagination and limit of data displayed.
To use it, add hook inside [`useTable`](#datatable).
Create elements or component allow you to add some event to navigate in datable.


Exemple :
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
  /**
   * @const matrix - contains all pages.
   * @const currentPage - get current page displayed.
   * @method goToNextPage - go to next page of matrix.
   * @method goToPreviousPage - go to previous page of matrix.
   * @method goToPage(pageNumber) - go to specific page.
   * @const limit - limit of data display.
   * @const limitArray - Default limits you can chooses to display our data.
   * @method updateLimit(limitNumber) - update limit of data displayed.
   */

  const {
    /* ... */
    matrix,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    limit,
    limitArray
    updateLimit,
  } = useTable({ columns, data: employees }, usePagination)
  return (
    <>
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage <= 0}>
          previous
        </button>
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
