import { useEffect, useState } from 'react'

import { Pagination } from '../Type'
import toMatrix from '../utils/toMatrix'

/**
 * It takes an array of data and returns an object with a bunch of functions that allow you to paginate
 * through the data
 * @param {any} data - any[] - the data you want to paginate
 */
export function usePagination(data: any, deps: any): Pagination {
  const limitArray = [5, 10, 20, 50, 100]
  const [limit, setLimit] = useState<number>(limitArray[2])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [matrix, setMatrix] = useState(toMatrix(data, limit))

  /**
   * `goToPage` takes a number as an argument and returns an array of objects or undefined
   * @param {number} page - number - the page number you want to go to
   * @returns The matrix[currentPage] is being returned.
   */
  const goToPage = (page: number): any[] | undefined => {
    setCurrentPage(page)
    return matrix[currentPage]
  }

  /**
   * `goToNextPage` is a function that returns an array of objects or undefined
   * @returns The current page of the matrix.
   */
  const goToNextPage = (): any[] | undefined => {
    if (currentPage < matrix.length) setCurrentPage(currentPage + 1)
    return matrix[currentPage]
  }

  /**
   * If the current page is greater than 0, then set the current page to the current page minus 1
   * @returns The current page of the matrix.
   */
  const goToPreviousPage = (): any[] | undefined => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
    return matrix[currentPage]
  }

  /**
   * When the user changes the limit, go to page 0 and update the limit.
   * @param {number} newLimit - The new limit to set.
   */
  const updateLimit = (newLimit: number): void => {
    goToPage(0)
    setLimit(newLimit)
  }

  useEffect(() => {
    const newDataMatrix = [...toMatrix(data, limit)]
    if (currentPage > newDataMatrix.length) goToPage(0)
    setMatrix(newDataMatrix)
  }, [data, limit, ...deps])

  return {
    matrix,
    limit,
    limitArray,
    goToPage,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    updateLimit
  }
}
