export function mergeSort(array) {
    if (array.length < 2) {
        return array
    }

    const mid = Math.floor((array.length - 1) / 2)
    let leftArray = mergeSort(array.slice(0, mid + 1))
    let rigthArray = mergeSort(array.slice(mid + 1))
    
    let i = 0
    let j = 0
    const newArray = []

    while (i < leftArray.length && j < rigthArray.length) {
        if (leftArray[i] <= rigthArray[j]) {
            newArray.push(leftArray[i])
            i++
        } else {
            newArray.push(rigthArray[j])
            j++
        }
    }

    return newArray.concat(leftArray.slice(i), rigthArray.slice(j))
}
