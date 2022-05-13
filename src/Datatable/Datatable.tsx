/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react'

type HeaderColumn = {
  title: string
  accessor?: string
}

type MainHeaderColumn = {
  title: string
  columns: HeaderColumn[]
}

type GenericColumn = {
  title: string
  accessor?: string
  columns?: HeaderColumn[]
}

type TDatatable = {
  columns: MainHeaderColumn[]
  data: any
}

type DatableHeaderColumn = {
  title: string
  render: (accessor: string) => React.ReactNode
  parent: string | undefined
}

type DatatableHeader = {
  title: string
  columns?: DatableHeaderColumn[]
  parent: string | undefined
  render: (accessor: string) => React.ReactNode
  tableHeaderProps: () => {
    key: string
  }
}
type DatatableHeaderGroups = {
  headers: DatatableHeader[]
}

export function useTable({ columns }: TDatatable) {
  const [tableHeaders, setTableHeader] = useState<DatatableHeaderGroups[]>([])

  useEffect(() => {
    if (!tableHeaders.length) setTableHeader(generateHeader(columns))
    return () => {}
  }, [tableHeaders])

  return {
    tableHeaders
  }
}

function generateHeader(
  headers: GenericColumn[],
  parent?: string
): DatatableHeaderGroups[] {
  let columns: DatableHeaderColumn[] = []
  return [
    {
      headers: headers.map((header: GenericColumn): any => {
        const headerGroups = generateHeaderGroups(header, parent)
        if (headerGroups.columns) columns = [...headerGroups.columns]
        return headerGroups
      })
    },
    {
      headers: columns
    }
  ]
}

function generateHeaderGroups(
  header: GenericColumn,
  parent?: string
): DatatableHeader {
  const headerGroups: DatatableHeader = {
    title: '',
    parent,
    render: function (accessor: string): React.ReactNode {
      return header[accessor]
    },
    tableHeaderProps: () => {
      return {
        key: header.title.toLowerCase()
      }
    }
  }
  headerGroups.title = header.title
  if (header.columns) {
    headerGroups.columns = header.columns.map((column: GenericColumn) =>
      generateHeaderGroups(column, header.title)
    )
  }
  return headerGroups
}
