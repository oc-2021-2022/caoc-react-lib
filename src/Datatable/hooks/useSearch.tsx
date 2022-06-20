import { useCallback, useState } from 'react'

import { Search } from '../Type'

/**
 * It takes in an array of objects, and returns a filtered array of objects based on the search term
 * @param {any} data - any - this is the data that you want to search through.
 * @returns An object with two properties: searchArray and searchTherm.
 */
export function useSearch(data: any): Search {
  const [searchArray, setSearchArray] = useState<any[]>([])

  /* A callback function that takes an event as a parameter, and returns a filtered array of objects. */
  const searchTherm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const terms = event.target.value.split(' ')
      const result = [
        ...data.filter((data: any) => {
          return terms.every((term) =>
            Object.values(data).some((value: any) =>
              searchDispatcher(
                value,
                term.replace(/^\w/, (c) => c.toUpperCase())
              )
            )
          )
        })
      ]
      setSearchArray(result)
      if (!event.target.value.length) setSearchArray([])
    },
    [data]
  )

  return {
    searchArray,
    searchTherm
  }
}

/**
 * It takes a value and a search term, and if the value is an array or string, it searches for the term
 * in the array or string, if the value is a number, it searches for the term in the number, and if the
 * value is an object, it searches for the term in the object
 * @param {any} value - any - the value of the current key in the object
 * @param {string} term - The search term
 * @returns A boolean or undefined
 */
function searchDispatcher(value: any, term: string): boolean | void {
  if (value === null) return false

  if (Array.isArray(value) || typeof value === 'string') {
    return searchInArrayOrString(term, value)
  } else if (typeof value === 'number') {
    return searchInNumber(term, value)
  } else if (value instanceof Object) {
    searchInObject(term, value)
  }
}

/**
 * It takes a term and an object, and returns true if the term is found in the object
 * @param {string} term - The term to search for
 * @param {any} object - The object to search in.
 * @returns A boolean value.
 */
function searchInObject(term: string, object: any): any {
  return Object.values(object).some((value: any) =>
    searchDispatcher(value, term)
  )
}

/**
 * If the term is a number, then return true if the value is equal to the term.
 * @param {any} term - The search term
 * @param {number} value - The value of the cell.
 * @returns A function that takes two parameters, term and value, and returns a boolean.
 */
function searchInNumber(term: any, value: number): boolean {
  return parseInt(term) === value
}

/**
 * SearchInArrayOrString takes a string and an array or string and returns a boolean.
 * @param {string} term - The term to search for.
 * @param {any[] | string} value - The value to search in.
 * @returns A boolean value.
 */
function searchInArrayOrString(term: string, value: any[] | string): boolean {
  return value.includes(term)
}
