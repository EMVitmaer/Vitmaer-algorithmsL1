export function mergeSort(array, left, rigth) {
    if (left >= rigth) {
        return
    }
    
    const mid = Math.floor(left + (rigth - left) / 2)
    mergeSort(array, left, mid)
    mergeSort(array, mid + 1, rigth)
    mergeArrays(array, left, mid, rigth)
}

function mergeArrays(array, left, mid, rigth) {
    const leftLength = mid - left + 1
    const rigthLength = rigth - mid
    
    const leftArray = new Array(leftLength)
    const rigthArray = new Array(rigthLength)

    for (let i = 0; i < leftLength; i++) {
        leftArray[i] = array[left + i]
    }    
    for (let i = 0; i < rigthLength; i++) {
        rigthArray[i] = array[mid + i + 1]
    }
    
    let leftIndex = 0
    let rigthIndex = 0 
    let finalyIndex = left

    while ((leftIndex < leftLength) && (rigthIndex < rigthLength)) {
        if (leftArray[leftIndex] <= rigthArray[rigthIndex]) {            
            array[finalyIndex] = leftArray[leftIndex]
            leftIndex++
        } else {
            array[finalyIndex] = rigthArray[rigthIndex]
            rigthIndex++
        }

        finalyIndex++
    }

    for (; leftIndex < leftLength; leftIndex++) {
        array[finalyIndex] = leftArray[leftIndex]
        finalyIndex++
    }
    for (; rigthIndex < rigthLength; rigthIndex++) {
        array[finalyIndex] = rigthArray[rigthIndex]
        finalyIndex++
    }
}
