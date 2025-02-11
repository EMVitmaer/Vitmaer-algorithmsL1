class EntryDoubleList {
    constructor(value, next = null, prev = null) {
        this.value = value
        this.next = next
        this.prev = prev
    }
}

export class DoubleLinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    append(value) {
        const entry = new EntryDoubleList(value)
        
        if (!this.head) {
            this.head = entry
            this.tail = entry

            return this
        }

        this.tail.next = entry
        entry.prev = this.tail
        this.tail = entry

        return this
    }

    toString() {
        let currentEntry = this.head
        let allEntries = ''

        while (currentEntry) {
            allEntries +=`${currentEntry.value} `
            currentEntry = currentEntry.next
        }

        return allEntries
    }

    deleteOne(value) {
        if (!this.head) {
            return false
        }
        
        if (this.head.value === value) {
            if (this.head.next) {
                this.head = this.head.next
                this.head.prev = null
            } else {
                this.head = null
                this.tail = null
            }
            
            return true
        }

        let currentEntry = this.head
        
        while (currentEntry.next) {
            if (currentEntry.next.value === value) {
                if (currentEntry.next.next) {
                    currentEntry.next.next.prev = currentEntry
                    currentEntry.next = currentEntry.next.next
                } else {
                    currentEntry.next = null
                    this.tail = currentEntry
                }

                return true
            }
            currentEntry = currentEntry.next
        }

        return false
    }

    deleteAll(value) {
        if (!this.head) {
            return false
        }

        let deletedEntry = null

        while (this.head.value === value) {
            deletedEntry = this.head.value

            if (this.head.next) {
                this.head = this.head.next
                this.head.prev = null
            } else {
                this.head = null
                this.tail = null

                return true
            }
        }

        let currentEntry = this.head

        while (currentEntry?.next) {
            if (currentEntry.next.value === value) {
                deletedEntry = currentEntry.next

                if (currentEntry.next.next) {
                    currentEntry.next.next.prev = currentEntry
                    currentEntry.next = currentEntry.next.next

                    continue
                } else {
                    currentEntry.next = null
                    this.tail = currentEntry
                }
            }

            currentEntry = currentEntry.next
        }

        return !!deletedEntry
    }

    updateOne(oldValue, newValue = null) {
        if (!this.head) {
            return this
        }

        let currentEntry = this.head
        while (currentEntry) {
            if (currentEntry.value === oldValue) {
                currentEntry.value = newValue

                break
            }
            currentEntry = currentEntry.next
        }

        return this
    }

    updateAll(oldValue, newValue = null) {
        if (!this.head) {
            return this
        }

        let currentEntry = this.head

        while (currentEntry) {
            if (currentEntry.value === oldValue) {
                currentEntry.value = newValue
            }

            currentEntry = currentEntry.next
        }

        return this
    }

    map(callback) {
        const newDoudleList = new DoubleLinkedList()
        if (!this.head) {
            return newDoudleList
        }

        let currentEntry = this.head

        while (currentEntry) {
            newDoudleList.append(callback(currentEntry))
            currentEntry = currentEntry.next
        }

        return newDoudleList
    }

    mapReverse(callback) {
        const newDoudleList = new DoubleLinkedList()
        if (!this.tail) return newDoudleList

        let currentEntry = this.tail

        while (currentEntry) {
            newDoudleList.append(callback(currentEntry))
            currentEntry = currentEntry.prev
        }

        return newDoudleList
    }
}

const list = new DoubleLinkedList ()
