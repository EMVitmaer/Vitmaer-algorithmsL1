function heapify(array, index, lengthHeap) {
    const leftChild = index * 2 + 1
    const rightChild = index * 2 + 2
    let indexLargerItem = index

    if (leftChild < lengthHeap && array[leftChild] > array[indexLargerItem]) {
        indexLargerItem = leftChild
    }
    if (rightChild < lengthHeap && array[rightChild] > array[indexLargerItem]) {
        indexLargerItem = rightChild
    }
    if (indexLargerItem !== index) {
        [array[index], array[indexLargerItem]] = [array[indexLargerItem], array[index]]
        
        heapify(array, indexLargerItem, lengthHeap)
    }
}

export function heapSort(array) {
    let lengthHeap = array.length
    const lastParent = Math.floor(lengthHeap / 2 - 1)

    for (let i = lastParent; i >= 0; i--) {
        heapify(array, i, lengthHeap)
    }

    while (lengthHeap > 1) {
        [array[0], array[lengthHeap - 1]] = [array[lengthHeap - 1], array[0]]
        lengthHeap--
        
        heapify(array, 0, lengthHeap)
    }
}
