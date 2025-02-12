export function quickSort(array) {
    if (array.length < 2) {
        return array
    }

    const mid = array[Math.floor(Math.random() * array.length)]
    const lessArray = array.filter(item => item < mid)
    const equalArray = array.filter(item => item === mid)
    const largerArray = array.filter(item => item > mid)

    return quickSort(lessArray).concat(equalArray, quickSort(largerArray))
}
