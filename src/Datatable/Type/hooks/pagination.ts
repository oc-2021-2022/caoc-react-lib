export type Pagination = {
  matrix: any[][]
  limit: number
  limitArray: number[]
  goToPage: (page: number) => any[] | undefined
  currentPage: number
  goToNextPage: () => any[] | undefined
  goToPreviousPage: () => any[] | undefined
  updateLimit: (newLimit: number) => void
}
