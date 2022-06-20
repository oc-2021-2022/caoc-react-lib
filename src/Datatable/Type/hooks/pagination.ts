export type Pagination = {
  matrix: any[][]
  limit: number
  limitArray: number[]
  currentPage: number
  goToPage: (page: number) => any[] | undefined
  goToNextPage: () => any[] | undefined
  goToPreviousPage: () => any[] | undefined
  updateLimit: (newLimit: number) => void
}
