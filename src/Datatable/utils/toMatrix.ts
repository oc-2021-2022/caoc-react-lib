/**
 * It takes an array and a number, and returns a new array of arrays, where each sub-array has a length
 * of the number passed in
 * @param {any[]} array - the array you want to convert to a matrix
 * @param {number} limit - The number of items per row
 */
export default function toMatrix(array: any[], limit: number) {
  return Array(Math.ceil(array.length / limit))
    .fill('')
    .reduce((acc, _cur, index) => {
      return [...acc, [...array].splice(index * limit, limit)]
    }, [])
}
